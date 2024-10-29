const THREE = window.MINDAR.IMAGE.THREE
import {loadGLTF} from './loader.js'
import {mockWithImage} from './camera-mock.js'


document.addEventListener('DOMContentLoaded', () => {

    const start = async() => {

        mockWithImage('./musicband.png');

        const mindarThree = new window.MINDAR.IMAGE.MindARThree({
            container: document.body,
            imageTargetSrc: './musicband.mind'
        })

        const {scene, camera, renderer} = mindarThree;

        const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
        scene.add(light);
        
        const anchor = mindarThree.addAnchor(0);


       /* const well = await loadGLTF('./lowpoly-well/scene.gltf');        

        well.scene.scale.set(0.1, 0.1, 0.1);
        well.scene.position.set(0, 0, -6);
        well.scene.rotation.set(0.4, 1.8, 0);

        */

        const raccoon = await loadGLTF('./musicband-raccoon/scene.gltf');

        raccoon.scene.scale.set(0.085, 0.085, 0.08);
        raccoon.scene.position.set(0, -0.3, 0);

        // anchor.group.add(well.scene); 
        
        anchor.group.add(raccoon.scene);

        await mindarThree.start();

        renderer.setAnimationLoop( () => {
            renderer.render(scene, camera);
        })

    } 

    start();

}) 

