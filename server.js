const express = require('express');
const app = express();
const port = 2000;


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
    res.sendStatus(200);
}));


const server = app.listen(port, () => { 
    console.log(`Example app listening on port ${port}!`);
    console.log(server.address().port);
})