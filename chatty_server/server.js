const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
    // Make the express server serve static assets (html, javascript, css) from the /public folder
    .use(express.static('public'))
    .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });


let clientCount = 0;

wss.on('connection', (ws) => {
    clientCount++

    function UserCountBroadcast(count) {
        const dataObj = { type: 'number', count: count }
        const data = JSON.stringify(dataObj);
        wss.clients.forEach(function each(client) {
            if (client.readyState === ws.OPEN) {
                client.send(data);
            }
        })
    }
    ws.send( /*assign colour )*/ );
    UserCountBroadcast(clientCount);

    ws.on('message', function incoming(data) {
        const parsedData = JSON.parse(data);
        if (parsedData.type == "postMessage") {
            parsedData.type = "incomingMessage";
        }
        if (parsedData.type == "postNotification") {
            parsedData.type = "incomingNotification";
        }
        parsedData.id = uuidv4();

        function MessageBroadcast(data) {
            wss.clients.forEach(function each(client) {
                if (client.readyState === ws.OPEN) {
                    client.send(data);


                }
            })

        }
        MessageBroadcast(JSON.stringify(parsedData));

        // Set up a callback for when a client closes the socket. This usually means they closed their browser.
        ws.on('close', () => {
            clientCount--;
            if (clientCount < 0) {
                clientCount = 0
            }
            UserCountBroadcast(clientCount);
        })
    })
});