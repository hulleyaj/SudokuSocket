import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { isEqual } from 'lodash';
import InputSquare from './InputSquare';
import MobileDigits from './MobileDigits';

const Board = observer(({ boardStore }) => {
  const {
    board,
    focusedSquare,
    setFocusedSquare,
    setNumber
  } = boardStore;

  return <div>
    <div className="h-331 w-331 md:h-596 md:w-596 grid grid-cols-3 border-2 md:border-4 border-black rounded shadow mx-auto">
      {
        board.map((outerSquare, outerIndex) => {
          const background = outerIndex % 2 === 0 ? 'bg-teal-100' : 'bg-indigo-100';

          return <div className={ `grid grid-cols-3 border-2 ${background}` } key={ outerIndex }>
            {
              outerSquare.map((innerSquare, innerIndex) => (
                <div className="flex border h-10 w-10 md:h-16 md:w-16" key={ innerIndex }>
                  <InputSquare
                    focused={ isEqual(focusedSquare, { outerIndex, innerIndex }) }
                    setFocus={ () => setFocusedSquare(outerIndex, innerIndex) }
                    setNumber={ setNumber }
                    square={ innerSquare }
                  />
                </div>
              ))
            }
          </div>;
        })
      }
    </div>
    <MobileDigits disabled={ false } setNumber={ setNumber } />
  </div>;
});

Board.propTypes = {
  boardStore: PropTypes.shape({
    board: PropTypes.arrayOf(PropTypes.array),
    setNumber: PropTypes.func
  })
};

export default Board;
