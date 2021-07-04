import * as THREE from "three"
import { ShaderMaterial } from "three"

export default class PreviewMaterial extends ShaderMaterial {
  _time
  _distort
  _radius

  constructor(
    args = {
      // metalness: 0.85,
      // tranparent: true,
      // roughness: 0.6,
      // normalScale: new THREE.Vector2(2, 2),
      // transmission: 0.9,
    },
  ) {
    super(args)
    this.setValues(args)
    this._time = { value: 0 }
    this._distort = { value: 0.2 }
    this._radius = { value: 1 }
  }

  onBeforeCompile(shader) {
    shader.uniforms.time = this._time
    shader.uniforms.radius = this._radius
    shader.uniforms.distort = this._distort

    shader.vertexShader = `
      varying vec2 vUv;
      void main() {
      vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
      }
    `

    shader.fragmentShader = `
      // uniform sampler2D layer1;
      // uniform sampler2D layer2;

      varying vec2 vUv;

      void main() {
          // gl_FragColor = ( texture2D( layer1, vUv ) + vec4( 1.0 ) * texture2D( layer2, vUv ) );
          gl_FragColor = vec4(255, 0,0,1);
      }
    `

  }

  get time() {
    return this._time.value
  }

  set time(v) {
    this._time.value = v
  }

  get distort() {
    return this._distort.value
  }

  set distort(v) {
    this._distort.value = v
  }

  get radius() {
    return this._radius.value
  }

  set radius(v) {
    this._radius.value = v
  }
}

