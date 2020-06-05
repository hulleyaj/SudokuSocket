import React from 'react';
import { MobXProviderContext, observer } from 'mobx-react';
import Board from '../../components/Board';
import JoinBoard from '../../components/JoinBoard';

const Home = observer(() => {
  const { boardStore } = React.useContext(MobXProviderContext);
  const { currentGroup } = boardStore;

  return currentGroup
    ? <Board boardStore={ boardStore } />
    : <JoinBoard />;
});

export default Home;
