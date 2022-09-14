var quick_draw_data_set=["aircraft carrier","airplane","alarm clock","ambulance","angel","animal migration","ant","anvil","apple","arm","asparagus","axe","backpack","banana","bandage","barn","baseball","baseball bat","basket","basketball","bat","bathtub","beach","bear","beard","bed","bee","belt","bench","bicycle","binoculars","bird","birthday cake","blackberry","blueberry","book","boomerang","bottlecap","bowtie","bracelet","brain","bread","bridge","broccoli","broom","bucket","bulldozer","bus","bush","butterfly","cactus","cake","calculator","calendar","camel","camera","camouflage","campfire","candle","cannon","canoe","car","carrot","castle","cat","ceiling fan","cello","cell phone","chair","chandelier","church","circle","clarinet","clock","cloud","coffee cup","compass","computer","cookie","cooler","couch","cow","crab","crayon","crocodile","crown","cruise ship","cup","diamond","dishwasher","diving board","dog","dolphin","donut","door","dragon","dresser","drill","drums","duck","dumbbell","ear", "elbow","elephant","envelope","eraser","eye"]
random_number= Math.floor(Math.random()*quick_draw_data_set.length)
sketch=quick_draw_data_set[random_number]
var drawnsketch=""
var answerholder=""
var score=0
document.getElementById("sketchname").innerHTML=sketch
function setup(){
    canvas = createCanvas(400, 400);
    canvas.center();
    background("white")
    canvas.mouseReleased(classifyCanvas)
    synth=window.speechSynthesis
}
function clearCanvas(){
    background("white")
}
function draw(){
    strokeWeight(13)
    stroke(0)
    if (mouseIsPressed) {
     line(pmouseX,pmouseY,mouseX,mouseY)   
    }
    check_sketch() 
    if (drawnsketch==sketch) {
        score++
        answerholder="set"
        document.getElementById("score").innerHTML=score
    }
}
function preload(){
    classifier=ml5.imageClassifier("DoodleNet")
}
function classifyCanvas(){
    classifier.classify(canvas,gotResult)
}
function gotResult(error,Results){
    if (error) {
        console.log(error)
    } else {
     console.log(Results)
     drawnsketch=Results[0].label   
     document.getElementById("label").innerHTML=Results[0].label
     document.getElementById("confidence").innerHTML=Results[0].confidence
utterthis= new SpeechSynthesisUtterance(Results[0].label)
synth.speak(utterthis)
    }
}
var timercounter=0
var timercheck=""
function check_sketch(){
timercounter++
document.getElementById("timer").innerHTML=timercounter
if (timercounter>110000000) {
    timercounter=0
    timercheck="completed"
}
if (timercheck=="completed"|| answerholder=="set") {
    timercheck=""
    answerholder=""
    updatecanvas()
}
}
function updatecanvas(){
    background("white")
    random_number= Math.floor(Math.random()*quick_draw_data_set.length)
sketch=quick_draw_data_set[random_number]
document.getElementById("sketchname").innerHTML=sketch
}