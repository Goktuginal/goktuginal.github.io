/**
*	Seminario GPC #3. Camara.
*	Dibujar formas basicas y un modelo importado.
*	Muestra el bucle tipico de inicializacion, escena y render.
*
*/


// Variables de consenso
// Motor, escena y la camara
var renderer, scene, camera;

// Otras globales
var esferacubo, cubo, angulo = 0;
var l = b = -4;
var r = t = -l;
var cameraControls;
var alzado, planta, perfil;

// Acciones
init();
loadScene();
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

	// Captura de eventos
	window.addEventListener('resize', updateAspectRation);

}

function updateAspectRation(argument) {

	// Renueva la relacion de aspecto de la camara

	// Ajustar el tamano del canvas
	renderer.setSize(window.innerWidth, window.innerHeight);

	// Razon de aspecto
	var ar = window.innerWidth/window.innerHeight;

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
	camera.aspect = ar;
	camera.updateProjectionMatrix();
}


function loadScene() {

	// Construir el grafo de escena

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
	cubo.add(new THREE.AxisHelper(1));
	esferacubo.add(esfera);
	scene.add(esferacubo);
	scene.add( new THREE.AxisHelper(3));

	var keyboard = new THREEx.KeyboardState(renderer.domElement);
	renderer.domElement.setAttribute("tabIndex", "0");
	renderer.domElement.focus();

	updateFcts.push(function(delta, now){
		if (keyboard.pressed('left')) {
			esferacubo.rotation.y -= 1 * delta;
		}else if(keyboard.pressed('right')){
			esferacubo.rotation.y += 1 * delta;
		}
		if (keyboard.pressed('down')) {
			esferacubo.rotation.x += 1 * delta;
		}else if(keyboard.pressed('right')){
			esferacubo.rotation.x -= 1 * delta;
		}
	});

	// only on keydown
	keyboard.domElement.addEventListener('keydown', function(event){
		if (keyboard.eventMatches(event, 'w')) esferacubo.scale.y /= 2;
		if (keyboard.eventMatches(event, 's')) esferacubo.scale.y *= 2;
	});
	// only on keyup
}	keyboard.domElement.addEventListener('keyup', function(event){
		if (keyboard.eventMatches(event, 'a')) esferacubo.scale.x *= 2;
		if (keyboard.eventMatches(event, 'd')) esferacubo.scale.x /= 2;
	});

function update() {

	// Variacion de la escena entre frames
	// https://goktuginal.github.io/usocanvas.html

}

function render() {
	
	// Construir el frame y mostrarlo
	requestAnimationFrame(render);
	update();
	renderer.render(scene, camera);
}