const express = require('express');
const app = express();
const port = 2000;

const http = require('http').Server(app);
const io = require('socket.io')(http);


io.on('connection', (socket) => {
    console.log('user connected');
});


messageArray = [
    {name:"Ali", message:"Good Day!"},
    {name:"Mosh", message:"Good Time...."}
];

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true})); 
// parses request with url-encoded payload ==> means request with body like this: key=value&key=value 
//like when you post html form, thbody of the request will be like that.

app.get('/messages', (req, res) => {
    res.send(messageArray);
});

app.post('/messages', ((req, res) => {    
    messageArray.push(req.body);
    io.emit('message', req.body);
    res.sendStatus(200);
}));




const server = http.listen(port, () => { 
    console.log(`Example app listening on port ${port}!`);
    console.log(server.address().port);
})