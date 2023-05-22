import { build } from './api.js'

const PORT = process.env.PORT || 8080;

async function startServer() {
    const app = await build();

    app.listen(PORT, () => {
        console.log(`API running on http://localhost:${PORT}`)
    })
}

startServer();