const monk = require('monk');

const connectionString = '54.169.190.46:27017/message-board';
const db = monk(connectionString);

module.exports = db;
