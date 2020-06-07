import React, { useState } from 'react';
import PropTypes from 'prop-types';

const onKeyPress = ({
  key,
  innerIndex,
  outerIndex,
  setNumber
}) => {
  setNumber(key, outerIndex, innerIndex);
};

const InputSquare = ({
  val,
  ...props
}) => {
  const [focused, setFocus] = useState(false);

  return <div
    className={ `w-full h-full caret-transparent text-center text-3xl md:text-5xl ${focused && 'border-2 border-red-500'}` }
    role="textbox"
    tabIndex="0"
    onFocus={ () => setFocus(true) }
    onBlur={ () => setFocus(false) }
    onKeyPress={ e => onKeyPress({ ...e, ...props }) }
  >
    { val || '' }
  </div>;
};

InputSquare.propTypes = {
  innerIndex: PropTypes.number,
  outerIndex: PropTypes.number,
  setNumber: PropTypes.func,
  val: PropTypes.number
};

export default InputSquare;
