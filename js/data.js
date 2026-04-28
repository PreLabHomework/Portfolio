// ============================================================
//  ROSTER, 11 characters
// ============================================================

export const ROSTER = [
  {
    id: "home", codename: "HMZA-01", title: "HAMZA", subtitle: "AL TAKROURI",
    tagline: "CHOOSE YOUR HERO",
    accent: "#ffd166", accent2: "#ef476f",
    role: "MAIN", figure: "protagonist",
    preview: {
      headline: "HAMZA'S HOUSE",
      sub: "PORTFOLIO · SELECT A HERO TO BEGIN",
      blurb: "Welcome. I'm Hamza Abu Khalaf Al Takrouri, a senior Computer and Electrical Engineer at Saint Louis University. Each hero in this lineup represents a part of my work. Pick one to enter.",
      stats: [["CLASS","ENGINEER"],["TIER","SR / 2026"],["BASED IN","ST. LOUIS"],["OPEN TO","FW · HW · SW"]]
    },
    play_url: "#home", play_label: "ENTER"
  },
  {
    id: "labs", codename: "LAB-02", title: "LABS", subtitle: "RESEARCH FLOOR",
    tagline: "EMBEDDED · ML · HARDWARE R&D",
    accent: "#4ade80", accent2: "#22c55e",
    role: "RESEARCH", figure: "scientist",
    preview: {
      headline: "RESEARCH",
      sub: "CHROME · WNIS · BIOMECHANICS",
      blurb: "Three labs at Saint Louis University. Haptic wearables for DeafBlind communication, behavioral driver authentication via mmWave radar, and a modernized hematology diagnostic device. Concurrent since Fall 2025.",
      stats: [["LABS","3"],["DOMAIN","WEARABLES · ML · MEDICAL HW"],["FUNDING","NSF · NIH · FIRE"],["VENUE","IEEE INFOCOM"]]
    },
    play_url: "#labs", play_label: "ENTER LAB"
  },
  {
    id: "capstone", codename: "CAP-03", title: "CAPSTONE", subtitle: "TREMOR STABILIZER",
    tagline: "PARKINSON'S TREMOR SUPPRESSION",
    accent: "#ef4444", accent2: "#f87171",
    role: "FINAL YEAR", figure: "engineer",
    preview: {
      headline: "WEARABLE STABILIZER",
      sub: "PARKINSON'S TREMOR SUPPRESSION",
      blurb: "A wearable sleeve that detects Parkinson's tremors with an ESP32-S3 and IMU sensor fusion, runs FFT to isolate the tremor frequency, then drives a closed-loop actuator to counter it. Companion React Native app pairs over BLE.",
      stats: [["CHIP","ESP32-S3"],["SIGNAL","FFT + IMU"],["APP","REACT NATIVE"],["DEADLINE","MAY 2026"]]
    },
    play_url: "#capstone", play_label: "VIEW BUILD"
  },
  {
    id: "projects", codename: "PRJ-04", title: "PROJECTS", subtitle: "GALLERY",
    tagline: "SHIPPED · STANDALONE · INDEPENDENT",
    accent: "#f59e0b", accent2: "#fbbf24",
    role: "BUILDER", figure: "builder",
    preview: {
      headline: "PROJECTS",
      sub: "STANDALONE BUILDS",
      blurb: "Work outside any lab or coursework. WiFi network analysis, FPGA real-time graphics, NLP-driven code generation, browser-based audio synthesis, mobile authentication, and a few more.",
      stats: [["SHIPPED","12"],["STACKS","FW · FPGA · ML · WEB · MOBILE"],["MOST OF IT","SOLO"],["RANGE","2022 → NOW"]]
    },
    play_url: "https://github.com/prelabhomework", play_label: "VIEW GITHUB"
  },
  {
    id: "research", codename: "PUB-05", title: "RESEARCH", subtitle: "PAPERS · PATENTS",
    tagline: "PUBLISHED · IN-FLIGHT · CERTIFIED",
    accent: "#a78bfa", accent2: "#c4b5fd",
    role: "AUTHOR", figure: "author",
    preview: {
      headline: "PAPERS & PATENTS",
      sub: "PUBLISHED · IN PROGRESS",
      blurb: "Publications and certifications across embedded systems, machine learning, and forensic engineering. One published paper, one patent presenting April 30, two more papers in active development.",
      stats: [["PAPERS","3 IN-FLIGHT"],["PUBLISHED","1"],["PATENT","APR 30"],["CERTS","8"]]
    },
    play_url: "#research", play_label: "OPEN ARCHIVE"
  },
  {
    id: "skills", codename: "SKL-06", title: "SKILLS", subtitle: "LOADOUT",
    tagline: "LANGUAGES · HARDWARE · TOOLS",
    accent: "#22d3ee", accent2: "#67e8f9",
    role: "LOADOUT", figure: "technician",
    preview: {
      headline: "LOADOUT",
      sub: "LANGUAGES · HARDWARE · TOOLS",
      blurb: "Python and C++ for most engineering work. C, MATLAB, and VHDL for embedded and signal processing. JavaScript for web. ESP32, Arduino, FPGA, and Raspberry Pi for hardware. Five spoken languages.",
      stats: [["PYTHON","8 YRS"],["C / C++","2 / 4 YRS"],["FPGA","2 YRS"],["LANGUAGES","5"]]
    },
    play_url: "#skills", play_label: "INSPECT"
  },
  {
    id: "timeline", codename: "TLN-07", title: "TIMELINE", subtitle: "SCROLL",
    tagline: "AMMAN · DOHA · MADRID · ST. LOUIS",
    accent: "#f472b6", accent2: "#f9a8d4",
    role: "HISTORY", figure: "archivist",
    preview: {
      headline: "TIMELINE",
      sub: "CHRONOLOGICAL",
      blurb: "How the work got built. Internships, projects, papers, and the moments in between, in order. Updated whenever new things land.",
      stats: [["RANGE","2003 → 2026"],["ENTRIES","24+"],["UPDATED","LIVE"],["FORMAT","JOURNAL"]]
    },
    play_url: "#timeline", play_label: "SCROLL"
  },
  {
    id: "affiliations", codename: "AFF-08", title: "AFFILIATIONS", subtitle: "WALL",
    tagline: "MIT · HARVARD · CMU · SAMSUNG",
    accent: "#e5e7eb", accent2: "#f3f4f6",
    role: "NETWORK", figure: "diplomat",
    preview: {
      headline: "AFFILIATIONS",
      sub: "INSTITUTIONS · COMPANIES · PROGRAMS",
      blurb: "Places that have had me on their payroll, roster, or program list. Some paid, some volunteer, all worth keeping on the wall.",
      stats: [["TOTAL","12"],["TOP-TIER","MIT · HARVARD · CMU"],["INDUSTRY","CORSAIR · GSK · SAMSUNG"],["REGION","US · QA · ES"]]
    },
    play_url: "#affiliations", play_label: "OPEN WALL"
  },
  {
    id: "personal", codename: "PSN-09", title: "PERSONAL", subtitle: "OFF-DUTY",
    tagline: "FOUR COUNTRIES · SIX LANGUAGES",
    accent: "#fb923c", accent2: "#fdba74",
    role: "CIVILIAN", figure: "civilian",
    preview: {
      headline: "OFF-DUTY",
      sub: "GAMING · SPORTS · STORIES",
      blurb: "Four countries, six languages, top 500 in two shooters, vice president of a high school council, and a story about a hacker who picked the wrong Steam library.",
      stats: [["COUNTRIES","4"],["LANGUAGES","6"],["OW RANK","TOP 500"],["TEAMS","5 FAVORITES"]]
    },
    play_url: "#personal", play_label: "VIEW BIO"
  },
  {
    id: "astakeria", codename: "AST-10", title: "ASTAKERIA", subtitle: "ECHOES OF THE OVERWRITTEN",
    tagline: "THE GAME THAT WATCHES YOU BACK",
    accent: "#fb7185", accent2: "#fda4af",
    role: "LEGEND", figure: "astakeria",
    preview: {
      headline: "ASTAKERIA",
      sub: "ECHOES OF THE OVERWRITTEN",
      blurb: "A first-person action RPG that reads how you play and rewrites itself around you. Five heroes. No loot. One system called Entropy that turns your habits into the world's history.",
      stats: [["ENGINE","GODOT 4.X"],["HEROES","5"],["SYSTEM","ENTROPY"],["SCOPE","SOLO DEV"]]
    },
    play_url: "#astakeria", play_label: "ENTER WORLD"
  },
  {
    id: "soon", codename: "???-11", title: "???", subtitle: "TRANSMISSION INCOMING",
    tagline: "SOMETHING IS BEING BUILT",
    accent: "#64748b", accent2: "#94a3b8",
    role: "UNKNOWN", figure: "unknown",
    preview: {
      headline: "COMING SOON",
      sub: "TRANSMISSION INCOMING",
      blurb: "Something is being built in this slot. Check back soon.",
      stats: [["STATUS","CLASSIFIED"],["ETA","TBD"],["SIGNAL","WEAK"],["TRUST","UNVERIFIED"]]
    },
    play_url: "#soon", play_label: "WAIT"
  }
];

// ============================================================
//  SECTIONS, each with a unique layout based on content genre
// ============================================================

export const SECTIONS = {
  home: {
    layout: "home",
    heading: "HAMZA'S HOUSE",
    sub: "this is a portfolio styled as a fighter-select screen.",
    intro: "Most portfolio sites look the same. I built this one differently. Each hero in the lineup at the bottom is a part of my work, the labs I'm in, the projects I've shipped, the papers in flight, and the person under all of it. Hover any to preview, click to enter. ESC to come back.",
    bio: [
      "I'm a senior Computer and Electrical Engineer at Saint Louis University, graduating May 2026, with minors in Computer Science and Mathematics.",
      "I work across firmware, mobile, hardware, and machine learning. Right now that means three concurrent research labs, a senior design capstone, an in-progress patent, and a few standalone projects on the side."
    ],
    quickfacts: [
      { k: "based in", v: "saint louis, missouri" },
      { k: "speaks",   v: "arabic, spanish, english, portuguese, italian, japanese" },
      { k: "open to",  v: "firmware, hardware, software" },
      { k: "graduating", v: "may 2026" }
    ]
  },

  labs: {
    layout: "labs",
    heading: "RESEARCH",
    sub: "three concurrent labs at saint louis university, since fall 2025.",
    labs: [
      {
        key: "chrome",
        name: "CHROME LAB",
        focus: "Haptic wearables for DeafBlind communication",
        pi: "PhD-mentored research",
        status: "PAPER IN PROGRESS · NSF + NIH FUNDED",
        story: [
          "CHROME develops wearable haptic interfaces for the DeafBlind community, drawing on Protactile (PT), a purely tactile language that has emerged in the DB community over the last decade. PT shows that touch can carry the meaningful structure of human communication. The lab works on translating that intuition into wearable hardware.",
          "I contribute to two threads. First, an 18-page paper on haptic wearables for DeafBlind communication, currently in progress. Second, the technical infrastructure: a Python desktop application for one-click OTA firmware updates over Bluetooth serial, automating AVRdude flashing for the ATmega328P + RN4870 wearable platform, and a SolidWorks-designed finger clamp that houses a PPG pulse sensor on the pediatric haptic smartwatch."
        ],
        subprojects: [
          { n: "OTA Firmware Tool",      d: "Python and Tkinter desktop app, CH340 bridge, automatic COM detection, AVRdude flashing over Bluetooth serial." },
          { n: "PPG Finger Clamp",       d: "SolidWorks-designed pediatric pulse sensor housing. Ergonomic, noise-minimized, 12 CAD iterations to a printable assembly-free part." },
          { n: "Bluetooth Architecture", d: "Bidirectional BLE communication between wearable and mobile, with baud-rate handling and firmware validation." },
          { n: "R Shiny Dashboard",      d: "Interactive R Shiny dashboard for displaying watch session HRV recordings. Heart rate stats, beat plots, session comparisons. Modernized from an outdated codebase." }
        ],
        funding: "Supported by the National Science Foundation and the National Institute of Health."
      },
      {
        key: "wnis",
        name: "WNIS LAB",
        focus: "GUARD: radar-based driver authentication",
        pi: "ML and behavioral authentication",
        status: "TARGETING IEEE INFOCOM · UPGRADED FROM GLOBECOM",
        story: [
          "GUARD is a continuous driver authentication system using mmWave radar and a generative model. Modern vehicles already embed mmWave sensors for drowsiness and vital sign monitoring. That hardware can capture upper-body coordination patterns, how a driver's arms move in response to their head and torso during steering, lane changes, and mirror checks, without recording any visual identifiers.",
          "The novelty is the approach. Rather than classifying discrete features, GUARD trains a conditional GAN to learn a generative mapping: given head and torso motion, predict arm motion. During enrollment, the GAN encodes a specific driver's coordination signature into model weights. During authentication, predicted arm motion is compared to observed motion in real time, and discrepancies above a learned threshold flag an unauthorized driver. The approach is inspired by F2Key (MobiSys '24), which used a similar generative formulation for acoustic-based user verification.",
          "The architecture is intentionally lightweight, designed for the coarse 6 range × 3 angle resolution of automotive-grade radar. I own the GAN model and the authentication algorithm. The lab recently upgraded the target venue from IEEE GlobeCom to INFOCOM."
        ],
        subprojects: [
          { n: "Conditional GAN",        d: "Generator predicts arm-region motion from head and torso inputs. Discriminator evaluates authenticity. Lightweight, designed for low-resolution radar." },
          { n: "Authentication Loop",    d: "Continuous comparison of predicted vs observed arm motion. Threshold-based anomaly flagging for unauthorized driver detection." },
          { n: "Systematic Review",      d: "292-paper survey across behavioral authentication, mmWave sensing, and federated learning. Confirmed novelty of the GAN approach in this domain." },
          { n: "Privacy-Aware Pipeline", d: "On-device inference. No biometric storage. Federated learning principles applied where applicable." }
        ],
        funding: "Targeting IEEE INFOCOM 2027."
      },
      {
        key: "biomech",
        name: "MUSCULOSKELETAL BIOMECHANICS LAB",
        focus: "Modernizing a discontinued hematology diagnostic",
        pi: "in collaboration with SLU Hematology",
        status: "PATENT FILING APR 30 · FIRE FUNDED · INVESTOR OUTREACH ACTIVE",
        story: [
          "The Quantitative Blood Counter (QBC) is a hematology diagnostic device originally designed in the 1970s. The original hardware is no longer in production and uses an Intel D8749H MCS-48 microcontroller whose firmware was never publicly distributed. The lab is rebuilding the device with current low-cost components for clinical reuse.",
          "We extracted the original firmware from the D8749H using a TL866II programmer, reverse-engineered the system, and rebuilt it around an Arduino Nano with a Nextion 5-inch touchscreen, a ULN2003 stepper driver, 465nm LED strips, photodiodes, and a buck converter. The full bill of materials comes in at approximately $135. The patent is being filed and presented April 30. FIRE is covering development costs, and the team is in active outreach to investors in collaboration with the SLU Hematology department."
        ],
        subprojects: [
          { n: "Firmware Extraction",  d: "Intel D8749H MCS-48 read with a TL866II programmer. Full reverse-engineering of the legacy system." },
          { n: "Hardware Rebuild",     d: "Arduino Nano, Nextion 5-inch display, ULN2003 driver, 465nm LEDs, photodiodes. Approximately $135 in parts." },
          { n: "Signal Integrity",     d: "Chip-level data acquisition validated against the original measurement accuracy of the legacy device." },
          { n: "Lab Web Presence",     d: "Production websites for the Biomechanics, MPS, and Anzell labs. Built from scratch, deployed on GitHub Pages." }
        ],
        funding: "Funded by FIRE. Patent filing April 30. Investor outreach active."
      }
    ]
  },

  capstone: {
    layout: "capstone",
    heading: "WEARABLE TREMOR STABILIZER",
    sub: "senior design. active suppression of parkinson's tremor.",
    pitch: "A wrist-worn sleeve that reads tremor motion in real time with an ESP32-S3 and an IMU, runs FFT to isolate the tremor's frequency band, and drives a closed-loop actuator to counter it. The companion React Native app pairs over BLE for live monitoring, session history, and clinical export.",
    architecture: [
      { stage: "SENSE",  chip: "MPU-6050 IMU",         text: "9-axis motion data streamed at high rate into the ESP32-S3 Feather." },
      { stage: "DETECT", chip: "FFT on-chip",          text: "Frequency-domain analysis isolates the tremor band (3 to 8 Hz) from intentional motion." },
      { stage: "DECIDE", chip: "Control loop",         text: "Actuator drive is computed from the tremor's phase and amplitude." },
      { stage: "ACT",    chip: "Counter-oscillator",   text: "Counter-motion applied at low latency to cancel the detected tremor." },
      { stage: "REPORT", chip: "BLE → React Native",   text: "5-byte packets with float amplitude and tremor flag stream to the companion app." }
    ],
    app: {
      name: "TremorMonitor",
      modules: [
        "BLEService", "LiveMonitor", "DatabaseService (SQLite, 7 tables)",
        "History", "SessionDetail (charts, CSV export)", "Settings",
        "NotificationService (notifee push)", "Doctor Portal"
      ],
      status: "App is in a serious rehaul phase: live tremor alerts, medication reminders, daily summary push notifications, plus a redesigned doctor portal. 7 modules in active development."
    },
    deadline: "MAY 2026"
  },

  projects: {
    layout: "gallery",
    heading: "GALLERY",
    sub: "standalone work, ordered most recent first.",
    items: [
      { tag: "WEB · R", title: "HRV Dashboard (R Shiny)", year: "2026",
        body: "Interactive R Shiny dashboard for the CHROME Lab. Displays heart rate variability and inter-beat intervals from wearable watch session recordings. Modernized from a legacy Shiny app, with cleaner plots, session comparisons, and per-subject summaries.",
        tech: ["R", "Shiny", "ggplot2", "dplyr"] },
      { tag: "MOBILE", title: "TremorMonitor App",       year: "2026",
        body: "React Native companion app for the senior capstone wearable. SQLite-backed session history, live BLE telemetry, charts, CSV export, push notifications via notifee for tremor alerts and medication reminders. Currently in serious rehaul.",
        tech: ["React Native", "BLE", "SQLite", "notifee"] },
      { tag: "MOBILE", title: "Waylo",                   year: "2026",
        body: "Budget travel companion app. Where Google Maps stops, Waylo starts. React Native with Expo and Firebase. Phase 2 of 10 shipped.",
        tech: ["React Native", "Expo", "Firebase"] },
      { tag: "WEB",    title: "SLU Lab Websites",        year: "2026",
        body: "Three production lab websites built from scratch. Anzell Lab (vascular biology), MPS Lab (Montaño), Musculoskeletal Biomechanics Lab. Interactive, responsive, deployed on GitHub Pages.",
        tech: ["HTML", "CSS", "JS", "GitHub Pages"] },
      { tag: "AUDIO",  title: "Browser Synth",           year: "2025",
        body: "Web Audio synthesizer in the browser. Oscillators, envelopes, filter modulation, and modulation routing, playable in real time. Built end-to-end as a personal project.",
        tech: ["Web Audio", "JS"] },
      { tag: "NETWORK",title: "WiFi Coverage Analyzer",  year: "2024",
        body: "Custom Raspberry Pi WiFi scanner with PyShark and MATLAB statistical modeling. 194,000+ measurements across 952 survey locations. 37-point infrastructure analysis of Ritter Hall basement, with a stakeholder report and budget recommendations.",
        tech: ["Raspberry Pi", "Python", "PyShark", "MATLAB"] },
      { tag: "FPGA",   title: "FPGA Signal Monitor",     year: "2024",
        body: "Real-time signal visualization on a Basys 3 with HDMI video output. FSM-driven VHDL drives the full hardware-to-display pipeline including timing control.",
        tech: ["VHDL", "Basys 3", "HDMI", "Vivado"] },
      { tag: "MOBILE", title: "Full-Stack Security App", year: "2024",
        body: "Mobile security application integrating Google Maps API with Firebase authentication, offline persistence, and a secure mobile-to-server architecture.",
        tech: ["Firebase", "Google Maps API", "REST"] },
      { tag: "CAD",    title: "Haptic Finger Cradle",    year: "2025",
        body: "TPU 95A finger cradle for pediatric pulse oximetry. 12 CAD iterations to a printable, assembly-free part that holds the sensor in direct skin contact.",
        tech: ["SolidWorks", "TPU 95A", "3D Print"] },
      { tag: "ML",     title: "Arabic Speech-to-Text",   year: "2023",
        body: "NLP-driven speech recognition model for Arabic dialect transcription. Feature extraction tuned for accent and regional variance. Built during the Samsung AI Workshop.",
        tech: ["Python", "NLP", "Feature Extraction"] },
      { tag: "ML",     title: "NL to Code Translator",   year: "2023",
        body: "Multi-language program translating natural language descriptions into Java, C++, and Python source code. Structured parsing logic for cross-language code generation. Built at SLU Madrid.",
        tech: ["Python", "Java", "C++", "NLP"] },
      { tag: "ROBOTICS", title: "Autonomous Robotics",   year: "2021",
        body: "Programmed autonomous robotic platforms at CMU Qatar during the MindCraft program. Embedded C with real-time decision systems and hardware-software control loops.",
        tech: ["Embedded C", "Real-Time Control"] }
    ]
  },

  research: {
    layout: "archive",
    heading: "PAPERS & PATENTS",
    sub: "publications, patents, and certifications. active and historical.",
    papers: [
      { status: "REWRITE",      statusTone: "warn",
        title: "GUARD: GAN-Based Continuous Driver Authentication via mmWave Radar",
        venue: "IEEE INFOCOM", year: "target 2027",
        blurb: "Conditional GAN learns inter-body-region coordination from automotive-grade radar. Venue upgraded from IEEE GlobeCom. Rewrite in progress." },
      { status: "FILING APR 30", statusTone: "ok",
        title: "QBC Device: Modernized Hematology Diagnostic with Firmware Recovery",
        venue: "Patent Filing for SLU + Hematology", year: "2026",
        blurb: "Intel D8749H firmware extraction. Full hardware rebuild around modern low-cost components, ~$135 BOM. FIRE funded." },
      { status: "IN PROGRESS",   statusTone: "warn",
        title: "Haptic Wearables for DeafBlind Communication",
        venue: "CHROME Lab",
        blurb: "18-page paper on Protactile language, wearable haptic interfaces, and tactile communication primitives. NSF + NIH backed." },
      { status: "PUBLISHED",    statusTone: "done",
        title: "Advancements in Computer Forensic Analysis",
        venue: "TheStemSpectrum.org", year: "2025",
        blurb: "Smart forensic glasses technology. Two research papers merged into one cohesive publication. Saint Louis University." }
    ],
    certifications: [
      { title: "MIT Sloan: AI Implications for Business Strategy",       year: "2024", detail: "6-week certification. Predictive AI, generative AI, and machine learning in strategic decision-making." },
      { title: "MIT AI & Computer Science Seminars (Schwarzman College)",  year: "2025", detail: "MIT and Columbia faculty. Frontier AI research." },
      { title: "Carnegie Mellon Qatar: MindCraft Robotics & AI",          year: "2021", detail: "Director's Certificate. Prof. Dr. Michael Trick." },
      { title: "Janets: Cyber Security & Virus Protection",               year: "2023", detail: "9-hour course. Phishing, malware analysis, firewalls, network security." },
      { title: "Mark Rober: Creative Engineering",                        year: "2022", detail: "13-hour course. Arduino prototyping, computer vision, pneumatic builds." },
      { title: "Ojkool: Certified Mental Math",                           year: "2018", detail: "Chinese abacus calculation. 93% accuracy at the national level. National TV appearance." },
      { title: "FE Exam (Fundamentals of Engineering)",                    year: "in progress", detail: "Active preparation." },
      { title: "LeetCode",                                                 year: "ongoing", detail: "Regular practice." }
    ]
  },

  // Skills numbers locked from user input + sorted high to low per category
  skills: {
    layout: "skills",
    heading: "LOADOUT",
    sub: "languages, hardware, frameworks, tools, and spoken languages.",
    categories: [
      { name: "PROGRAMMING LANGUAGES", items: [
        { n: "Python",     yrs: 8, note: "since high school" },
        { n: "JavaScript", yrs: 5, note: "web and mobile" },
        { n: "C++",        yrs: 4, note: "firmware, embedded systems" },
        { n: "MATLAB",     yrs: 3, note: "radar signal analysis, statistics" },
        { n: "C",          yrs: 2, note: "low-level embedded" },
        { n: "VHDL",       yrs: 2, note: "FPGA digital design" },
        { n: "Java",       yrs: 2, note: "coursework, NL-to-code project" },
        { n: "LaTeX",      yrs: 2, note: "papers and CV" },
        { n: "SQL",        yrs: 1, note: "SQLite, enterprise validation at Doha Bank" },
        { n: "R",          yrs: 1, note: "Shiny dashboards for CHROME Lab" }
      ]},
      { name: "HARDWARE", items: [
        { n: "Arduino",            yrs: 5, note: "Nano, Uno, OTA flashing" },
        { n: "Raspberry Pi",       yrs: 3, note: "WiFi analyzer, security app" },
        { n: "ESP32 / ESP32-S3",   yrs: 2, note: "capstone, BLE, on-chip FFT" },
        { n: "FPGA",               yrs: 2, note: "Basys 3, Vivado, VHDL" },
        { n: "Bluetooth (BLE)",    yrs: 2, note: "OTA, GATT, custom packet protocols" },
        { n: "TL866II Programmer", yrs: 1, note: "Intel D8749H firmware extraction" },
        { n: "mmWave Radar",       yrs: 1, note: "WNIS Lab, GUARD" },
        { n: "IMU",                yrs: 1, note: "MPU-6050, capstone control loop" },
        { n: "SolidWorks",         yrs: 1, note: "PPG clamp, finger cradle" }
      ]},
      { name: "FRAMEWORKS & TOOLS", items: [
        { n: "PyTorch",       yrs: 3, note: "GANs, behavioral models" },
        { n: "Firebase",      yrs: 2, note: "Auth, Firestore" },
        { n: "Tkinter",       yrs: 2, note: "CHROME Lab desktop tool" },
        { n: "Git / GitHub",  yrs: 5, note: "daily driver" },
        { n: "React Native",  yrs: 1, note: "TremorMonitor, Waylo" },
        { n: "Three.js",      yrs: 1, note: "this site" },
        { n: "GSAP",          yrs: 1, note: "this site" },
        { n: "PyShark",       yrs: 1, note: "WiFi packet analysis" },
        { n: "Whisper",       yrs: 1, note: "Arabic dialect pipeline" }
      ]},
      { name: "SPOKEN LANGUAGES", items: [
        { n: "Arabic",     yrs: 22, note: "native" },
        { n: "Spanish",    yrs: 22, note: "native" },
        { n: "English",    yrs: 20, note: "fluent" },
        { n: "Portuguese", yrs: 1,  note: "beginner" },
        { n: "Italian",    yrs: 1,  note: "beginner" },
        { n: "Japanese",   yrs: 1,  note: "beginner" }
      ]}
    ]
  },

  timeline: {
    layout: "timeline",
    heading: "TIMELINE",
    sub: "how the work got built.",
    events: [
      { date: "APR 2026",    tag: "PATENT",     body: "QBC device patent filing and presentation, April 30. FIRE funded, in collaboration with SLU Hematology." },
      { date: "APR 2026",    tag: "CAPSTONE",   body: "TremorMonitor app rehaul: notifee push notifications, daily summary alerts, redesigned doctor portal." },
      { date: "APR 2026",    tag: "GUARD",      body: "Paper rewrite in progress, target venue upgraded from IEEE GlobeCom to INFOCOM." },
      { date: "APR 2026",    tag: "JOB HUNT",   body: "Cold-email campaign across firmware, hardware, and software roles." },
      { date: "MAR 2026",    tag: "BMES",       body: "BMES presentation for the QBC rebuild. BOM finalized at approximately $135." },
      { date: "FEB 2026",    tag: "WEB",        body: "Anzell, Montaño MPS, and Biomechanics lab websites deployed. R Shiny dashboard rebuilt for CHROME Lab." },
      { date: "FALL 2025",   tag: "LABS",       body: "Joined CHROME, WNIS, and Musculoskeletal Biomechanics labs at SLU. Concurrent." },
      { date: "SUMMER 2025", tag: "INTERN",     body: "Doha Bank Data Governance & Engineering Intern. Rotated across teams. Enterprise data validation workflows." },
      { date: "WINTER 2025", tag: "INTERN",     body: "Harvard University Biotechnology Laboratory, Volunteer Lab Technician. NDA, postdoc supervision." },
      { date: "2024 → 2025", tag: "PUBLICATION",body: "Published on TheStemSpectrum.org: smart forensic glasses technology. Two research papers merged into one." },
      { date: "FALL 2024",   tag: "PROJECT",    body: "WiFi Coverage Analyzer. Raspberry Pi with PyShark, 194,000+ measurements in Ritter Hall basement." },
      { date: "SPRING 2024", tag: "FPGA",       body: "FPGA Signal Monitor: real-time HDMI output on Basys 3. VHDL, FSM architecture." },
      { date: "2024",        tag: "CERT",       body: "MIT Sloan: AI Implications for Business Strategy. 6-week certification." },
      { date: "SUMMER 2023", tag: "AI",         body: "Samsung AI Workshop: Arabic dialect speech-to-text model." },
      { date: "SPRING 2023", tag: "INTERN",     body: "Corsair firmware programming intern. C++ on Raspberry Pi-based peripherals. Macro latency reduction." },
      { date: "FALL 2022",   tag: "INTERN",     body: "GSK Technology Research Program in Madrid. AI-enabled lab automation and RFID asset tracking." },
      { date: "2022 → 2023", tag: "PROJECT",    body: "NL-to-Code translator. SLU Madrid. Python, Java, C++ output with structured parsing logic." },
      { date: "AUG 2021",    tag: "COLLEGE",    body: "Started BS in Computer Engineering and Electrical Engineering at Saint Louis University." },
      { date: "2021",        tag: "LEADERSHIP", body: "Vice President of the Sixth Form Student Council, Park House English School." },
      { date: "2021",        tag: "CMU",        body: "CMU Qatar MindCraft: 3-week robotics and AI program. Director's Certificate." },
      { date: "FEB 2020",    tag: "DEBATE",     body: "World Scholar's Cup: 6th Gold in Team Debate, Silver in Team Bowl. Top 5% of debaters globally." },
      { date: "JUN 2019",    tag: "EXPEDITION", body: "Duke of Edinburgh's International Award, Bronze. Wilderness expedition." },
      { date: "2018",        tag: "MENTAL MATH",body: "Ojkool Certified Mental Math. 93% accuracy at the national level. National TV appearance." },
      { date: "2017",        tag: "FIRST GIG",  body: "Qatar International Trading & Contracting. Administration & Logistics Intern." },
      { date: "MAR 2003",    tag: "ORIGIN",     body: "Born in Amman, Jordan." }
    ]
  },

  affiliations: {
    layout: "wall",
    heading: "AFFILIATIONS",
    sub: "places that have had me on their payroll, roster, or program list.",
    tiles: [
      { n: "MIT",                       r: "MIT Sloan AI · Schwarzman College Seminars · MIT Nano (NDA)", brand: "#A31F34", text: "#fff" },
      { n: "HARVARD",                   r: "Biotechnology Lab · Volunteer Lab Technician",                brand: "#A41034", text: "#fff" },
      { n: "CARNEGIE MELLON",           r: "MindCraft Robotics & AI · Director's Certificate (CMU Qatar)",brand: "#C41E3A", text: "#fff" },
      { n: "SAINT LOUIS U.",            r: "CHROME · WNIS · Biomechanics · Research Assistant",           brand: "#003DA5", text: "#fff" },
      { n: "SAMSUNG",                   r: "AI Workshop · Arabic Speech-to-Text",                         brand: "#1428A0", text: "#fff" },
      { n: "CORSAIR",                   r: "Firmware Programming Intern · C++ Peripherals",               brand: "#FFEC00", text: "#000" },
      { n: "GSK",                       r: "Technology Research Program · Madrid",                        brand: "#F36633", text: "#fff" },
      { n: "DOHA BANK",                 r: "Data Governance & Engineering Intern",                        brand: "#7A1E2C", text: "#fff" },
      { n: "IEEE",                      r: "Student Member",                                              brand: "#00629B", text: "#fff" },
      { n: "FIRE",                      r: "QBC patent and development funding",                          brand: "#E25822", text: "#fff" },
      { n: "RED CROSS · RED CRESCENT",  r: "Volunteer",                                                   brand: "#EE2435", text: "#fff" },
      { n: "THE STEM SPECTRUM",         r: "Published Author",                                            brand: "#1E40AF", text: "#fff" },
      { n: "PARK HOUSE ENGLISH SCHOOL", r: "Student Council Vice President",                              brand: "#0E1B33", text: "#fff" }
    ]
  },

  personal: {
    layout: "personal",
    heading: "OFF-DUTY",
    sub: "four countries, six languages, one extremely defended steam library.",
    geography: [
      { flag: "🇯🇴", country: "JORDAN",        years: "2 YRS",  note: "Amman. Born here.",                    c1: "#000", c2: "#ce1126" },
      { flag: "🇶🇦", country: "QATAR",         years: "16 YRS", note: "Doha. Where I grew up.",               c1: "#8d1b3d", c2: "#fff" },
      { flag: "🇪🇸", country: "SPAIN",         years: "3 YRS",  note: "Madrid. SLU Madrid plus nationality.", c1: "#aa151b", c2: "#f1bf00" },
      { flag: "🇺🇸", country: "UNITED STATES", years: "2 YRS",  note: "St. Louis. Currently based here.",      c1: "#3c3b6e", c2: "#b22234" }
    ],
    gameranks: [
      { g: "OVERWATCH",     r: "TOP 500",         c: "#f59e0b" },
      { g: "CALL OF DUTY",  r: "TOP 500",         c: "#84cc16" },
      { g: "VALORANT",      r: "ASCENDANT",       c: "#ef4444" },
      { g: "RAINBOW SIX",   r: "DIAMOND",         c: "#22d3ee" },
      { g: "CS:GO",         r: "LEGENDARY EAGLE", c: "#ffd166" },
      { g: "MARVEL RIVALS", r: "CELESTIAL",       c: "#a78bfa" }
    ],
    teams: [
      { sport: "FOOTBALL",   team: "MAN CITY",            c: "#6cabdd" },
      { sport: "FOOTBALL",   team: "REAL MADRID",         c: "#febe10" },
      { sport: "BASKETBALL", team: "BOSTON CELTICS",      c: "#007a33" },
      { sport: "BASEBALL",   team: "ST. LOUIS CARDINALS", c: "#c41e3a" },
      { sport: "BASEBALL",   team: "BOSTON RED SOX",      c: "#bd3039" }
    ],
    sports: ["FOOTBALL", "BASEBALL", "BASKETBALL", "UFC", "AMERICAN FOOTBALL"],
    stories: [
      { t: "STUDENT COUNCIL VP",      d: "Vice President of the Sixth Form Student Council at Park House English School, 2021. Ran events, liaised with administration." },
      { t: "THE BANGLADESH INCIDENT", d: "Someone from Bangladesh tried to hack my Steam account. I reverse-engineered the attack, traced him, and he got caught. The library remains intact." },
      { t: "WORLD SCHOLAR'S CUP",     d: "Doha Regional Round, February 2020. 6th Gold in Team Debate, Silver in Team Bowl. Top 5% of debaters globally. Qualified for the Global Round." },
      { t: "DUKE OF EDINBURGH",       d: "Bronze Award, 2019. Wilderness expedition. Resilience training via getting rained on." },
      { t: "NATIONAL TV (AGE 15)",    d: "Appeared on Qatar national television after ranking 93% at a national mental math competition. Chinese abacus, trained for a year." },
      { t: "RED CROSS · RED CRESCENT",d: "Volunteer. Still on the roster." }
    ],
    lifestyle: [
      "currently on the Dukan diet and weightlifting",
      "currently reading five books (recommendations on request)",
      "do not ask me to play healer"
    ]
  },

  astakeria: {
    layout: "astakeria",
    heading: "ASTAKERIA",
    subtitle: "ECHOES OF THE OVERWRITTEN",
    hook: "the game watches how you play. then it writes you back into the world.",
    lore: [
      "You wake up in a world that does not agree on what it is. Streets rearrange between visits. Characters who died yesterday are alive again, but quieter. A locked door you walked past without noticing has become the center of the story no one is telling.",
      "This is Astakeria. Something in it is watching you. Not cosmetically. Not in a menu. In the soil. It is called Entropy, and it takes note of everything: the fights you picked, the mercy you showed, the corpses you looted or left, the NPCs you spoke to twice, the ones you never came back for. Play long enough and your own choices start showing up as history. The mural in the tavern is a battle you fought. The boss you spared is now a merchant. The faction you ignored is gone.",
      "Two players who picked the same hero will end up in two different games. That is the point."
    ],
    pillars: [
      { n: "ENTROPY",     d: "A behavior-tracking system that profiles aggression, hesitation, curiosity, and mercy, then silently rewrites the world to match. NPCs remember. Zones warp. Endings diverge." },
      { n: "FIVE HEROES", d: "Five playable archetypes with fully separate skill trees. Each one experiences a different Astakeria because Entropy reacts to each one differently." },
      { n: "NO LOOT",     d: "No drop tables, no random inventory. Progression by choice, not by luck. Every power you gain is a decision made on purpose." },
      { n: "SOLO DEV",    d: "Godot 4.x. Realistic scope. Five heroes with Entropy working properly, not fifty with nothing underneath." }
    ],
    heroes: [
      { name: "THE RONIN",     role: "Discipline · Blade · Memory",  tagline: "kills quickly. remembers everything." },
      { name: "THE HERETIC",   role: "Faith · Fire · Debt",          tagline: "burns what she prays for." },
      { name: "THE ARCHIVIST", role: "Knowledge · Time · Revision",  tagline: "edits the past. pays interest on it." },
      { name: "THE WARDEN",    role: "Duty · Shield · Silence",      tagline: "protects people who may not deserve it." },
      { name: "THE ECHO",      role: "Mystery · Mirrors · Regret",   tagline: "a version of you that died in a better timeline." }
    ],
    entropyExample: [
      { trigger: "you keep killing neutral NPCs",   consequence: "the town gates stay closed next time. merchants in other zones mark up prices. a bounty appears on your name." },
      { trigger: "you always spare a specific boss", consequence: "they show up in act three as an ally. or a recruiter for a cult. depends on the hero." },
      { trigger: "you skip every side quest",        consequence: "the side quests move onto the main path. the world contracts around you. nothing is optional anymore." },
      { trigger: "you hesitate in every fight",      consequence: "enemies adapt. they feint. they start pulling weapons you have only seen bosses use." }
    ],
    quote: "\"The world does not remember you. It writes you.\""
  },

  soon: {
    layout: "soon",
    heading: "COMING SOON",
    sub: "transmission incoming. check back.",
    body: [
      "Something is being built in this slot.",
      "If you can read this, the transmission has not fully come through yet."
    ]
  }
};
