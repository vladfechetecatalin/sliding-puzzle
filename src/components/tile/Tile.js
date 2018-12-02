import React, { Component } from 'react';
import './tile.scss';

class Tile extends Component {
    constructor(props) {
        super(props);

        this.props = props;
        this.style = {};

        this.clickHandler = this.clickHandler.bind(this);
    }

    componentWillMount() {
        this.setBackgroundPosition();
        this.setCSSPosition();
    }

    setBackgroundPosition() {
        // setting the background position all the tiles
        // except the blank one
        const {top} = this.props.backgroundPosition;
        const {left} = this.props.backgroundPosition;
        isNaN(this.props.position) ? this.style.background = 'none' : this.style.background = '';
        this.style.backgroundPosition = `${left} ${top}`;
    }

    setCSSPosition() {
        const {top} = this.props.cssPosition;
        const {left} = this.props.cssPosition;

        this.style.top = top;
        this.style.left = left;
    }

    clickHandler() {
        this.props.onClick(this.props.index);
    }

    render() {
        this.setBackgroundPosition();
        this.setCSSPosition();
        
        return (
            <div onClick={this.clickHandler}
                className="tile"
                style={{...this.style}}>
            </div>
        );
    }
}
export default Tile;
    