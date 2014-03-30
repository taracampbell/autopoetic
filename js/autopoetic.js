$(document).mousemove(function(e){
    $("#cell").css({left:e.pageX, top:e.pageY});
});

var FPS = 30;
size = 100;
setInterval(function() {
      update();
        draw();
}, 1000/FPS);

function update() {
    size -= .1;
}
function draw() {
    $("#cell").width(size);
    $("#cell").height(size);
}
