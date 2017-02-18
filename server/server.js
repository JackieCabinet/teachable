const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors')

app.options('*', cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


app.set('port', (process.env.PORT || 5000));
app.use(express.static(path.join(__dirname, 'client')))


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});