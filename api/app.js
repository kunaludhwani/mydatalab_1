process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import os from 'os';

import config from './config/config';
import usersModule from './modules/users/router';

const app = express();


app.set('env', config.ENV);
app.set('port', config.PORT);


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'))

app.get('/', (req, res) => res.send('Health Checks OK'))


app.use('/api', usersModule);


app.use((err, req, res, next) => {
    return res.status(500).send({ success: false, msg: 'Someting went wrong', data: err.stack });
});


app.listen(app.get('port'), () => {
    console.log(`Server is listening on http://${os.hostname()}:${app.get('port')}`);
});

module.exports = app;
