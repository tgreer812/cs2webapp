import React, { useState } from 'react';

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

  const handleSubmit = (event) => {
    event.preventDefault();
    alert('Spinning up server');
    // Call the Azure function here
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Pick a map:
          <select name="maps">
            <option value="de_dust2">Dust II</option>
            <option value="de_inferno">Inferno</option>
            <option value="de_mirage">Mirage</option>
            <option value="de_nuke">Nuke</option>
            <option value="de_train">Train</option>
            <option value="de_overpass">Overpass</option>
            <option value="de_vertigo">Vertigo</option>
            <option value="cs_office">Office</option>
            
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>

      <table>
        <thead>
          <tr>
            <th>Map Name</th>
            <th>Connection String</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {servers.filter(server => Date.now() - server.timestamp < 2 * 60 * 60 * 1000).map((server, index) => (
            <tr key={index}>
              <td>{server.mapName}</td>
              <td>{server.connectionString}</td>
              <td>{server.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;