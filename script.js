/********************************************************************* */
/*                                                                     */
/*                            Copyright ©                              */
/*                             11/7/2022                               */
/*                    Holder: Github - halcyonXT                       */
/*                 Contact: halcyonXT1987@gmail.com                    */
/*                                                                     */
/***********************************************************************/
let p1pos = 40
let p2pos = 40
let timer;
let stimer;
let ballTimer;
let flag = true;
let audioFlag = true;
let ballX;
let ballY;
let isPDragOn = true;

let p1score = 0
let p2score = 0

let multiplier = 1;

let ballXpos = 48
let ballYpos = 36

let optFlag = false

let sensitivity = 10;

let pastFlag = false;

let isDragOn = true;
let dynFlag = false;

let isCleared = false;

const overlay = () => {
    let margin = -12;
    setInterval(() => {
        margin++;
        document.getElementById("overlay").style.marginTop = `${margin}px`
        if (margin == -4) {
            margin = -12;
        }
    }, 70)
}

const sfxChange = () => {
    audioFlag = !audioFlag
    switch(audioFlag) {
        case true:
            document.getElementById("sfxBtn").innerText = `SFX - ON`
        break;
        case false:
            document.getElementById("sfxBtn").innerText = `SFX - OFF`
            document.getElementById("theme").muted = "true"
        break;
    }
}

const displayOptions = () => {
    optFlag = true;
    document.getElementById("outerframe").style.display = "block";
}

const closeOptions = () => {
    optFlag = false;
    document.getElementById("outerframe").style.display = "none";
}

const playTheme = () => {
    document.getElementById("theme").play()
    document.getElementById("startBtn").style.display = "block";
    document.getElementById("optBtn").style.display = "block";
}
//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
const gameInit = async () => {
    initializeDrag(0);
    document.getElementById("backgroundEffect").style.opacity = "0.75";
    document.getElementById("ball").style.zIndex = "69";
    document.getElementById("ballDrag1").style.zIndex = "68";
    document.getElementById("ballDrag2").style.zIndex = "67";
    document.getElementById("ballDrag3").style.zIndex = "66";
    document.getElementById("ballDrag4").style.zIndex = "65";
    document.getElementById("player1").style.zIndex = "64";
    document.getElementById("player1drag1").style.zIndex = "63";
    document.getElementById("player1drag2").style.zIndex = "62";
    document.getElementById("player1drag3").style.zIndex = "61";
    document.getElementById("player2").style.zIndex = "64";
    document.getElementById("player2drag1").style.zIndex = "63";
    document.getElementById("player2drag2").style.zIndex = "62";
    document.getElementById("player2drag3").style.zIndex = "61";
    document.getElementById("victor").style.zIndex = "64";
    document.getElementById("subtext").style.zIndex = "64";
    document.getElementById("outerframe").style.zIndex = "74";
    document.getElementById("optionsCard").style.zIndex = "75";
    [1, 2].forEach(number => {
        document.getElementById(`scoreframe${number}`).style.zIndex = "63";
    })
    pastFlag = true;
    document.getElementById("theme").muted = "true"
    if (audioFlag) {
        document.getElementById("start").play()
    }
    document.getElementById("mDisplay").style.display = "none";
    document.getElementById("p1c").style.display = "block";
    document.getElementById("p2c").style.display = "block";
    document.getElementById("pauseframe").style.display = "block";
    setTimeout(() => {
        document.getElementById("p1c").style.display = "none";
        document.getElementById("p2c").style.display = "none";
        document.getElementById("pauseframe").style.display = "none";
        initializeDrag(1);
        gameStart();
        changeTheme(1);
    }, 3000)
}

const rstBtn = () => {
    if (!pastFlag) {
        return;
    }
    p1score = 0
    p2score = 0
    document.getElementById("p1score").innerText = `${p1score}`
    document.getElementById("p2score").innerText = `${p2score}`
    flag = true;
    gameOver(3);
}

const gameOver = (playerWon) => {
    isCleared = false;
    changeTheme(1);
    initializeDrag(0);
    if (playerWon != 3) {
        if (audioFlag) {
            document.getElementById("winsound").play()
        }
    }
    document.getElementById("ball").style.display = "none";
    multiplier = 1;
    clearInterval(ballTimer)
    ballTimer = null;
    //ABOVE ARE RESET SETTINGS
    switch(playerWon) {
        case 1:
            p1score++
            document.getElementById("victor").style.display = "block"
            document.getElementById("victor").innerText = "PLAYER 1 WON"
            document.getElementById("p1score").innerText = `${p1score}`
        break;
        case 2:
            p2score++
            document.getElementById("victor").style.display = "block"
            document.getElementById("victor").innerText = "PLAYER 2 WON"
            document.getElementById("p2score").innerText = `${p2score}`
        break;
    }
    document.getElementById("subtext").style.display = "block"
    document.addEventListener("keyup", function(event) {
        if (event.keyCode == "13") {
            if (flag) {
                document.getElementById("ball").style.display = "block";
                ballXpos=48;
                document.getElementById("ball").style.left = `48vw`
                ballYpos=36;
                document.getElementById("ball").style.top = `36vh`
                gameStart();
            }
        }
    })
}

let dragOneY = 36
let dragOneX = 48 
let dragTwoY = 36
let dragTwoX = 48 
let dragThreeY = 36
let dragThreeX = 48 
let dragFourY = 36
let dragFourX = 48
let p1d1 = 40
let p1d2 = 40
let p1d3 = 40
let p2d1 = 40
let p2d2 = 40
let p2d3 = 40
const gameStart = () => {
    changeTheme(1);
    let dragCounter = 0;
    if (isDragOn) {
        initializeDrag(1);
    }
    if (audioFlag) {
        document.getElementById("start").play()
    }
    document.getElementById("victor").style.display = "none"
    document.getElementById("subtext").style.display = "none"
    let ballX = [0.5,-0.5][Math.floor(Math.random()*2)]
    let ballY = [1,-1][Math.floor(Math.random()*2)]
    flag = false;
    ballTimer = setInterval(() => {
        dragCounter++;
        if (ballXpos <= 1) {
            if (ballYpos + 8 > p1pos-8 && ballYpos + 8 < p1pos+18) {
                let Xrand = 0;
                while (Xrand < 0.25) {
                    Xrand = Math.random() * 0.8
                }
                ballX = Xrand * multiplier
                multiplier += 0.06
                if (audioFlag) {
                    document.getElementById("paddleHit").play()
                }
            } else {
                flag = true
                gameOver(2)
            }
        }
        if (ballXpos >= 97) {
            if (ballYpos + 8 > p2pos-8 && ballYpos + 8 < p2pos+18) {
                let Xrand = 0;
                while (Xrand > -0.25) {
                    Xrand = Math.random() * -0.8
                }
                ballX = Xrand * multiplier
                multiplier += 0.06
                if (audioFlag) {
                    document.getElementById("paddleHit").play()
                }
            } else {
                flag = true
                gameOver(1)
            }
        }
        if (ballYpos <= -8) {
            ballY = 1 * multiplier
       }
        if (ballYpos >= 85) {
            ballY = -1 * multiplier
        }
        /*if (optFlag) {
            if (temp == 0) {
                tempX = ballX;
                tempY = ballY;
                temp = 1;
            }
            ballX = 0;
            ballY = 0;
        }*/
        if (!optFlag) {
            ballXpos += ballX
            ballYpos += ballY
            if (isDragOn) {
                if (dragCounter % 2 == 0) {
                    updateDrag(dragOneX, dragOneY, 1);
                    if (isPDragOn) {
                    updatePDrag(1, 1, p1d1);
                    p1d1 = p1pos;
                    updatePDrag(2, 1, p2d1);
                    p2d1 = p2pos;
                    } else if (!isCleared) {
                        initializeDrag(0, 1);
                        isCleared = true;
                    }
                    dragOneX = ballXpos
                    dragOneY = ballYpos
                }
                if (dragCounter % 3 == 0) {
                    updateDrag(dragTwoX, dragTwoY, 2);
                    if (isPDragOn) {
                    updatePDrag(1, 2, p1d2);
                    p1d2 = p1pos;
                    updatePDrag(2, 2, p2d2);
                    p2d2 = p2pos;
                    }
                    dragTwoX = ballXpos
                    dragTwoY = ballYpos
                }
                if (dragCounter % 4 == 0) {
                    updateDrag(dragThreeX, dragThreeY, 3);
                    if (isPDragOn) {
                    updatePDrag(1, 3, p1d3);
                    p1d3 = p1pos;
                    updatePDrag(2, 3, p2d3);
                    p2d3 = p2pos;
                    }
                    dragThreeX = ballXpos
                    dragThreeY = ballYpos
                }
                if (dragCounter % 5 == 0) {
                    updateDrag(dragFourX, dragFourY, 4);
                    dragFourX = ballXpos
                    dragFourY = ballYpos
                }
            }
            document.getElementById("ball").style.left = `${ballXpos}vw`
            document.getElementById("ball").style.top = `${ballYpos}vh`
        }
        if (dynFlag) {
            dynCheck();
        }
    }, 20)
}

const changeDrag = () => {
    isDragOn = !isDragOn
    switch (isDragOn) {
        case true:
            if (!pastFlag) {
                initializeDrag(1)
            }
            document.getElementById("dragOption").innerText = `DRAG - ON`
        break;
        case false:
            initializeDrag(0)
            document.getElementById("dragOption").innerText = `DRAG - OFF`
        break;
    }
}

const player2MoveUp = () => {
    if (p2pos == 0) {
        return;
    } 
    p2pos--
    document.getElementById("player2").style.marginTop = `${p2pos}vh`
}

const player2MoveDown = () => {
    if (p2pos == 85) {
        return;
    }
    p2pos++
    document.getElementById("player2").style.marginTop = `${p2pos}vh`
}

const player2MoveDownSetting = () => {
    if(stimer) return;
    stimer= setInterval(player2MoveDown, sensitivity);
}

const player2MoveUpSetting = () => {
    if(stimer) return;
    stimer= setInterval(player2MoveUp, sensitivity);
}

const player1MoveUp = () => {
    if (p1pos == 0) {
        return;
    } 
    p1pos--
    document.getElementById("player1").style.marginTop = `${p1pos}vh`
}

const player1MoveDown = () => {
    if (p1pos == 85) {
        return;
    }
    p1pos++
    document.getElementById("player1").style.marginTop = `${p1pos}vh`
}

const player1MoveDownSetting = () => {
    if(timer) return;
    timer= setInterval(player1MoveDown, sensitivity);
}

const player1MoveUpSetting = () => {
    if(timer) return;
    timer= setInterval(player1MoveUp, sensitivity);
}
  
const playerStop = () => {
    clearInterval(timer);
    timer= null;
}

const player2Stop = () => {
    clearInterval(stimer);
    stimer = null;
}

document.addEventListener("keydown", function(event){
    if (event.key.toLowerCase() == "s") {
        player1MoveDownSetting();
        document.addEventListener("keyup", function(sec){
            if (sec.key == "s") {
                playerStop();
            }
        })
    }
    if (event.key.toLowerCase() == "w") {
        player1MoveUpSetting();
        document.addEventListener("keyup", function(sec){
            if (sec.key == "w") {
                playerStop();
            }
        })
    }
    if (event.keyCode == "40") {
        player2MoveDownSetting();
        document.addEventListener("keyup", function(sec){
            if (sec.keyCode == "40") {
                player2Stop();
            }
        })
    }
    if (event.keyCode == "38") {
        player2MoveUpSetting();
        document.addEventListener("keyup", function(sec){
            if (sec.keyCode == "38") {
                player2Stop();
            }
        })
    }
})

document.addEventListener("keyup", function(event) {
    if (event.keyCode == "27") {
        closeOptions();
    }
    if (event.key.toLowerCase() == "p") {
        displayOptions();
    }
})

document.getElementById("sensRange").addEventListener("change", function(){
    let temporary = 9 - document.getElementById("sensRange").value;
    sensitivity = temporary * 2.5;
})

let dropFlag = false;
const mouseoverDyn = () => {
    dropFlag = false;
    document.getElementById("dynText").style.opacity = `1`;
    document.getElementById("dynamicBtn").style.opacity = `1`
    setTimeout(() => {
        if (!dropFlag) {
            document.getElementById("dropdown-info").style.display = "block";
        }
    }, 500)
}

const initializeDrag = (state, isExc) => {
    switch (state) {
        case 1:
            if (isExc != 1) {
        document.getElementById("ballDrag1").style.display = "block";
        document.getElementById("ballDrag2").style.display = "block";
        document.getElementById("ballDrag3").style.display = "block";
        document.getElementById("ballDrag4").style.display = "block";
        }
        document.getElementById("player1drag1").style.display = "block";
        document.getElementById("player1drag2").style.display = "block";
        document.getElementById("player1drag3").style.display = "block";
        document.getElementById("player2drag1").style.display = "block";
        document.getElementById("player2drag2").style.display = "block";
        document.getElementById("player2drag3").style.display = "block";
        /*for (let i = 1; i <= 3; i++) {
            for (let j = 1; j <= 3; j++) {
                document.getElementById(`player${i}drag${j}`).style.display = "block";
            }
        }*/
        break;
        case 0:
            if (isExc != 1) {
        document.getElementById("ballDrag1").style.display = "none";
        document.getElementById("ballDrag2").style.display = "none";
        document.getElementById("ballDrag3").style.display = "none";
        document.getElementById("ballDrag4").style.display = "none";
            }
        document.getElementById("player1drag1").style.display = "none";
        document.getElementById("player1drag2").style.display = "none";
        document.getElementById("player1drag3").style.display = "none";
        document.getElementById("player2drag1").style.display = "none";
        document.getElementById("player2drag2").style.display = "none";
        document.getElementById("player2drag3").style.display = "none";
        /*for (let i = 1; i <= 3; i++) {
            for (let j = 1; j <= 3; j++) {
                document.getElementById(`player${i}drag${j}`).style.display = "none";
            }
        }*/

        dragOneY = -999;
        dragOneX = -999;
        dragTwoY = -999;
        dragTwoX = -999;
        dragThreeY = -999;
        dragThreeX = -999;
        dragFourY = -999;
        dragFourX = -999;
        break;
    }
}

const mouseoutDyn = () => {
    document.getElementById("dynText").style.opacity = `0.8`;
    document.getElementById("dynamicBtn").style.opacity = `0.6`
    document.getElementById("dropdown-info").style.display = "none";
    dropFlag = true;
}


const enableDynamic = () => {
    dynFlag = !dynFlag;
    switch (dynFlag) {
        case true:
            document.getElementById("dynamicBtn").style.backgroundImage = "url(resources/checked.png)";
            document.getElementById("sensRange").style.pointerEvents = "none";
            document.getElementById("sensRange").style.opacity = 0.35;
            dynCheck();
        break;
        case false:
            document.getElementById("dynamicBtn").style.backgroundImage = "url(resources/unchecked.png)";
            document.getElementById("sensRange").style.pointerEvents = "all";
            document.getElementById("sensRange").style.opacity = 0.8;
            sensitivity = Number(document.getElementById("sensRange").value)
        break;
    }
}

const dynCheck = () => {
    sensitivity = 14 - (multiplier * 3.4);
}

const updateDrag = (xpos, ypos, dragNum) => {
    document.getElementById(`ballDrag${dragNum}`).style.left = `${xpos}vw`
    document.getElementById(`ballDrag${dragNum}`).style.top = `${ypos}vh`
}

const updatePDrag = (player, dragNum, ypos) => {
    document.getElementById(`player${player}drag${dragNum}`).style.marginTop = `${ypos}vh`
    /*switch (player) {
        case 1:
            switch(dragNum) {
                case 1:
                    document.getElementById("player1drag1").style.marginTop = `${ypos}vh`
                    console.log("checked")
                break;
                case 2:
                break;
                case 3:
                break;
            }
        break;
        case 2:
            switch(dragNum) {
                case 1:
                break;
                case 2:
                break;
                case 3:
                break;
            }
        break;
    }*/
}

let theme = 1;
const changeTheme = (flag) => {
    if (flag != 1) {
    if (theme == 6) {
        theme = 1;
    } else theme++
    }
    switch (theme) {
        case 1: // CLASSIC
        initializeDrag(1, 1);
        isPDragOn = true;
        document.getElementById("themesButton").innerText = `CLASSIC`;


        document.getElementById("player1drag1").style.backgroundColor = "rgb(0, 205, 252)";
        document.getElementById("player1drag2").style.backgroundColor = "rgb(0, 169, 199)";
        document.getElementById("player1drag3").style.backgroundColor = "rgb(0, 120, 219)";
        document.getElementById("player2drag1").style.backgroundColor = "rgb(0, 205, 212)";
        document.getElementById("player2drag2").style.backgroundColor = "rgb(0, 169, 199)";
        document.getElementById("player2drag3").style.backgroundColor = "rgb(0, 120, 219)";


        document.getElementById("backgroundEffect").src = "resources/newvid.gif";
        document.getElementById("backgroundEffect").style.opacity = "0.75";
        document.getElementById("ball").style.backgroundColor = `rgb(255, 255, 255)`
        document.getElementById("ball").style.outline = `0px solid black`

        document.getElementById("ballDrag1").style.backgroundColor = `rgb(0, 205, 212)`
        document.getElementById("ballDrag1").style.boxShadow = `0px 0px 10px rgb(0, 205, 212)`
        document.getElementById("ballDrag2").style.backgroundColor = `rgb(0, 169, 199)`
        document.getElementById("ballDrag2").style.boxShadow = `0px 0px 10px rgb(0, 169, 199)`
        document.getElementById("ballDrag3").style.backgroundColor = `rgb(0, 120, 219)`
        document.getElementById("ballDrag3").style.boxShadow = `0px 0px 10px rgb(0, 120, 219)`
        document.getElementById("ballDrag4").style.backgroundColor = `rgb(0, 81, 255)`
        document.getElementById("ballDrag4").style.boxShadow = `0px 0px 10px rgb(0, 81, 255)`

        document.getElementById("victor").style.color = `rgb(255, 255, 255)`
        document.getElementById("subtext").style.color = `rgb(255, 255, 255)`
        document.getElementById("player1").style.backgroundColor = `rgb(255, 255, 255)`
        document.getElementById("player1").style.outline = `0.5vh solid black`
        document.getElementById("player2").style.backgroundColor = `rgb(255, 255, 255)`
        document.getElementById("player2").style.outline = `0.5vh solid black`

        document.getElementById("victor").style.backgroundColor = `rgb(0, 0, 0, 0)`
            document.getElementById("subtext").style.backgroundColor = `rgb(0, 0, 0, 0)`

        document.getElementById("p1score").style.color = "rgb(255, 255, 255)";
        document.getElementById("p2score").style.color = "rgb(255, 255, 255)";

        document.getElementById("outerframe").style.zIndex = "74";
        document.getElementById("optionsCard").style.zIndex = "75";

        document.getElementById("overlay").style.opacity = `0.25`;
        document.getElementById("tvover").style.opacity = "0.5";

        break;


        case 2: // 1337
        initializeDrag(0, 1);
        isPDragOn = false;
        document.getElementById("themesButton").innerText = `1337`;

        document.getElementById("backgroundEffect").src = `resources/1337.png`;
        document.getElementById("backgroundEffect").style.opacity = "1";
        document.getElementById("ball").style.backgroundColor = `rgb(0, 255, 0)`
        document.getElementById("ball").style.outline = `1vw solid black`

        document.getElementById("ballDrag1").style.backgroundColor = `rgb(0, 255, 0)`
        document.getElementById("ballDrag1").style.boxShadow = `0px 0px 0px rgb(0, 255, 0)`
        document.getElementById("ballDrag2").style.backgroundColor = `rgb(0, 255, 0)`
        document.getElementById("ballDrag2").style.boxShadow = `0px 0px 0px rgb(0, 255, 0)`
        document.getElementById("ballDrag3").style.backgroundColor = `rgb(0, 255, 0)`
        document.getElementById("ballDrag3").style.boxShadow = `0px 0px 0px rgb(0, 255, 0)`
        document.getElementById("ballDrag4").style.backgroundColor = `rgb(0, 255, 0)`
        document.getElementById("ballDrag4").style.boxShadow = `0px 0px 0px rgb(0, 255, 0)`

        document.getElementById("victor").style.backgroundColor = `rgb(0, 0, 0, 1)`
        document.getElementById("subtext").style.backgroundColor = `rgb(0, 0, 0, 1)`

        document.getElementById("victor").style.color = `rgb(0, 255, 0)`
        document.getElementById("subtext").style.color = `rgb(0, 255, 0)`
        document.getElementById("player1").style.backgroundColor = `rgb(0, 255, 0)`
        document.getElementById("player1").style.outline = `1vw solid black`
        document.getElementById("player2").style.backgroundColor = `rgb(0, 255, 0)`
        document.getElementById("player2").style.outline = `1vw solid black`
        document.getElementById("outerframe").style.zIndex = "74";
        document.getElementById("optionsCard").style.zIndex = "75";

        document.getElementById("p1score").style.color = "rgb(0, 255, 0)";
        document.getElementById("p2score").style.color = "rgb(0, 255, 0)";


        document.getElementById("overlay").style.opacity = `0.5`;
        document.getElementById("tvover").style.opacity = "0.5";

        break;

        case 3:
            initializeDrag(1, 1);
            isPDragOn = true;
            document.getElementById("themesButton").innerText = `MIDNIGHT`;

        document.getElementById("player1drag1").style.backgroundColor = "rgb(143, 83, 226)";
        document.getElementById("player1drag2").style.backgroundColor = "rgb(124, 72, 196)";
        document.getElementById("player1drag3").style.backgroundColor = "rgb(66, 38, 104)";
        document.getElementById("player2drag1").style.backgroundColor = "rgb(143, 83, 226)";
        document.getElementById("player2drag2").style.backgroundColor = "rgb(124, 72, 196)";
        document.getElementById("player2drag3").style.backgroundColor = "rgb(66, 38, 104)";

            document.getElementById("backgroundEffect").src = "resources/midnight.gif";
            document.getElementById("backgroundEffect").style.opacity = "0.3";
            document.getElementById("ball").style.backgroundColor = `rgb(255, 255, 255)`
            document.getElementById("ball").style.outline = `0px solid black`
    
            document.getElementById("ballDrag1").style.backgroundColor = `rgb(143, 83, 226)`
            document.getElementById("ballDrag1").style.boxShadow = `0px 0px 10px rgb(143, 83, 226)`
            document.getElementById("ballDrag2").style.backgroundColor = `rgb(124, 72, 196)`
            document.getElementById("ballDrag2").style.boxShadow = `0px 0px 10px rgb(124, 72, 196)`
            document.getElementById("ballDrag3").style.backgroundColor = `rgb(87, 52, 137)`
            document.getElementById("ballDrag3").style.boxShadow = `0px 0px 10px rgb(87, 52, 137)`
            document.getElementById("ballDrag4").style.backgroundColor = `rgb(66, 38, 104)`
            document.getElementById("ballDrag4").style.boxShadow = `0px 0px 10px rgb(66, 38, 104)`
    
            document.getElementById("victor").style.color = `rgb(255, 255, 255)`
            document.getElementById("subtext").style.color = `rgb(255, 255, 255)`
            document.getElementById("player1").style.backgroundColor = `rgb(255, 255, 255)`
            document.getElementById("player1").style.outline = `1vh solid black`
            document.getElementById("player2").style.backgroundColor = `rgb(255, 255, 255)`
            document.getElementById("player2").style.outline = `1vh solid black`

            document.getElementById("victor").style.backgroundColor = `rgb(0, 0, 0, 0)`
            document.getElementById("subtext").style.backgroundColor = `rgb(0, 0, 0, 0)`
    
            document.getElementById("p1score").style.color = "rgb(255, 255, 255)";
            document.getElementById("p2score").style.color = "rgb(255, 255, 255)";
    
            document.getElementById("outerframe").style.zIndex = "74";
            document.getElementById("optionsCard").style.zIndex = "75";
    
            document.getElementById("overlay").style.opacity = `0.25`;
            document.getElementById("tvover").style.opacity = "0.5";
    
            break;
        case 4:
            initializeDrag(0, 1);
            isPDragOn = false;
            document.getElementById("themesButton").innerText = `KEEP OUT`;
            document.getElementById("backgroundEffect").src = `resources/keepout.png`;
        document.getElementById("backgroundEffect").style.opacity = "0.6";
        document.getElementById("ball").style.backgroundColor = `rgb(254, 186, 0)`
        document.getElementById("ball").style.outline = `0.5vw solid rgb(4, 3, 0)`

        document.getElementById("ballDrag1").style.backgroundColor = `rgb(254, 186, 0)`
        document.getElementById("ballDrag1").style.boxShadow = `0px 0px 0px rgb(254, 186, 0)`
        document.getElementById("ballDrag2").style.backgroundColor = `rgb(254, 186, 0)`
        document.getElementById("ballDrag2").style.boxShadow = `0px 0px 0px rgb(254, 186, 0)`
        document.getElementById("ballDrag3").style.backgroundColor = `rgb(254, 186, 0)`
        document.getElementById("ballDrag3").style.boxShadow = `0px 0px 0px rgb(254, 186, 0)`
        document.getElementById("ballDrag4").style.backgroundColor = `rgb(254, 186, 0)`
        document.getElementById("ballDrag4").style.boxShadow = `0px 0px 0px rgb(254, 186, 0)`

        document.getElementById("victor").style.color = `rgb(254, 186, 0)`
        document.getElementById("subtext").style.color = `rgb(254, 186, 0)`
        document.getElementById("player1").style.backgroundColor = `rgb(254, 186, 0)`
        document.getElementById("player1").style.outline = `0.5vw solid rgb(4, 3, 0)`
        document.getElementById("player2").style.backgroundColor = `rgb(254, 186, 0)`
        document.getElementById("player2").style.outline = `0.5vw solid rgb(4, 3, 0)`
        document.getElementById("outerframe").style.zIndex = "74";
        document.getElementById("optionsCard").style.zIndex = "75";

        document.getElementById("victor").style.backgroundColor = `rgb(4, 3, 0, 1)`
        document.getElementById("subtext").style.backgroundColor = `rgb(4, 3, 0, 1)`

        document.getElementById("p1score").style.color = "rgb(254, 186, 0)";
        document.getElementById("p2score").style.color = "rgb(254, 186, 0)";
        
        document.getElementById("tvover").style.opacity = "0.7";
        document.getElementById("overlay").style.opacity = `0.25`;
        break;
        case 6:
            initializeDrag(1, 1);
            isPDragOn = true;
            document.getElementById("themesButton").innerText = `NONE`;

        document.getElementById("backgroundEffect").src = "resources/none.png";
        document.getElementById("backgroundEffect").style.opacity = "0.75";
        document.getElementById("ball").style.backgroundColor = `rgb(255, 255, 255)`
        document.getElementById("ball").style.outline = `0px solid black`

        document.getElementById("player1drag1").style.backgroundColor = "rgb(212, 198, 0)";
        document.getElementById("player1drag2").style.backgroundColor = "rgb(199, 162, 0)";
        document.getElementById("player1drag3").style.backgroundColor = "rgb(255, 0, 0)";
        document.getElementById("player2drag1").style.backgroundColor = "rgb(212, 198, 0)";
        document.getElementById("player2drag2").style.backgroundColor = "rgb(199, 162, 0)";
        document.getElementById("player2drag3").style.backgroundColor = "rgb(255, 0, 0)";

        document.getElementById("ballDrag1").style.backgroundColor = `rgb(212, 198, 0)`
        document.getElementById("ballDrag1").style.boxShadow = `0px 0px 10px rgb(212, 198, 0)`
        document.getElementById("ballDrag2").style.backgroundColor = `rgb(199, 162, 0)`
        document.getElementById("ballDrag2").style.boxShadow = `0px 0px 10px rgb(199, 162, 0)`
        document.getElementById("ballDrag3").style.backgroundColor = `rgb(219, 132, 0)`
        document.getElementById("ballDrag3").style.boxShadow = `0px 0px 10px rgb(219, 132, 0)`
        document.getElementById("ballDrag4").style.backgroundColor = `rgb(255, 0, 0)`
        document.getElementById("ballDrag4").style.boxShadow = `0px 0px 10px rgb(255, 0, 0)`

        document.getElementById("victor").style.color = `rgb(255, 255, 255)`
        document.getElementById("subtext").style.color = `rgb(255, 255, 255)`
        document.getElementById("player1").style.backgroundColor = `rgb(255, 255, 255)`
        document.getElementById("player1").style.outline = `1vh solid black`
        document.getElementById("player2").style.backgroundColor = `rgb(255, 255, 255)`
        document.getElementById("player2").style.outline = `1vh solid black`

        document.getElementById("victor").style.backgroundColor = `rgb(0, 0, 0, 0)`
            document.getElementById("subtext").style.backgroundColor = `rgb(0, 0, 0, 0)`

        document.getElementById("p1score").style.color = "rgb(255, 255, 255)";
        document.getElementById("p2score").style.color = "rgb(255, 255, 255)";

        document.getElementById("outerframe").style.zIndex = "74";
        document.getElementById("optionsCard").style.zIndex = "75";

        document.getElementById("overlay").style.opacity = `0.25`;
        document.getElementById("tvover").style.opacity = "0.5";
        break;

        case 5:
            initializeDrag(1, 1)
            isPDragOn = true;
            document.getElementById("themesButton").innerText = `BLUE v RED`;

        document.getElementById("backgroundEffect").src = "resources/bluevred.png";
        document.getElementById("backgroundEffect").style.opacity = "0.75";
        document.getElementById("ball").style.backgroundColor = `rgb(255, 255, 255)`
        document.getElementById("ball").style.outline = `0px solid black`

        document.getElementById("player1drag1").style.backgroundColor = "rgb(255, 0, 0)";
        document.getElementById("player1drag2").style.backgroundColor = "rgb(255, 0, 0, 0.7)";
        document.getElementById("player1drag3").style.backgroundColor = "rgb(255, 0, 0, 0.4)";
        document.getElementById("player2drag1").style.backgroundColor = "rgb(0, 221, 255)";
        document.getElementById("player2drag2").style.backgroundColor = "rgb(0, 221, 255, 0.7)";
        document.getElementById("player2drag3").style.backgroundColor = "rgb(0, 81, 255, 0.4)";

        document.getElementById("ballDrag1").style.backgroundColor = `rgb(0, 221, 255)`
        document.getElementById("ballDrag1").style.boxShadow = `0px 0px 10px rgb(0, 221, 255)`
        document.getElementById("ballDrag2").style.backgroundColor = `rgb(255, 0, 0)`
        document.getElementById("ballDrag2").style.boxShadow = `0px 0px 10px rgb(255, 0, 0)`
        document.getElementById("ballDrag3").style.backgroundColor = `rgb(0, 221, 255)`
        document.getElementById("ballDrag3").style.boxShadow = `0px 0px 10px rgb(0, 221, 255)`
        document.getElementById("ballDrag4").style.backgroundColor = `rgb(255, 0, 0)`
        document.getElementById("ballDrag4").style.boxShadow = `0px 0px 10px rgb(255, 0, 0)`

        document.getElementById("victor").style.color = `rgb(255, 255, 255)`
        document.getElementById("subtext").style.color = `rgb(255, 255, 255)`
        document.getElementById("player1").style.backgroundColor = `rgb(255, 255, 255)`
        document.getElementById("player1").style.outline = `1vh solid black`
        document.getElementById("player2").style.backgroundColor = `rgb(255, 255, 255)`
        document.getElementById("player2").style.outline = `1vh solid black`

        document.getElementById("victor").style.backgroundColor = `rgb(0, 0, 0, 0)`
            document.getElementById("subtext").style.backgroundColor = `rgb(0, 0, 0, 0)`

        document.getElementById("p1score").style.color = "rgb(255, 255, 255)";
        document.getElementById("p2score").style.color = "rgb(255, 255, 255)";

        document.getElementById("outerframe").style.zIndex = "74";
        document.getElementById("optionsCard").style.zIndex = "75";

        document.getElementById("overlay").style.opacity = `0.25`;
        document.getElementById("tvover").style.opacity = "0.5";
        break;

    }

}

overlay();
