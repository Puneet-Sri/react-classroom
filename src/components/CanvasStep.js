import React, { Component } from 'react';
import Tesseract from 'tesseract.js';


class CanvasStep extends Component {
    constructor(props) {
        super(props);
        this.state  = {
            literalValue: this.props.literalValue,
            child_id : this.props.keyStr
        }
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.endPaintEvent = this.endPaintEvent.bind(this);
        this.captureInput = this.captureInput.bind(this);
    }

    isPainting = false;
    stepHasEnded = false;
    userStrokeStyle = '#EE92C2';
    line = [];
    prevPos = { offsetX: 0, offsetY: 0 };

    onMouseDown({ nativeEvent }) {
        const { offsetX, offsetY } = nativeEvent;
        this.isPainting = true;
        this.prevPos = { offsetX, offsetY };
    }

    onMouseMove({ nativeEvent }) {
        if (this.isPainting) {
            const { offsetX, offsetY } = nativeEvent;
            const offSetData = { offsetX, offsetY };
            // Set the start and stop position of the paint event.
            const positionData = {
                start: { ...this.prevPos },
                stop: { ...offSetData },
            };
            // Add the position to the line array
            this.line = this.line.concat(positionData);
            this.paint(this.prevPos, offSetData, this.userStrokeStyle);
        }
    }


    endPaintEvent() {
        if (this.isPainting) {
            this.isPainting = false;
            this.stepHasEnded = true;
        }
    }


    captureInput() {
        if(this.stepHasEnded) {
            var dataURL = this.canvas.toDataURL("png")
            Tesseract.recognize(dataURL, 'eng', {})
                .then(({data: {text}}) => {
                        this.setState({
                            literalValue: text
                        })
                        console.log(this.state.literalValue)
                        this.props.updateCanvasValue(this.state.child_id, this.state.literalValue)
                    }
                )
        }
    }


    paint(prevPos, currPos, strokeStyle) {
        const { offsetX, offsetY } = currPos;
        const { offsetX: x, offsetY: y } = prevPos;


        this.ctx.beginPath();
        this.ctx.strokeStyle = strokeStyle;
        // Move the the prevPosition of the mouse
        this.ctx.moveTo(x, y);
        // Draw a line to the current position of the mouse
        this.ctx.lineTo(offsetX, offsetY);
        // Visualize the line using the strokeStyle
        this.ctx.stroke();
        this.prevPos = { offsetX, offsetY };
    }

    componentDidMount() {
        // Here we set up the properties of the canvas element.
        this.canvas.width = 40;
        this.canvas.height = 40;
        this.ctx = this.canvas.getContext('2d');
        this.ctx.lineJoin = 'round';
        this.ctx.lineCap = 'round';
        this.ctx.lineWidth = 2;
    }

    render() {
        return (
            <td>
                <canvas
                    // We use the ref attribute to get direct access to the canvas element.
                    ref={(ref) => (this.canvas = ref)}
                    style={{ background: 'gray' }}
                    onMouseDown={this.onMouseDown}
                    onMouseUp={this.endPaintEvent}
                    onMouseOut={this.captureInput}
                    onMouseMove={this.onMouseMove}
                /></td>
        );
    }
}

export default CanvasStep;
