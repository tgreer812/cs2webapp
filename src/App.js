import React, { useState } from 'react';
import ServerCreator from './ServerCreator';
import ServerDisplay from './ServerDisplay';

const App = () => {
  const [servers, setServers] = useState([
    {
      mapName: 'Dust II',
      connectionString: 'connect domain:port',
      status: 'running',
      timestamp: Date.now()
    },
    // Add more hardcoded servers here
  ]);

  return (
    <div>
      <ServerCreator setServers={setServers} servers={servers} />
      <ServerDisplay servers={servers} />
    </div>
  );
};

export default App;
