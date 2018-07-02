import React from 'react';
import '../App.css'

const Board = props => {
    let rows = props.board.map(row => {
        return row;
    })

    return (
        <div className="board-container">
            {rows.map((row) => {
                return row.map(tile => {
                    if (tile.piece) {
                        return (<div
                            className={`tile + ${tile.color === 'black' ? 'black' : 'white'} `}
                            key={tile.index}
                            
                        >
                        <img src={tile.piece.img} alt=""/>
                        </div>)

                            }
                    return (<div
                                className={`tile + ${tile.color === 'black' ? 'black' : 'white'} `}
                                key={tile.index}
                            >
                            </div>)
                            })
                        })}
        </div>
    );

            }

export default Board;