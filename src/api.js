import express from 'express';
import bodyParser from 'body-parser';
import controllers from './controllers.js';

export async function build() {
    const app = express();

    app.use(bodyParser.json())

    app.get('/', (req, res) => {
        res.send({ ok: true })
    })

    app.use("/api/v1", controllers);

    return app
}