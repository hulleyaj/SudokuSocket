import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

const className = (focused, locked) =>
  `flex justify-center items-center 
  w-full h-full 
  caret-transparent cursor-default
  text-3xl md:text-5xl 
  ${focused && 'border-2 border-red-500 bg-opacity-25'} 
  ${locked && 'bg-orange-200 bg-opacity-50'}`;

const InputSquare = observer(({
  square,
  focused,
  setFocus,
  setNumber
}) => {
  const { val, locked } = square;

  return <div
    className={ className(focused, locked) }
    role="textbox"
    tabIndex="0"
    onFocus={ () => !locked && setFocus() }
    onKeyPress={ ({ key }) => !locked && setNumber(key) }
  >
    { val || '' }
  </div>;
});

InputSquare.propTypes = {
  innerIndex: PropTypes.number,
  outerIndex: PropTypes.number,
  setNumber: PropTypes.func,
  val: PropTypes.number
};

export default InputSquare;
