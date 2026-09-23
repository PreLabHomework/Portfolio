// ============================================================
//  HERO INFO CONTENT (v11 "Doctrine")
//  One Overwatch Hero Info screen per roster hero.
//  Every line traces to HamzaAkat_Resume or existing data.js copy.
//  Icons are game-icons.net names (CC BY 3.0), built into js/icons.js.
//  A slot with no real content is left out, never padded.
// ============================================================

export const HERO_INFO = {
  home: {
    title: "Hamza", role: "damage", portrait: "house",
    stats: [
      { icon: "graduate-cap", value: "M.S. 2028", label: "Expected M.S. graduation" },
      { icon: "test-tubes", value: "3", label: "Research labs" },
      { icon: "conversation", value: "4", label: "Spoken languages" }
    ],
    weapon: { icon: "microchip", key: "LMB", name: "Embedded firmware in C and C++20", desc: "Bare-metal and FreeRTOS across ESP32-S3, ATmega32A, ATmega328P, ARM Cortex-A, and Cortex-M4." },
    abilities: [
      { icon: "circuitry", key: "RMB", name: "Digital design in VHDL", desc: "FSM-based RTL synthesized and validated on a Basys 3 Artix-7." },
      { icon: "sinusoidal-beam", key: "LSHIFT", name: "Hardware bring-up", desc: "JTAG, oscilloscope, logic analyzer, and serial protocol analysis." },
      { icon: "brain", key: "E", name: "Edge AI and signal processing", desc: "PyTorch, GANs, FFT, and mmWave radar processing." }
    ],
    ultimate: { icon: "gears", name: "Hardware-software co-design", desc: "The full path from register and sensor up to inference and interface, across three research labs and five industry programs." },
    passive: { icon: "graduate-cap", name: "Subrole: M.S. student", desc: "Computer Engineering at George Mason, CAES/DSYS concentration, expected May 2028. Open to internships and co-ops." },
    perks: {
      minor: { label: "In progress", items: [
        { icon: "scroll-quill", name: "USPTO Patent Bar", desc: "Studying for the exam." },
        { icon: "id-card", name: "IEEE student member", desc: "Active membership." }
      ] },
      major: { label: "Headliners", items: [
        { icon: "trophy-cup", name: "SLU Launch Inventor Award", desc: "$2,500 in 2026." },
        { icon: "open-book", name: "INFOCOM 2027", desc: "GUARD manuscript under review." }
      ] }
    },
    action: "resume"
  },

  labs: {
    title: "Labs", role: "support", portrait: "test-tubes",
    stats: [
      { icon: "test-tubes", value: "3", label: "Labs" },
      { icon: "hospital-cross", value: "3+ sites", label: "Clinical deployment sites" },
      { icon: "calendar", value: "2025 to 2026", label: "Fall 2025 to Spring 2026" }
    ],
    weapon: { icon: "usb-key", key: "LMB", name: "PT KIDS deployment tool", desc: "Python and Tkinter tool that flashes ATmega328P and RN4870 wearables over Bluetooth serial with AVRdude.", shipped: "PyInstaller build running across 3+ clinical sites." },
    abilities: [
      { icon: "plug", key: "RMB", name: "Serial device management", desc: "Auto COM port detection, configurable baud rates, and live validation, so clinical staff update firmware on their own." },
      { icon: "processor", key: "LSHIFT", name: "QBC replacement system", desc: "ESP32 platform with a Nextion touchscreen, ULN2003 motor driver, 465nm LEDs, photodiode acquisition, and a buck converter stage." },
      { icon: "pulse", key: "E", name: "Scope validation", desc: "Electrical signals checked against the legacy analyzer's diagnostic specs on the oscilloscope." }
    ],
    ultimate: { icon: "magnifying-glass", name: "D8749H EPROM reconstruction", desc: "Recreated the MCS-48 verify sequence from datasheet timing diagrams on an Arduino Mega and read the firmware out byte by byte." },
    passive: { icon: "test-tubes", name: "Subrole: research assistant", desc: "CHROME Lab, Musculoskeletal Biomechanics Lab, and WNIS Lab at Saint Louis University." },
    perks: {
      minor: { label: "Debugging", items: [
        { icon: "beetle-shell", name: "Failure isolation", desc: "Serial logs, device-response analysis, and repeatable test cases." },
        { icon: "treasure-map", name: "Memory map rebuild", desc: "Reconstructed the analyzer's memory map and I/O architecture." }
      ] },
      major: { label: "Outcomes", items: [
        { icon: "shaking-hands", name: "Staff-run updates", desc: "Non-engineering clinical staff now run firmware updates independently." },
        { icon: "trophy-cup", name: "Launch Inventor Award", desc: "QBC won the SLU Launch Inventor Award." }
      ] }
    }
  },

  experience: {
    title: "Experience", role: "tank", portrait: "briefcase",
    stats: [
      { icon: "briefcase", value: "7", label: "Organizations" },
      { icon: "calendar", value: "Summer 2026", label: "Most recent role" }
    ],
    weapon: { icon: "bank", key: "LMB", name: "Power International Holding", desc: "Data and AI Intern, Summer 2026. ETL pipeline for Epic clinical-system events and operational data." },
    abilities: [
      { icon: "conversation", key: "RMB", name: "Incident-triage assistant", desc: "LLM-based tool that retrieves similar past tickets and docs and summarizes likely causes." },
      { icon: "coins", key: "LSHIFT", name: "Doha Bank", desc: "Data Engineering Intern, Summer 2025. SQL validation workflows across data engineering, database administration, and Linux." },
      { icon: "keyboard", key: "E", name: "Corsair", desc: "Firmware externship, Spring 2023. C++ peripheral firmware on ARM Cortex-A with I2C and SPI macro logic." }
    ],
    ultimate: { icon: "radar-sweep", name: "Predictive outage monitoring", desc: "Flagged systems at risk of outage before users reported incidents, surfaced on an IT operations dashboard." },
    passive: { icon: "globe", name: "Subrole: intern", desc: "Industry work across Qatar, Spain, and remote." },
    perks: {
      minor: { label: "Earlier", items: [
        { icon: "cargo-crate", name: "QITCC", desc: "Administration and logistics intern." },
        { icon: "medicines", name: "GSK", desc: "Technology research shadow, Madrid, 2022." }
      ] },
      major: { label: "Programs", items: [
        { icon: "brain", name: "Samsung Innovation Campus", desc: "240-hour AI and ML program." },
        { icon: "atom", name: "MIT.nano", desc: "Cleanroom volunteer." }
      ] }
    }
  },

  capstone: {
    title: "TremorMonitor", role: "support", portrait: "hand",
    difficulty: 3,
    stats: [
      { icon: "shaking-hands", value: "4", label: "Team size" },
      { icon: "radio-tower", value: "5 B", label: "BLE packet size" },
      { icon: "podium-winner", value: "Sold", label: "Status" }
    ],
    weapon: { icon: "cpu", key: "LMB", name: "ESP32-S3 firmware", desc: "Real-time C++ on the Xtensa LX7 with FreeRTOS multi-task scheduling." },
    abilities: [
      { icon: "pulse", key: "RMB", name: "Interrupt-driven IMU acquisition", desc: "Sensor sampling runs on interrupts with DMA-assisted reads." },
      { icon: "radio-tower", key: "LSHIFT", name: "Custom BLE GATT service", desc: "Streams tremor data from the sleeve to the phone.", shipped: "5-byte packet encoding for low-latency streaming." },
      { icon: "auto-repair", key: "E", name: "Closed-loop actuator feedback", desc: "Drives the actuator from live tremor readings." }
    ],
    ultimate: { icon: "sound-waves", name: "FFT tremor detection", desc: "Frequency-domain tremor detection running on the device, with the full data path from sensor to BLE to SQLite to Firebase." },
    passive: { icon: "circuitry", name: "Subrole: sole software developer", desc: "Owned the firmware, the BLE layer, and the React Native app on a four-person senior design team." },
    perks: {
      minor: { label: "Found while debugging", items: [
        { icon: "beetle-shell", name: "UUID byte order", desc: "Found and fixed a UUID byte-order bug in the BLE layer." },
        { icon: "wrench", name: "Write path rewrite", desc: "Rewrote the BLE write path and added clean disconnect handling." }
      ] },
      major: { label: "Shipped", items: [
        { icon: "shaking-hands", name: "Sold to a research lab", desc: "The finished system went to a research lab after development." },
        { icon: "podium-winner", name: "Symposium demo", desc: "Demoed live at the SLU senior design symposium in April 2026." }
      ] }
    },
    action: { label: "Open repo", url: "https://github.com/PreLabHomework/TremorMonitor" }
  },

  projects: {
    title: "Projects", role: "damage", portrait: "hammer-nails",
    difficulty: 3,
    stats: [
      { icon: "bug-net", value: "21M", label: "Fuzz executions" },
      { icon: "microchip", value: "1.9 KB", label: "Flash footprint" },
      { icon: "stack", value: "900 B", label: "RAM footprint" }
    ],
    weapon: { icon: "microchip", key: "LMB", name: "Firmcore", desc: "Header-only C++20 firmware library, zero-heap and exception-free, targeting ARM Cortex-M4." },
    abilities: [
      { icon: "cycle", key: "RMB", name: "Lock-free SPSC ring buffer", desc: "Plus COBS packet framing, Q-format fixed-point, and a heap-free memory pool." },
      { icon: "circuitry", key: "LSHIFT", name: "FSM UART in VHDL", desc: "9600 baud from a 100 MHz clock, 10-bit frames, validated through an RS-232 transceiver on a Basys 3." },
      { icon: "processor", key: "E", name: "AVR interrupt system", desc: "Three external ISRs in AVR assembly on an ATmega32A with full SREG and stack preservation, debugged over JTAG." }
    ],
    ultimate: { icon: "bug-net", name: "21-million-execution fuzz campaign", desc: "libFuzzer against the wire-facing parsers, zero findings.", shipped: "A full sensor telemetry pipeline in 1.9 KB flash and 900 B RAM." },
    passive: { icon: "hammer-nails", name: "Subrole: builder", desc: "Most of it is open source at github.com/prelabhomework." },
    perks: {
      minor: { label: "Side builds", items: [
        { icon: "conversation", name: "Arabic-to-MSA subtitles", desc: "Whisper plus LLM normalization." },
        { icon: "electrical-resistance", name: "2N7000 MOSFET amplifier", desc: "High-gain two-stage design on a single 12 V supply." }
      ] },
      major: { label: "Delivered", items: [
        { icon: "wifi-router", name: "WiFi coverage analyzer", desc: "194K+ measurements across 952 locations, delivered to SLU IT." },
        { icon: "checklist", name: "Published benchmarks", desc: "Cross-compiled code-size numbers for Firmcore." }
      ] }
    },
    action: { label: "View Firmcore", url: "https://github.com/prelabhomework/Firmcore" }
  },

  research: {
    title: "Research", role: "tank", portrait: "radar-sweep",
    difficulty: 3,
    stats: [
      { icon: "steering-wheel", value: "5", label: "Drivers" },
      { icon: "calendar", value: "25", label: "Sessions" },
      { icon: "stopwatch", value: "20 fps", label: "Radar frame rate" }
    ],
    weapon: { icon: "radar-sweep", key: "LMB", name: "mmWave point-cloud pipeline", desc: "TI IWR6843 radar: raw ingestion, spherical-grid preprocessing, temporal feature extraction." },
    abilities: [
      { icon: "checklist", key: "RMB", name: "Validation automation", desc: "End-to-end validation and regression testing across every hardware configuration." },
      { icon: "brain", key: "LSHIFT", name: "GAN behavioral registration", desc: "Learns an authorized driver's behavior from radar data." },
      { icon: "shield-reflect", key: "E", name: "Trust-pool scoring", desc: "Real-time trust scoring, with failure modes isolated between pipeline stages through log analysis." }
    ],
    ultimate: { icon: "car-key", name: "100% unauthorized-driver detection", desc: "GUARD's result. Manuscript under review at IEEE INFOCOM 2027." },
    passive: { icon: "radar-sweep", name: "Subrole: co-developer", desc: "WNIS Lab, Saint Louis University." },
    perks: {
      minor: { label: "Published", items: [
        { icon: "open-book", name: "Advancements in Computer Forensic Analysis", desc: "Smart forensic glasses paper, TheStemSpectrum, 2025." }
      ] },
      major: { label: "Continuing ed", items: [
        { icon: "graduate-cap", name: "MIT AI and CS Seminar Series", desc: "Schwarzman College of Computing, 2025." },
        { icon: "brain", name: "Samsung Innovation Campus", desc: "240-hour AI and ML program." }
      ] }
    }
  },

  skills: {
    title: "Loadout", role: "tank", portrait: "toolbox",
    stats: [
      { icon: "processor", value: "7", label: "Hardware platforms" },
      { icon: "conversation", value: "4", label: "Spoken languages" }
    ],
    weapon: { icon: "microchip", key: "LMB", name: "C and C++20", desc: "Bare-metal and FreeRTOS firmware." },
    abilities: [
      { icon: "circuitry", key: "RMB", name: "VHDL", desc: "RTL on Artix-7 in Vivado." },
      { icon: "snake", key: "LSHIFT", name: "Python", desc: "Tooling, automation, and PyTorch." },
      { icon: "processor", key: "E", name: "AVR assembly", desc: "Register-level interrupts and timers." }
    ],
    ultimate: { icon: "gears", name: "Computer architecture", desc: "M.S. coursework: Computer Architecture, Digital System Design (VHDL), and ML for Embedded Systems." },
    passive: { icon: "magnifying-glass", name: "Subrole: debugger", desc: "JTAG, oscilloscope, logic analyzer, and root-cause analysis." },
    perks: {
      minor: { label: "Interfaces", items: [
        { icon: "plug", name: "Buses", desc: "I2C, SPI, UART, RS-232, and BLE GATT." },
        { icon: "toolbox", name: "Tools", desc: "Linux, Bash, Git, GitHub Actions, CMake, and Vivado." }
      ] },
      major: { label: "Verification", items: [
        { icon: "bug-net", name: "Fuzzing", desc: "libFuzzer and sanitizers." },
        { icon: "checklist", name: "Test discipline", desc: "Structured test plans and regression testing." }
      ] }
    }
  },

  timeline: {
    title: "Timeline", role: "support", portrait: "hourglass",
    stats: [
      { icon: "calendar", value: "2018 to 2028", label: "Span" },
      { icon: "globe", value: "4", label: "Countries" },
      { icon: "position-marker", value: "5", label: "Cities" }
    ],
    weapon: { icon: "graduate-cap", key: "LMB", name: "George Mason University", desc: "M.S. Computer Engineering, Aug 2026 to May 2028." },
    abilities: [
      { icon: "graduate-cap", key: "RMB", name: "Saint Louis University", desc: "B.S. Computer and Electrical Engineering, St. Louis and Madrid, May 2026." },
      { icon: "airplane", key: "LSHIFT", name: "Power International", desc: "Data and AI Intern in Doha, Summer 2026." },
      { icon: "test-tubes", key: "E", name: "The research year", desc: "Three SLU labs, Fall 2025 to Spring 2026." }
    ],
    ultimate: { icon: "trophy-cup", name: "Launch Inventor Award", desc: "Saint Louis University, 2026." },
    passive: { icon: "globe", name: "Subrole: four countries", desc: "Jordan, Qatar, Spain, and the United States." },
    perks: {
      minor: { label: "Early", items: [
        { icon: "laurels", name: "World Scholar's Cup", desc: "Top 5% team debate, Global Round, 2020." },
        { icon: "brain", name: "Samsung program", desc: "Winter 2023." }
      ] },
      major: { label: "2026", items: [
        { icon: "shaking-hands", name: "TremorMonitor sold", desc: "To a research lab." },
        { icon: "open-book", name: "GUARD submitted", desc: "IEEE INFOCOM 2027." }
      ] }
    }
  },

  affiliations: {
    title: "Affiliations", role: "support", portrait: "laurel-crown",
    weapon: { icon: "graduate-cap", key: "LMB", name: "George Mason University", desc: "M.S. Computer Engineering, CAES/DSYS concentration." },
    abilities: [
      { icon: "graduate-cap", key: "RMB", name: "Saint Louis University", desc: "B.S., St. Louis and Madrid campuses." },
      { icon: "id-card", key: "LSHIFT", name: "IEEE", desc: "Student member." },
      { icon: "open-book", key: "E", name: "MIT Schwarzman College of Computing", desc: "AI and CS Seminar Series, 2025." }
    ],
    ultimate: { icon: "trophy-cup", name: "SLU Launch Inventor Award", desc: "$2,500, 2026." },
    passive: { icon: "scroll-quill", name: "USPTO Patent Bar", desc: "In progress." },
    perks: {
      minor: { label: "Industry", items: [
        { icon: "keyboard", name: "Corsair", desc: "Firmware Engineering Externship, Early Talent Program." },
        { icon: "brain", name: "Samsung", desc: "Samsung Innovation Campus." },
        { icon: "medicines", name: "GSK", desc: "Technology Research Shadow." }
      ] },
      major: { label: "Labs", items: [
        { icon: "hospital-cross", name: "CHROME Lab", desc: "Clinical wearable firmware." },
        { icon: "radar-sweep", name: "WNIS Lab", desc: "mmWave radar authentication." },
        { icon: "test-tubes", name: "Musculoskeletal Biomechanics Lab", desc: "QBC hardware modernization." }
      ] }
    }
  },

  personal: {
    title: "Personal", role: "damage", portrait: "globe",
    stats: [
      { icon: "globe", value: "4", label: "Countries" },
      { icon: "conversation", value: "4", label: "Languages" },
      { icon: "crosshair", value: "Top 500", label: "Competitive rank" }
    ],
    weapon: { icon: "conversation", key: "LMB", name: "Four languages", desc: "English, Arabic, and Spanish native, Italian A1." },
    abilities: [
      { icon: "world", key: "RMB", name: "Four countries", desc: "Jordan, Qatar, Spain, and the United States." },
      { icon: "crosshair", key: "LSHIFT", name: "Top 500 in two shooters", desc: "Overwatch and Call of Duty." },
      { icon: "gamepad", key: "E", name: "Game dev", desc: "Building Astakeria in Godot 4." }
    ],
    ultimate: { icon: "laurels", name: "World Scholar's Cup", desc: "Top 5% team debate, Global Round, 2020." },
    passive: { icon: "podium", name: "Subrole: vice president", desc: "High school student council." },
    perks: {
      minor: { label: "Off duty", items: [
        { icon: "shield", name: "The Bangladesh incident", desc: "Someone tried to take my Steam account. I traced the attack and the library remains intact." }
      ] }
    }
  },

  contact: {
    title: "Comms", role: "support", portrait: "envelope",
    weapon: { icon: "envelope", key: "LMB", name: "Email", desc: "hamzaabukat@gmail.com", href: "mailto:hamzaabukat@gmail.com" },
    abilities: [
      { icon: "linked-rings", key: "RMB", name: "LinkedIn", desc: "linkedin.com/in/hakat", href: "https://www.linkedin.com/in/hakat" },
      { icon: "hammer-nails", key: "LSHIFT", name: "GitHub", desc: "github.com/prelabhomework", href: "https://github.com/prelabhomework" },
      { icon: "scroll-unfurled", key: "E", name: "Resume", desc: "PDF, current version.", href: "resume" }
    ],
    ultimate: { icon: "rss", name: "Open to internships and co-ops", desc: "Embedded, firmware, RTL, and validation." },
    passive: { icon: "position-marker", name: "Based in Fairfax, VA", desc: "George Mason University." },
    perks: {
      minor: { label: "Also", items: [
        { icon: "phone", name: "Phone", desc: "+1 571-663-7706" },
        { icon: "hammer-nails", name: "Site source", desc: "github.com/PreLabHomework/Portfolio" }
      ] }
    },
    action: "resume"
  },

  astakeria: {
    title: "Astakeria", role: "damage", portrait: "eyeball",
    weapon: { icon: "gamepad", key: "LMB", name: "Echoes of the Overwritten", desc: "First-person action RPG in Godot 4." },
    abilities: [
      { icon: "katana", key: "RMB", name: "The Ronin", desc: "Plays fastest under 50 Entropy. Above 80, flashbacks corrupt her perception." },
      { icon: "fire", key: "LSHIFT", name: "The Heretic", desc: "Her abilities cost health. Fire spells scale with Entropy." },
      { icon: "book-cover", key: "E", name: "The Archivist", desc: "Can rewind 5 seconds of combat. Each use costs a memory." }
    ],
    ultimate: { icon: "sands-of-time", name: "The Entropy system", desc: "Dormant, Stirring, Active, Fracturing, Overwritten." },
    passive: { icon: "eye-target", name: "The game that watches you back", desc: "" },
    perks: {
      minor: { label: "Also playable", items: [
        { icon: "shield", name: "The Warden", desc: "Protects people who may not deserve it." },
        { icon: "echo-ripples", name: "The Echo", desc: "Strongest at exactly 50 Entropy." }
      ] },
      major: { label: "Documents", items: [
        { icon: "scroll-unfurled", name: "Game design document v0.5", desc: "" },
        { icon: "scroll-unfurled", name: "Launch scope v1.0", desc: "" },
        { icon: "open-book", name: "Technical guidebook v1.0", desc: "" }
      ] }
    }
  }
};
