document.getElementById("btn2").style.display = "none";
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let h = (canvas.height = 900);
let w = (canvas.width = 900);
let shift = 0;
let scoreG = 0;
let highestScore = 0
let isAlive = true;
let xPos4deadsnowman;

//==============================================================================================================================================
//              Background
//==============================================================================================================================================
function Snowflake() {
    this.x = Math.floor(Math.random() * w);
    this.y = Math.floor(Math.random() * h);
    this.r = Math.floor(Math.random() * 5) + 2;
    this.d = Math.floor(Math.random() * +1) + 1;
}

let snowflakes = [];
for (let i = 0; i < 110; i++) {
    snowflakes.push(new Snowflake());
}

function snow() {
    ctx.fillStyle = "white";
    ctx.beginPath();
    for (let i = 0; i < 110; i++) {
        let sf = snowflakes[i];
        ctx.moveTo(sf.x, sf.y);
        ctx.arc(sf.x, sf.y, sf.r, 0, 2 * Math.PI);
    }
    ctx.fill();
    moveSnowflakes();
}

function moveSnowflakes() {
    for (let i = 0; i < 110; i++) {
        let sf = snowflakes[i];
        sf.y += Math.pow(sf.d, 2);
        if (sf.y > h) {
            sf.y = 0;
        }
    }
}

function drawGround() {
    ctx.beginPath();
    ctx.moveTo(0, h - 150);
    ctx.quadraticCurveTo(200, 690, 600, 790);
    ctx.quadraticCurveTo(700, 750, w, 800);
    ctx.stroke();
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.closePath();
    ctx.fillStyle = "rgb(240, 240, 240)";
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(0, h - 100);
    ctx.quadraticCurveTo(100, 750, 200, 800);
    ctx.quadraticCurveTo(400, 900, 500, 800);
    ctx.quadraticCurveTo(700, 650, w, 800);
    ctx.stroke();
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.closePath();
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.fill();
}

function tree() {
    ctx.fillStyle = "#5A5A5A";
    ctx.fillRect(380, 760, 20, 90);

    ctx.fillStyle = "#01796F";
    ctx.beginPath();
    ctx.arc(410, 740, 40, 0, 2 * Math.PI);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(370, 740, 40, 0, 2 * Math.PI);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(390, 680, 40, 0, 2 * Math.PI);
    ctx.fill();
}


//==============================================================================================================================================
//              Snowman
//==============================================================================================================================================
const MID = 400;
const GROUND = 450;

function drawSnowman() {
    ctx.save();
    ctx.translate(shift, 0);

    // Set styles for the snowman
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;

    // Draw head with border
    ctx.beginPath();
    ctx.arc(MID, 715, 20, 0, 2 * Math.PI); // head
    ctx.fill();
    ctx.stroke();

    // Draw upper torso with border
    ctx.beginPath();
    ctx.arc(MID, 768, 35, 0, 2 * Math.PI); // upper torso
    ctx.fill();
    ctx.stroke();

    // Draw lower torso with border
    ctx.beginPath();
    ctx.arc(MID, 850, 50, 0, 2 * Math.PI); // lower torso
    ctx.fill();
    ctx.stroke();

    // Draw buttons
    ctx.fillStyle = "gold";
    ctx.beginPath();
    ctx.arc(MID, 760, 5, 0, 2 * Math.PI); // button 1
    ctx.fill();
    ctx.beginPath();
    ctx.arc(MID, 780, 5, 0, 2 * Math.PI); // button 2
    ctx.fill();

    // Draw eyes
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(MID - 10, 710, 3, 0, 2 * Math.PI); // left eye
    ctx.arc(MID + 10, 710, 3, 0, 2 * Math.PI); // right eye
    ctx.fill();

    // Draw smile
    ctx.beginPath();
    ctx.arc(MID, 718, 9, 0.2 * Math.PI, 0.8 * Math.PI); 
    ctx.stroke();

    // Draw arms
    // Left arm with fingers
    ctx.beginPath();
    ctx.moveTo(365, 765); // Base of left arm
    ctx.lineTo(313, 765); // Main branch of left arm
    ctx.moveTo(335, 765);
    ctx.lineTo(315, 755); // Top finger
    ctx.moveTo(345, 765);
    ctx.lineTo(315, 775); // Bottom finger
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(435, 765); // Base of right arm
    ctx.lineTo(487, 765); // Main branch of right arm (mirrored length)
    ctx.moveTo(465, 765);
    ctx.lineTo(485, 755); // Top finger
    ctx.moveTo(455, 765);
    ctx.lineTo(485, 775); // Bottom finger
    ctx.stroke();
    // Draw hat brim
    ctx.beginPath();
    ctx.moveTo(355, 695);
    ctx.lineTo(445, 695); // brim of hat
    ctx.stroke();

    // Draw hat
    ctx.fillRect(MID - 25, 660, 50, 35);

    // Draw nose
    // Draw nose
ctx.fillStyle = "orange";
ctx.beginPath();
ctx.moveTo(MID, 715); // Nose starting point (center of face)
ctx.lineTo(MID + 25, 715); // Extend outward to create a long nose
ctx.lineTo(MID, 720); // Bottom of the triangle
ctx.closePath(); // Close the triangle
ctx.fill();

    
    ctx.restore();
}

function shiftSnowman(event) {
    const snowmanWidth = 100; 
    const leftBoundary = -MID + snowmanWidth / 2; 
    const rightBoundary = canvas.width - MID - snowmanWidth / 2; 

    // Handle keyboard movement
    if (event.type === "keydown") {
        if ((event.key === "d" || event.key === "ArrowRight") && shift + 40 <= rightBoundary) {
            event.preventDefault();
            shift += 40; 
        } else if ((event.key === "a" || event.key === "ArrowLeft") && shift - 40 >= leftBoundary) {
            event.preventDefault();
            shift -= 40;
        }
    }

    // Handle mouse movement
    if (event.type === "mousemove") {
        const mouseX = event.offsetX; 
        xPos4deadsnowman = mouseX
        
        if (mouseX >= snowmanWidth / 2 && mouseX <= canvas.width - snowmanWidth / 2) {
            shift = mouseX - MID; 
        } else if (mouseX < snowmanWidth / 2) {
            shift = -MID + snowmanWidth / 2; 
        } else if (mouseX > canvas.width - snowmanWidth / 2) {
            shift = canvas.width - MID - snowmanWidth / 2;
        }
    }
}



// Try to apply new and upcoming code in here 

function scoreBoard(score){
    document.getElementById("score").innerHTML = ("Dodged " + score + " Meteors")
}

function displayLeaderBoard(){
    ctx.font = "75px Chewy"
    ctx.fillStyle = "red"
    ctx.fillText("YOU DIED!",275,200)

    if(scoreG > highestScore){
        highestScore = scoreG
    }
    ctx.font = "40px Chewy"
    ctx.fillStyle = "black"
    ctx.fillText("Score:", 225, 275)
    ctx.fillText("Highest Score:", 475, 275)

    ctx.fillText(scoreG, 225, 325)
    ctx.fillText(highestScore, 475, 325)
}

function endScreen(){
    document.getElementById("score").innerHTML = ""
        document.getElementById("btn2").style.display = "block";
        document.getElementById("btn2").addEventListener("click", ()=>{
            scoreG = 0
            shift = 0    
            isAlive = true

            meteors = [];
            for (let i = 0; i < 8; i++){
                 meteors.push(new Meteor());
            }


            bgMusic.play();
            document.addEventListener("keydown", shiftSnowman);
            canvas.addEventListener("mousemove", shiftSnowman);

            document.getElementById("btn2").style.display = "none";
        });
        document.removeEventListener("keydown", shiftSnowman);
        canvas.removeEventListener("mousemove", shiftSnowman);
        ctx.save()
        snow();
        drawGround();
        tree();


        ctx.translate(xPos4deadsnowman-900,900 +xPos4deadsnowman)
        ctx.rotate(-Math.PI/2);
        drawSnowman();
        ctx.restore()
        ctx.globalAlpha = 0.4
        ctx.fillStyle = "black"
        ctx.fillRect(0,0,900,900)

        ctx.globalAlpha = 1

        
        displayLeaderBoard();
    

}

//==============================================================================================================================================
//              Meteors
//==============================================================================================================================================
// Meteor constructor that creates different spawn points, sizes and speed for the meteor.
function Meteor(){
    this.x = Math.floor(Math.random() * w);
    this.y = Math.floor(Math.random() * -h);
    this.r = Math.floor(Math.random() * 34) + 30;
    this.d = Math.floor(Math.random() * + 2) + 2;
}

// creates a series of meteors max 8 that is put on the screen and goes back to the top once the meteor touches the ground.
let meteors = [];
for (let i = 0; i < 8; i++){
    meteors.push(new Meteor());
}

// Creates the meteor design and is the main function that executes properties to the meteor (color, size, speed, design)
function executeMeteor(){
    ctx.fillStyle = "#f5731b";
    ctx.beginPath();
    for (let i = 0; i < 8; i++) {
        let mt = meteors[i];
        ctx.moveTo(mt.x, mt.y);
        ctx.arc(mt.x, mt.y, mt.r, 0, 2 * Math.PI);
    }
    ctx.fill();
    addCraterEffect()
    moveMeteors();

}

// creates spinning design effect to meteor
function addCraterEffect() {
    
    for (let i = 0; i < 8; i++) {
        let mt = meteors[i];
        
        ctx.fillStyle = "yellow";
            let craterX = mt.x + Math.random() * (mt.r * 2) - mt.r; 
            let craterY = mt.y + Math.random() * (mt.r * 2) - mt.r; 
            let craterR = Math.random() * 6 + 5; 
                
        ctx.beginPath();
        ctx.arc(craterX, craterY, craterR, 0, 2 * Math.PI);
        ctx.fill();
        
    }
    for (let i = 0; i < 8; i++) {
        let mt = meteors[i];
        
        ctx.fillStyle = "red"; 
            let craterX = mt.x + Math.random() * (mt.r * 2) - mt.r; 
            let craterY = mt.y + Math.random() * (mt.r * 2) - mt.r; 
            let craterR = Math.random() * 6 + 5; 
             
        ctx.beginPath();
        ctx.arc(craterX, craterY, craterR, 0, 2 * Math.PI);
        ctx.fill();
        
    }
}



// copied from the snowfall effect. Is responsible for making the meteors fall down the screen
// This is also responsible for putting the meteors back on top after they fall down the screen
function moveMeteors(){
    for (let i = 0; i < 8; i++) {
        let mt = meteors[i];
        mt.y += Math.pow(mt.d, 2);
        if (mt.y > h +50) {
            //alert("groud")
            scoreG++
            mt.x = Math.floor(Math.random()* w)
            mt.y = 0;
        }
    }
}

// responsible for getting circle coordinates (head, upper and lower torso circles and meteor circle)
function circleOverlap(circleA, circleB) {
    const dx = circleA.x - circleB.x;
    const dy = circleA.y - circleB.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < circleA.r + circleB.r;
}

function checkMeteorCollisions() {
    for (let i = 0; i < meteors.length; i++) {
        const meteor = meteors[i];

        if (
            circleOverlap(meteor, { x: MID + shift, y: 850, r: 50 }) || // checks overlap with lower toros
            circleOverlap(meteor, { x: MID + shift, y: 768, r: 35 }) || // with upper torrso
            circleOverlap(meteor, { x: MID + shift, y: 715, r: 20 }) // and with the head
        ) {
           // console.log("Collision detected with meteor", i);
            isAlive = false
            gameOverSound.play();
            bgMusic.pause();
            bgMusic.currentTime = 0

        }

    }
}

// Audio assets
const bgMusic = new Audio();
bgMusic.src = "./ASSETS/puzzle-game-bright-casual-video-game-music-249202.mp3"
// Link to audio used: https://pixabay.com/music/video-games-puzzle-game-bright-casual-video-game-music-249202/

const gameOverSound = new Audio();
gameOverSound.src = "./ASSETS/negative_beeps-6008.mp3"
// Link to audio used: https://pixabay.com/sound-effects/negative-beeps-6008/

// after all code has been written, put all the functions down here 👇 to execute the game when the play button is clicked!!!
document.getElementById("btn1").addEventListener("click", () => {
    

    
    // Animation Loop
    setInterval(function () {
        ctx.clearRect(0, 0, w, h);
        if(isAlive){
        snow();
        drawGround();
        tree();
        drawSnowman();
        executeMeteor();
        scoreBoard(scoreG);
        checkMeteorCollisions();
        }else{
            endScreen()
        }
    }, 25);
    bgMusic.play();
    bgMusic.loop = true;
    document.addEventListener("keydown", shiftSnowman);
    canvas.addEventListener("mousemove", shiftSnowman);
    document.getElementById("btn1").style.display = "none";
});


