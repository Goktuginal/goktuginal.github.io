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
	var material = new THREE.MeshBasicMaterial({color: 'yellow', wireframe: true});

	// Geometrias
	var cylinder = new THREE.CylinderGeometry(1.25, 1.25, 0.15, 30);
	var cylinder2 = new THREE.CylinderGeometry(0.59, 0.59, 0.18, 30);
	var sphere = new THREE.SphereGeometry(0.55, 30, 30);
	var boks = new THREE.BoxGeometry(0.3, 2.5, 0.3);
	var cylinder3 = new THREE.CylinderGeometry(0.75, 0.75, 0.18, 30);
	var cylinder4 = new THREE.CylinderGeometry(0.55, 0.55, 0.78, 30);
	var boks2 = new THREE.BoxGeometry(0.1, 1.5, 0.1);
	var boks3 = new THREE.BoxGeometry(0.1, 1.5, 0.1);
	var boks4 = new THREE.BoxGeometry(0.1, 1.5, 0.1);
	var boks5 = new THREE.BoxGeometry(0.1, 1.5, 0.1);
	// Objetos
	var ba = new THREE.Mesh(cylinder, material);

	var ground = new THREE.Mesh(cylinder2, material);
	ground.rotation.x = 90;
	ground.rotation.z = 45;
	var head = new THREE.Mesh(sphere, material);
	head.position.y = 3;
	head.rotation.y = 45;
	var body = new THREE.Mesh(boks, material);
	body.position.y = 1.5;
	body.rotation.y = 45;

	var disco = new THREE.Mesh(cylinder3, material);
	disco.position.y = 3;
	disco.rotation.y = 45;
	var head2 = new THREE.Mesh(cylinder4, material);
	head2.position.y = 5;
	head2.rotation.x = 90;
	head2.rotation.z = 45;
	var leg1 = new THREE.Mesh(boks2, material);
	leg1.position.x = -0.5;
	leg1.position.z = -0.5;
	leg1.position.y = 4;
	leg1.rotation.y = 45;
	var leg2 = new THREE.Mesh(boks3, material);
	leg2.position.x = -0.5;
	leg2.position.z = 0.5;
	leg2.position.y = 4;
	leg2.rotation.y = 45;
	var leg3 = new THREE.Mesh(boks4, material);
	leg3.position.x = 0.5;
	leg3.position.z = -0.5;
	leg3.position.y = 4;
	leg3.rotation.y = 45;
	var leg4 = new THREE.Mesh(boks5, material);
	leg4.position.x = 0.5;
	leg4.position.z = 0.5;
	leg4.position.y = 4;
	leg4.rotation.y = 45;


	
	// Orden de las transformaciones TRS
	//cubo.rotation.y = Math.PI/4;
	//cubo.position.x = -1;
	//var esfera = new THREE.Mesh(geoesfera, material);
	//esfera.position.x = 1;

	// Objeto contenedor
	antebrazo = new THREE.Object3D();
	brazo = new THREE.Object3D();
	base = new THREE.Object3D();
	robot = new THREE.Object3D();
	/*esferacubo.position.y = 0.5;
	esferacubo.rotation.y = angulo;*/

	// Modelo externo
	/*var loader = new THREE.ObjectLoader();
	loader.load('models/soldado/soldado.json', 
				function(obj){
					obj.position.set(0, 1, 0);
					cubo.add(obj);
	});*/

	//Organizacion de la escena
	antebrazo.add(leg1)
	antebrazo.add(leg2)
	antebrazo.add(leg3)
	antebrazo.add(leg4)
	antebrazo.add(head2)
	antebrazo.add(disco)
	brazo.add(antebrazo)
	brazo.add(body);
	brazo.add(head);
	brazo.add(ground);
	head.add( new THREE.AxisHelper(4));
	base.add(brazo);
	brazo.add( new THREE.AxisHelper(5));
	base.add(ba)
	robot.add(base);
	scene.add(robot);
	scene.add( new THREE.AxisHelper(3));
}

function update() {

	// Variacion de la escena entre frames
	//angulo += Math.PI/100;
	//esferacubo.rotation.y = angulo;

}

function render() {
	
	// Construir el frame y mostrarlo
	requestAnimationFrame(render);
	update();
	renderer.render(scene, camera);
}







