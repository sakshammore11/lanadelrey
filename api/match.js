export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { situation, songListText } = req.body;

  if (!situation || !songListText) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const systemPrompt = `You are a mystical Lana Del Rey oracle. Your job is to read the user's situation and match it to exactly ONE song from this list of Lana Del Rey songs:\n\n${songListText}\n\nYou must reply ONLY with the exact title of the song as it appears in the list. Do not include any other text, punctuation, quotes, or explanations.`;

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'poolside/laguna-xs-2.1:free',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: situation }
        ]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenRouter API Error:', errorText);
      return res.status(500).json({ error: 'Failed to fetch from Oracle' });
    }

    const data = await response.json();
    let songTitle = data.choices[0].message.content.trim();
    songTitle = songTitle.replace(/^["']|["']$/g, '');

    return res.status(200).json({ song: songTitle });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
