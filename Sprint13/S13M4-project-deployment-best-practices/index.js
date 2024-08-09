require('dotenv').config()

const server = require('./backend/server')

const port = process.env.PORT || 9000

server.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`)
})