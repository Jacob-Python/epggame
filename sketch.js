var level = 1
var connections = []
var poslist = []
var loopOn = 1
var stage = 1
var stages = ["0-2|1-3 0-1|2-3 0-3|1-2", "0-2|1-3|4-6|5-7 0-3|1-4|5-7|6-2 7-2|3-4|5-6|0-1"]
var xpos = [200, 150, 250, 200]
var ypos = [150, 200, 200, 250]
var xpos1 = [200, 170, 230, 200]
var ypos1 = [170, 200, 200, 230]
let levels;

function setup() {
  createCanvas(400, 400)
  strokeWeight(4)
  background(0)
}

function render() {
  for (var i = 0; i < connections.length; i += 1) {
    var poslist1 = split(connections[i], "-")
    var i1 = int(poslist1[0])
    var i2 = int(poslist1[1])
    line(xpos1[i1], ypos1[i1], xpos1[i2], ypos1[i2])
  }
}

function draw() {
  if (loopOn == 0) {
    noLoop() 
  }
  levels = split(stages[stage - 1], " ")
  clear()
  background(0)
  fill(100)
  square(160, 160, 80)
  fill(255)
  text("Level: " + level + "\nStage: " + stage, 20, 20)
  var keylist = split(levels[level - 1], "|")
  var keylist1 = split(keylist[0], "-")
  if (stage == 1) {
    fill(100, 0, 0)
    circle(xpos[int(keylist1[0])], ypos[int(keylist1[0])], 10)
    circle(xpos[int(keylist1[1])], ypos[int(keylist1[1])], 10)
    keylist1 = split(keylist[1], "-")
    fill(0, 0, 100)
    circle(xpos[int(keylist1[0])], ypos[int(keylist1[0])], 10)
    circle(xpos[int(keylist1[1])], ypos[int(keylist1[1])], 10)
  } else {
    fill(100, 0, 0)
    circle(xpos[int(keylist1[0])], ypos[int(keylist1[0])], 10)
    circle(xpos[int(keylist1[1])], ypos[int(keylist1[1])], 10)
    keylist1 = split(keylist[1], "-")
    fill(0, 0, 100)
    circle(xpos[int(keylist1[0])], ypos[int(keylist1[0])], 10)
    circle(xpos[int(keylist1[1])], ypos[int(keylist1[1])], 10)
    fill(100, 0, 0)
    keylist1 = split(keylist[2], "-")
    fill(0, 100, 0)
    circle(xpos[int(keylist1[0])], ypos[int(keylist1[0])], 10)
    circle(xpos[int(keylist1[1])], ypos[int(keylist1[1])], 10)
    keylist1 = split(keylist[3], "-")
    fill(255,255,0)
    circle(xpos[int(keylist1[0])], ypos[int(keylist1[0])], 10)
    circle(xpos[int(keylist1[1])], ypos[int(keylist1[1])], 10)
  }
  for (var i = 0; i < xpos1.length; i += 1) {
    fill(0)
    circle(xpos1[i], ypos1[i], 20)
  }
  render()
  if (mouseIsPressed && mouseButton == RIGHT) {
    var dists = []
    for (i = 0; i < xpos1.length; i += 1) {
      var x1 = xpos1[i] - mouseX
      var y1 = ypos1[i] - mouseY
      dists.push(sqrt(x1 * x1 + y1 * y1))
    }
    i = dists.indexOf(min(dists))
    if (min(dists) < 20 && poslist[poslist.length - 1] != i) {
      if (connections.length < 4) {
        if (poslist.length == 2) {
          connections.push(join(poslist, "-"))
          poslist = []
        } else {
          poslist.push(i)
        }
      }
    }
  }
  button = createButton('Check')
  button.position(317, 97)
  button.mousePressed(checkwork)
}

function checkwork() {
  let state;
  state = checkBlocks1(join(connections, "|"), levels[level - 1])
  if (state) {
    poslist = []
    alert("Nice!")
    level += 1
    connections = []
    if (level == 4) {
      alert("Good work! Stage clear!")
      stage += 1
      level = 1
      if (stage == 2) {
        xpos = [140, 140, 260, 260, 180, 220, 180, 220]
        ypos = [180, 220, 180, 220, 140, 140, 260, 260]
        xpos1 = [170, 170, 230, 230, 180, 220, 180, 220]
        ypos1 = [180, 220, 180, 220, 170, 170, 230, 230]
      }
      if (stage == 3) {
        alert("You won!")
        loopOn = 0
      }
    }
  } else {
    connections = []
    poslist = []
    alert("Sorry. Try again.")
  }
}

function checkBlocks1(block, keycore) {
  var countVar = 0
  var blocklist = split(block, "|")
  var keylist = split(keycore, "|")
  for (var i = 0; i < blocklist.length; i += 1) {
    var curr = join(split(blocklist[i], "-").reverse(), "-")
    if (keylist.indexOf(curr) != int("-1") || keylist.indexOf(blocklist[i]) != int("-1")) {
      countVar += 1
    }
  }
  if (countVar >= blocklist.length) {
    return true
  } else {
    return false
  }
}

window.addEventListener('contextmenu', e => e.preventDefault())