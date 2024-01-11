const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Bonjour, monde!');
});

const port = 3000;
app.listen(port, () => {
    console.log(`Le serveur écoute sur le port ${port}`);
});
