$(document).mousemove(function(e){
    //$("#cell").css({left:e.pageX - size/2, top:e.pageY -size/2});
    $("#cell").css({left:e.pageX, top:e.pageY});
});

var FPS = 30;
xmax = $(window).width();
ymax = $(window).height();
size = 100;
numBaddies = 100;
baddies = [];
setInterval(function() {
      update();
        draw();
}, 1000/FPS);
freeIDs = []
for(var i = 0; i < numBaddies; i++) {
    freeIDs.push(i);
}
function update() {
    size -= .1;
    if( Math.random() < 0.1 && baddies.length < numBaddies) {
        addBaddie();
    }

    var c = $("#cell").offset();
    c.x = c.left;
    c.y = c.top;
    for (var i = 0; i < baddies.length; i++) 
    {
        var b = baddies[i];
        b.x += b.speedx;
        b.y += b.speedy;
        if(b.x > xmax || b.y < 0 || b.y > ymax || b.x < 0) {
            b.x = Math.random() * xmax;
            b.y = Math.random() * ymax;
        }
        var d = (c.y - b.y) * (c.y - b.y) + (c.x - b.x) * (c.x - b.x);
        if(d < (size + b.size) * (size + b.size)/4) { //collllisssion
            var id = b.id;
            console.log('collision with item id' + id);
            $('#baddie' + id).css('background-color', 'red')
            $('#baddie' + id ).remove();
            size+= b.size/10;
            baddies.splice(i, 1);
            freeIDs.push(id);
            i--;
        }

    }
}
function draw() {
    $("#cell").width(size);
    $("#cell").height(size);
    for (var i = 0; i < baddies.length; i++) 
    {
        var bad = baddies[i];
        $('#baddie' + bad.id ).offset({ top: bad.y, left: bad.x})
    }

}

function addBaddie() {
    var id = freeIDs.pop();
    if(id == undefined) {
        return;
    }
    var baddie = new Baddie();
    baddie.id = id;
    baddies.push(baddie);
    var bad = $('body').append('<img id="baddie' + id + '" src="img/cell.png"></img>');
    $('#baddie' + id).offset({ top: baddie.x, left: baddie.y});
    $('#baddie' + id).width(bad.size);
    $('#baddie' + id).height(bad.size);
}

function Baddie() {
    this.size = Math.random() * 30;
    this.speedx = Math.random() * 5;
    this.speedy = Math.random() * 5;
    this.x = Math.random() * $(window).width();
    this.y = Math.random() * $(window).height();
}
