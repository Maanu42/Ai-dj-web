leftwristX=0;
leftwristY=0;
rishtwristX=0;
rishtwristY=0;
score=0;
rightScore=0;
song="";
function preload(){
    song= loadSound("music.mp3");
}
function setup(){
    canvas= createCanvas(600,500);
    canvas.center();

    video= createCapture(VIDEO);
    video.hide();

    posenet=ml5.poseNet(video,modelLoaded);
    posenet.on('pose',gotPoses);
}

function modelLoaded(){
console.log("Mode is loaded");
}

function gotPoses(results){
if (results.length>0){
    score=results[0].pose.keypoints[9].score;
    rightScore=results[0].pose.keypoints[10].score;
    console.log(score);
    console.log(results);
    leftwristX=results[0].pose.leftWrist.x;
    leftwristY=results[0].pose.leftWrist.y;
    console.log("Left Wrist x= "+leftwristX+" y= "+leftwristY);

    rightwristX=results[0].pose.rightWrist.x;
    rightwristY=results[0].pose.rightWrist.y;
    console.log("Right Wrist x= "+rightwristX+" y= "+rightwristY);
}
}

function draw(){
    image(video,0,0,600,500);

    fill("red");
    stroke("red");
    
    if(rightScore>0.2){
        circle(rightwristX,rightwristY,20);
        if(rightwristY > 0 && rightwristY<=100){
song.rate(0.5);
document.getElementById("speed").innerHTML="Speed is 0.5";
        }
        else if(rightwristY > 100 && rightwristY <= 200){
            song.rate(1);
            document.getElementById("speed").innerHTML="Speed is 1";
        }
        else if(rightwristY > 200 && rightwristY <= 300){
            song.rate(1.5);
            document.getElementById("speed").innerHTML="Speed is 1.5";
        }
        else if(rightwristY > 300 && rightwristY <= 400){
            song.rate(2);
            document.getElementById("speed").innerHTML="Speed is 2";
        }
        else if(rightwristY > 400 && rightwristY <= 500){
            song.rate(2.5);
            document.getElementById("speed").innerHTML="Speed is 2.5";
        }
    }

if(score > 0.2){
    circle(leftwristX+-20,leftwristY,20);
    leftwristYno=Number(leftwristY);
    remove_decimals=floor(leftwristY);
    volume=remove_decimals/500;
    console.log("Left y="+volume);
    song.setVolume(volume);
    document.getElementById("vol").innerHTML="Volume is "+volume;
}  
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(2.5);
}