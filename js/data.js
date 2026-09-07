// ============================================================
//  HAMZA'S HOUSE - v9 content pass
//  Source of truth: HamzaAkat_Resume.pdf (Sept 2026).
//  Positioning: M.S. Computer Engineering student at George Mason,
//  based in Fairfax VA, open to internships and co-ops.
// ============================================================

export const LINKS = {
  // TODO(hamza): swap in the new single-resume Drive link when the PDF is final.
  resume: "https://drive.google.com/file/d/1KPpaF4SslyHd3tfZcxat-oF_x0n2g95O/view?usp=sharing",
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
  wifi: "https://github.com/PreLabHomework/Handover-Analyzer",
  firmcore: "https://github.com/prelabhomework/Firmcore"
};

export const ROSTER = [
  {
    id: "home", codename: "HMZA-01", title: "HAMZA", subtitle: "ABU KHALAF",
    tagline: "START HERE", accent: "#ffd166", accent2: "#ef476f", role: "MAIN", figure: "protagonist", model: "assets/models/home.glb",
    preview: {
      headline: "HAMZA'S HOUSE",
      sub: "PORTFOLIO MODE",
      blurb: "Welcome to my portfolio. It is styled as a character-select screen because most portfolios look the same. Each hero is a part of my work: firmware, digital hardware, research, and the things I build for myself.",
      stats: [["PROGRAM", "M.S. COMPUTER ENGINEERING"], ["SCHOOL", "GEORGE MASON · CAES/DSYS"], ["CORE", "EMBEDDED · FIRMWARE · RTL"], ["OPEN TO", "Internships · Co-ops"]]
    },
    play_url: LINKS.resume, play_label: "VIEW RESUME", menu: true
  },
  {
    id: "labs", codename: "LAB-02", title: "LABS", subtitle: "RESEARCH DOSSIERS",
    tagline: "WEARABLES · RADAR ML · CLINICAL HARDWARE", accent: "#4ade80", accent2: "#22d3ee", role: "RESEARCH", figure: "scientist", model: "assets/models/labs.glb",
    preview: {
      headline: "RESEARCH DOSSIERS",
      sub: "CHROME · WNIS · BIOMECHANICS",
      blurb: "Three SLU research tracks over two years: PT KIDS clinical wearable firmware deployment at CHROME Lab, GUARD radar-based driver authentication at WNIS Lab, and QBC hematology analyzer reverse engineering at the Musculoskeletal Biomechanics Lab.",
      stats: [["LABS", "CHROME · WNIS · BIOMECH"], ["SPAN", "FALL 2025 - SPRING 2026"], ["FIELDS", "Wearables · mmWave Radar · Clinical HW"], ["OUTPUT", "Firmware · Tools · INFOCOM 2027 Submission"]]
    },
    play_url: LINKS.chromeFirmware, play_label: "VIEW LAB CODE", menu: true
  },
  {
    id: "experience", codename: "EXP-03", title: "EXPERIENCE", subtitle: "INDUSTRY ROTATION",
    tagline: "AI · BANKING · FIRMWARE · PHARMA", accent: "#38bdf8", accent2: "#818cf8", role: "WORK", figure: "operator", model: "assets/models/experience.glb",
    menu: true,
    preview: {
      headline: "WORK HISTORY",
      sub: "POWER INTL · DOHA BANK · CORSAIR · SAMSUNG · GSK",
      blurb: "Industry rotations across three countries: Power International Holding data and AI engineering, Doha Bank data engineering, Corsair C++ firmware, the Samsung Innovation Campus AI program, and GSK pharmaceutical research.",
      stats: [["COMPANIES", "Power Intl · Doha Bank · Corsair · Samsung · GSK"], ["LATEST", "Data & AI Intern, Summer 2026"], ["SECTORS", "AI · Banking · Firmware · Pharma"], ["REGIONS", "Qatar · Spain · Remote"]]
    },
    play_url: LINKS.linkedin, play_label: "VIEW LINKEDIN"
  },
  {
    id: "capstone", codename: "CAP-04", title: "CAPSTONE", subtitle: "TREMOR STABILIZER",
    tagline: "PARKINSON'S TREMOR MONITORING", accent: "#ef4444", accent2: "#f87171", role: "FINAL YEAR", figure: "engineer", model: "assets/models/capstone.glb",
    preview: {
      headline: "TREMORMONITOR",
      sub: "ESP32-S3 · FREERTOS · BLE GATT · FFT",
      blurb: "Real-time firmware on ESP32-S3 with FreeRTOS multi-task scheduling, interrupt-driven IMU acquisition, DMA-assisted sensor reads, FFT-based tremor detection, closed-loop actuator feedback, and a custom BLE GATT service with 5-byte packet encoding. Sole software developer on a four-person team. Sold to a research lab.",
      stats: [["MCU", "ESP32-S3 (Xtensa LX7)"], ["STACK", "FreeRTOS · C++ · BLE GATT · FFT"], ["PATH", "Sensor to BLE to SQLite to Firebase"], ["STATUS", "Shipped · Sold To Lab"]]
    },
    play_url: LINKS.tremorMonitor, play_label: "VIEW APP", menu: true
  },
  {
    id: "projects", codename: "PRJ-05", title: "PROJECTS", subtitle: "SHOWCASE",
    tagline: "FIRMWARE · RTL · TOOLING", accent: "#f59e0b", accent2: "#fbbf24", role: "BUILDER", figure: "builder", model: "assets/models/projects.glb",
    preview: {
      headline: "PROJECT SHOWCASE",
      sub: "BUILDS OUTSIDE THE MAIN LAB PIPELINE",
      blurb: "Standalone builds: Firmcore, a header-only embedded C++20 library; an FPGA UART transmitter in VHDL on Artix-7; an AVR peripheral control system in assembly; and the WiFi coverage analyzer delivered to SLU IT.",
      stats: [["SPANS", "C++20 · VHDL · AVR ASM · Python"], ["PROOF", "21M Fuzz Execs · 1.9 KB Flash"], ["FROM", "2022 ONWARDS"], ["CODE", "github.com/prelabhomework"]]
    },
    play_url: LINKS.firmcore, play_label: "VIEW FIRMCORE", menu: true
  },
  {
    id: "research", codename: "PUB-06", title: "RESEARCH", subtitle: "PAPERS · PATENTS",
    tagline: "ARCHIVE · CERTIFICATIONS · PUBLICATIONS", accent: "#a78bfa", accent2: "#c4b5fd", role: "AUTHOR", figure: "author", model: "assets/models/research.glb",
    preview: {
      headline: "PAPERS & PATENTS",
      sub: "ACTIVE AND HISTORICAL RECORDS",
      blurb: "Research outputs and continuing education across radar ML, clinical hardware modernization, haptic wearables, forensics, AI strategy, cybersecurity, and robotics.",
      stats: [["TRACKS", "GUARD · QBC · PT KIDS"], ["GUARD", "100% Unauthorized-Driver Detection"], ["DATASET", "5 Drivers · 25 Sessions · 20 FPS"], ["UNDER REVIEW", "IEEE INFOCOM 2027"]]
    },
    play_url: LINKS.guard, play_label: "VIEW GUARD", menu: true
  },
  {
    id: "skills", codename: "SKL-07", title: "LOADOUT", subtitle: "TECHNICAL KIT",
    tagline: "LANGUAGES · HARDWARE · TOOLS", accent: "#22d3ee", accent2: "#67e8f9", role: "SKILLS", figure: "technician", model: "assets/models/skills.glb",
    preview: {
      headline: "LOADOUT",
      sub: "PRACTICAL ENGINEERING STACK",
      blurb: "Computer architecture and digital design first, then embedded firmware, FPGA and RTL, validation and debug, systems tooling, edge AI, and software. Sorted by actual depth instead of inflated noise.",
      stats: [["TOP", "C · C++20 · VHDL · AVR ASM · Python"], ["HARDWARE", "Artix-7 · ESP32-S3 · ATmega · IWR6843"], ["DEBUG", "JTAG · Scope · Logic Analyzer"], ["SPOKEN", "4 Languages"]]
    },
    play_url: LINKS.resume, play_label: "VIEW RESUME", menu: true
  },
  {
    id: "timeline", codename: "TLN-08", title: "TIMELINE", subtitle: "SCROLL",
    tagline: "AMMAN · DOHA · MADRID · ST. LOUIS · FAIRFAX", accent: "#f472b6", accent2: "#f9a8d4", role: "HISTORY", figure: "archivist", model: "assets/models/timeline.glb",
    preview: {
      headline: "TIMELINE",
      sub: "CHRONOLOGICAL PATH",
      blurb: "A journal of internships, research labs, engineering projects, publications, certificates, leadership, and the places that shaped the work.",
      stats: [["FROM", "2018"], ["TO", "2028"], ["COUNTRIES", "Jordan · Qatar · Spain · USA"], ["FORMAT", "Chronological"]]
    },
    play_url: LINKS.linkedin, play_label: "VIEW LINKEDIN", menu: true
  },
  {
    id: "affiliations", codename: "AFF-09", title: "AFFILIATIONS", subtitle: "WALL",
    tagline: "GMU · SLU · MIT · SAMSUNG", accent: "#e5e7eb", accent2: "#60a5fa", role: "NETWORK", figure: "network", model: "assets/models/affiliations.glb",
    preview: {
      headline: "AFFILIATIONS",
      sub: "INSTITUTIONS · COMPANIES · PROGRAMS",
      blurb: "Institutions, companies, labs, programs, publications, and organizations connected to the work. Brand-colored tiles for a cleaner collaborator-wall feel.",
      stats: [["ACADEMIC", "GMU · SLU · MIT"], ["INDUSTRY", "CORSAIR · GSK · SAMSUNG"], ["AWARD", "SLU Launch Inventor, $2,500"], ["IN PROGRESS", "USPTO Patent Bar"]]
    },
    play_url: LINKS.linkedin, play_label: "VIEW LINKEDIN"
  },
  {
    id: "astakeria", codename: "AST-10", title: "ASTAKERIA", subtitle: "ECHOES OF THE OVERWRITTEN",
    tagline: "THE GAME THAT WATCHES YOU BACK", accent: "#fb7185", accent2: "#fda4af", role: "LEGEND", figure: "astakeria", model: "assets/models/astakeria.glb",
    preview: {
      headline: "ASTAKERIA",
      sub: "ECHOES OF THE OVERWRITTEN",
      blurb: "Active alpha: hero-based action RPG with FSM combat, shared OOP hero base class, and Nemesis Intelligence autoload singletons tracking behavioral signals to evolve enemy traits. Built in Godot 4.x.",
      stats: [["STATUS", "Active Alpha"], ["ENGINE", "Godot 4.x / GDScript"], ["SYSTEM", "FSM Combat + Nemesis AI"], ["HEROES", "3+ Playable"]]
    },
    play_url: LINKS.github, play_label: "VIEW GITHUB"
  },
  {
    id: "personal", codename: "PSN-11", title: "PERSONAL", subtitle: "OFF-DUTY",
    tagline: "FOUR COUNTRIES · FOUR LANGUAGES", accent: "#fb923c", accent2: "#fdba74", role: "CIVILIAN", figure: "civilian", model: "assets/models/personal.glb",
    preview: {
      headline: "OFF-DUTY",
      sub: "GAMING · SPORTS · STORIES",
      blurb: "Four countries, four languages, top 500 in two shooters, vice president of a high school council, World Scholar's Cup top 5% team debate at the Global Round, and a protected Steam library.",
      stats: [["COUNTRIES", "4"], ["LANGUAGES", "4"], ["OW", "TOP 500"], ["TEAMS", "5 FAVORITES"]]
    },
    play_url: LINKS.linkedin, play_label: "CONNECT"
  },
  {
    id: "contact", codename: "COM-12", title: "CONTACT", subtitle: "JOIN TEAM CHAT",
    tagline: "EMAIL · PHONE · LINKEDIN · GITHUB", accent: "#34d399", accent2: "#22d3ee", role: "COMMS", figure: "comms", model: "assets/models/contact.glb",
    preview: {
      headline: "READY TO TALK",
      sub: "OPEN TO INTERNSHIPS AND CO-OPS",
      blurb: "Fast contact, resume link, role targets, and location in one clean comms panel. Open to internships and co-ops in embedded, firmware, RTL, and validation.",
      stats: [["EMAIL", "READY"], ["PHONE", "READY"], ["OPEN", "INTERNSHIPS · CO-OPS"], ["BASED", "FAIRFAX, VA"]]
    },
    play_url: LINKS.resume, play_label: "VIEW RESUME"
  },
  {
    id: "soon", codename: "SOON-13", title: "???", subtitle: "TRANSMISSION INCOMING",
    locked: true,
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
    sub: "Portfolio Mode: Hover A Character, Preview The Story, Select To Enter.",
    intro: "Welcome to my portfolio. I styled it after a character-select screen because most portfolios look the same. Each hero represents a part of my work, projects, research, skills, or personal story. Hover to preview, select to enter, and use Back or ESC to return to the roster.",
    bio: [
      "I'm Hamza Abu Khalaf Al Takrouri, a Computer and Electrical Engineering graduate from Saint Louis University, now an M.S. Computer Engineering student at George Mason University on the CAES/DSYS concentration. My work is embedded firmware, digital systems, and hardware-software co-design, with growing depth in computer architecture, FPGA and RTL design, and accelerator-oriented computing.",
      "Three research labs, one senior design capstone sold to a research lab, co-authored work under review at IEEE INFOCOM 2027, a $2,500 SLU Launch Inventor Award, and industry programs at Power International Holding, Doha Bank, Corsair, Samsung, and GSK."
    ],
    quickfacts: [
      { k: "Based In", v: "Fairfax, Virginia" },
      { k: "Open To", v: "Internships and Co-ops" },
      { k: "Focus", v: "Embedded Firmware, Digital Design, FPGA/RTL, Validation" },
      { k: "Program", v: "M.S. Computer Engineering, George Mason (2026-2028)" },
      { k: "Background", v: "B.S. Computer Eng + Electrical Eng, CS + Math minors" }
    ],
  },

  labs: {
    layout: "labs",
    heading: "RESEARCH LABS",
    sub: "Three research tracks at Saint Louis University across two years: clinical wearable firmware, mmWave radar authentication, and medical device modernization.",
    labs: [
      {
        key: "chrome",
        name: "CHROME LAB",
        focus: "PT KIDS, Clinical Wearables, Haptic Communication",
        pi: "Embedded Systems And Wearable Hardware",
        status: "PT KIDS · OTA FIRMWARE · R SHINY · HAPTIC WATCH",
        story: [
          "CHROME develops wearable haptic interfaces for DeafBlind communication. The work connects clinical wearable hardware, Bluetooth communication, data review tooling, and pediatric form-factor design.",
          "I shipped PT KIDS, a Python/Tkinter OTA firmware tool for ATmega328P/RN4870 clinical wearables that automates AVRdude flashing over Bluetooth serial. The tool eliminated the need for international firmware deployment trips by replacing in-person flashing with PyInstaller-packaged remote OTA. I also built an R Shiny clinical dashboard for session review, and a SolidWorks finger clamp housing a PPG pulse sensor for the pediatric haptic feedback smartwatch."
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
        focus: "GUARD Radar-Based Driver Authentication",
        pi: "Machine Learning And Behavioral Authentication",
        status: "GUARD · TI IWR6843 · INFOCOM TARGET",
        story: [
          "GUARD is a multi-author research project on GAN-based continuous driver authentication using TI IWR6843 mmWave radar. The pipeline processes spherical-grid point clouds with temporal features including velocity, variance, and frame delta per voxel, then performs continuous identity verification without storing biometrics.",
          "The system uses a two-phase architecture: GAN-based behavioral registration that learns a head+arms-to-torso mapping, followed by a real-time ACA trust-pool module for continuous identity verification. Authentication is dual, using both reconstruction error and discriminator score thresholds.",
          "The pipeline is validated end-to-end across preprocessing, GAN training, and evaluation on a 5-driver, 25-session dataset, achieving 100% unauthorized-driver detection, 90% true acceptance rate, and 100% mimicry rejection within 4 minutes. The approach avoids cameras and preserves privacy. Manuscript under review at IEEE INFOCOM 2027."
        ],
        subprojects: [
          { n: "GUARD Pipeline", d: "Spherical-grid point cloud preprocessing on TI IWR6843 radar data with velocity, variance, and frame-delta temporal features per voxel.", url: LINKS.guard },
          { n: "Two-Phase Auth", d: "Behavioral registration via GAN (head+arms to torso mapping) plus real-time ACA trust-pool module for continuous identity verification." },
          { n: "Dual Threshold", d: "Authentication via reconstruction error and discriminator score thresholds, evaluated on a 5-driver, 25-session dataset." },
          { n: "End-to-End Repo", d: "Preprocessing, training, and evaluation pipeline confirmed functional end-to-end on GitHub.", url: LINKS.guard }
        ],
        proof: ["TI IWR6843 Radar", "GAN Behavioral Registration", "ACA Trust-Pool Module", "5-Driver / 25-Session Dataset", "Dual-Threshold Authentication"],
        funding: "Co-authored manuscript under review at IEEE INFOCOM 2027. Official lab website linked separately.",
        links: [
          { label: "GUARD Repo", url: LINKS.guard },
          { label: "Official WNIS Lab Website", url: LINKS.wnisWebsite, note: "official site" }
        ]
      },
      {
        key: "biomech",
        name: "MUSCULOSKELETAL BIOMECHANICS LAB",
        focus: "QBC Hematology Diagnostic Modernization",
        pi: "Hardware Redesign And Diagnostic Systems",
        status: "QBC MODERNIZATION · FIRMWARE RECOVERY · CLINICAL WORKFLOW",
        story: [
          "The QBC modernization project redesigns a 1970s Becton Dickinson QBC II Plus blood counter for clinical deployment in Haiti and West Africa. Device cost was reduced from $10,000 to under $300 while preserving full clinical measurement capability, the project won the $2,500 SLU Launch Inventor Award (with Sam Ghaddar), and it is being prepared for field deployment in low-resource clinical settings. The original device built around an Intel D8749H MCS-48 microcontroller uses fragile motorized optical scanning that breaks easily at scale.",
          "The redesign replaces the motor, belt drive, LED strips, and photodiode array with a manual digital-caliper measurement architecture: a 24-bit CLK/DATA iGaging caliper, Arduino Nano, and Nextion 5-inch touchscreen. This drops total device cost from ~$10k to under $300 while preserving clinical measurement of the seven blood-layer positions and eight clinical values calculated from centrifuged capillary tubes."
        ],
        subprojects: [
          { n: "Firmware Recovery", d: "Extracted firmware from the Intel D8749H MCS-48 microcontroller using a TL866II programmer. Reverse-engineered original optical measurement logic." },
          { n: "Modern Interface", d: "Nextion 5-inch touchscreen and Arduino Nano interface for a guided four-point vial measurement workflow with piezo feedback." },
          { n: "Digital Measurement", d: "24-bit CLK/DATA iGaging digital caliper replaces motorized optical scanning for seven blood-layer positions and eight clinical value calculations." },
          { n: "Cost Reduction", d: "Full hardware redesign drops device cost from ~$10k to under $300. Won SLU Launch Entrepreneurship Prize ($2,500) with Sam Ghaddar." }
        ],
        proof: ["D8749H Firmware Recovery", "Nextion + Arduino Interface", "24-bit CLK/DATA Caliper", "$10k to <$300 Cost Reduction", "SLU Launch Prize $2,500"],
        funding: "SLU Launch Entrepreneurship Prize winner. Official lab website linked separately.",
        links: [
          { label: "Official Biomechanics Lab Website", url: LINKS.biomechWebsite, note: "official site" }
        ]
      }
    ]
  },

  experience: {
    layout: "experience",
    heading: "WORK EXPERIENCE",
    sub: "Industry internships and programs across data and AI engineering, banking infrastructure, peripheral firmware, semiconductor fabrication, and pharmaceutical R&D.",
    jobs: [
      {
        org: "POWER INTERNATIONAL HOLDING",
        title: "Data and AI Intern",
        place: "Doha, Qatar",
        date: "Summer 2026",
        bullets: [
          "Contributed to an ETL pipeline ingesting Epic clinical-system events and operational data, feeding a predictive-monitoring model that flagged systems at elevated risk of outage before incidents were user-reported. Findings surfaced on an IT operations dashboard used by systems engineers and IT leadership.",
          "Contributed to an internal LLM-based incident-triage assistant that retrieved similar historical tickets and documentation, then summarized likely causes and surfaced troubleshooting steps for engineers handling live incidents."
        ],
        tags: ["ETL", "Predictive Monitoring", "LLM Retrieval", "Epic", "IT Operations"]
      },
      {
        org: "DOHA BANK",
        title: "Data Engineering Intern",
        place: "Doha, Qatar",
        date: "Summer 2025",
        bullets: [
          "Completed a nine-division cross-functional technology rotation covering Data Engineering, Database Administration, Linux Systems, Cybersecurity Operations, IT Governance, Networking Infrastructure, Core Banking, and Business Intelligence - gaining a floor-level understanding of how a regulated financial institution organizes, secures, and operates enterprise-scale technology.",
          "Worked alongside teams running Oracle databases, SQL data management, Linux and Windows server infrastructure, VMware virtualization, SAN/NAS enterprise storage, and network systems including TCP/IP, VLAN segmentation, DNS, and ATM connectivity. Observed how data moves through banking infrastructure from core to channel.",
          "Studied cybersecurity and fintech operations: SOC monitoring, SIEM/SOAR platforms, PAM and DAM controls, incident response, SWIFT transaction infrastructure, digital banking channels, QR payment processing, and IT governance under ITIL/ITSM frameworks. Learned how risk, auditability, and regulatory compliance are engineered into banking systems rather than bolted on."
        ],
        tags: ["Oracle", "SQL", "Linux", "VMware", "Cybersecurity", "Banking Infrastructure"]
      },
      {
        org: "MIT.NANO",
        title: "Cleanroom Volunteer",
        place: "Cambridge, MA",
        date: "Winter 2024 - 2025",
        bullets: [
          "Worked as a cleanroom volunteer at MIT.nano, MIT's shared nanofabrication facility, with hands-on exposure to photolithography, thin-film deposition, wafer processing, and semiconductor fabrication workflows under NDA.",
          "Operated under the supervision of MIT.nano staff across cleanroom fabrication processes used in microprocessor and device research, developing firsthand understanding of the fabrication constraints that inform hardware and chip design at the process level."
        ],
        tags: ["Cleanroom", "Photolithography", "Semiconductor Fabrication", "Thin-Film Deposition"]
      },
      {
        org: "CORSAIR",
        title: "Firmware Engineering Externship, Early Talent Program",
        place: "Remote",
        date: "Spring 2023",
        bullets: [
          "Implemented C++ firmware changes for ARM Cortex-A Raspberry Pi-based peripheral platforms, working directly on macro execution sequences, key remapping logic, and I2C/SPI-level device behavior at the register level. The work required thinking in terms of how code changes produce measurable physical behaviors: keystroke timing, responsiveness, and macro reliability.",
          "Debugged firmware-to-hardware interactions where incorrect register states caused observable physical failures. Learned to trace problems backward from device behavior through software logic to hardware root cause, developing register-level diagnostic intuition inside a production peripheral firmware environment.",
          "Validated firmware builds across multiple physical hardware configurations to verify consistent responsiveness. Firmware validation in this context differs from software testing: physical device differences between hardware revisions can mask or amplify code-level issues in ways that aren't visible in simulation."
        ],
        tags: ["C++", "ARM Cortex-A", "I2C", "SPI", "Register Debugging"]
      },
      {
        org: "SAMSUNG GULF ELECTRONICS",
        title: "Samsung Innovation Campus, AI & Machine Learning Program",
        place: "Doha, Qatar",
        date: "Winter 2023",
        bullets: [
          "Completed a 240-hour structured AI and machine learning program covering Python, probability and statistics, supervised and unsupervised machine learning, deep learning architectures, feature extraction, data preparation, and end-to-end applied AI project development.",
          "Built an Arabic dialect-to-MSA subtitle pipeline as the capstone project: Whisper speech-to-text, heuristic dialect family detection across 7 dialect groups (Egyptian, Iraqi, Levantine, Gulf, Maghrebi, Sudanese, Yemeni), LLM-assisted normalization into Modern Standard Arabic, and synchronized SRT subtitle export. The pipeline addresses a real accessibility gap: Arabic speech recognition struggles with 400M+ speakers who communicate in dialects that differ substantially from MSA."
        ],
        tags: ["Python", "Machine Learning", "Whisper", "NLP", "Arabic Dialects"]
      },
      {
        org: "GLAXOSMITHKLINE (GSK)",
        title: "Technology Research Shadow",
        place: "Madrid, Spain",
        date: "Fall 2022",
        bullets: [
          "Shadowed pharmaceutical R&D researchers within a GSK laboratory environment in Madrid, observing how AI-assisted drug discovery workflows, laboratory automation systems, and RFID-based asset traceability operate in a regulated industrial research setting. Gained firsthand exposure to the gap between academic research and production pharmaceutical R&D, where data integrity, documentation standards, and compliance constraints shape every technical decision.",
          "Conducted independent research into pharmaceutical laboratory informatics, automation strategy, RFID traceability system design, and workflow optimization within pharmaceutical R&D, contextualizing how engineering tools and automated systems address lab efficiency and data quality at industrial scale."
        ],
        tags: ["R&D", "AI Drug Discovery", "RFID", "Lab Automation"]
      },
      {
        org: "QATAR INT'L TRADING & CONTRACTING CO.",
        title: "Administration & Logistics Intern",
        place: "Doha, Qatar",
        date: "Fall 2017 - Spring 2019",
        bullets: [
          "Supported administrative, procurement, and logistics operations within a multinational trading and contracting organization, gaining early professional experience in documentation management, stakeholder coordination, and business operations."
        ],
        tags: ["Operations", "Procurement", "Documentation"]
      }
    ]
  },

  capstone: {
    layout: "capstone",
    heading: "TREMOR TRACKERS",
    sub: "Sold to an active Parkinson's research lab post-development. ESP32-S3 firmware + React Native app for continuous tremor detection, BLE telemetry, and clinical session monitoring.",
    team: "4-member senior design team",
    deadline: "MAY 2026",
    clinical: {
      problem: "Parkinson's tremors typically occur between 4 and 6 Hz and progressively impair everyday activities: eating, writing, dressing. Most assessment happens in brief clinical visits, missing the daily variation that matters most for medication timing and adjustment. There is no low-cost, continuous, wearable solution for long-term tremor monitoring outside a clinic.",
      approach: "A lightweight forearm sleeve with an embedded IMU captures arm motion in real time. The firmware uses DSP to isolate involuntary tremor signatures from voluntary movement in the 4 to 6 Hz band, then streams compact 5-byte BLE packets to a React Native companion app. The app records sessions, stores data locally, visualizes frequency trends, and ties tremor severity to medication timing.",
      validation: "Prototype validation target: reliable detection of PD-like tremor signatures in the 4 to 6 Hz range, with clear differentiation between tremor and gross voluntary motion. Clinical interview with PT informed the design requirements.",
      medication: "Medication accessory concept: tremor severity data informs Levodopa dosing windows, giving patients and caregivers objective data for medication management between clinical visits."
    },
    architecture: [
      { stage: "SENSE", chip: "IMU + ESP32-S3", text: "A 9-axis IMU embedded in the forearm sleeve captures 3-axis acceleration and gyroscope data at the required sampling rate to resolve 4-6 Hz tremor components." },
      { stage: "DETECT", chip: "FFT + DSP", text: "Firmware applies FFT and band-pass filtering to isolate the tremor frequency band, extract amplitude, and distinguish involuntary tremor from intentional arm movement." },
      { stage: "STREAM", chip: "BLE 5-byte packets", text: "The ESP32-S3 streams compact 5-byte encoded packets over BLE to the React Native app at low latency." },
      { stage: "LOG", chip: "SQLite 7 tables", text: "TremorMonitor stores sessions, readings, severity scores, medication events, and export records in a local SQLite database with 7 tables." },
      { stage: "REPORT", chip: "Charts + CSV export", text: "The app renders live frequency charts, session history, severity trend graphs, and exports clinical CSV data for doctor review." }
    ],
    app: {
      name: "TremorMonitor",
      platform: "React Native / Expo",
      description: "Sold to an active Parkinson's research lab post-development. The companion app decodes BLE packets in real time, records live tremor sessions, stores them in SQLite, visualizes frequency and severity trends, and exports clinical CSV reports.",
      modules: [
        { n: "BLEService", d: "Connects to ESP32-S3, decodes 5-byte packet stream, manages connection state and reconnection." },
        { n: "LiveMonitor", d: "Real-time frequency and amplitude display during active recording sessions." },
        { n: "SQLite Schema", d: "7-table local database storing sessions, readings, severity, medication events, and export history." },
        { n: "History", d: "Browsable session archive with trend graphs for long-term tremor monitoring." },
        { n: "CSV Export", d: "Clinical export of session data for sharing with neurologists and care teams." },
        { n: "Medication Mode", d: "Logs Levodopa dosing times and overlays them on tremor severity charts." }
      ]
    },
    links: [
      { label: "TremorMonitor App", url: LINKS.tremorMonitor },
      { label: "Firmware Repo", url: LINKS.capstoneFirmware }
    ]
  },

  projects: {
    layout: "gallery",
    heading: "PROJECTS",
    sub: "Embedded C++ libraries, FPGA logic, register-level AVR work, WiFi infrastructure analysis, and research tooling. Most are open source.",
    items: [
      {
        tag: "EMBEDDED", title: "Firmcore Embedded C++20 Library", year: "2026",
        body: "Header-only C++20 firmware library providing BSP and HAL-style building blocks: a lock-free SPSC ring buffer, packet framing with COBS encoding, Q-format fixed-point arithmetic for embedded DSP, and a heap-free memory pool allocator. Targets zero-heap, exception-free deployment on ARM Cortex-M4. Correctness is proven mechanically rather than claimed: unit tests run under ASan and UBSan on both GCC 13 and Clang 18, and a 21-million-execution libFuzzer campaign against the wire-facing parsers returned zero findings. Published cross-compiled code-size benchmarks show a full sensor telemetry pipeline fitting in 1.9 KB flash and 900 B RAM.",
        proof: "Library-grade embedded C++, lock-free concurrency, wire-protocol hardening under fuzzing, and the discipline of publishing measured flash and RAM footprints instead of asserting efficiency",
        tech: ["C++20", "CMake", "libFuzzer", "ASan/UBSan", "ARM Cortex-M4", "GitHub Actions"], url: LINKS.firmcore
      },
      {
        tag: "AVR", title: "AVR Peripheral Control System", year: "2024",
        body: "Three external interrupt service routines written in AVR assembly on an ATmega32A and STK500, with full SREG and stack preservation, interrupt vector table configuration, and priority validation across simultaneous trigger scenarios, all debugged through a JTAGICE MkII. Extended the system with Timer0 prescaler delays, matrix keypad scanning, ASCII lookup tables, and SRAM message storage, then added a C ADC loop that reads an LM34 temperature sensor and generates fast PWM to position a servo across seven calibrated angles with switch debouncing.",
        proof: "Register-level assembly, interrupt architecture and priority handling, hardware debugging with a JTAG probe, and mixed assembly and C peripheral control on bare metal",
        tech: ["AVR Assembly", "C", "ATmega32A", "STK500", "ADC", "PWM", "JTAG"]
      },
      {
        tag: "FPGA", title: "UART Transmitter on FPGA", year: "2024",
        body: "Implemented a complete UART serial transmitter from scratch in VHDL on a Digilent Basys 3 (Artix-7 FPGA). Divides a 100 MHz FPGA clock to 9600 baud, constructs 10-bit frames (start + 8 data bits LSB-first + stop), and continuously streams ASCII through the USB-UART bridge. Every layer is hand-built: clock divider, baud strobe, FSM with IDLE/LOAD/SHIFT states, ASCII ROM, and output signal. No IP cores, no software serial libraries - digital logic implementing a communication protocol at the hardware level.",
        proof: "Hardware-level serial protocol design, FPGA timing, FSM architecture, register-transfer level thinking, and building communication standards in logic rather than relying on software abstractions",
        tech: ["VHDL", "Vivado", "Basys 3", "Artix-7", "UART"], url: LINKS.uart
      },
      {
        tag: "EMBEDDED", title: "AVR Embedded Control System", year: "2024",
        body: "Register-level firmware on an ATmega32A/STK500 platform. Implemented three external ISRs in AVR Assembly with full SREG/stack preservation, interrupt vector table configuration, and priority validation across simultaneous trigger scenarios, debugged via JTAGICE MkII. Extended with Timer0 prescaler delays, matrix keypad scanning with ASCII lookup tables, and SRAM message storage. C ADC loop reading an LM34 temperature sensor generates fast PWM to position a servo across seven calibrated angles with switch debouncing.",
        proof: "Register-level assembly firmware, interrupt architecture, hardware debugging with JTAG, ADC/PWM signal chain, real peripheral integration",
        tech: ["AVR Assembly", "C", "ATmega32A", "JTAGICE MkII", "ADC", "PWM"]
      },
      {
        tag: "ANALOG", title: "High-Gain 2N7000 Two-Stage MOSFET Amplifier", year: "2025",
        body: "Designed and bench-validated a two-stage common-source 2N7000 MOSFET amplifier on a single 12 V supply. Iterated bias points, drain/source resistances, and bypass networks through Multisim simulation and oscilloscope measurement on a 10 mV peak input signal. Achieved 404 V/V total voltage gain, 400+ kHz bandwidth, and 150 to 235 kOhm input resistance.",
        proof: "Analog circuit design, MOSFET biasing theory, simulation-to-bench validation workflow, frequency response characterization",
        tech: ["Analog Design", "Multisim", "2N7000 MOSFET", "Oscilloscope"]
      },
      {
        tag: "DATA", title: "WiFi Coverage & Handover Analyzer", year: "2024",
        body: "Built a passive Raspberry Pi 802.11 scanner in monitor mode to capture beacon frames without network association. Surveyed three floors of McDonnell Douglas Hall (194K+ measurements, 952 locations), computed per-AP RSSI distributions, identified handover overlap zones, and validated Python results against Acrylic WiFi Pro heatmaps. A separate Ritter Hall lab survey found 73% of locations fell below minimum WiFi standards and produced an IT infrastructure report delivered to SLU stakeholders.",
        proof: "Embedded Linux tooling, wireless survey methodology, passive 802.11 packet capture, RSSI analysis, Python data pipelines, and stakeholder-ready engineering reports",
        tech: ["Raspberry Pi", "Python", "PyShark", "802.11", "RSSI"], url: LINKS.wifi
      },
      {
        tag: "AI", title: "Arabic Dialect-to-MSA Subtitle Pipeline", year: "2023",
        body: "End-to-end pipeline for transcribing Arabic dialect audio into standardized Modern Standard Arabic subtitles. Runs Whisper speech-to-text, applies heuristic dialect family detection across 7 groups (Egyptian, Iraqi, Levantine, Gulf, Maghrebi, Sudanese, Yemeni), normalizes via LLM, and exports SRT files. Built during Samsung Innovation Campus. Addresses a real accessibility gap: 400M+ Arabic speakers use dialects that standard transcription handles poorly.",
        proof: "Multilingual NLP pipeline design, dialect-aware speech processing, LLM normalization integration, practical accessibility engineering",
        tech: ["Python", "Whisper", "LLM", "NLP", "SRT"]
      },
      {
        tag: "NLP", title: "Natural Language to Code Translator", year: "2022-2023",
        body: "Parser-driven tool translating English natural language descriptions into syntactically correct code in Java, C++, and Python simultaneously. Built a structured intermediate representation that maps linguistic patterns to language-specific constructs, producing idiomatic output across three different languages from a single input.",
        proof: "NLP parsing logic, cross-language code generation, structural language analysis, early compiler-style thinking",
        tech: ["Python", "Java", "C++", "NLP"], url: LINKS.nlToCode
      },
      {
        tag: "MOBILE", title: "Waylo", year: "2026",
        body: "React Native travel companion app built with Expo and Firebase. Full product ownership: scoped, designed, and shipped a Firebase-backed app with authentication, real-time data, and storage from scratch.",
        proof: "Product thinking, mobile stack ownership, Firebase-backed architecture, iterative shipping from prototype to working app",
        tech: ["React Native", "Expo", "Firebase"], url: LINKS.waylo
      },
      {
        tag: "WEB", title: "SLU Research Lab Websites", year: "2025",
        body: "Three independent research websites built for SLU biomedical labs. (1) Musculoskeletal Biomechanics Lab - tendon biomechanics, wearable tech, preclinical models research; team profiles, join-the-lab, SLU visual identity. (2) A-LYST+ Lysosomal Science  -  mucopolysaccharidoses, enzyme replacement, gene therapy, biomarker discovery; IBM Plex Mono/Crimson Pro editorial design. (3) Anzell Lab Vascular Biology  -  HHT, AVM development, PRIME editing, endothelial mechanobiology; publications, members, and recruitment. All use responsive HTML/CSS with fixed navigation and research-communication layouts. Not yet officially published.",
        proof: "Client-style academic web delivery - translating complex biomedical content across three distinct research domains into accessible, public-facing science pages",
        tech: ["HTML", "CSS", "Responsive Design", "Scientific Communication"]
      },
      {
        tag: "FORENSICS", title: "Smart Forensic Glasses", year: "2025",
        body: "Research paper and working bench prototype for a smart forensic glasses system for field-side crime-scene evidence screening. Proposed architecture uses multi-spectral imaging, ML pattern recognition, encrypted wireless transmission, and cryptographic chain-of-custody verification. The bench demonstration implemented OpenCV SIFT descriptors and FLANN matching for real-time fingerprint recognition against reference databases. Published in TheStemSpectrum.org, Saint Louis University.",
        proof: "Computer vision prototyping, SIFT/FLANN feature matching, forensic system architecture, chain-of-custody design, security-aware engineering, peer-reviewed publication",
        tech: ["Python", "OpenCV", "SIFT", "FLANN"]
      }
    ]
  },
  research: {
    layout: "archive",
    heading: "PAPERS & PATENTS",
    sub: "Active research tracks: manuscript under review at IEEE INFOCOM 2027, one submitted paper, one published paper, and continuing education from MIT, CMU, and Samsung.",
    papers: [
      { status: "UNDER REVIEW", statusTone: "ok", title: "GUARD: GAN-Based Driver Authentication via mmWave Radar", venue: "IEEE INFOCOM 2027", year: "Under Review", blurb: "Multi-author research. mmWave radar continuous driver authentication: GAN behavioral registration, ACA trust-pool verification, no cameras, no stored biometrics. 100% unauthorized detection, 90% true acceptance, 100% mimicry rejection within 4 minutes across a 5-driver 25-session dataset.", url: LINKS.guard },
      { status: "ACTIVE", statusTone: "ok", title: "QBC Hematology Diagnostic Modernization", venue: "Musculoskeletal Biomechanics Lab", year: "2025 - Present", blurb: "Modernized 1970s QBC instrument: Nextion touchscreen, Arduino Nano, iGaging digital calipers, clinical value conversion. Cost: ~$10k to under $300." },
      { status: "SUBMITTED", statusTone: "ok", title: "Haptic Wearables for DeafBlind Communication", venue: "CHROME Lab", blurb: "PT KIDS OTA firmware, BLE clinical wearable pipeline, R Shiny session dashboard, SolidWorks PPG finger clamp.", url: LINKS.chromeFirmware },
      { status: "PUBLISHED", statusTone: "done", title: "Advancements in Computer Forensic Analysis", venue: "TheStemSpectrum.org", year: "2025", blurb: "Smart forensic glasses: OpenCV SIFT/FLANN prototype for field-side fingerprint screening. Two papers merged into one publication." }
    ],
    certifications: [
      { title: "MIT AI & Computer Science Seminars", year: "2025", detail: "Schwarzman College of Computing. Frontier AI and computer science seminars." },
      { title: "MIT Sloan: AI Implications for Business Strategy", year: "2024", detail: "6-week certification covering predictive AI, generative AI, machine learning, and strategic decision-making." },
      { title: "Carnegie Mellon Qatar: MindCraft Robotics & AI", year: "2021", detail: "Director's Certificate. Robotics, AI, and autonomous movement simulation." },
      { title: "Janets: Cyber Security & Virus Protection", year: "2023", detail: "9-hour course covering phishing, malware analysis, firewalls, and network security." },
      { title: "Mark Rober: Creative Engineering", year: "2022", detail: "Arduino prototyping, computer vision, servo motors, sensors, and pneumatic builds." },
      { title: "Ojkool: Certified Mental Math", year: "2018", detail: "Chinese abacus calculation, 93% national-level accuracy, and national TV appearance." }
    ]
  },

  skills: {
    layout: "skills",
    heading: "LOADOUT",
    sub: "Computer architecture and digital design, embedded firmware, FPGA and RTL, validation and debug, systems tooling, edge AI, and software. Sorted by actual depth of experience.",
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
        { n: "R", yrs: 1, note: "Shiny dashboards for CHROME Lab" },
        { n: "AVR Assembly", yrs: 1, note: "register-level ISRs, ATmega32A, interrupt vector table" }
      ]},
      { name: "HARDWARE", items: [
        { n: "Arduino", yrs: 5, note: "Nano, Uno, prototyping, QBC" },
        { n: "Raspberry Pi", yrs: 3, note: "WiFi analyzer, peripherals" },
        { n: "ESP32-S3", yrs: 2, note: "capstone BLE firmware" },
        { n: "FPGA", yrs: 2, note: "Basys 3, VHDL, HDMI, UART" },
        { n: "BLE", yrs: 2, note: "RN4870, GATT, packets, OTA" },
        { n: "ATmega328P", yrs: 1, note: "clinical wearable firmware" },
        { n: "ATmega32A", yrs: 1, note: "AVR Assembly ISRs, ADC/PWM, JTAGICE MkII debugging" },
        { n: "TI IWR6843", yrs: 1, note: "mmWave radar processing" },
        { n: "IMU", yrs: 1, note: "sensor fusion and tremor monitoring" },
        { n: "SolidWorks", yrs: 1, note: "PPG clamp and wearable housings" }
      ]},
      { name: "ELECTRICAL ENGINEERING", items: [
        { n: "Signal Processing", yrs: 3, note: "FFT, tremor frequency, radar temporal features" },
        { n: "Circuit Analysis", yrs: 3, note: "analog/digital labs, MOSFET biasing, Multisim simulation" },
        { n: "Digital Logic", yrs: 2, note: "FSMs, timing, UART, HDMI video" },
        { n: "Sensors", yrs: 2, note: "IMU, PPG, mmWave radar, digital calipers" },
        { n: "Semiconductor Lab Work", yrs: 1, note: "MIT.nano cleanroom and fabrication exposure" },
        { n: "Materials + Devices", yrs: 1, note: "EE coursework and hardware design context" }
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
    sub: "From Doha to Madrid to St. Louis to Fairfax. Internships, research, publications, competitions, and everything in between.",
    events: [
      { date: "APR 2026", tag: "AWARD", body: "SLU Launch Entrepreneurship Prize ($2,500) for QBC Blood Cell Counter redesign (CountKit) with Sam Ghaddar: low-cost clinical hematology instrument for low-resource and field settings." },
      { date: "APR 2026", tag: "QBC", body: "QBC Blood Cell Counter redesign completed: Nextion touchscreen, Arduino Nano, and 24-bit CLK/DATA iGaging caliper replace the fragile 1970s optical/motorized system. Cost dropped from ~$10k to under $300." },
      { date: "APR 2026", tag: "CAPSTONE", body: "TremorMonitor rehaul: BLE packet decoding, SQLite session storage, frequency charts, CSV export, medication mode, and severity thresholds." },
      { date: "APR 2026", tag: "GUARD", body: "GUARD pipeline validated end to end on a 5-driver, 25-session dataset: spherical-grid point cloud preprocessing, GAN behavioral registration (head+arms to torso), and ACA trust-pool authentication." },
      { date: "2025", tag: "CHROME", body: "PT KIDS OTA firmware tool, R Shiny dashboard, Bluetooth stack, and SolidWorks PPG finger clamp for pediatric haptic smartwatch work." },
      { date: "SUMMER 2025", tag: "INTERN", body: "Doha Bank Data Governance & Engineering Intern. Cross-departmental rotation across 9+ banking divisions including databases, Linux systems, server infrastructure, cloud storage, IT operations, and data engineering." },
      { date: "WINTER 2025", tag: "MIT.NANO", body: "MIT.nano volunteer lab technician under NDA. Silicon and semiconductor fabrication, cleanroom workflows, microprocessor-driven instrument control, and 3D printing for prototyping." },
      { date: "2025", tag: "WEB", body: "SLU research lab websites built with responsive layouts, team profiles, and research carousels. My built sites are not public yet." },
      { date: "2024", tag: "NETWORK", body: "WiFi Coverage & Handover Analyzer: 194,000+ measurements across 952 survey locations with MATLAB-modeled findings." },
      { date: "SPRING 2024", tag: "FPGA", body: "FPGA Signal Monitor with HDMI output on Basys 3 using FSM-driven VHDL." },
      { date: "2024", tag: "MIT", body: "MIT Sloan AI Implications for Business Strategy certification." },
      { date: "WINTER 2023", tag: "SAMSUNG", body: "Arabic dialect speech-to-text AI system built during Samsung AI Workshop." },
      { date: "SPRING 2023", tag: "CORSAIR", body: "Firmware Programming Intern. C++ firmware for Raspberry Pi-based keyboard and mouse peripherals." },
      { date: "FALL 2022", tag: "GSK", body: "Technology Research Program in Madrid. AI-enabled lab automation and RFID asset tracking workflows." },
      { date: "2022 TO 2023", tag: "NLP", body: "Natural Language to Code Translator across Java, C++, and Python syntax." },
      { date: "AUG 2021", tag: "SLU", body: "Started Computer Engineering and Electrical Engineering at Saint Louis University." },
      { date: "2021", tag: "LEADERSHIP", body: "Student Council Vice President at Park House English School." },
      { date: "2021", tag: "CMU", body: "CMU Qatar MindCraft robotics and AI program. Director's Certificate." },
      { date: "FEB 2020", tag: "DEBATE", body: "World Scholar's Cup: top 5% Team Debate, Global Round qualification." },
      { date: "2018", tag: "MENTAL MATH", body: "Ojkool Certified Mental Math. 93% national-level accuracy and national TV appearance. Doha, Qatar." }
    ]
  },

  affiliations: {
    layout: "wall",
    heading: "AFFILIATIONS",
    sub: "Institutions, Companies, Programs, Publications, And Organizations That Shaped The Work.",
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
    sub: "Four Countries, Four Languages, One Extremely Defended Steam Library.",
    geography: [
      { flag: "🇯🇴", country: "JORDAN", years: "2 YRS", note: "Amman. Born here.", c1: "#000", c2: "#ce1126" },
      { flag: "🇶🇦", country: "QATAR", years: "16 YRS", note: "Doha. Where I grew up.", c1: "#8d1b3d", c2: "#fff" },
      { flag: "🇪🇸", country: "SPAIN", years: "3 YRS", note: "Madrid. SLU Madrid plus nationality.", c1: "#aa151b", c2: "#f1bf00" },
      { flag: "🇺🇸", country: "UNITED STATES", years: "2 YRS", note: "St. Louis for the B.S., Fairfax now for the M.S.", c1: "#3c3b6e", c2: "#b22234" }
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
      { t: "WORLD SCHOLAR'S CUP", d: "Doha Regional Round, February 2020. Top 5% in Team Debate, Silver in Team Bowl, and Global Round qualification." },
      { t: "NATIONAL TV", d: "Appeared on Qatar national television after a national mental math competition. Chinese abacus, one year of training, 93% national-level accuracy." },
      { t: "THE BANGLADESH INCIDENT", d: "Someone from Bangladesh tried to hack my Steam account. I reverse-engineered the attack, traced the actor, and he got caught. The library remains intact." },
      { t: "RED CROSS · RED CRESCENT", d: "Red Cross Disaster Action Team member. Red Crescent charity clothes-drive volunteer." },
      { t: "STUDENT COUNCIL VP", d: "Vice President of the Sixth Form Student Council at Park House English School, 2021." },
      { t: "DUKE OF EDINBURGH", d: "Bronze Award, 2019. Wilderness expedition and resilience training via getting rained on." }
    ],
    endeavorsTitle: "Personal Endeavors",
    lifestyle: ["Looking For Jobs Or Research Assistant Positions", "Studying For The FE Exam", "Regular LeetCode Practice", "Working On My Next GitHub Project", "Filing For OPT", "Working On Modeling Genetics", "Dukan Diet And Weightlifting", "Playing Through Expedition 33", "Learning Ancient Chinese Cultivation Arts"]
  },

  astakeria: {
    layout: "astakeria",
    heading: "ASTAKERIA",
    subtitle: "ECHOES OF THE OVERWRITTEN",
    hook: "the game watches how you play. then it writes you back into the world.",
    documents: [
      { title: "Game Design Document v0.5", pages: "80 pages", desc: "Full creative and mechanical vision: hero roster, combat philosophy, Entropy system, Nemesis AI, narrative architecture, world structure, and faction design." },
      { title: "Launch Scope Source Document v1.0", pages: "11 pages", desc: "Canonical prioritized scope. First-person action RPG, hero swapping, ~10-hour playthrough. Entropy over Nemesis. This document wins all conflicts with the GDD." },
      { title: "Developer Technical Guidebook v1.0", pages: "22 pages", desc: "Godot 4.x implementation plan: autoload/singleton architecture, GDScript signal flows, combat FSM, enemy AI states, Entropy data bus, save system, asset pipeline from Blender, and staged build phases." }
    ],
    scope: {
      format: "First-person action RPG",
      runtime: "Approx. 10-hour playthrough",
      heroSwap: "Player selects and swaps between 5 distinct hero archetypes",
      combatPhilosophy: "Combat-first design. Readable. No ability spam hiding bad mechanics. Every move is a readable threat.",
      progression: "No random loot. Progression by choice: skill trees and hero stat resources. Consequence over reward."
    },
    lore: [
      "You wake up in a world that does not agree on what it is. Streets rearrange between visits. Characters who died yesterday are alive again, but quieter. A locked door you walked past without noticing has become the center of a story no one is telling.",
      "This is Astakeria. Something in it is watching you. Not cosmetically. Not in a menu. In the soil. It is called Entropy, and it takes note of everything: the fights you picked, the mercy you showed, the bodies you looted or left, the NPCs you spoke to twice, and the ones you never came back for.",
      "Two players who picked the same hero will end up in two different games. That is the point."
    ],
    entropy: {
      desc: "Entropy is a 0-to-100 behavioral score that runs in the background of every session, reading aggression, hesitation, curiosity, mercy, overreliance on one hero, ability spamming, skipped lore, and repeated deaths without adaptation.",
      tiers: [
        { range: "0-20", label: "DORMANT", effect: "World is stable. NPCs are open. Merchants are friendly. Enemies fight at baseline." },
        { range: "21-40", label: "STIRRING", effect: "Subtle shifts. NPC dialogue changes tone. Minor enemies start countering your patterns." },
        { range: "41-60", label: "ACTIVE", effect: "The world begins rewriting. Boss intros reference your behavior. Faction attitudes visibly shift." },
        { range: "61-80", label: "FRACTURING", effect: "Significant world changes. Side quests become urgent or unavailable. Trusted NPCs react differently to the same hero." },
        { range: "81-100", label: "OVERWRITTEN", effect: "The final boss is different. The ending is different. The world remembers exactly what you did." }
      ]
    },
    pillars: [
      { n: "ENTROPY SYSTEM", d: "A behavior-tracking score (0-100) with 5 tiers. Profiles aggression, hesitation, curiosity, and mercy, then rewrites dialogue, enemies, NPC attitudes, boss intros, and endings." },
      { n: "HERO SWAPPING", d: "Five playable archetypes with separate skill trees and different relationships to the Entropy score. Each hero experiences the world differently." },
      { n: "LITE NEMESIS", d: "Enemies track which hero killed them, develop counter-traits, upgrade stat weights, and reference past encounters in pre-fight dialogue. Not full Nemesis - but the world remembers." },
      { n: "NO LOOT", d: "No random drop tables. Progression through skill trees and hero resources earned by engagement. Consequence over reward." }
    ],
    heroes: [
      { name: "THE RONIN", role: "Discipline · Blade · Memory", tagline: "plays fastest under 50 Entropy. Above 80, flashbacks corrupt her perception.", mechanic: "Speed and precision scale inversely with Entropy. Her skill tree rewards clean, decisive play." },
      { name: "THE HERETIC", role: "Faith · Fire · Debt", tagline: "her abilities cost health. fire spells scale with Entropy.", mechanic: "Entropy amplifies her damage ceiling. She gets stronger the more chaotic the world becomes - at personal cost." },
      { name: "THE ARCHIVIST", role: "Knowledge · Time · Revision", tagline: "can rewind 5 seconds of combat. each use costs a memory.", mechanic: "Knowledge resource depletes with rewinds. High Entropy corrupts the memories he's spent." },
      { name: "THE WARDEN", role: "Duty · Shield · Silence", tagline: "protects people who may not deserve it.", mechanic: "Shield strength and NPC trust increase at low Entropy. At high Entropy, the world stops honoring her protection." },
      { name: "THE ECHO", role: "Mystery · Mirrors · Regret", tagline: "strongest at exactly 50 Entropy. gets weaker at both extremes.", mechanic: "A version of the player that died in a better timeline. She is the game's mirror." }
    ],
    entropyExample: [
      { trigger: "you keep killing neutral NPCs", consequence: "town gates close on your next visit. merchants in other zones mark up prices. a bounty appears under your hero's name." },
      { trigger: "you spare a specific boss", consequence: "they return later as an ally, a recruiter, or a problem - which one depends on which hero you were playing." },
      { trigger: "you skip every side quest", consequence: "the side quests move onto the main path. nothing is optional anymore." },
      { trigger: "you die to the same enemy 3 times without changing tactics", consequence: "the enemy learns your pattern. gains a counter-trait, adapts its timing, and starts referencing your failures in its pre-fight dialogue." }
    ],
    tech: {
      engine: "Godot 4.x / GDScript",
      architecture: "Autoload/singleton pattern for Entropy, Save, Combat, and Enemy AI systems. Signal-based decoupled communication between hero, world, and reactive systems.",
      combatFlow: "FSM-driven enemy AI with states: Idle, Patrol, Alert, Engage, Retreat, Counter. Combat signals fire to the Entropy bus on every meaningful player action.",
      buildPhases: ["Phase 1: Combat prototype - one hero, one enemy type, readable combat, FSM working. DONE.", "Phase 2: Entropy spine - behavioral tracking, one reaction tier, world acknowledges player. DONE.", "Phase 3 (CURRENT): Alpha - 3+ heroes playable, Nemesis Intelligence, Entropy system, multiple regions. Bug testing and demos.", "Phase 4: Launch scope - full 5 tiers, all heroes tuned, 10-hour playthrough, polish pass."]
    },
    quote: "The world does not remember you. It writes you."
  },

  soon: {
    layout: "soon",
    heading: "COMING SOON",
    sub: "transmission incoming. check back.",
    body: ["Something is being built in this slot.", "If you can read this, the transmission has not fully come through yet."]
  },

  contact: {
    layout: "contact",
    heading: "CONTACT",
    sub: "Open to internships and co-ops in embedded, firmware, RTL, and validation.",
    lines: [
      { label: "Email", value: "hamzaabukat@gmail.com", href: "mailto:hamzaabukat@gmail.com" },
      { label: "Phone", value: "+1 571-663-7706", href: "tel:+15716637706" },
      { label: "LinkedIn", value: "linkedin.com/in/hakat", href: LINKS.linkedin },
      { label: "GitHub", value: "github.com/PreLabHomework", href: LINKS.github },
      { label: "Location", value: "Fairfax, Virginia" },
      { label: "Open To", value: "Internships and Co-ops" }
    ],
    links: [
      { label: "Resume PDF", url: LINKS.resume },
      { label: "LinkedIn", url: LINKS.linkedin },
      { label: "GitHub", url: LINKS.github }
    ]
  }
};
