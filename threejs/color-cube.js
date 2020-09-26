// Variables de consenso
// Motor, escena y la camara
var renderer, scene, camera;

// Otras globales
//var esferaCubo, angulo = 0;

// Acciones
init();
loadMesh();
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

function loadMesh() {
	
	var geometry = new THREE.Geometry();
	geometry.vertices.push(
		new THREE.Vector3(-10,  10, 0),
		new THREE.Vector3(-10, -10, 0),
		new THREE.Vector3( 10, -10, 0)
		);
	geometry.faces.push(new THREE.Face3(0, 1, 2));


	var material = new THREE.MeshLambertMaterial({color: 'yellow'});
    var mesh =new THREE.Mesh(geometry, material);
    mesh.position.z = -1000;

    scene.add(mesh);
}

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







