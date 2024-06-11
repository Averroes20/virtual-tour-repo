const panorama = new PANOLENS.ImagePanorama( 'src/assets/images/panel1.jpeg' );
const panorama2 = new PANOLENS.ImagePanorama( 'src/assets/images/pano5.jpg' );

let imageContainer = document.querySelector('.image-container')

const spotButton = [
    new THREE.Vector3(-2136.06, 16.30, 890.14),
    new THREE.Vector3(-2136.06, 296.30, -4290.14)
]

const viewer = new PANOLENS.Viewer({
    container: imageContainer,
    autoRotate: true,
    autoRotateSpeed: 0.3,
    controlBar: true,
});

panorama.link(panorama2, spotButton[0])
panorama2.link(panorama, spotButton[1])

viewer.add( panorama, panorama2 );
