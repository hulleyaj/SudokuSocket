import React from 'react';
import { Button } from 'reactstrap';

const vals = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const MobileDigits = ({ disabled, setNumber }) =>
  <div className="md:hidden flex justify-center mt-4">
    {
      vals.map(val => {
        return <Button className="mx-1" disabled={ disabled } color="info" onClick={ () => setNumber(val) }>
          { val }
        </Button>;
      })
    }
  </div>;

export default MobileDigits;
