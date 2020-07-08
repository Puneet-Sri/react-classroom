import React from 'react';
import {Link} from "react-router-dom";


class Problem extends React.Component {

    constructor() {
        super();
        this.state ={
            problem: '1/2 + 1/3'
        }
    }

    render(){
        return (
            <h2>Solve
                <p>{this.state.problem}</p>
                <nav>
                    <Link to={{pathname: "/workarea", state:{ problemStmt: this.state.problem }}}>Click To Solve</Link>
                </nav>
            </h2>

        )
    }

}

export default Problem;
