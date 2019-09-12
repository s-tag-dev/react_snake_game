import React from 'react';
import Styles from "./App.css"
import SnakeGameTitle from './components/snake_game_title/snake_game_title'
import Score from './components/score/score'
import SnakeContainer from "./components/snake_container/snake_container"
import Navigator from "./components/navigator/navigator"

class App extends React.Component{
  canMove = false;
  levelUp = false;
  canHitBtn = true;
  state = {
    score : 0,
    dir : 0,
    cells : this.fillCells(),
    snake_poses : [],
    gameIsOver : false
  }

  fillCells (){
    let newCells = new Array(18);
    for (let i = 0; i < newCells.length; i++) {
      newCells[i] = new Array(11)
    }
    return newCells;
  }

  setSeed = () => {
    let x = Math.floor(Math.random() * 18) + 0;
    let y = Math.floor(Math.random() * 11) + 0;
    
    if(this.state.cells[x][y]){
      this.setSeed();
      return;
    }
    let cells = [...this.state.cells];
    cells[x][y] = {type : "seed" , x : x , y : y };
    this.setState({cells : cells})
  }

  setSnake = () => {
    let x = Math.floor(Math.random() * 18) + 0;
    let y = Math.floor(Math.random() * 11) + 0;

    if(this.state.cells[x][y]){
      this.setSnake();
    }
    let cells = [...this.state.cells];
    cells[x][y] = {type : "snake" , x : x , y : y };
    let snake_poses = [...this.state.snake_poses];
    snake_poses.push({x : x , y : y});
    this.setState({cells : cells , snake_poses : snake_poses})
  }

  moveSnake = () => {
      let snake_poses = [...this.state.snake_poses]
      let last_pos = {...snake_poses[snake_poses.length-1]};      
      let changedCell = [...this.state.cells];

      let snake_head = {...snake_poses[0]};
     
      
      let new_pos = snake_head;
      switch (this.state.dir) {
        case 0: // left
          new_pos.x = snake_head.x - 1;
          new_pos.x = new_pos.x < 0 ? new_pos.x + 18 : new_pos.x
          break;
        case 1: // top
          new_pos.y = snake_head.y - 1;
          new_pos.y = new_pos.y < 0 ? new_pos.y + 11 : new_pos.y
          
          break;
        case 2: // right
          new_pos.x = snake_head.x + 1;
          new_pos.x = new_pos.x > 17 ? 0 : new_pos.x          
          break;
        case 3: // down
          new_pos.y = snake_head.y + 1;
          new_pos.y = new_pos.y > 10 ? 0 : new_pos.y          
          break;
      }

      snake_poses.unshift(new_pos);
      // console.log("new Pos " , new_pos);

      if(changedCell[new_pos.x][new_pos.y]){
        if(changedCell[new_pos.x][new_pos.y].type === "snake" ){
          // Game Over
          console.log("Game Over");   
          this.setState({gameIsOver : true});
          return;
        }else{
          // Level Up
          changedCell[new_pos.x][new_pos.y] = {type:"snake" , x : new_pos.x , y : new_pos.y};               
          this.levelUp = true;
        }
      }else{
        changedCell[new_pos.x][new_pos.y] = {type:"snake" , x : new_pos.x , y : new_pos.y};
      }

       
      if(this.levelUp){
        this.levelUp = false;
        // snake_poses.push({x : last_pos.x , y : last_pos.y});        
        changedCell[last_pos.x][last_pos.y] = {type:"snake" , x : last_pos.x , y : last_pos.y};             
        this.setSeed();
        // console.log("Leveling up !!!");
      }else{
        delete changedCell[last_pos.x][last_pos.y]
        snake_poses.splice(snake_poses.length-1,1);
      }
      
      

      this.canMove = true;
      this.setState({snake_poses : snake_poses , cells : changedCell , score : snake_poses.length - 1 });
  }

  setDirByKey = (e) => {    
    if(!this.canHitBtn){
      return;
    }
    this.canHitBtn = false;
    switch (e.keyCode) {
      case 37:
        this.setDir(0)
        break;
      case 38:
        this.setDir(1)
        break;
      case 39:
        this.setDir(2)
        break;
      case 40:
        this.setDir(3)
        break;
    }
  }

  setDir = (dir) => {
    if(this.state.dir === 0 && dir === 2){
      return;
    }
    if(this.state.dir === 1 && dir === 3){
      return;
    }
    if(this.state.dir === 2 && dir === 0){
      return;
    }
    if(this.state.dir === 3 && dir === 1){
      return;
    }
    this.setState({dir : dir});
  }


  componentDidMount(){
      this.setSeed ()
      this.setSnake()
      this.canMove = true;
      document.addEventListener("keydown" , this.setDirByKey)
  }

  componentDidUpdate(){    
    if(this.canMove){
      this.canMove = false;
      if(!this.state.gameIsOver){
        setTimeout(()=>{
          this.moveSnake();
          this.canHitBtn = true;
        },800)
      }
    }
  }

  render = () => {    
   
    return (
      <div className={Styles.container}>
        <SnakeGameTitle/>
        <Score score={this.state.score} />
        <SnakeContainer cells={this.state.cells} gameIsOver={this.state.gameIsOver} />
        <Navigator dir={this.state.dir} click={this.setDir} />
      </div>
    )
  }
}

export default App;
