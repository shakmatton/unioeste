// Must use Chrome or Brave browser. Avoid Firefox. 
// Press Start button for launching application (user must always consent when using video).


import {mockWithVideo} from "./camera-mock.js"

const THREE = window.MINDAR.IMAGE.THREE


document.addEventListener('DOMContentLoaded', () => {

    const start = async() => {

        mockWithVideo("./musicband1.mp4");

        const mindarThree = new window.MINDAR.IMAGE.MindARThree({
            container: document.body,
            imageTargetSrc: "./musicband.mind"
        })

        const {scene, camera, renderer} = mindarThree;

        const geometry = new THREE.PlaneGeometry(1, 1);
        const material = new THREE.MeshBasicMaterial({
            color: 0xff0000,
            transparent: true,
            opacity: 0.5
        });
        const plane = new THREE.Mesh(geometry, material);

        const anchor = mindarThree.addAnchor(0);
        anchor.group.add(plane);
        
        await mindarThree.start();

        renderer.setAnimationLoop( () => {
            renderer.render(scene, camera)
        })

    }

    start();
    
})



