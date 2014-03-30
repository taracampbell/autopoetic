$(document).mousemove(function(e){
    $("#cell").css({left:e.pageX, top:e.pageY});
});

var FPS = 30;
size = 100;
numBaddies = 0;
baddies = [];
setInterval(function() {
      update();
        draw();
}, 1000/FPS);

function update() {
    size -= .1;
    if( Math.random() < 0.1) {
        addBaddie();
    }
    for (var i = 0; i < baddies.length; i++) 
    {
        var b = baddies[i];
        console.log(b);
        b.x += b.speedx;
        b.y += b.speedy;
    }
}
function draw() {
    $("#cell").width(size);
    $("#cell").height(size);
    for (var i = 0; i < baddies.length; i++) 
    {
        var bad = baddies[i];
        $('#baddie' + i ).offset({ top: bad.x, left: bad.y})
    }

}

function addBaddie() {
    numBaddies++;
    baddies.push(new Baddie());
    var baddie = baddies[baddies.length];
    var bad = $('body').append('<img id="baddie' + numBaddies + '" src="img/cell.png"></img>');
    bad.width(bad.size);
    bad.height(bad.size);
}

function Baddie() {
    this.size = Math.random() * 30;
    this.speedx = Math.random() * 20;
    this.speedy = Math.random() * 20;
    this.x = Math.random() * $(window).width();
    this.y = Math.random() * $(window).height();
}
