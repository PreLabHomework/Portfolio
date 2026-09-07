// ============================================================
//  TOON - cel-shading pipeline (v6)
//  Converts any figure (primitive builders or loaded GLBs) to a
//  unified stylized game look: stepped toon ramp, ink outlines
//  via inverted hull, and a soft contact shadow. Applied in
//  stage.js mountFigure so every hero, present or future, ships
//  with the same art direction.
// ============================================================

import * as THREE from "three";

let rampTexture = null;
let shadowTexture = null;

// 4-step lighting ramp, hard bands like hand-painted cel shading
function getRamp() {
  if (rampTexture) return rampTexture;
  const steps = new Uint8Array([70, 70, 70, 145, 145, 145, 210, 210, 210, 255, 255, 255]);
  rampTexture = new THREE.DataTexture(steps, 4, 1, THREE.RGBFormat);
  rampTexture.minFilter = THREE.NearestFilter;
  rampTexture.magFilter = THREE.NearestFilter;
  rampTexture.generateMipmaps = false;
  rampTexture.needsUpdate = true;
  return rampTexture;
}

// soft radial blob used as the ground contact shadow
function getShadowTexture() {
  if (shadowTexture) return shadowTexture;
  const size = 128;
  const cnv = document.createElement("canvas");
  cnv.width = cnv.height = size;
  const ctx = cnv.getContext("2d");
  const g = ctx.createRadialGradient(size / 2, size / 2, 4, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(0,0,0,0.55)");
  g.addColorStop(0.55, "rgba(0,0,0,0.28)");
  g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  shadowTexture = new THREE.CanvasTexture(cnv);
  return shadowTexture;
}

function shouldConvert(material) {
  if (!material) return false;
  if (material.userData && material.userData.noToon) return false;
  // keep holo panels, glass, and strong emissive glow strips as-is
  if (material.transparent && material.opacity < 0.98) return false;
  if (material.emissiveIntensity && material.emissiveIntensity > 0.55) return false;
  return material.isMeshStandardMaterial || material.isMeshPhongMaterial || material.isMeshLambertMaterial;
}

function toToon(material, isSkinned, hasMorphs) {
  const toon = new THREE.MeshToonMaterial({
    color: material.color ? material.color.clone() : new THREE.Color(0xffffff),
    gradientMap: getRamp(),
    map: material.map || null,
    transparent: !!material.transparent,
    opacity: material.opacity != null ? material.opacity : 1,
    side: material.side != null ? material.side : THREE.FrontSide
  });
  if (material.emissive) {
    toon.emissive = material.emissive.clone();
    toon.emissiveIntensity = material.emissiveIntensity != null ? material.emissiveIntensity : 1;
    if (material.emissiveMap) toon.emissiveMap = material.emissiveMap;
  }
  // r128 still uses explicit skinning / morph flags on materials
  if (isSkinned) toon.skinning = true;
  if (hasMorphs) toon.morphTargets = true;
  return toon;
}

// Inverted-hull ink outline. Static meshes only; skinned meshes
// (rigged GLBs) rely on the toon ramp and rim light instead.
function addOutline(mesh, thickness) {
  if (mesh.isSkinnedMesh || !mesh.geometry) return;
  if (mesh.userData.isOutline || mesh.userData.noOutline) return;
  const box = new THREE.Box3().setFromObject(mesh);
  const size = new THREE.Vector3();
  box.getSize(size);
  const maxDim = Math.max(size.x, size.y, size.z);
  if (!isFinite(maxDim) || maxDim < 0.06) return; // skip tiny detail bits

  const outline = new THREE.Mesh(
    mesh.geometry,
    new THREE.MeshBasicMaterial({ color: 0x05070c, side: THREE.BackSide })
  );
  outline.userData.isOutline = true;
  outline.position.copy(mesh.position);
  outline.rotation.copy(mesh.rotation);
  outline.scale.copy(mesh.scale).multiplyScalar(1 + thickness / Math.max(maxDim, 0.35));
  outline.renderOrder = (mesh.renderOrder || 0) - 1;
  if (mesh.parent) mesh.parent.add(outline);
}

export function applyToonPipeline(root, { outlines = true, outlineThickness = 0.028 } = {}) {
  if (root.userData.toonApplied) return root;
  root.userData.toonApplied = true;
  const meshes = [];
  root.traverse(obj => {
    if (obj.isMesh && !obj.userData.isOutline) meshes.push(obj);
  });

  meshes.forEach(mesh => {
    const hasMorphs = !!(mesh.morphTargetInfluences && mesh.morphTargetInfluences.length);
    if (Array.isArray(mesh.material)) {
      mesh.material = mesh.material.map(m => (shouldConvert(m) ? toToon(m, mesh.isSkinnedMesh, hasMorphs) : m));
    } else if (shouldConvert(mesh.material)) {
      mesh.material = toToon(mesh.material, mesh.isSkinnedMesh, hasMorphs);
    }
  });

  if (outlines) meshes.forEach(mesh => addOutline(mesh, outlineThickness));

  // soft contact shadow so the hero sits on the stage instead of floating
  if (!root.userData.hasContactShadow) {
    const shadow = new THREE.Mesh(
      new THREE.PlaneGeometry(2.4, 2.4),
      new THREE.MeshBasicMaterial({
        map: getShadowTexture(),
        transparent: true,
        depthWrite: false
      })
    );
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = -0.64;
    shadow.userData.isOutline = true; // exempt from future passes
    root.add(shadow);
    root.userData.hasContactShadow = true;
  }

  return root;
}
