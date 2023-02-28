var WebSocketServer = require('ws').Server, wss = new WebSocketServer({port: 8080});

const express = require('express');
const app = express();
const port = 3020;


wss.on('connection', function(ws) {
    ws.on('message', function(message) {
        console.log('received: %s', message);
    });
    ws.send('something');
})


function sendToAll(message) {
    wss.clients.forEach(function each(client) {
        client.send(message);
    });
}

app.get('/send/:data', (req, res) => {
    sendToAll(req.params.data);
    res.send('sent');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
