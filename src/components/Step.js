import React from 'react';
import CanvasStep from "./CanvasStep";

class Step extends React.Component {

    constructor(props) {
        super(props);
        this.state  = {
            step: this.props.step,
            numerator: this.props.step.numerator,
            numeratorValue: this.props.step.numerator.stepValue,
            numeratorEnteredValue: '',
            denominator: this.props.step.denominator,
            denominatorValue: this.props.step.denominator.denominatorValue,
            denominatorEnteredValue: '',
            children: [],


        }

        this.updateCanvasValue = this.updateCanvasValue.bind(this)
    }

    updateCanvasValue(child_id, childValue){
        console.log(child_id, "= " + childValue)
        this.state.childrenValues[child_id] =  childValue
    }


    createStep(numberOfSteps, ndstep_id) {
        let children = []
        for(let i = 0; i < numberOfSteps; i++){
            children.push(<CanvasStep key={ndstep_id + i}
            keyStr={ndstep_id + i} literalValue={''} updateCanvasValue={this.updateCanvasValue}/>)
        }
        return children
    }

    render() {
        return (
            <div>
                <table key={"tableKeee"}>
                    <tbody key={"tableKeeeBody"}>
                        <tr>
                            {this.createStep(this.state.numerator.symbols, this.state.numerator.numerator_id)}
                        </tr>
                        <tr>
                            {this.createStep(this.state.denominator.symbols, this.state.denominator.denominator_id)}
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }

}

export default Step;
