const express = require('express');
const config = require('config');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

app.use(express.json({ extended: true }));
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/link', require('./routes/link.routes'))
app.use('/t', require('./routes/redirect.routes'));

if (process.env.NODE_ENV === 'production') {
    app.use("/", express.static(path.join(__dirname, 'client', 'build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

const PORT = config.get('port') || 5000

app.post("/test", function (req, res) {
    res.send(req.body);
});

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'))
    } catch (e) {
        console.log("server error: ", e.message);
        process.exit(1);
    }
}
start()

app.listen(PORT, "0.0.0.0", () => {
    console.log(`listening on port ${PORT}`);
    console.log(`Node env:  ${process.env.NODE_ENV}`);
})