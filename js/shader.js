// ============================================================
//  SHADER — reactive WebGL background (v3)
//  Softer, more atmospheric. Each character imparts a tint.
// ============================================================

const VS = `
attribute vec2 a_pos;
varying vec2 v_uv;
void main() {
  v_uv = a_pos * 0.5 + 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

const FS = `
precision highp float;
varying vec2 v_uv;
uniform float u_time;
uniform vec2  u_res;
uniform vec3  u_acc1;
uniform vec3  u_acc2;
uniform float u_intensity;
uniform float u_pattern;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float amp = 0.5;
  for (int i = 0; i < 4; i++) {
    v += amp * noise(p);
    p *= 2.05;
    amp *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = v_uv;
  vec2 p = (uv - 0.5);
  p.x *= u_res.x / u_res.y;

  // base atmosphere — large slow drifting clouds tinted by accent
  vec2 q = p * 1.4;
  q.x += u_time * 0.018;
  q.y += sin(u_time * 0.05) * 0.1;
  float clouds = fbm(q);
  clouds = pow(clouds, 1.4);

  // soft radial vignette focal pulse
  float r = length(p);
  float pulse = 0.5 + 0.5 * sin(u_time * 0.4);
  float focal = smoothstep(0.85, 0.0, r) * (0.5 + pulse * 0.15);

  // accent gradient mixed with second accent
  vec3 grad = mix(u_acc1, u_acc2, smoothstep(0.0, 0.7, p.y + 0.5));

  // pattern variations per character — subtle, not intrusive
  float pat = 0.0;

  // pattern 0: clean atmospheric gradient
  if (u_pattern < 0.5) {
    pat = clouds * 0.18;
  }
  // pattern 1: soft horizontal energy lines (labs/research)
  else if (u_pattern < 1.5) {
    float lines = 0.5 + 0.5 * sin(uv.y * 90.0 + u_time * 0.3);
    lines = pow(lines, 28.0);
    pat = clouds * 0.14 + lines * 0.06;
  }
  // pattern 2: tech grid pulses (projects/skills)
  else if (u_pattern < 2.5) {
    vec2 g = uv * vec2(60.0, 35.0);
    vec2 gi = fract(g);
    float grid = smoothstep(0.96, 0.98, gi.x) + smoothstep(0.96, 0.98, gi.y);
    grid *= 0.5 + 0.5 * sin(floor(g.x) * 0.7 + floor(g.y) * 0.3 + u_time * 1.3);
    pat = clouds * 0.12 + grid * 0.05;
  }
  // pattern 3: cinematic fog drift (astakeria)
  else {
    vec2 fq = p * 2.5;
    fq.x += u_time * 0.04;
    float fog = fbm(fq) * fbm(fq * 1.8 + 7.3);
    pat = fog * 0.32;
  }

  // composite
  vec3 col = grad * (focal * 0.55 + pat) * u_intensity;

  // dark base — keep it lighter than v2
  col += vec3(0.025, 0.03, 0.045);

  // soft chromatic vignette toward edges
  col *= 1.0 - smoothstep(0.55, 1.05, r) * 0.4;

  // gentle film grain (very subtle)
  float grain = (hash(uv * u_res + u_time) - 0.5) * 0.018;
  col += grain;

  gl_FragColor = vec4(col, 1.0);
}
`;

export function createShader(canvas) {
  const gl = canvas.getContext('webgl', { antialias: true, alpha: false });
  if (!gl) {
    console.warn('WebGL unavailable; shader background disabled.');
    return { tick(){}, setAccent(){}, setIntensity(){}, setPattern(){}, resize(){} };
  }

  const vs = compile(gl, gl.VERTEX_SHADER, VS);
  const fs = compile(gl, gl.FRAGMENT_SHADER, FS);
  const prog = gl.createProgram();
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  gl.useProgram(prog);

  // fullscreen quad
  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    -1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1
  ]), gl.STATIC_DRAW);

  const aPos = gl.getAttribLocation(prog, 'a_pos');
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

  const uTime  = gl.getUniformLocation(prog, 'u_time');
  const uRes   = gl.getUniformLocation(prog, 'u_res');
  const uAcc1  = gl.getUniformLocation(prog, 'u_acc1');
  const uAcc2  = gl.getUniformLocation(prog, 'u_acc2');
  const uInt   = gl.getUniformLocation(prog, 'u_intensity');
  const uPat   = gl.getUniformLocation(prog, 'u_pattern');

  let acc1 = [1.0, 0.82, 0.4];
  let acc2 = [0.94, 0.28, 0.43];
  let intensity = 0.55;
  let pattern = 0;

  function compile(gl, type, src) {
    const sh = gl.createShader(type);
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
      console.error('Shader compile error:', gl.getShaderInfoLog(sh));
    }
    return sh;
  }

  function hexToRgb(hex) {
    let h = hex.replace('#', '');
    if (h.length === 3) h = h.split('').map(c => c + c).join('');
    const r = parseInt(h.slice(0, 2), 16) / 255;
    const g = parseInt(h.slice(2, 4), 16) / 255;
    const b = parseInt(h.slice(4, 6), 16) / 255;
    return [r, g, b];
  }

  function resize() {
    const r = canvas.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) return;
    const dpr = Math.min(window.devicePixelRatio, 2);
    canvas.width = r.width * dpr;
    canvas.height = r.height * dpr;
    gl.viewport(0, 0, canvas.width, canvas.height);
  }
  resize();

  let t = 0;
  function tick(dt) {
    t += dt;
    gl.useProgram(prog);
    gl.uniform1f(uTime, t);
    gl.uniform2f(uRes, canvas.width, canvas.height);
    gl.uniform3fv(uAcc1, acc1);
    gl.uniform3fv(uAcc2, acc2);
    gl.uniform1f(uInt, intensity);
    gl.uniform1f(uPat, pattern);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  return {
    tick, resize,
    setAccent(a, b) { acc1 = hexToRgb(a); acc2 = hexToRgb(b); },
    setIntensity(v) { intensity = v; },
    setPattern(p)   { pattern = p; }
  };
}
