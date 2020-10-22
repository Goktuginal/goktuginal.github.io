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


function setCameras(ar) {

	// Construye las camaras planta, alzado, perfil y perspectiva
	var origen = new THREE.Vector3(0, 0, 0);

	if (ar > 1) {
		var camaraOrtografica = new THREE.OrthographicCamera(l*ar, r*ar, t, b, -20, 20);
	}
	else {
		var camaraOrtografica = new THREE.OrthographicCamera(l, r, t/ar, b/ar, -20, 20);
	}

	// Camaras ortograficas
	alzado = camaraOrtografica.clone();
	alzado.position.set(0, 0, 4);
	alzado.lookAt(origen);
	perfil = camaraOrtografica.clone();
	perfil.position.set(4, 0, 0);
	perfil.lookAt(origen);
	planta = camaraOrtografica.clone();
	planta.position.set(0, 4, 0);
	planta.lookAt(origen);
	planta.up = new THREE.Vector3(0, 0, -1);

	// Camara perspectiva
	var camaraPerspectiva = new THREE.PerspectiveCamera(50, ar, 0.1, 50);
	camaraPerspectiva.position.set(1, 2, 10);
	camaraPerspectiva.lookAt(origen);

	camera = camaraPerspectiva.clone();

	scene.add(alzado);
	scene.add(planta);
	scene.add(perfil);
	scene.add(camera);

}

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
	/*camera = new THREE.PerspectiveCamera(75, ar, 0.1, 100);
	camera = new THREE.OrthographicCamera(l, r, t, b, -20, 20);
	scene.add(camera);
	camera.position.set(0.5, 3, 9);
	camera.lookAt(new THREE.Vector3(0, 0, 0));*/
	setCameras(ar);

	// Control de camara
	cameraControls = new THREE.OrbitControls(camera, renderer.domElement);
	cameraControls.target.set(0, 0, 0);
	cameraControls.noKeys = true;

	// Captura de eventos
	window.addEventListener('resize', updateAspectRation);
	renderer.domElement.addEventListener('dblclick', rotate);

}

function rotate(event) {

	// Gira el objeto senyalado 45 grados
	var x = event.clientX;
	var y = event.clientY;

	var derecha = false, abajo = false;
	var cam = null;

	// Cuadrante para la x,y?
	if (x > window.innerWidth/2) {
		x -= window.innerWidth/2;
		derecha = true;
	};
	if (y > window.innerHeight/2) {
		y -= window.innerHeight/2;
		abajo = true;
	};
	if (derecha)
		if (abajo)	cam = camera;
		else 	cam = perfil;
	else 
		if (abajo) cam = planta;
		else cam = alzado;
		

	// Transformacion a cuadrado de 2x2
	x = (2 * x / window.innerWidth) * 2 - 1;
	y = -(2 * y / window.innerHeight) * 2 + 1;

	console.log(x + "," + y);
	var rayo = new THREE.Raycaster();
	rayo.setFromCamera(new THREE.vector2(x, y), camera);

	var interseccion = rayo.intersectObjects(scene.children, true);

	if (interseccion.length > 0) {
		interseccion[0].object.rotation.y += Math.PI/4;
	}
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

	// Modelo externo
	var loader = new THREE.ObjectLoader();
	loader.load('models/soldado/soldado.json', 
				function(obj){
					obj.position.set(0, 1, 0);
					cubo.add(obj);
	});

	//Organizacion de la escena
	esferacubo.add(cubo);
	cubo.add(new THREE.AxisHelper(1));
	esferacubo.add(esfera);
	scene.add(esferacubo);
	scene.add( new THREE.AxisHelper(3));
}

function update() {

	// Variacion de la escena entre frames
	

}

function render() {
	
	// Construir el frame y mostrarlo
	requestAnimationFrame(render);
	update();

	// Para cada render debo indicar el viewport
	renderer.setViewport(window.innerWidth/2, window.innerHeight/2, 
						window.innerWidth/2, window.innerHeight/2);

	// Aynı anda çalıştırabilirsin.
	renderer.render(scene, planta); 	// Tepeden göstermesi gerekiyor
	renderer.setViewport(0, window.innerHeight/2, 
						window.innerWidth/2, window.innerHeight/2);
	renderer.render(scene, alzado); 	// Yandan göstermesi gerekiyor
	renderer.setViewport(0, 0, 
						window.innerWidth/2, window.innerHeight/2);
	renderer.render(scene, perfil); 	// Profilden göstermesi gerekiyor
	renderer.setViewport(window.innerWidth/2, 0, 
						window.innerWidth/2, window.innerHeight/2);
	renderer.render(scene, camera);

}

// https://goktuginal.github.io/usocanvas.html







