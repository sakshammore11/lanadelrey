export const MOODS = {
  melancholic: {
    label: "Melancholic",
    emoji: "🥀",
    color: "#8B5CF6",
    glow: "rgba(139,92,246,0.4)",
    gradient: "linear-gradient(135deg, #4C1D95, #1E1B4B)",
    description: "Hauntingly beautiful sadness"
  },
  romanticized: {
    label: "Romanticized",
    emoji: "🌹",
    color: "#F43F5E",
    glow: "rgba(244,63,94,0.4)",
    gradient: "linear-gradient(135deg, #9F1239, #3B0764)",
    description: "Cinematic love & longing"
  },
  dark: {
    label: "Dark & Hypnotic",
    emoji: "🖤",
    color: "#6B7280",
    glow: "rgba(107,114,128,0.4)",
    gradient: "linear-gradient(135deg, #111827, #0F0F0F)",
    description: "Dangerous, intoxicating depths"
  },
  euphoric: {
    label: "Euphoric",
    emoji: "✨",
    color: "#F59E0B",
    glow: "rgba(245,158,11,0.4)",
    gradient: "linear-gradient(135deg, #92400E, #451A03)",
    description: "Sun-drenched bliss & freedom"
  },
  nostalgic: {
    label: "Nostalgic",
    emoji: "🌅",
    color: "#F97316",
    glow: "rgba(249,115,22,0.4)",
    gradient: "linear-gradient(135deg, #7C2D12, #1C1917)",
    description: "Golden memories & Americana"
  },
  ethereal: {
    label: "Ethereal",
    emoji: "🌙",
    color: "#38BDF8",
    glow: "rgba(56,189,248,0.4)",
    gradient: "linear-gradient(135deg, #0C4A6E, #082F49)",
    description: "Dreamlike, celestial, otherworldly"
  },
  rebellious: {
    label: "Rebellious",
    emoji: "🔥",
    color: "#EF4444",
    glow: "rgba(239,68,68,0.4)",
    gradient: "linear-gradient(135deg, #7F1D1D, #1C0A0A)",
    description: "Wild, defiant & unapologetic"
  }
};

export const albums = [
  {
    title: "Born To Die",
    year: "2012",
    theme: { glow: "rgba(30, 58, 138, 0.3)", color: "from-blue-900/40" },
    songs: [
      { title: "Born To Die", mood: "melancholic" },
      { title: "Off To The Races", mood: "dark" },
      { title: "Blue Jeans", mood: "romanticized" },
      { title: "Video Games", mood: "melancholic" },
      { title: "Diet Mountain Dew", mood: "rebellious" },
      { title: "National Anthem", mood: "euphoric" },
      { title: "Dark Paradise", mood: "dark" },
      { title: "Radio", mood: "euphoric" },
      { title: "Carmen", mood: "melancholic" },
      { title: "Million Dollar Man", mood: "dark" },
      { title: "Summertime Sadness", mood: "melancholic" },
      { title: "This Is What Makes Us Girls", mood: "nostalgic" }
    ]
  },
  {
    title: "Paradise",
    year: "2012",
    theme: { glow: "rgba(180, 83, 9, 0.3)", color: "from-amber-900/40" },
    songs: [
      { title: "Ride", mood: "ethereal" },
      { title: "American", mood: "nostalgic" },
      { title: "Cola", mood: "rebellious" },
      { title: "Body Electric", mood: "ethereal" },
      { title: "Blue Velvet", mood: "romanticized" },
      { title: "Gods & Monsters", mood: "dark" },
      { title: "Yayo", mood: "melancholic" },
      { title: "Bel Air", mood: "ethereal" }
    ]
  },
  {
    title: "Ultraviolence",
    year: "2014",
    theme: { glow: "rgba(82, 82, 91, 0.3)", color: "from-zinc-800/40" },
    songs: [
      { title: "Cruel World", mood: "dark" },
      { title: "Ultraviolence", mood: "dark" },
      { title: "Shades Of Cool", mood: "melancholic" },
      { title: "Brooklyn Baby", mood: "nostalgic" },
      { title: "West Coast", mood: "ethereal" },
      { title: "Sad Girl", mood: "melancholic" },
      { title: "Pretty When You Cry", mood: "melancholic" },
      { title: "Money Power Glory", mood: "rebellious" },
      { title: "Fucked My Way Up To The Top", mood: "rebellious" },
      { title: "Old Money", mood: "nostalgic" },
      { title: "The Other Woman", mood: "romanticized" }
    ]
  },
  {
    title: "Honeymoon",
    year: "2015",
    theme: { glow: "rgba(153, 27, 27, 0.3)", color: "from-red-900/40" },
    songs: [
      { title: "Honeymoon", mood: "romanticized" },
      { title: "Music To Watch Boys To", mood: "dark" },
      { title: "Terrence Loves You", mood: "melancholic" },
      { title: "God Knows I Tried", mood: "ethereal" },
      { title: "High By The Beach", mood: "euphoric" },
      { title: "Freak", mood: "dark" },
      { title: "Art Deco", mood: "nostalgic" },
      { title: "Burnt Norton (Interlude)", mood: "ethereal" },
      { title: "Religion", mood: "ethereal" },
      { title: "Salvatore", mood: "romanticized" },
      { title: "The Blackest Day", mood: "melancholic" },
      { title: "24", mood: "dark" },
      { title: "Swan Song", mood: "ethereal" },
      { title: "Don't Let Me Be Misunderstood", mood: "rebellious" }
    ]
  },
  {
    title: "Lust For Life",
    year: "2017",
    theme: { glow: "rgba(6, 78, 59, 0.3)", color: "from-emerald-900/40" },
    songs: [
      { title: "Love", mood: "romanticized" },
      { title: "Lust For Life", mood: "euphoric" },
      { title: "13 Beaches", mood: "melancholic" },
      { title: "Cherry", mood: "dark" },
      { title: "White Mustang", mood: "nostalgic" },
      { title: "Summer Bummer", mood: "euphoric" },
      { title: "Groupie Love", mood: "romanticized" },
      { title: "In My Feelings", mood: "melancholic" },
      { title: "Coachella - Woodstock In My Mind", mood: "ethereal" },
      { title: "God Bless America - And All The Beautiful Women In It", mood: "nostalgic" },
      { title: "When The World Was At War We Kept Dancing", mood: "ethereal" },
      { title: "Beautiful People Beautiful Problems", mood: "melancholic" },
      { title: "Tomorrow Never Came", mood: "nostalgic" },
      { title: "Heroin", mood: "dark" },
      { title: "Change", mood: "ethereal" },
      { title: "Get Free", mood: "ethereal" }
    ]
  },
  {
    title: "Norman Fucking Rockwell!",
    year: "2019",
    theme: { glow: "rgba(12, 74, 110, 0.3)", color: "from-sky-900/40" },
    songs: [
      { title: "Norman fucking Rockwell", mood: "nostalgic" },
      { title: "Mariners Apartment Complex", mood: "romanticized" },
      { title: "Venice Bitch", mood: "ethereal" },
      { title: "Fuck it I love you", mood: "romanticized" },
      { title: "Doin' Time", mood: "nostalgic" },
      { title: "Love song", mood: "romanticized" },
      { title: "Cinnamon Girl", mood: "melancholic" },
      { title: "How to disappear", mood: "melancholic" },
      { title: "California", mood: "nostalgic" },
      { title: "The Next Best American Record", mood: "nostalgic" },
      { title: "The greatest", mood: "melancholic" },
      { title: "Bartender", mood: "euphoric" },
      { title: "Happiness is a butterfly", mood: "ethereal" },
      { title: "hope is a dangerous thing for a woman like me to have - but I have it", mood: "melancholic" }
    ]
  },
  {
    title: "Chemtrails Over The Country Club",
    year: "2021",
    theme: { glow: "rgba(113, 113, 122, 0.3)", color: "from-gray-700/40" },
    songs: [
      { title: "White Dress", mood: "nostalgic" },
      { title: "Chemtrails Over The Country Club", mood: "ethereal" },
      { title: "Tulsa Jesus Freak", mood: "dark" },
      { title: "Let Me Love You Like A Woman", mood: "romanticized" },
      { title: "Wild At Heart", mood: "ethereal" },
      { title: "Dark But Just A Game", mood: "dark" },
      { title: "Not All Who Wander Are Lost", mood: "ethereal" },
      { title: "Yosemite", mood: "nostalgic" },
      { title: "Breaking Up Slowly", mood: "melancholic" },
      { title: "Dance Till We Die", mood: "euphoric" },
      { title: "For Free", mood: "nostalgic" }
    ]
  },
  {
    title: "Blue Banisters",
    year: "2021",
    theme: { glow: "rgba(134, 25, 143, 0.3)", color: "from-fuchsia-900/40" },
    songs: [
      { title: "Text Book", mood: "melancholic" },
      { title: "Blue Banisters", mood: "ethereal" },
      { title: "Arcadia", mood: "ethereal" },
      { title: "Interlude - The Trio", mood: "nostalgic" },
      { title: "Black Bathing Suit", mood: "rebellious" },
      { title: "If You Lie Down With Me", mood: "dark" },
      { title: "Beautiful", mood: "romanticized" },
      { title: "Violets for Roses", mood: "melancholic" },
      { title: "Dealer", mood: "dark" },
      { title: "Thunder", mood: "ethereal" },
      { title: "Wildflower Wildfire", mood: "melancholic" },
      { title: "Nectar of the Gods", mood: "euphoric" },
      { title: "Living Legend", mood: "nostalgic" },
      { title: "Cherry Blossom", mood: "romanticized" },
      { title: "Sweet Carolina", mood: "nostalgic" }
    ]
  },
  {
    title: "Did you know that there's a tunnel under Ocean Blvd",
    year: "2023",
    theme: { glow: "rgba(17, 24, 39, 0.5)", color: "from-slate-900/60" },
    songs: [
      { title: "The Grants", mood: "ethereal" },
      { title: "Did you know that there's a tunnel under Ocean Blvd", mood: "melancholic" },
      { title: "Sweet", mood: "romanticized" },
      { title: "A&W", mood: "dark" },
      { title: "Judah Smith Interlude", mood: "ethereal" },
      { title: "Candy Necklace", mood: "melancholic" },
      { title: "Jon Batiste Interlude", mood: "nostalgic" },
      { title: "Kintsugi", mood: "melancholic" },
      { title: "Fingertips", mood: "ethereal" },
      { title: "Paris, Texas", mood: "nostalgic" },
      { title: "Grandfather please stand on the shoulders of my father while he's deep-sea fishing", mood: "ethereal" },
      { title: "Let The Light In", mood: "ethereal" },
      { title: "Margaret", mood: "romanticized" },
      { title: "Fishtail", mood: "dark" },
      { title: "Peppers", mood: "dark" },
      { title: "Taco Truck x VB", mood: "rebellious" }
    ]
  }
];

export const moodQuotes = {
  melancholic: "\"Sadness is a super power in disguise.\"",
  romanticized: "\"I was always an unusual girl. My mother told me I had a chameleon soul.\"",
  dark: "\"Who are you? Are you in touch with all of your darkest fantasies?\"",
  euphoric: "\"We were born to die, but we were also born to feel alive.\"",
  nostalgic: "\"California is a place of the mind as much as geography.\"",
  ethereal: "\"I was always attracted to the pale dawn.\"",
  rebellious: "\"I do what I want when I want, and I wear what I want.\""
};
