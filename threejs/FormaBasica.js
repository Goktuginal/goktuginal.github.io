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

var updateFcts	= [];

// Monitor de recursos
var stats;
// Global GUI
var effectController;

// Otras globales
var base, brazo, antrebrazo, root1, root2, root3, pinzas, robot, cubo, cubo2, angulo = 0;

var cameraControls;

// Acciones
init();
loadScene();
setupGui();
render();

function init() {

	// Configurar el motor de render y el canvas
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setClearColor(new THREE.Color(0xFFFFFF));
	renderer.shadowMap.enabled = true;
	document.getElementById('container').appendChild(renderer.domElement);

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
	//cameraControls.noKeys = true;

	// STATS --> stats.update() en update()
	stats = new Stats();
	stats.setMode( 0 );					// Muestra FPS
	stats.domElement.style.position = 'absolute';		// Abajo izquierda
	stats.domElement.style.bottom = '0px';
	stats.domElement.style.left = '0px';
	document.getElementById('container').appendChild(stats.domElement);

	// Captura de eventos
	window.addEventListener('resize', updateAspectRation);
	//renderer.domElement.addEventListener('dblclick', rotate);

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
			robot.position.z += 1 * delta;
		}else if(keyboard.pressed('up')){
			robot.position.z -= 1 * delta;
		}
	});

	var lastTimeMsec= null
	requestAnimationFrame(function animate(nowMsec){
		// keep looping
		requestAnimationFrame(animate);
		// measure time
		lastTimeMsec	= lastTimeMsec || nowMsec-1000/60
		var deltaMsec	= Math.min(200, nowMsec - lastTimeMsec)
		lastTimeMsec	= nowMsec
		// call each update function
		updateFcts.forEach(function(updateFn){
			updateFn(deltaMsec/1000, nowMsec/1000)
		});
	});

	// Luces
	var luzAmbiente = new THREE.AmbientLight(0xFFFFFF, 0.2);
	scene.add(luzAmbiente);

	var luzPuntual = new THREE.PointLight(0xFFFFFF, 0.5);
	luzPuntual.position.set(-10, 10, -10);
	scene.add(luzPuntual);

	var luzDireccional = new THREE.DirectionalLight(0xFFFFFF, 0.5);
	luzDireccional.position.set(-10, 5, -10);
	scene.add(luzDireccional);

	var luzFocal = new THREE.SpotLight(0xFFFFFF, 0.5);
	luzFocal.position.set(10, 10, 1);
	luzFocal.target.position.set(0, 0, 0);
	luzFocal.angel = Math.PI/10;
	luzFocal.penumbra = 0.2;
	luzFocal.castShadow =true;
	scene.add(luzFocal);
}

/*function rotate(event) {

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
}*/

function loadScene() {

	// Construir el grafo de escena
	var path = "images/";
	var texturaSuelo = new THREE.TextureLoader().load(path+'pisometal_1024x1024.jpg');
	texturaSuelo.magFilter = THREE.LinearFilter;
	texturaSuelo.minFilter = THREE.LinearFilter;
	texturaSuelo.repeat.set(1, 1);
	texturaSuelo.wrapS = texturaSuelo.wrapT = THREE.RepeatWrapping;

	var texturaBase = new THREE.TextureLoader().load(path+'wood512.jpg');
	var texturaWheel = new THREE.TextureLoader().load(path+'wood512.jpg');
	var texturaLegs = new THREE.TextureLoader().load(path+'wood512.jpg');
	var texturaBelly = new THREE.TextureLoader().load(path+'Earth.jpg');
	var texturaBelt = new THREE.TextureLoader().load(path+'Earth.jpg');
	var texturaHead = new THREE.TextureLoader().load(path+'wood512.jpg');
	var texturaRib = new THREE.TextureLoader().load(path+'burberry_256.jpg');
	var texturaCubo = new THREE.TextureLoader().load(path+'metal_128.jpg');
	var texturaCubo2 = new THREE.TextureLoader().load(path+'metal_128.jpg');

	var paredes = [path+'pond/posx.jpg', path+'pond/negx.jpg',
					path+'pond/posy.jpg', path+'pond/negy.jpg',
					path+'pond/posz.jpg', path+'pond/negz.jpg'
					];
	var mapaEntorno = new THREE.CubeTextureLoader().load(paredes);
	
	// Materiales
	var material = new THREE.MeshBasicMaterial({color: 'yellow', wireframe: true});
	var materialBasico = new THREE.MeshBasicMaterial({color: 'yellow'});
	var materialMate = new THREE.MeshLambertMaterial({color: '#007fff', map:texturaBase});
	var materialMate2 = new THREE.MeshLambertMaterial({color: 'white', map:texturaRib});
	var matsuelo = new THREE.MeshLambertMaterial({color: 'white', map:texturaSuelo});
	var materialBrillante = new THREE.MeshPhongMaterial({color: 'white', 
														specular:'white',
														shinniness: 50,
														map:texturaHead});

	/// Object

	var geosuelo = new THREE.PlaneGeometry(20, 20, 200, 200);

	var suelo = new THREE.Mesh(geosuelo, matsuelo);
	suelo.rotation.x = -Math.PI/2;
	suelo.position.y = -0.5;
	suelo.receiveShadow = true;

	var base_del_robot = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.5, 0.25, 10, 2), materialMate);
	base_del_robot.receiveShadow = true;
	base_del_robot.castShadow = true;

	brazo = new THREE.Object3D();
	var wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.3, 10, 2), materialMate);
	wheel.position.set(0, 0.25, 0);
	wheel.rotation.z = Math.PI/2;
	wheel.receiveShadow = true;
	wheel.castShadow = true;
	brazo.add(wheel);
	var legs = new THREE.Mesh(new THREE.BoxGeometry(0.3, 2.5, 0.3), materialBrillante);
	legs.position.set(0, 1.5, 0);
	legs.receiveShadow = true;
	legs.castShadow = true;
	brazo.add(legs);
	var belly = new THREE.Mesh(new THREE.SphereGeometry(0.5, 10, 10), materialBrillante);
	belly.position.set(0, 2.5, 0);
	belly.receiveShadow = true;
	belly.castShadow = true;
	brazo.add(belly);

	antrebrazo = new THREE.Object3D();
	var belt = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.7, 0.1, 10, 2), materialMate2);
	belt.position.set(0, 0, 0);
	belt.receiveShadow = true;
	belt.castShadow = true;
	antrebrazo.add(belt);
	var head = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 1.3, 10, 2), materialMate2);
	head.position.set(0, 1.5, 0);
	head.rotation.z = Math.PI/2;
	head.receiveShadow = true;
	head.castShadow = true;
	antrebrazo.add(head);
	var rib1 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 1.7, 0.1), materialMate2);
	rib1.position.set(-0.3, 0.8, -0.2);
	rib1.receiveShadow = true;
	rib1.castShadow = true;
	antrebrazo.add(rib1);
	var rib2 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 1.7, 0.1), materialMate2);
	rib2.position.set(-0.3, 0.8, 0.2);
	rib2.receiveShadow = true;
	rib2.castShadow = true;
	antrebrazo.add(rib2);
	var rib3 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 1.7, 0.1), materialMate2);
	rib3.position.set(0.3, 0.8, -0.2);
	rib3.receiveShadow = true;
	rib3.castShadow = true;
	antrebrazo.add(rib3);
	var rib4 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 1.7, 0.1), materialMate2);
	rib4.position.set(0.3, 0.8, 0.2);
	rib4.receiveShadow = true;
	rib4.castShadow = true;
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

	cubo = new THREE.Mesh(malla, materialMate);
	cubo.position.set(-0.5, 0, 0.5);
	cubo.receiveShadow = true;
	cubo.castShadow = true;
	cubo2 = new THREE.Mesh(malla, materialMate);
	cubo2.position.set(0.5, 0, 0.5);
	cubo2.receiveShadow = true;
	cubo2.castShadow = true;

	pinzas.add(cubo);
	pinzas.add(cubo2);

	// Habitacion
	var shader = THREE.ShaderLib.cube;
	shader.uniforms.tCube.value = mapaEntorno;

	var matparedes = new THREE.ShaderMaterial({
		fragmentShader: shader.fragmentShader,
		vertexShader: shader.vertexShader,
		uniforms: shader.uniforms,
		depthWrite: false,
		side: THREE.BackSide
	});

	var habitacion = new THREE.Mesh(new THREE.CubeGeometry(20, 20, 20), matparedes);
	scene.add(habitacion);

	robot = new THREE.Object3D();
	robot.position.set(0,0,0);
	robot.add(base_del_robot);

	root1 = new THREE.Object3D();
	root1.position.set(0,0,0);
	robot.add(root1);
	root1.add(brazo);
	root2 = new THREE.Object3D();
	root2.position.set(0,2.5,0);
	brazo.add(root2);
	root2.add(antrebrazo);
	root3 = new THREE.Object3D();
	root3.position.set(0,1.5,0);
	antrebrazo.add(root3);
	root3.add(pinzas);

	root1.rotation.y = Math.PI/4;

	scene.add(robot);
	scene.add(suelo);
}

function setupGui()
{
	// Definicion de los controles
	effectController = {
		mensaje: 'Robot',
		velang: 0,
		velang2: 0,
		velang3: 0,
		velang4: 0,
		velang5: 0,
		velang6: 0,
		sombras: true,
		color: "rgb(255,255,255)"
	};

	// Creacion interfaz
	var gui = new dat.GUI();

	// Construccion del menu
	var h = gui.addFolder("Control peonza");
	h.add(effectController, "mensaje").name("Peonza");
	h.add(effectController, "velang", -180, 180, 1).name("Giro Base");
	h.add(effectController, "velang2", -45, 45, 1).name("Giro Brazo");
	h.add(effectController, "velang3", -180, 180, 1).name("Giro Antrebrazo Y");
	h.add(effectController, "velang4", -90, 90, 1).name("Giro Antrebrazo Z");
	h.add(effectController, "velang5", -220, 40, 1).name("Giro Pinza");
	h.add(effectController, "velang6", 0, 15, 1).name("Separacion Pinza");
	var sensorColor = h.addColor(effectController, "color").name("Color");
	sensorColor.onChange( function(color){
							robot.traverse( function(hijo){
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

	// Rotacion de la peonza ------------

	robot.rotation.y = effectController.velang*Math.PI/180;
										
	brazo.rotation.x = effectController.velang2*Math.PI/180;

	antrebrazo.rotation.y = effectController.velang3*Math.PI/180;

	antrebrazo.rotation.x = effectController.velang4*Math.PI/180;

	pinzas.rotation.x = effectController.velang5*Math.PI/180;

	cubo.position.x = effectController.velang6*Math.PI/180 + -0.5;

 	cubo2.position.x = -1*effectController.velang6*Math.PI/180 + 0.5;


	// Control de camra
	cameraControls.update();
	// Actualiza los FPS
	stats.update();
	// Actualiza interpoladores
	//TWEEN.update();

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







