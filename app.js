const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

const app = express();

const PORT = config.get('port') || 5000


async function start() {
    try {
        
    } catch (e) {
        console.log("server error: ", e.message);
        process.exit(1);
    }
}
start()

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})