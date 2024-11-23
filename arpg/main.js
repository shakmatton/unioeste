import {CSS3DObject} from "./CSS3DRenderer.js"
import {loadAudio, loadGLTF} from "./loader.js" 


const THREE = window.MINDAR.IMAGE.THREE


document.addEventListener("DOMContentLoaded", () => {

    const start = async() => {

        const mindarThree = new window.MINDAR.IMAGE.MindARThree({
            container: document.body,
            imageTargetSrc: "./ARPGMan.mind"
        })
    
        const {scene, camera, renderer, cssScene, cssRenderer} = mindarThree

        const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1)      // Hemisphere Light
        
        // The following value was needed for the countryball illumination (check the final renderer part for scene illumination)
        light.intensity = 4.7                                                
        
        scene.add(light)

        

        /*   >>>>>>>   MUSIC BUTTON  <<<<<<   */

        const mb = await loadGLTF("./MusicButton/Button5.gltf")       // Remember: mb = MusicButton 

        mb.scene.scale.set(0.1, 0.1, 0.1)
        mb.scene.rotation.x = Math.PI/2
        mb.scene.position.set(-0.12, 0.62, 0)

        const mbAnchor = mindarThree.addAnchor(0)
        mbAnchor.group.add(mb.scene)

        mb.scene.userData.clickable = true;          

        const mbMixer = new THREE.AnimationMixer(mb.scene)
                
        const greenDownAction = mbMixer.clipAction(mb.animations[1])        // Green Button Down     
        const greenUpAction = mbMixer.clipAction(mb.animations[2])          // Green Button Up        
        const redDownAction = mbMixer.clipAction(mb.animations[3])          // Red Button Down       
        const redUpAction = mbMixer.clipAction(mb.animations[4])            // Red Button Up 
        

        // Music Button Sound

        const GreenButtonSoundClip = await loadAudio("./Macintosh Plus - 420 Floral Shoppe (Edit).mp3")
        const listener = new THREE.AudioListener()
        const audio = new THREE.PositionalAudio(listener) 

        camera.add(listener)    

        mbAnchor.group.add(audio)

        audio.setRefDistance(400)
        audio.setBuffer(GreenButtonSoundClip)
        audio.setLoop(true)

        

        
        /*   >>>>>>>   COUNTRYBALL  <<<<<<   */

        

        const cb = await loadGLTF("./Countryball/Countryball.gltf")

        cb.scene.scale.set(0.07, 0.07, 0.07)
        cb.scene.position.set(-0.38, -0.33, 0)
        // cb.scene.rotation.set(0, 9.5, 0)
        

        cb.scene.userData.clickable = true;          


        const cbAnchor = mindarThree.addAnchor(0)
        cbAnchor.group.add(cb.scene)

        const cbMixer = new THREE.AnimationMixer(cb.scene)
        const cbAction = cbMixer.clipAction(cb.animations[0])   
        cbAction.play()



        /*   >>>>>>>   AR IMAGES  <<<<<<   */



        const textureLoader = new THREE.TextureLoader()
        const texture35 = await textureLoader.load("./35yo.jpg")
        const texture45 = await textureLoader.load("./45yo.jpg")
        
        const rrTexture1 = await textureLoader.load("./RR11b-e.png")         // Rick Roll texture 1
        const rrTexture2 = await textureLoader.load("./RR11-e.png")          // Rick Roll texture 2
           
        const geometry35 = new THREE.PlaneGeometry(1, 1)
        const geometry45 = new THREE.PlaneGeometry(1, 1)
        const rrGeometry = new THREE.PlaneGeometry(0.5, 378/1536)            // Rick Roll geometry  --> Original geomtry: (1, 378/768)

        const material35 = new THREE.MeshBasicMaterial({ map: texture35,     /* transparent: true, opacity: 0.85 */ })
        const material45 = new THREE.MeshBasicMaterial({ map: texture45 })
        
        
        
        const rrMaterial1 = new THREE.MeshBasicMaterial({ map: rrTexture1 });
        const rrMaterial2 = new THREE.MeshBasicMaterial({ map: rrTexture2 });


        const plane35 = new THREE.Mesh(geometry35, material35)               // the 35yo guy
        const plane45 = new THREE.Mesh(geometry45, material45)               // the 45yo guy

        const rickRoll1 = new THREE.Mesh(rrGeometry, rrMaterial1)              // Rick Roll plane
        const rickRoll2 = new THREE.Mesh(rrGeometry, rrMaterial2)              // Rick Roll plane


        const arpgAnchor = mindarThree.addAnchor(0)
        // const rrAnchor = mindarThree.addAnchor(0)

        arpgAnchor.group.add(plane35)
        arpgAnchor.group.add(plane45)
        
        arpgAnchor.group.add(rickRoll1)
        arpgAnchor.group.add(rickRoll2)

        // rrAnchor.group.add(rickRoll)


        plane35.position.z = 0.00005      // 45yo guy is positioned a little bit ahead in front of 35yo guy (to avoid Z-Fighting).
        plane45.rotation.y = Math.PI      // 35yo guy starts backfacing the camera, back to back with the 40yo guy (which, in turn, is already facing the camera).

        rickRoll1.position.y = 0.624      // RR1 plane positioning        
        rickRoll1.position.x = 0.25
        rickRoll1.position.z = 0.00005    // RR1 will start a little bit ahead in front of RR2 (to avoid Z-Fighting).

        rickRoll2.position.y = 0.624      // RR2 plane positioning
        rickRoll2.position.x = 0.25
        rickRoll2.rotation.y = Math.PI    // RR2 starts backfacing the camera, back to back with RR1 (already facing the camera).


        

/*




        const vimeo = new CSS3DObject(document.querySelector("#ar-vimeo"));
        const vimeoAnchor = mindarThree.addCSSAnchor(0);
        vimeoAnchor.group.add(vimeo);

        vimeoAnchor.onTargetFound = () => {
            vimeo.playVideo();                       // playVideo()
        }
        vimeoAnchor.onTargetLost = () => {
            vimeo.pauseVideo();                      // pauseVideo() 
        }


// -------------------------------------------------------------------------------------------------------------------------


// The loadVideo method will await for our Sintel video.
const video = await loadVideo("./sintel.mp4")    

// Creating a texture for our video:
const texture = new THREE.VideoTexture(video)

// Now, we create a plane for our video (using our new texture):

const geometry = new THREE.PlaneGeometry(1, 204/480)                    // 1 unit of plane width === 1 unit of AR target scene width. 
                                                                        // Width of 1 treats the plane as a square. But the video is not square shaped.
                                                                        // So, we set height as 204/480 (to keep our aspect ratio). Now we have a perfect overlay.

const material = new THREE.MeshBasicMaterial( {map:texture} )
const plane = new THREE.Mesh(geometry, material)


const anchor = mindarThree.addAnchor(0);

anchor.group.add(plane)                       // Now we have the plane added to our anchor.

anchor.onTargetFound = () => {                // Video plays when target is found.
  video.play()
}

anchor.onTargetLost = () => {                 // Video pauses when target is lost.
  video.pause()
}

video.addEventListener("play", () => {     //  The author captured the video frame in its 6th second, so he could use it a target image.      
  video.currentTime = 6                    //  Whenever the video plays, it will begin on the 6th second. At this second, the still image will turn into a video.
}) 



*/




        // function displaySentence (idiom) {
        //     if (!sentences) { // Check if data is loaded
        //       fetch("sentences.json")
        //       .then(response => response.json())
        //       .then(data => {
        //         sentences = data;
        //         initializeDisplay(); // Start displaying random sentences
        //       })
        //       .catch(error => {
        //         console.error("Error fetching sentences:", error); // Handle error
        //       })
        //     }
        // }


       

        

        // function getRandomSentence(currentLanguage, sentences) {
        //     const languageData = sentences[currentLanguage];
        //     const randomIndex = Math.floor(Math.random() * languageData.length);
        //     return languageData[randomIndex];
        //   }

          
        //   document.getElementById("sentence-element").addEventListener("click", () => {
        //     const currentLanguage = /* ... determine current language based on displayed content */;
        //     const randomSentence = getRandomSentence(currentLanguage, sentences);
            
        //     // Update the displayed sentence content
        //     document.getElementById("sentence-element").textContent = randomSentence;
        //   });
          
        
        





        /*   >>>>>>>   CSS DIVs  <<<<<<   */



        // const guide = new CSS3DObject(document.querySelector("#ar-guide"))
        const headingARG = new CSS3DObject(document.querySelector("#ar-heading-arg"))
        const headingUSA = new CSS3DObject(document.querySelector("#ar-heading-usa"))

        // const guideAnchor = mindarThree.addCSSAnchor(0)
        const headingARGAnchor = mindarThree.addCSSAnchor(0)
        const headingUSAAnchor = mindarThree.addCSSAnchor(0)

        // guideAnchor.group.add(guide)
        headingARGAnchor.group.add(headingARG)
        headingUSAAnchor.group.add(headingUSA)

 


/*      onTargetFound usage example:

        anchor.onTargetFound = () => {
            audio.play()   // the song is played when the raccoon is found (instead of when the app starts)
        }

        anchor.onTargetLost = () => {
            audio.pause()  // pause the song when the raccoon is lost.
        }
*/

        // In your main.js, find the first image element
        // const arImage = document.getElementById("ar-image");
        // arImage.classList.add("fade-in");


               
        /*   >>>>>>>   CLICK EVENT HANDLER  <<<<<<   */


        
        let cbRotation = 0                                      // Initial countryball rotation
        let cbTurn = 0                                          // Counter will assist CSS flags switching
        let planeTurn = 0                                       // A turn counter for 40yo and 30yo guys

        let greenUp = true                                      // The ON/Green button starts on top

        greenDownAction.setLoop(THREE.LoopOnce)                 // Ensures this MusicButton animation action will loop just once.
        greenUpAction.setLoop(THREE.LoopOnce)
        redDownAction.setLoop(THREE.LoopOnce)
        redUpAction.setLoop(THREE.LoopOnce)
        
        document.body.addEventListener("pointerdown", (e) => {
            
            const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
            const mouseY = -1 * ((e.clientY / window.innerHeight) * 2 - 1);  
            const mouse = new THREE.Vector2(mouseX, mouseY);

            const raycaster = new THREE.Raycaster();
            raycaster.setFromCamera(mouse, camera);

            const intersects = raycaster.intersectObjects(scene.children, true);

            if (intersects.length > 0) { 
                let o = intersects[0].object         
                
                while (o.parent && !o.userData.clickable) {   
                    o = o.parent;                              
                }
            
                if (o.userData.clickable) {     
                                 
                    if (o === cb.scene) {                 
                        cbRotation += Math.PI;                               // Countryball must now rotate 180 degrees
                        cb.scene.rotation.y = cbRotation;                    // Executes 180 degrees rotation    
                        cbTurn++                                             // Updates number of countryball turns
                    }
                    
                    
                    if (o === mb.scene) {                                   // If the user clicked the MusicButton:

                        /* Some other possible commands to use, if needed:
                        
                        if ( action !== null ) {
                             action.stop();  action.play();  setTimeout(5000);  greenDownAction.play().reset();  redUpAction.paused();  
                             greenDownAction.reset()               // Goes to animation frame 1                             
                        // Search later for the method .setDuration, which sets the duration for a single loop of an action.     */


                        if (greenUp) {                                    // If Green button is ON...

                            greenDownAction.play()                        // Plays the animation 
                            redUpAction.play()

                            greenDownAction.clampWhenFinished = true      // Stops the animation in the last frame
                            redUpAction.clampWhenFinished = true   

                            redDownAction.stop()                          // Stops the animation 
                            greenUpAction.stop()                           

                            audio.play() 

                            greenUp = false                               // Red button is ON and Green button is OFF.

                        } 
                        else {                                            // If Red button is ON... 

                            //greenUpAction.setDuration(0.3).play()
                            greenUpAction.play()                         
                            redDownAction.play()

                            greenUpAction.clampWhenFinished = true  
                            redDownAction.clampWhenFinished = true

                            greenDownAction.stop()
                            redUpAction.stop()
                            
                            audio.pause()

                            greenUp = true                               // Green button is ON and Red button is OFF.

                        }
                    }
                }
            }
        });



        /*   >>>>>>>   CLOCKS & RENDERS  <<<<<<   */



        const clock = new THREE.Clock()

        await mindarThree.start()


        renderer.setAnimationLoop(() => {

            const delta = clock.getDelta()                      // delta -> Countryball original blender animation
            cbMixer.update(delta)

            mbMixer.update(delta)

            const elapsedTime = clock.getElapsedTime()          // elapsedtime -> Countryball angular three.js animation
            const cbAngle = elapsedTime * 0.2            
            
            cb.scene.position.x = Math.cos(cbAngle) * 0.4
            cb.scene.position.y = Math.sin(cbAngle) * 0.4

            /* const ghost1Angle = elapsedTime * 0.5               // fixed radius
               ghost1.position.x = Math.cos(ghost1Angle) * 4    ghost1.position.z = Math.sin(ghost1Angle) * 4       ghost1.position.y = Math.sin(elapsedTime * 3)    */ 

            // cb.scene.rotation.y = cbRotation            
            

            if (cbTurn % 2 == 0) {                                  // this means the countryball will switch flags each time the number of turns is even or odd.   
                headingARG.element.style.visibility = "visible";    
                headingUSA.element.style.visibility = "hidden";    
                headingUSA.position.y = 99999;                      // this solves the z-buffer conflict between both css elements
                headingARG.position.y = 0;                          // when a css position is set to 0, it is displayed normally on screen.
                               
            } 
            else {
                headingUSA.element.style.visibility = "visible";   
                headingARG.element.style.visibility = "hidden";     
                headingARG.position.y = 99999;                      // when a css position is set to 99999, it is displayed far away (up and out of the camera display range). 
                headingUSA.position.y = 0;    
                 
            }

                                                                     // if Countryball rotates, both guys planes must rotate too. So, cbTurn and planeTurn must be equal.
            if (cbTurn !== planeTurn) {                              // If cbTurn and planeTurn are NOT equal:
                plane45.rotation.y = plane45.rotation.y + Math.PI    // ...45yo guy now rotates 180 degrees, facing opposite side of 35yo guy
                plane35.rotation.y = plane35.rotation.y + Math.PI    // ...35yo guy now rotates 180 degrees, facing opposite side of 45yo guy

                rickRoll1.rotation.y = rickRoll1.rotation.y + Math.PI    // The same goes for both RickRoll image planes...
                rickRoll2.rotation.y = rickRoll2.rotation.y + Math.PI

                planeTurn++                                          // planeTurn now follows the counter of the Countryball cbTurn. Now they are equal.
            }



            arpgAnchor.onTargetLost = () => {               // music button activated on red button AND target was lost
                if (!greenUp) {
                    audio.pause();
                }
            }
            
            arpgAnchor.onTargetFound = () => {              // music button activated on red button AND target was found
                if (!greenUp) {
                    audio.play();
                }
            }




/*
            const angleThreshold = Math.PI;                 // Threshold for switching flags
            const isArgentinaFlagVisible = cbRotation < angleThreshold;
    
            headingARG.element.style.visibility = isArgentinaFlagVisible ? "visible" : "hidden";
            headingUSA.element.style.visibility = !isArgentinaFlagVisible ? "visible" : "hidden";

*/

            renderer.render(scene,camera)
            cssRenderer.render(cssScene, camera)

            // if (!arImage.classList.contains("faded")) {
            //     setTimeout(() => {
            //       arImage.classList.add("faded"); // Faded class adds "fade-in" to avoid redundant animation
            //     }, 500); // Adjust delay as needed
            //   }    

            
            // Render techniques for improving lightning:
            renderer.outputEncoding = THREE.LinearEncoding;
            renderer.shadowMap.enabled = true;
            renderer.shadowMap.type = THREE.PCFSoftShadowMap;
            renderer.physicallyCorrectLights = true; 

        })    
    }

    start()
    
})