import {mockWithImage} from "./camera-mock.js"
import {loadGLTF} from "./loader.js"

const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {

    const start = async() => {
        
        mockWithImage('./musicband-raccoon.png');
        
        const mindarThree = new window.MINDAR.IMAGE.MindARThree({
            container: document.body,
            imageTargetSrc: './targets.mind'
        })        

        const {scene, camera, renderer} = mindarThree;

        const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
        scene.add(light);

        const raccoon = await loadGLTF('./musicband-raccoon/scene.gltf');
        raccoon.scene.scale.set(0.1, 0.1, 0.1);
        raccoon.scene.position.set(0, -0.4, 0);

        const raccoonAnchor = mindarThree.addAnchor(0);
        raccoonAnchor.group.add(raccoon.scene);

        const raccoonMixer = new THREE.AnimationMixer(raccoon.scene);

        const raccoonAction = raccoonMixer.clipAction(raccoon.animations[0]);

        raccoonAction.play();

        const clock = new THREE.Clock();

        await mindarThree.start();

        renderer.setAnimationLoop( () => {
            const delta = clock.getDelta();
            raccoon.scene.rotation.set(0, raccoon.scene.rotation.y + delta, 0);

            raccoonMixer.update(delta);
            
            renderer.render(scene, camera);

        })

        // renderer.setAnimationLoop( () => {
        //     renderer.render(scene, camera);
        // })        
        
    }

    start();
})
