const canvasWidth = window.innerWidth
const canvasHeight = window.innerHeight
const numPoints = 1000
const circleSize = 10
const heartSize = 0.2
const heartCenter = {
    x: canvasWidth/2,
    y : canvasHeight/2 - 100,
}
let started = false
let heartCircles, reds
let kick, delay, amp, fft, spectrum
let bgCol = 30

function preload(){
    kick = loadSound('assets/kick.mp3')
}


function setup(){
    createCanvas(canvasWidth, canvasHeight)
    heartpoints = heartPoints(heartData(numPoints, 0, 0, heartSize));
    reds = Array.from({length: numPoints}, () => getRandomRed())
    delay = new p5.Delay();
    amp = new p5.Amplitude()
    fft = new p5.FFT();
    bgCol = getRandomColor1()
}

function draw(){
    background(bgCol)
    if(!started){
        textSize(30)
        fill(255)
        noStroke()
        text('click anywhere to start', canvasWidth/4, canvasHeight/2)
    }else {
        
        kickPoints1(heartpoints)
        //wigglePoints(heartpoints)
        //towardsOrigin(heartpoints)
        drawCirclesHeart(heartpoints)
        drawHeart(heartpoints)
    }

}


function mousePressed(){
    started = true
    delay.connect()
    setTimeout(triggerKick, 300)
}

function triggerKick(){
    bgCol = getRandomColor1()
    kick.play()
    delay.process(kick, 0.12, 0.2, 2300)
    const pause = random(200,2000)
    setTimeout(triggerKick, pause)
}

function kickPoints1(points){
    // spectrum = fft.analyze();
    const vol = amp.getLevel()
    heartpoints = heartPoints(heartData(numPoints, 0, 0, heartSize + (heartSize * vol * 100) ));
    //updateHeartPoints(vol)
}

function wigglePoints(points){
    points.forEach(point => {
        if(random(0,100) > 90){
            point.x += random(-1,1)
        }
        if(random(0,100) > 90){
            point.y += random(-1,1)
        }
    })
}


function drawCircle({x, y}, i){ 
    fill(reds[i])
    noStroke()
    ellipse(x, y, circleSize)
}

function drawCirclesHeart(points){
    push()
    translate(heartCenter.x, heartCenter.y)
    rotate(PI)
    points.forEach((point, idx) => drawCircle(point, idx))
    pop()
}

function drawHeart(points){
    translate(heartCenter.x, heartCenter.y)
    rotate(PI)
    beginShape()
        fill(255, 0,0)
        stroke(0,0,255)
        points.forEach(point => vertex(point.x, point.y))
    endShape() 
}