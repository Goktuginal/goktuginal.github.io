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

	var metarial = new THREE.MeshBasicMaterial({color: 'red', wireframe: true});
	var ms = new THREE.Matrix4();
	var mt = new THREE.Matrix4();

	var tela = new THREE.Mesh(new THREE.CylinderGeometry(0.0, 1.0, 1.0), metarial);
	tela.matrixAutoUpdate = false;
	mt.makeTranslation(0, 1.5, 0);
	ms.makeScale(2, 0.5, 2);

	tela.matrix = mt.multiply(ms);

	var baston = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 1), metarial);
	baston.position.y = 0.5;
	baston.scale.set(0.05, 3, 0.05);

	var mango = new THREE.Mesh(new 	THREE.CubeGeometry(1, 1, 1), metarial);
	mango.scale.set(0.2, 0.4, 0.2);
	mango.position.set(0, -1, 0);

	paraguas = new THREE.Object3D();
	paraguas.add(tela);
	paraguas.add(baston);
	paraguas.add(mango);
	paraguas.position.set(1.6, 0, 0);
	paraguas.rotation.x = Math.PI/6;

	scene.add(paraguas); 	
}

var antes = Date.now();

function update() {

	// Variacion de la escena entre frames
	var ahora = Date.now();
	angulo += Math.PI/30 * (ahora - antes/1000);
	antes = ahora;
	paraguas.rotation.y = angulo;

/*	angulo += Math.PI/100;
*//*	esferacubo.rotation.y = angulo;
*/
}

function render() {
	
	// Construir el frame y mostrarlo
	requestAnimationFrame(render);
	update();
	renderer.render(scene, camera);
}







