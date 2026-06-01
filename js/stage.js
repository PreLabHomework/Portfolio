// ============================================================
//  STAGE - Three.js per-character figures (v4.7.6)
//  11 upgraded character builders with unique props and idle motion.
//  Same exports as v4.7.5: createStage(canvas) → { tick, setCharacter, resize }
// ============================================================

import * as THREE from 'three';

export function createStage(canvas) {
  const renderer = new THREE.WebGLRenderer({
    canvas, antialias: true, alpha: true, powerPreference: 'high-performance'
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
  camera.position.set(0, 1.0, 6.4);
  camera.lookAt(0, 0.6, 0);

  // ─── three-point cinematic lighting, tinted per character ───
  // v4.8.0 — calmer than v4.7.6, no longer trying to grab eye attention.
  const ambient = new THREE.AmbientLight(0xffffff, 0.22);
  scene.add(ambient);
  const keyLight = new THREE.DirectionalLight(0xffffff, 1.7);
  keyLight.position.set(3.4, 4.2, 3.6);
  scene.add(keyLight);
  const rimLight = new THREE.DirectionalLight(0xffd166, 1.35);
  rimLight.position.set(-3.6, 2.8, -3.0);
  scene.add(rimLight);
  const fillLight = new THREE.PointLight(0xef476f, 0.55, 10);
  fillLight.position.set(-2, 0.6, 2);
  scene.add(fillLight);
  const accentLight = new THREE.PointLight(0xffd166, 0.7, 8);
  accentLight.position.set(2, 0.4, 1);
  scene.add(accentLight);
  // subtle top kicker for shoulder/hair highlight
  const kicker = new THREE.DirectionalLight(0xffffff, 0.5);
  kicker.position.set(0, 5, -1.5);
  scene.add(kicker);

  // ─── ground disk ───
  const ground = new THREE.Mesh(
    new THREE.CircleGeometry(2.5, 64),
    new THREE.MeshStandardMaterial({
      color: 0x000000, transparent: true, opacity: 0.35,
      roughness: 0.9, metalness: 0
    })
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.65;
  scene.add(ground);

  let currentFigure = null;

  function resize() {
    const r = canvas.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) return;
    renderer.setSize(r.width, r.height, false);
    camera.aspect = r.width / r.height;
    camera.updateProjectionMatrix();
    applyFigureLayout(false);
  }
  resize();

  function getFigureLayout() {
    const width = canvas.getBoundingClientRect().width || window.innerWidth;
    if (width < 560) return { x: 1.02, scale: 0.64 };
    if (width < 820) return { x: 1.25, scale: 0.74 };
    return { x: 1.72, scale: 0.92 };
  }

  function applyFigureLayout(animate = false) {
    if (!currentFigure) return;
    const layout = getFigureLayout();
    currentFigure.position.x = layout.x;
    currentFigure.userData.baseY = 0;
    if (animate && window.gsap) {
      gsap.to(currentFigure.scale, { x: layout.scale, y: layout.scale, z: layout.scale, duration: 0.5, ease: 'back.out(1.6)' });
    } else {
      currentFigure.scale.set(layout.scale, layout.scale, layout.scale);
    }
  }

  // ============================================================
  //  SHARED GEOMETRY HELPERS
  // ============================================================

  function mat(color, opts = {}) {
    return new THREE.MeshStandardMaterial({
      color, roughness: opts.roughness ?? 0.45, metalness: opts.metalness ?? 0.25,
      emissive: opts.emissive ?? 0x000000,
      emissiveIntensity: opts.emissiveIntensity ?? 0,
      transparent: opts.transparent ?? false, opacity: opts.opacity ?? 1
    });
  }
  function glowMat(color, intensity = 0.9) {
    return new THREE.MeshStandardMaterial({
      color, emissive: color, emissiveIntensity: intensity,
      roughness: 0.3, metalness: 0.55
    });
  }

  function makeHead({
    accent,
    accent2,
    antenna = false,
    mask = false,
    hood = false,
    hair = "sweep",
    hairColor = 0x171017,
    skin = 0xc98d68,
    goggles = false
  } = {}) {
    const g = new THREE.Group();
    const skinMaterial = mask
      ? mat(0x111827, { roughness: 0.42, metalness: 0.32, emissive: accent, emissiveIntensity: 0.12 })
      : mat(skin, { roughness: 0.62, metalness: 0.03 });

    const skull = new THREE.Mesh(new THREE.SphereGeometry(0.285, 32, 24), skinMaterial);
    skull.scale.set(0.9, 1.05, 0.82);
    g.add(skull);

    const jaw = new THREE.Mesh(new THREE.SphereGeometry(0.19, 22, 14), skinMaterial);
    jaw.scale.set(0.82, 0.62, 0.72);
    jaw.position.set(0, -0.16, 0.035);
    g.add(jaw);

    addHair(g, hair, hairColor, accent);

    if (mask) {
      const maskMesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.225, 20, 16, 0, Math.PI, 0, Math.PI),
        new THREE.MeshStandardMaterial({
          color: 0x050810, roughness: 0.4, metalness: 0.6,
          emissive: accent, emissiveIntensity: 0.35
        })
      );
      maskMesh.position.z = 0.145;
      maskMesh.scale.set(0.96, 1.02, 0.72);
      maskMesh.rotation.y = Math.PI;
      g.add(maskMesh);
      const slitMat = glowMat(accent, 1.6);
      [-0.07, 0.07].forEach(x => {
        const slit = new THREE.Mesh(new THREE.BoxGeometry(0.052, 0.012, 0.02), slitMat);
        slit.position.set(x, 0.035, 0.285);
        g.add(slit);
      });
    } else {
      const eyeMat = mat(0x07101a, { roughness: 0.35, metalness: 0.05 });
      [-0.075, 0.075].forEach(x => {
        const eye = new THREE.Mesh(new THREE.SphereGeometry(0.024, 12, 8), eyeMat);
        eye.scale.set(1.15, 0.62, 0.5);
        eye.position.set(x, 0.035, 0.255);
        g.add(eye);

        const brow = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.012, 0.018), glowMat(accent, 0.55));
        brow.position.set(x, 0.095, 0.244);
        brow.rotation.z = x < 0 ? 0.12 : -0.12;
        g.add(brow);
      });

      const nose = new THREE.Mesh(new THREE.ConeGeometry(0.028, 0.08, 8), mat(skin, { roughness: 0.68, metalness: 0.02 }));
      nose.rotation.x = Math.PI / 2;
      nose.position.set(0, -0.025, 0.28);
      g.add(nose);

      const mouth = new THREE.Mesh(new THREE.BoxGeometry(0.105, 0.012, 0.018), mat(0x3a1d1c, { roughness: 0.7, metalness: 0 }));
      mouth.position.set(0, -0.12, 0.258);
      g.add(mouth);
    }

    if (goggles) addGoggles(g, accent, accent2 ?? accent);

    if (antenna) {
      const ant = new THREE.Mesh(
        new THREE.CylinderGeometry(0.012, 0.008, 0.2, 8),
        glowMat(accent, 1.0)
      );
      ant.position.set(0.18, 0.31, -0.02);
      ant.rotation.z = -0.24;
      g.add(ant);
      const tip = new THREE.Mesh(new THREE.SphereGeometry(0.032, 12, 12), glowMat(accent, 1.6));
      tip.position.set(0.22, 0.42, -0.02);
      g.add(tip);
    }

    if (hood) {
      const hoodMesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.365, 22, 14, 0, Math.PI * 2, 0, Math.PI * 0.76),
        mat(0x121824, { roughness: 0.78, metalness: 0.08, transparent: true, opacity: 0.78 })
      );
      hoodMesh.position.set(0, 0.03, -0.13);
      hoodMesh.scale.set(1.05, 1.04, 0.58);
      hoodMesh.rotation.y = Math.PI;
      g.add(hoodMesh);

      const cowl = new THREE.Mesh(
        new THREE.TorusGeometry(0.275, 0.038, 8, 28, Math.PI * 1.5),
        mat(0x0d1420, { roughness: 0.7, metalness: 0.1 })
      );
      cowl.position.set(0, -0.19, 0.02);
      cowl.rotation.x = Math.PI / 2;
      cowl.rotation.z = Math.PI;
      g.add(cowl);
    }

    return g;
  }

  function addHair(g, style, color, accent) {
    if (style === "none") return;
    const hairMat = mat(color, { roughness: 0.74, metalness: 0.04 });
    const cap = new THREE.Mesh(
      new THREE.SphereGeometry(0.305, 24, 12, 0, Math.PI * 2, 0, Math.PI * 0.54),
      hairMat
    );
    cap.position.set(0, 0.07, -0.005);
    cap.scale.set(0.96, 0.78, 0.9);
    g.add(cap);

    const bangCount = style === "spikes" ? 5 : 4;
    for (let i = 0; i < bangCount; i++) {
      const bang = new THREE.Mesh(new THREE.ConeGeometry(0.04, style === "spikes" ? 0.18 : 0.14, 7), hairMat);
      bang.position.set((i - (bangCount - 1) / 2) * 0.055, style === "spikes" ? 0.22 : 0.13, 0.22);
      bang.rotation.x = style === "spikes" ? 0.55 : 1.18;
      bang.rotation.z = (i - 1.5) * 0.18;
      g.add(bang);
    }

    if (style === "bun") {
      const bun = new THREE.Mesh(new THREE.SphereGeometry(0.11, 16, 12), hairMat);
      bun.position.set(0, 0.12, -0.29);
      g.add(bun);
      const pin = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.014, 0.014), glowMat(accent, 0.55));
      pin.position.set(0, 0.14, -0.36);
      pin.rotation.z = 0.22;
      g.add(pin);
    }

    if (style === "bob" || style === "messy") {
      [-1, 1].forEach(side => {
        const sideLock = new THREE.Mesh(new THREE.SphereGeometry(0.12, 14, 10), hairMat);
        sideLock.scale.set(0.7, style === "messy" ? 1.15 : 1.35, 0.5);
        sideLock.position.set(side * 0.24, -0.03, 0.02);
        g.add(sideLock);
      });
    }

    if (style === "undercut" || style === "neat") {
      const sweep = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.07, 0.12), hairMat);
      sweep.position.set(style === "undercut" ? -0.05 : 0.02, 0.21, 0.12);
      sweep.rotation.z = style === "undercut" ? -0.25 : -0.08;
      sweep.rotation.x = 0.18;
      g.add(sweep);
    }
  }

  function addGoggles(g, accent, accent2) {
    const strap = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.035, 0.035), mat(0x0b111b, { roughness: 0.5, metalness: 0.25 }));
    strap.position.set(0, 0.045, 0.245);
    g.add(strap);

    [-0.085, 0.085].forEach(x => {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.068, 0.012, 8, 20), glowMat(accent, 0.86));
      ring.position.set(x, 0.045, 0.274);
      g.add(ring);
      const lens = new THREE.Mesh(
        new THREE.CircleGeometry(0.052, 16),
        new THREE.MeshStandardMaterial({
          color: accent2,
          emissive: accent2,
          emissiveIntensity: 0.26,
          transparent: true,
          opacity: 0.52,
          roughness: 0.2,
          metalness: 0.1
        })
      );
      lens.position.set(x, 0.045, 0.278);
      g.add(lens);
    });
  }

  function makeTorso({ accent, accent2, color = 0x1a2233, height = 1.0, glowStrip = true, collar = true }) {
    const g = new THREE.Group();
    const body = new THREE.Mesh(
      new THREE.CylinderGeometry(0.3, 0.42, height, 12),
      mat(color, { roughness: 0.5, metalness: 0.25 })
    );
    body.position.y = -height / 2;
    g.add(body);

    if (collar) {
      const collarRing = new THREE.Mesh(
        new THREE.TorusGeometry(0.2, 0.04, 8, 22),
        glowMat(accent2, 0.85)
      );
      collarRing.position.y = 0.04;
      collarRing.rotation.x = Math.PI / 2;
      g.add(collarRing);
      [-1, 1].forEach(s => {
        const wedge = new THREE.Mesh(
          new THREE.BoxGeometry(0.08, 0.42, 0.04),
          glowMat(accent, 0.95)
        );
        wedge.position.set(s * 0.13, -0.18, 0.3);
        wedge.rotation.z = s * 0.18;
        g.add(wedge);
      });
    }

    if (glowStrip) {
      const strip = new THREE.Mesh(
        new THREE.BoxGeometry(0.05, height * 0.35, 0.04),
        glowMat(accent2, 0.9)
      );
      strip.position.set(0, -height * 0.28, 0.34);
      g.add(strip);
    }
    return g;
  }

  function makeHeroFrame({ accent, accent2, coatColor, heavy = false, cloak = false } = {}) {
    const g = new THREE.Group();
    const frameMat = mat(coatColor, { roughness: 0.42, metalness: 0.35 });
    const darkMat = mat(0x07101a, { roughness: 0.55, metalness: 0.45 });

    const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.13, 0.24, 12), darkMat);
    neck.position.y = 1.38;
    g.add(neck);

    const shoulderBar = new THREE.Mesh(
      new THREE.BoxGeometry(heavy ? 1.08 : 0.92, 0.12, 0.28),
      frameMat
    );
    shoulderBar.position.set(0, 1.22, 0.02);
    g.add(shoulderBar);

    const chest = new THREE.Mesh(
      new THREE.BoxGeometry(heavy ? 0.62 : 0.5, 0.5, 0.08),
      glowMat(accent, 0.42)
    );
    chest.position.set(0, 0.82, 0.37);
    g.add(chest);

    const core = new THREE.Mesh(
      new THREE.CylinderGeometry(0.28, 0.34, 0.36, 6),
      mat(0x0b1320, { roughness: 0.5, metalness: 0.45 })
    );
    core.position.y = 0.36;
    g.add(core);

    const belt = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.1, 0.22), glowMat(accent2, 0.5));
    belt.position.set(0, 0.31, 0.08);
    g.add(belt);

    const hips = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.22, 0.3), frameMat);
    hips.position.y = 0.18;
    g.add(hips);

    const pack = new THREE.Mesh(
      new THREE.BoxGeometry(0.42, 0.62, 0.16),
      mat(0x0b1320, { roughness: 0.5, metalness: 0.5 })
    );
    pack.position.set(0, 0.75, -0.34);
    g.add(pack);

    if (cloak) {
      const mantle = new THREE.Mesh(
        new THREE.BoxGeometry(0.92, 0.12, 0.12),
        mat(0x0a0e16, { roughness: 0.8, metalness: 0.1 })
      );
      mantle.position.set(0, 1.12, -0.18);
      g.add(mantle);
    }

    return g;
  }

  function makePauldron(side, accent, color = 0x1a2233) {
    const g = new THREE.Group();
    const cap = new THREE.Mesh(
      new THREE.SphereGeometry(0.16, 14, 10, 0, Math.PI * 2, 0, Math.PI / 2),
      mat(color, { roughness: 0.45, metalness: 0.35 })
    );
    cap.scale.set(1, 0.72, 1);
    g.add(cap);
    const rim = new THREE.Mesh(
      new THREE.TorusGeometry(0.13, 0.018, 6, 20, Math.PI),
      glowMat(accent, 1.0)
    );
    rim.rotation.x = Math.PI / 2;
    g.add(rim);
    g.position.set(side * 0.45, 1.34, 0);
    return g;
  }

  function makeArm(side, { coatColor = 0x1a2233, accent, glove, length = 1 } = {}) {
    const g = new THREE.Group();
    const shoulder = new THREE.Mesh(new THREE.SphereGeometry(0.11, 14, 12), mat(coatColor, { roughness: 0.45, metalness: 0.35 }));
    shoulder.position.set(side * 0.48, 1.19, 0.04);
    g.add(shoulder);

    const upper = new THREE.Mesh(
      new THREE.CylinderGeometry(0.095, 0.08, 0.44 * length, 10),
      mat(coatColor, { roughness: 0.5 })
    );
    upper.position.set(side * 0.48, 1.12, 0.04);
    upper.rotation.x = 0.35;
    upper.rotation.z = side * 0.08;
    g.add(upper);

    const elbow = new THREE.Mesh(new THREE.SphereGeometry(0.085, 12, 12), glowMat(accent, 0.85));
    elbow.position.set(side * 0.5, 0.86, 0.18);
    g.add(elbow);

    const lower = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.065, 0.42 * length, 10),
      mat(coatColor, { roughness: 0.5 })
    );
    lower.position.set(side * 0.5, 0.68, 0.22);
    lower.rotation.x = 0.7;
    lower.rotation.z = side * 0.05;
    g.add(lower);

    if (glove !== false) {
      const gloveColor = (typeof glove === 'number') ? glove : accent;
      const gloveMesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.09, 14, 10),
        mat(gloveColor, { roughness: 0.56, metalness: gloveColor === accent ? 0.18 : 0.02 })
      );
      gloveMesh.scale.set(1.1, 0.82, 0.9);
      gloveMesh.position.set(side * 0.5, 0.5, 0.32);
      g.add(gloveMesh);

      const wrist = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.07, 0.08, 10), mat(coatColor, { roughness: 0.5 }));
      wrist.position.set(side * 0.5, 0.56, 0.26);
      wrist.rotation.x = 0.7;
      g.add(wrist);

      if (gloveColor === accent) {
        const knuckle = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.025, 0.05), glowMat(accent, 0.75));
        knuckle.position.set(side * 0.5, 0.52, 0.41);
        g.add(knuckle);
      }
    }
    return g;
  }

  function makeLegs({ coatColor = 0x1a2233, accent, stance = 1 } = {}) {
    const g = new THREE.Group();
    [-1, 1].forEach(s => {
      const upper = new THREE.Mesh(
        new THREE.CylinderGeometry(0.115, 0.095, 0.5, 10),
        mat(coatColor, { roughness: 0.5 })
      );
      upper.position.set(s * 0.19 * stance, 0.12, 0);
      upper.rotation.z = s * 0.06;
      g.add(upper);

      const knee = new THREE.Mesh(new THREE.SphereGeometry(0.09, 12, 12), glowMat(accent, 0.7));
      knee.position.set(s * 0.21 * stance, -0.13, 0.02);
      g.add(knee);

      const lower = new THREE.Mesh(
        new THREE.CylinderGeometry(0.09, 0.075, 0.44, 10),
        mat(coatColor, { roughness: 0.5 })
      );
      lower.position.set(s * 0.23 * stance, -0.37, 0.02);
      lower.rotation.z = -s * 0.04;
      g.add(lower);

      const boot = new THREE.Mesh(
        new THREE.BoxGeometry(0.22, 0.17, 0.34),
        mat(0x0a0e16, { roughness: 0.7, metalness: 0.3 })
      );
      boot.position.set(s * 0.25 * stance, -0.62, 0.1);
      g.add(boot);

      const shin = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.26, 0.045), glowMat(accent, 0.7));
      shin.position.set(s * 0.23 * stance, -0.36, 0.12);
      g.add(shin);
    });
    return g;
  }

  function makeGroundRing(accent) {
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(0.55, 0.012, 6, 48),
      glowMat(accent, 0.85)
    );
    ring.position.y = -0.62;
    ring.rotation.x = Math.PI / 2;
    return ring;
  }

  function armorPlate(width, height, depth, material, notch = 0.12) {
    const cutX = Math.min(width * notch, width * 0.22);
    const cutY = Math.min(height * notch, height * 0.18);
    const shape = new THREE.Shape();
    shape.moveTo(-width / 2 + cutX, height / 2);
    shape.lineTo(width / 2 - cutX, height / 2);
    shape.lineTo(width / 2, height / 2 - cutY);
    shape.lineTo(width / 2, -height / 2 + cutY);
    shape.lineTo(width / 2 - cutX, -height / 2);
    shape.lineTo(-width / 2 + cutX, -height / 2);
    shape.lineTo(-width / 2, -height / 2 + cutY);
    shape.lineTo(-width / 2, height / 2 - cutY);
    shape.lineTo(-width / 2 + cutX, height / 2);

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth,
      bevelEnabled: true,
      bevelSize: Math.min(depth * 0.22, 0.012),
      bevelThickness: Math.min(depth * 0.16, 0.01),
      bevelSegments: 1
    });
    geometry.center();
    return new THREE.Mesh(geometry, material);
  }

  function makeArmorKit({
    accent,
    accent2,
    coatColor = 0x1a2233,
    armorColor = 0xe8edf2,
    darkColor = 0x0a0f18,
    heavy = false,
    asym = 1,
    medical = false
  } = {}) {
    const g = new THREE.Group();
    const armorMat = mat(armorColor, { roughness: 0.34, metalness: 0.24 });
    const darkMat = mat(darkColor, { roughness: 0.52, metalness: 0.34 });
    const suitMat = mat(coatColor, { roughness: 0.56, metalness: 0.16 });

    const breast = armorPlate(heavy ? 0.72 : 0.6, heavy ? 0.46 : 0.38, 0.095, armorMat, heavy ? 0.09 : 0.14);
    breast.position.set(0, 0.96, 0.43);
    breast.rotation.x = -0.08;
    g.add(breast);

    const chestCore = new THREE.Mesh(
      new THREE.CylinderGeometry(0.09, 0.09, 0.018, 24),
      glowMat(accent, 1.15)
    );
    chestCore.position.set(0, 0.98, 0.49);
    chestCore.rotation.x = Math.PI / 2;
    g.add(chestCore);

    if (medical) {
      const crossA = new THREE.Mesh(new THREE.BoxGeometry(0.17, 0.038, 0.018), glowMat(accent2, 1.2));
      const crossB = new THREE.Mesh(new THREE.BoxGeometry(0.038, 0.17, 0.018), glowMat(accent2, 1.2));
      crossA.position.set(0, 0.98, 0.51);
      crossB.position.copy(crossA.position);
      g.add(crossA, crossB);
    }

    [-1, 1].forEach(side => {
      const collar = armorPlate(0.28, 0.08, 0.05, armorMat, 0.18);
      collar.position.set(side * 0.22, 1.23, 0.33);
      collar.rotation.z = side * -0.24;
      collar.rotation.y = side * 0.12;
      g.add(collar);

      const rib = new THREE.Mesh(
        new THREE.BoxGeometry(0.08, 0.38, 0.04),
        glowMat(side === asym ? accent : accent2, 0.62)
      );
      rib.position.set(side * 0.26, 0.78, 0.48);
      rib.rotation.z = side * 0.1;
      g.add(rib);

      const hipPlate = armorPlate(0.18, 0.2, 0.055, armorMat, 0.18);
      hipPlate.position.set(side * 0.25, 0.25, 0.27);
      hipPlate.rotation.z = side * 0.12;
      g.add(hipPlate);

      const thighPlate = armorPlate(0.17, 0.28, 0.05, armorMat, 0.14);
      thighPlate.position.set(side * 0.2, -0.06, 0.16);
      thighPlate.rotation.z = side * 0.05;
      g.add(thighPlate);

      const shinPlate = armorPlate(0.15, 0.33, 0.055, side === asym ? armorMat : darkMat, 0.14);
      shinPlate.position.set(side * 0.23, -0.39, 0.18);
      shinPlate.rotation.z = -side * 0.04;
      g.add(shinPlate);

      const toe = armorPlate(0.26, 0.08, 0.1, darkMat, 0.22);
      toe.position.set(side * 0.25, -0.67, 0.21);
      toe.rotation.x = -0.08;
      g.add(toe);

      const armPlate = armorPlate(0.13, 0.28, 0.055, side === asym ? armorMat : suitMat, 0.14);
      armPlate.position.set(side * 0.5, 0.72, 0.33);
      armPlate.rotation.x = 0.65;
      armPlate.rotation.z = side * 0.08;
      g.add(armPlate);
    });

    const belt = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.085, 0.12), darkMat);
    belt.position.set(0, 0.36, 0.29);
    g.add(belt);
    const beltLight = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.025, 0.018), glowMat(accent2, 0.9));
    beltLight.position.set(0, 0.37, 0.36);
    g.add(beltLight);

    return g;
  }

  function addBackModule(g, accent, accent2, {
    width = 0.46,
    height = 0.62,
    y = 0.88,
    z = -0.52,
    wings = true,
    medical = false
  } = {}) {
    const pack = new THREE.Mesh(
      new THREE.BoxGeometry(width, height, 0.16),
      mat(0x0b111b, { roughness: 0.38, metalness: 0.62 })
    );
    pack.position.set(0, y, z);
    g.add(pack);

    const core = new THREE.Mesh(new THREE.BoxGeometry(width * 0.56, height * 0.56, 0.025), glowMat(accent, 0.78));
    core.position.set(0, y, z - 0.09);
    g.add(core);

    if (medical) {
      const plusH = new THREE.Mesh(new THREE.BoxGeometry(width * 0.32, 0.035, 0.028), glowMat(accent2, 1.2));
      const plusV = new THREE.Mesh(new THREE.BoxGeometry(0.035, width * 0.32, 0.028), glowMat(accent2, 1.2));
      plusH.position.set(0, y, z - 0.112);
      plusV.position.copy(plusH.position);
      g.add(plusH, plusV);
    }

    if (wings) {
      [-1, 1].forEach(side => {
        const wing = new THREE.Mesh(
          new THREE.BoxGeometry(0.1, height * 0.78, 0.34),
          mat(0x111827, { roughness: 0.36, metalness: 0.56 })
        );
        wing.position.set(side * (width * 0.62), y + 0.02, z - 0.04);
        wing.rotation.y = side * 0.34;
        wing.rotation.z = side * 0.08;
        g.add(wing);

        const rail = new THREE.Mesh(new THREE.BoxGeometry(0.035, height * 0.6, 0.02), glowMat(side > 0 ? accent : accent2, 0.86));
        rail.position.set(side * (width * 0.74), y, z + 0.14);
        rail.rotation.copy(wing.rotation);
        g.add(rail);
      });
    }
  }

  function addEnergyGauntlet(g, side, accent, accent2, { large = false, shield = false } = {}) {
    const size = large ? 1.2 : 1;
    const base = new THREE.Mesh(
      new THREE.BoxGeometry(0.18 * size, 0.34 * size, 0.22 * size),
      mat(0xe8edf2, { roughness: 0.32, metalness: 0.26 })
    );
    base.position.set(side * 0.58, 0.64, 0.34);
    base.rotation.x = 0.66;
    base.rotation.z = side * 0.08;
    g.add(base);

    const emitter = new THREE.Mesh(new THREE.CylinderGeometry(0.082 * size, 0.082 * size, 0.038, 24), glowMat(accent, 1.25));
    emitter.position.set(side * 0.59, 0.55, 0.47);
    emitter.rotation.x = Math.PI / 2;
    g.add(emitter);

    if (shield) {
      const shieldRing = new THREE.Mesh(
        new THREE.TorusGeometry(0.2 * size, 0.01, 8, 36),
        glowMat(accent2, 0.85)
      );
      shieldRing.position.set(side * 0.72, 0.63, 0.54);
      shieldRing.rotation.y = Math.PI / 2;
      shieldRing.rotation.z = side * 0.2;
      g.add(shieldRing);
    }
  }

  function addDrone(g, side, accent, accent2, { y = 1.28, z = -0.18, medical = false } = {}) {
    const drone = new THREE.Group();
    const body = new THREE.Mesh(
      new THREE.CylinderGeometry(0.12, 0.12, 0.045, 24),
      mat(0xe9eef4, { roughness: 0.34, metalness: 0.28 })
    );
    body.rotation.x = Math.PI / 2;
    drone.add(body);
    const eye = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.02, 20), glowMat(accent, 1.3));
    eye.rotation.x = Math.PI / 2;
    eye.position.z = 0.03;
    drone.add(eye);
    [-1, 1].forEach(s => {
      const fin = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.025, 0.055), glowMat(s > 0 ? accent : accent2, 0.7));
      fin.position.set(s * 0.16, 0, 0);
      fin.rotation.z = s * 0.12;
      drone.add(fin);
    });
    if (medical) {
      const plus = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.018, 0.018), glowMat(accent2, 1.1));
      const plus2 = new THREE.Mesh(new THREE.BoxGeometry(0.018, 0.11, 0.018), glowMat(accent2, 1.1));
      plus.position.z = 0.055;
      plus2.position.z = 0.057;
      drone.add(plus, plus2);
    }
    drone.position.set(side * 0.78, y, z);
    drone.userData = { baseY: y, side };
    g.add(drone);
    if (!g.userData.drones) g.userData.drones = [];
    g.userData.drones.push(drone);
    return drone;
  }

  function addHoloPanel(g, side, accent, accent2, {
    x = 0.78,
    y = 1.02,
    z = 0.48,
    width = 0.42,
    height = 0.48,
    rows = 4,
    title = true
  } = {}) {
    const panel = new THREE.Group();
    const body = new THREE.Mesh(
      new THREE.PlaneGeometry(width, height),
      new THREE.MeshStandardMaterial({
        color: 0x07101a,
        emissive: accent,
        emissiveIntensity: 0.22,
        transparent: true,
        opacity: 0.46,
        roughness: 0.28,
        metalness: 0.1,
        side: THREE.DoubleSide
      })
    );
    panel.add(body);

    const frame = new THREE.Mesh(new THREE.TorusGeometry(width * 0.38, 0.006, 4, 4), glowMat(accent, 0.75));
    frame.scale.y = height / width;
    frame.rotation.z = Math.PI / 4;
    panel.add(frame);

    if (title) {
      const cap = new THREE.Mesh(new THREE.BoxGeometry(width * 0.42, 0.018, 0.012), glowMat(accent2, 0.92));
      cap.position.set(-width * 0.15, height * 0.34, 0.018);
      panel.add(cap);
    }

    for (let i = 0; i < rows; i++) {
      const line = new THREE.Mesh(
        new THREE.BoxGeometry(width * (0.28 + (i % 2) * 0.18), 0.012, 0.01),
        glowMat(i % 2 ? accent : accent2, 0.56)
      );
      line.position.set(-width * 0.08, height * 0.16 - i * height * 0.16, 0.018);
      panel.add(line);
    }

    panel.position.set(side * x, y, z);
    panel.rotation.y = side * -0.48;
    panel.rotation.z = side * 0.04;
    panel.userData = { baseY: y, side, baseRotY: panel.rotation.y };
    g.add(panel);
    if (!g.userData.holos) g.userData.holos = [];
    g.userData.holos.push(panel);
    return panel;
  }

  function addSignalRig(g, accent, accent2) {
    const headset = new THREE.Mesh(
      new THREE.TorusGeometry(0.31, 0.018, 8, 28, Math.PI),
      glowMat(accent, 0.95)
    );
    headset.position.set(0, 1.72, 0.0);
    headset.rotation.z = Math.PI;
    g.add(headset);

    const micArm = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.28, 8), glowMat(accent2, 0.9));
    micArm.position.set(0.28, 1.58, 0.18);
    micArm.rotation.z = -0.9;
    micArm.rotation.x = 0.55;
    g.add(micArm);
    const mic = new THREE.Mesh(new THREE.SphereGeometry(0.026, 10, 8), glowMat(accent2, 1.2));
    mic.position.set(0.39, 1.5, 0.28);
    g.add(mic);

    [-1, 1].forEach(side => {
      const antenna = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.009, 0.52, 8), glowMat(side > 0 ? accent : accent2, 0.8));
      antenna.position.set(side * 0.23, 1.22, -0.55);
      antenna.rotation.z = side * 0.26;
      g.add(antenna);
      const beacon = new THREE.Mesh(new THREE.SphereGeometry(0.04, 12, 10), glowMat(side > 0 ? accent2 : accent, 1.35));
      beacon.position.set(side * 0.3, 1.48, -0.55);
      g.add(beacon);
    });

    addHoloPanel(g, -1, accent, accent2, { x: 0.78, y: 1.05, z: 0.48, width: 0.36, height: 0.36, rows: 2 });
    addHoloPanel(g, 1, accent2, accent, { x: 0.86, y: 0.82, z: 0.5, width: 0.4, height: 0.3, rows: 2, title: false });
  }

  function addBriefcaseDrone(g, accent, accent2) {
    const caseBot = new THREE.Group();
    const shell = armorPlate(0.32, 0.2, 0.09, mat(0x101827, { roughness: 0.42, metalness: 0.48 }), 0.14);
    shell.rotation.x = Math.PI / 2;
    caseBot.add(shell);

    const handle = new THREE.Mesh(new THREE.TorusGeometry(0.11, 0.01, 6, 18, Math.PI), glowMat(accent, 0.82));
    handle.position.set(0, 0.09, 0);
    handle.rotation.x = Math.PI;
    caseBot.add(handle);

    [-1, 1].forEach(side => {
      const strip = new THREE.Mesh(new THREE.BoxGeometry(0.018, 0.18, 0.012), glowMat(side > 0 ? accent2 : accent, 0.8));
      strip.position.set(side * 0.12, 0, 0.055);
      caseBot.add(strip);
    });

    caseBot.position.set(0.72, 0.7, 0.42);
    caseBot.userData = { baseY: caseBot.position.y, side: 1 };
    g.add(caseBot);
    if (!g.userData.drones) g.userData.drones = [];
    g.userData.drones.push(caseBot);
    return caseBot;
  }

  function addNetworkCrest(g, accent, accent2) {
    const hub = new THREE.Group();
    const core = new THREE.Mesh(new THREE.OctahedronGeometry(0.11, 0), glowMat(accent2, 1.1));
    hub.add(core);
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      const node = new THREE.Mesh(new THREE.SphereGeometry(0.034, 10, 8), glowMat(i % 2 ? accent : accent2, 1));
      node.position.set(Math.cos(a) * 0.34, Math.sin(a) * 0.2, Math.sin(a) * 0.08);
      hub.add(node);
      const edge = new THREE.Mesh(new THREE.BoxGeometry(0.27, 0.006, 0.006), glowMat(accent, 0.45));
      edge.position.set(Math.cos(a) * 0.17, Math.sin(a) * 0.1, Math.sin(a) * 0.04);
      edge.rotation.z = Math.atan2(node.position.y, node.position.x);
      hub.add(edge);
    }
    hub.position.set(0.58, 1.08, 0.45);
    hub.userData = { baseY: hub.position.y, side: 1 };
    g.add(hub);
    if (!g.userData.holos) g.userData.holos = [];
    g.userData.holos.push(hub);
    return hub;
  }

  function addCapeFins(g, accent, accent2, width = 0.5) {
    [-1, 1].forEach(side => {
      const fin = armorPlate(0.16, 0.62, 0.035, mat(0x101827, { roughness: 0.5, metalness: 0.38 }), 0.16);
      fin.position.set(side * width, 0.76, -0.38);
      fin.rotation.z = side * 0.16;
      fin.rotation.y = side * 0.3;
      g.add(fin);

      const trim = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.48, 0.012), glowMat(side > 0 ? accent : accent2, 0.78));
      trim.position.set(side * (width + 0.025), 0.78, -0.3);
      trim.rotation.copy(fin.rotation);
      g.add(trim);
    });
  }

  // ============================================================
  //  SIGNATURE PROP BUILDERS
  // ============================================================

  function propKeycapOrbit(accent, accent2) {
    const g = new THREE.Group();
    const keys = ['H', 'J', 'K', 'L'];
    keys.forEach((label, i) => {
      const cap = new THREE.Mesh(
        new THREE.BoxGeometry(0.13, 0.06, 0.13),
        glowMat(i % 2 ? accent : accent2, 0.55)
      );
      const angle = (i / keys.length) * Math.PI * 2;
      cap.userData = { angle, radius: 0.28 };
      cap.position.set(Math.cos(angle) * 0.28, 0, Math.sin(angle) * 0.28);
      g.add(cap);
    });
    g.position.set(0.55, 0.85, 0.45);
    g.userData.animType = 'orbit';
    return g;
  }

  function propMolecule(accent, accent2) {
    const g = new THREE.Group();
    const m1 = new THREE.Mesh(new THREE.SphereGeometry(0.07, 16, 16), glowMat(accent, 1.0));
    const m2 = new THREE.Mesh(new THREE.SphereGeometry(0.055, 16, 16), glowMat(accent2, 1.0));
    const m3 = new THREE.Mesh(new THREE.SphereGeometry(0.05, 16, 16), glowMat(accent, 1.0));
    m1.position.set(0, 0, 0);
    m2.position.set(0.14, 0.08, 0.04);
    m3.position.set(-0.06, 0.13, 0);
    g.add(m1, m2, m3);

    const bondMat = new THREE.MeshBasicMaterial({ color: accent, transparent: true, opacity: 0.55 });
    function bond(a, b) {
      const dir = b.position.clone().sub(a.position);
      const len = dir.length();
      const mid = a.position.clone().add(dir.clone().multiplyScalar(0.5));
      const cyl = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, len, 6), bondMat);
      cyl.position.copy(mid);
      cyl.lookAt(b.position);
      cyl.rotateX(Math.PI / 2);
      g.add(cyl);
    }
    bond(m1, m2); bond(m2, m3); bond(m1, m3);
    g.position.set(0.55, 0.85, 0.55);
    g.userData.animType = 'spin';
    return g;
  }

  function propTremorSensor(accent, _accent2) {
    const g = new THREE.Group();
    const module = new THREE.Mesh(
      new THREE.BoxGeometry(0.18, 0.1, 0.18),
      mat(0x0a0e16, { roughness: 0.6, metalness: 0.4 })
    );
    g.add(module);

    const led = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.018, 0.12), glowMat(accent, 1.4));
    led.position.set(0, 0.055, 0);
    g.add(led);

    const waveGroup = new THREE.Group();
    waveGroup.position.set(0, 0.28, 0.06);
    const bars = [];
    for (let i = 0; i < 9; i++) {
      const bar = new THREE.Mesh(
        new THREE.BoxGeometry(0.02, 0.08, 0.02),
        glowMat(accent, 1.0)
      );
      bar.position.x = (i - 4) * 0.035;
      bar.userData.seed = i * 0.5;
      waveGroup.add(bar);
      bars.push(bar);
    }
    g.add(waveGroup);

    g.position.set(0.55, 0.85, 0.5);
    g.userData.animType = 'pulse';
    g.userData.pulseLed = led;
    g.userData.waveBars = bars;
    return g;
  }

  function propSolder(accent, accent2) {
    const g = new THREE.Group();
    const handle = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.05, 0.32, 12),
      mat(0x222831, { roughness: 0.7 })
    );
    handle.rotation.z = Math.PI / 3.5;
    g.add(handle);

    const tip = new THREE.Mesh(
      new THREE.ConeGeometry(0.03, 0.16, 12),
      glowMat(accent, 1.4)
    );
    tip.rotation.z = -Math.PI / 1.45;
    tip.position.set(0.16, 0.13, 0);
    g.add(tip);

    const sparks = new THREE.Group();
    for (let i = 0; i < 8; i++) {
      const sp = new THREE.Mesh(
        new THREE.SphereGeometry(0.015 + Math.random() * 0.015, 6, 6),
        new THREE.MeshBasicMaterial({ color: accent2, transparent: true, opacity: 0.85 })
      );
      sp.position.set(0.18, 0.16, 0);
      sp.userData = {
        vx: (Math.random() - 0.3) * 0.5,
        vy: Math.random() * 0.6 + 0.3,
        vz: (Math.random() - 0.5) * 0.4,
        life: Math.random()
      };
      sparks.add(sp);
    }
    g.add(sparks);
    g.userData.sparks = sparks;

    g.position.set(0.55, 0.85, 0.55);
    g.userData.animType = 'sparks';
    return g;
  }

  function propPapers(accent, accent2) {
    const g = new THREE.Group();
    const papers = [];
    for (let i = 0; i < 3; i++) {
      const paper = new THREE.Mesh(
        new THREE.PlaneGeometry(0.22, 0.28),
        new THREE.MeshStandardMaterial({
          color: accent, emissive: accent, emissiveIntensity: 0.6,
          transparent: true, opacity: 0.7,
          roughness: 0.4, metalness: 0.1, side: THREE.DoubleSide
        })
      );
      paper.position.set(i * 0.04 - 0.04, i * 0.05, 0);
      paper.rotation.y = (i - 1) * 0.3;
      paper.userData = { baseRotY: paper.rotation.y, idx: i };
      g.add(paper);
      papers.push(paper);
    }
    const stamp = new THREE.Mesh(
      new THREE.TorusGeometry(0.07, 0.012, 8, 24),
      glowMat(accent2, 1.2)
    );
    stamp.position.set(0.16, 0.16, 0.05);
    g.add(stamp);

    g.position.set(0.55, 0.85, 0.5);
    g.userData.animType = 'papers';
    g.userData.papers = papers;
    g.userData.stamp = stamp;
    return g;
  }

  function propToolOrbit(accent, accent2) {
    const g = new THREE.Group();
    const wrench = new THREE.Group();
    wrench.add(new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.025, 0.02), glowMat(accent, 0.9)));
    const wHead = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 0.02), glowMat(accent, 0.9));
    wHead.position.x = 0.09;
    wrench.add(wHead);

    const term = new THREE.Mesh(
      new THREE.BoxGeometry(0.14, 0.1, 0.02),
      glowMat(accent2, 0.9)
    );

    const chip = new THREE.Group();
    chip.add(new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 0.02), glowMat(accent, 0.9)));
    [-1, 1].forEach(s => {
      for (let i = 0; i < 3; i++) {
        const pin = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.025, 0.012), glowMat(accent2, 0.9));
        pin.position.set(s * 0.06, -0.04 + i * 0.04, 0);
        chip.add(pin);
      }
    });

    const items = [wrench, term, chip];
    items.forEach((item, i) => {
      const angle = (i / items.length) * Math.PI * 2;
      item.userData = { angle, radius: 0.35 };
      item.position.set(Math.cos(angle) * 0.35, 0, Math.sin(angle) * 0.35);
      g.add(item);
    });

    g.position.set(0.55, 0.85, 0.5);
    g.userData.animType = 'orbitWide';
    return g;
  }

  function propScroll(accent, accent2) {
    const g = new THREE.Group();
    const scroll = new THREE.Mesh(
      new THREE.PlaneGeometry(0.32, 0.24),
      new THREE.MeshStandardMaterial({
        color: accent, emissive: accent, emissiveIntensity: 0.55,
        transparent: true, opacity: 0.8,
        side: THREE.DoubleSide
      })
    );
    g.add(scroll);
    [-0.13, 0.13].forEach(y => {
      const rod = new THREE.Mesh(
        new THREE.CylinderGeometry(0.018, 0.018, 0.34, 8),
        glowMat(accent2, 0.7)
      );
      rod.rotation.z = Math.PI / 2;
      rod.position.y = y;
      g.add(rod);
    });

    const frags = new THREE.Group();
    for (let i = 0; i < 4; i++) {
      const frag = new THREE.Mesh(
        new THREE.PlaneGeometry(0.06, 0.06),
        new THREE.MeshBasicMaterial({
          color: accent2, transparent: true, opacity: 0.55, side: THREE.DoubleSide
        })
      );
      const angle = (i / 4) * Math.PI * 2;
      frag.userData = { angle, radius: 0.32 };
      frags.add(frag);
    }
    g.add(frags);
    g.userData.fragments = frags;

    g.position.set(0.55, 0.85, 0.5);
    g.userData.animType = 'scroll';
    return g;
  }

  function propCrest(accent, accent2) {
    const g = new THREE.Group();
    const medal = new THREE.Mesh(
      new THREE.CylinderGeometry(0.14, 0.14, 0.025, 24),
      mat(0x1a2233, { roughness: 0.35, metalness: 0.85 })
    );
    medal.rotation.x = Math.PI / 2;
    g.add(medal);
    const medalRim = new THREE.Mesh(
      new THREE.TorusGeometry(0.14, 0.012, 8, 32),
      glowMat(accent, 1.0)
    );
    medalRim.rotation.x = Math.PI / 2;
    g.add(medalRim);
    const gem = new THREE.Mesh(new THREE.OctahedronGeometry(0.05, 0), glowMat(accent2, 1.4));
    g.add(gem);

    const sats = new THREE.Group();
    for (let i = 0; i < 4; i++) {
      const sat = new THREE.Mesh(
        new THREE.BoxGeometry(0.07, 0.07, 0.015),
        glowMat(accent2, 0.85)
      );
      const angle = (i / 4) * Math.PI * 2;
      sat.userData = { angle, radius: 0.32 };
      sats.add(sat);
    }
    g.add(sats);
    g.userData.satellites = sats;
    g.userData.medallion = medal;

    g.position.set(0.55, 0.85, 0.55);
    g.userData.animType = 'crest';
    return g;
  }

  function propDataDeck(accent, accent2) {
    const g = new THREE.Group();
    const deck = new THREE.Mesh(
      new THREE.BoxGeometry(0.34, 0.12, 0.04),
      mat(0x0b1320, { roughness: 0.36, metalness: 0.55 })
    );
    g.add(deck);

    for (let i = 0; i < 4; i++) {
      const screen = new THREE.Mesh(
        new THREE.PlaneGeometry(0.18, 0.12),
        new THREE.MeshStandardMaterial({
          color: i % 2 ? accent : accent2,
          emissive: i % 2 ? accent : accent2,
          emissiveIntensity: 0.55,
          transparent: true,
          opacity: 0.58,
          side: THREE.DoubleSide
        })
      );
      screen.position.set((i - 1.5) * 0.095, 0.13 + i * 0.012, 0.03);
      screen.rotation.x = -0.32;
      screen.userData = { baseY: screen.position.y, seed: i };
      g.add(screen);
    }

    const graph = [];
    for (let i = 0; i < 5; i++) {
      const bar = new THREE.Mesh(new THREE.BoxGeometry(0.028, 0.05 + i * 0.018, 0.018), glowMat(i % 2 ? accent2 : accent, 0.8));
      bar.position.set(-0.12 + i * 0.06, -0.01 + i * 0.006, 0.05);
      bar.userData = { seed: i * 0.4 };
      g.add(bar);
      graph.push(bar);
    }

    g.position.set(0.55, 0.85, 0.52);
    g.userData.animType = 'deck';
    g.userData.graph = graph;
    return g;
  }

  function propSignalBurst(accent, accent2) {
    const g = new THREE.Group();
    const tower = new THREE.Mesh(
      new THREE.CylinderGeometry(0.035, 0.05, 0.34, 10),
      mat(0x0b1320, { roughness: 0.38, metalness: 0.62 })
    );
    g.add(tower);

    const tip = new THREE.Mesh(new THREE.SphereGeometry(0.055, 14, 10), glowMat(accent, 1.2));
    tip.position.y = 0.19;
    g.add(tip);

    const rings = [];
    for (let i = 0; i < 3; i++) {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(0.17 + i * 0.08, 0.006, 6, 32, Math.PI * 1.35),
        glowMat(i % 2 ? accent2 : accent, 0.78)
      );
      ring.position.y = 0.22 + i * 0.025;
      ring.rotation.x = Math.PI / 2;
      ring.rotation.z = -Math.PI * 0.17;
      ring.userData = { seed: i };
      g.add(ring);
      rings.push(ring);
    }

    g.position.set(0.55, 0.85, 0.54);
    g.userData.animType = 'signal';
    g.userData.rings = rings;
    return g;
  }

  function propCoffeeBook(accent, accent2) {
    const g = new THREE.Group();
    const mug = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.07, 0.13, 16),
      mat(accent, { roughness: 0.4, metalness: 0.2 })
    );
    g.add(mug);
    const coffee = new THREE.Mesh(
      new THREE.CircleGeometry(0.075, 16),
      mat(0x3a2014, { roughness: 0.6 })
    );
    coffee.rotation.x = -Math.PI / 2;
    coffee.position.y = 0.055;
    g.add(coffee);
    const handle = new THREE.Mesh(
      new THREE.TorusGeometry(0.035, 0.012, 8, 16, Math.PI),
      mat(accent, { roughness: 0.4 })
    );
    handle.rotation.y = Math.PI / 2;
    handle.position.x = 0.085;
    g.add(handle);

    const steam = new THREE.Group();
    for (let i = 0; i < 5; i++) {
      const p = new THREE.Mesh(
        new THREE.SphereGeometry(0.025, 8, 8),
        new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.4 })
      );
      p.userData = { seed: i * 0.7, baseY: 0.08 + i * 0.05 };
      p.position.set((Math.random() - 0.5) * 0.05, p.userData.baseY, 0);
      steam.add(p);
    }
    g.add(steam);
    g.userData.steam = steam;

    const book = new THREE.Group();
    book.position.set(-0.45, -0.05, -0.05);
    const cover = new THREE.Mesh(
      new THREE.BoxGeometry(0.22, 0.03, 0.16),
      mat(accent2, { roughness: 0.5 })
    );
    book.add(cover);
    const pages = new THREE.Mesh(
      new THREE.BoxGeometry(0.21, 0.04, 0.155),
      mat(0xeeeeee, { roughness: 0.7 })
    );
    pages.position.y = 0.005;
    book.add(pages);
    g.add(book);
    g.userData.book = book;

    g.position.set(0.55, 0.85, 0.55);
    g.userData.animType = 'coffee';
    return g;
  }

  function propMirror(accent, accent2) {
    const g = new THREE.Group();
    const shardMat = new THREE.MeshStandardMaterial({
      color: 0x0a0e16, emissive: accent, emissiveIntensity: 0.7,
      roughness: 0.1, metalness: 0.95, side: THREE.DoubleSide
    });
    const shape = new THREE.Shape();
    shape.moveTo(0, 0.15);
    shape.lineTo(0.1, 0.06);
    shape.lineTo(0.08, -0.1);
    shape.lineTo(-0.05, -0.12);
    shape.lineTo(-0.1, -0.02);
    shape.lineTo(-0.06, 0.1);
    shape.lineTo(0, 0.15);
    const shard = new THREE.Mesh(new THREE.ShapeGeometry(shape), shardMat);
    g.add(shard);

    const crackMat = glowMat(accent2, 1.2);
    [
      [[-0.03, 0.12], [0.04, -0.05]],
      [[0.05, 0.08], [-0.03, -0.08]],
      [[-0.07, 0.04], [0.07, 0.02]]
    ].forEach(([[x1, y1], [x2, y2]]) => {
      const dx = x2 - x1, dy = y2 - y1;
      const len = Math.sqrt(dx * dx + dy * dy);
      const crack = new THREE.Mesh(
        new THREE.BoxGeometry(len, 0.005, 0.005),
        crackMat
      );
      crack.position.set((x1 + x2) / 2, (y1 + y2) / 2, 0.005);
      crack.rotation.z = Math.atan2(dy, dx);
      g.add(crack);
    });

    const frags = new THREE.Group();
    for (let i = 0; i < 6; i++) {
      const dash = new THREE.Mesh(
        new THREE.BoxGeometry(0.035, 0.005, 0.005),
        new THREE.MeshBasicMaterial({
          color: i % 2 ? accent : accent2, transparent: true, opacity: 0.7
        })
      );
      const angle = (i / 6) * Math.PI * 2;
      dash.userData = { angle, radius: 0.28, drift: Math.random() * 0.4 };
      frags.add(dash);
    }
    g.add(frags);
    g.userData.fragments = frags;

    g.position.set(0.55, 0.85, 0.55);
    g.userData.animType = 'mirror';
    return g;
  }

  function propGlitchHex(accent, accent2) {
    const g = new THREE.Group();
    const hexShape = new THREE.Shape();
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      const x = Math.cos(a) * 0.16;
      const y = Math.sin(a) * 0.16;
      i === 0 ? hexShape.moveTo(x, y) : hexShape.lineTo(x, y);
    }
    const hex = new THREE.Mesh(
      new THREE.ShapeGeometry(hexShape),
      new THREE.MeshStandardMaterial({
        color: accent, emissive: accent, emissiveIntensity: 0.55,
        transparent: true, opacity: 0.5, side: THREE.DoubleSide
      })
    );
    g.add(hex);

    const lines = [];
    for (let i = 0; i < 4; i++) {
      const line = new THREE.Mesh(
        new THREE.BoxGeometry(0.24, 0.008, 0.008),
        new THREE.MeshBasicMaterial({ color: accent2, transparent: true, opacity: 0.5 })
      );
      line.position.y = -0.1 + i * 0.06;
      line.userData = { seed: i * 0.9 };
      g.add(line);
      lines.push(line);
    }

    g.position.set(0.55, 0.85, 0.55);
    g.userData.animType = 'glitch';
    g.userData.lines = lines;
    return g;
  }

  function addBlade(g, side, accent, y = 0.82, z = -0.36, length = 1.1) {
    const blade = new THREE.Mesh(
      new THREE.BoxGeometry(0.055, length, 0.035),
      glowMat(accent, 0.92)
    );
    blade.position.set(side * 0.42, y, z);
    blade.rotation.z = side * 0.32;
    blade.rotation.x = -0.18;
    g.add(blade);
    return blade;
  }

  function addPanel(g, side, accent, accent2, y = 0.92, z = -0.4) {
    const panel = new THREE.Mesh(
      new THREE.BoxGeometry(0.08, 0.72, 0.42),
      mat(0x07101a, { roughness: 0.38, metalness: 0.55 })
    );
    panel.position.set(side * 0.52, y, z);
    panel.rotation.z = side * 0.2;
    panel.rotation.y = side * 0.26;
    g.add(panel);

    const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.58, 0.025), glowMat(accent, 0.95));
    stripe.position.set(side * 0.525, y, z + 0.23);
    stripe.rotation.copy(panel.rotation);
    g.add(stripe);

    const cap = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.08, 0.48), glowMat(accent2, 0.5));
    cap.position.set(side * 0.52, y + 0.39, z);
    cap.rotation.copy(panel.rotation);
    g.add(cap);
  }

  function addHalo(g, accent, radius = 0.38, y = 1.92) {
    const halo = new THREE.Mesh(
      new THREE.TorusGeometry(radius, 0.012, 6, 56),
      glowMat(accent, 1.2)
    );
    halo.position.set(0, y, -0.04);
    halo.rotation.x = Math.PI / 2.6;
    g.add(halo);
    return halo;
  }

  function addBanner(g, accent, accent2, labelBars = 3) {
    const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 1.25, 8), glowMat(accent, 0.8));
    mast.position.set(-0.58, 0.88, -0.28);
    mast.rotation.z = -0.08;
    g.add(mast);
    for (let i = 0; i < labelBars; i++) {
      const bar = new THREE.Mesh(
        new THREE.BoxGeometry(0.36 - i * 0.04, 0.055, 0.025),
        glowMat(i % 2 ? accent2 : accent, 0.55)
      );
      bar.position.set(-0.44 + i * 0.015, 1.38 - i * 0.13, -0.28);
      bar.rotation.z = -0.08;
      g.add(bar);
    }
  }

  function addSignatureRig(g, type, accent, accent2) {
    const dark = 0x07101a;
    switch (type) {
      case 'protagonist':
        addHalo(g, accent, 0.34, 1.96);
        addBlade(g, -1, accent2, 0.86, -0.38, 0.9);
        addBlade(g, 1, accent, 0.86, -0.38, 0.9);
        break;
      case 'scientist':
        addHalo(g, accent2, 0.44, 1.88);
        [-1, 1].forEach(side => addPanel(g, side, accent, accent2, 0.98, -0.44));
        break;
      case 'engineer':
        [-1, 1].forEach(side => {
          const gauntlet = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.32, 0.2), glowMat(accent, 0.72));
          gauntlet.position.set(side * 0.68, 0.67, 0.28);
          gauntlet.rotation.z = side * 0.12;
          g.add(gauntlet);
        });
        addPanel(g, -1, accent2, accent, 0.78, -0.48);
        addPanel(g, 1, accent2, accent, 0.78, -0.48);
        break;
      case 'builder':
        addBanner(g, accent, accent2, 4);
        [-1, 1].forEach(side => {
          const tank = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.62, 14), mat(dark, { metalness: 0.6 }));
          tank.position.set(side * 0.27, 0.84, -0.48);
          tank.rotation.x = 0.12;
          g.add(tank);
        });
        break;
      case 'author':
        [-1, 1].forEach(side => addBlade(g, side, accent, 0.94, -0.42, 1.25));
        addHalo(g, accent2, 0.28, 1.84);
        break;
      case 'technician':
        for (let i = 0; i < 4; i++) {
          const side = i % 2 ? 1 : -1;
          const chip = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.18, 0.035), glowMat(i % 2 ? accent : accent2, 0.68));
          chip.position.set(side * (0.42 + i * 0.035), 0.72 + i * 0.18, -0.42);
          chip.rotation.z = side * (0.28 + i * 0.05);
          g.add(chip);
        }
        break;
      case 'archivist':
        addHalo(g, accent, 0.48, 1.72);
        addHalo(g, accent2, 0.26, 1.72);
        addBanner(g, accent2, accent, 2);
        break;
      case 'diplomat':
        {
          const shield = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.28, 0.08, 6), glowMat(accent, 0.6));
          shield.position.set(0.62, 0.86, 0.2);
          shield.rotation.x = Math.PI / 2;
          shield.rotation.z = Math.PI / 6;
          g.add(shield);
          addBanner(g, accent, accent2, 3);
        }
        break;
      case 'operator':
        addCapeFins(g, accent, accent2, 0.47);
        addPanel(g, -1, accent2, accent, 0.82, -0.5);
        break;
      case 'network':
        addCapeFins(g, accent2, accent, 0.5);
        addHalo(g, accent2, 0.42, 1.84);
        addBanner(g, accent, accent2, 3);
        break;
      case 'comms':
        addCapeFins(g, accent, accent2, 0.44);
        addHalo(g, accent, 0.32, 1.9);
        break;
      case 'civilian':
        {
          const controller = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.14, 0.1), glowMat(accent2, 0.55));
          controller.position.set(0, 0.58, 0.42);
          g.add(controller);
          addPanel(g, -1, accent, accent2, 0.75, -0.48);
        }
        break;
      case 'astakeria':
        [-1, 1].forEach(side => {
          addBlade(g, side, accent, 0.98, -0.5, 1.55);
          addBlade(g, side, accent2, 0.7, -0.58, 1.0);
        });
        addHalo(g, accent2, 0.5, 1.9);
        break;
      case 'unknown':
        for (let i = 0; i < 8; i++) {
          const cube = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 0.08), glowMat(i % 2 ? accent : accent2, 0.75));
          const a = (i / 8) * Math.PI * 2;
          cube.position.set(Math.cos(a) * 0.7, 0.55 + Math.sin(i) * 0.4, Math.sin(a) * 0.35);
          cube.rotation.set(a, a * 0.7, a * 0.4);
          g.add(cube);
        }
        break;
    }
  }

  // ============================================================
  //  CHARACTER BUILDERS — 11 total
  // ============================================================

  function commonBase(accent, accent2, options = {}) {
    const g = new THREE.Group();
    const coatColor = options.coatColor ?? 0x1a2233;
    const head = makeHead({
      accent,
      accent2,
      antenna: options.antenna,
      mask: options.mask,
      hood: options.hood,
      hair: options.hair,
      hairColor: options.hairColor,
      skin: options.skin,
      goggles: options.goggles
    });
    head.position.y = 1.65;
    g.add(head);

    const torso = makeTorso({
      accent, accent2, color: coatColor,
      height: options.torsoHeight ?? 1.0,
      glowStrip: options.glowStrip ?? true,
      collar: options.collar ?? true
    });
    torso.position.y = 0.92 + ((options.torsoHeight ?? 1.0) - 1.0) * 0.5;
    g.add(torso);
    g.add(makeHeroFrame({
      accent,
      accent2,
      coatColor,
      heavy: options.heavy,
      cloak: options.hood || options.mask
    }));

    if (options.tails !== false) {
      const tails = new THREE.Mesh(
        new THREE.CylinderGeometry(0.48, 0.38, 0.6, 6),
        mat(coatColor, { roughness: 0.55 })
      );
      tails.position.y = 0.12;
      g.add(tails);
    }

    if (options.pauldrons !== false) {
      g.add(makePauldron(-1, accent, coatColor));
      g.add(makePauldron(1, accent, coatColor));
    }

    const handColor = options.gloveColor ?? options.skin ?? accent;
    g.add(makeArm(-1, { coatColor, accent, length: options.armLength ?? 1, glove: handColor }));
    g.add(makeArm(1, { coatColor, accent, length: options.armLength ?? 1, glove: handColor }));
    g.add(makeLegs({ coatColor, accent, stance: options.stance ?? 1 }));
    g.add(makeArmorKit({
      accent,
      accent2,
      coatColor,
      armorColor: options.armorColor ?? 0xe8edf2,
      darkColor: options.darkColor ?? 0x0a0f18,
      heavy: options.heavy,
      asym: options.asym ?? 1,
      medical: options.medical
    }));
    g.add(makeGroundRing(accent));
    // v4.8.0 — particle field removed for calmer look

    g.userData.accent = accent;
    g.userData.accent2 = accent2;
    return g;
  }

  function buildProtagonist(accent, accent2) {
    const g = commonBase(accent, accent2, {
      coatColor: 0x1a2030,
      armorColor: 0xf2d16a, darkColor: 0x080b12,
      skin: 0xb77a57, hair: "sweep", hairColor: 0x111019
    });
    addBackModule(g, accent, accent2, { width: 0.38, height: 0.48, wings: false });
    addEnergyGauntlet(g, 1, accent, accent2, { shield: true });
    const prop = propKeycapOrbit(accent, accent2);
    g.add(prop);
    addSignatureRig(g, 'protagonist', accent, accent2);
    g.userData.prop = prop;
    return g;
  }

  function buildScientist(accent, accent2) {
    const g = commonBase(accent, accent2, {
      coatColor: 0x1a2233, antenna: true, torsoHeight: 1.05,
      armorColor: 0xeef7f5, darkColor: 0x0a1720, medical: true, asym: -1,
      skin: 0xa9785b, hair: "undercut", hairColor: accent2, goggles: true
    });
    addBackModule(g, accent, accent2, { width: 0.52, height: 0.68, medical: true });
    addEnergyGauntlet(g, -1, accent, accent2, { shield: true });
    addDrone(g, -1, accent, accent2, { y: 1.34, medical: true });
    addDrone(g, 1, accent2, accent, { y: 1.18, z: -0.08, medical: true });
    const prop = propMolecule(accent, accent2);
    g.add(prop);
    addSignatureRig(g, 'scientist', accent, accent2);
    g.userData.prop = prop;
    return g;
  }

  function buildEngineer(accent, accent2) {
    const g = commonBase(accent, accent2, {
      coatColor: 0x1e1820, gloveColor: accent, heavy: true, stance: 1.08,
      armorColor: 0xe4e8ed, darkColor: 0x160b10, asym: 1,
      skin: 0xc38b63, hair: "neat", hairColor: 0x1a1412
    });
    addBackModule(g, accent, accent2, { width: 0.58, height: 0.72, wings: true });
    addEnergyGauntlet(g, -1, accent, accent2, { large: true, shield: true });
    addEnergyGauntlet(g, 1, accent2, accent, { large: true });
    const prop = propTremorSensor(accent, accent2);
    g.add(prop);
    addSignatureRig(g, 'engineer', accent, accent2);
    g.userData.prop = prop;
    return g;
  }

  function buildBuilder(accent, accent2) {
    const g = commonBase(accent, accent2, {
      coatColor: 0x231a14, gloveColor: accent, heavy: true, stance: 1.12,
      armorColor: 0xf6b24d, darkColor: 0x140d08, asym: -1,
      skin: 0xd19a66, hair: "spikes", hairColor: 0x2b1b12, goggles: true
    });
    addBackModule(g, accent, accent2, { width: 0.5, height: 0.62, wings: false });
    addEnergyGauntlet(g, 1, accent, accent2, { large: true });
    const prop = propSolder(accent, accent2);
    g.add(prop);
    addSignatureRig(g, 'builder', accent, accent2);
    g.userData.prop = prop;
    return g;
  }

  function buildAuthor(accent, accent2) {
    const g = commonBase(accent, accent2, {
      coatColor: 0x1d1830, hood: true, torsoHeight: 1.1,
      armorColor: 0xd8cffb, darkColor: 0x100b1c, asym: 1,
      skin: 0xb9846a, hair: "bob", hairColor: 0x17101f
    });
    addBackModule(g, accent, accent2, { width: 0.42, height: 0.6, wings: true });
    addDrone(g, -1, accent2, accent, { y: 1.22, z: -0.12 });
    const prop = propPapers(accent, accent2);
    g.add(prop);
    addSignatureRig(g, 'author', accent, accent2);
    g.userData.prop = prop;
    return g;
  }

  function buildTechnician(accent, accent2) {
    const g = commonBase(accent, accent2, {
      coatColor: 0x142030, antenna: true, gloveColor: accent,
      armorColor: 0xd7fbff, darkColor: 0x071620, asym: -1,
      skin: 0xc98d68, hair: "undercut", hairColor: accent, goggles: true
    });
    addBackModule(g, accent, accent2, { width: 0.5, height: 0.64, wings: true });
    addEnergyGauntlet(g, -1, accent, accent2, { shield: true });
    const chest = new THREE.Mesh(
      new THREE.CylinderGeometry(0.32, 0.32, 0.06, 6),
      glowMat(accent2, 0.5)
    );
    chest.rotation.x = Math.PI / 2;
    chest.position.set(0, 1.0, 0.34);
    g.add(chest);

    const prop = propToolOrbit(accent, accent2);
    g.add(prop);
    addSignatureRig(g, 'technician', accent, accent2);
    g.userData.prop = prop;
    return g;
  }

  function buildArchivist(accent, accent2) {
    const g = commonBase(accent, accent2, {
      coatColor: 0x231a26, hood: true, torsoHeight: 1.08,
      armorColor: 0xf2b8d8, darkColor: 0x160d18, asym: 1,
      skin: 0xa97762, hair: "bob", hairColor: 0x1b1220
    });
    addBackModule(g, accent, accent2, { width: 0.42, height: 0.72, wings: false });
    const staff = new THREE.Mesh(
      new THREE.CylinderGeometry(0.025, 0.022, 1.6, 8),
      mat(0x2a1f30, { roughness: 0.6 })
    );
    staff.position.set(-0.6, 0.7, 0.1);
    staff.rotation.z = 0.18;
    g.add(staff);
    const staffTop = new THREE.Mesh(new THREE.SphereGeometry(0.07, 14, 14), glowMat(accent, 1.3));
    staffTop.position.set(-0.74, 1.45, 0.1);
    g.add(staffTop);

    const prop = propScroll(accent, accent2);
    g.add(prop);
    addSignatureRig(g, 'archivist', accent, accent2);
    g.userData.prop = prop;
    return g;
  }

  function buildDiplomat(accent, accent2) {
    const g = commonBase(accent, accent2, {
      coatColor: 0x2a3340, torsoHeight: 1.05, stance: 1.04,
      armorColor: 0xf0f4f8, darkColor: 0x111827, asym: -1,
      skin: 0xc79570, hair: "neat", hairColor: 0x17110d
    });
    addBackModule(g, accent, accent2, { width: 0.44, height: 0.56, wings: false });
    const sash = new THREE.Mesh(
      new THREE.BoxGeometry(0.08, 0.55, 0.04),
      glowMat(accent2, 0.7)
    );
    sash.position.set(0, 0.85, 0.34);
    g.add(sash);

    const prop = propCrest(accent, accent2);
    g.add(prop);
    addSignatureRig(g, 'diplomat', accent, accent2);
    g.userData.prop = prop;
    return g;
  }

  function buildOperator(accent, accent2) {
    const g = commonBase(accent, accent2, {
      coatColor: 0x162338, antenna: true, torsoHeight: 1.06, stance: 1.03,
      armorColor: 0xdbeafe, darkColor: 0x08111f, asym: 1,
      skin: 0xb98467, hair: "neat", hairColor: 0x101827, goggles: true
    });
    addBackModule(g, accent, accent2, { width: 0.46, height: 0.58, wings: true });
    addEnergyGauntlet(g, 1, accent, accent2, { shield: true });
    addBriefcaseDrone(g, accent, accent2);
    addHoloPanel(g, -1, accent, accent2, { x: 0.84, y: 1.08, z: 0.48, width: 0.38, height: 0.44, rows: 4 });
    const prop = propDataDeck(accent, accent2);
    g.add(prop);
    addSignatureRig(g, 'operator', accent, accent2);
    g.userData.prop = prop;
    return g;
  }

  function buildNetwork(accent, accent2) {
    const g = commonBase(accent, accent2, {
      coatColor: 0x263241, torsoHeight: 1.05, stance: 1.05,
      armorColor: 0xf3f4f6, darkColor: 0x0c1421, asym: -1,
      skin: 0xc79570, hair: "bun", hairColor: 0x17110d
    });
    addBackModule(g, accent2, accent, { width: 0.5, height: 0.58, wings: true });
    addEnergyGauntlet(g, -1, accent2, accent, { shield: true });
    addNetworkCrest(g, accent, accent2);
    const prop = propCrest(accent, accent2);
    g.add(prop);
    addSignatureRig(g, 'network', accent, accent2);
    g.userData.prop = prop;
    return g;
  }

  function buildComms(accent, accent2) {
    const g = commonBase(accent, accent2, {
      coatColor: 0x10251e, antenna: true, torsoHeight: 1.02,
      armorColor: 0xd8fff4, darkColor: 0x061512, asym: 1,
      skin: 0xb8795f, hair: "undercut", hairColor: 0x0b2f2a, goggles: true
    });
    addBackModule(g, accent, accent2, { width: 0.48, height: 0.62, wings: true });
    addSignalRig(g, accent, accent2);
    addEnergyGauntlet(g, -1, accent, accent2, { shield: true });
    addDrone(g, -1, accent, accent2, { y: 1.34, z: -0.04 });
    addDrone(g, 1, accent2, accent, { y: 1.15, z: -0.12 });
    const prop = propSignalBurst(accent, accent2);
    g.add(prop);
    addSignatureRig(g, 'comms', accent, accent2);
    g.userData.prop = prop;
    return g;
  }

  function buildCivilian(accent, accent2) {
    const g = commonBase(accent, accent2, {
      coatColor: 0x202836, skin: 0xbf8668, hair: "messy", hairColor: 0x211813,
      armorColor: 0xffd2a6, darkColor: 0x151922,
      pauldrons: false, glowStrip: false
    });
    addBackModule(g, accent, accent2, { width: 0.36, height: 0.48, wings: false });
    const phones = new THREE.Mesh(
      new THREE.TorusGeometry(0.31, 0.025, 8, 22, Math.PI),
      glowMat(accent, 0.8)
    );
    phones.position.set(0, 1.78, 0);
    phones.rotation.z = Math.PI;
    g.add(phones);
    [-1, 1].forEach(s => {
      const ear = new THREE.Mesh(
        new THREE.CylinderGeometry(0.06, 0.06, 0.03, 16),
        glowMat(accent, 0.85)
      );
      ear.position.set(s * 0.3, 1.58, 0);
      ear.rotation.z = Math.PI / 2;
      g.add(ear);
    });

    const prop = propCoffeeBook(accent, accent2);
    g.add(prop);
    addSignatureRig(g, 'civilian', accent, accent2);
    g.userData.prop = prop;
    return g;
  }

  function makeAstakeriaShard(accent, accent2, scale = 1) {
    const g = new THREE.Group();
    const shape = new THREE.Shape();
    shape.moveTo(0, 0.18 * scale);
    shape.lineTo(0.11 * scale, 0.06 * scale);
    shape.lineTo(0.07 * scale, -0.18 * scale);
    shape.lineTo(-0.08 * scale, -0.11 * scale);
    shape.lineTo(-0.12 * scale, 0.04 * scale);
    shape.lineTo(0, 0.18 * scale);

    const shard = new THREE.Mesh(
      new THREE.ExtrudeGeometry(shape, {
        depth: 0.024 * scale,
        bevelEnabled: true,
        bevelSize: 0.006 * scale,
        bevelThickness: 0.006 * scale,
        bevelSegments: 1
      }),
      new THREE.MeshStandardMaterial({
        color: 0x170811,
        emissive: accent,
        emissiveIntensity: 0.62,
        roughness: 0.16,
        metalness: 0.9,
        side: THREE.DoubleSide
      })
    );
    shard.geometry.center();
    g.add(shard);

    const cut = new THREE.Mesh(
      new THREE.BoxGeometry(0.015 * scale, 0.24 * scale, 0.012 * scale),
      glowMat(accent2, 1.1)
    );
    cut.rotation.z = 0.48;
    g.add(cut);
    return g;
  }

  function addAstakeriaCloak(g, accent, accent2) {
    const panelMat = new THREE.MeshStandardMaterial({
      color: 0x08050a,
      emissive: accent,
      emissiveIntensity: 0.045,
      roughness: 0.82,
      metalness: 0.08,
      transparent: true,
      opacity: 0.98,
      side: THREE.DoubleSide
    });
    const panels = [
      { x: 0, w: 0.72, h: 1.42, z: -0.34, ry: 0, rz: 0 },
      { x: -0.28, w: 0.48, h: 1.26, z: -0.31, ry: 0.28, rz: 0.12 },
      { x: 0.28, w: 0.48, h: 1.26, z: -0.31, ry: -0.28, rz: -0.12 },
      { x: -0.49, w: 0.28, h: 1.02, z: -0.25, ry: 0.48, rz: 0.22 },
      { x: 0.49, w: 0.28, h: 1.02, z: -0.25, ry: -0.48, rz: -0.22 }
    ];

    panels.forEach((p, index) => {
      const shape = new THREE.Shape();
      shape.moveTo(-p.w / 2, p.h / 2);
      shape.lineTo(p.w / 2, p.h / 2);
      shape.lineTo(p.w * (index % 2 ? 0.18 : 0.08), -p.h / 2);
      shape.lineTo(-p.w * (index % 2 ? 0.34 : 0.18), -p.h / 2 + 0.16);
      shape.lineTo(-p.w / 2, p.h / 2);
      const panel = new THREE.Mesh(new THREE.ShapeGeometry(shape), panelMat);
      panel.position.set(p.x, 0.58, p.z);
      panel.rotation.set(-0.04, p.ry, p.rz);
      g.add(panel);

      const seam = new THREE.Mesh(
        new THREE.BoxGeometry(0.018, p.h * 0.74, 0.012),
        glowMat(index % 2 ? accent2 : accent, 0.78)
      );
      seam.position.set(p.x * 0.72, 0.52, p.z + 0.015);
      seam.rotation.copy(panel.rotation);
      g.add(seam);
    });
  }

  function addAstakeriaShoulders(g, accent, accent2) {
    [-1, 1].forEach(side => {
      const pauldron = armorPlate(
        0.36,
        0.18,
        0.07,
        mat(0x0d0810, { roughness: 0.34, metalness: 0.76, emissive: accent, emissiveIntensity: 0.055 }),
        0.2
      );
      pauldron.position.set(side * 0.42, 1.26, 0.25);
      pauldron.rotation.set(-0.08, side * 0.16, side * -0.18);
      g.add(pauldron);

      const spike = new THREE.Mesh(
        new THREE.ConeGeometry(0.055, 0.34, 5),
        glowMat(side > 0 ? accent : accent2, 0.82)
      );
      spike.position.set(side * 0.66, 1.32, 0.22);
      spike.rotation.z = side > 0 ? -Math.PI / 2 : Math.PI / 2;
      spike.rotation.y = side * 0.2;
      g.add(spike);
    });
  }

  function addAstakeriaShardCloud(g, accent, accent2) {
    const shards = [];
    [
      { x: 0.62, y: 1.38, z: 0.18, s: 0.82, ry: -0.35 },
      { x: 0.84, y: 1.12, z: 0.02, s: 0.55, ry: 0.48 },
      { x: 0.78, y: 0.78, z: -0.08, s: 0.46, ry: -0.72 },
      { x: -0.66, y: 1.12, z: -0.08, s: 0.52, ry: 0.52 },
      { x: -0.78, y: 0.78, z: -0.12, s: 0.36, ry: -0.34 },
      { x: 0.1, y: 1.86, z: -0.18, s: 0.38, ry: 0.2 }
    ].forEach((spec, index) => {
      const shard = makeAstakeriaShard(accent, index % 2 ? accent : accent2, spec.s);
      shard.position.set(spec.x, spec.y, spec.z);
      shard.rotation.set(0.24 + index * 0.08, spec.ry, (index - 2) * 0.2);
      shard.userData = {
        baseY: spec.y,
        seed: index * 0.7,
        spin: index % 2 ? -1 : 1
      };
      g.add(shard);
      shards.push(shard);
    });
    g.userData.shards = shards;
  }

  function buildAstakeria(accent, accent2) {
    const g = new THREE.Group();
    const dark = mat(0x08050b, {
      roughness: 0.42,
      metalness: 0.45,
      emissive: accent,
      emissiveIntensity: 0.04
    });
    const armor = mat(0x190912, {
      roughness: 0.3,
      metalness: 0.72,
      emissive: accent,
      emissiveIntensity: 0.045
    });

    addAstakeriaCloak(g, accent, accent2);

    const head = makeHead({
      accent,
      accent2,
      mask: true,
      hood: true,
      hair: "none",
      skin: 0x6c2834
    });
    head.position.y = 1.66;
    head.scale.set(0.92, 1.02, 0.9);
    g.add(head);

    const hoodPeak = new THREE.Mesh(
      new THREE.ConeGeometry(0.22, 0.42, 5),
      mat(0x0d0710, { roughness: 0.72, metalness: 0.18, emissive: accent, emissiveIntensity: 0.08 })
    );
    hoodPeak.position.set(0, 1.9, -0.03);
    hoodPeak.rotation.x = -0.1;
    g.add(hoodPeak);

    const spine = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.31, 1.02, 8), dark);
    spine.position.set(0, 0.76, 0.02);
    spine.scale.z = 0.72;
    g.add(spine);

    const breast = armorPlate(0.48, 0.62, 0.075, armor, 0.18);
    breast.position.set(0, 0.98, 0.29);
    breast.rotation.x = -0.08;
    g.add(breast);

    const core = new THREE.Mesh(new THREE.CylinderGeometry(0.062, 0.062, 0.024, 28), glowMat(accent2, 1.35));
    core.position.set(0, 1.0, 0.35);
    core.rotation.x = Math.PI / 2;
    g.add(core);

    [-0.18, 0.18].forEach((x, index) => {
      const slash = new THREE.Mesh(new THREE.BoxGeometry(0.018, 0.58, 0.014), glowMat(index ? accent2 : accent, 0.88));
      slash.position.set(x, 0.72, 0.35);
      slash.rotation.z = x < 0 ? -0.12 : 0.12;
      g.add(slash);
    });

    const belt = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.065, 0.16), glowMat(accent, 0.48));
    belt.position.set(0, 0.36, 0.12);
    g.add(belt);

    g.add(makeArm(-1, { coatColor: 0x0b0710, accent, glove: accent2, length: 1.06 }));
    g.add(makeArm(1, { coatColor: 0x0b0710, accent, glove: accent, length: 1.06 }));
    g.add(makeLegs({ coatColor: 0x0b0710, accent, stance: 0.9 }));
    addAstakeriaShoulders(g, accent, accent2);

    const spineBlade = new THREE.Mesh(new THREE.BoxGeometry(0.055, 1.32, 0.035), glowMat(accent, 0.82));
    spineBlade.position.set(0, 0.88, -0.48);
    g.add(spineBlade);

    addHalo(g, accent2, 0.48, 1.92);
    addHalo(g, accent, 0.3, 1.87);
    addAstakeriaShardCloud(g, accent, accent2);
    g.add(makeGroundRing(accent));

    const prop = propMirror(accent, accent2);
    prop.position.set(0.58, 1.02, 0.42);
    g.add(prop);
    g.userData.prop = prop;
    g.userData.accent = accent;
    g.userData.accent2 = accent2;
    return g;
  }

  function buildUnknown(accent, accent2) {
    const g = commonBase(accent, accent2, {
      coatColor: 0x252830, mask: true,
      armorColor: 0x596070, darkColor: 0x0a0c10,
      collar: false, glowStrip: false, hair: "none"
    });
    const prop = propGlitchHex(accent, accent2);
    g.add(prop);
    addSignatureRig(g, 'unknown', accent, accent2);
    g.userData.prop = prop;
    g.userData.isGlitchy = true;
    return g;
  }

  const BUILDERS = {
    protagonist: buildProtagonist, scientist: buildScientist, engineer: buildEngineer,
    builder: buildBuilder, author: buildAuthor, technician: buildTechnician,
    archivist: buildArchivist, diplomat: buildDiplomat, operator: buildOperator,
    network: buildNetwork, comms: buildComms, civilian: buildCivilian,
    astakeria: buildAstakeria, unknown: buildUnknown
  };

  // ============================================================
  //  setCharacter
  // ============================================================
  // ============================================================
  //  FIGURE MOUNTING + GLB MODEL LOADING (v5.x)
  //  Primitive builders are the baseline AND the fallback. If a
  //  hero has a `model` GLB url, it loads async and swaps in,
  //  reusing the same lighting / idle / hover system. No model,
  //  or a load failure, leaves the primitive figure in place.
  //  Drop sculpted GLBs in assets/models/ and set hero.model.
  // ============================================================
  const GLTF_LOADER_URL = 'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/jsm/loaders/GLTFLoader.js';
  let loaderPromise = null;
  let loadToken = 0;

  function getLoader() {
    if (!loaderPromise) {
      loaderPromise = import(/* @vite-ignore */ GLTF_LOADER_URL)
        .then(m => new m.GLTFLoader())
        .catch(err => { console.warn('[stage] GLTFLoader unavailable, using primitives', err); return null; });
    }
    return loaderPromise;
  }

  function disposeFigure() {
    if (!currentFigure) return;
    scene.remove(currentFigure);
    currentFigure.traverse(o => {
      if (o.geometry) o.geometry.dispose();
      if (o.material) {
        if (Array.isArray(o.material)) o.material.forEach(m => m.dispose());
        else o.material.dispose();
      }
    });
    currentFigure = null;
  }

  // install a group as the active figure with the hero stance + entrance
  function mountFigure(group) {
    disposeFigure();
    currentFigure = group;
    const layout = getFigureLayout();
    currentFigure.position.set(layout.x, 0, 0);
    scene.add(currentFigure);

    const restY = 0.12; // slight 3/4 hero stance instead of dead-on flat
    currentFigure.scale.setScalar(layout.scale * 0.91);
    currentFigure.rotation.y = -0.5;
    if (window.gsap) {
      gsap.to(currentFigure.scale,    { x: layout.scale, y: layout.scale, z: layout.scale, duration: 0.55, ease: 'back.out(1.7)' });
      gsap.to(currentFigure.rotation, { y: restY,        duration: 0.6,  ease: 'power3.out' });
    } else {
      currentFigure.scale.setScalar(layout.scale);
      currentFigure.rotation.y = restY;
    }
    currentFigure.userData.restRotY = restY;
  }

  // center a loaded model and drop its feet onto the ground disk
  function normalizeModel(root) {
    const box = new THREE.Box3().setFromObject(root);
    const size = new THREE.Vector3(); box.getSize(size);
    const center = new THREE.Vector3(); box.getCenter(center);
    const targetH = 1.9;
    const s = size.y > 0.0001 ? targetH / size.y : 1;
    root.scale.multiplyScalar(s);
    root.position.x -= center.x * s;
    root.position.z -= center.z * s;
    root.position.y -= box.min.y * s + 0.65;
  }

  async function loadModel(url) {
    try {
      const loader = await getLoader();
      if (!loader) return null;
      const gltf = await loader.loadAsync(url);
      const root = gltf.scene || (gltf.scenes && gltf.scenes[0]);
      if (!root) return null;
      const wrap = new THREE.Group();
      wrap.add(root);
      normalizeModel(root);
      // play a rigged idle clip if the model ships with one
      if (gltf.animations && gltf.animations.length) {
        const mixer = new THREE.AnimationMixer(root);
        mixer.clipAction(gltf.animations[0]).play();
        wrap.userData.mixer = mixer;
      }
      return wrap;
    } catch (err) {
      console.warn('[stage] model load failed:', url, err);
      return null;
    }
  }

  function setCharacter(figureKey, accentHex, accent2Hex, modelUrl) {
    const accent  = new THREE.Color(accentHex).getHex();
    const accent2 = new THREE.Color(accent2Hex).getHex();

    rimLight.color.setHex(accent);
    accentLight.color.setHex(accent);
    fillLight.color.setHex(accent2);

    const token = ++loadToken;

    // baseline: primitive figure shows instantly
    const builder = BUILDERS[figureKey] || BUILDERS.protagonist;
    mountFigure(builder(accent, accent2));

    // upgrade to a sculpted GLB if the hero provides one
    if (modelUrl) {
      loadModel(modelUrl).then(model => {
        if (!model || token !== loadToken) return; // failed, or hero already switched
        mountFigure(model);
      });
    }
  }

  // ============================================================
  //  tick loop (v4.8.0 — calm. no mouse follow, no particles)
  // ============================================================
  let t = 0;
  function tick(dt) {
    t += dt;

    if (currentFigure) {
      currentFigure.userData?.mixer?.update(dt);
      currentFigure.position.y = (currentFigure.userData.baseY ?? 0) + Math.sin(t * 1.05) * 0.035;
      currentFigure.rotation.y = (currentFigure.userData.restRotY ?? 0) + Math.sin(t * 0.42) * 0.11;
      currentFigure.rotation.z = Math.sin(t * 0.36) * 0.018;

      const head = currentFigure.children[0];
      if (head && head.scale) {
        head.scale.y = 1 + Math.sin(t * 1.8) * 0.012;
        head.rotation.y = Math.sin(t * 0.9) * 0.08;
      }

      const prop = currentFigure.userData?.prop;
      if (prop) animateProp(prop, t, dt);

      currentFigure.userData?.drones?.forEach((drone, i) => {
        drone.position.y = drone.userData.baseY + Math.sin(t * (1.25 + i * 0.08) + i * 1.4) * 0.055;
        drone.rotation.y = t * 0.8 * (drone.userData.side || 1);
        drone.rotation.z = Math.sin(t * 1.2 + i) * 0.08;
      });

      currentFigure.userData?.holos?.forEach((holo, i) => {
        holo.position.y = holo.userData.baseY + Math.sin(t * 0.9 + i * 0.7) * 0.025;
        holo.rotation.y = (holo.userData.baseRotY ?? holo.rotation.y) + Math.sin(t * 0.5 + i) * 0.018;
      });

      currentFigure.userData?.shards?.forEach((shard, i) => {
        shard.position.y = shard.userData.baseY + Math.sin(t * 0.9 + shard.userData.seed) * 0.035;
        shard.rotation.y += dt * 0.28 * shard.userData.spin;
        shard.rotation.z += dt * 0.08 * (i % 2 ? -1 : 1);
      });
    }

    renderer.render(scene, camera);
  }

  function animateProp(prop, t, _dt) {
    // v4.8.0 — calm. Every prop drifts together at the same slow tempo.
    // Identity comes from the prop's *form*, not its motion.
    prop.position.y = 0.85 + Math.sin(t * 0.85) * 0.035;
    prop.rotation.y = t * 0.16;

    // A few props get one tiny accent so the silhouette isn't 100% inert.
    // Everything else stays still.
    const type = prop.userData?.animType;
    switch (type) {
      case 'orbit':
      case 'orbitWide':
        prop.children.forEach(child => {
          if (!child.userData || child.userData.angle == null) return;
          const speed = type === 'orbitWide' ? 0.55 : 0.9;
          const a = child.userData.angle + t * speed;
          const r = child.userData.radius || 0.35;
          child.position.x = Math.cos(a) * r;
          child.position.z = Math.sin(a) * r;
          child.rotation.y = -a;
        });
        break;

      case 'spin':
        // Molecule turns slowly — sells "research" identity quietly.
        prop.rotation.y = t * 0.65;
        break;

      case 'pulse':
        // LED breathes very softly. No waveform jitter.
        if (prop.userData?.pulseLed?.material) {
          prop.userData.pulseLed.material.emissiveIntensity = 1.1 + Math.sin(t * 2.8) * 0.35;
        }
        prop.userData?.waveBars?.forEach((bar, i) => {
          bar.scale.y = 0.6 + Math.abs(Math.sin(t * 3 + i * 0.6)) * 1.8;
        });
        break;

      case 'crest':
        // Medallion turns slowly. No satellite orbit.
        if (prop.userData?.medallion) {
          prop.userData.medallion.rotation.z = t * 0.45;
        }
        break;

      case 'deck':
        prop.userData?.graph?.forEach((bar, i) => {
          bar.scale.y = 0.75 + Math.abs(Math.sin(t * 1.8 + i * 0.4)) * 0.45;
        });
        prop.children.forEach(child => {
          if (child.userData?.baseY != null) {
            child.position.y = child.userData.baseY + Math.sin(t * 1.2 + child.userData.seed) * 0.014;
          }
        });
        break;

      case 'signal':
        prop.userData?.rings?.forEach((ring, i) => {
          ring.material.emissiveIntensity = 0.58 + Math.abs(Math.sin(t * 1.7 + i)) * 0.42;
          ring.scale.setScalar(0.92 + Math.sin(t * 1.3 + i) * 0.05);
        });
        break;

      case 'sparks':
        prop.userData?.sparks?.children.forEach((spark, i) => {
          spark.position.x += spark.userData.vx * 0.018;
          spark.position.y += spark.userData.vy * 0.018;
          spark.position.z += spark.userData.vz * 0.018;
          spark.material.opacity = 0.25 + Math.abs(Math.sin(t * 2 + i)) * 0.6;
          if (spark.position.y > 0.45) spark.position.set(0.18, 0.16, 0);
        });
        break;

      case 'papers':
        prop.userData?.papers?.forEach((paper, i) => {
          paper.rotation.y = paper.userData.baseRotY + Math.sin(t * 1.1 + i) * 0.18;
          paper.position.y = i * 0.05 + Math.sin(t * 1.4 + i) * 0.018;
        });
        break;

      case 'scroll':
      case 'mirror':
      case 'glitch':
        prop.rotation.z = Math.sin(t * 0.9) * 0.08;
        break;
    }
  }

  return {
    tick, setCharacter, resize,
    get camera() { return camera; },
    get scene()  { return scene; }
  };
}
