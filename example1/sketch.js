// ******************************
// Boilerplate to get you started
var scene = new THREE.Scene();

// We're going to use WebGL to render everything (if your browser does not support WebGL you can try the
// CanvasRenderer, although you will be more limited in what you can accomplish)
var renderer = new THREE.WebGLRenderer({ devicePixelRatio:window.devicePixelRatio});
// If you don't have WebGL use the line below.
// var renderer = new THREE.CanvasRenderer()

// Set the size of the renderer so that it fills the entire screen
renderer.setSize( window.innerWidth, window.innerHeight );

// This actually places the renderer on the screen where we will be able to see it
document.body.appendChild( renderer.domElement );

// This creates the camera through which we are going to look at the scene
// The first parameter says that the field of view of this camera will be 75 degrees,
// The second parameter defines the aspect ratio,
// The last two parameters define "clipping planes". We will only render objects that are further
// than the first distance, and closer than the second.
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// End of boilerplate
// *******************************

// Move the camera back 5 units, looking towards the origin
camera.position.z = 5;

var materialA = new THREE.MeshLambertMaterial( { color: 0xffff00 } );

var materialB = new THREE.MeshPhongMaterial( {color: 0x0088dd, specular: 0xffffff });

// Let's construct a bunch of different kinds of geometry
var boxGeometry = new THREE.BoxGeometry( 1, 1, 1 );
// An object in three.js is a combination of some geometry, and a material
var cube = new THREE.Mesh( boxGeometry, materialA );
cube.position.set(0,0,0);
scene.add( cube );

var sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
var sphere = new THREE.Mesh(sphereGeometry, materialB );
sphere.position.set(2,0,0);
scene.add(sphere);

var light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(5,5,5);

var ambientLight = new THREE.AmbientLight(0x404040);

scene.add(light);
scene.add(ambientLight);

// *********************************
// Configure the animation
//
// This function repeatedly calls the render() function,
// causing an animation
function animate() {
	requestAnimationFrame(animate);
	render();
}

// This function is is called to draw the scene, and do any updates which
// need to happen every frame
var t = 0;
function render() {
	t++;
	cube.scale.y = Math.sin(t*0.01)+2;
	cube.rotation.y += 0.01;

	sphere.position.set(2 * Math.sin(t*0.022), 0, 2 * Math.cos(t*0.022));
	renderer.render(scene, camera);
};

// Start animating!
animate();
