const express = require('express');
const app = express();
const port = 8007

app.get('/', (req, res) => {
    return res.send('Received a GET HTTP method');
});
   
app.post('/', (req, res) => {
    return res.send('Received a POST HTTP method');
});
   
app.listen(port, () => {
    console.log(`c-rex integration listening on http://localhost:${port}`)
});