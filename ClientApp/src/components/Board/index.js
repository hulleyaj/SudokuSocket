import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

const Board = ({ boardStore }) => {
  const { board } = boardStore;

  return <div className="board grid grid-cols-3 border-2 md:border-4 border-black mx-auto">
    {
      board.map((square, index) => (
        <div className="grid grid-cols-3" key={ index }>
          {
            square.map((vals, index2) => (
              <div className="border border-gray-500" key={ index2 }>{ vals || 0 }</div>
            ))
          }
        </div>
      ))
    }
  </div>;
};

Board.propTypes = {
  boardStore: PropTypes.shape({
    board: PropTypes.arrayOf(PropTypes.array)
  })
};

export default Board;
