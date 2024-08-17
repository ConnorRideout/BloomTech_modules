const server = require('./api/server')
require('dotenv').config()

const port = process.env.PORT || 9000

server.listen(port, () => {
    console.log(`\n == server started on http://localhost:${port} == \n`)
})