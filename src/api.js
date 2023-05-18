import express from 'express';
import bodyParser from 'body-parser';
import controllers from './controllers.js';

const PORT = process.env.PORT || 8080;

const app = express();

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send({ ok: true })
})

app.use("/api/v1", controllers);

app.listen(PORT, () => {
    console.log(`API running on http://localhost:${PORT}`)
})