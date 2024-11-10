import {loadGLTF, loadAudio} from './loader.js'

const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {
    const start = async() => {

        const mindarThree = new window.MINDAR.IMAGE.MindARThree({
            container: document.body,
            imageTargetSrc: './musicband.mind'
        })

        const {scene, camera, renderer} = mindarThree;

        const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
        scene.add(light);

        const raccoon = await loadGLTF('./musicband-raccoon/scene.gltf');

        raccoon.scene.scale.set(0.1, 0.1, 0.1);
        raccoon.scene.position.set(0, -0.4, 0);

        const raccoonAnchor = mindarThree.addAnchor(0);
        raccoonAnchor.group.add(raccoon.scene);

        // =================   AUDIO   =================

        const audioClip = await loadAudio('./musicband-background.mp3')

        const listener = new THREE.AudioListener();        
        camera.add(listener);    

        const positionalAudio = new THREE.PositionalAudio(listener);           
        positionalAudio.setRefDistance(400);
        positionalAudio.setBuffer(audioClip);
        positionalAudio.setLoop(true);
        
        raccoonAnchor.group.add(positionalAudio);

        raccoonAnchor.onTargetFound = () => {
            positionalAudio.play();
        }

        raccoonAnchor.onTargetLost = () => {
            positionalAudio.pause();
        }

        await mindarThree.start();

        renderer.setAnimationLoop(() => {
            renderer.render(scene, camera);
        })

    }

    start();
})