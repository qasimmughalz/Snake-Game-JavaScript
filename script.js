

var blockSize = 25;
var rows = 20;
var cols = 20;

var board ;
var context;



// ============ Initial Snake Setting ==============
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

// ============ Initial Food Setting ==============
var foodX;
var foodY;

// ======= Initial Velocity to See Visualization of Moving Snake from Left or Right on Key Press - ShowDirection ===========
var velocityX = 0;
var velocityY = 0;

// ========== Making Sanke Body ==========
var snakeBody = []


var gameOver = false
var score = 0;
var getname;



window.onload = function(){
    board = document.getElementById('board')
    scorebox = document.getElementById('score') 
    getname = document.getElementById('name') 
    board.style.border = '2px solid #fff'

    // Taking user Name
    let playerName = prompt('Enter Name and Have Fun with Your Friends !')
    getname.innerHTML = playerName
    
    board.height = rows * blockSize
    board.width = cols * blockSize
    context = board.getContext('2d')

    foodRandomPosition()
    document.addEventListener('keyup', ChangeDirection)
    setInterval( update , 1000/10);  //100miliseconds
}


function update(){
    if(gameOver){
        board.style.border = '8px solid red'
        return
    }

    scorebox.innerHTML = score
    context.fillStyle = '#1b1b1e'
    context.fillRect(0,0, board.width, board.height)

    context.fillStyle = 'red'
    context.fillRect(foodX, foodY, blockSize , blockSize)


    if(foodX === snakeX && foodY === snakeY){
        snakeBody.push([snakeX , snakeY])
        score +=2
        foodRandomPosition()
    }


    for(let i=snakeBody.length-1 ;i>0;i--){
        snakeBody[i] = snakeBody[i-1]
    }

    if(snakeBody.length){
        snakeBody[0] = [snakeX, snakeY]
    }


    context.fillStyle = 'lime'
    snakeX += velocityX * blockSize
    snakeY += velocityY * blockSize    
    context.fillRect(snakeX, snakeY , blockSize , blockSize)   //fillRect(x,y, width, height)
    for(let i=0;i<snakeBody.length;i++){
        context.fillRect(snakeBody[i][0], snakeBody[i][1] , blockSize, blockSize)
    }

    if(snakeX < 0 || snakeX >= cols* blockSize || snakeY < 0 || snakeY >= rows* blockSize ){
        gameOver = true
    }
    
    for(let i=0;i<snakeBody.length ;i++){
        if(snakeX === snakeBody[i][0] && snakeY === snakeBody[i][1]){
            gameOver = true
        }
    }
}

function ChangeDirection(e){
    if(e.code === 'ArrowUp' && velocityY != 1){
        velocityX = 0;
        velocityY = -1
    }
    else if(e.code === 'ArrowDown' && velocityY != -1){
        velocityX = 0;
        velocityY = 1
    }
    if(e.code === 'ArrowLeft' && velocityX != 1){
        velocityX = -1;
        velocityY = 0
    }
    if(e.code === 'ArrowRight' && velocityX != -1){
        velocityX = 1;
        velocityY = 0
    }
}



function foodRandomPosition(){
    foodX = Math.floor((Math.random() * cols )) * blockSize
    foodY = Math.floor((Math.random() * rows )) * blockSize
}


