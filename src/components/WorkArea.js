import React from 'react';
import {Link} from "react-router-dom";
import Step from "./Step";




class WorkArea extends React.Component {
    constructor(props) {
        super(props);
        let jSonstepsFromDB = JSON.parse(
            "{ " +
                    "\"problem_id\": \"12345678\", " +
                    " \"Steps\": " +
                    "[ " +
                        "{ " +
                            "\"step_id\": \"s123456783\", " +
                            "\"numerator\": " +
                            "{ " +
                                "\"numerator_id\": \"n123456783\", " +
                                "\"symbols\": \"3\", " +
                                "\"stepValues\": \"2:+:3\" " +
                            "}, " +
                            "\"denominator\": " +
                            "{" +
                                "\"denominator_id\": \"d123456783\", " +
                                "\"symbols\": \"3\", " +
                                "\"stepValues\": \"2:X:3\" " +
                            "} " +
                        "} " +
                    "] " +
            "}");
       this.state = {
           steps: jSonstepsFromDB.Steps,

       }
        this.calculateSteps = this.calculateSteps.bind(this);
    }


    calculateSteps(){
        let stepTemp = ''
        for(stepTemp in this.state.steps ){
            console.log(":::::::::::::" + this.state.steps[stepTemp].step_id)
            console.log(":::::::::::::" + this.state.steps[stepTemp].numerator.numerator_id)
        }
    }

    render(){
        return (
            <h2>Solving
                {this.state.steps.map( step => (
                    <Step key={'step' + step.step_id} step={step} numeratorValue={step.numerator.stepValues}
                          denominatorValue={step.denominator.stepValues}/>
                ))}
                <nav>
                    <Link to="/solution" onClick={this.calculateSteps}>Check Solution</Link>
                </nav>
            </h2>

        )
    }

}

export default WorkArea;
