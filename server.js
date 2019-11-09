const express = require('express');
const app = express();
const port = 2000;


const mongoose = require('mongoose');
//var ObjectID = require('mongodb').ObjectID;

mongoose.connect('mongodb://localhost/chatDB', { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err))


let Message = mongoose.model('Message', {
    name: String,
    message: String
});


const http = require('http').Server(app);
const io = require('socket.io')(http);


io.on('connection', (socket) => {
    console.log('user connected');
});




app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true})); 
// parses request with url-encoded payload ==> means request with body like this: key=value&key=value 
//like when you post html form, thbody of the request will be like that.

app.get('/messages', (req, res) => {
    Message.find({}, (err, messages) => {
        res.send(messages);
    })
});

app.post('/messages', ((req, res) => {    
    const messageInstance = new Message(req.body);
    messageInstance.save((err) => {
        if(err) 
            res.sendStatus(500);

        io.emit('message', req.body);
        res.sendStatus(200);
    });
}));




const server = http.listen(port, () => { 
    console.log(`Example app listening on port ${port}!`);
    console.log(server.address().port);
})