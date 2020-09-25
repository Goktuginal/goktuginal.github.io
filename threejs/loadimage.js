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

	/*var pointLight = new THREE.PointLight(0xFFFFFF, 0.9);
	pointLight.position.set(1, 3, 1);
	scene.add(pointLight, 2);
	var loader = new THREE.ObjectLoader();
	loader.load('models/soldado/soldado.json', 
				function(obj) 
				{ 
					var tx = new THREE.ImageUtils.loadTexture('models/soldado/soldado.png');
					tx.minFilter = tx.magFilter = THREE.LinearFilter;
					obj.traverse(function(child)
								{
									if (child instanceof THREE.Mesh) {
										child.material.setValues({color: 'black', emissive: 0x444444, map: tx});
									}
								}
							);
					obj.name = 'soldado';
					obj.position.set(0, -1, 0);
					scene.add(obj);
				}
				);
	scene.add(new THREE.AxisHelper(1));*/

	var loader = new THREE.FontLoader();

	loader.load( 'fonts/helvetiker_regular.typeface.json', function ( font ) {

	var geometry = new THREE.TextGeometry( 'Hello three.js!', {
		font: font,
		size: 80,
		height: 5,
		curveSegments: 12,
		bevelEnabled: true,
		bevelThickness: 10,
		bevelSize: 8,
		bevelOffset: 0,
		bevelSegments: 5
	} );
	var textMaterial = new THREE.MeshPhongMaterial( { color: 0xff0000 } );

    var mesh = new THREE.Mesh( geometry, textMaterial );
    mesh.position.set( x, y, z );

    scene.add( mesh );
} );
}

function update() {

	// Variacion de la escena entre frames
	/*	angulo += Math.PI/100;*/
	/*	esferacubo.rotation.y = angulo;*/
	}

function render() {
	
	// Construir el frame y mostrarlo
	requestAnimationFrame(render);
	update();
	renderer.render(scene, camera);
}







