import React, { useState } from 'react';
import './ServerCreator.css';
import { Tooltip } from 'react-tooltip';
import { FaQuestionCircle, FaEye, FaEyeSlash } from 'react-icons/fa';

const ServerCreator = ({ setServers, servers }) => {
  const [formData, setFormData] = useState({
    CS2_STARTMAP: 'de_dust2',
    SRCDS_TOKEN: '',
    CS2_CHEATS: '0',
    CS2_PORT: '27015',
    CS2_RCON_PORT: '27050',
    CS2_MAXPLAYERS: '10',
    STEAMAPPVALIDATE: '0',
    CS2_SERVER_HIBERNATE: '1',
    CS2_LAN: '0',
    CS2_RCONPW: 'changeme',
    CS2_PW: '',
    CS2_GAMETYPE: '0',
    CS2_GAMEMODE: '1',
    CS2_MAPGROUP: 'mg_active',
    CS2_BOT_DIFFICULTY: '0',
    CS2_BOT_QUOTA: '0',
    CS2_BOT_QUOTA_MODE: 'fill',
    TV_AUTORECORD: '0',
    TV_ENABLE: '0',
    TV_PORT: '27020',
    TV_PW: 'changeme',
    TV_RELAY_PW: 'changeme',
    TV_MAXRATE: '0',
    TV_DELAY: '0',
    CS2_LOG: 'on',
    CS2_LOG_MONEY: '0',
    CS2_LOG_DETAIL: '0',
    CS2_LOG_ITEMS: '0'
  });

  const azureEndpoint = "https://tg-cs2-server-create-afn.azurewebsites.net/api/CreateCS2Server";

  const [showAdvanced, setShowAdvanced] = useState(false);
  const [notification, setNotification] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'CS2_GAMETYPE') {
      const [gameType, gameMode] = value.split(',');
      setFormData({ ...formData, CS2_GAMETYPE: gameType, CS2_GAMEMODE: gameMode });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setNotification('Spinning up server...');

    const response = await fetch(azureEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const result = await response.json();
      const newConnectionString = formData.CS2_PW 
        ? `connect ${result.IP}:${result.Ports.GamePort}; password ${formData.CS2_PW}` 
        : `connect ${result.IP}:${result.Ports.GamePort}`;

      setServers([...servers, {
        mapName: formData.CS2_STARTMAP,
        connectionString: newConnectionString,
        status: 'running',
        timestamp: Date.now()
      }]);
      setNotification('Server created successfully');
    } else {
      setNotification('Failed to create server');
    }
  };

  const toggleAdvanced = () => {
    setShowAdvanced(!showAdvanced);
  };

  const closeNotification = () => {
    setNotification(null);
  };

  return (
    <div className="server-creator">
      <form onSubmit={handleSubmit}>
        <h2>Server Creator</h2>

        <div className="form-section">
          <h3>Required Settings</h3>
          <label>
            Pick a map:
            <select name="CS2_STARTMAP" value={formData.CS2_STARTMAP} onChange={handleChange}>
              <option value="de_dust2">Dust II</option>
              <option value="de_inferno">Inferno</option>
              <option value="de_mirage">Mirage</option>
              <option value="de_nuke">Nuke</option>
              <option value="de_overpass">Overpass</option>
              <option value="de_vertigo">Vertigo</option>
              <option value="cs_office">Office</option>
              <option value="de_anubis">Anubis</option>
              <option value="de_ancient">Ancient</option>
            </select>
            <FaQuestionCircle data-tip="Select the map for the server." />
          </label>

          <label>
            Server Password:
            <input type="text" name="CS2_PW" value={formData.CS2_PW} onChange={handleChange} />
            <FaQuestionCircle data-tip="Password for the server." />
          </label>

          <label>
            Max Players:
            <input type="text" name="CS2_MAXPLAYERS" value={formData.CS2_MAXPLAYERS} onChange={handleChange} />
            <FaQuestionCircle data-tip="Maximum number of players allowed on the server." />
          </label>

          <label>
            Game Type:
            <select name="CS2_GAMETYPE" value={formData.CS2_GAMETYPE + "," + formData.CS2_GAMEMODE} onChange={handleChange}>
              <option value="0,1">Competitive</option>
              <option value="0,2">Wingman</option>
              <option value="0,0">Casual</option>
              <option value="1,2">Deathmatch</option>
              <option value="3,0">Custom</option>
            </select>
            <FaQuestionCircle data-tip="Type of game mode." />
          </label>
        </div>

        <div className="toggle-advanced" onClick={toggleAdvanced}>
          {showAdvanced ? 'Hide Advanced Settings' : 'Show Advanced Settings'}
          {showAdvanced ? <FaEyeSlash /> : <FaEye />}
        </div>

        {showAdvanced && (
          <div className="form-section">
            <h3>Advanced Settings</h3>

            <label>
              SRCDS Token:
              <input type="text" name="SRCDS_TOKEN" value={formData.SRCDS_TOKEN} onChange={handleChange} />
              <FaQuestionCircle data-tip="Game Server Token from https://steamcommunity.com/dev/managegameservers" />
            </label>

            <label>
              Steam App Validate:
              <select name="STEAMAPPVALIDATE" value={formData.STEAMAPPVALIDATE} onChange={handleChange}>
                <option value="0">No Validation</option>
                <option value="1">Enable Validation</option>
              </select>
              <FaQuestionCircle data-tip="Whether to enable app validation (0 - no validation, 1 - enable validation)." />
            </label>

            <label>
              Cheats:
              <select name="CS2_CHEATS" value={formData.CS2_CHEATS} onChange={handleChange}>
                <option value="0">Disable</option>
                <option value="1">Enable</option>
              </select>
              <FaQuestionCircle data-tip="Enable or disable cheats (0 - disable, 1 - enable)." />
            </label>

            <label>
              Server Hibernate:
              <select name="CS2_SERVER_HIBERNATE" value={formData.CS2_SERVER_HIBERNATE} onChange={handleChange}>
                <option value="0">Disabled</option>
                <option value="1">Enabled</option>
              </select>
              <FaQuestionCircle data-tip="Put server in a low CPU state when there are no players (0 - hibernation disabled, 1 - hibernation enabled)." />
            </label>

            <label>
              LAN Mode:
              <select name="CS2_LAN" value={formData.CS2_LAN} onChange={handleChange}>
                <option value="0">Disabled</option>
                <option value="1">Enabled</option>
              </select>
              <FaQuestionCircle data-tip="Enable or disable LAN mode (0 - disabled, 1 - enabled)." />
            </label>

            <label>
              RCON Password:
              <input type="text" name="CS2_RCONPW" value={formData.CS2_RCONPW} onChange={handleChange} />
              <FaQuestionCircle data-tip="Password for remote console access." />
            </label>

            <label>
              Bot Difficulty:
              <select name="CS2_BOT_DIFFICULTY" value={formData.CS2_BOT_DIFFICULTY} onChange={handleChange}>
                <option value="0">Easy</option>
                <option value="1">Normal</option>
                <option value="2">Hard</option>
                <option value="3">Expert</option>
              </select>
              <FaQuestionCircle data-tip="Difficulty level of the bots (0 - easy, 1 - normal, 2 - hard, 3 - expert)." />
            </label>

            <label>
              Bot Quota:
              <input type="text" name="CS2_BOT_QUOTA" value={formData.CS2_BOT_QUOTA} onChange={handleChange} />
              <FaQuestionCircle data-tip="Number of bots to add." />
            </label>

            <label>
              Bot Quota Mode:
              <select name="CS2_BOT_QUOTA_MODE" value={formData.CS2_BOT_QUOTA_MODE} onChange={handleChange}>
                <option value="fill">Fill</option>
                <option value="competitive">Competitive</option>
              </select>
              <FaQuestionCircle data-tip="Determines how bots are filled in the server. 'Fill' will fill up the server with bots to reach the max player count. 'Competitive' follows competitive rules and fills up to the max player count." />
            </label>

            <label>
              TV Auto Record:
              <select name="TV_AUTORECORD" value={formData.TV_AUTORECORD} onChange={handleChange}>
                <option value="0">Off</option>
                <option value="1">On</option>
              </select>
              <FaQuestionCircle data-tip="Automatically records all games as CSTV demos (0 - off, 1 - on)." />
            </label>

            <label>
              TV Enable:
              <select name="TV_ENABLE" value={formData.TV_ENABLE} onChange={handleChange}>
                <option value="0">Off</option>
                <option value="1">On</option>
              </select>
              <FaQuestionCircle data-tip="Activates CSTV on server (0 - off, 1 - on)." />
            </label>

            <label>
              TV Port:
              <input type="text" name="TV_PORT" value={formData.TV_PORT} onChange={handleChange} />
              <FaQuestionCircle data-tip="Host SourceTV port." />
            </label>

            <label>
              TV Password:
              <input type="text" name="TV_PW" value={formData.TV_PW} onChange={handleChange} />
              <FaQuestionCircle data-tip="CSTV password for clients." />
            </label>

            <label>
              TV Relay Password:
              <input type="text" name="TV_RELAY_PW" value={formData.TV_RELAY_PW} onChange={handleChange} />
              <FaQuestionCircle data-tip="CSTV password for relay proxies." />
            </label>

            <label>
              TV Max Rate:
              <input type="text" name="TV_MAXRATE" value={formData.TV_MAXRATE} onChange={handleChange} />
              <FaQuestionCircle data-tip="World snapshots to broadcast per second. Affects camera tickrate." />
            </label>

            <label>
              TV Delay:
              <input type="text" name="TV_DELAY" value={formData.TV_DELAY} onChange={handleChange} />
              <FaQuestionCircle data-tip="CSTV broadcast delay in seconds." />
            </label>

            <label>
              Log:
              <select name="CS2_LOG" value={formData.CS2_LOG} onChange={handleChange}>
                <option value="on">On</option>
                <option value="off">Off</option>
              </select>
              <FaQuestionCircle data-tip="Enable or disable logging ('on'/'off')." />
            </label>

            <label>
              Log Money:
              <select name="CS2_LOG_MONEY" value={formData.CS2_LOG_MONEY} onChange={handleChange}>
                <option value="0">Off</option>
                <option value="1">On</option>
              </select>
              <FaQuestionCircle data-tip="Turns money logging on/off (0 - off, 1 - on)." />
            </label>

            <label>
              Log Detail:
              <input type="text" name="CS2_LOG_DETAIL" value={formData.CS2_LOG_DETAIL} onChange={handleChange} />
              <FaQuestionCircle data-tip="Combat damage logging (0 - disabled, 1 - enemy, 2 - friendly, 3 - all)." />
            </label>

            <label>
              Log Items:
              <select name="CS2_LOG_ITEMS" value={formData.CS2_LOG_ITEMS} onChange={handleChange}>
                <option value="0">Off</option>
                <option value="1">On</option>
              </select>
              <FaQuestionCircle data-tip="Turns item logging on/off (0 - off, 1 - on)." />
            </label>
          </div>
        )}

        <input className="submit-button" type="submit" value="Submit" />
      </form>

      {notification && (
        <div className="notification">
          {notification}
          <button onClick={closeNotification}>x</button>
        </div>
      )}

      <Tooltip place="right" type="dark" effect="solid" />
    </div>
  );
};

export default ServerCreator;
