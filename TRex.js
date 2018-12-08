var controller, TRex, loop;
var TRexImgs = ["trex1.png", "trex2.png"];

TRex = {
    height: 32,
    width: 32,
    jumping: true,
    x: 144,
    x_velocity: 0,
    y: 0,
    y_velocity: 0

};

controller = {

    left: false,
    right: false,
    up: false,

    // KEYS CONTROL
    keyListener: function (event) {

        var key_state = (event.type == "keydown") ? true : false;

        switch (event.keyCode) {
            case 37:
                controller.left = key_state;
                break;
            case 38:
                controller.up = key_state;
                break;
            case 39:
                controller.right = key_state;
                break;
            
        }

    }
};

i = 0;
//Trex image
function newInterval() {
    if (i < TRexImgs.length) {
        document.getElementById("tRexImg").src = TRexImgs[i++];
    } else {
        i = 0;
    }
}
    
imagesInterval = setInterval(newInterval,90);

function stopTrex(){
    clearInterval(imagesInterval);
}

//LOOP
loop = function () {

    if (controller.up && TRex.jumping == false) {

        TRex.y_velocity -= 20;
        TRex.jumping = true;
        var audio = new Audio('audio.mp3');
        audio.addEventListener('ended', function () {
        this.currentTime = 0;
        this.play();
        }, false);
        audio.play();
    }

    TRex.y_velocity += 1.5;// gravity

    TRex.x += TRex.x_velocity;
    TRex.y += TRex.y_velocity;

    // if rectangle is falling below line
    if (TRex.y > 180 - 16 - 32) {

        TRex.jumping = false;
        TRex.y = 180 - 16 - 32;
        TRex.y_velocity = 0;

    }

    $("#tRexImg").css({ "position": "absolute", "top": TRex.y })
    window.requestAnimationFrame(loop);
}

//ADD EVENT LISTENERS (UP & DOWN)
window.addEventListener("keydown", controller.keyListener);
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);