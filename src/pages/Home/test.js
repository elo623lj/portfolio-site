<script type="module">

			import * as THREE from '../build/three.module.js';

			import Stats from './jsm/libs/stats.module.js';
			import { GUI } from './jsm/libs/dat.gui.module.js';

			import { BufferGeometryUtils } from './jsm/utils/BufferGeometryUtils.js';

			let container, stats;
			let renderer;
			let transition;

			const transitionParams = {
				"useTexture": true,
				"transition": 0.5,
				"transitionSpeed": 2.0,
				"texture": 5,
				"loopTexture": true,
				"animateTransition": true,
				"textureThreshold": 0.3
			};

			const clock = new THREE.Clock();

			init();
			animate();

			function init() {

				initGUI();

				container = document.getElementById( "container" );

				renderer = new THREE.WebGLRenderer( { antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				container.appendChild( renderer.domElement );

				stats = new Stats();
				container.appendChild( stats.dom );

				const sceneA = new FXScene( "cube", 5000, 1200, 120, new THREE.Vector3( 0, - 0.4, 0 ), 0xffffff );
				const sceneB = new FXScene( "sphere", 500, 2000, 50, new THREE.Vector3( 0, 0.2, 0.1 ), 0x000000 );

				transition = new Transition( sceneA, sceneB );

			}

			function animate() {

				requestAnimationFrame( animate );

				render();
				stats.update();

			}

			function initGUI() {

				const gui = new GUI();

				gui.add( transitionParams, "useTexture" ).onChange( function ( value ) {

					transition.useTexture( value );

				} );

				gui.add( transitionParams, 'loopTexture' );

				gui.add( transitionParams, 'texture', { Perlin: 0, Squares: 1, Cells: 2, Distort: 3, Gradient: 4, Radial: 5 } ).onChange( function ( value ) {

					transition.setTexture( value );

				} ).listen();

				gui.add( transitionParams, "textureThreshold", 0, 1, 0.01 ).onChange( function ( value ) {

					transition.setTextureThreshold( value );

				} );

				gui.add( transitionParams, "animateTransition" );
				gui.add( transitionParams, "transition", 0, 1, 0.01 ).listen();
				gui.add( transitionParams, "transitionSpeed", 0.5, 5, 0.01 );

			}


			function render() {

				transition.render( clock.getDelta() );

			}

			function generateGeometry( objectType, numObjects ) {

				function applyVertexColors( geometry, color ) {

					const position = geometry.attributes.position;
					const colors = [];

					for ( let i = 0; i < position.count; i ++ ) {

						colors.push( color.r, color.g, color.b );

					}

					geometry.setAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );

				}

				const geometries = [];

				const matrix = new THREE.Matrix4();
				const position = new THREE.Vector3();
				const rotation = new THREE.Euler();
				const quaternion = new THREE.Quaternion();
				const scale = new THREE.Vector3();
				const color = new THREE.Color();

				for ( let i = 0; i < numObjects; i ++ ) {

					position.x = Math.random() * 10000 - 5000;
					position.y = Math.random() * 6000 - 3000;
					position.z = Math.random() * 8000 - 4000;

					rotation.x = Math.random() * 2 * Math.PI;
					rotation.y = Math.random() * 2 * Math.PI;
					rotation.z = Math.random() * 2 * Math.PI;
					quaternion.setFromEuler( rotation );

					scale.x = Math.random() * 200 + 100;

					let geometry;

					if ( objectType === 'cube' ) {

						geometry = new THREE.BoxGeometry( 1, 1, 1 );
						geometry = geometry.toNonIndexed(); // merging needs consistent buffer geometries
						scale.y = Math.random() * 200 + 100;
						scale.z = Math.random() * 200 + 100;
						color.setRGB( 0, 0, 0.1 + 0.9 * Math.random() );

					} else if ( objectType === 'sphere' ) {

						geometry = new THREE.IcosahedronGeometry( 1, 1 );
						scale.y = scale.z = scale.x;
						color.setRGB( 0.1 + 0.9 * Math.random(), 0, 0 );

					}

					// give the geom's vertices a random color, to be displayed
					applyVertexColors( geometry, color );

					matrix.compose( position, quaternion, scale );
					geometry.applyMatrix4( matrix );

					geometries.push( geometry );

				}

				return BufferGeometryUtils.mergeBufferGeometries( geometries );

			}

			function FXScene( type, numObjects, cameraZ, fov, rotationSpeed, clearColor ) {

				this.clearColor = clearColor;

				this.camera = new THREE.PerspectiveCamera( fov, window.innerWidth / window.innerHeight, 1, 10000 );
				this.camera.position.z = cameraZ;

				// Setup scene
				this.scene = new THREE.Scene();
				this.scene.add( new THREE.AmbientLight( 0x555555 ) );

				const light = new THREE.SpotLight( 0xffffff, 1.5 );
				light.position.set( 0, 500, 2000 );
				this.scene.add( light );

				this.rotationSpeed = rotationSpeed;

				const defaultMaterial = new THREE.MeshPhongMaterial( { color: 0xffffff, flatShading: true, vertexColors: true } );
				this.mesh = new THREE.Mesh( generateGeometry( type, numObjects ), defaultMaterial );
				this.scene.add( this.mesh );

				const renderTargetParameters = { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBFormat };
				this.fbo = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight, renderTargetParameters );

				this.render = function ( delta, rtt ) {

					this.mesh.rotation.x += delta * this.rotationSpeed.x;
					this.mesh.rotation.y += delta * this.rotationSpeed.y;
					this.mesh.rotation.z += delta * this.rotationSpeed.z;

					renderer.setClearColor( this.clearColor );

					if ( rtt ) {

						renderer.setRenderTarget( this.fbo );
						renderer.clear();
						renderer.render( this.scene, this.camera );

					} else {

						renderer.setRenderTarget( null );
						renderer.render( this.scene, this.camera );

					}

				};

			}

			function Transition( sceneA, sceneB ) {

				this.scene = new THREE.Scene();

				this.cameraOrtho = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, - 10, 10 );

				this.textures = [];

				const loader = new THREE.TextureLoader();

				for ( let i = 0; i < 6; i ++ )
					this.textures[ i ] = loader.load( 'textures/transition/transition' + ( i + 1 ) + '.png' );

				this.quadmaterial = new THREE.ShaderMaterial( {

					uniforms: {

						tDiffuse1: {
							value: null
						},
						tDiffuse2: {
							value: null
						},
						mixRatio: {
							value: 0.0
						},
						threshold: {
							value: 0.1
						},
						useTexture: {
							value: 1
						},
						tMixTexture: {
							value: this.textures[ 0 ]
						}
					},
					vertexShader: [

						"varying vec2 vUv;",

						"void main() {",

						"vUv = vec2( uv.x, uv.y );",
						"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

						"}"

					].join( "\n" ),
					fragmentShader: [

						"uniform float mixRatio;",

						"uniform sampler2D tDiffuse1;",
						"uniform sampler2D tDiffuse2;",
						"uniform sampler2D tMixTexture;",

						"uniform int useTexture;",
						"uniform float threshold;",

						"varying vec2 vUv;",

						"void main() {",

						"	vec4 texel1 = texture2D( tDiffuse1, vUv );",
						"	vec4 texel2 = texture2D( tDiffuse2, vUv );",

						"	if (useTexture==1) {",

						"		vec4 transitionTexel = texture2D( tMixTexture, vUv );",
						"		float r = mixRatio * (1.0 + threshold * 2.0) - threshold;",
						"		float mixf=clamp((transitionTexel.r - r)*(1.0/threshold), 0.0, 1.0);",

						"		gl_FragColor = mix( texel1, texel2, mixf );",

						"	} else {",

						"		gl_FragColor = mix( texel2, texel1, mixRatio );",

						"	}",

						"}"

					].join( "\n" )

				} );

				const quadgeometry = new THREE.PlaneGeometry( window.innerWidth, window.innerHeight );

				this.quad = new THREE.Mesh( quadgeometry, this.quadmaterial );
				this.scene.add( this.quad );

				// Link both scenes and their FBOs
				this.sceneA = sceneA;
				this.sceneB = sceneB;

				this.quadmaterial.uniforms.tDiffuse1.value = sceneA.fbo.texture;
				this.quadmaterial.uniforms.tDiffuse2.value = sceneB.fbo.texture;

				this.needChange = false;

				this.setTextureThreshold = function ( value ) {

					this.quadmaterial.uniforms.threshold.value = value;

				};

				this.useTexture = function ( value ) {

					this.quadmaterial.uniforms.useTexture.value = value ? 1 : 0;

				};

				this.setTexture = function ( i ) {

					this.quadmaterial.uniforms.tMixTexture.value = this.textures[ i ];

				};

				this.render = function ( delta ) {

					// Transition animation
					if ( transitionParams.animateTransition ) {

						const t = ( 1 + Math.sin( transitionParams.transitionSpeed * clock.getElapsedTime() / Math.PI ) ) / 2;
						transitionParams.transition = THREE.MathUtils.smoothstep( t, 0.3, 0.7 );

						// Change the current alpha texture after each transition
						if ( transitionParams.loopTexture && ( transitionParams.transition == 0 || transitionParams.transition == 1 ) ) {

							if ( this.needChange ) {

								transitionParams.texture = ( transitionParams.texture + 1 ) % this.textures.length;
								this.quadmaterial.uniforms.tMixTexture.value = this.textures[ transitionParams.texture ];
								this.needChange = false;

							}

						} else
							this.needChange = true;

					}

					this.quadmaterial.uniforms.mixRatio.value = transitionParams.transition;

					// Prevent render both scenes when it's not necessary
					if ( transitionParams.transition == 0 ) {

						this.sceneB.render( delta, false );

					} else if ( transitionParams.transition == 1 ) {

						this.sceneA.render( delta, false );

					} else {

						// When 0<transition<1 render transition between two scenes

						this.sceneA.render( delta, true );
						this.sceneB.render( delta, true );
						renderer.setRenderTarget( null );
						renderer.clear();
						renderer.render( this.scene, this.cameraOrtho );

					}

				};

			}

		</script>