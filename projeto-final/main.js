import {mockWithImage} from "./camera-mock.js"
import {loadGLTF, loadTexture} from "./loader.js"

const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {

    const start = async() => {

        mockWithImage("./imgs/poetisa-mosaico.jpg");    // texture size: 2882 x 3836

        const mindarThree = new window.MINDAR.IMAGE.MindARThree({
            container: document.body,
            imageTargetSrc: "./targets.mind"
        })        

        const {scene, camera, renderer} = mindarThree;

        
        // ====================   TEXTURES   ====================


        const poetTexture = await loadTexture("./imgs/alejandra-pizarnik.png");        
        // const poetTexture2 = await loadTexture("./imgs/alejandra-pizarnik-2.jpeg");
        
        const webTexture = await loadTexture("./icons/web.png");
        const profileTexture = await loadTexture("./icons/profile.png");
        const locationTexture = await loadTexture("./icons/location.png");
        const emailTexture = await loadTexture("./icons/email.png");
        const phoneTexture = await loadTexture("./icons/phone.png");

        const playTexture = await loadTexture("./icons/play.png");
        const leftTexture = await loadTexture("./icons/left.png");
        const rightTexture = await loadTexture("./icons/right.png");


        // ====================   GEOMETRIES   ====================


        const poetGeometry = new THREE.PlaneGeometry(481/484, 1);  
        // const poetGeometry2 = new THREE.PlaneGeometry(652/896, 1);

        const webGeometry = new THREE.PlaneGeometry(1, 1);
        const profileGeometry = new THREE.PlaneGeometry(1, 1);
        const locationGeometry = new THREE.PlaneGeometry(1, 1);
        const emailGeometry = new THREE.PlaneGeometry(1, 1);
        const phoneGeometry = new THREE.PlaneGeometry(1, 1);

        const playGeometry = new THREE.PlaneGeometry(1, 1);
        const leftGeometry = new THREE.PlaneGeometry(1, 1);
        const rightGeometry = new THREE.PlaneGeometry(1, 1);


        // ====================   MATERIALS   ====================

        const poetMaterial = new THREE.MeshBasicMaterial({ map: poetTexture });
        // const poetMaterial2 = new THREE.MeshBasicMaterial({ map: poetTexture2 });
        
        const webMaterial = new THREE.MeshBasicMaterial(({ map: webTexture , transparent: true }));
        const profileMaterial = new THREE.MeshBasicMaterial(({ map: profileTexture , transparent: true }));
        const locationMaterial = new THREE.MeshBasicMaterial(({ map: locationTexture , transparent: true }));
        const emailMaterial = new THREE.MeshBasicMaterial(({ map: emailTexture , transparent: true }));
        const phoneMaterial = new THREE.MeshBasicMaterial(({ map: phoneTexture , transparent: true }));
        
        const playMaterial = new THREE.MeshBasicMaterial(({ map: playTexture , transparent: true }));
        const leftMaterial = new THREE.MeshBasicMaterial(({ map: leftTexture , transparent: true }));
        const rightMaterial = new THREE.MeshBasicMaterial(({ map: rightTexture , transparent: true }));


        // ====================   MESHES   ====================


        const poet = new THREE.Mesh(poetGeometry, poetMaterial);
        // const poetisa2 = new THREE.Mesh(poetGeometry2, poetMaterial);

        const webBtn = new THREE.Mesh(webGeometry, webMaterial);
        const profileBtn = new THREE.Mesh(profileGeometry, profileMaterial);
        const locationBtn = new THREE.Mesh(locationGeometry, locationMaterial);
        const emailBtn = new THREE.Mesh(emailGeometry, emailMaterial);
        const phoneBtn = new THREE.Mesh(phoneGeometry, phoneMaterial);
        
        const playBtn = new THREE.Mesh(playGeometry, playMaterial);
        const leftBtn = new THREE.Mesh(leftGeometry, leftMaterial);
        const rightBtn = new THREE.Mesh(rightGeometry, rightMaterial);


        // ====================   POSITION, SCALE   ====================

        poet.scale.set(0.8, 0.8, 0.8);
        
        webBtn.scale.set(0.1, 0.1, 0.1);
        profileBtn.scale.set(0.1, 0.1, 0.1);
        locationBtn.scale.set(0.1, 0.1, 0.1);
        emailBtn.scale.set(0.1, 0.1, 0.1);
        phoneBtn.scale.set(0.1, 0.1, 0.1);

        playBtn.scale.set(0.14, 0.14, 0.14);
        leftBtn.scale.set(0.1, 0.1, 0.1);
        rightBtn.scale.set(0.1, 0.1, 0.1);
        
        poet.position.set(0, 0.25, -0.1);

        profileBtn.position.set(-0.35, -0.35, 0);
        locationBtn.position.set(-0.175, -0.35, 0);
        webBtn.position.set(0, -0.35, 0);
        emailBtn.position.set(0.175, -0.35, 0);
        phoneBtn.position.set(0.35, -0.35, 0);

        playBtn.position.set(0, -0.185, 0.1);
        leftBtn.position.set(-0.12, -0.185, 0.1);
        rightBtn.position.set(0.12, -0.185, 0.1);


        // ====================   ANCHORS   ====================


        const poetAnchor = mindarThree.addAnchor(0);
        // const poetAnchor2 = mindarThree.addAnchor(0);

        const webAnchor = mindarThree.addAnchor(0);
        const profileAnchor = mindarThree.addAnchor(0);
        const locationAnchor = mindarThree.addAnchor(0);
        const emailAnchor = mindarThree.addAnchor(0);
        const phoneAnchor = mindarThree.addAnchor(0);

        const playAnchor = mindarThree.addAnchor(0);
        const leftAnchor = mindarThree.addAnchor(0);
        const rightAnchor = mindarThree.addAnchor(0);
        
        poetAnchor.group.add(poet);
        // poetAnchor2.group.add(poetisa2);

        webAnchor.group.add(webBtn);
        profileAnchor.group.add(profileBtn);
        locationAnchor.group.add(locationBtn);
        emailAnchor.group.add(emailBtn);
        phoneAnchor.group.add(phoneBtn);

        playAnchor.group.add(playBtn);
        leftAnchor.group.add(leftBtn);
        rightAnchor.group.add(rightBtn);

        await mindarThree.start();

        renderer.setAnimationLoop( () => {
            renderer.render(scene, camera)
        })

    }        

    start();

})
