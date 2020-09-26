/**
*	Seminario GPC #2. Forma Basica.
*	Dibujar formas basicas y un modelo importado.
*	Muestra el bucle tipico de inicializacion, escena y render.
*
*/

// Variables de consenso
// Motor, escena y la camara
var renderer, scene, camera;

// Otras globales
var esferaCubo, angulo = 0;

// Acciones
init();
loadScene();
render();

function init() {

	// Configurar el motor de render y el canvas
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setClearColor(new THREE.Color(0x0000AA));
	document.getElementById("container").appendChild(renderer.domElement);

	// Escena
	scene = new THREE.Scene();

	// Camara
	var ar = window.innerWidth / window.innerHeight;
	camera = new THREE.PerspectiveCamera(50, ar, 0.1, 100);
	scene.add(camera);
	camera.position.set(0.5, 3, 9);
	camera.lookAt(new THREE.Vector3(0, 2, 0));
}

function loadScene() {

	// Construir el grafo de escena

	// Materiales


	// Geometrias

	// Objetos

	// Orden de las transformaciones TRS

	// Objeto contenedor
	robot = new THREE.Object3D();
	robot.position.y = 0;
	brazo = new THREE.Object3D();
	brazo.position.y = 0;

	// Modelo externo
	var loader = new THREE.ObjectLoader();
	loader.load('models/hw1/ground.json', 
				function(base){
					base.position.set(0, 0, 0);
					robot.add(base);
	});
	var loader = new THREE.ObjectLoader();
	loader.load('models/hw1/sphere.json', 
				function(eje){
					eje.position.set(0, 0, 0);
					brazo.add(eje);
	});
	var loader = new THREE.ObjectLoader();
	loader.load('models/hw1/cylinder.json', 
				function(esparrago){
					esparrago.position.set(0, 0, 0);
					brazo.add(esparrago);
	});
	var loader = new THREE.ObjectLoader();
	loader.load('models/hw1/wheel.json', 
				function(rotula){
					rotula.position.set(0, 0, 0);
					brazo.add(rotula);
	});

	//Organizacion de la escena
	robot.add(brazo);
	scene.add(robot);
	scene.add( new THREE.AxesHelper(3));
}

function update() {

	// Variacion de la escena entre frames
	
}

function render() {
	
	// Construir el frame y mostrarlo
	requestAnimationFrame(render);
	update();
	renderer.render(scene, camera);
}







