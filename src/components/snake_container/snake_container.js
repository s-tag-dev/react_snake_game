import React , {Component} from "react";
import Styles from "./snake_container.css";

class SnakeContainer extends Component {
    state = {
        cells : this.props.cells
    }
    
    render = () => {
        return (
            <div className={Styles.snake_container}>
                {this.state.cells.map(row => {                                        
                    let tempRow = [...row];
                    return tempRow.map(col => {
                        if(col){
                            return (
                            <div key={col.type+"_"+col.x+"_"+col.y} className={[Styles.cell , Styles[col.type]].join(" ")} style={{left : col.x * 32 , top : col.y * 32}} ></div>
                            )
                        }
                    });
                })}
                {this.props.gameIsOver ? <div className={Styles.gameOver}><p>Game Over!!!</p></div> : null}
            </div>
        )
    }
}

export default SnakeContainer;