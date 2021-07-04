export const vertexShader = `
  uniform float time;
  varying vec2 vUv;

  float random(vec2 c){
    return fract(sin(dot(c.xy ,vec2(19.97,6.23))) * 9.15);
  }

  void main() {
    vec3 pos = position;
    
    float y = 1.0 - mod(time, 0.8) / 0.8; 
    if (abs(uv.y - y) < 0.05)
      pos.x += (random(pos.xy * time) * 2.0 - 1.0) * 0.05;

    if (mod(time, 1.8) / 1.8 < 0.1) {
      pos.x += (random(pos.yx * time) * 2.0 - 1.0) * 0.3;
      pos.y += (random(pos.yx * time) * 2.0 - 1.0) * 0.0;
    }

    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

export const fragmentShader = `
  uniform sampler2D tex;
  varying vec2 vUv;

  void main() {    
    gl_FragColor = texture2D(tex, vUv);
  }
`
