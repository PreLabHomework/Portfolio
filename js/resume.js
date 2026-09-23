// ============================================================
//  RESUME (Pro Mode source of truth)
//  Taken from HamzaAkat_Resume, Drive 1KCoxFYmdYVHvo6s5rlFfqkYNS4TReAnW.
//  Update this file when the resume changes.
// ============================================================

export const RESUME = {
  name: "Hamza Abu Khalaf Al Takrouri",
  location: "Fairfax, VA",
  contact: [
    { label: "hamzaabukat@gmail.com", url: "mailto:hamzaabukat@gmail.com" },
    { label: "+1 571-663-7706", url: "tel:+15716637706" },
    { label: "linkedin.com/in/hakat", url: "https://www.linkedin.com/in/hakat" },
    { label: "github.com/prelabhomework", url: "https://github.com/prelabhomework" }
  ],
  summary: "Computer and Electrical Engineering graduate specializing in embedded firmware and digital systems design, with hands-on experience across FreeRTOS, AVR, ESP32, and FPGA platforms. Currently expanding into computer architecture and GPU/accelerator design through an in-progress M.S. in Computer Engineering, with a strong foundation in hardware bring-up, firmware deployment, and low-level signal validation.",
  education: [
    { school: "George Mason University", place: "Fairfax, VA", degree: "M.S. Computer Engineering, CAES/DSYS Concentration, In Progress", date: "Aug 2026 to May 2028 (Expected)",
      notes: ["Graduate focus: embedded systems, FPGA/RTL design, computer architecture, and hardware-software co-design", "Current coursework: Computer Architecture, Digital System Design (VHDL), ML for Embedded Systems"] },
    { school: "Saint Louis University", place: "St. Louis, MO and Madrid, Spain", degree: "B.S. Computer Engineering and Electrical Engineering", date: "Aug 2021 to May 2026",
      notes: ["Minors: Computer Science and Mathematics", "Relevant coursework: Advanced Digital Design, Computer Systems Design, Microprocessors, Electronic Circuit Design"] }
  ],
  experience: [
    { org: "Power International Holding", place: "Doha, Qatar", role: "Data and AI Intern", date: "Summer 2026", bullets: [
      "Contributed to an ETL pipeline ingesting Epic clinical-system events and operational data, and to a predictive-monitoring model flagging systems at elevated risk of outage before incidents were user-reported; findings surfaced on an IT operations dashboard for systems engineers and IT leadership.",
      "Contributed to an internal LLM-based incident-triage assistant that retrieved similar historical tickets and documentation to summarize likely causes and surface troubleshooting steps for engineers."] },
    { org: "CHROME Lab, Research Assistant", place: "St. Louis, MO", role: "Firmware Deployment, Device Management and Validation, SLU", date: "Fall 2025 to Spring 2026", bullets: [
      "Developed and deployed PT KIDS, a Python/Tkinter firmware deployment tool for ATmega328P/RN4870 BLE clinical wearables, automating AVRdude flashing over Bluetooth serial with SPI/UART validation, structured pass/fail reporting, and PyInstaller packaging across 3+ clinical deployment sites.",
      "Engineered a host-side serial device-management and firmware deployment layer with auto COM port detection, configurable baud-rate initialization, and a real-time validation pipeline, enabling non-engineering clinical staff to execute Bluetooth-based firmware updates independently.",
      "Diagnosed firmware deployment and communication failures using serial logs, device-response analysis, repeatable test cases, and SPI/UART validation checks, isolating root causes and verifying fixes across wearable hardware configurations."] },
    { org: "Musculoskeletal Biomechanics Lab, Research Assistant", place: "St. Louis, MO", role: "Hardware Bring-Up, Firmware Recovery and Diagnostic Systems, SLU", date: "Fall 2025 to Spring 2026", bullets: [
      "Reverse-engineered a legacy QBC hematology analyzer by recreating the Intel D8749H MCS-48 EPROM verify sequence from datasheet timing diagrams on an Arduino Mega, reading firmware byte by byte and reconstructing the memory map and I/O architecture to enable full hardware modernization of an otherwise inaccessible platform.",
      "Architected a ground-up ESP32-based replacement system integrating a Nextion touchscreen, ULN2003 motor driver, 465nm LED strips, photodiode signal acquisition, and a buck converter power stage, executing hardware bring-up and validating electrical signals against legacy diagnostic specifications using oscilloscope measurement."] },
    { org: "WNIS Lab, Research Assistant", place: "St. Louis, MO", role: "Embedded Sensing and Real-Time Validation, SLU, IEEE INFOCOM 2027", date: "Fall 2025 to Spring 2026", bullets: [
      "Co-developed GUARD, a real-time driver authentication system on TI IWR6843 mmWave radar, building a Python processing pipeline spanning raw point-cloud ingestion, spherical-grid preprocessing, temporal feature extraction, edge inference, and trust scoring; manuscript under review at IEEE INFOCOM 2027.",
      "Engineered a high-throughput Python automation pipeline processing 20-fps radar data across a 5-driver, 25-session dataset, with automated end-to-end validation and structured regression testing across all hardware configurations, achieving 100% unauthorized-driver detection.",
      "Designed and validated a two-stage authentication architecture combining GAN-based behavioral registration with a real-time trust-pool scoring module, executing structured system-level evaluation and isolating failure modes between pipeline stages through log analysis."] },
    { org: "Doha Bank", place: "Doha, Qatar", role: "Data Engineering Intern", date: "Summer 2025", bullets: [
      "Completed a cross-functional rotation across Data Engineering, Database Administration, and Linux Systems, developing automated SQL-based data validation workflows and contributing to ETL process documentation and enterprise data governance frameworks under regulated financial compliance standards."] }
  ],
  programs: [
    { org: "Corsair", place: "Remote", role: "Firmware Engineering Externship, Early Talent Program", date: "Spring 2023", bullets: [
      "Optimized low-level C++ peripheral firmware on ARM Cortex-A platforms, engineering I2C/SPI macro-execution logic and key-remapping engines through register-level debugging, firmware restructuring, and structured cross-platform validation cycles across multiple hardware configurations."] },
    { org: "Samsung Gulf Electronics", place: "Doha, Qatar", role: "Samsung Innovation Campus, AI and Machine Learning Program", date: "Winter 2023", bullets: [
      "Completed Samsung's flagship 240-hour AI and ML program covering Python, statistics, machine learning, and deep learning through hands-on applied projects."] },
    { org: "GlaxoSmithKline (GSK)", place: "Madrid, Spain", role: "Technology Research Shadow", date: "Fall 2022", bullets: [
      "Shadowed pharmaceutical R&D researchers evaluating AI-assisted drug discovery workflows, laboratory automation systems, analytical instrumentation, and RFID-based asset-tracking technologies within a regulated research environment."] }
  ],
  projects: [
    { name: "Firmcore", stack: "C++20, CMake, GitHub Actions, libFuzzer", date: "Personal Project, 2026", url: "https://github.com/prelabhomework/Firmcore", bullets: [
      "Built a header-only C++20 embedded firmware library providing BSP/HAL-style building blocks: a lock-free SPSC ring buffer, packet framing with COBS encoding, Q-format fixed-point arithmetic for embedded DSP, and a heap-free memory pool allocator, targeting zero-heap, exception-free deployment on ARM Cortex-M4.",
      "Verified correctness through unit tests under sanitizers and a 21-million-execution libFuzzer campaign with zero findings; published cross-compiled code-size benchmarks showing a full sensor telemetry pipeline fitting in 1.9 KB flash and 900 B RAM."] },
    { name: "FPGA UART Transmitter / RTL Datapath", stack: "VHDL, Vivado, Basys 3, Artix-7", date: "Fall 2024", url: "https://github.com/PreLabHomework/Basys-3-UART-transmitter", bullets: [
      "Synthesized an FSM-based UART transmitter in VHDL on a Basys 3 Artix-7 FPGA, deriving 9600-baud timing from a 100 MHz clock, generating 10-bit serial frames with ROM-controlled framing logic, and validating end-to-end transmission through an external RS-232 transceiver and USB-UART hardware."] },
    { name: "AVR Peripheral Control System", stack: "AVR Assembly, ATmega32A, ADC, PWM, JTAG", date: "Fall 2024", url: "https://github.com/PreLabHomework/AVR-Embedded-Control-System", bullets: [
      "Implemented three external ISRs in AVR assembly on an ATmega32A/STK500 with full SREG/stack preservation, interrupt vector table configuration, and priority validation across simultaneous trigger scenarios, debugged via JTAGICE MkII.",
      "Extended with Timer0 prescaler delays, matrix keypad scanning, ASCII lookup tables, and SRAM message storage; implemented a C ADC loop reading an LM34 temperature sensor and generating fast PWM to position a servo across seven calibrated angles with switch debouncing."] },
    { name: "TremorMonitor Edge Sensing System", stack: "ESP32-S3, FreeRTOS, BLE GATT, FFT", date: "Fall 2025 to Spring 2026", url: "https://github.com/PreLabHomework/TremorMonitor", bullets: [
      "Engineered real-time firmware on ESP32-S3 (Xtensa LX7) with FreeRTOS multi-task scheduling, interrupt-driven IMU acquisition, DMA-assisted sensor reads, FFT-based tremor detection, closed-loop actuator feedback, and a custom BLE GATT service with 5-byte packet encoding for low-latency streaming."] },
    { name: "WiFi Coverage Analyzer", stack: "Raspberry Pi, Python, PyShark, MATLAB", date: "Fall 2024 to Spring 2025", url: "https://github.com/PreLabHomework/Handover-Analyzer", bullets: [
      "Built a custom Raspberry Pi scanning platform collecting 194K+ wireless measurements across 952 survey locations over two semesters; initial campus survey extended to Ritter Hall, identifying 73% of basement locations below minimum WiFi standards and delivering MATLAB-modeled infrastructure recommendations to SLU IT."] }
  ],
  skills: [
    ["Computer Architecture, FPGA / RTL and Hardware Interfaces", "Computer Architecture, RTL/Digital Logic Design, GPU Architecture, FPGA Design (Artix-7), VHDL, I2C, SPI, UART, RS-232, BLE / BLE GATT, TI IWR6843 mmWave Radar, IMU Signal Processing, SolidWorks"],
    ["Embedded Firmware and Low-Level Software", "C, C++20, Python, AVR Assembly, FreeRTOS, ESP32-S3 (Xtensa LX7), ATmega32A, ATmega328P/RN4870 BLE, ARM Cortex-A, ARM Cortex-M4, Hardware/Firmware Integration, BSP/HAL Development, Firmware Deployment/OTA, Peripheral Drivers, Interrupt Handling, DMA, ADC, PWM, GPIO, Cross-Compilation, AVRdude, PySerial, Packet Framing, Lock-Free/Heap-Free Design"],
    ["Validation, Verification and Debug", "Silicon/Hardware Validation, JTAG, Serial Protocol Analysis, Oscilloscope-Based Signal Validation, Logic Analyzer, Hardware Bring-Up, Root-Cause Analysis, Structured Test Plans, Regression Testing, libFuzzer, Sanitizers"],
    ["Performance, Systems and Tools", "Linux, Bash, Git, GitHub Actions, Vivado, Arduino IDE, VS Code, Tkinter, PyInstaller, CMake, PowerShell"],
    ["Edge AI and Signal Processing", "GANs, PyTorch, Edge AI / Edge Inference, mmWave Radar Processing, Feature Engineering, FFT Signal Processing, Digital Signal Processing (DSP), Fixed-Point Arithmetic"],
    ["Software and Data", "MATLAB, SQL, Point-Cloud Processing, PyShark, R Shiny, JavaScript, HTML/CSS, GDScript"],
    ["Spoken Languages", "English (Native), Arabic (Native), Spanish (Native), Italian (A1)"]
  ],
  awards: [
    "SLU Launch Inventor Award ($2,500, 2026)",
    "MIT AI and CS Seminar Series, Schwarzman College of Computing (2025)",
    "IEEE Student Member",
    "World Scholar's Cup Top 5% Team Debate, Global Round (2020)",
    "USPTO Patent Bar Exam (In Progress)"
  ]
};
