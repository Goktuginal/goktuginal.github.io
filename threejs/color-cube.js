import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r119/build/three.module.js';

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
	
	var malla = new THREE.Geometry();
	malla.vertices.push(
		new THREE.Vector3(-1, -1,  1), //0
		new THREE.Vector3( 1, -1,  1), //1
		new THREE.Vector3(-1,  1,  1), //2
		new THREE.Vector3( 1,  1,  1), //3
		new THREE.Vector3(-1, -1, -1), //4
		new THREE.Vector3( 1, -1, -1), //5
		new THREE.Vector3(-1,  1, -1), //6
		new THREE.Vector3(-1,  1, -1), //7
		);

	malla.faces.push(
		// front
		new THREE.Face3(0, 3, 2),
		new THREE.Face3(0, 1, 3),
		// right
		new THREE.Face3(1, 7, 3),
		new THREE.Face3(1, 5, 7),
		// back
		new THREE.Face3(5, 6, 7),
		new THREE.Face3(5, 4, 6),
		// left
		new THREE.Face3(4, 2, 6),
		new THREE.Face3(4, 0, 2),
		// top
		new THREE.Face3(2, 7, 6),
		new THREE.Face3(2, 3, 7),
		// bottom
		new THREE.Face3(4, 1, 0),
		new THREE.Face3(4, 5, 1),
		);
}

function makeInstance(geometry, color, x) {
    const material = new THREE.MeshBasicMaterial({color});

    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    cube.position.x = x;
    return cube;
  }

 var cubes = makeInstance(geometry, 0x44FF44,  0);

function update() {

	// Variacion de la escena entre frames
	/*angulo += Math.PI/100;
	esferacubo.rotation.y = angulo;*/
}

function render() {
	
	// Construir el frame y mostrarlo
	requestAnimationFrame(render);
	update();
	renderer.render(scene, camera);
}







