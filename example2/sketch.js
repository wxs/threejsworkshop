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


var material = new THREE.MeshPhongMaterial( {color: 0x0088dd, specular: 0xffffff });

var boxGeometry = new THREE.BoxGeometry( 1, 1, 1 );

// Let's make a large number of cubes, sharing the same
// basic geometry. We'll position them later.
var numCubes = 1000;
// This will be an array containing all the cubes.
var cubes = [];
for (var i = 0; i < numCubes; i++) {
	// Construct the new cube
	var cube = new THREE.Mesh(boxGeometry, material);

	// And add it to the end of the array.
	cubes.push(cube);

	// Also add it to the scene.
	scene.add(cube);
}

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
	// Let's set the positions and sizes of the cubes using trig functions
	// varying them with time, as well as with their position in the list.
	for (var i = 0; i < cubes.length; i++) {
		cubes[i].scale.set(0.05, 0.05*(Math.sin(i*0.1)+2), 0.05);
		cubes[i].position.x = 0.008*(i-cubes.length/2) + Math.sin(t*0.1 + 0.1*i);
		cubes[i].position.y = 0.009*(i-cubes.length/2) + Math.sin(t*0.05 + 0.06*i + 2.5);
		cubes[i].position.z = 0.001*(i-cubes.length/2) + Math.sin(t*0.03 + 0.01*i + 1.7);
	}
	renderer.render(scene, camera);
};

// Start animating!
animate();
