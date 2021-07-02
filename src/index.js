const express = require('express')
const cors = require('cors')
require('./db/mongoose')

const projectsRouter = require('./routers/project')

const app = express()
const port = process.env.PORT || 3000

var whitelist = ['http://localhost:4200']
var corsOptions = {
    origin: function (origin, callback) {
        console.log('origin: ', origin)
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

app.use(cors(corsOptions))

app.use(express.json())
app.use(projectsRouter)

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})