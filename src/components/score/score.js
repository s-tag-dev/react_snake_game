import React , {Component} from "react";
import Styles from "./score.css";

class Score extends Component {
    render = () => {
        return (
            <div className={Styles.score_container}>
                <p>Your Score Is : {this.props.score}</p>
            </div>
        )
    }
}

export default Score;