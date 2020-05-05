const fs = require('fs');
const path = require('path');
const { getToken } = require('apple-music-token-node');

const { team_id, key_id } = require(path.resolve(__dirname, '../certificates/config.json'));
const certPath = path.resolve(__dirname, '../certificates/cert.p8');

const tokenData = getToken(certPath, team_id, key_id, '4300');
fs.writeFile(path.resolve(__dirname, '../src/token.json'), JSON.stringify(tokenData, null, ''), (err) => {
  if (err) {
    console.error(err)
    return
  }
  console.log('Token successfully generated!')
});

