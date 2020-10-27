var canvas = document.querySelector("canvas");
var scene, camera, light, renderer;

const setup = () => {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 9, 16);
  
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas: canvas,
    alpha: true 
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor( 0x000000, 0);
 
  ambient = new THREE.HemisphereLight(0xF8FCFE, 1);
  scene.add(ambient);

  controls = new THREE.OrbitControls(camera, renderer.domElement); 
};

const render = () => {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
  console.log(camera.position.x,camera.position.y,camera.position.z)
};

const resize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};


var boxAmount = 6
var boxPos = [];
var boxScale = [];
var boxGroup = new THREE.Group();

const addBoxes = () => {
  var path = "../minimal/theme/assets/img/";

  var textureLoader = new THREE.TextureLoader();
  
  var texture0 = textureLoader.load(path +'G.png' );
  var texture1 = textureLoader.load(path +'G.png' );
  var texture2 = textureLoader.load(path +'G.png' );
  var texture3 = textureLoader.load(path +'G.png' );
  var texture4 = textureLoader.load(path +'G.png' );
  var texture5 = textureLoader.load(path +'G.png' );

  var texture6 = textureLoader.load(path +'O.jpg' );
  var texture7 = textureLoader.load(path +'O.jpg' );
  var texture8 = textureLoader.load(path +'O.jpg' );
  var texture9 = textureLoader.load(path +'O.jpg' );
  var texture10 = textureLoader.load(path +'O.jpg' );
  var texture11 = textureLoader.load(path +'O.jpg' );

  var texture12 = textureLoader.load(path +'K.png' );
  var texture13 = textureLoader.load(path +'K.png' );
  var texture14 = textureLoader.load(path +'K.png' );
  var texture15 = textureLoader.load(path +'K.png' );
  var texture16 = textureLoader.load(path +'K.png' );
  var texture17 = textureLoader.load(path +'K.png' );

  var texture18 = textureLoader.load(path +'T.png' );
  var texture19 = textureLoader.load(path +'T.png' );
  var texture20 = textureLoader.load(path +'T.png' );
  var texture21 = textureLoader.load(path +'T.png' );
  var texture22 = textureLoader.load(path +'T.png' );
  var texture23 = textureLoader.load(path +'T.png' );

  var texture24 = textureLoader.load(path +'U.png' );
  var texture25 = textureLoader.load(path +'U.png' );
  var texture26 = textureLoader.load(path +'U.png' );
  var texture27 = textureLoader.load(path +'U.png' );
  var texture28 = textureLoader.load(path +'U.png' );
  var texture29 = textureLoader.load(path +'U.png' );

  var materials = [
    new THREE.MeshBasicMaterial( { map: texture0 } ),
    new THREE.MeshBasicMaterial( { map: texture1 } ),
    new THREE.MeshBasicMaterial( { map: texture2 } ),
    new THREE.MeshBasicMaterial( { map: texture3 } ),
    new THREE.MeshBasicMaterial( { map: texture4 } ),
    new THREE.MeshBasicMaterial( { map: texture5 } )
  ];
  var materials2 = [
    new THREE.MeshBasicMaterial( { map: texture6 } ),
    new THREE.MeshBasicMaterial( { map: texture7 } ),
    new THREE.MeshBasicMaterial( { map: texture8 } ),
    new THREE.MeshBasicMaterial( { map: texture9 } ),
    new THREE.MeshBasicMaterial( { map: texture10 } ),
    new THREE.MeshBasicMaterial( { map: texture11 } )
  ];
  var materials3 = [
    new THREE.MeshBasicMaterial( { map: texture12 } ),
    new THREE.MeshBasicMaterial( { map: texture13 } ),
    new THREE.MeshBasicMaterial( { map: texture14 } ),
    new THREE.MeshBasicMaterial( { map: texture15 } ),
    new THREE.MeshBasicMaterial( { map: texture16 } ),
    new THREE.MeshBasicMaterial( { map: texture17 } )
  ];
  var materials4 = [
    new THREE.MeshBasicMaterial( { map: texture18 } ),
    new THREE.MeshBasicMaterial( { map: texture19 } ),
    new THREE.MeshBasicMaterial( { map: texture20 } ),
    new THREE.MeshBasicMaterial( { map: texture21 } ),
    new THREE.MeshBasicMaterial( { map: texture22 } ),
    new THREE.MeshBasicMaterial( { map: texture23 } )
  ];
  var materials5 = [
    new THREE.MeshBasicMaterial( { map: texture24 } ),
    new THREE.MeshBasicMaterial( { map: texture25 } ),
    new THREE.MeshBasicMaterial( { map: texture26 } ),
    new THREE.MeshBasicMaterial( { map: texture27 } ),
    new THREE.MeshBasicMaterial( { map: texture28 } ),
    new THREE.MeshBasicMaterial( { map: texture29 } )
  ];
  
  var faceMaterial = new THREE.MeshFaceMaterial( materials );
  var faceMaterial2 = new THREE.MeshFaceMaterial( materials2 );
  var faceMaterial3 = new THREE.MeshFaceMaterial( materials3 );
  var faceMaterial4 = new THREE.MeshFaceMaterial( materials4 );
  var faceMaterial5 = new THREE.MeshFaceMaterial( materials5 );


  var geo = new THREE.BoxBufferGeometry(2,2,2);
  for (var i = 0; i < boxAmount; i++) {
    if (i == 0 || i == 5) var mesh = new THREE.Mesh(geo,faceMaterial);
    else if (i == 1) var mesh = new THREE.Mesh(geo,materialBrillante2);
    else if (i == 2) var mesh = new THREE.Mesh(geo,materialBrillante3);
    else if (i == 3) var mesh = new THREE.Mesh(geo,materialBrillante4);
    else if (i == 4) var mesh = new THREE.Mesh(geo,materialBrillante5);

    boxPos.push(mesh.position);
    boxScale.push(mesh.scale);
    mesh.position.set(i*4,2,0);
    mesh.castShadow = true;
    boxGroup.add(mesh);
  }
  scene.add(boxGroup);
  boxGroup.position.set(-11,-1,0);
}

const addLights = () => {
  var light = new THREE.SpotLight(0xF3F8FD,0.2);
  light.position.set(-10,40,50);
  light.castShadow = true
  light.shadow.mapSize.width = 2048;
  light.shadow.mapSize.height = 2048;
  light.shadow.camera.near = 1;
  light.shadow.camera.far = 1000;
  scene.add(light);
  
  var light2 = new THREE.SpotLight(0xF3F8FD,0.4,100);
  light2.position.set(0,0,30);
  scene.add(light2);
} 

const animateBoxes = () => {
  var tl = gsap.timeline({defaults:{duration:0.15,ease:"sine.inOut"}})
  tl.to(boxPos,{y:5.2,stagger:{amount:0.12,repeat:-1,repeatDelay:0.25}},'in+=0.1')
    .to(boxPos,{y:2,stagger:{amount:0.1,repeat:-1,repeatDelay:0.25},ease:"sine.in"},'in+=0.25')
  .to(boxScale,{y:0.8,x:1.24,z:1.24,stagger:{amount:0.1,repeat:-1,repeatDelay:0.3},duration:0.1,ease:"circ.out"},'in')
    .to(boxScale,{y:1.2,x:1,z:1,stagger:{amount:0.1,repeat:-1,repeatDelay:0.3},duration:0.1,ease:"power1.in"},'in+=0.1')
  .to(boxScale,{y:1,x:1,z:1,stagger:{amount:0.1,repeat:-1,repeatDelay:0.3},duration:0.1},'in+=0.2');
  return tl.timeScale(0.6);
}

window.addEventListener("load", () => {
  setup();
  addLights();
  addBoxes();
  animateBoxes();
  render();
});

window.addEventListener("resize", () => {
  resize();
});