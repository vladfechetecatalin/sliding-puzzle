import React, { Component } from 'react';
import './tiles.scss';
import Tile from '../tile/Tile';
import { ROWS, COLUMNS, TILE_SIZE } from '../../helpers/constants';

class Tiles extends Component {
    constructor(props) {
        super(props);

        this.clickHandler = this.clickHandler.bind(this);
    }

    clickHandler(index) {
        this.props.onTileClickedHandler(index);
    }

    getTileBackgroundPosition(position) {
        // The image is loaded only once, as a sprite
        // so the background of each tile has to be calculated
        // by the initial position of the tile in the grid.
        const row = Math.floor(position / ROWS);
        const top = row * -TILE_SIZE;
        const col = position - row * COLUMNS;
        const left = col * -TILE_SIZE;

        return {top: `${top}px`, left: `${left}px`};
    }

    getTileCSSPosition(index) {
        // On every reload, or whene two tiles are swapped.
        // the position of tiles has to be calculated.
        const row = Math.floor(index / ROWS);
        const top = row * TILE_SIZE;
        const col = index - row * COLUMNS;
        const left = col * TILE_SIZE;
        
        return {top: `${top}px`, left: `${left}px`};
    }

    render() {
        const {tiles} = this.props;

        return (
            <div className="tiles">
                { tiles.map((position, index) => {
                    return <Tile onClick={this.clickHandler}
                                key={index}
                                position={position}
                                index={index}
                                cssPosition={{ ...this.getTileCSSPosition(index) }}
                                backgroundPosition={{ ...this.getTileBackgroundPosition(position) }}
                            />
                }) }
            </div>
        );
    }
}
export default Tiles;
