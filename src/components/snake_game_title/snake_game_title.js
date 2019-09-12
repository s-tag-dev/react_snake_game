import React , {Component} from 'react';
import Styles from "./snake_game_title.css"

class SnakeGameTitle extends Component{
    render = () => {
        return (
            <div className={Styles.title_container}>
                <p>Snake Game</p>
            </div>
        )
    }
}

export default SnakeGameTitle;