import React , {Component} from "react";
import Styles from "./navigator.css";


class Navigator extends Component {
    render = () => {
        return (
            <div className={Styles.nav}>
                <div className={[Styles.arrow , Styles.left , this.props.dir=== 0 ? Styles.active : null].join(" ")} onClick={(event) => this.props.click(0)}>
                </div>
                <div className={[Styles.arrow , Styles.up, this.props.dir=== 1 ? Styles.active : null].join(" ")} onClick={(event) => this.props.click(1)}>
                </div>
                <div className={[Styles.arrow , Styles.right, this.props.dir=== 2 ? Styles.active : null].join(" ")} onClick={(event) => this.props.click(2)}>
                </div>
                <div className={[Styles.arrow , Styles.down, this.props.dir=== 3 ? Styles.active : null].join(" ")} onClick={(event) => this.props.click(3)}>
                </div>
            </div>
        )
    }
}

export default Navigator;