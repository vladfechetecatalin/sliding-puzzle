import React, { Component } from 'react';
import './game.scss';
import '../../helpers/array';
import { isOdd, isEven } from '../../helpers/numbers';
import { ROWS, COLUMNS } from '../../helpers/constants';
import Tiles from '../tiles/Tiles';

class Game extends Component {
    constructor() {
        super();

        this.tiles = [
            0, 1, 2, 3,
            4, 5, 6, 7,
            8, 9, 10, 11,
            12, 13, 14, 'empty'
        ];

        this.state = {
            tiles: this.getSolvableArray(),
            solved: false,
            moves: 0
        };

        this.solve = this.solve.bind(this);
        this.restart = this.restart.bind(this);
        this.onTileClickedHandler = this.onTileClickedHandler.bind(this);
    }

    getSolvableArray() {
        // If the grid width is even(4), and the blank is on an even row counting from the bottom,
        // then the number of inversions in a solvable situation is odd.
        
        // If the grid width is even(4), and the blank is on an odd row counting from the bottom,
        // then the number of inversions in a solvable situation is even
        const arr = this.tiles.slice().shuffle();
        let inversions = 0;
        
        arr.forEach(elem => {
            for (let i = 0; i < arr.indexOf(elem); i++) {
                if (arr[i] < elem) {
                    inversions++;
                }
            }
        });

        const rowOfEmptyTile = this.getElemPosition(arr.indexOf('empty'), true).row;

        if (isEven(rowOfEmptyTile) && isEven(inversions) || isOdd(rowOfEmptyTile) && isOdd(inversions)) {
            this.getSolvableArray();
        }

        return arr;
    }

    isNeighbour(index) {
        // The tiles should only be swapped if they are neighbours,
        // {row, col} has {row, col-1}, {row, col+1}, {row-1, col} and {row+1, col} as neighbours
        const clickedElement = this.getElemPosition(index);
        const emptyElement = this.getElemPosition();
        let isNeighbour = false;

        if (clickedElement.row === emptyElement.row) {
            isNeighbour = !!(Math.abs(clickedElement.col - emptyElement.col) === 1);
        } else if (clickedElement.col === emptyElement.col) {
            isNeighbour = !!(Math.abs(clickedElement.row - emptyElement.row) === 1);
        }

        return isNeighbour;
    }

    getElemPosition(index = this.state.tiles.indexOf('empty'), fromBottom = false) {
        // determining position (row - col) of an index in an mxm array
        // reading from bottom is needed to insure that the puzzle is solvable
        const row = fromBottom ? Math.floor((ROWS*COLUMNS - index) / ROWS) : Math.floor(index / ROWS);
        const col = index - Math.floor(index / ROWS) * COLUMNS;

        return {row, col};
    }

    onTileClickedHandler(index) {
        if (this.isNeighbour(index) && !this.isSolved()) {
            this.swap(index);
        }
    }

    swap(index) {
        // if the clicked tile is a neighbour of the empty tile
        // we proceed to swap them, then verify if the puzzle is solved.
        let {tiles} = this.state;
        tiles[tiles.indexOf('empty')] = tiles[index];
        tiles[index] = 'empty';

        this.setState({
            tiles: tiles
        });

        this.updateMoves();
        this.isSolved();
    }

    updateMoves() {
        this.setState({
            moves: this.state.moves + 1
        });
    }

    isSolved() {
        this.setState({
            solved: this.state.tiles === this.tiles
        });

        return this.state.tiles === this.tiles;
    }

    solve() {
        // not really implement a solver
        this.setState({
            tiles: this.tiles,
            solved: true
        });
    }

    restart() {
        this.setState({
            tiles: this.getSolvableArray(),
            solved: false,
            moves: 0
        });
    }

    render() {
        return (
            <div className="game">
                <p>Sliding puzzle game demo</p>

                <div className={this.state.solved ? 'tiles-wrapper solved' : 'tiles-wrapper'}>
                    <Tiles onTileClickedHandler={this.onTileClickedHandler} tiles={this.state.tiles}/>
                </div>

                <div className="stats">
                    Moves: {this.state.moves}
                </div>

                <div className="actions">
                    <button onClick={this.solve} className={this.state.solved ? 'solve solved' : 'solve'}>Solve</button>
                    <button onClick={this.restart} className="button restart">{this.state.solved ? 'Restart' : 'Shuffle'}</button>
                </div>
            </div>
        );
    }
}

export default Game;
