var wsUri = "ws://localhost:8080";
let websocket = new WebSocket(wsUri);

websocket.onopen = function(evt) {
    console.log("Connected to WebSocket server.");
};

websocket.onclose = function(evt) {
    console.log("Disconnected");
};

websocket.onmessage = function(evt) {
    console.log('Retrieved data from server: ' + evt.data);
    let data = JSON.parse(atob(evt.data));
    let {url, method, body, headers, cookies} = data;
    // use fetch
    console.log(url, method, body, headers, cookies);
    fetch(url, {
        method: method,
        body: body,
        headers: headers,
        credentials: 'include'
    }).then(response => {
        // get the response
        // send the response back to the server
        response.text().then(text => {
            websocket.send(btoa(JSON.stringify({
                url: url,
                method: method,
                body: text,
                headers: response.headers,
                cookies: response.cookies
            })));
        });
    });
};

websocket.onerror = function(evt) {
    console.log('Error occured: ' + evt.data);
};
