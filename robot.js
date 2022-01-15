class Robot {
    constructor(x, y, d) {
      this.posX = x;
      this.posY = y;
      this.direction = d;
      this.directions = ['N', 'E', 'S', 'W'];
      this.indexDirection = this.directions.indexOf(d);
    }
  
    command(comm){
      if (comm === 'F') {
        this.move();
      } else if (comm === 'L'){
        this.turn(-1);
      } else if (comm === 'R'){
        this.turn(1);
      } else {
        console.log('Incorrect command');
      }
    }
    
    turn(value) {
      this.indexDirection += value
      if (this.indexDirection < 0) {
        this.indexDirection = this.directions.length -1;
      }
    
      if (this.indexDirection > this.directions.length - 1) {
        this.indexDirection = 0;
      }
      this.direction = this.directions[this.indexDirection];
    }
  
    //TODO do not move behind 0 or room length
    move() {
      switch(this.direction) { 
        case 'N': { 
          this.posY--;
           break; 
        }
        case 'E': { 
          this.posX++;
          break; 
        } 
        case 'S': { 
          this.posY++;
          break; 
        } 
        case 'W': { 
          this.posX--;
          break; 
        } 
      }
    }

    //for tests
    getDirection(){
        return this.direction;
    }

    //for tests
    getPositionX(){
        return this.posX;
    }

    //for tests
    getPositionY(){
        return this.posY;
    }
  
    getRobotData() {
      return [{newX:this.posX,newY:this.posY,newD:this.direction}]
    }
  
  };

  module.exports = Robot;