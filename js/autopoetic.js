$(document).mousemove(function(e){
    setCellSpeed(e.pageX, e.pageY);
});
function setCellSpeed(targetX, targetY) {
    mainCell.speedx = (targetX - mainCell.x - mainCell.size/2)/100;
    mainCell.speedy = (targetY - mainCell.y - mainCell.size/2)/100;
}
var FPS = 30;
mainCell = new Baddie();
mainCell.speedx = 1;
mainCell.speedy = 1;
mainCell.size = 100;
maxSize = 200;
xmax = $(window).width();
ymax = $(window).height();
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
    mainCell.size -= .1;
    var size = mainCell.size;
    if( Math.random() < 0.1 && baddies.length < numBaddies) {
        addBaddie();
    }

    var c = $("#cell").offset();
    c.x = c.left;
    c.y = c.top;
    mainCell.x += mainCell.speedx;
    mainCell.y += mainCell.speedy;
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

            mainCell.size += b.size/10;
            if(mainCell.size > maxSize) {
                mainCell.size = maxSize;
            }

            baddies.splice(i, 1);
            freeIDs.push(id);
            i--;
        }

    }
}
function draw() {
    $("#cell").css({left:mainCell.x, top:mainCell.y});
    $("#cell").width(mainCell.size);
    $("#cell").height(mainCell.size);
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
    $('#baddie' + id).offset({ top: baddie.y, left: baddie.x});
    $('#baddie' + id).width(Math.floor(baddie.size));
    $('#baddie' + id).height(Math.floor(baddie.size));
}

function Baddie() {
    this.size = Math.random() * 50 + 20;
    this.speedx = Math.random() * 16 - 8;
    this.speedy = Math.random() * 16 - 8;
    this.x = Math.random() * $(window).width();
    this.y = Math.random() * $(window).height();
}
