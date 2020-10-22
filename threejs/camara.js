/**
*	Seminario GPC #3. Camara.
*	Dibujar formas basicas y un modelo importado.
*	Muestra el bucle tipico de inicializacion, escena y render.
*
*/

"use strict";

// Variables de consenso
// Motor, escena y la camara
var renderer, scene, camera;

// Monitor de recursos
var stats;
// Global GUI
var effectController;

// Otras globales
var esferacubo, cubo, angulo = 0;
var l = b = -4;
var r = t = -l;
var cameraControls;
var alzado, planta, perfil;

// Objetos y tiempo
var peonza,eje;
var antes = Date.now();

// Acciones
init();
loadScene();
setupGui();
startAnimation();
render();

function init() {

	// Configurar el motor de render y el canvas
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setClearColor(new THREE.Color(0x0000AA));
	renderer.autoClear = false;
	document.getElementById("container").appendChild(renderer.domElement);

	// Escena
	scene = new THREE.Scene();

	// Camara
	var ar = window.innerWidth / window.innerHeight;
	camera = new THREE.PerspectiveCamera(75, ar, 0.1, 100);
	//camera = new THREE.OrthographicCamera(l, r, t, b, -20, 20);
	
	camera.position.set(0.5, 3, 9);
	camera.lookAt(new THREE.Vector3(0, 0, 0));
	scene.add(camera);
	

	// Control de camara
	cameraControls = new THREE.OrbitControls(camera, renderer.domElement);
	cameraControls.target.set(0, 0, 0);
	cameraControls.noKeys = true;

	// STATS --> stats.update() en update()
	stats = new Stats();
	stats.setMode( 0 );					// Muestra FPS
	stats.domElement.style.position = 'absolute';		// Abajo izquierda
	stats.domElement.style.bottom = '0px';
	stats.domElement.style.left = '0px';
	document.getElementById( 'container' ).appendChild( stats.domElement );

	// Captura de eventos
	window.addEventListener('resize', updateAspectRation);

}

function loadScene() {

	// Construir el grafo de escena
	var updateFcts	= [];

	// Materiales
	var material = new THREE.MeshBasicMaterial({color: 'yellow', wireframe: true});

	// Geometrias
	var geocubo = new THREE.BoxGeometry(2, 2, 2);
	var geoesfera = new THREE.SphereGeometry(1, 30, 30);

	// Objetos
	var cubo = new THREE.Mesh(geocubo, material);

	// Orden de las transformaciones TRS
	cubo.rotation.y = Math.PI/4;
	cubo.position.x = -1;
	var esfera = new THREE.Mesh(geoesfera, material);
	esfera.position.x = 1;

	// Objeto contenedor
	esferacubo = new THREE.Object3D();
	esferacubo.position.y = 0.5;
	esferacubo.rotation.y = angulo;


	//Organizacion de la escena
	esferacubo.add(cubo);
	//cubo.add(new THREE.AxisHelper(1));
	esferacubo.add(esfera);
	scene.add(esferacubo);
	scene.add( new THREE.AxisHelper(3));

	//Coordinates.drawGrid({size:6,scale:1});
	Coordinates.drawGrid({size:6,scale:1, orientation:"y"});
	Coordinates.drawGrid({size:6,scale:1, orientation:"z"});	

	var keyboard = new THREEx.KeyboardState(renderer.domElement);
	renderer.domElement.setAttribute("tabIndex", "0");
	renderer.domElement.focus();

	updateFcts.push(function(delta, now){
		if (keyboard.pressed('left')) {
			esferacubo.position.y -= 1 * delta;
		}else if(keyboard.pressed('right')){
			esferacubo.position.y += 1 * delta;
		}
		if (keyboard.pressed('down')) {
			esferacubo.position.x += 1 * delta;
		}else if(keyboard.pressed('up')){
			esferacubo.position.x -= 1 * delta;
		}
	});

	// only on keydown
	keyboard.domElement.addEventListener('keydown', function(event){
		if (keyboard.eventMatches(event, 'w')) esferacubo.scale.y /= 2;
		if (keyboard.eventMatches(event, 's')) esferacubo.scale.y *= 2;
	});
	// only on keyup
	keyboard.domElement.addEventListener('keyup', function(event){
		if (keyboard.eventMatches(event, 'a')) esferacubo.scale.x *= 2;
		if (keyboard.eventMatches(event, 'd')) esferacubo.scale.x /= 2;
	});

	updateFcts.push(function(){
		renderer.render( scene, camera );		
	})

	var lastTimeMsec= null
	requestAnimationFrame(function animate(nowMsec){
		// keep looping
		requestAnimationFrame( animate );
		// measure time
		lastTimeMsec	= lastTimeMsec || nowMsec-1000/60
		var deltaMsec	= Math.min(200, nowMsec - lastTimeMsec)
		lastTimeMsec	= nowMsec
		// call each update function
		updateFcts.forEach(function(updateFn){
			updateFn(deltaMsec/1000, nowMsec/1000)
		})
	})
}


function setupGui()
{
	// Definicion de los controles
	effectController = {
		mensaje: 'Interfaz',
		velang: 1,
		reiniciar: function(){
			TWEEN.removeAll();
			cubo.position.set(-2.5,0,-2.5);
			cubo.rotation.set( 0, 0, 0 );
			startAnimation();
		},
		sombras: true,
		color: "rgb(255,0,0)"
	};

	// Creacion interfaz
	var gui = new dat.GUI();

	// Construccion del menu
	var h = gui.addFolder("Control peonza");
	h.add(effectController, "mensaje").name("Peonza");
	h.add(effectController, "velang", 0, 5, 0.5).name("Vueltas/sg");
	h.add(effectController, "reiniciar").name("Reiniciar");
	var sensorColor = h.addColor(effectController, "color").name("Color");
	sensorColor.onChange( function(color){
							esferacubo.traverse( function(hijo){
								if( hijo instanceof THREE.Mesh ) hijo.material.color = new THREE.Color(color);
							})
						  });
}

function startAnimation(){
	// Movimiento autonomo de la peonza mediante TWEEN
	var mvtoDer = new TWEEN.Tween( cubo.position ).to( {x: [-1.5, -2.5],
													 y: [0, 0],
													 z: [0, 2.5] }, 5000 );
	var mvtoFrente = new TWEEN.Tween( cubo.position ).to( {x: [0, 2.5],
													 y: [0, 0],
													 z: [0, 2.5] }, 5000 );
	var mvtoIzq = new TWEEN.Tween( cubo.position ).to( {x: [1.5, 2.5],
													 y: [0, 0],
													 z: [0, -2.5] }, 5000 );
	var mvtoTras = new TWEEN.Tween( cubo.position ).to( {x: [0, -2.5],
													 y: [0, 0],
													 z: [-1.5, -2.5] }, 5000 );

	mvtoDer.easing(TWEEN.Easing.Bounce.Out);
	mvtoDer.interpolation( TWEEN.Interpolation.Bezier );
	mvtoFrente.easing(TWEEN.Easing.Bounce.Out);
	mvtoFrente.interpolation( TWEEN.Interpolation.Bezier );
	mvtoIzq.easing(TWEEN.Easing.Bounce.Out);
	mvtoIzq.interpolation( TWEEN.Interpolation.Bezier );
	mvtoTras.easing(TWEEN.Easing.Bounce.Out);
	mvtoTras.interpolation( TWEEN.Interpolation.Bezier );

	mvtoDer.chain( mvtoFrente );
	mvtoFrente.chain( mvtoIzq );
	mvtoIzq.chain( mvtoTras );
	//mvto.repeat( 1 );
	//mvto.yoyo( true );
	mvtoDer.start();

	// Giro de la peonza
	var giro = new TWEEN.Tween( cubo.rotation ).to( {x:0, y:-Math.PI*2, z:0}, 2000 );
	giro.repeat(Infinity);
	giro.start();
}

function updateAspectRation(argument) {

	// Renueva la relacion de aspecto de la camara

	// Ajustar el tamano del canvas
	renderer.setSize(window.innerWidth, window.innerHeight);
	camera.aspect = window.innerWidth/window.innerHeight;

	/* Camara ortografica
	if (ar > 1) { //büyük ise ekranın sol ve sağına tersinde aşağı ve yukarı
		camera.left = -4*ar;
		camera.right = 4*ar;
		camera.bottom = -4;
		camera.top = 4;
	}
	else {
		camera.top = 4/ar;
		camera.bottom = -4/ar;
		camera.left = -4;
		camera.right = 4;
	}
*/

	// Camara perspectiva
	camera.updateProjectionMatrix();
}

function update() {

	// Variacion de la escena entre frames
	// https://goktuginal.github.io/usocanvas.html

	// Control de camra
	cameraControls.update();
	// Actualiza los FPS
	stats.update();
	// Actualiza interpoladores
	TWEEN.update();
}

function render() {
	
	// Construir el frame y mostrarlo
	requestAnimationFrame(render);
	update();
	renderer.render(scene, camera);
}