import React, { useState } from 'react';
import { MobXProviderContext } from 'mobx-react';
import {
  Button,
  Input
} from 'reactstrap';

const JoinBoard = () => {
  const { boardStore } = React.useContext(MobXProviderContext);
  const { createBoard, joinBoard } = boardStore;

  const [text, setText] = useState('');

  return <div>
    <Button onClick={ createBoard }>Create Board</Button>
    <p>or</p>
    <div>
      <Input onChange={ e => setText(e.target.value) } />
      <Button onClick={ () => joinBoard(text) }>Join Board</Button>
    </div>
  </div>;
};

export default JoinBoard;
