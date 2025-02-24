/* 
For this lesson, you need to convert .png images (musicband-bear.png & musicband-raccoon.png) into a single anchor target (targets.mind). 
Go to https://hiukim.github.io/mind-ar-js-doc/tools/compile/, compile, download the resulting file and put it together with the other folder files.

ATTENTION! 
Be aware of the order of uploading! First, choose the raccoon.png, and secondly, the bear.png.
This will ensure the correct order for our position array (see belo in the comments). 

The right way means the raccoon (in position[0]) will appear when showing the its pic to the webcam, and the same goes to the bear (in position[1]). 
*/


import {loadGLTF} from "./loader.js"

const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {
  const start = async() => {
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: './targets.mind',
    });
    const {renderer, scene, camera} = mindarThree;
    
    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1)
    scene.add(light)

    const raccoon = await loadGLTF("./musicband-raccoon/scene.gltf")
    raccoon.scene.scale.set(0.1, 0.1, 0.1)
    raccoon.scene.position.set(0, -0.4, 0)

    const bear = await loadGLTF("./musicband-bear/scene.gltf")
    bear.scene.scale.set(0.1, 0.1, 0.1)
    bear.scene.position.set(0, -0.4, 0)

    const raccoonAnchor = mindarThree.addAnchor(0)    // 0 = Raccoon image is stored in position[0] of Anchor array. 
    raccoonAnchor.group.add(raccoon.scene)            // Don't exchange position values, or the raccoon and the bear will switch places, which, in this case, is a mistake.  

    const bearAnchor = mindarThree.addAnchor(1)       // 1 = Raccoon image is stored in position[1] of Anchor array
    bearAnchor.group.add(bear.scene)

    // const anchor = mindarThree.addAnchor(0);
    
    // const gltf = await loadGLTF("./musicband-raccoon/scene.gltf")

    // gltf.scene.scale.set(0.1, 0.1, 0.1)
    // gltf.scene.position.set(0, -0.4, 0)
    // anchor.group.add(gltf.scene)

    await mindarThree.start();

    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });
  }
  start();
});

