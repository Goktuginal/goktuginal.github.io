/**
*	Seminario GPC #2. Forma Basica.
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
var base, brazo, antrebrazo, pinzas, robot, cubo, cubo2, angulo = 0, angulo2 = 0, angulo3 = 0, angulo4 = 0, angulo5 = 0, angulo6 = 0;
var antes = Date.now();
var antes2 = Date.now();
var antes3 = Date.now();
var antes4 = Date.now();
var antes5 = Date.now();
var antes6 = Date.now();
/*var l = b = -4;
var r = t = -l;*/

var cameraControls;

// Acciones
init();
loadScene();
setupGui();
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

	// Camara perspectiva
	var camaraPerspectiva = new THREE.PerspectiveCamera(70, ar, 0.1, 50);
	camaraPerspectiva.position.set(1, 2, 10);
	camaraPerspectiva.lookAt(origen);

	camera = camaraPerspectiva.clone();
	
	scene.add(camera);

}

function init() {

	// Configurar el motor de render y el canvas
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setClearColor(new THREE.Color(0x000000));
	renderer.autoClear = false;
	document.getElementById("container").appendChild(renderer.domElement);

	// Escena
	scene = new THREE.Scene();

	// Camara
	var ar = window.innerWidth / window.innerHeight;
	camera = new THREE.PerspectiveCamera(75, ar, 0.1, 100);
	
	camera.position.set(0.5, 3, 9);
	camera.lookAt(new THREE.Vector3(0, 0, 0));
	scene.add(camera);
	//setCameras(ar);

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
	//renderer.domElement.addEventListener('dblclick', rotate);
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
	var updateFcts	= [];

	// Materiales
	var material = new THREE.MeshBasicMaterial({color: 'yellow', wireframe: true});
	var material2 = new THREE.MeshBasicMaterial({color: 'red', wireframe: true});

	base = new THREE.Object3D();
	var base_del_robot = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.5, 0.25, 10, 2), material);
	base_del_robot.position.set(0, 0.25, 0);
	base.add(base_del_robot);

	brazo = new THREE.Object3D();
	var wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.3, 10, 2), material);
	wheel.position.set(0, 0.25, 0);
	wheel.rotation.z = Math.PI/2;
	brazo.add(wheel);
	var legs = new THREE.Mesh(new THREE.BoxGeometry(0.3, 2.5, 0.3), material);
	legs.position.set(0, 1.5, 0);
	brazo.add(legs);
	var belly = new THREE.Mesh(new THREE.SphereGeometry(0.5, 10, 10), material);
	belly.position.set(0, 2.5, 0);
	brazo.add(belly);

	antrebrazo = new THREE.Object3D();
	var belt = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.7, 0.1, 10, 2), material);
	belt.position.set(0, 2.5, 0);
	antrebrazo.add(belt);
	var head = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 1.3, 10, 2), material);
	head.position.set(0, 4.0, 0);
	head.rotation.z = Math.PI/2;
	antrebrazo.add(head);
	var rib1 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 1.7, 0.1), material);
	rib1.position.set(-0.3, 3.3, -0.2);
	antrebrazo.add(rib1);
	var rib2 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 1.7, 0.1), material);
	rib2.position.set(-0.3, 3.3, 0.2);
	antrebrazo.add(rib2);
	var rib3 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 1.7, 0.1), material);
	rib3.position.set(0.3, 3.3, -0.2);
	antrebrazo.add(rib3);
	var rib4 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 1.7, 0.1), material);
	rib4.position.set(0.3, 3.3, 0.2);
	antrebrazo.add(rib4);

	pinzas = new THREE.Object3D();
	var malla = new THREE.Geometry();
	var semilado = 0.5;

	var coordenadas = [
					 semilado/4, -semilado/2,  semilado,
					 semilado/4, -semilado/2, -semilado,
					 semilado/4,  semilado/2, -semilado,
					 semilado/4,  semilado/2,  semilado,
					-semilado/4,  semilado/2,  semilado,
					-semilado/4,  semilado/2, -semilado,
					-semilado/4, -semilado/2, -semilado,
					-semilado/4, -semilado/2,  semilado,
					 semilado/8, -semilado/4,  semilado*3,
					 semilado/4, -semilado/2,  semilado,
					 semilado/4,  semilado/2,  semilado,
					 semilado/8,  semilado/4,  semilado*3,
					-semilado/8,  semilado/4,  semilado*3,
					-semilado/4,  semilado/2,  semilado,
					-semilado/4, -semilado/2,  semilado,
					-semilado/8, -semilado/4,  semilado*3	];

	var indices = [
				0,3,7, 7,3,4, 0,1,2,	
				0,2,3, 4,3,2, 4,2,5,
				6,7,4, 6,4,5, 1,5,2,
				1,6,5, 7,6,1, 7,1,0,
				8,11,15, 15,11,15, 8,9,10,
				8,10,11, 12,11,10, 12,10,13,
				14,15,12, 14,12,13, 9,13,10,
				9,14,13, 15,14,9, 15,9,8	];

	for(var i = 0; i < coordenadas.length; i+=3){
		var vertice = new THREE.Vector3(coordenadas[i], coordenadas[i+1], coordenadas[i+2]);
		malla.vertices.push(vertice);
	}
	for(var i = 0; i < indices.length; i+=3){
		var triangulo = new THREE.Face3(indices[i], indices[i+1], indices[i+2]);
		malla.faces.push(triangulo);
	}

	cubo = new THREE.Mesh(malla, material);
	cubo.position.set(-0.5, 4.0, 0.5);
	cubo2 = new THREE.Mesh(malla, material);
	cubo2.position.set(0.5, 4.0, 0.5);
	pinzas.add(cubo);
	pinzas.add(cubo2);

	base.add(brazo);
	brazo.add(antrebrazo);
	antrebrazo.add(pinzas);

	base.rotation.y = Math.PI/4;

	robot = new THREE.Object3D();
	robot.position.set(0,0,0);
	robot.add(base);
	scene.add(robot);

	// Keybord
	var keyboard = new THREEx.KeyboardState(renderer.domElement);
	renderer.domElement.setAttribute("tabIndex", "0");
	renderer.domElement.focus();

	updateFcts.push(function(delta, now){
		if (keyboard.pressed('left')) {
			robot.position.x -= 1 * delta;
		}else if(keyboard.pressed('right')){
			robot.position.x += 1 * delta;
		}
		if (keyboard.pressed('down')) {
			robot.position.y += 1 * delta;
		}else if(keyboard.pressed('up')){
			robot.position.y -= 1 * delta;
		}
	});

	// only on keydown
	/*keyboard.domElement.addEventListener('keydown', function(event){
		if (keyboard.eventMatches(event, 'w')) robot.scale.y /= 2;
		if (keyboard.eventMatches(event, 's')) robot.scale.y *= 2;
	});*/
	// only on keyup
	/*keyboard.domElement.addEventListener('keyup', function(event){
		if (keyboard.eventMatches(event, 'a')) robot.scale.x *= 2;
		if (keyboard.eventMatches(event, 'd')) robot.scale.x /= 2;
	});*/

	updateFcts.push(function(){
		renderer.render( scene, camera );		
	});

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
		});
	});
}

function setupGui()
{
	// Definicion de los controles
	effectController = {
		mensaje: 'Interfaz',
		velang: 0,
		velang2: 0,
		velang3: 0,
		velang4: 0,
		velang5: 0,
		velang6: 0,
		sombras: true,
		color: "rgb(255,0,0)"
	};

	// Creacion interfaz
	var gui = new dat.GUI();

	// Construccion del menu
	var h = gui.addFolder("Control peonza");
	h.add(effectController, "mensaje").name("Peonza");
	h.add(effectController, "velang", -5, 5, 0.5).name("Giro Base");
	h.add(effectController, "velang2", -5, 5, 0.5).name("Giro Brazo");
	h.add(effectController, "velang3", -5, 5, 0.5).name("Giro Antrebrazo Y");
	h.add(effectController, "velang4", 0, 5, 0.5).name("Giro Antrebrazo Z");
	h.add(effectController, "velang5", 0, 5, 0.5).name("Giro Pinza");
	h.add(effectController, "velang6", 0, 5, 0.5).name("Separacion Pinza");
	var sensorColor = h.addColor(effectController, "color").name("Color");
	sensorColor.onChange( function(color){
							base.traverse( function(hijo){
								if( hijo instanceof THREE.Mesh ) hijo.material.color = new THREE.Color(color);
							})
						  });
}

function updateAspectRation(argument) {

	// Renueva la relacion de aspecto de la camara

	// Ajustar el tamano del canvas
	renderer.setSize(window.innerWidth, window.innerHeight);
	camera.aspect = window.innerWidth/window.innerHeight;
	// Camara perspectiva
	camera.updateProjectionMatrix();
}

function update() {

	// Variacion de la escena entre frames
	// Variacion de la escena entre frames

	// Rotacion de la peonza ------------
	var ahora = Date.now();							// Hora actual
	angulo += effectController.velang * 2*Math.PI * (ahora-antes)/1000;			// Incrementar el angulo en 360Âº / sg
	antes = ahora;									// Actualizar antes
	base.rotation.y = angulo/2;
	//eje.rotation.y = angulo/2;

	var ahora2 = Date.now();							// Hora actual
	angulo2 += effectController.velang2 * 2*Math.PI * (ahora2-antes2)/1000;			// Incrementar el angulo en 360Âº / sg
	antes2 = ahora2;									// Actualizar antes
	brazo.rotation.z = angulo2/2;

	var ahora3 = Date.now();							// Hora actual
	angulo3 += effectController.velang3 * Math.PI/4 * (ahora3-antes3)/1000;			// Incrementar el angulo en 360Âº / sg
	antes3 = ahora3;									// Actualizar antes
	antrebrazo.rotation.y = angulo3/2;

	var ahora4 = Date.now();							// Hora actual
	angulo4 += effectController.velang4 * 2*Math.PI * (ahora4-antes4)/1000;			// Incrementar el angulo en 360Âº / sg
	antes4 = ahora4;									// Actualizar antes
	antrebrazo.rotation.z = angulo4/2;

	var ahora5 = Date.now();							// Hora actual
	angulo5 += effectController.velang5 * 2*Math.PI * (ahora5-antes5)/1000;			// Incrementar el angulo en 360Âº / sg
	antes5 = ahora5;									// Actualizar antes
	pinzas.rotation.z = angulo5/2;

	var ahora6 = Date.now();							// Hora actual
	angulo6 += effectController.velang6 * 2*Math.PI * (ahora6-antes6)/1000;			// Incrementar el angulo en 360Âº / sg
	antes6 = ahora6;									// Actualizar antes
	pinzas.rotation.z = angulo6/2;

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

	// Thumnail
	renderer.setViewport(0, window.innerHeight/16, 
						window.innerWidth/8, window.innerHeight/8);
	renderer.render(scene, camera); 	

	// Robot
	renderer.setViewport(0, window.innerHeight/4, 
						window.innerWidth, window.innerHeight);
	renderer.render(scene, camera);
}

// https://goktuginal.github.io/usocanvas.html







