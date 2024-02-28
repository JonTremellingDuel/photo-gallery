const express = require('express');
const path = require('path');
const https = require('https');
const fs = require('fs');

const PORT = process.env.PORT || 3001;
const app = express();

const privateKey = fs.readFileSync('./dist/server.key');
const certificate = fs.readFileSync('./dist/server.cert');

const httpsServer = https.createServer({ key: privateKey, cert: certificate }, app);

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

httpsServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
