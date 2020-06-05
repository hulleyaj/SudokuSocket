import React, { useEffect } from 'react';
import { MobXProviderContext, observer } from 'mobx-react';
import { Button, Spinner } from 'reactstrap';

const ServerTest = observer(() => {
  const { serverTestStore } = React.useContext(MobXProviderContext);
  const {
    loading,
    pingServer,
    reset,
    status
  } = serverTestStore;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => reset, []);

  return <React.Fragment>
    <p>{ `Server status: ${status} ` }</p>
    <Button onClick={ pingServer }>
      { loading && <Spinner type="grow" color="light" size="sm" className="mr-1" /> }
      Ping Server
    </Button>
  </React.Fragment>;
});

export default ServerTest;
