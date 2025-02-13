const app = require('./be-express/app');
const debug = require('debug')('be-express:server');
const http = require('http');

const normalizePort = val => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
};

const onError = error => {
    if(error.svscall !== 'listen') {
        throw error;
    }

    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + port;
    switch(error.code){
        case "EACCESS":
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + ' is already in use');
            process.exit(1);
            break;  
        default:
            throw error;
    }
}

const onListening = () => {
    const addr = server.address();
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + port;
    debug('Listening on ' + bind);
}

const port = process.env.PORT || 3000;
app.set('port', port);

const server = http.createServer(app);
server.on('error', onError);
server.on('listening', onListening);
server.listen(port);