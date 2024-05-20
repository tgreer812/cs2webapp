import React, { useState } from 'react';
import './ServerCreator.css';

const ServerCreator = ({ setServers, servers }) => {
  const [formData, setFormData] = useState({
    map: 'de_dust2',
    srcdsToken: '',
    cheats: '0',
    port: '27015',
    rconPort: '27050',
    maxPlayers: '10',
    steamAppValidate: '0',
    serverHibernate: '1',
    lan: '0',
    rconPassword: 'changeme',
    serverPassword: '',
    gameType: '0',
    gameMode: '1',
    mapGroup: 'mg_active',
    botDifficulty: '',
    botQuota: '',
    botQuotaMode: '',
    tvAutoRecord: '0',
    tvEnable: '0',
    tvPort: '27020',
    tvPassword: 'changeme',
    tvRelayPassword: 'changeme',
    tvMaxRate: '0',
    tvDelay: '0',
    log: 'on',
    logMoney: '0',
    logDetail: '0',
    logItems: '0'
  });

  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert('Spinning up server');
    // Call the Azure function here
    setServers([...servers, {
      mapName: formData.map,
      connectionString: 'connect domain:port',
      status: 'running',
      timestamp: Date.now()
    }]);
  };

  const toggleAdvanced = () => {
    setShowAdvanced(!showAdvanced);
  };

  return (
    <div className="server-creator">
      <form onSubmit={handleSubmit}>
        <h2>Server Creator</h2>

        <div className="form-section">
          <h3>Required Settings</h3>
          <label>
            Pick a map:
            <select name="map" value={formData.map} onChange={handleChange}>
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

          <label>
            Server Password:
            <input type="text" name="serverPassword" value={formData.serverPassword} onChange={handleChange} />
            <span className="tooltip">
              ?
              <span className="tooltiptext">Password for the server</span>
            </span>
          </label>

          <label>
            Max Players:
            <input type="text" name="maxPlayers" value={formData.maxPlayers} onChange={handleChange} />
            <span className="tooltip">
              ?
              <span className="tooltiptext">Maximum number of players</span>
            </span>
          </label>

          <label>
            Game Type:
            <select name="gameType" value={formData.gameType} onChange={handleChange}>
              <option value="0" data-mode="0">Casual</option>
              <option value="0" data-mode="1">Competitive</option>
              <option value="0" data-mode="2">Wingman</option>
              <option value="1" data-mode="2">Deathmatch</option>
              <option value="3" data-mode="0">Custom</option>
            </select>
            <span className="tooltip">
              ?
              <span className="tooltiptext">Type of game mode</span>
            </span>
          </label>
        </div>

        <button type="button" onClick={toggleAdvanced} className="show-advanced-button">
            {showAdvanced ? 'Hide Advanced Settings' : 'Show Advanced Settings'}
        </button>

        {showAdvanced && (
          <div className="form-section">
            <h3>Advanced Settings</h3>

            <label>
              SRCDS Token:
              <input type="text" name="srcdsToken" value={formData.srcdsToken} onChange={handleChange} />
              <span className="tooltip">
                ?
                <span className="tooltiptext">Game Server Token from Steam</span>
              </span>
            </label>

            <label>
              Steam App Validate:
              <select name="steamAppValidate" value={formData.steamAppValidate} onChange={handleChange}>
                <option value="0">No Validation</option>
                <option value="1">Enable Validation</option>
              </select>
              <span className="tooltip">
                ?
                <span className="tooltiptext">Enable or disable Steam app validation</span>
              </span>
            </label>

            <label>
              Cheats:
              <select name="cheats" value={formData.cheats} onChange={handleChange}>
                <option value="0">Disable</option>
                <option value="1">Enable</option>
              </select>
              <span className="tooltip">
                ?
                <span className="tooltiptext">Enable or disable cheats</span>
              </span>
            </label>

            <label>
              Server Hibernate:
              <select name="serverHibernate" value={formData.serverHibernate} onChange={handleChange}>
                <option value="0">Disabled</option>
                <option value="1">Enabled</option>
              </select>
              <span className="tooltip">
                ?
                <span className="tooltiptext">Enable or disable server hibernation</span>
              </span>
            </label>

            <label>
              LAN Mode:
              <select name="lan" value={formData.lan} onChange={handleChange}>
                <option value="0">Disabled</option>
                <option value="1">Enabled</option>
              </select>
              <span className="tooltip">
                ?
                <span className="tooltiptext">Enable or disable LAN mode</span>
              </span>
            </label>

            <label>
              RCON Password:
              <input type="text" name="rconPassword" value={formData.rconPassword} onChange={handleChange} />
              <span className="tooltip">
                ?
                <span className="tooltiptext">RCON password for the server</span>
              </span>
            </label>

            <label>
              Map Group:
              <input type="text" name="mapGroup" value={formData.mapGroup} onChange={handleChange} />
              <span className="tooltip">
                ?
                <span className="tooltiptext">Map pool</span>
              </span>
            </label>

            <label>
              Bot Difficulty:
              <input type="text" name="botDifficulty" value={formData.botDifficulty} onChange={handleChange} />
              <span className="tooltip">
                ?
                <span className="tooltiptext">Difficulty of bots</span>
              </span>
            </label>

            <label>
              Bot Quota:
              <input type="text" name="botQuota" value={formData.botQuota} onChange={handleChange} />
              <span className="tooltip">
                ?
                <span className="tooltiptext">Number of bots</span>
              </span>
            </label>

            <label>
              Bot Quota Mode:
              <input type="text" name="botQuotaMode" value={formData.botQuotaMode} onChange={handleChange} />
              <span className="tooltip">
                ?
                <span className="tooltiptext">Mode for bot quota</span>
              </span>
            </label>

            <label>
              TV Auto Record:
              <select name="tvAutoRecord" value={formData.tvAutoRecord} onChange={handleChange}>
                <option value="0">Off</option>
                <option value="1">On</option>
              </select>
              <span className="tooltip">
                ?
                <span className="tooltiptext">Automatically record all games as CSTV demos</span>
              </span>
            </label>

            <label>
              TV Enable:
              <select name="tvEnable" value={formData.tvEnable} onChange={handleChange}>
                <option value="0">Off</option>
                <option value="1">On</option>
              </select>
              <span className="tooltip">
                ?
                <span className="tooltiptext">Enable or disable CSTV</span>
              </span>
            </label>

            <label>
              TV Port:
              <input type="text" name="tvPort" value={formData.tvPort} onChange={handleChange} />
              <span className="tooltip">
                ?
                <span className="tooltiptext">Host SourceTV port</span>
              </span>
            </label>

            <label>
              TV Password:
              <input type="text" name="tvPassword" value={formData.tvPassword} onChange={handleChange} />
              <span className="tooltip">
                ?
                <span className="tooltiptext">CSTV password for clients</span>
              </span>
            </label>

            <label>
              TV Relay Password:
              <input type="text" name="tvRelayPassword" value={formData.tvRelayPassword} onChange={handleChange} />
              <span className="tooltip">
                ?
                <span className="tooltiptext">CSTV password for relay proxies</span>
              </span>
            </label>

            <label>
              TV Max Rate:
              <input type="text" name="tvMaxRate" value={formData.tvMaxRate} onChange={handleChange} />
              <span className="tooltip">
                ?
                <span className="tooltiptext">Maximum CSTV spectator bandwidth rate allowed</span>
              </span>
            </label>

            <label>
              TV Delay:
              <input type="text" name="tvDelay" value={formData.tvDelay} onChange={handleChange} />
              <span className="tooltip">
                ?
                <span className="tooltiptext">CSTV broadcast delay in seconds</span>
              </span>
            </label>

            <label>
              Log:
              <select name="log" value={formData.log} onChange={handleChange}>
                <option value="on">On</option>
                <option value="off">Off</option>
              </select>
              <span className="tooltip">
                ?
                <span className="tooltiptext">Enable or disable logging</span>
              </span>
            </label>

            <label>
              Log Money:
              <select name="logMoney" value={formData.logMoney} onChange={handleChange}>
                <option value="0">Off</option>
                <option value="1">On</option>
              </select>
              <span className="tooltip">
                ?
                <span className="tooltiptext">Enable or disable money logging</span>
              </span>
            </label>

            <label>
              Log Detail:
              <input type="text" name="logDetail" value={formData.logDetail} onChange={handleChange} />
              <span className="tooltip">
                ?
                <span className="tooltiptext">Combat damage logging</span>
              </span>
            </label>

            <label>
              Log Items:
              <select name="logItems" value={formData.logItems} onChange={handleChange}>
                <option value="0">Off</option>
                <option value="1">On</option>
              </select>
              <span className="tooltip">
                ?
                <span className="tooltiptext">Enable or disable item logging</span>
              </span>
            </label>
          </div>
        )}

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default ServerCreator;
