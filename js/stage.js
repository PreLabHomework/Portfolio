// ============================================================
//  STAGE — Three.js per-character figures (v3)
//  Realistic-leaning proportions, unique silhouettes per role.
//  Each figure built from scratch with character-defining gear.
// ============================================================

import * as THREE from 'three';

export function createStage(canvas) {
  const renderer = new THREE.WebGLRenderer({
    canvas, antialias: true, alpha: true, powerPreference: 'high-performance'
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
  camera.position.set(0, 1.0, 6.4);
  camera.lookAt(0, 0.6, 0);

  // ─── lighting — three-point cinematic, slightly warm ───
  const ambient = new THREE.AmbientLight(0xffffff, 0.18);
  scene.add(ambient);

  const keyLight = new THREE.DirectionalLight(0xffffff, 1.6);
  keyLight.position.set(3.4, 4, 3.4);
  scene.add(keyLight);

  const rimLight = new THREE.DirectionalLight(0xffd166, 1.1);
  rimLight.position.set(-3.5, 2.6, -2.8);
  scene.add(rimLight);

  const fillLight = new THREE.PointLight(0xef476f, 0.55, 10);
  fillLight.position.set(-2, 0.6, 2);
  scene.add(fillLight);

  const accentLight = new THREE.PointLight(0xffd166, 0.6, 8);
  accentLight.position.set(2, 0.4, 1);
  scene.add(accentLight);

  // ground plate — subtle disk for figures to "stand on"
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

  // figure root — what we swap in/out per character
  let currentFigure = null;
  let currentAccent = 0xffd166;
  let currentAccent2 = 0xef476f;
  let lookYaw = 0;
  let lookPitch = 0;
  let mouseX = 0;
  let mouseY = 0;

  function resize() {
    const r = canvas.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) return;
    renderer.setSize(r.width, r.height, false);
    camera.aspect = r.width / r.height;
    camera.updateProjectionMatrix();
  }
  resize();

  // mouse follow — figure subtly tracks cursor
  document.getElementById('app').addEventListener('mousemove', e => {
    const r = canvas.getBoundingClientRect();
    mouseX = ((e.clientX - r.left) / r.width) * 2 - 1;
    mouseY = ((e.clientY - r.top) / r.height) * 2 - 1;
  });

  // ─── reusable geometry helpers ───
  // Smoother capsule-style limb: rounded cylinder
  function makeLimb(radius, length, color, segs = 12) {
    const geo = new THREE.CylinderGeometry(radius * 0.85, radius, length, segs, 1, false);
    const mat = new THREE.MeshStandardMaterial({
      color, roughness: 0.55, metalness: 0.2
    });
    const m = new THREE.Mesh(geo, mat);
    return m;
  }

  function makeJoint(radius, color) {
    const geo = new THREE.SphereGeometry(radius, 16, 12);
    const mat = new THREE.MeshStandardMaterial({
      color, roughness: 0.5, metalness: 0.25
    });
    return new THREE.Mesh(geo, mat);
  }

  function makeTorso({ shoulderW, hipW, height, color, taper = 1 }) {
    // tapered box-like torso using extruded shape for a more humanoid V
    const shape = new THREE.Shape();
    const sw = shoulderW / 2;
    const hw = (hipW * taper) / 2;
    shape.moveTo(-sw, height / 2);
    shape.lineTo(sw, height / 2);
    shape.lineTo(hw, -height / 2);
    shape.lineTo(-hw, -height / 2);
    shape.lineTo(-sw, height / 2);
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: shoulderW * 0.55, bevelEnabled: true,
      bevelSize: 0.03, bevelThickness: 0.04, bevelSegments: 3, steps: 1
    });
    geo.translate(0, 0, -shoulderW * 0.275);
    const mat = new THREE.MeshStandardMaterial({
      color, roughness: 0.5, metalness: 0.25
    });
    return new THREE.Mesh(geo, mat);
  }

  function makeHead(radius, color, accent) {
    const g = new THREE.Group();
    const skull = new THREE.Mesh(
      new THREE.SphereGeometry(radius, 18, 14),
      new THREE.MeshStandardMaterial({ color, roughness: 0.45, metalness: 0.3 })
    );
    skull.scale.set(0.95, 1.05, 0.95);
    g.add(skull);

    // visor band — accent-colored, gives every character a "face"
    const visor = new THREE.Mesh(
      new THREE.TorusGeometry(radius * 0.85, radius * 0.13, 8, 24, Math.PI),
      new THREE.MeshStandardMaterial({
        color: accent, emissive: accent, emissiveIntensity: 1.4,
        roughness: 0.2, metalness: 0.6
      })
    );
    visor.rotation.x = Math.PI / 2;
    visor.rotation.y = Math.PI;
    visor.position.set(0, radius * 0.05, radius * 0.6);
    g.add(visor);

    return g;
  }

  // bend leg/arm into a slight, natural pose with a knee/elbow joint
  function makeArticulatedLimb({ upperLen, lowerLen, radius, color, bend = 0.15 }) {
    const g = new THREE.Group();
    const upper = makeLimb(radius, upperLen, color);
    upper.position.y = -upperLen / 2;
    g.add(upper);

    const elbow = makeJoint(radius * 1.05, color);
    elbow.position.y = -upperLen;
    g.add(elbow);

    const lowerGroup = new THREE.Group();
    lowerGroup.position.y = -upperLen;
    lowerGroup.rotation.x = bend;
    const lower = makeLimb(radius * 0.85, lowerLen, color);
    lower.position.y = -lowerLen / 2;
    lowerGroup.add(lower);
    g.add(lowerGroup);

    g.userData = { upper, elbow, lower, lowerGroup };
    return g;
  }

  // ─── CHARACTER BUILDERS ─────────────────────────────────
  // Each builder returns a group with its own silhouette.

  function buildProtagonist(accent, accent2) {
    // hero proportions, balanced confident pose, scarf for silhouette
    const g = new THREE.Group();
    const skin = 0x2a3344;
    const trim = accent;

    g.add(positioned(makeHead(0.32, skin, accent), 0, 1.55, 0));

    const torso = makeTorso({ shoulderW: 1.05, hipW: 0.65, height: 0.95, color: skin });
    torso.position.y = 0.85;
    g.add(torso);

    // chest emblem
    const emblem = new THREE.Mesh(
      new THREE.RingGeometry(0.06, 0.13, 5),
      new THREE.MeshStandardMaterial({
        color: accent, emissive: accent, emissiveIntensity: 1.2, roughness: 0.3
      })
    );
    emblem.rotation.x = Math.PI / 2;
    emblem.position.set(0, 0.95, 0.3);
    emblem.rotation.z = Math.PI;
    g.add(emblem);

    // shoulder pads (define silhouette)
    [-0.55, 0.55].forEach(x => {
      const pad = new THREE.Mesh(
        new THREE.SphereGeometry(0.16, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2),
        new THREE.MeshStandardMaterial({ color: trim, roughness: 0.4, metalness: 0.5 })
      );
      pad.position.set(x, 1.28, 0);
      g.add(pad);
    });

    // arms — confident forward stance
    const armL = makeArticulatedLimb({ upperLen: 0.45, lowerLen: 0.42, radius: 0.09, color: skin, bend: 0.4 });
    armL.position.set(-0.55, 1.25, 0);
    armL.rotation.x = 0.15;
    armL.rotation.z = 0.1;
    g.add(armL);

    const armR = makeArticulatedLimb({ upperLen: 0.45, lowerLen: 0.42, radius: 0.09, color: skin, bend: 0.55 });
    armR.position.set(0.55, 1.25, 0);
    armR.rotation.x = 0.25;
    armR.rotation.z = -0.12;
    g.add(armR);

    // legs — slight stance
    addLegs(g, skin, accent, 0.085, 0.5, 0.46, 0.2);

    // scarf (defining silhouette)
    const scarfMat = new THREE.MeshStandardMaterial({
      color: accent2, roughness: 0.7, side: THREE.DoubleSide
    });
    const scarf = new THREE.Mesh(
      new THREE.PlaneGeometry(0.38, 0.55, 1, 6),
      scarfMat
    );
    scarf.position.set(0.05, 1.18, 0.18);
    scarf.rotation.set(0.2, -0.1, -0.15);
    g.add(scarf);
    g.userData.scarf = scarf;

    return g;
  }

  function buildScientist(accent, accent2) {
    // tall thin frame, lab coat tails, instrument case under arm
    const g = new THREE.Group();
    const coat = 0x3a4358;
    const skin = 0x2a3344;

    g.add(positioned(makeHead(0.28, skin, accent), 0, 1.62, 0));

    // lab coat — taller, narrower
    const torso = makeTorso({ shoulderW: 0.85, hipW: 0.55, height: 0.95, color: coat });
    torso.position.y = 0.92;
    g.add(torso);

    // coat tails — extend below torso for silhouette
    const tail = new THREE.Mesh(
      new THREE.BoxGeometry(0.65, 0.55, 0.2),
      new THREE.MeshStandardMaterial({ color: coat, roughness: 0.6 })
    );
    tail.position.set(0, 0.18, -0.05);
    g.add(tail);

    // collar lapels
    const lapelMat = new THREE.MeshStandardMaterial({
      color: accent, emissive: accent, emissiveIntensity: 0.6, roughness: 0.4
    });
    [[-0.18, 0.04], [0.18, 0.04]].forEach(([x, z]) => {
      const lapel = new THREE.Mesh(
        new THREE.BoxGeometry(0.1, 0.4, 0.04),
        lapelMat
      );
      lapel.position.set(x, 1.12, 0.31 + z);
      lapel.rotation.z = x > 0 ? -0.12 : 0.12;
      g.add(lapel);
    });

    // arms — one holding instrument case
    const armL = makeArticulatedLimb({ upperLen: 0.46, lowerLen: 0.42, radius: 0.075, color: coat, bend: 0.9 });
    armL.position.set(-0.45, 1.32, 0);
    armL.rotation.x = 0.5;
    g.add(armL);

    const armR = makeArticulatedLimb({ upperLen: 0.46, lowerLen: 0.42, radius: 0.075, color: coat, bend: 0.5 });
    armR.position.set(0.45, 1.32, 0);
    armR.rotation.x = 0.2;
    armR.rotation.z = -0.15;
    g.add(armR);

    // instrument case — clipboard / tablet
    const tablet = new THREE.Mesh(
      new THREE.BoxGeometry(0.35, 0.45, 0.04),
      new THREE.MeshStandardMaterial({
        color: 0x1a2233, emissive: accent, emissiveIntensity: 0.3, roughness: 0.3, metalness: 0.7
      })
    );
    tablet.position.set(-0.45, 0.52, 0.15);
    tablet.rotation.x = 0.4;
    g.add(tablet);

    addLegs(g, coat, accent, 0.075, 0.52, 0.45, 0.12);

    return g;
  }

  function buildEngineer(accent, accent2) {
    // broad shoulders, low stance, bracer with the device, tank-class
    const g = new THREE.Group();
    const armor = 0x2a3344;
    const accentMat = accent;

    g.add(positioned(makeHead(0.34, armor, accent), 0, 1.46, 0));

    // broader shoulders, lower torso
    const torso = makeTorso({ shoulderW: 1.25, hipW: 0.85, height: 0.85, color: armor });
    torso.position.y = 0.78;
    g.add(torso);

    // chest plate accent
    const chestPlate = new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 0.4, 0.06),
      new THREE.MeshStandardMaterial({
        color: accentMat, emissive: accentMat, emissiveIntensity: 0.7,
        roughness: 0.3, metalness: 0.7
      })
    );
    chestPlate.position.set(0, 0.9, 0.34);
    g.add(chestPlate);

    // big shoulder pauldrons — defining silhouette
    [-0.7, 0.7].forEach(x => {
      const pauldron = new THREE.Mesh(
        new THREE.SphereGeometry(0.22, 14, 10, 0, Math.PI * 2, 0, Math.PI / 2),
        new THREE.MeshStandardMaterial({
          color: armor, roughness: 0.4, metalness: 0.6
        })
      );
      pauldron.position.set(x, 1.16, 0);
      g.add(pauldron);
      // rim accent
      const rim = new THREE.Mesh(
        new THREE.TorusGeometry(0.21, 0.025, 6, 16),
        new THREE.MeshStandardMaterial({
          color: accentMat, emissive: accentMat, emissiveIntensity: 1
        })
      );
      rim.position.set(x, 1.18, 0);
      rim.rotation.x = Math.PI / 2;
      g.add(rim);
    });

    // arms — wider
    const armL = makeArticulatedLimb({ upperLen: 0.48, lowerLen: 0.46, radius: 0.11, color: armor, bend: 0.4 });
    armL.position.set(-0.7, 1.16, 0);
    armL.rotation.x = 0.15;
    g.add(armL);

    const armR = makeArticulatedLimb({ upperLen: 0.48, lowerLen: 0.46, radius: 0.11, color: armor, bend: 0.5 });
    armR.position.set(0.7, 1.16, 0);
    armR.rotation.x = 0.18;
    g.add(armR);

    // forearm bracer — the tremor stabilization device
    const bracer = new THREE.Group();
    const bracerBody = new THREE.Mesh(
      new THREE.CylinderGeometry(0.13, 0.13, 0.32, 12),
      new THREE.MeshStandardMaterial({ color: 0x141a26, roughness: 0.4, metalness: 0.7 })
    );
    bracer.add(bracerBody);
    // device readout panel
    const panel = new THREE.Mesh(
      new THREE.BoxGeometry(0.16, 0.2, 0.02),
      new THREE.MeshStandardMaterial({
        color: accentMat, emissive: accentMat, emissiveIntensity: 1.3,
        roughness: 0.2
      })
    );
    panel.position.set(0, 0, 0.12);
    bracer.add(panel);
    bracer.position.set(-0.7, 0.7, 0.05);
    bracer.rotation.x = 0.4;
    g.add(bracer);
    g.userData.bracer = bracer;

    // wider stance legs
    addLegs(g, armor, accentMat, 0.11, 0.5, 0.46, 0.32);

    return g;
  }

  function buildBuilder(accent, accent2) {
    // compact, multi-tool belt, apron, hands forward
    const g = new THREE.Group();
    const apron = 0x3a3023;
    const skin = 0x2a3344;

    g.add(positioned(makeHead(0.3, skin, accent), 0, 1.5, 0));

    const torso = makeTorso({ shoulderW: 0.95, hipW: 0.7, height: 0.9, color: skin });
    torso.position.y = 0.82;
    g.add(torso);

    // apron — front-only flat panel
    const apronMesh = new THREE.Mesh(
      new THREE.BoxGeometry(0.7, 0.85, 0.04),
      new THREE.MeshStandardMaterial({ color: apron, roughness: 0.85 })
    );
    apronMesh.position.set(0, 0.78, 0.32);
    g.add(apronMesh);

    // tool belt — accent strip
    const belt = new THREE.Mesh(
      new THREE.BoxGeometry(0.85, 0.12, 0.45),
      new THREE.MeshStandardMaterial({
        color: accent, emissive: accent, emissiveIntensity: 0.6, roughness: 0.4
      })
    );
    belt.position.set(0, 0.42, 0);
    g.add(belt);

    // tool pouches on belt
    [-0.3, 0, 0.3].forEach(x => {
      const pouch = new THREE.Mesh(
        new THREE.BoxGeometry(0.13, 0.18, 0.12),
        new THREE.MeshStandardMaterial({ color: 0x141a26, roughness: 0.7 })
      );
      pouch.position.set(x, 0.32, 0.27);
      g.add(pouch);
    });

    // arms forward, holding something
    const armL = makeArticulatedLimb({ upperLen: 0.42, lowerLen: 0.4, radius: 0.085, color: skin, bend: 1.2 });
    armL.position.set(-0.5, 1.2, 0);
    armL.rotation.x = 0.7;
    armL.rotation.z = 0.15;
    g.add(armL);

    const armR = makeArticulatedLimb({ upperLen: 0.42, lowerLen: 0.4, radius: 0.085, color: skin, bend: 1.2 });
    armR.position.set(0.5, 1.2, 0);
    armR.rotation.x = 0.7;
    armR.rotation.z = -0.15;
    g.add(armR);

    addLegs(g, skin, accent, 0.09, 0.5, 0.46, 0.18);

    return g;
  }

  function buildAuthor(accent, accent2) {
    // robed, hood-like collar, holding a book/tablet
    const g = new THREE.Group();
    const robe = 0x3a2d4a;
    const skin = 0x2a3344;

    g.add(positioned(makeHead(0.29, skin, accent), 0, 1.55, 0));

    // robe torso — wider at hips for flowing look
    const torso = makeTorso({ shoulderW: 0.9, hipW: 0.95, height: 1, color: robe, taper: 1.4 });
    torso.position.y = 0.85;
    g.add(torso);

    // robe lower — extends down past torso
    const robeLow = new THREE.Mesh(
      new THREE.CylinderGeometry(0.55, 0.7, 0.65, 16, 1, false),
      new THREE.MeshStandardMaterial({ color: robe, roughness: 0.7 })
    );
    robeLow.position.y = 0.0;
    g.add(robeLow);

    // hood collar — peaked behind head
    const hood = new THREE.Mesh(
      new THREE.SphereGeometry(0.42, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2),
      new THREE.MeshStandardMaterial({ color: robe, roughness: 0.7 })
    );
    hood.position.set(0, 1.42, -0.18);
    hood.scale.set(1, 1.2, 1);
    g.add(hood);

    // glowing accent stripe down robe front
    const stripe = new THREE.Mesh(
      new THREE.BoxGeometry(0.06, 1.2, 0.04),
      new THREE.MeshStandardMaterial({
        color: accent, emissive: accent, emissiveIntensity: 1.3, roughness: 0.3
      })
    );
    stripe.position.set(0, 0.7, 0.46);
    g.add(stripe);

    // arms — both holding book in front
    const armL = makeArticulatedLimb({ upperLen: 0.44, lowerLen: 0.4, radius: 0.085, color: robe, bend: 1.4 });
    armL.position.set(-0.45, 1.25, 0);
    armL.rotation.x = 1.0;
    armL.rotation.z = 0.25;
    g.add(armL);

    const armR = makeArticulatedLimb({ upperLen: 0.44, lowerLen: 0.4, radius: 0.085, color: robe, bend: 1.4 });
    armR.position.set(0.45, 1.25, 0);
    armR.rotation.x = 1.0;
    armR.rotation.z = -0.25;
    g.add(armR);

    // book in hands
    const book = new THREE.Mesh(
      new THREE.BoxGeometry(0.32, 0.04, 0.24),
      new THREE.MeshStandardMaterial({
        color: 0xefe4c4, roughness: 0.6, emissive: accent, emissiveIntensity: 0.35
      })
    );
    book.position.set(0, 0.72, 0.45);
    book.rotation.x = -0.1;
    g.add(book);

    return g;
  }

  function buildTechnician(accent, accent2) {
    // sleek tech operator, lots of greebles, headset, sniper-tall
    const g = new THREE.Group();
    const suit = 0x1f2a3a;

    g.add(positioned(makeHead(0.28, suit, accent), 0, 1.65, 0));

    // headset wrap
    const headset = new THREE.Mesh(
      new THREE.TorusGeometry(0.31, 0.035, 6, 24, Math.PI),
      new THREE.MeshStandardMaterial({
        color: accent, emissive: accent, emissiveIntensity: 1, roughness: 0.3, metalness: 0.7
      })
    );
    headset.position.set(0, 1.7, 0);
    headset.rotation.x = Math.PI / 2;
    g.add(headset);

    // tall, slim torso
    const torso = makeTorso({ shoulderW: 0.85, hipW: 0.55, height: 1.05, color: suit });
    torso.position.y = 0.9;
    g.add(torso);

    // tech harness — glowing accent lines
    [0.25, 0.0, -0.25].forEach(y => {
      const line = new THREE.Mesh(
        new THREE.BoxGeometry(0.6, 0.025, 0.04),
        new THREE.MeshStandardMaterial({
          color: accent, emissive: accent, emissiveIntensity: 1.3
        })
      );
      line.position.set(0, 0.85 + y, 0.32);
      g.add(line);
    });

    // arms — slender, one bent up to "operate"
    const armL = makeArticulatedLimb({ upperLen: 0.5, lowerLen: 0.45, radius: 0.07, color: suit, bend: 1.7 });
    armL.position.set(-0.42, 1.35, 0);
    armL.rotation.x = 0.3;
    armL.rotation.z = 0.15;
    g.add(armL);

    const armR = makeArticulatedLimb({ upperLen: 0.5, lowerLen: 0.45, radius: 0.07, color: suit, bend: 1.5 });
    armR.position.set(0.42, 1.35, 0);
    armR.rotation.x = -0.4;
    armR.rotation.z = -0.2;
    g.add(armR);

    addLegs(g, suit, accent, 0.075, 0.55, 0.5, 0.1);

    return g;
  }

  function buildArchivist(accent, accent2) {
    // librarian-like, stacks of papers, more hunched contemplative pose
    const g = new THREE.Group();
    const robe = 0x2e2438;
    const skin = 0x2a3344;

    g.add(positioned(makeHead(0.3, skin, accent), 0.05, 1.5, 0));
    const head = g.children[0];
    head.rotation.x = 0.15; // looking down

    // slightly forward-leaning torso
    const torso = makeTorso({ shoulderW: 0.95, hipW: 0.7, height: 0.95, color: robe });
    torso.position.y = 0.85;
    torso.rotation.x = 0.08;
    g.add(torso);

    // shawl over shoulders
    const shawl = new THREE.Mesh(
      new THREE.SphereGeometry(0.6, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2),
      new THREE.MeshStandardMaterial({ color: accent2, roughness: 0.7, metalness: 0.1 })
    );
    shawl.position.set(0, 1.18, 0);
    shawl.scale.set(1.05, 0.6, 1);
    g.add(shawl);

    // arms holding scroll/stack
    const armL = makeArticulatedLimb({ upperLen: 0.42, lowerLen: 0.4, radius: 0.085, color: robe, bend: 1.5 });
    armL.position.set(-0.5, 1.22, 0);
    armL.rotation.x = 1.1;
    armL.rotation.z = 0.2;
    g.add(armL);

    const armR = makeArticulatedLimb({ upperLen: 0.42, lowerLen: 0.4, radius: 0.085, color: robe, bend: 1.5 });
    armR.position.set(0.5, 1.22, 0);
    armR.rotation.x = 1.1;
    armR.rotation.z = -0.2;
    g.add(armR);

    // scroll
    const scroll = new THREE.Mesh(
      new THREE.CylinderGeometry(0.06, 0.06, 0.4, 12),
      new THREE.MeshStandardMaterial({
        color: 0xd4c8a0, roughness: 0.7, emissive: accent, emissiveIntensity: 0.3
      })
    );
    scroll.position.set(0, 0.7, 0.45);
    scroll.rotation.z = Math.PI / 2;
    g.add(scroll);

    addLegs(g, robe, accent, 0.09, 0.5, 0.45, 0.16);

    return g;
  }

  function buildDiplomat(accent, accent2) {
    // formal stance, suit silhouette, holding folder, wider shoulders
    const g = new THREE.Group();
    const suit = 0x202632;
    const skin = 0x2a3344;

    g.add(positioned(makeHead(0.3, skin, accent), 0, 1.55, 0));

    // suit — tailored, padded shoulders
    const torso = makeTorso({ shoulderW: 1.1, hipW: 0.7, height: 0.95, color: suit });
    torso.position.y = 0.86;
    g.add(torso);

    // tie
    const tie = new THREE.Mesh(
      new THREE.BoxGeometry(0.07, 0.5, 0.04),
      new THREE.MeshStandardMaterial({
        color: accent, emissive: accent, emissiveIntensity: 0.5, roughness: 0.4
      })
    );
    tie.position.set(0, 0.9, 0.33);
    g.add(tie);

    // shoulder padding
    [-0.6, 0.6].forEach(x => {
      const pad = new THREE.Mesh(
        new THREE.BoxGeometry(0.22, 0.12, 0.32),
        new THREE.MeshStandardMaterial({ color: suit, roughness: 0.55 })
      );
      pad.position.set(x, 1.27, 0);
      g.add(pad);
    });

    // arms — one at side, one holding folder
    const armL = makeArticulatedLimb({ upperLen: 0.46, lowerLen: 0.43, radius: 0.085, color: suit, bend: 0.3 });
    armL.position.set(-0.55, 1.25, 0);
    armL.rotation.x = 0.05;
    g.add(armL);

    const armR = makeArticulatedLimb({ upperLen: 0.46, lowerLen: 0.43, radius: 0.085, color: suit, bend: 1.2 });
    armR.position.set(0.55, 1.25, 0);
    armR.rotation.x = 0.6;
    g.add(armR);

    // folder/portfolio
    const folder = new THREE.Mesh(
      new THREE.BoxGeometry(0.28, 0.36, 0.04),
      new THREE.MeshStandardMaterial({
        color: 0x6b3e2a, roughness: 0.6, emissive: accent, emissiveIntensity: 0.2
      })
    );
    folder.position.set(0.55, 0.6, 0.18);
    folder.rotation.x = 0.3;
    g.add(folder);

    addLegs(g, suit, accent, 0.09, 0.5, 0.45, 0.16);

    return g;
  }

  function buildCivilian(accent, accent2) {
    // casual, no gear, relaxed, t-shirt + jacket
    const g = new THREE.Group();
    const jacket = 0x2c3a4a;
    const skin = 0x2a3344;

    g.add(positioned(makeHead(0.32, skin, accent), 0.04, 1.52, 0));

    // relaxed torso
    const torso = makeTorso({ shoulderW: 1.0, hipW: 0.7, height: 0.92, color: jacket });
    torso.position.y = 0.84;
    torso.rotation.z = 0.04; // slight casual lean
    g.add(torso);

    // open jacket — visible inner shirt
    const shirt = new THREE.Mesh(
      new THREE.BoxGeometry(0.4, 0.7, 0.04),
      new THREE.MeshStandardMaterial({ color: 0xefe4c4, roughness: 0.7 })
    );
    shirt.position.set(0, 0.9, 0.32);
    g.add(shirt);

    // jacket lapels
    [-0.18, 0.18].forEach(x => {
      const lapel = new THREE.Mesh(
        new THREE.BoxGeometry(0.1, 0.6, 0.05),
        new THREE.MeshStandardMaterial({ color: jacket, roughness: 0.6 })
      );
      lapel.position.set(x, 0.95, 0.35);
      lapel.rotation.z = x > 0 ? -0.08 : 0.08;
      g.add(lapel);
    });

    // arms — one in pocket, one relaxed
    const armL = makeArticulatedLimb({ upperLen: 0.44, lowerLen: 0.4, radius: 0.085, color: jacket, bend: 0.6 });
    armL.position.set(-0.55, 1.22, 0);
    armL.rotation.x = 0.4;
    armL.rotation.z = 0.05;
    g.add(armL);

    const armR = makeArticulatedLimb({ upperLen: 0.44, lowerLen: 0.4, radius: 0.085, color: jacket, bend: 0.2 });
    armR.position.set(0.55, 1.22, 0);
    armR.rotation.x = 0.05;
    g.add(armR);

    // backpack strap (tiny visual)
    const strap = new THREE.Mesh(
      new THREE.BoxGeometry(0.06, 0.6, 0.04),
      new THREE.MeshStandardMaterial({
        color: accent, emissive: accent, emissiveIntensity: 0.4, roughness: 0.5
      })
    );
    strap.position.set(-0.25, 0.9, 0.32);
    strap.rotation.z = 0.1;
    g.add(strap);

    addLegs(g, jacket, accent, 0.09, 0.5, 0.45, 0.14);

    return g;
  }

  function buildAstakeria(accent, accent2) {
    // cape, asymmetric pose, blade, masked, cinematic
    const g = new THREE.Group();
    const cloak = 0x1a1420;
    const skin = 0x2a1f2c;

    g.add(positioned(makeHead(0.31, skin, accent), 0.04, 1.55, 0.02));

    // mask plate over visor
    const mask = new THREE.Mesh(
      new THREE.SphereGeometry(0.32, 14, 10, 0, Math.PI, 0, Math.PI),
      new THREE.MeshStandardMaterial({
        color: 0xf5f0e6, roughness: 0.4, metalness: 0.3
      })
    );
    mask.position.set(0, 1.55, 0.16);
    mask.scale.set(1, 1, 0.7);
    g.add(mask);

    // crack glow on mask
    const crack = new THREE.Mesh(
      new THREE.BoxGeometry(0.04, 0.18, 0.01),
      new THREE.MeshStandardMaterial({
        color: accent, emissive: accent, emissiveIntensity: 1.7, roughness: 0.2
      })
    );
    crack.position.set(0.05, 1.6, 0.32);
    crack.rotation.z = 0.2;
    g.add(crack);

    // asymmetric torso — twisted slightly
    const torso = makeTorso({ shoulderW: 1.0, hipW: 0.65, height: 0.95, color: cloak });
    torso.position.y = 0.85;
    torso.rotation.y = -0.15;
    g.add(torso);

    // CAPE — defines silhouette, behind body
    const capeShape = new THREE.Shape();
    capeShape.moveTo(-0.5, 0.5);
    capeShape.lineTo(0.5, 0.5);
    capeShape.bezierCurveTo(0.7, 0, 0.6, -0.5, 0.4, -0.85);
    capeShape.lineTo(-0.4, -0.85);
    capeShape.bezierCurveTo(-0.6, -0.5, -0.7, 0, -0.5, 0.5);
    const capeGeo = new THREE.ExtrudeGeometry(capeShape, {
      depth: 0.04, bevelEnabled: false, steps: 1
    });
    const cape = new THREE.Mesh(capeGeo, new THREE.MeshStandardMaterial({
      color: accent2, roughness: 0.85, side: THREE.DoubleSide
    }));
    cape.position.set(0, 0.85, -0.3);
    cape.rotation.x = -0.15;
    g.add(cape);
    g.userData.cape = cape;

    // asymmetric shoulder pad — only one side
    const pauldron = new THREE.Mesh(
      new THREE.SphereGeometry(0.22, 14, 10, 0, Math.PI * 2, 0, Math.PI / 2),
      new THREE.MeshStandardMaterial({ color: 0x2a2030, roughness: 0.4, metalness: 0.6 })
    );
    pauldron.position.set(-0.6, 1.22, 0);
    pauldron.scale.set(1.2, 1.1, 1.1);
    g.add(pauldron);

    // arms — one with blade, one extended
    const armL = makeArticulatedLimb({ upperLen: 0.46, lowerLen: 0.44, radius: 0.09, color: cloak, bend: 0.4 });
    armL.position.set(-0.6, 1.22, 0);
    armL.rotation.x = 0.4;
    armL.rotation.z = 0.4;
    g.add(armL);

    const armR = makeArticulatedLimb({ upperLen: 0.46, lowerLen: 0.44, radius: 0.09, color: cloak, bend: 1.0 });
    armR.position.set(0.5, 1.22, 0);
    armR.rotation.x = 0.5;
    armR.rotation.z = -0.7;
    g.add(armR);

    // blade — the silhouette-defining gear
    const bladeGroup = new THREE.Group();
    const bladeBlade = new THREE.Mesh(
      new THREE.BoxGeometry(0.05, 0.85, 0.02),
      new THREE.MeshStandardMaterial({
        color: 0xcad6e8, roughness: 0.2, metalness: 0.95,
        emissive: accent, emissiveIntensity: 0.4
      })
    );
    bladeGroup.add(bladeBlade);
    const hilt = new THREE.Mesh(
      new THREE.CylinderGeometry(0.03, 0.03, 0.2, 12),
      new THREE.MeshStandardMaterial({ color: 0x3a2418, roughness: 0.85 })
    );
    hilt.position.y = -0.5;
    bladeGroup.add(hilt);
    const guard = new THREE.Mesh(
      new THREE.BoxGeometry(0.18, 0.04, 0.04),
      new THREE.MeshStandardMaterial({
        color: accent, emissive: accent, emissiveIntensity: 0.7, metalness: 0.7
      })
    );
    guard.position.y = -0.4;
    bladeGroup.add(guard);
    bladeGroup.position.set(0.95, 0.45, 0.1);
    bladeGroup.rotation.z = -1.0;
    g.add(bladeGroup);
    g.userData.blade = bladeGroup;

    addLegs(g, cloak, accent, 0.09, 0.5, 0.46, 0.22);

    return g;
  }

  function buildUnknown(accent, accent2) {
    // glitched silhouette, fragmented, indistinct
    const g = new THREE.Group();
    const dim = 0x1c2230;

    // fragmented head
    for (let i = 0; i < 5; i++) {
      const frag = new THREE.Mesh(
        new THREE.BoxGeometry(0.1 + Math.random() * 0.15, 0.1 + Math.random() * 0.15, 0.1 + Math.random() * 0.15),
        new THREE.MeshStandardMaterial({
          color: dim, transparent: true, opacity: 0.6 + Math.random() * 0.3,
          roughness: 0.7
        })
      );
      frag.position.set(
        (Math.random() - 0.5) * 0.4,
        1.45 + (Math.random() - 0.5) * 0.3,
        (Math.random() - 0.5) * 0.3
      );
      frag.rotation.set(Math.random(), Math.random(), Math.random());
      g.add(frag);
    }

    // ghosted torso
    const torso = makeTorso({ shoulderW: 0.95, hipW: 0.65, height: 0.9, color: dim });
    torso.material.transparent = true;
    torso.material.opacity = 0.4;
    torso.position.y = 0.82;
    g.add(torso);

    // glitching shards floating
    for (let i = 0; i < 8; i++) {
      const shard = new THREE.Mesh(
        new THREE.BoxGeometry(0.04, 0.18, 0.04),
        new THREE.MeshStandardMaterial({
          color: accent, emissive: accent, emissiveIntensity: 1.3,
          transparent: true, opacity: 0.6
        })
      );
      shard.position.set(
        (Math.random() - 0.5) * 1.2,
        0.5 + Math.random() * 1.3,
        (Math.random() - 0.5) * 0.4
      );
      shard.rotation.set(Math.random(), Math.random(), Math.random());
      g.add(shard);
    }

    return g;
  }

  // ─── leg helper ──────────────────────────────────────────
  function addLegs(parent, color, accent, radius, upperLen, lowerLen, stance) {
    const legL = makeArticulatedLimb({ upperLen, lowerLen, radius, color, bend: 0.15 });
    legL.position.set(-stance, 0.35, 0);
    parent.add(legL);

    const legR = makeArticulatedLimb({ upperLen, lowerLen, radius, color, bend: 0.15 });
    legR.position.set(stance, 0.35, 0);
    parent.add(legR);

    // boots — accent-tipped
    [-stance, stance].forEach(x => {
      const boot = new THREE.Mesh(
        new THREE.BoxGeometry(radius * 2.6, radius * 1.4, radius * 3.2),
        new THREE.MeshStandardMaterial({
          color: 0x141a26, roughness: 0.65, metalness: 0.3
        })
      );
      boot.position.set(x, 0.35 - upperLen - lowerLen + 0.05, radius * 0.6);
      parent.add(boot);
      // accent tip
      const tip = new THREE.Mesh(
        new THREE.BoxGeometry(radius * 2, radius * 0.3, radius * 0.4),
        new THREE.MeshStandardMaterial({
          color: accent, emissive: accent, emissiveIntensity: 0.6
        })
      );
      tip.position.set(x, 0.35 - upperLen - lowerLen - 0.04, radius * 1.7);
      parent.add(tip);
    });
  }

  function positioned(obj, x, y, z) {
    obj.position.set(x, y, z);
    return obj;
  }

  const BUILDERS = {
    protagonist: buildProtagonist,
    scientist:   buildScientist,
    engineer:    buildEngineer,
    builder:     buildBuilder,
    author:      buildAuthor,
    technician:  buildTechnician,
    archivist:   buildArchivist,
    diplomat:    buildDiplomat,
    civilian:    buildCivilian,
    astakeria:   buildAstakeria,
    unknown:     buildUnknown
  };

  function setCharacter(figureKey, accentHex, accent2Hex) {
    const accent  = new THREE.Color(accentHex).getHex();
    const accent2 = new THREE.Color(accent2Hex).getHex();
    currentAccent = accent;
    currentAccent2 = accent2;

    // update lighting tint to match
    rimLight.color.setHex(accent);
    accentLight.color.setHex(accent);
    fillLight.color.setHex(accent2);

    if (currentFigure) {
      scene.remove(currentFigure);
      currentFigure.traverse(o => {
        if (o.geometry) o.geometry.dispose();
        if (o.material) {
          if (Array.isArray(o.material)) o.material.forEach(m => m.dispose());
          else o.material.dispose();
        }
      });
    }

    const builder = BUILDERS[figureKey] || BUILDERS.protagonist;
    currentFigure = builder(accent, accent2);
    currentFigure.position.y = 0;
    scene.add(currentFigure);

    // entrance animation
    currentFigure.scale.set(0.92, 0.92, 0.92);
    currentFigure.rotation.y = -0.4;
    if (window.gsap) {
      gsap.to(currentFigure.scale,    { x: 1, y: 1, z: 1, duration: 0.5, ease: 'back.out(1.6)' });
      gsap.to(currentFigure.rotation, { y: 0,           duration: 0.55, ease: 'power3.out' });
    } else {
      currentFigure.scale.set(1, 1, 1);
      currentFigure.rotation.y = 0;
    }
  }

  let t = 0;
  function tick(dt) {
    t += dt;

    // smooth mouse-look
    lookYaw   += (mouseX * 0.18 - lookYaw)   * 0.06;
    lookPitch += (-mouseY * 0.08 - lookPitch) * 0.06;

    if (currentFigure) {
      currentFigure.rotation.y = lookYaw + Math.sin(t * 0.4) * 0.04;
      currentFigure.position.y = Math.sin(t * 0.7) * 0.025;

      // camera subtle parallax
      camera.position.x = lookYaw * 0.4;
      camera.position.y = 1.0 + lookPitch * 0.3;
      camera.lookAt(0, 0.6, 0);

      // breathing animation in head/torso
      const head = currentFigure.children[0];
      if (head && head.scale) {
        head.scale.y = 1 + Math.sin(t * 1.6) * 0.008;
      }

      // cape sway
      if (currentFigure.userData?.cape) {
        currentFigure.userData.cape.rotation.x = -0.15 + Math.sin(t * 0.9) * 0.04;
      }
      // bracer pulse glow (engineer)
      if (currentFigure.userData?.bracer) {
        const panel = currentFigure.userData.bracer.children[1];
        if (panel?.material) {
          panel.material.emissiveIntensity = 1.1 + Math.sin(t * 4) * 0.4;
        }
      }
    }

    renderer.render(scene, camera);
  }

  return {
    tick, setCharacter, resize,
    get camera() { return camera; },
    get scene()  { return scene; }
  };
}
