// iss_promised.js
const request = require('request-promise-native');

const fetchMyIP = () => {
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = (body) => {
  const ip = JSON.parse(body).ip;
  return request(`https://ipvigilante.com/json/${ip}`);
};

const fetchISSFlyOverTimes = function(body) {
  const { lat, lon } = JSON.parse(body).data;
  const url = `http://api.open-notify.org/iss-pass.json?lat=${lat}&lon=${lon}`;
  return request(url);
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};

module.exports = { nextISSTimesForMyLocation };
