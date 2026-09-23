// ============================================================
//  HERO INFO CONTENT (v12)
//  Each hero page looks like an Overwatch Hero Info screen but is
//  laid out around its own content: three columns of blocks.
//  Block styles:
//    stats   portrait hexagon + stat line (+ optional difficulty)
//    weapon  large plain icon, name, text, facts
//    tile    white square icon with keybind chip (the abilities look)
//    circle  small ring icon (the perks look)
//    ult     glowing ring with Q chip (the page's headline item)
//    button  a single "open details" button
//  `more` opens the details popup. It points at existing data in
//  data.js so nothing is cut: { job }, { lab }, { project }, { paper },
//  { cert }, { story }, { skill }, { hero }, { doc }, { cap }, { ast },
//  { home }, { timeline: 'all' }, { teams: true }, { pillars: true }.
//  Every line traces to HamzaAkat_Resume or existing data.js copy.
// ============================================================

export const HERO_INFO = {
  home: {
    title: "Hamza", role: "damage",
    tagline: "M.S. Computer Engineering student at George Mason. Embedded firmware, digital design, and hardware-software co-design.",
    action: "resume",
    cols: [
      [
        { h: "Profile", style: "stats", portrait: "house", stats: [
          { icon: "graduate-cap", value: "M.S. 2028", label: "Expected M.S. graduation" },
          { icon: "test-tubes", value: "3 labs", label: "Research labs" },
          { icon: "briefcase", value: "7 orgs", label: "Organizations" },
          { icon: "conversation", value: "4", label: "Spoken languages" }
        ] },
        { style: "weapon", items: [
          { icon: "person", name: "Who I am", desc: "B.S. in Computer and Electrical Engineering from Saint Louis University, now on the M.S. in Computer Engineering at George Mason.", facts: ["Concentration: CAES/DSYS", "Open to: internships and co-ops"], more: { home: "bio" } }
        ] },
        { h: "Ultimate", style: "ult", items: [
          { icon: "gears", name: "Hardware-software co-design", desc: "The full path from register and sensor up to inference and interface, across three research labs and five industry programs." }
        ] }
      ],
      [
        { h: "Core kit", style: "tile", items: [
          { icon: "microchip", key: "LMB", name: "Embedded firmware", desc: "Bare-metal and FreeRTOS in C and C++20.", facts: ["Chips: ESP32-S3, ATmega32A, ATmega328P, Cortex-A, Cortex-M4"], more: { skill: "EMBEDDED FIRMWARE AND LOW-LEVEL SOFTWARE" } },
          { icon: "circuitry", key: "RMB", name: "Digital design", desc: "FSM-based RTL in VHDL, synthesized on a Basys 3 Artix-7.", facts: ["Tools: Vivado"], more: { skill: "COMPUTER ARCHITECTURE, FPGA / RTL AND HARDWARE INTERFACES" } },
          { icon: "sinusoidal-beam", key: "LSHIFT", name: "Hardware bring-up", desc: "JTAG, oscilloscope, logic analyzer, and serial protocol analysis.", more: { skill: "VALIDATION, VERIFICATION AND DEBUG" } },
          { icon: "brain", key: "E", name: "Edge AI", desc: "PyTorch, GANs, FFT, and mmWave radar processing.", more: { skill: "EDGE AI AND SIGNAL PROCESSING" } }
        ] }
      ],
      [
        { h: "Quick facts", style: "circle", items: [
          { icon: "position-marker", name: "Based in", desc: "Fairfax, Virginia." },
          { icon: "rss", name: "Open to", desc: "Internships and co-ops in embedded, firmware, RTL, and validation." },
          { icon: "graduate-cap", name: "Program", desc: "M.S. Computer Engineering, George Mason, 2026 to 2028." }
        ] },
        { h: "Headliners", style: "circle", items: [
          { icon: "trophy-cup", name: "SLU Launch Inventor Award", desc: "$2,500 in 2026 for the QBC redesign.", more: { lab: "biomech" } },
          { icon: "open-book", name: "IEEE INFOCOM 2027", desc: "GUARD manuscript under review.", more: { paper: "GUARD: GAN-Based Driver Authentication via mmWave Radar" } },
          { icon: "scroll-quill", name: "USPTO Patent Bar", desc: "Exam in progress." }
        ] }
      ]
    ]
  },

  labs: {
    title: "Labs", role: "support",
    tagline: "Three research labs at Saint Louis University, Fall 2025 to Spring 2026.",
    cols: [
      [
        { h: "Overview", style: "stats", portrait: "test-tubes", stats: [
          { icon: "test-tubes", value: "3 labs", label: "Labs" },
          { icon: "hospital-cross", value: "3+ sites", label: "Clinical deployment sites" },
          { icon: "open-book", value: "INFOCOM 2027", label: "Manuscript under review" }
        ] },
        { style: "weapon", items: [
          { icon: "processor", name: "What the labs cover", desc: "Clinical wearable firmware, mmWave radar authentication, and medical device modernization." }
        ] },
        { h: "Ultimate", style: "ult", items: [
          { icon: "magnifying-glass", name: "D8749H firmware recovery", desc: "Recreated the MCS-48 verify sequence from datasheet timing diagrams on an Arduino Mega and read the firmware out byte by byte.", more: { lab: "biomech" } }
        ] }
      ],
      [
        { h: "The labs", style: "tile", items: [
          { icon: "hospital-cross", key: "LMB", name: "CHROME Lab", desc: "Built PT KIDS, a tool that flashes clinical wearables over Bluetooth serial.", facts: ["Stack: Python, Tkinter, AVRdude, PyInstaller", "Deployed: 3+ clinical sites"], more: { lab: "chrome" } },
          { icon: "radar-sweep", key: "RMB", name: "WNIS Lab", desc: "Co-developed GUARD, radar-based driver authentication on the TI IWR6843.", facts: ["Dataset: 5 drivers, 25 sessions", "Result: 100% unauthorized-driver detection"], more: { lab: "wnis" } },
          { icon: "pulse", key: "LSHIFT", name: "Musculoskeletal Biomechanics Lab", desc: "Modernized the legacy QBC hematology analyzer on a new platform.", facts: ["Cost: about $10k down to under $300", "Award: SLU Launch prize"], more: { lab: "biomech" } }
        ] }
      ],
      [
        { h: "Proof", style: "circle", items: [
          { icon: "usb-key", name: "Clinical wearable OTA tool", desc: "Non-engineering staff run firmware updates on their own.", more: { lab: "chrome" } },
          { icon: "plug", name: "Bluetooth serial pipeline", desc: "Auto COM detection, configurable baud, and live validation.", more: { lab: "chrome" } },
          { icon: "brain", name: "GAN behavioral registration", desc: "Paired with a real-time trust-pool scoring module.", more: { lab: "wnis" } },
          { icon: "treasure-map", name: "Memory map rebuild", desc: "Reconstructed the analyzer's memory map and I/O architecture.", more: { lab: "biomech" } }
        ] }
      ]
    ]
  },

  experience: {
    title: "Experience", role: "tank",
    tagline: "Seven organizations across Qatar, Spain, the United States, and remote.",
    cols: [
      [
        { h: "Latest", style: "stats", portrait: "briefcase", stats: [
          { icon: "briefcase", value: "7 orgs", label: "Organizations" },
          { icon: "globe", value: "3 countries", label: "Qatar, Spain, United States" },
          { icon: "calendar", value: "Summer 2026", label: "Most recent role" }
        ] },
        { style: "weapon", items: [
          { icon: "bank", name: "Power International Holding", desc: "Data and AI Intern, Doha, Summer 2026.", facts: ["ETL pipeline for Epic clinical-system events", "LLM-based incident-triage assistant"], more: { job: "POWER INTERNATIONAL HOLDING" } }
        ] },
        { h: "Ultimate", style: "ult", items: [
          { icon: "radar-sweep", name: "Predictive outage monitoring", desc: "Flagged systems at risk of outage before users reported incidents, surfaced on an IT operations dashboard.", more: { job: "POWER INTERNATIONAL HOLDING" } }
        ] }
      ],
      [
        { h: "Roles", style: "tile", items: [
          { icon: "coins", key: "LMB", name: "Doha Bank", desc: "Data Engineering Intern, Summer 2025.", facts: ["SQL data validation workflows", "Rotation: data engineering, DBA, Linux"], more: { job: "DOHA BANK" } },
          { icon: "keyboard", key: "RMB", name: "Corsair", desc: "Firmware Engineering Externship, Spring 2023.", facts: ["C++ peripheral firmware on ARM Cortex-A", "I2C and SPI macro-execution logic"], more: { job: "CORSAIR" } },
          { icon: "atom", key: "LSHIFT", name: "MIT.nano", desc: "Cleanroom Volunteer, Winter 2024 to 2025.", more: { job: "MIT.NANO" } }
        ] }
      ],
      [
        { h: "Programs", style: "circle", items: [
          { icon: "brain", name: "Samsung Innovation Campus", desc: "240-hour AI and ML program, Winter 2023.", more: { job: "SAMSUNG GULF ELECTRONICS" } },
          { icon: "medicines", name: "GlaxoSmithKline", desc: "Technology Research Shadow, Madrid, Fall 2022.", more: { job: "GLAXOSMITHKLINE (GSK)" } },
          { icon: "cargo-crate", name: "Qatar Int'l Trading and Contracting", desc: "Administration and Logistics Intern, 2017 to 2019.", more: { job: "QATAR INT'L TRADING & CONTRACTING CO." } }
        ] }
      ]
    ]
  },

  capstone: {
    title: "TremorMonitor", role: "support",
    tagline: "Parkinson's tremor sleeve and phone app. Senior design, sold to a research lab.",
    action: { label: "Open repo", url: "https://github.com/PreLabHomework/TremorMonitor" },
    cols: [
      [
        { h: "Hero & weapon", style: "stats", portrait: "hand", difficulty: 3, stats: [
          { icon: "shaking-hands", value: "4", label: "Team size" },
          { icon: "radio-tower", value: "5 B", label: "BLE packet size" },
          { icon: "podium-winner", value: "Sold", label: "Status" }
        ] },
        { style: "weapon", items: [
          { icon: "cpu", key: "LMB", name: "ESP32-S3 firmware", desc: "Real-time C++ on the Xtensa LX7 with FreeRTOS multi-task scheduling.", facts: ["Path: sense, detect, stream, log, report"], more: { cap: "architecture" } }
        ] },
        { h: "Ultimate", style: "ult", items: [
          { icon: "sound-waves", name: "FFT tremor detection", desc: "Frequency-domain detection on the device, streamed to the app for logging and clinical export.", more: { cap: "clinical" } }
        ] }
      ],
      [
        { h: "System", style: "tile", items: [
          { icon: "pulse", key: "RMB", name: "Interrupt-driven IMU acquisition", desc: "Sensor sampling runs on interrupts with DMA-assisted reads.", more: { cap: "architecture" } },
          { icon: "radio-tower", key: "LSHIFT", name: "Custom BLE GATT service", desc: "Streams tremor data from the sleeve to the phone.", shipped: "5-byte packet encoding for low-latency streaming.", more: { cap: "architecture" } },
          { icon: "auto-repair", key: "E", name: "Closed-loop actuator feedback", desc: "Drives the actuator from live tremor readings.", more: { cap: "architecture" } },
          { icon: "vibrating-smartphone", key: "F", name: "React Native app", desc: "Live monitor, SQLite session logging, frequency charts, and CSV export.", more: { cap: "app" } }
        ] }
      ],
      [
        { h: "Debug log", style: "circle", items: [
          { icon: "beetle-shell", name: "UUID byte order", desc: "Found and fixed a UUID byte-order bug in the BLE layer." },
          { icon: "wrench", name: "Write path rewrite", desc: "Rewrote the BLE write path and added clean disconnect handling." }
        ] },
        { h: "Outcomes", style: "circle", items: [
          { icon: "shaking-hands", name: "Sold to a research lab", desc: "The finished system went to a research lab after development." },
          { icon: "podium-winner", name: "Symposium demo", desc: "Demoed live at the SLU senior design symposium in April 2026." },
          { icon: "circuitry", name: "Sole software developer", desc: "Owned the firmware, the BLE layer, and the app on a four-person team." }
        ] }
      ]
    ]
  },

  projects: {
    title: "Projects", role: "damage",
    tagline: "Eleven builds across embedded C++, FPGA, analog, data, AI, and web.",
    action: { label: "View Firmcore", url: "https://github.com/prelabhomework/Firmcore" },
    cols: [
      [
        { h: "Featured", style: "stats", portrait: "hammer-nails", stats: [
          { icon: "bug-net", value: "21M", label: "Fuzz executions" },
          { icon: "microchip", value: "1.9 KB flash", label: "Flash footprint" },
          { icon: "stack", value: "900 B RAM", label: "RAM footprint" }
        ] },
        { style: "weapon", items: [
          { icon: "microchip", key: "LMB", name: "Firmcore", desc: "Header-only C++20 firmware library, zero-heap and exception-free, for ARM Cortex-M4.", facts: ["Lock-free SPSC ring buffer, COBS framing", "Q-format fixed-point, heap-free memory pool"], more: { project: "Firmcore Embedded C++20 Library" } },
          { icon: "circuitry", key: "RMB", name: "UART transmitter on FPGA", desc: "FSM-based VHDL on a Basys 3 Artix-7.", facts: ["9600 baud from a 100 MHz clock, 10-bit frames"], more: { project: "UART Transmitter on FPGA" } }
        ] },
        { h: "Ultimate", style: "ult", items: [
          { icon: "bug-net", name: "21-million-execution fuzz campaign", desc: "libFuzzer against Firmcore's wire-facing parsers, zero findings.", shipped: "Telemetry pipeline in 1.9 KB flash and 900 B RAM.", more: { project: "Firmcore Embedded C++20 Library" } }
        ] }
      ],
      [
        { h: "Hardware", style: "tile", items: [
          { icon: "processor", key: "LSHIFT", name: "AVR peripheral control system", desc: "Three external ISRs in AVR assembly with full SREG and stack preservation, debugged over JTAG.", more: { project: "AVR Peripheral Control System" } },
          { icon: "cpu", key: "E", name: "AVR embedded control system", desc: "Register-level ATmega32 firmware with timers, keypad input, ADC, PWM, and servo control.", more: { project: "AVR Embedded Control System" } },
          { icon: "electrical-resistance", key: "F", name: "2N7000 MOSFET amplifier", desc: "High-gain two-stage common-source design on a single 12 V supply.", more: { project: "High-Gain 2N7000 Two-Stage MOSFET Amplifier" } },
          { icon: "wifi-router", key: "V", name: "WiFi coverage analyzer", desc: "194K+ measurements across 952 locations, delivered to SLU IT.", more: { project: "WiFi Coverage & Handover Analyzer" } }
        ] }
      ],
      [
        { h: "Software and AI", style: "circle", items: [
          { icon: "conversation", name: "Arabic-to-MSA subtitles", desc: "Whisper plus LLM normalization.", more: { project: "Arabic Dialect-to-MSA Subtitle Pipeline" } },
          { icon: "brain", name: "Natural language to code", desc: "NLP translator, 2022 to 2023.", more: { project: "Natural Language to Code Translator" } },
          { icon: "airplane", name: "Waylo", desc: "Mobile app, 2026.", more: { project: "Waylo" } },
          { icon: "globe", name: "SLU research lab websites", desc: "Sites for biomedical and engineering labs.", more: { project: "SLU Research Lab Websites" } },
          { icon: "eye-target", name: "Smart forensic glasses", desc: "Research paper and bench prototype.", more: { project: "Smart Forensic Glasses" } }
        ] }
      ]
    ]
  },

  research: {
    title: "Research", role: "tank",
    tagline: "Radar authentication, clinical hardware, and wearable haptics.",
    cols: [
      [
        { h: "GUARD", style: "stats", portrait: "radar-sweep", difficulty: 3, stats: [
          { icon: "steering-wheel", value: "5 drivers", label: "Drivers" },
          { icon: "calendar", value: "25 sessions", label: "Sessions" },
          { icon: "stopwatch", value: "20 fps", label: "Radar frame rate" }
        ] },
        { style: "weapon", items: [
          { icon: "radar-sweep", key: "LMB", name: "mmWave point-cloud pipeline", desc: "TI IWR6843 radar: raw ingestion, spherical-grid preprocessing, temporal feature extraction.", facts: ["Two stages: GAN registration, trust-pool scoring"], more: { lab: "wnis" } }
        ] },
        { h: "Ultimate", style: "ult", items: [
          { icon: "car-key", name: "100% unauthorized-driver detection", desc: "GUARD's result. Manuscript under review at IEEE INFOCOM 2027.", more: { paper: "GUARD: GAN-Based Driver Authentication via mmWave Radar" } }
        ] }
      ],
      [
        { h: "Papers", style: "tile", items: [
          { icon: "car-key", key: "LMB", name: "GUARD", desc: "GAN-based driver authentication via mmWave radar.", facts: ["Status: under review, IEEE INFOCOM 2027"], more: { paper: "GUARD: GAN-Based Driver Authentication via mmWave Radar" } },
          { icon: "pulse", key: "RMB", name: "QBC diagnostic modernization", desc: "Musculoskeletal Biomechanics Lab.", facts: ["Status: active"], more: { paper: "QBC Hematology Diagnostic Modernization" } },
          { icon: "hand", key: "LSHIFT", name: "Haptic wearables", desc: "DeafBlind communication, CHROME Lab.", facts: ["Status: submitted"], more: { paper: "Haptic Wearables for DeafBlind Communication" } },
          { icon: "eye-target", key: "E", name: "Computer forensic analysis", desc: "Smart forensic glasses, TheStemSpectrum.org.", facts: ["Status: published, 2025"], more: { paper: "Advancements in Computer Forensic Analysis" } }
        ] }
      ],
      [
        { h: "Continuing ed", style: "circle", items: [
          { icon: "graduate-cap", name: "MIT AI and CS Seminars", desc: "2025.", more: { cert: "MIT AI & Computer Science Seminars" } },
          { icon: "coins", name: "MIT Sloan", desc: "AI implications for business strategy, 2024.", more: { cert: "MIT Sloan: AI Implications for Business Strategy" } },
          { icon: "robot-golem", name: "Carnegie Mellon Qatar", desc: "MindCraft robotics and AI, 2021.", more: { cert: "Carnegie Mellon Qatar: MindCraft Robotics & AI" } },
          { icon: "shield", name: "Janets", desc: "Cyber security and virus protection, 2023.", more: { cert: "Janets: Cyber Security & Virus Protection" } },
          { icon: "hammer-nails", name: "Mark Rober", desc: "Creative engineering, 2022.", more: { cert: "Mark Rober: Creative Engineering" } }
        ] }
      ]
    ]
  },

  skills: {
    title: "Loadout", role: "tank",
    tagline: "What I build with, grouped the way my resume is.",
    cols: [
      [
        { h: "Primary", style: "stats", portrait: "toolbox", stats: [
          { icon: "processor", value: "7 platforms", label: "Hardware platforms" },
          { icon: "conversation", value: "4 languages", label: "Spoken languages" }
        ] },
        { style: "weapon", items: [
          { icon: "microchip", key: "LMB", name: "C and C++20", desc: "Bare-metal and FreeRTOS firmware.", facts: ["Also: AVR assembly, Python"] },
          { icon: "circuitry", key: "RMB", name: "VHDL", desc: "RTL on Artix-7 in Vivado." }
        ] },
        { h: "Ultimate", style: "ult", items: [
          { icon: "gears", name: "Computer architecture", desc: "Current M.S. coursework: Computer Architecture, Digital System Design (VHDL), and ML for Embedded Systems." }
        ] }
      ],
      [
        { h: "Categories", style: "tile", items: [
          { icon: "circuitry", name: "Architecture, FPGA and interfaces", desc: "RTL, GPU architecture, Artix-7, I2C, SPI, UART, BLE GATT, mmWave radar.", more: { skill: "COMPUTER ARCHITECTURE, FPGA / RTL AND HARDWARE INTERFACES" } },
          { icon: "microchip", name: "Embedded firmware", desc: "FreeRTOS, BSP/HAL, drivers, interrupts, DMA, OTA, lock-free design.", more: { skill: "EMBEDDED FIRMWARE AND LOW-LEVEL SOFTWARE" } },
          { icon: "magnifying-glass", name: "Validation and debug", desc: "JTAG, scope, logic analyzer, bring-up, libFuzzer, sanitizers.", more: { skill: "VALIDATION, VERIFICATION AND DEBUG" } },
          { icon: "toolbox", name: "Systems and tools", desc: "Linux, Bash, Git, GitHub Actions, Vivado, CMake, PowerShell.", more: { skill: "PERFORMANCE, SYSTEMS AND TOOLS" } },
          { icon: "brain", name: "Edge AI and DSP", desc: "PyTorch, GANs, edge inference, FFT, fixed-point arithmetic.", more: { skill: "EDGE AI AND SIGNAL PROCESSING" } },
          { icon: "stack", name: "Software and data", desc: "MATLAB, SQL, R Shiny, JavaScript, GDScript.", more: { skill: "SOFTWARE AND DATA" } }
        ] }
      ],
      [
        { h: "Spoken", style: "circle", items: [
          { icon: "conversation", name: "English", desc: "Native." },
          { icon: "conversation", name: "Arabic", desc: "Native." },
          { icon: "conversation", name: "Spanish", desc: "Native." },
          { icon: "conversation", name: "Italian", desc: "A1." }
        ] }
      ]
    ]
  },

  timeline: {
    title: "Timeline", role: "support",
    tagline: "2018 to 2028 across Jordan, Qatar, Spain, and the United States.",
    cols: [
      [
        { h: "Now", style: "stats", portrait: "hourglass", stats: [
          { icon: "calendar", value: "2018 to 2028", label: "Span" },
          { icon: "globe", value: "4 countries", label: "Countries" },
          { icon: "position-marker", value: "5 cities", label: "Cities" }
        ] },
        { style: "weapon", items: [
          { icon: "graduate-cap", key: "LMB", name: "George Mason University", desc: "M.S. Computer Engineering, Aug 2026 to May 2028." },
          { icon: "graduate-cap", key: "RMB", name: "Saint Louis University", desc: "B.S. Computer and Electrical Engineering, May 2026. St. Louis and Madrid campuses." }
        ] },
        { h: "Ultimate", style: "ult", items: [
          { icon: "trophy-cup", name: "SLU Launch Inventor Award", desc: "$2,500 in April 2026 for the QBC redesign.", more: { lab: "biomech" } }
        ] }
      ],
      [
        { h: "2025 to 2026", style: "tile", items: [
          { icon: "airplane", key: "LMB", name: "Power International", desc: "Data and AI Intern in Doha, Summer 2026.", more: { job: "POWER INTERNATIONAL HOLDING" } },
          { icon: "radar-sweep", key: "RMB", name: "GUARD submitted", desc: "Manuscript under review at IEEE INFOCOM 2027.", more: { paper: "GUARD: GAN-Based Driver Authentication via mmWave Radar" } },
          { icon: "hand", key: "LSHIFT", name: "TremorMonitor shipped", desc: "Sold to a research lab, symposium demo in April 2026.", more: { cap: "app" } },
          { icon: "coins", key: "E", name: "Doha Bank", desc: "Data Engineering Intern, Summer 2025.", more: { job: "DOHA BANK" } }
        ] }
      ],
      [
        { h: "Earlier", style: "circle", items: [
          { icon: "atom", name: "MIT.nano", desc: "Cleanroom volunteer, Winter 2024 to 2025.", more: { job: "MIT.NANO" } },
          { icon: "keyboard", name: "Corsair", desc: "Firmware externship, Spring 2023.", more: { job: "CORSAIR" } },
          { icon: "brain", name: "Samsung Innovation Campus", desc: "Winter 2023.", more: { job: "SAMSUNG GULF ELECTRONICS" } },
          { icon: "laurels", name: "World Scholar's Cup", desc: "Top 5% team debate, Global Round, 2020.", more: { story: "WORLD SCHOLAR'S CUP" } }
        ] },
        { style: "button", items: [ { name: "Full timeline", more: { timeline: "all" } } ] }
      ]
    ]
  },

  affiliations: {
    title: "Affiliations", role: "support",
    tagline: "Schools, programs, and organizations I've worked with.",
    cols: [
      [
        { h: "Academic", style: "weapon", items: [
          { icon: "graduate-cap", key: "LMB", name: "George Mason University", desc: "M.S. Computer Engineering, CAES/DSYS concentration, 2026 to 2028.", facts: ["Coursework: Computer Architecture, Digital System Design, ML for Embedded Systems"] },
          { icon: "graduate-cap", key: "RMB", name: "Saint Louis University", desc: "B.S. Computer and Electrical Engineering, minors in CS and Math.", facts: ["Labs: CHROME, WNIS, Biomechanics"] }
        ] },
        { h: "Ultimate", style: "ult", items: [
          { icon: "trophy-cup", name: "SLU Launch Inventor Award", desc: "$2,500 in 2026.", more: { lab: "biomech" } }
        ] }
      ],
      [
        { h: "Programs", style: "tile", items: [
          { icon: "atom", key: "LSHIFT", name: "MIT", desc: "MIT.nano lab, MIT AI and CS Seminars, MIT Sloan AI strategy.", more: { job: "MIT.NANO" } },
          { icon: "robot-golem", key: "E", name: "Carnegie Mellon", desc: "CMU Qatar MindCraft robotics and AI.", more: { cert: "Carnegie Mellon Qatar: MindCraft Robotics & AI" } },
          { icon: "brain", key: "F", name: "Samsung", desc: "Samsung Innovation Campus AI and ML program.", more: { job: "SAMSUNG GULF ELECTRONICS" } },
          { icon: "id-card", key: "V", name: "IEEE", desc: "Student member." }
        ] }
      ],
      [
        { h: "Organizations", style: "circle", items: [
          { icon: "keyboard", name: "Corsair", desc: "Firmware externship.", more: { job: "CORSAIR" } },
          { icon: "medicines", name: "GSK", desc: "Technology research shadow.", more: { job: "GLAXOSMITHKLINE (GSK)" } },
          { icon: "coins", name: "Doha Bank", desc: "Data engineering internship.", more: { job: "DOHA BANK" } },
          { icon: "hospital-cross", name: "Red Cross Red Crescent", desc: "Disaster Action Team member.", more: { story: "RED CROSS · RED CRESCENT" } },
          { icon: "open-book", name: "TheStemSpectrum", desc: "Published author.", more: { paper: "Advancements in Computer Forensic Analysis" } },
          { icon: "family-house", name: "Park House English School", desc: "Sixth Form student council vice president.", more: { story: "STUDENT COUNCIL VP" } }
        ] }
      ]
    ]
  },

  personal: {
    title: "Personal", role: "damage",
    tagline: "Four countries, four languages, and one extremely defended Steam library.",
    cols: [
      [
        { h: "Origins", style: "stats", portrait: "globe", stats: [
          { icon: "globe", value: "4 countries", label: "Countries" },
          { icon: "conversation", value: "4 languages", label: "Languages" },
          { icon: "crosshair", value: "Top 500", label: "Competitive rank" }
        ] },
        { style: "weapon", items: [
          { icon: "world", key: "LMB", name: "Four countries", desc: "Qatar 16 years, Spain 3, Jordan 2, United States 2." },
          { icon: "conversation", key: "RMB", name: "Four languages", desc: "English, Arabic, and Spanish native, Italian A1." }
        ] },
        { h: "Ultimate", style: "ult", items: [
          { icon: "laurels", name: "World Scholar's Cup", desc: "Top 5% team debate at the Global Round, 2020.", more: { story: "WORLD SCHOLAR'S CUP" } }
        ] }
      ],
      [
        { h: "Stories", style: "tile", items: [
          { icon: "tv", key: "LSHIFT", name: "National TV", desc: "On Qatar national television after a national mental math competition.", more: { story: "NATIONAL TV" } },
          { icon: "shield", key: "E", name: "The Bangladesh incident", desc: "Someone tried to take my Steam account. It did not go well for him.", more: { story: "THE BANGLADESH INCIDENT" } },
          { icon: "hospital-cross", key: "F", name: "Red Cross Red Crescent", desc: "Disaster Action Team member and charity drive volunteer.", more: { story: "RED CROSS · RED CRESCENT" } },
          { icon: "podium", key: "V", name: "Student council VP", desc: "Sixth Form student council, Park House English School, 2021.", more: { story: "STUDENT COUNCIL VP" } },
          { icon: "mountain-climbing", key: "G", name: "Duke of Edinburgh", desc: "Bronze Award, 2019.", more: { story: "DUKE OF EDINBURGH" } }
        ] }
      ],
      [
        { h: "Ranked", style: "circle", items: [
          { icon: "crosshair", name: "Overwatch", desc: "Top 500." },
          { icon: "crosshair", name: "Call of Duty", desc: "Top 500." },
          { icon: "crosshair", name: "Valorant", desc: "Ascendant." },
          { icon: "crosshair", name: "Rainbow Six", desc: "Diamond." },
          { icon: "crosshair", name: "CS:GO", desc: "Legendary Eagle." },
          { icon: "crosshair", name: "Marvel Rivals", desc: "Celestial." }
        ] },
        { style: "button", items: [ { name: "Favorite teams", more: { teams: true } } ] }
      ]
    ]
  },

  astakeria: {
    title: "Astakeria", role: "damage",
    tagline: "The game that watches you back. A first-person action RPG in Godot 4.",
    cols: [
      [
        { h: "The game", style: "weapon", items: [
          { icon: "gamepad", key: "LMB", name: "Echoes of the Overwritten", desc: "Five heroes, one world that keeps score of how you play.", more: { ast: "scope" } }
        ] },
        { h: "Ultimate", style: "ult", items: [
          { icon: "sands-of-time", name: "The Entropy system", desc: "A 0 to 100 behavioral score read from how you play: Dormant, Stirring, Active, Fracturing, Overwritten.", more: { ast: "entropy" } }
        ] },
        { style: "button", items: [ { name: "Design pillars", more: { pillars: true } } ] }
      ],
      [
        { h: "Heroes", style: "tile", items: [
          { icon: "katana", key: "LMB", name: "The Ronin", desc: "Plays fastest under 50 Entropy. Above 80, flashbacks corrupt her perception.", more: { hero: "THE RONIN" } },
          { icon: "fire", key: "RMB", name: "The Heretic", desc: "Her abilities cost health. Fire spells scale with Entropy.", more: { hero: "THE HERETIC" } },
          { icon: "book-cover", key: "LSHIFT", name: "The Archivist", desc: "Can rewind 5 seconds of combat. Each use costs a memory.", more: { hero: "THE ARCHIVIST" } },
          { icon: "shield", key: "E", name: "The Warden", desc: "Protects people who may not deserve it.", more: { hero: "THE WARDEN" } },
          { icon: "echo-ripples", key: "Q", name: "The Echo", desc: "Strongest at exactly 50 Entropy.", more: { hero: "THE ECHO" } }
        ] }
      ],
      [
        { h: "Documents", style: "circle", items: [
          { icon: "scroll-unfurled", name: "Game design document v0.5", more: { doc: 0 } },
          { icon: "scroll-unfurled", name: "Launch scope v1.0", more: { doc: 1 } },
          { icon: "open-book", name: "Developer technical guidebook v1.0", more: { doc: 2 } }
        ] }
      ]
    ]
  },

  contact: {
    title: "Comms", role: "support",
    tagline: "Open to internships and co-ops in embedded, firmware, RTL, and validation.",
    action: "resume",
    cols: [
      [
        { h: "Primary", style: "weapon", items: [
          { icon: "envelope", key: "LMB", name: "Email", desc: "hamzaabukat@gmail.com", href: "mailto:hamzaabukat@gmail.com" },
          { icon: "linked-rings", key: "RMB", name: "LinkedIn", desc: "linkedin.com/in/hakat", href: "https://www.linkedin.com/in/hakat" }
        ] },
        { h: "Ultimate", style: "ult", items: [
          { icon: "rss", name: "Open to internships and co-ops", desc: "Embedded, firmware, RTL, and validation roles." }
        ] }
      ],
      [
        { h: "Channels", style: "tile", items: [
          { icon: "hammer-nails", key: "LSHIFT", name: "GitHub", desc: "github.com/prelabhomework", href: "https://github.com/prelabhomework" },
          { icon: "scroll-unfurled", key: "E", name: "Resume", desc: "Current PDF.", href: "resume" },
          { icon: "phone", key: "F", name: "Phone", desc: "+1 571-663-7706", href: "tel:+15716637706" }
        ] }
      ],
      [
        { h: "Location", style: "circle", items: [
          { icon: "position-marker", name: "Fairfax, Virginia", desc: "George Mason University." }
        ] },
        { h: "Also", style: "circle", items: [
          { icon: "id-card", name: "Pro Mode", desc: "The recruiter-friendly resume view.", href: "cv.html" },
          { icon: "hammer-nails", name: "Site source", desc: "github.com/PreLabHomework/Portfolio", href: "https://github.com/PreLabHomework/Portfolio" }
        ] }
      ]
    ]
  },

  soon: {
    title: "???", role: "damage",
    tagline: "Transmission incoming. Something is being built in this slot.",
    cols: [
      [
        { h: "Signal", style: "stats", portrait: "padlock", stats: [
          { icon: "padlock", value: "Locked", label: "Status" },
          { icon: "hourglass", value: "ETA TBD", label: "Estimated arrival" },
          { icon: "radio-tower", value: "Weak", label: "Signal" }
        ] },
        { style: "weapon", items: [
          { icon: "locked-chest", key: "LMB", name: "Classified", desc: "A reserved slot for the next build. The roster is designed to grow without breaking." }
        ] },
        { h: "Ultimate", style: "ult", items: [ { icon: "padlock", name: "Redacted", desc: "Check back." } ] }
      ],
      [
        { h: "Abilities", style: "tile", items: [
          { icon: "padlock", key: "RMB", name: "???", desc: "Redacted." },
          { icon: "padlock", key: "LSHIFT", name: "???", desc: "Redacted." },
          { icon: "padlock", key: "E", name: "???", desc: "Redacted." }
        ] }
      ],
      [
        { h: "Perks", style: "circle", items: [
          { icon: "cctv-camera", name: "Under watch", desc: "If you can read this, the transmission has not fully come through yet." }
        ] }
      ]
    ]
  }
};
