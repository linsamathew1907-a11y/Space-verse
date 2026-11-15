# SPACEVERSE – THE ULTIMATE AI-POWERED SPACE ADVENTURE 🚀

> **Tagline: Explore Space. Build Worlds. Become an Astronaut!**  
> An interactive, colourful, child-friendly space adventure game for children aged 7–12.

---

## 🌟 Highlights & Stitch MCP Design Integration

1. **Original Home Screen Preserved Exactly**:
   - The main entry point faithfully displays the full artwork (`spaceverse-homepage.png`) with all five friendly cartoon astronauts (Cadet Nova, Pip, Captain Sparky, Cosmo, Zara).
   - All interactive hotspot buttons (`Learn`, `Build Colony`, `Start`, `Missions`, `Rewards`, `Trophy`, `Settings`, `Logout`) are fully wired into the game engine.
2. **Stitch 6-Scene Panoramic Rocket Cockpit Cinematic Engine**:
   - Integrated directly from Stitch design assets (`stitch_spaceverse_kids_adventure_lobby`).
   - Clicking **START** launches the panoramic cockpit flight experience:
     - **Scene 1: Starlight Launch & Hyperdrive Acceleration** (Warp speed streak lines, Astro copilot comms).
     - **Scene 2: The Shimmering Spiral Galaxy** (Rotating multi-armed spiral galaxy, golden nebula nurseries).
     - **Scene 3: The Majestic Planetary Rings** (Saturn-like gas giant with Cassini division & cast ring shadows).
     - **Scene 4: Ancient Asteroid Belt** (Tumbling 3D cratered boulders with solar key lighting & HUD targeting).
     - **Scene 5: Planet Earth: The Blue Marble** (Photorealistic orbital approach with Rayleigh atmosphere halo).
     - **Scene 6: Space Academy & Vibrant Cosmic Galaxy Portal** (Vortex accretion rings, swirling galactic core).
   - Includes real-time altimeter and velocity gauges, cockpit rumble vibration, dancing speech wave visualizer, and step timeline pills.
3. **Stitch Design System & Neo-Arcade Glassmorphism**:
   - Designed following `DESIGN.md` with tactile 3D push-buttons, cosmic glassmorphism, responsive viewports, and vibrant palette: Hyper Cyan (`#00f5ff`), Nebula Magenta (`#ff1493`), Nova Gold (`#ffd000`), and Deep Space Navy (`#07051a`).
4. **No External Dependencies / Bundlers Needed**:
   - 100% self-contained vanilla HTML5, CSS3, and modern modular ES6 JavaScript. Simply double-click `index.html` to run in any modern web browser!

---

## 🤖 Astro AI — Your Robot Space Companion

Astro is an enthusiastic, patient, and friendly robot astronaut companion with comprehensive accessibility and intelligence features:

- **Mission Briefings (At Every Destination)**:
  - **Where You Are**: Specific astronomical location.
  - **What It's About**: The core scientific concept.
  - **Why It Matters**: The real-world importance for human spaceflight.
  - **Your Objectives**: Clear step-by-step checklist so children are never lost.
- **AI Reading Assistant**:
  - Web Speech API text-to-speech with a warm, robotic pitch and child-friendly cadence.
  - **Live Word-by-Word Highlighting**: Visually highlights the active word in real time as Astro reads instructions aloud.
  - **Slower Reading Option (0.75x)**: Easily toggle between Slower (0.75x), Normal (0.88x), and Faster (1.05x).
  - **Replay Button (`🔁`)**: Instantly re-read instructions with one tap.
  - **Space Science Dictionary**: Interactive popup explaining terms like *Orbit*, *Atmosphere*, *Regolith*, *Vacuum*, and *Gravity* in simple English.
  - **Captions Bar**: Displays live subtitles of everything Astro says.
- **Voice Recognition (Speech-to-Text)**:
  - Children can speak questions directly into their microphone via the Web Speech API (`SpeechRecognition`).
- **Ask Astro Anything**:
  - Accessible from the floating Astro button in the bottom-right corner.
  - Children can type or speak questions, or tap quick chips (*"What is Mars?"*, *"Why do astronauts wear spacesuits?"*, *"What does oxygen do?"*, *"Mission hint"*).
  - Context-aware answers tied directly to the active mission stage.
  - Safe, positive reinforcement that never penalizes or shames children.

---

## 🌌 The 4 Sequential Missions

Children follow an animated, sequential flight journey:

### 1. Earth – Astronaut Training Centre 🌍
- **Briefing**: Where, What, Why, and Objectives introduction.
- **Station 1: Orbit Arranger**: Arrange all 8 solar system planets in order starting closest to the Sun (*Mercury through Neptune*), unlocking real NASA facts for each world.
- **Station 2: Spacesuit Gear-Up**: Equip your cadet with a Gold Visor Helmet, Oxygen Backpack, Thermal Suit, Radio Headset, and Lunar Boots.
- **Station 3: Earth Habitability & Safety Quiz**: Learn why Earth is in the habitable "Goldilocks Zone" with liquid water, a breathable atmosphere, and a protective magnetic field.
- **Station 4: Rocket Staging & Launch Countdown**: Assemble 3 rocket stages (Booster Engines, Fuel Tank, Capsule) and trigger 3... 2... 1... Blast Off!
- **Graduation**: Confetti celebration, Cadet Wings badge, and unlock Destination 2.

### 2. Satellite – Space Communication Mission 🛰️
- **Briefing**: Where, What, Why, and Objectives introduction.
- **Challenge 1: Satellite Role Match-Up**: Match *Weather Satellites, GPS Navigation, Global Comms,* and the *James Webb Space Telescope* with their real-world jobs on Earth.
- **Challenge 2: Weather Tracking & GPS Discovery**: Discover how weather satellites give advance hurricane warnings and how 4 GPS satellites triangulate exact map coordinates.
- **Challenge 3: Orbit Insertion Pilot**: Interactive flight simulator balancing orbital velocity and gravity to guide a satellite into a stable green orbit ring.
- **Challenge 4: Deep Space Radio Relay**: Rotate Earth's Deep Space Network antenna dish to align with relay satellites and beam radio waves at the speed of light (186,000 miles/sec).
- **Celebration**: Satellite Specialist badge, stars awarded, and unlock Mars.

### 3. Mars – Exploration & Colony Builder 🔴
- **Briefing**: Where, What, Why, and Objectives introduction.
- **Phase 1: Mars Rover Surface Explorer**: Drive an interactive rover across the red Martian dunes to discover ancient riverbed hematite rocks, underground water-ice deposits, and the Olympus Mons viewpoint.
- **Phase 2: Colony Outpost Architect (9 Structures)**: Construct all 9 essential modular systems:
  1. Astronaut Habitat Dome
  2. MOXIE Oxygen Generator
  3. Water Recycler & Extractor
  4. Photovoltaic Solar Panels
  5. High-Capacity Battery Storage
  6. Hydroponic Greenhouse
  7. Radiation Shield Shelter
  8. Deep Space Comm Antenna
  9. Resource Storage Facility
- **Phase 3: Live 5-Resource Telemetry**: Tracks *Oxygen*, *Water*, *Electricity*, *Food*, and *Equipment Condition*.
- **Phase 4: Mars Dust Storm Emergency**: Switch to backup battery power, clean dusty solar panels, and inspect habitat seals.
- **Celebration**: Mars Architect badge, stars awarded, and unlock the Moon.

### 4. Moon – Lunar Explorer 🌙
- **Briefing**: Where, What, Why, and Objectives introduction.
- **Phase 1: Low-Gravity Lunar Rover Drive**: Drive the bouncy rover in 1/6th gravity across craters to collect scientific core samples (*Moon dust regolith, 4.5-billion-year-old Genesis rock, and permanently shadowed South Pole water-ice*).
- **Phase 2: Sunlight vs. Shadow Thermal Riddle**: Explore the extreme temperature swing between direct sunlight (+120°C) and crater shadows (-130°C) without an atmosphere.
- **Phase 3: Lunar Dust & Protective Equipment Challenge**: Learn why regolith dust is razor-sharp and brush it off before entering the airlock.
- **Phase 4: Artemis Base Camp**: Deploy the Artemis navigation gateway beacon to complete the interplanetary journey.
- **Celebration**: Lunar Pioneer badge and unlock the Final Achievement Screen.

---

## 🏛️ Advanced Outpost & Colony Simulation Engine (Sections 7–16)

Accessible directly from the **COLONY SIM** topbar navigation pill or the Galaxy Journey Map:

1. **Section 7: Planetary Expedition Selection**:
   - Choose between **Moon Expedition (Artemis Outpost Alpha)** and **Mars Expedition (Ares Station One)**.
   - Comprehensive planetary telemetry: Surface gravity (0.166g vs 0.38g), atmosphere compositions, day-night cycles, temperature extremes (-130°C to +120°C vs -125°C to +20°C), radiation dosage, and distinct engineering challenges.
2. **Section 8: Interactive Landing Site Evaluator**:
   - Radar ratings across 5 scientific criteria: *Terrain Stability*, *Sunlight Hours*, *Temperature Stability*, *Water-Ice Reserves*, and *Scientific Value*.
   - Sites include Shackleton Crater Rim, Ocean of Storms, and Mare Tranquillitatis on the Moon; Jezero Paleolake Delta and Gale Crater on Mars.
3. **Section 9: Colony Grid Construction (12 Functional Structures)**:
   - Construct, position, and upgrade 12 authentic modular space systems on an interactive 6x6 terrain grid:
     1. *Astronaut Habitat*
     2. *Oxygen Generation Facility (MOXIE / Electrolysis)*
     3. *Water Recycling Facility*
     4. *Solar Power Station*
     5. *Battery Storage Vault*
     6. *Radiation Shelter Bunker*
     7. *Hydroponic Greenhouse*
     8. *Subsurface Water Extractor*
     9. *Deep Space Comm Antenna*
     10. *Scientific Laboratory*
     11. *Medical & Emergency Facility*
     12. *Storage & Supply Depot*
   - Each structure has construction costs, energy demands, wear rates, and real-time effects on the survival simulation.
4. **Section 10: Core Survival Simulation Engine**:
   - Centralized multi-cycle simulation engine calculating production, consumption, and degradation across **Oxygen**, **Water**, **Food**, **Electricity**, and **Equipment Health**.
   - Includes educational **Simulated Astronaut Safety Indicators** and automatic emergency alarms.
5. **Section 11: Power Distribution & Engineering Trade-Offs**:
   - Interactive slider matrix routing electricity among 7 competing subsystems: *Life Support*, *Heating*, *Water Extraction*, *Greenhouse*, *Comms*, *Laboratory*, and *Habitat Domestic*.
   - One-touch engineering presets: *Standard*, *Eco Night*, *Science Burst*, and *Emergency Survival*.
6. **Section 12: Space Radiation & Space Weather**:
   - Real-time ambient flux telemetry (mSv/sol), Solar Particle Event (SPE) sirens, storm shelter evacuation (cutting radiation by 90%), and simulated solar storms.
7. **Section 13: Interactive Greenhouse Nursery**:
   - Select and cultivate 4 crop species: *Space Potatoes*, *Cosmic Microgreens*, *Dwarf Wheat*, and *Chlorella Algae Bioreactor*.
   - 4-stage biological visual monitor: Seed Germination 🌱 ➔ Vegetative Sprout 🌿 ➔ Flowering 🌸 ➔ Mature Crop 🥔.
   - Water allocation sliders, LED spectrum modes (Red-Blue Grow, Full Spectrum, Eco), and food harvesting.
8. **Section 14: Deep Space Communications & Mission Control**:
   - High-gain X-band parabolic dish linking the outpost to the NASA Deep Space Network (DSN).
   - Realistic speed-of-light propagation latency (1.3s for Moon, 6s simulated for Mars) and Houston flight director transmissions.
9. **Sections 15 & 16: Decision & Consequence Engine & Dynamic Space Events**:
   - Authentically structured space dilemmas with 6 distinct fields: *What Happened*, *Scientific Root Cause (Why)*, *Available Choices*, *Resource Costs*, *Consequences*, and *STEM Focus*.
   - Dynamic event triggers for Solar Flares (SPE), Martian Dust Storms, and Micrometeoroid Impacts with real-time resolution logs.

---

## 📜 Junior Space Explorer Certificate

- Displays child's customized cadet name, date, earned rank, score, stars, and four mission certification stamps.
- **Printable**: Click **🖨️ Print Certificate** for high-resolution print formatting.
- **Downloadable**: Click **💾 Download Image (.png)** to export a crisp 1200x800 certificate directly from HTML5 Canvas!

---

## 🎵 Procedural Web Audio Engine

- 100% code-generated audio using the Web Audio API — **no external `.mp3` or `.wav` files needed!**
- Arcade button clicks, celestial star chimes, ascending major victory fanfares, thruster launch rumbles, satellite radio telemetry beeps, and an ambient relaxing space drone.
- Full volume and toggle controls in the Settings menu.

---

## 🔬 Official NASA Citations

All educational space facts are curated and verified against official NASA sources:
- [NASA Science Division](https://science.nasa.gov/)
- [NASA Earth Science](https://science.nasa.gov/earth/)
- [NASA Mars Exploration](https://science.nasa.gov/mars/)
- [NASA Artemis Program](https://www.nasa.gov/artemis/)
- [NASA James Webb Space Telescope](https://science.nasa.gov/mission/webb/)

---

## 🚀 How to Run

1. Clone or download the repository folder.
2. Double-click `index.html` to open in Chrome, Edge, Safari, or Firefox.
3. Tap **START** on the home screen to launch the panoramic cockpit tour, or dive straight into the Galaxy Journey Map!