// ============================================================
//  HAMZA'S HOUSE - v4.6 final recruiter polish
//  Source priority: Hamza Abu Resume first, CV only for extras.
// ============================================================

export const LINKS = {
  resume: "https://drive.google.com/file/d/1SwmqFIcCpLUo2hbO0_iGhyaxgRQwBSgC/view?usp=drive_link",
  linkedin: "https://www.linkedin.com/in/hakat/",
  github: "https://github.com/PreLabHomework",
  waylo: "https://github.com/PreLabHomework/waylo-app",
  capstoneFirmware: "https://github.com/PreLabHomework/tremorTrackers",
  tremorMonitor: "https://github.com/PreLabHomework/TremorMonitor",
  guard: "https://github.com/PreLabHomework/GUARD",
  uart: "https://github.com/PreLabHomework/Basys-3-UART-transmitter",
  nlToCode: "https://github.com/PreLabHomework/NL-to-code-converter",
  chromeFirmware: "https://github.com/PreLabHomework/ptkids-wearable-firmware",
  chromeWebsite: "https://sites.google.com/slu.edu/gorlewicz-lab/home",
  wnisWebsite: "https://sites.google.com/view/nancen/home",
  biomechWebsite: "https://sites.google.com/slu.edu/reiterlab/",
  wifi: "https://github.com/PreLabHomework/Handover-Analyzer"
};

export const ROSTER = [
  {
    id: "home", codename: "HMZA-01", title: "HAMZA", subtitle: "ABU KHALAF",
    tagline: "START HERE", accent: "#ffd166", accent2: "#ef476f", role: "MAIN", figure: "protagonist",
    preview: {
      headline: "HAMZA'S HOUSE",
      sub: "PORTFOLIO MODE",
      blurb: "Welcome to my portfolio. It is styled as a character-select screen because most portfolios look the same. Each hero represents a part of my work, projects, research, skills, or personal story.",
      stats: [["GRAD", "MAY 2026"], ["CORE", "EMBEDDED · FIRMWARE"], ["OPEN TO", "FW · HW · SW"], ["BASED", "ST. LOUIS"]]
    },
    play_url: LINKS.resume, play_label: "VIEW RESUME"
  },
  {
    id: "labs", codename: "LAB-02", title: "LABS", subtitle: "RESEARCH DOSSIERS",
    tagline: "WEARABLES · RADAR ML · CLINICAL HARDWARE", accent: "#4ade80", accent2: "#22d3ee", role: "RESEARCH", figure: "scientist",
    preview: {
      headline: "RESEARCH DOSSIERS",
      sub: "CHROME · WNIS · BIOMECHANICS",
      blurb: "Three active SLU research tracks: PT KIDS clinical wearables and haptic smartwatch work, GUARD radar-based driver authentication, and QBC hematology diagnostic modernization.",
      stats: [["TRACKS", "3"], ["ROLE", "ENGINEERING + RESEARCH"], ["CORE", "EMBEDDED · ML · DATA"], ["TARGET", "INFOCOMM 2027"]]
    },
    play_url: LINKS.chromeFirmware, play_label: "VIEW LAB CODE"
  },
  {
    id: "capstone", codename: "CAP-03", title: "CAPSTONE", subtitle: "TREMOR STABILIZER",
    tagline: "PARKINSON'S TREMOR MONITORING", accent: "#ef4444", accent2: "#f87171", role: "FINAL YEAR", figure: "engineer",
    preview: {
      headline: "TREMORMONITOR",
      sub: "REACT NATIVE · BLE · SQLITE · ESP32-S3",
      blurb: "Senior design system for Parkinson's tremor monitoring and stabilization. The app decodes 5-byte ESP32 packets over BLE, records live sessions, stores SQLite data, charts frequency, and exports CSV.",
      stats: [["APP", "REACT NATIVE"], ["DATA", "SQLITE 7 TABLES"], ["LINK", "BLE"], ["DEADLINE", "MAY 2026"]]
    },
    play_url: LINKS.tremorMonitor, play_label: "VIEW APP"
  },
  {
    id: "projects", codename: "PRJ-04", title: "PROJECTS", subtitle: "SHOWCASE",
    tagline: "STANDALONE · COURSEWORK · SHIPPED", accent: "#f59e0b", accent2: "#fbbf24", role: "BUILDER", figure: "builder",
    preview: {
      headline: "PROJECT SHOWCASE",
      sub: "BUILDS OUTSIDE THE MAIN LAB PIPELINE",
      blurb: "Standalone and coursework builds: WiFi handover analysis, FPGA HDMI visualization, Waylo, UART transmission, NLP code generation, Arabic speech recognition, research websites, and browser audio.",
      stats: [["STACKS", "FW · FPGA · ML · WEB · MOBILE"], ["ORDER", "RECENT FIRST"], ["CODE", "GITHUB"], ["MODE", "SHOWCASE"]]
    },
    play_url: LINKS.github, play_label: "VIEW GITHUB"
  },
  {
    id: "research", codename: "PUB-05", title: "RESEARCH", subtitle: "PAPERS · PATENTS",
    tagline: "ARCHIVE · CERTIFICATIONS · PUBLICATIONS", accent: "#a78bfa", accent2: "#c4b5fd", role: "AUTHOR", figure: "author",
    preview: {
      headline: "PAPERS & PATENTS",
      sub: "ACTIVE AND HISTORICAL RECORDS",
      blurb: "Research outputs and continuing education across radar ML, clinical hardware modernization, haptic wearables, forensics, AI strategy, cybersecurity, and robotics.",
      stats: [["ACTIVE", "GUARD · QBC · PT KIDS"], ["PUBLISHED", "FORENSICS"], ["CERTS", "MIT · CMU"], ["STATUS", "UPDATING"]]
    },
    play_url: LINKS.guard, play_label: "VIEW GUARD"
  },
  {
    id: "skills", codename: "SKL-06", title: "SKILLS", subtitle: "LOADOUT",
    tagline: "LANGUAGES · HARDWARE · TOOLS", accent: "#22d3ee", accent2: "#67e8f9", role: "LOADOUT", figure: "technician",
    preview: {
      headline: "LOADOUT",
      sub: "PRACTICAL ENGINEERING STACK",
      blurb: "Programming, embedded hardware, ML/data tooling, firmware workflows, web/mobile development, and spoken languages, sorted by actual experience instead of inflated noise.",
      stats: [["PYTHON", "8 YRS"], ["JS", "5 YRS"], ["C++", "4 YRS"], ["ARDUINO", "5 YRS"]]
    },
    play_url: LINKS.resume, play_label: "VIEW RESUME"
  },
  {
    id: "timeline", codename: "TLN-07", title: "TIMELINE", subtitle: "SCROLL",
    tagline: "AMMAN · DOHA · MADRID · ST. LOUIS", accent: "#f472b6", accent2: "#f9a8d4", role: "HISTORY", figure: "archivist",
    preview: {
      headline: "TIMELINE",
      sub: "CHRONOLOGICAL PATH",
      blurb: "A journal of internships, research labs, engineering projects, publications, certificates, leadership, and the places that shaped the work.",
      stats: [["RANGE", "2003 TO 2026"], ["FORMAT", "JOURNAL"], ["STATUS", "LIVE"], ["PATH", "4 COUNTRIES"]]
    },
    play_url: LINKS.linkedin, play_label: "VIEW LINKEDIN"
  },
  {
    id: "affiliations", codename: "AFF-08", title: "AFFILIATIONS", subtitle: "WALL",
    tagline: "MIT · SLU · CMU · SAMSUNG", accent: "#e5e7eb", accent2: "#60a5fa", role: "NETWORK", figure: "diplomat",
    preview: {
      headline: "AFFILIATIONS",
      sub: "INSTITUTIONS · COMPANIES · PROGRAMS",
      blurb: "Institutions, companies, labs, programs, publications, and organizations connected to the work. Some paid, some volunteer, all worth keeping on the wall.",
      stats: [["TOTAL", "11"], ["ACADEMIC", "MIT · SLU · CMU"], ["INDUSTRY", "CORSAIR · GSK · SAMSUNG"], ["ORG", "IEEE"]]
    },
    play_url: LINKS.linkedin, play_label: "VIEW LINKEDIN"
  },
  {
    id: "personal", codename: "PSN-09", title: "PERSONAL", subtitle: "OFF-DUTY",
    tagline: "FOUR COUNTRIES · SIX LANGUAGES", accent: "#fb923c", accent2: "#fdba74", role: "CIVILIAN", figure: "civilian",
    preview: {
      headline: "OFF-DUTY",
      sub: "GAMING · SPORTS · STORIES",
      blurb: "Four countries, six languages, top 500 in two shooters, vice president of a high school council, World Scholar's Cup debate, and a protected Steam library.",
      stats: [["COUNTRIES", "4"], ["LANGUAGES", "6"], ["OW", "TOP 500"], ["TEAMS", "5 FAVORITES"]]
    },
    play_url: LINKS.linkedin, play_label: "CONNECT"
  },
  {
    id: "astakeria", codename: "AST-10", title: "ASTAKERIA", subtitle: "ECHOES OF THE OVERWRITTEN",
    tagline: "THE GAME THAT WATCHES YOU BACK", accent: "#fb7185", accent2: "#fda4af", role: "LEGEND", figure: "astakeria",
    preview: {
      headline: "ASTAKERIA",
      sub: "ECHOES OF THE OVERWRITTEN",
      blurb: "A first-person action RPG concept where the world reads how you play and rewrites itself around your habits. Five heroes. No loot. One system called Entropy.",
      stats: [["ENGINE", "GODOT 4.X"], ["HEROES", "5"], ["SYSTEM", "ENTROPY"], ["SCOPE", "SOLO DEV"]]
    },
    play_url: LINKS.github, play_label: "VIEW GITHUB"
  },
  {
    id: "soon", codename: "???-11", title: "???", subtitle: "TRANSMISSION INCOMING",
    tagline: "SOMETHING IS BEING BUILT", accent: "#64748b", accent2: "#94a3b8", role: "UNKNOWN", figure: "unknown",
    preview: {
      headline: "COMING SOON",
      sub: "TRANSMISSION INCOMING",
      blurb: "A reserved slot for the next build. The site is designed to grow without breaking the character-select structure.",
      stats: [["STATUS", "LOCKED"], ["ETA", "TBD"], ["SIGNAL", "WEAK"], ["TRUST", "UNVERIFIED"]]
    },
    play_url: LINKS.github, play_label: "CHECK GITHUB"
  }
];

export const SECTIONS = {
  home: {
    layout: "home",
    heading: "HAMZA'S HOUSE",
    sub: "portfolio mode. hover a character, preview, then select to enter.",
    intro: "Welcome to my portfolio. I styled it after a character-select screen because most portfolios look the same. Each hero represents a part of my work, projects, research, skills, or personal story. Hover to preview, select to enter, and use Back or ESC to return to the roster.",
    bio: [
      "I'm Hamza Abu Khalaf Al Takrouri, a senior Computer and Electrical Engineer at Saint Louis University, graduating May 2026 with minors in Computer Science and Mathematics.",
      "Three labs, one capstone, zero free weekends. Send help and job offers."
    ],
    quickfacts: [
      { k: "based in", v: "St. Louis, Missouri" },
      { k: "open to", v: "firmware, hardware, software" },
      { k: "focus", v: "embedded systems, radar ML, clinical hardware, mobile apps" },
      { k: "links", v: "resume, LinkedIn, GitHub" }
    ],
    recruiter: [
      "Graduating May 2026",
      "Computer Engineering + Electrical Engineering",
      "Embedded Firmware",
      "BLE + Mobile Apps",
      "Radar ML",
      "Clinical Hardware"
    ]
  },

  labs: {
    layout: "labs",
    heading: "RESEARCH",
    sub: "three active research tracks at Saint Louis University, grouped by lab.",
    labs: [
      {
        key: "chrome",
        name: "CHROME LAB",
        focus: "PT KIDS, clinical wearables, haptic communication",
        pi: "embedded systems and wearable hardware",
        status: "PT KIDS · OTA FIRMWARE · R SHINY · HAPTIC WATCH",
        story: [
          "CHROME develops wearable haptic interfaces for DeafBlind communication. The work connects clinical wearable hardware, Bluetooth communication, data review tooling, and pediatric form-factor design.",
          "My current work includes PT KIDS, a Python/Tkinter desktop app for OTA firmware management of ATmega328P/RN4870 clinical wearables; a bidirectional Bluetooth stack over CH340-based hardware; an R Shiny dashboard for session review; and a SolidWorks finger clamp housing a PPG pulse sensor for a pediatric haptic feedback smartwatch."
        ],
        subprojects: [
          { n: "PT KIDS OTA Tool", d: "Python/Tkinter application for OTA firmware management. AVRdude flashing over Bluetooth serial, auto COM detection, Windows SAPI TTS, and PyInstaller deployment.", url: LINKS.chromeFirmware },
          { n: "Bluetooth Stack", d: "Bidirectional host-to-wearable communication for CH340-based hardware, with baud-rate handling, diagnostics, and firmware validation.", url: LINKS.chromeFirmware },
          { n: "R Shiny Dashboard", d: "Clinical review dashboard for PT KIDS session data: inter-beat interval plots, cleaned IBI time series, and block-averaged BPM statistics." },
          { n: "PPG Finger Clamp", d: "SolidWorks finger clamp housing a PPG pulse sensor for a pediatric DeafBlind haptic feedback smartwatch, focused on fit and signal noise minimization." }
        ],
        proof: ["Clinical Wearable OTA Tool", "Bluetooth Serial Pipeline", "R Shiny Clinical Dashboard", "SolidWorks Sensor Housing"],
        funding: "Official lab website linked separately. My research-site builds are separate and not published yet.",
        links: [
          { label: "Firmware Repo", url: LINKS.chromeFirmware },
          { label: "Official CHROME Lab Website", url: LINKS.chromeWebsite, note: "official site" }
        ]
      },
      {
        key: "wnis",
        name: "WNIS LAB",
        focus: "GUARD radar-based driver authentication",
        pi: "machine learning and behavioral authentication",
        status: "GUARD · TI IWR6843 · INFOCOMM TARGET",
        story: [
          "GUARD is a GAN-based driver authentication system using TI IWR6843 mmWave radar. The pipeline processes spherical-grid point clouds with temporal features including velocity, variance, and frame delta, then targets continuous identity verification without storing biometrics.",
          "The system uses a two-phase architecture: GAN-based behavioral registration followed by real-time sliding-window majority voting with a 70% threshold. I work on the pipeline across preprocessing, training, evaluation, and algorithm design.",
          "The literature review covers 292 papers across mmWave sensing, behavioral authentication, and federated learning. The GitHub pipeline is functional end-to-end and the target venue is IEEE INFOCOMM 2027."
        ],
        subprojects: [
          { n: "GUARD Pipeline", d: "Spherical-grid point cloud preprocessing on TI IWR6843 radar data with velocity, variance, and frame-delta temporal features.", url: LINKS.guard },
          { n: "Two-Phase Auth", d: "GAN-based registration followed by real-time sliding-window majority voting at a 70% threshold." },
          { n: "Systematic Review", d: "292-paper review across mmWave sensing, behavioral authentication, and federated learning." },
          { n: "End-to-End Repo", d: "Preprocessing, training, and evaluation pipeline confirmed functional across GitHub.", url: LINKS.guard }
        ],
        proof: ["TI IWR6843 Radar", "GAN Registration", "Spherical-Grid Point Clouds", "70% Majority-Vote Authentication", "292-Paper Review"],
        funding: "Targeting IEEE INFOCOMM 2027. Official lab website linked separately. My research-site builds are separate and not published yet.",
        links: [
          { label: "GUARD Repo", url: LINKS.guard },
          { label: "Official WNIS Lab Website", url: LINKS.wnisWebsite, note: "official site" }
        ]
      },
      {
        key: "biomech",
        name: "MUSCULOSKELETAL BIOMECHANICS LAB",
        focus: "QBC Hematology Diagnostic Modernization",
        pi: "hardware redesign and diagnostic systems",
        status: "QBC MODERNIZATION · FIRMWARE RECOVERY · CLINICAL WORKFLOW",
        story: [
          "The QBC modernization project focuses on a 1970s hematology diagnostic system built around an Intel D8749H MCS-48 microcontroller. The work combines firmware recovery, hardware reverse-engineering, and a modern low-cost measurement workflow.",
          "The updated system uses a Nextion 5-inch touchscreen, Arduino Nano, iGaging calipers with 0.01 mm precision, and a piezo buzzer. The workflow captures four vial measurements and converts them into clinical values through the updated interface."
        ],
        subprojects: [
          { n: "Firmware Recovery", d: "Extracted firmware from the Intel D8749H MCS-48 microcontroller using a TL866II programmer." },
          { n: "Modern Interface", d: "Nextion 5-inch touchscreen and Arduino Nano interface for a guided measurement workflow." },
          { n: "Digital Measurement", d: "iGaging calipers at 0.01 mm precision, four-point vial workflow, piezo feedback, and clinical value conversion." },
          { n: "Research Site Builds", d: "Responsive SLU research lab websites with team profiles and research carousels. The sites I built are separate from the official lab links and are not public yet." }
        ],
        proof: ["D8749H Firmware Recovery", "Nextion + Arduino Interface", "0.01mm iGaging Workflow", "Clinical Value Conversion"],
        funding: "Official lab website linked separately. My research-site builds are separate and not published yet.",
        links: [
          { label: "Official Biomechanics Lab Website", url: LINKS.biomechWebsite, note: "official site" }
        ]
      }
    ]
  },

  capstone: {
    layout: "capstone",
    heading: "WEARABLE TREMOR STABILIZER",
    sub: "senior design. Parkinson's tremor monitoring and stabilization.",
    pitch: "A wearable motion stabilization system paired with TremorMonitor, a React Native app for Parkinson's tremor monitoring. Firmware streams compact BLE packets from the ESP32-S3 Feather, while the app records live sessions, stores SQLite data, charts tremor frequency, exports CSV files, and supports medication mode with severity thresholds.",
    recruiter: [
      "React Native BLE telemetry",
      "ESP32-S3 firmware integration",
      "SQLite schema with 7 tables",
      "Live session recording",
      "CSV clinical export",
      "Medication and severity settings"
    ],
    architecture: [
      { stage: "SENSE", chip: "IMU + ESP32-S3", text: "Motion data is captured by the wearable hardware and streamed into firmware for processing." },
      { stage: "DETECT", chip: "FFT + thresholds", text: "Signal processing isolates tremor frequency and severity while separating tremor from intentional movement." },
      { stage: "STREAM", chip: "BLE packets", text: "The ESP32 streams compact 5-byte packets to the React Native app." },
      { stage: "RECORD", chip: "SQLite", text: "TremorMonitor stores live sessions in a local SQLite database with seven tables." },
      { stage: "REPORT", chip: "Charts + CSV", text: "The app visualizes frequency trends, exports CSV data, and supports medication mode and severity thresholds." }
    ],
    app: {
      name: "TremorMonitor",
      modules: ["BLEService", "LiveMonitor", "SQLite database", "History", "frequency charts", "CSV export", "Medication mode", "Severity thresholds"],
      status: "React Native app rebuilt around BLE decoding, SQLite session storage, live recording, frequency charts, CSV export, settings, medication mode, and severity thresholds."
    },
    deadline: "MAY 2026",
    links: [
      { label: "TremorMonitor App", url: LINKS.tremorMonitor },
      { label: "Firmware Repo", url: LINKS.capstoneFirmware }
    ]
  },

  projects: {
    layout: "gallery",
    heading: "PROJECTS",
    sub: "standalone builds, coursework systems, and shipped prototypes.",
    items: [
      { tag: "DATA", title: "WiFi Coverage & Handover Analyzer", year: "2024", body: "Raspberry Pi WiFi scanner and MATLAB analysis workflow processing 194K+ measurements across 952 locations, with coverage gap findings and budget recommendations for SLU IT.", proof: "Shows field data collection, packet analysis, statistical modeling, and stakeholder-ready engineering recommendations", tech: ["Raspberry Pi", "Python", "PyShark", "MATLAB"], url: LINKS.wifi },
      { tag: "FPGA", title: "FPGA Signal Monitor", year: "2024", body: "Real-time signal visualizer on Basys 3 with HDMI output using FSM-driven VHDL, video timing logic, and full hardware-to-display pipeline.", proof: "Shows digital design depth, timing discipline, FPGA architecture, and display-pipeline implementation", tech: ["VHDL", "Basys 3", "HDMI", "FSM"] },
      { tag: "MOBILE", title: "Waylo", year: "2026", body: "React Native travel companion app built with Expo and Firebase. This covers the mobile security/full-stack app direction, so it is listed once instead of split into duplicate projects.", proof: "Shows product thinking, mobile stack ownership, Firebase-backed architecture, and iterative shipping", tech: ["React Native", "Expo", "Firebase"], url: LINKS.waylo },
      { tag: "FIRMWARE", title: "UART Transmitter", year: "2024", body: "Basys 3 UART transmitter project focused on serial timing, shift-register control, and reliable hardware signal generation.", proof: "Shows HDL debugging, serial protocols, clocking, and hardware signal generation", tech: ["VHDL", "Basys 3", "UART"], url: LINKS.uart },
      { tag: "NLP", title: "Natural Language To Code Translator", year: "2022-2023", body: "Parser-driven tool translating natural language input into Java, C++, and Python syntax with structured cross-language code generation.", proof: "Shows NLP parsing logic, multi-language code generation, and early compiler-style thinking", tech: ["Python", "Java", "C++", "NLP"], url: LINKS.nlToCode },
      { tag: "AI", title: "Arabic Speech-To-Text AI System", year: "2023", body: "NLP-driven Arabic dialect transcription model from the Samsung AI Workshop, with feature extraction tuned for accent-variant speech.", proof: "Shows supervised learning, language-aware feature extraction, and multilingual AI context", tech: ["NLP", "Python", "Supervised Learning"] },
      { tag: "WEB", title: "SLU Research Lab Websites", year: "2025", body: "Responsive research websites built for SLU labs with team profiles, research carousels, and maintainable page structures. The sites I built are not public yet.", proof: "Shows client-style delivery, responsive design, maintainable content structures, and research communication", tech: ["HTML", "CSS", "JavaScript", "GitHub Pages"] },
      { tag: "AUDIO", title: "Browser Music Synth", year: "2026", body: "Browser-based audio experiment using Web Audio concepts for generated tones, interaction feedback, and playful sound design.", proof: "Shows creative front-end systems, browser APIs, and interaction design beyond static pages", tech: ["JavaScript", "Web Audio", "UI"] }
    ]
  },
  research: {
    layout: "archive",
    heading: "PAPERS & PATENTS",
    sub: "publication record, patent work, and continuing education.",
    recruiter: ["Radar ML Publication Track", "Clinical Hardware IP", "Haptic Wearables Paper", "Computer Forensics Publication", "MIT + CMU Continuing Education"],
    papers: [
      { status: "ACTIVE", statusTone: "warn", title: "GUARD: GAN-Based Driver Authentication via mmWave Radar", venue: "IEEE INFOCOMM", year: "Target 2027", blurb: "GAN-based driver authentication using TI IWR6843 radar, spherical-grid point clouds, temporal features, and 70% sliding-window majority voting.", url: LINKS.guard },
      { status: "ACTIVE", statusTone: "ok", title: "QBC Hematology Diagnostic Modernization", venue: "Musculoskeletal Biomechanics Lab", year: "2025 To Present", blurb: "Firmware recovery and modernized QBC workflow using Nextion touchscreen, Arduino Nano, iGaging calipers, piezo feedback, and clinical value conversion." },
      { status: "IN PROGRESS", statusTone: "warn", title: "Haptic Wearables for DeafBlind Communication", venue: "CHROME Lab", blurb: "Haptic wearables for DeafBlind communication, PT KIDS firmware workflow, R Shiny review dashboard, and pediatric PPG sensor housing.", url: LINKS.chromeFirmware },
      { status: "PUBLISHED", statusTone: "done", title: "Advancements in Computer Forensic Analysis", venue: "TheStemSpectrum.org", year: "2025", blurb: "Smart forensic glasses technology. Two research papers merged into one cohesive publication. Saint Louis University." }
    ],
    certifications: [
      { title: "MIT AI & Computer Science Seminars", year: "2025", detail: "Schwarzman College of Computing. Frontier AI and computer science seminars." },
      { title: "MIT Sloan: AI Implications for Business Strategy", year: "2024", detail: "6-week certification covering predictive AI, generative AI, machine learning, and strategic decision-making." },
      { title: "Carnegie Mellon Qatar: MindCraft Robotics & AI", year: "2021", detail: "Director's Certificate. Robotics, AI, and autonomous movement simulation." },
      { title: "Janets: Cyber Security & Virus Protection", year: "2023", detail: "9-hour course covering phishing, malware analysis, firewalls, and network security." },
      { title: "Mark Rober: Creative Engineering", year: "2022", detail: "Arduino prototyping, computer vision, servo motors, sensors, and pneumatic builds." },
      { title: "Ojkool: Certified Mental Math", year: "2018", detail: "Chinese abacus calculation, 93% national-level accuracy, and national TV appearance." },
      { title: "FE Exam", year: "In Progress", detail: "Fundamentals of Engineering preparation." },
      { title: "LeetCode", year: "ongoing", detail: "Regular coding practice." }
    ]
  },

  skills: {
    layout: "skills",
    heading: "LOADOUT",
    sub: "languages, hardware, frameworks, tools, and spoken languages.",
    recruiter: ["Embedded Firmware", "BLE + Mobile", "Radar ML", "FPGA/VHDL", "Python Tooling", "Data Validation"],
    categories: [
      { name: "PROGRAMMING LANGUAGES", items: [
        { n: "Python", yrs: 8, note: "research tooling, data workflows, firmware utilities" },
        { n: "JavaScript", yrs: 5, note: "web, tooling, portfolio, front-end" },
        { n: "C++", yrs: 4, note: "firmware, peripherals, embedded systems" },
        { n: "MATLAB", yrs: 3, note: "signal analysis and statistical modeling" },
        { n: "C", yrs: 2, note: "low-level embedded and robotics" },
        { n: "VHDL", yrs: 2, note: "FPGA digital design" },
        { n: "Java", yrs: 2, note: "coursework and NL-to-code project" },
        { n: "LaTeX", yrs: 2, note: "papers, reports, CV formatting" },
        { n: "SQL", yrs: 1, note: "SQLite and enterprise data validation" },
        { n: "R", yrs: 1, note: "Shiny dashboards for CHROME Lab" }
      ]},
      { name: "HARDWARE", items: [
        { n: "Arduino", yrs: 5, note: "Nano, Uno, prototyping, QBC" },
        { n: "Raspberry Pi", yrs: 3, note: "WiFi analyzer, peripherals" },
        { n: "ESP32-S3", yrs: 2, note: "capstone BLE firmware" },
        { n: "FPGA", yrs: 2, note: "Basys 3, VHDL, HDMI, UART" },
        { n: "BLE", yrs: 2, note: "RN4870, GATT, packets, OTA" },
        { n: "ATmega328P", yrs: 1, note: "clinical wearable firmware" },
        { n: "TI IWR6843", yrs: 1, note: "mmWave radar processing" },
        { n: "IMU", yrs: 1, note: "sensor fusion and tremor monitoring" },
        { n: "SolidWorks", yrs: 1, note: "PPG clamp and wearable housings" }
      ]},
      { name: "SOFTWARE, ML & DATA", items: [
        { n: "Git / GitHub", yrs: 5, note: "daily driver" },
        { n: "Firebase", yrs: 2, note: "authentication, storage, app backends" },
        { n: "Tkinter", yrs: 2, note: "PT KIDS desktop tool" },
        { n: "GAN Architecture", yrs: 1, note: "GUARD behavioral authentication" },
        { n: "React Native", yrs: 1, note: "TremorMonitor and Waylo" },
        { n: "SQLite", yrs: 1, note: "TremorMonitor app database" },
        { n: "PyInstaller", yrs: 1, note: "desktop executable deployment" },
        { n: "PyShark", yrs: 1, note: "WiFi packet analysis" },
        { n: "Android Studio", yrs: 1, note: "mobile development" }
      ]},
      { name: "SPOKEN LANGUAGES", items: [
        { n: "Arabic", yrs: 22, note: "native" },
        { n: "Spanish", yrs: 22, note: "native" },
        { n: "English", yrs: 20, note: "fluent" },
        { n: "Portuguese", yrs: 1, note: "beginner" },
        { n: "Italian", yrs: 1, note: "beginner" },
        { n: "Japanese", yrs: 1, note: "beginner" }
      ]}
    ]
  },

  timeline: {
    layout: "timeline",
    heading: "TIMELINE",
    sub: "how the work got built.",
    events: [
      { date: "APR 2026", tag: "QBC", body: "QBC modernization updated around Nextion touchscreen, Arduino Nano, iGaging calipers, piezo feedback, and four-point clinical value conversion." },
      { date: "APR 2026", tag: "CAPSTONE", body: "TremorMonitor rehaul: BLE packet decoding, SQLite session storage, frequency charts, CSV export, medication mode, and severity thresholds." },
      { date: "APR 2026", tag: "GUARD", body: "GUARD pipeline functional end to end: spherical-grid point cloud preprocessing, GAN training, evaluation, and 70% sliding-window majority voting." },
      { date: "2025", tag: "CHROME", body: "PT KIDS OTA firmware tool, R Shiny dashboard, Bluetooth stack, and SolidWorks PPG finger clamp for pediatric haptic smartwatch work." },
      { date: "SUMMER 2025", tag: "INTERN", body: "Doha Bank Data Governance & Engineering Intern. Automated data validation workflows and contributed to enterprise data architecture." },
      { date: "WINTER 2025", tag: "MIT.NANO", body: "MIT.nano volunteer lab technician under NDA. Exposure to nanofabrication workflows, hardware integration, calibration, and rapid prototyping." },
      { date: "2025", tag: "WEB", body: "SLU research lab websites built with responsive layouts, team profiles, and research carousels. My built sites are not public yet." },
      { date: "2024", tag: "NETWORK", body: "WiFi Coverage & Handover Analyzer: 194,000+ measurements across 952 survey locations with MATLAB-modeled findings." },
      { date: "SPRING 2024", tag: "FPGA", body: "FPGA Signal Monitor with HDMI output on Basys 3 using FSM-driven VHDL." },
      { date: "2024", tag: "MIT", body: "MIT Sloan AI Implications for Business Strategy certification." },
      { date: "SUMMER 2023", tag: "SAMSUNG", body: "Arabic dialect speech-to-text AI system built during Samsung AI Workshop." },
      { date: "SPRING 2023", tag: "CORSAIR", body: "Firmware Programming Intern. C++ firmware for Raspberry Pi-based keyboard and mouse peripherals." },
      { date: "FALL 2022", tag: "GSK", body: "Technology Research Program in Madrid. AI-enabled lab automation and RFID asset tracking workflows." },
      { date: "2022 TO 2023", tag: "NLP", body: "Natural Language to Code Translator across Java, C++, and Python syntax." },
      { date: "AUG 2021", tag: "SLU", body: "Started Computer Engineering and Electrical Engineering at Saint Louis University." },
      { date: "2021", tag: "LEADERSHIP", body: "Student Council Vice President at Park House English School." },
      { date: "2021", tag: "CMU", body: "CMU Qatar MindCraft robotics and AI program. Director's Certificate." },
      { date: "FEB 2020", tag: "DEBATE", body: "World Scholar's Cup: top 5% Team Debate, Global Round qualification." },
      { date: "2018", tag: "MENTAL MATH", body: "Ojkool Certified Mental Math. 93% national-level accuracy and national TV appearance." },
      { date: "MAR 2003", tag: "ORIGIN", body: "Born in Amman, Jordan." }
    ]
  },

  affiliations: {
    layout: "wall",
    heading: "AFFILIATIONS",
    sub: "institutions, companies, programs, and organizations connected to the work.",
    tiles: [
      { n: "MIT", r: "MIT.nano Lab · MIT AI & CS Seminars · MIT Sloan AI Strategy", brand: "#A31F34", text: "#fff" },
      { n: "CARNEGIE MELLON", r: "MindCraft Robotics & AI · Director's Certificate (CMU Qatar)", brand: "#C41E3A", text: "#fff" },
      { n: "SAINT LOUIS U.", r: "Computer Engineering + Electrical Engineering · CHROME · WNIS · Biomechanics", brand: "#003DA5", text: "#fff" },
      { n: "SAMSUNG", r: "AI Workshop · Arabic Speech-to-Text", brand: "#1428A0", text: "#fff" },
      { n: "CORSAIR", r: "Firmware Programming Intern · C++ Peripherals", brand: "#FFEC00", text: "#000" },
      { n: "GSK", r: "Technology Research Program · Madrid", brand: "#F36633", text: "#fff" },
      { n: "DOHA BANK", r: "Data Governance & Engineering Intern", brand: "#7A1E2C", text: "#fff" },
      { n: "IEEE", r: "Student Member", brand: "#00629B", text: "#fff" },
      { n: "RED CROSS · RED CRESCENT", r: "Volunteer", brand: "#EE2435", text: "#fff" },
      { n: "THE STEM SPECTRUM", r: "Published Author", brand: "#1E40AF", text: "#fff" },
      { n: "PARK HOUSE ENGLISH SCHOOL", r: "Student Council Vice President", brand: "#0E1B33", text: "#fff" }
    ]
  },

  personal: {
    layout: "personal",
    heading: "OFF-DUTY",
    sub: "four countries, six languages, one extremely defended Steam library.",
    geography: [
      { flag: "🇯🇴", country: "JORDAN", years: "2 YRS", note: "Amman. Born here.", c1: "#000", c2: "#ce1126" },
      { flag: "🇶🇦", country: "QATAR", years: "16 YRS", note: "Doha. Where I grew up.", c1: "#8d1b3d", c2: "#fff" },
      { flag: "🇪🇸", country: "SPAIN", years: "3 YRS", note: "Madrid. SLU Madrid plus nationality.", c1: "#aa151b", c2: "#f1bf00" },
      { flag: "🇺🇸", country: "UNITED STATES", years: "2 YRS", note: "St. Louis. Currently based here.", c1: "#3c3b6e", c2: "#b22234" }
    ],
    gameranks: [
      { g: "OVERWATCH", r: "TOP 500", c: "#f59e0b" },
      { g: "CALL OF DUTY", r: "TOP 500", c: "#84cc16" },
      { g: "VALORANT", r: "ASCENDANT", c: "#ef4444" },
      { g: "RAINBOW SIX", r: "DIAMOND", c: "#22d3ee" },
      { g: "CS:GO", r: "LEGENDARY EAGLE", c: "#ffd166" },
      { g: "MARVEL RIVALS", r: "CELESTIAL", c: "#a78bfa" }
    ],
    teams: [
      { sport: "FOOTBALL", team: "MAN CITY", c: "#6cabdd" },
      { sport: "FOOTBALL", team: "REAL MADRID", c: "#febe10" },
      { sport: "BASKETBALL", team: "BOSTON CELTICS", c: "#007a33" },
      { sport: "BASEBALL", team: "ST. LOUIS CARDINALS", c: "#c41e3a" },
      { sport: "BASEBALL", team: "BOSTON RED SOX", c: "#bd3039" }
    ],
    sports: ["FOOTBALL", "BASEBALL", "BASKETBALL", "UFC", "AMERICAN FOOTBALL"],
    stories: [
      { t: "STUDENT COUNCIL VP", d: "Vice President of the Sixth Form Student Council at Park House English School, 2021." },
      { t: "THE BANGLADESH INCIDENT", d: "Someone from Bangladesh tried to hack my Steam account. I reverse-engineered the attack, traced him, and he got caught. The library remains intact." },
      { t: "WORLD SCHOLAR'S CUP", d: "Doha Regional Round, February 2020. Top 5% in Team Debate, Silver in Team Bowl, and Global Round qualification." },
      { t: "DUKE OF EDINBURGH", d: "Bronze Award, 2019. Wilderness expedition and resilience training via getting rained on." },
      { t: "NATIONAL TV", d: "Appeared on Qatar national television after a national mental math competition. Chinese abacus, one year of training." },
      { t: "RED CROSS · RED CRESCENT", d: "Red Cross Disaster Action Team member. Red Crescent charity clothes-drive volunteer." }
    ],
    endeavorsTitle: "Personal Endeavors",
    lifestyle: ["looking for jobs or research assistant positions", "working on my next GitHub project", "learning ancient Chinese cultivation arts", "Dukan diet and weightlifting", "working on modeling genetics", "playing through Expedition 33", "filing for OPT"]
  },

  astakeria: {
    layout: "astakeria",
    heading: "ASTAKERIA",
    subtitle: "ECHOES OF THE OVERWRITTEN",
    hook: "the game watches how you play. then it writes you back into the world.",
    lore: [
      "You wake up in a world that does not agree on what it is. Streets rearrange between visits. Characters who died yesterday are alive again, but quieter. A locked door you walked past without noticing has become the center of a story no one is telling.",
      "This is Astakeria. Something in it is watching you. Not cosmetically. Not in a menu. In the soil. It is called Entropy, and it takes note of everything: the fights you picked, the mercy you showed, the bodies you looted or left, the NPCs you spoke to twice, and the ones you never came back for.",
      "Two players who picked the same hero will end up in two different games. That is the point."
    ],
    pillars: [
      { n: "ENTROPY", d: "A behavior-tracking system that profiles aggression, hesitation, curiosity, and mercy, then silently rewrites the world to match." },
      { n: "FIVE HEROES", d: "Five playable archetypes with separate skill trees and different relationships to the world state." },
      { n: "NO LOOT", d: "No random drop tables. Progression by choice, not by luck." },
      { n: "SOLO DEV", d: "Godot 4.x. Realistic scope. The goal is fewer systems with more consequence." }
    ],
    heroes: [
      { name: "THE RONIN", role: "Discipline · Blade · Memory", tagline: "kills quickly. remembers everything." },
      { name: "THE HERETIC", role: "Faith · Fire · Debt", tagline: "burns what she prays for." },
      { name: "THE ARCHIVIST", role: "Knowledge · Time · Revision", tagline: "edits the past. pays interest on it." },
      { name: "THE WARDEN", role: "Duty · Shield · Silence", tagline: "protects people who may not deserve it." },
      { name: "THE ECHO", role: "Mystery · Mirrors · Regret", tagline: "a version of you that died in a better timeline." }
    ],
    entropyExample: [
      { trigger: "you keep killing neutral NPCs", consequence: "the town gates stay closed next time. merchants in other zones mark up prices. a bounty appears on your name." },
      { trigger: "you spare a specific boss", consequence: "they show up later as an ally, recruiter, or problem depending on the hero." },
      { trigger: "you skip every side quest", consequence: "the side quests move onto the main path. nothing is optional anymore." },
      { trigger: "you hesitate in every fight", consequence: "enemies adapt, feint, and start pulling boss-level behaviors earlier." }
    ],
    quote: "The world does not remember you. It writes you."
  },

  soon: {
    layout: "soon",
    heading: "COMING SOON",
    sub: "transmission incoming. check back.",
    body: ["Something is being built in this slot.", "If you can read this, the transmission has not fully come through yet."]
  }
};
