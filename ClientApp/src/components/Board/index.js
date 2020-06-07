import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import InputSquare from './InputSquare';


const Board = observer(({ boardStore }) => {
  const { board, setNumber } = boardStore;

  return <div className="h-331 w-331 md:h-596 md:w-596 grid grid-cols-3 border-2 md:border-4 border-black rounded shadow mx-auto">
    {
      board.map((square, outerIndex) => {
        const background = outerIndex % 2 === 0 ? 'bg-teal-100' : 'bg-indigo-100';

        return <div className={ `grid grid-cols-3 border-2 ${background}` } key={ outerIndex }>
          {
            square.map((val, innerIndex) => {
              // const background = index2 % 2 === 0 ? 'bg-green-200' : 'bg-gray-400';

              return <div className="flex border h-10 w-10 md:h-16 md:w-16" key={ innerIndex }>
                <InputSquare
                  innerIndex={ innerIndex }
                  outerIndex={ outerIndex }
                  setNumber={ setNumber }
                  val={ val }
                />
              </div>;
            })
          }
        </div>;
      })
    }
  </div>;
});

Board.propTypes = {
  boardStore: PropTypes.shape({
    board: PropTypes.arrayOf(PropTypes.array),
    setNumber: PropTypes.func
  })
};

export default Board;
