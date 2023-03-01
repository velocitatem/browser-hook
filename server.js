var WebSocketServer = require('ws').Server, wss = new WebSocketServer({port: 8080});

const express = require('express');
const app = express();
const port = 3020;

let stack = [];

wss.on('connection', function(ws) {
    console.log("browser connected");
    ws.on('message', function(message) {
        console.log('received: %s', message);
        stack.push(message.toString());
    });
    ws.send('something');
})


function sendToAll(message) {
    wss.clients.forEach(function each(client) {
        client.send(message);
    });
}

app.get("/get/stack", (req, res) => {
    let lastStackItem = stack.pop();
    res.send(lastStackItem);
});

app.get('/send/:data', (req, res) => {
    sendToAll(req.params.data);
    res.send('sent');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
