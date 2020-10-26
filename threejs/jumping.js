  var scene, camera, light, renderer;
  
  // info
  info = document.createElement( 'div' );
  info.style.position = 'absolute';
  info.style.top = '30px';
  info.style.width = '100%';
  info.style.textAlign = 'center';
  info.style.color = '#f00';
  info.style.backgroundColor = 'transparent';
  info.style.zIndex = '1';
  info.style.fontFamily = 'Monospace';
  info.style.userSelect = "none";
  info.style.webkitUserSelect = "none";
  info.style.MozUserSelect = "none";
  document.body.appendChild( info );

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
    canvas: canvas
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById( 'canvas' ).appendChild( renderer.domElement );
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor(0xeeeeee);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
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


const addPlane = () => {
  let geo = new THREE.PlaneBufferGeometry(200,200,1);
  let mat = new THREE.MeshLambertMaterial({color:0xFFFFFF});
  let mesh = new THREE.Mesh(geo,mat);
  mesh.receiveShadow = true;
  mesh.rotateX(THREE.Math.degToRad(-90))
  scene.add(mesh);
}


const boxAmount = 3
const boxPos = [];
const boxScale = [];
let boxGroup = new THREE.Group();

const addBoxes = () => {
  let geo = new THREE.BoxBufferGeometry(2,2,2);
  let mat = new THREE.MeshLambertMaterial({color:0x2ccf6d})
  for (let i = 0; i < boxAmount; i++) {
    let mesh = new THREE.Mesh(geo,mat);
    boxPos.push(mesh.position);
    boxScale.push(mesh.scale);
    mesh.position.set(i*4,2,0);
    mesh.castShadow = true;
    boxGroup.add(mesh);
  }
  scene.add(boxGroup);
  boxGroup.position.set(-4,-1,0);
}

const addLights = () => {
  let light = new THREE.SpotLight(0xF3F8FD,0.2);
  light.position.set(-10,40,50);
  light.castShadow = true
  light.shadow.mapSize.width = 2048;
  light.shadow.mapSize.height = 2048;
  light.shadow.camera.near = 1;
  light.shadow.camera.far = 1000;
  scene.add(light);
  
  let light2 = new THREE.SpotLight(0xF3F8FD,0.4,100);
  light2.position.set(0,0,30);
  scene.add(light2);
} 

const animateBoxes = () => {
  const tl = gsap.timeline({defaults:{duration:0.15,ease:"sine.inOut"}})
  tl.to(boxPos,{y:5.2,stagger:{amount:0.12,repeat:-1,repeatDelay:0.25}},'in+=0.1')
    .to(boxPos,{y:2,stagger:{amount:0.1,repeat:-1,repeatDelay:0.25},ease:"sine.in"},'in+=0.25')
  .to(boxScale,{y:0.8,x:1.24,z:1.24,stagger:{amount:0.1,repeat:-1,repeatDelay:0.3},duration:0.1,ease:"circ.out"},'in')
    .to(boxScale,{y:1.2,x:1,z:1,stagger:{amount:0.1,repeat:-1,repeatDelay:0.3},duration:0.1,ease:"power1.in"},'in+=0.1')
  .to(boxScale,{y:1,x:1,z:1,stagger:{amount:0.1,repeat:-1,repeatDelay:0.3},duration:0.1},'in+=0.2');
  return tl.timeScale(0.6);
}

window.addEventListener("load", () => {
  setup();
  addPlane();
  addLights();
  addBoxes();
  animateBoxes();
  render();
});

window.addEventListener("resize", () => {
  resize();
});