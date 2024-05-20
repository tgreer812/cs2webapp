import React from 'react';

const ServerDisplay = ({ servers }) => {
  return (
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
  );
};

export default ServerDisplay;
