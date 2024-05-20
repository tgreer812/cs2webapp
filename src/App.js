import React, { useState } from 'react';
import ServerCreator from './ServerCreator';
import ServerDisplay from './ServerDisplay';

const App = () => {
  const [servers, setServers] = useState([]);

  return (
    <div>
      <ServerCreator setServers={setServers} servers={servers} />
      <ServerDisplay servers={servers} />
    </div>
  );
};

export default App;
