const sequelize = require('sequelize')
const creds = require('./credentials.js')

// Please create a credentials.js file with your username and password for your cloud DB.
// Refer to sampleCredentials.js


// Database connection

const DBConnection = new sequelize(creds.db)

// Connection testing
DBConnection
    .authenticate()
    .then(() => {
      console.log('DB connection successful')
    })
    .catch((err) => {
      console.log('DB connection ERROR: ', err)
    })

module.exports = DBConnection;

