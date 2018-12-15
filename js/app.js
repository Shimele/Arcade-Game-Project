class Hero {
    constructor() {
        //sprite image which is a string of a path to a png image inside the “images” folder
        this.sprite = 'images/char-boy.png';
        this.step = 101; //distance between one block to another from the x axis
        this.jump = 83; //distance between the blocks on the y axis
        // setting an initial starting location
        //which is the value of this.step * 2, which places the hero 2 blocks to the right (middle block) on the x axis.
        //and y which is the value of this.jump * 5, placing the hero 5 blocks down from the top row.
        this.startX = this.step * 2;
        this.startY = (this.jump * 4) + 55; //subtracting 20 px off the y initial start location for a more centered position (adding some padding)
        //seting an initial property value of “x” and “y” to a value of 0 which would be the top left corner of our canvas
        this.x = this.startX;
        this.y = this.startY;
        this.victory = false;
    }
    //drawing hero sprite on current x and y coordinate position.
    //the drawImage method from the ctx (2d canvas) object with a few arguments.
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    // modify the player’s x and y property based on what argument is passed as a parameter to this method
    //could do a chain of if else statements to accomplish the same thing.
    handleInput(input) {
        switch (input) {
            case 'left':
                if (this.x > 0) { //adding some boundery to the hero's free mov't
                    this.x -= this.step; // if the hero’s x property is greater than 0 (the left edge of the board). If it is, continue left. Once we reach the left edge of the board (0) the conditional will fail and we won’t be able to continue left…
                }
                break;
            case 'up':
                if (this.y > this.jump) { //setting the top boundery.
                    this.y -= this.jump;
                }
                break;
            case 'right':
                if (this.x < this.step * 4) { //we use the step property (block width) to determine our boundary
                    this.x += this.step; //se that step property (block width) to determine our boundary
                }
                break;
            case 'down':
                if (this.y < this.jump * 4) { //setting the bottom boundery.
                    this.y += this.jump; //setting the boundary for number of block heights from the top of the y axis
                } //because we added that 20 px padding earlier it throws off the final conditional check, resulting in a 4 block height to reach the boundary…
                break
        }
    }
    //update position
    update() {
        //checking for collision.
        for (let enemy of allEnemies) {
            //is player on same x and y axis with the enemy?
            if (this.y === enemy.y && (enemy.x + enemy.step / 2 > this.x && enemy.x < this.x +
                    this.step / 2)) {
                this.reset();
            }
        }
        // if player has reached the final tile, then victory becomes true.
        if (this.y === 55) {
            this.victory = true;
        }
    }
    //reseting hero
    reset() {
        this.y = this.startY;
        this.x = this.startX;
    }
}
const player = new Hero();
// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y + 55; //putting 55 for a more center scroll of the enemy across the block.
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
    this.step = 101;
    this.boundery = this.step * 5; //increasing boundery to let enemy move right outside the board
    this.resetPosition = -this.step; // reseting the strat position of the enemy to one block off screen to enable a smooth enterance
};
const ladybug1 = new Enemy(-101, 0, 200);
const ladybug2 = new Enemy(-101, 200, 300); // second enemy with x and y cordinate diff from the others giving it a unique position on board
const ladybug3 = new Enemy((-101 * 2.5), 83, 350) // third enemy with a unique x and y cordinate for a unique position on board
const ladybug4 = new Enemy(-101, 60, 500)
const ladybug5 = new Enemy(-101, 75, 80)
const allEnemies = []; //empty array to hold all our enemy xters
allEnemies.push(ladybug1, ladybug2, ladybug3, ladybug4, ladybug5);
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    //give the enemy a constant speed across the gameboard as the computer loops through the code in the game loop.
    //*5(this.boundery) give the enemy a constant speed across the gameboard as the computer loops through the code in the game loop.
    if (this.x < this.boundery) { //checking that the enemy isn’t past the boundary, which I currently have set to be the step property multiplied by 4 as a placeholder
        this.x += this.speed * dt; //while this is true, increment the object’s x property
    } else {
        this.x = this.resetPosition; //repositioning back the enemy to the start of the board
    }
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function(x) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});