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
var esferacubo, eje, cubo, angulo = 0;

var cameraControls;
var alzado, planta, perfil;

// Objetos y tiempo
var antes = Date.now();

// Acciones
init();
loadScene();
setupGui();
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

	var geocubo = new THREE.BoxGeometry(2, 2, 2);
	var geoesfera = new THREE.SphereGeometry(1, 30, 30);
	var cubo = new THREE.Mesh(geocubo, material);
	cubo.position.y = 1.5;
	// Orden de las transformaciones TRS
	
	var esfera = new THREE.Mesh(geoesfera, material);
	esfera.position.set( 0, 0.25, 0 );

	esferacubo = new THREE.Object3D();
	esferacubo.add(cubo);
	
	//cubo.add(new THREE.AxisHelper(1));
	esferacubo.add(esfera);
	scene.add(esferacubo);
	esferacubo.rotation.x = Math.PI/16;

	eje = new THREE.Object3D();
	eje.position.set(-2.5,0,-2.5);
	eje.add( esferacubo );
	scene.add(eje);

	//Coordinates.drawGrid({size:6,scale:1});
	Coordinates.drawGrid({size:6,scale:1, orientation:"y"});
	Coordinates.drawGrid({size:6,scale:1, orientation:"z"});	

	
}


function setupGui()
{
	// Definicion de los controles
	effectController = {
		mensaje: 'Interfaz',
		velang: 1,
		sombras: true,
		color: "rgb(255,0,0)"
	};

	// Creacion interfaz
	var gui = new dat.GUI();

	// Construccion del menu
	var h = gui.addFolder("Control peonza");
	h.add(effectController, "mensaje").name("Peonza");
	h.add(effectController, "velang", 0, 5, 0.5).name("Vueltas/sg");
	var sensorColor = h.addColor(effectController, "color").name("Color");
	sensorColor.onChange( function(color){
							esferacubo.traverse( function(hijo){
								if( hijo instanceof THREE.Mesh ) hijo.material.color = new THREE.Color(color);
							})
						  });
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

	// Rotacion de la peonza ------------
	var ahora = Date.now();							// Hora actual
	angulo += effectController.velang * 2*Math.PI * (ahora-antes)/1000;			// Incrementar el angulo en 360Âº / sg
	antes = ahora;									// Actualizar antes
	esferacubo.rotation.y = angulo/2;
	//eje.rotation.y = angulo/2;

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