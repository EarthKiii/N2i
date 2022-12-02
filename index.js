const express = require('express');
const app = express();
const path = require('path');

const PORT = 3000;

app.use('/public', express.static(__dirname + '/public'));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/404.html'));
});
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});