const express    = require('express')
const app        = express()
const bodyParser = require('body-parser')
const Property = require('./lib/property.js')
const property = new Property()

app.use(bodyParser.json())
app.use((error, req, res, next) => {
    if (error instanceof SyntaxError) {
        console.error(`Could not decode request: JSON parsing failed: ${error}`)
        res.status(400).json({error: 'Could not decode request: JSON parsing failed'})
    } else {
        next()
    }
})
app.use(bodyParser.urlencoded({ extended: true }))

const port = process.env.PORT || 8080

app.post('/', property.filter)

module.exports = app.listen(port)
console.info(`Server start on port ${port}`)
