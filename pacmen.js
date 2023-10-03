var pos = 0;
const pacArray = [
  ['./images/PacMan1.png', './images/PacMan2.png'],
  ['./images/PacMan3.png', './images/PacMan4.png'],
];
let pacMen = []; // This array holds all the pacmen

// This function returns an object with random values
function setToRandom(scale) {
  return {
    x: Math.random() * scale,
    y: 35 + Math.random() * (scale - 35),
  };
}

// Factory to make a PacMan at a random position with random velocity
function makePac() {
  // returns an object with random values scaled {x: 33, y: 21}
  let velocity = setToRandom(30); // {x:?, y:?}
  let position = setToRandom(400);
  velocity.x = Math.abs(velocity.x);
  velocity.x *= Math.random() < 0.5 ? 2 : 1;
  // Add image to div id = game
  let game = document.getElementById('game');
  let newimg = document.createElement('img');
  newimg.style.position = 'absolute';
  newimg.src = pacArray[0][0]; // Initial image
  newimg.width = 100;
  newimg.style.left = position.x + 'px'; // Add 'px' for units
  newimg.style.top = position.y + 'px'; // Add 'px' for units

  // TODO add new Child image to game
  game.appendChild(newimg);

  // return details in an object
  return {
    position,
    velocity,
    newimg,
    direction: 0,  // Initial direction is 0
    lastDirectionChange: 0  // Record when the direction was last changed
  };
}

function update() {
  for (let i = 0; i < pacMen.length; i++) {
    let item = pacMen[i];

    // Check collision and update position
    checkCollisions(item);

    // Toggle x direction based on velocity and position
    // Toggle x direction based on velocity and position

    // Update position based on velocity
    item.position.x += item.velocity.x;
    item.position.y += item.velocity.y;

    // Update image for mouth animation
    item.newimg.src = pacArray[item.direction][pos];
    console.log('direction: ', item.direction)

    // Update the position in the DOM
    item.newimg.style.left = item.position.x + 'px';  // Add 'px' for units
    item.newimg.style.top = item.position.y + 'px';  // Add 'px' for units

    if (
      (item.position.x + item.velocity.x + item.newimg.width > window.innerWidth &&
      item.velocity.x > 0)
    ) {
      item.velocity.x = -item.velocity.x; // Reverse x direction
      item.direction = 1; // Update direction to right-facing
      //item.newimg.src = pacArray[item.direction][pos]; // Update image
    } else if (item.position.x + item.velocity.x < 0 && item.velocity.x < 0) {
      item.velocity.x = -item.velocity.x; // Reverse x direction
      item.direction = 0; // Update direction to left-facing
      //item.newimg.src = pacArray[item.direction][pos]; // Update image
    }
    
    
        // Toggle y direction based on velocity and position
        if (item.position.y + item.velocity.y + item.newimg.height > window.innerHeight ||
            item.position.y + item.velocity.y < 0) {
          item.velocity.y = -item.velocity.y;  // Reverse y direction
        }
    
  }

  pos = (pos + 1) % 2;  // Cycle through [0, 1]

  setTimeout(update, 70);  // Adjust the timeout for the desired animation speed
}


function checkCollisions(item) {
  // TODO: detect collision with all walls and make pacman bounce
  if (
    item.position.x + item.velocity.x + item.newimg.width > window.innerWidth ||
    item.position.x + item.velocity.x < 0
  )
    item.velocity.x = -item.velocity.x;
}

function clearGame() {
  window.location.reload();
}

function makeOne() {
  let pac = makePac();
  pacMen.push(pac); // add a new PacMan
}

function makeFifty() {
  for(let i = 0; i < 50; i++) {
    let pac = makePac();
    pacMen.push(pac);
  }
}


// Don't change this line
module.exports = { checkCollisions, update, pacMen };
