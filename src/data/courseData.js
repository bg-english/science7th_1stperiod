// data/courseData.js
// Structured for future Supabase migration — replace with API call when ready

export const COURSE_META = {
  grade: '7th Grade',
  subject: 'Science',
  period: '1st Period',
  year: 2026,
  theme: 'Año de la Pureza',
  themeVerse: 'Génesis 1:26-27',
  school: 'Colegio Boston Flexible',
}

export const STUDENTS = [
  { name: 'ACEVEDO DUQUE CARLOS DAVID',         email: 'cacevedo@redboston.edu.co' },
  { name: 'AGUIRRE CONTRERAS ANDREA KAROLINA',  email: 'andreaaguirre@redboston.edu.co' },
  { name: 'BARRAGAN RENDON MILTON SANTIAGO',    email: 'mbarragan@redboston.edu.co' },
  { name: 'CAMPO REVOLLO FLAVIA SOFIA',         email: 'fscampo@redboston.edu.co' },
  { name: 'CANAL PEREZ JUAN JOSE',              email: 'jjcanal@redboston.edu.co' },
  { name: 'CASTRO PEÑARANDA DANIELA',           email: 'daniellacastro@redboston.edu.co' },
  { name: 'CASTRO VELEZ CARLOS MIGUEL',         email: 'carloscastro@redboston.edu.co' },
  { name: 'CELANO SOLIS ALEJANDRO',             email: 'alejandrocs@redboston.edu.co' },
  { name: 'DE LA CRUZ PALMA ALEJANDRO',         email: 'dalejandro@redboston.edu.co' },
  { name: 'DUARTE VEGA ALEXANDER DAVID',        email: 'adduarte@redboston.edu.co' },
  { name: 'ECHEVERRIA DE LA HOZ JUAN SEBASTIAN',email: 'jsecheverria@redboston.edu.co' },
  { name: 'FIGUEROA MOLINA RENATA ISABEL',      email: 'renatafigueroa@redboston.edu.co' },
  { name: 'GARCES OSPINO ESTEBAN',              email: 'estebangarces@redboston.edu.co' },
  { name: 'GARCIA LOPERA SAMUEL',               email: 'samuelgarcia@redboston.edu.co' },
  { name: 'GOMEZ ORTEGA MARTIN',                email: 'martingomez@redboston.edu.co' },
  { name: 'GOMEZ PORRAS THALIANA SOFIA',        email: 'tsgomez@redboston.edu.co' },
  { name: 'GONZALEZ TORRES HELEN SOFIA',        email: 'helegonzalez@redboston.edu.co' },
  { name: 'GUERRERO BELTRAN JORDAN SAID',       email: 'jsguerrero@redboston.edu.co' },
  { name: 'GUTIERREZ COLLANTE SHADDAI',         email: 'sgutierrez@redboston.edu.co' },
  { name: 'HERRERA GOMEZ ISABELLA',             email: 'iherrera@redboston.edu.co' },
  { name: 'JIMENEZ RIVADENEIRA LINDA VALERIA',  email: 'lindajimenez@redboston.edu.co' },
  { name: 'MONTERROSA PACHECO LEANDRO',         email: 'lmonterrosap@redboston.edu.co' },
  { name: 'MUÑOZ TORNETH MATEO',                email: 'mateomunoz@redboston.edu.co' },
  { name: 'NIETO SOLORZANO EMILY',              email: 'emilynieto@redboston.edu.co' },
  { name: 'ORDOÑEZ QUINTERO EMANUEL',           email: 'emanuelordonez@redboston.edu.co' },
  { name: 'PRADA GOMEZ ISABELLA SOFIA',         email: 'isabellaprada@redboston.edu.co' },
  { name: 'PRIMO ESCORCIA MARIA ANGEL',         email: 'ma-primo@redboston.edu.co' },
  { name: 'RAMIREZ BAUQUEZ DANIELA SOFIA',      email: 'dsramirez@redboston.edu.co' },
  { name: 'ROBLES PEREZ JUAN ANDRES',           email: 'jarobles@redboston.edu.co' },
  { name: 'ROHENEZ CUELLO KEVIN DANIEL',        email: 'kevinrohenez@redboston.edu.co' },
  { name: 'SILVERA DEL CASTILLO LUCIANA',       email: 'lsilvera@redboston.edu.co' },
]

export const MODULES = [
  {
    id: 's1',
    icon: '🌍',
    tab: 'Ecosystems',
    title: 'Ecosystems & Components',
    indicator: 'Indicator 1 · Vocabulary & Environment',
    verse: {
      text: '"Then the Lord God provided a gourd and made it grow up over Jonah to give shade over his head and to deliver him from his discomfort. And Jonah was very glad about the gourd."',
      ref: 'Jonah 4:6',
      reflection: 'God used a plant — part of creation — to meet Jonah\'s need. This shows us that ecosystems are not random. They are carefully designed by God to sustain life. Did Jonah have the right to complain when the plant died? What does this teach us about how we value creation?',
    },
    theory: {
      cards: [
        {
          title: '🔍 What is an Ecosystem?',
          content: 'An <b>ecosystem</b> is a community of living organisms (biotic factors) interacting with each other and with their non-living environment (abiotic factors) in a specific area. Ecosystems can be as large as an ocean or as small as a puddle.',
          extra: 'From a biblical worldview, ecosystems reveal God\'s wisdom. In Genesis 1, God created living things "according to their kinds" and placed them in environments perfectly suited for them — showing purposeful design, not accident.',
        },
        {
          title: '☀️ Abiotic vs. Biotic Factors',
          content: '<b>Abiotic factors</b> are the non-living parts:',
          bullets: ['Sunlight — energy source for photosynthesis','Water — essential for all life processes','Temperature — determines which organisms can survive','Soil — provides nutrients and support for plants','Air (CO₂, O₂) — needed for respiration and photosynthesis'],
          content2: '<b>Biotic factors</b> are the living parts:',
          bullets2: ['Producers (plants, algae) — make their own food via photosynthesis','Consumers (animals) — eat other organisms','Decomposers (fungi, bacteria) — break down dead matter and recycle nutrients'],
        },
        {
          title: '🏞️ Types of Ecosystems',
          bullets: ['<b>Terrestrial:</b> Forest, Grassland, Desert, Tundra, Rainforest','<b>Aquatic (freshwater):</b> Rivers, Lakes, Ponds, Wetlands','<b>Aquatic (marine):</b> Ocean, Coral Reef, Estuary','<b>Urban/Modified:</b> Cities, Farms — shaped by humans'],
        },
      ],
      vocab: [
        { term: 'Ecosystem',    def: 'Community of organisms + their environment' },
        { term: 'Habitat',      def: 'The place where an organism naturally lives' },
        { term: 'Niche',        def: "An organism's role/function in its ecosystem" },
        { term: 'Population',   def: 'All individuals of one species in an area' },
        { term: 'Community',    def: 'All populations living in the same area' },
        { term: 'Biome',        def: 'Large area with similar climate & organisms' },
        { term: 'Producer',     def: 'Organism that makes its own food (plant)' },
        { term: 'Consumer',     def: 'Organism that eats other organisms' },
        { term: 'Decomposer',   def: 'Breaks down dead organisms; recycles nutrients' },
        { term: 'Abiotic',      def: 'Non-living components (water, sunlight, air)' },
        { term: 'Biotic',       def: 'Living components of an ecosystem' },
        { term: 'Biodiversity', def: 'Variety of living species in an area' },
      ],
    },
    practice: [
      { id:'s1-1', type:'mc', text:'Which of the following is an ABIOTIC factor in a forest ecosystem?', options:['A mushroom growing on a log','Sunlight reaching the forest floor','A deer eating leaves','Bacteria in the soil'], correct:1, feedback:'Sunlight is non-living (abiotic). Mushrooms, deer, and bacteria are all living (biotic) factors.' },
      { id:'s1-2', type:'tf', text:'Decomposers are producers because they create nutrients from dead matter.', correct:false, feedback:'FALSE — Decomposers break DOWN dead matter; they do not produce their own food like producers do.' },
      { id:'s1-3', type:'mc', text:'A coral reef is an example of which type of ecosystem?', options:['Terrestrial','Freshwater aquatic','Marine aquatic','Urban'], correct:2, feedback:'Coral reefs are found in saltwater — they are marine aquatic ecosystems.' },
      { id:'s1-4', type:'tf', text:'A population includes all the different species living in the same area.', correct:false, feedback:'FALSE — That describes a community. A population is all individuals of ONE species in an area.' },
      { id:'s1-5', type:'mc', text:'In Jonah 4:6, God provided a gourd plant for Jonah. In ecosystem terms, this plant was acting as a:', options:['Producer','Consumer','Decomposer','Abiotic factor'], correct:0, feedback:'The gourd made its own food via photosynthesis — it is a producer.' },
      { id:'s1-6', type:'mc', text:'What is a NICHE in an ecosystem?', options:['The physical location where an organism lives','The role or function an organism has in its ecosystem','The number of organisms in a population','The variety of species in an area'], correct:1, feedback:'A niche is the role/function — what an organism does, not just where it lives (that is its habitat).' },
    ],
  },

  {
    id: 's2',
    icon: '🕸️',
    tab: 'Food Webs',
    title: 'Food Chains & Food Webs',
    indicator: 'Indicator 2 · Interdependence & Conservation',
    verse: {
      text: '"Then the Lord God provided a gourd and made it grow up over Jonah to give shade over his head and to deliver him from his discomfort."',
      ref: 'Jonah 4:6',
      reflection: 'Just as the gourd was fragile and could be taken away in one night, food chains are fragile too. God designed all life to be interconnected. When we remove one link, the whole chain is affected. How can we honor God by protecting these connections?',
    },
    theory: {
      cards: [
        {
          title: '🔗 Food Chain vs. Food Web',
          content: 'A <b>food chain</b> shows a single pathway of energy transfer from one organism to another. A <b>food web</b> shows ALL the interconnected food chains in an ecosystem — a more realistic picture of how energy flows.',
          extra: '<b>Energy flows in ONE direction:</b> Sun → Producers → Primary Consumers → Secondary Consumers → Tertiary Consumers → Decomposers',
        },
        {
          title: '⚡ What Happens If a Species Disappears?',
          content: 'If one organism is removed from a food web, it causes a <b>cascade effect</b>:',
          bullets: ['Its prey population may <b>explode</b> (overpopulation)','Its predators may <b>decline</b> due to loss of food','Plant populations may be <b>devastated</b> by unchecked herbivores','The entire ecosystem can become <b>unbalanced</b>'],
          extra: '🌿 This is why God\'s creation is designed with interdependence — every part matters. Just like the gourd mattered to Jonah, every organism matters.',
        },
      ],
      vocab: [
        { term: 'Food Chain',     def: 'Single path of energy from producers to consumers' },
        { term: 'Food Web',       def: 'All interconnected food chains in an ecosystem' },
        { term: 'Trophic Level',  def: 'Position an organism occupies in a food chain' },
        { term: 'Herbivore',      def: 'Animal that eats only plants (primary consumer)' },
        { term: 'Carnivore',      def: 'Animal that eats other animals' },
        { term: 'Omnivore',       def: 'Animal that eats both plants and animals' },
        { term: 'Predator',       def: 'Animal that hunts and eats other animals' },
        { term: 'Prey',           def: 'Animal that is hunted and eaten' },
        { term: 'Energy Pyramid', def: 'Shows energy lost (90%) at each trophic level' },
        { term: 'Pollinator',     def: 'Organism that transfers pollen (bees, butterflies)' },
      ],
    },
    practice: [
      { id:'s2-1', type:'mc', text:'In a food chain: Grass → Rabbit → Fox → Eagle. The rabbit is a:', options:['Producer','Primary Consumer','Secondary Consumer','Decomposer'], correct:1, feedback:'The rabbit eats grass (the producer) directly — making it a primary consumer.' },
      { id:'s2-2', type:'tf', text:'A food web is a more complete representation of feeding relationships than a food chain.', correct:true, feedback:'TRUE — A food web shows multiple interconnected chains, which is closer to reality.' },
      { id:'s2-3', type:'mc', text:'If bees (pollinators) disappear from an ecosystem, what is the most likely first effect?', options:['Fish populations will decrease','Predators will increase','Many plants will fail to reproduce, reducing food for herbivores','Decomposers will disappear'], correct:2, feedback:'Without pollinators, plants cannot reproduce — this reduces food for herbivores, triggering a cascade.' },
      { id:'s2-4', type:'tf', text:'In an energy pyramid, the highest trophic level contains the MOST energy.', correct:false, feedback:'FALSE — Producers (bottom) have the most energy. About 90% is lost at each level going up.' },
      { id:'s2-5', type:'mc', text:'An animal that eats BOTH plants and animals is called:', options:['Herbivore','Carnivore','Omnivore','Decomposer'], correct:2, feedback:'Omnivore comes from Latin: "omni" (all) + "vorare" (to eat). Examples: bears, humans.' },
      { id:'s2-6', type:'mc', text:'Connecting to Jonah 4:6 — the gourd was removed and Jonah suffered. This parallels what concept in ecology?', options:['Energy pyramid','Cascade effect — removing one element affects the whole system','Photosynthesis cycle','Biome classification'], correct:1, feedback:'The cascade effect — just like removing the gourd affected Jonah, removing one species affects the whole ecosystem.' },
    ],
  },

  {
    id: 's3',
    icon: '👕',
    tab: 'Fast Fashion',
    title: 'Fast Fashion & Ecosystem Impact',
    indicator: 'Indicator 3 · Environmental Impact & Stewardship',
    verse: {
      text: '"For the land you are about to possess is not like the land of Egypt... But the land you are about to possess is a land of mountains and valleys, watered by rain from heaven. It is a land the Lord your God cares for, from the beginning of the year to the end of the year."',
      ref: 'Deuteronomy 11:10-11',
      reflection: "God cares for the land year-round. He designed creation to sustain itself through natural cycles. When factories dump chemicals into rivers or release toxins into the air, they damage what God loves. As His stewards, we are called to protect, not destroy.",
    },
    theory: {
      cards: [
        {
          title: '🏭 What is Fast Fashion?',
          content: '<b>Fast fashion</b> refers to the rapid mass production of cheap clothing, driven by constantly changing trends. Companies produce huge quantities of low-cost garments designed to be worn only a few times before being thrown away.',
          bullets: ['The fashion industry produces <b>10% of global carbon emissions</b>','It is the <b>second largest polluter of water</b> worldwide','Around <b>85% of textiles</b> end up in landfills or are burned each year','Producing one cotton T-shirt requires <b>2,700 liters of water</b>'],
        },
        {
          title: '☠️ Environmental Consequences',
          bullets: ['<b>Water pollution:</b> Chemical dyes dumped into rivers, poisoning aquatic ecosystems','<b>Microplastic pollution:</b> Synthetic fabrics release microplastics when washed — fish consume them','<b>Soil degradation:</b> Pesticide-heavy cotton farming kills beneficial soil organisms','<b>Air pollution:</b> Textile burning releases greenhouse gases and toxic chemicals','<b>Habitat destruction:</b> Deforestation for raw materials reduces biodiversity'],
        },
        {
          title: "✅ What Can We Do? (God's Stewards)",
          content: 'Deuteronomy 11 reminds us that God cares for the land. As His stewards, we should:',
          bullets: ['Buy fewer clothes and choose better quality over quantity','Donate or upcycle old clothing (like the class project!)','Support sustainable and ethical brands','Learn to repair clothes instead of throwing them away','Avoid synthetic fabrics when possible','Spread awareness about fast fashion\'s true cost'],
        },
      ],
      vocab: [
        { term: 'Fast Fashion',    def: 'Rapid, cheap mass production of trendy clothing' },
        { term: 'Stewardship',     def: 'Responsible care of something entrusted to you' },
        { term: 'Microplastics',   def: 'Tiny plastic particles from synthetic fabrics' },
        { term: 'Toxic Chemicals', def: 'Harmful substances used in fabric production' },
        { term: 'Upcycling',       def: 'Transforming old items into something valuable' },
        { term: 'Carbon Emissions',def: 'CO₂ released into atmosphere by industry' },
        { term: 'Sustainable',     def: 'Using resources without harming future generations' },
        { term: 'Biodiversity',    def: 'Variety of species in an area' },
      ],
    },
    practice: [
      { id:'s3-1', type:'mc', text:'What percentage of global carbon emissions does the fashion industry produce?', options:['2%','10%','25%','50%'], correct:1, feedback:'The fashion industry produces approximately 10% of global carbon emissions — more than aviation and shipping combined.' },
      { id:'s3-2', type:'tf', text:'Microplastics from synthetic fabrics can enter food chains through waterways.', correct:true, feedback:'TRUE — When synthetic clothes are washed, microplastics enter waterways, are eaten by fish, and enter the food chain.' },
      { id:'s3-3', type:'mc', text:'According to Deuteronomy 11:10-11, how does God relate to the land?', options:['God only created it and left it alone','God only cares about people, not the land','God actively cares for the land throughout the whole year','God allows humans to use the land however they want'], correct:2, feedback:'The verse says God cares for the land "from the beginning of the year to the end of the year" — actively, continuously.' },
      { id:'s3-4', type:'tf', text:'Fast fashion companies are designed to produce clothing that lasts many years.', correct:false, feedback:'FALSE — Fast fashion is designed for short use. The model depends on consumers buying constantly and discarding quickly.' },
      { id:'s3-5', type:'mc', text:"Which is the BEST example of being a good steward of God's creation in relation to fashion?", options:['Buying new clothes every week because they are cheap','Throwing away clothes when they go out of style','Buying only the most expensive brands','Upcycling old clothes and choosing sustainable options'], correct:3, feedback:'Upcycling and sustainable choices reflect the stewardship God calls us to in Deuteronomy 11.' },
      { id:'s3-6', type:'mc', text:'Chemical dyes from clothing factories dumped in rivers mainly affect which part of an ecosystem?', options:['The atmosphere and wind patterns','Aquatic ecosystems and their food chains','Only the soil, not living organisms','Only terrestrial ecosystems'], correct:1, feedback:'Chemical dyes directly poison rivers — killing aquatic organisms and disrupting entire aquatic food chains.' },
    ],
  },
]

export const WORKSHOP_QUESTIONS = [
  { id:'wq1', type:'mc', section:'Ecosystems',   points:1, text:'Which combination correctly pairs abiotic and biotic factors?', options:['Sunlight (abiotic) + Deer (biotic)','Tree (abiotic) + River (biotic)','Bacteria (abiotic) + Temperature (biotic)','Eagle (abiotic) + Soil (biotic)'], correct:0 },
  { id:'wq2', type:'tf', section:'Ecosystems',   points:1, text:'A biome is smaller than an ecosystem.', correct:false },
  { id:'wq3', type:'mc', section:'Food Webs',    points:1, text:'In: Algae → Small Fish → Large Fish → Shark. What is the trophic level of the Large Fish?', options:['Producer','Primary Consumer','Secondary Consumer','Tertiary Consumer'], correct:2 },
  { id:'wq4', type:'tf', section:'Food Webs',    points:1, text:'If a top predator is removed from an ecosystem, the populations of primary consumers will likely increase out of control.', correct:true },
  { id:'wq5', type:'mc', section:'Fast Fashion', points:1, text:'Which is a direct consequence of synthetic fabric production on aquatic ecosystems?', options:['Increased oxygen levels in rivers','Microplastic pollution entering the food chain','Higher fish population due to new food sources','Reduction of carbon dioxide in water'], correct:1 },
  { id:'wq6', type:'tf', section:'Fast Fashion', points:1, text:'Upcycling old clothes is an example of environmental stewardship as described in Deuteronomy 11.', correct:true },
  { id:'wq7', type:'open', section:'Food Webs',  points:2, text:'Look at this food chain: Grass → Grasshopper → Frog → Snake → Hawk. If all the frogs disappear due to a disease, describe TWO effects this would have on the food web. Explain using the concept of interdependence.', placeholder:'Describe 2 effects with explanation...' },
  { id:'wq8', type:'open', section:'Biblical',   points:2, text:'Based on Jonah 4:6 and Deuteronomy 11:10-11, explain in your own words: What is our responsibility as Christians toward God\'s creation? Connect at least ONE specific example from Science class.', placeholder:'Write your biblical reflection here...' },
]

export const TELEGRAM = {
  botToken: '8671177458:AAFdgPZO0Z0RdkNwfPsFryfYYespUWGDs24',
  chatId: '2041749428',
}

export const JUDAH_MESSAGES = {
  login:  "Hi! I'm Judah 🦁 Ready to review Science? Let's go, Great Disciple! 🌿",
  s1:     "🌍 Let's explore Ecosystems! Remember: God designed every creature with a purpose. Ready? 💪",
  s2:     "🕸️ Food Webs time! Every link matters — just like in Jonah's story. You've got this! 🦁",
  s3:     "👕 Fast Fashion impacts God's creation. Let's be good stewards together! 🌿",
  s4:     "📝 Final Workshop! You've studied hard. Trust God and do your best. I believe in you! 🏆",
}

// ─── GAME DATA ───────────────────────────────────────────────────────────────

export const MATCH_DATA = {
  s1: [
    { term: 'Ecosystem',   def: 'Community of organisms + environment' },
    { term: 'Producer',    def: 'Makes own food via photosynthesis' },
    { term: 'Decomposer',  def: 'Breaks down dead matter' },
    { term: 'Abiotic',     def: 'Non-living factor (sunlight, water)' },
    { term: 'Niche',       def: 'Role an organism plays in ecosystem' },
    { term: 'Biodiversity',def: 'Variety of species in an area' },
  ],
  s2: [
    { term: 'Food Web',      def: 'All interconnected food chains' },
    { term: 'Herbivore',     def: 'Eats only plants' },
    { term: 'Carnivore',     def: 'Eats only animals' },
    { term: 'Omnivore',      def: 'Eats both plants and animals' },
    { term: 'Pollinator',    def: 'Transfers pollen between flowers' },
    { term: 'Energy Pyramid',def: '90% energy lost at each trophic level' },
  ],
  s3: [
    { term: 'Fast Fashion',    def: 'Rapid cheap mass clothing production' },
    { term: 'Microplastics',   def: 'Tiny plastic particles from synthetic fabric' },
    { term: 'Stewardship',     def: 'Responsible care of God\'s creation' },
    { term: 'Upcycling',       def: 'Transforming old items into new value' },
    { term: 'Sustainable',     def: 'Meets needs without harming future generations' },
    { term: 'Carbon Emissions',def: 'CO₂ released by industrial production' },
  ],
}

export const WORDSEARCH_DATA = {
  s1: ['ECOSYSTEM','HABITAT','PRODUCER','CONSUMER','BIOME','NICHE','ABIOTIC','BIOTIC','POPULATION','COMMUNITY'],
  s2: ['FOODWEB','HERBIVORE','CARNIVORE','OMNIVORE','PREDATOR','PREY','POLLINATOR','TROPHIC','CASCADE','DECOMPOSER'],
  s3: ['FASHION','MICROPLASTIC','STEWARDSHIP','UPCYCLING','SUSTAINABLE','POLLUTION','CHEMICAL','TEXTILE','CARBON','LANDFILL'],
}

export const CROSSWORD_DATA = {
  s1: [
    { id:'c1', number:1, answer:'ECOSYSTEM',   dir:'across', row:0, col:0, clue:'Community of organisms and their environment' },
    { id:'c2', number:2, answer:'ENERGY',      dir:'down',   row:0, col:4, clue:'What flows through a food chain from the sun' },
    { id:'c3', number:3, answer:'NICHE',       dir:'across', row:2, col:2, clue:'Role an organism plays in its ecosystem' },
    { id:'c4', number:4, answer:'HABITAT',     dir:'down',   row:0, col:8, clue:'Place where an organism naturally lives' },
    { id:'c5', number:5, answer:'BIOME',       dir:'across', row:4, col:1, clue:'Large region with similar climate and organisms' },
    { id:'c6', number:6, answer:'PRODUCER',    dir:'down',   row:2, col:6, clue:'Organism that makes its own food' },
  ],
  s2: [
    { id:'c1', number:1, answer:'FOODWEB',     dir:'across', row:0, col:0, clue:'Network of all food chains in an ecosystem' },
    { id:'c2', number:2, answer:'OMNIVORE',    dir:'down',   row:0, col:3, clue:'Animal that eats both plants and animals' },
    { id:'c3', number:3, answer:'PREDATOR',    dir:'across', row:3, col:0, clue:'Animal that hunts and eats other animals' },
    { id:'c4', number:4, answer:'TROPHIC',     dir:'down',   row:0, col:7, clue:'___ level: position in a food chain' },
    { id:'c5', number:5, answer:'CASCADE',     dir:'across', row:5, col:2, clue:'Effect when one species disappears and others are impacted' },
  ],
  s3: [
    { id:'c1', number:1, answer:'FASHION',     dir:'across', row:0, col:0, clue:'Fast ___ industry: cheap trendy clothing' },
    { id:'c2', number:2, answer:'STEWARD',     dir:'down',   row:0, col:3, clue:'A good ___ cares for God\'s creation' },
    { id:'c3', number:3, answer:'UPCYCLE',     dir:'across', row:3, col:1, clue:'Transform old clothes into something valuable' },
    { id:'c4', number:4, answer:'LANDFILL',    dir:'down',   row:0, col:6, clue:'Where 85% of textiles end up' },
    { id:'c5', number:5, answer:'CARBON',      dir:'across', row:5, col:0, clue:'___ emissions: 10% comes from fashion industry' },
    { id:'c6', number:6, answer:'POLLUTION',   dir:'down',   row:3, col:4, clue:'What chemical dyes cause in rivers' },
  ],
}

// Workshop games (evaluated)
export const WORKSHOP_MATCH = [
  { term: 'Abiotic factor',   def: 'Sunlight, water, temperature, soil' },
  { term: 'Biotic factor',    def: 'Plants, animals, fungi, bacteria' },
  { term: 'Primary consumer', def: 'Organism that eats producers directly' },
  { term: 'Cascade effect',   def: 'Chain reaction when one species is removed' },
  { term: 'Stewardship',      def: 'God\'s call to care for His creation' },
  { term: 'Microplastics',    def: 'Tiny particles from synthetic fabrics in waterways' },
]

export const WORKSHOP_WORDSEARCH = [
  'PRODUCER','CONSUMER','ECOSYSTEM','TROPHIC','CASCADE',
  'STEWARDSHIP','UPCYCLE','POLLUTION','BIODIVERSITY','HABITAT'
]

export const WORKSHOP_CROSSWORD = [
  { id:'wc1', number:1, answer:'BIOTIC',       dir:'across', row:0, col:0, clue:'Living components of an ecosystem' },
  { id:'wc2', number:2, answer:'OMNIVORE',     dir:'down',   row:0, col:2, clue:'Eats both plants and animals' },
  { id:'wc3', number:3, answer:'TROPHIC',      dir:'across', row:3, col:0, clue:'___ level: position in food chain' },
  { id:'wc4', number:4, answer:'CASCADE',      dir:'down',   row:0, col:6, clue:'Effect when a species disappears' },
  { id:'wc5', number:5, answer:'STEWARD',      dir:'across', row:5, col:1, clue:'A good ___ cares for creation (Deut. 11)' },
  { id:'wc6', number:6, answer:'LANDFILL',     dir:'down',   row:3, col:5, clue:'Destination for 85% of fast fashion waste' },
]
