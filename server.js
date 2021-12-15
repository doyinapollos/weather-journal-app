projectData = {}


const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const fetch = require('node-fetch')
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors())

app.use(express.static('website'))

app.get('/api/projectdata', (req, res) => {
    res.status(200).send(projectData)
})

app.post('/api/projectdata', (req, res) => {
    const { date, temp, content } = req.body
    projectData[date] = {
        temp,
        content,
    }
    res.status(201).send()
})

const PORT = 3000;

const server = app.listen(PORT, listening);

function listening() {
    console.log('server running');
    console.log(`running on localhost: ${PORT}`);
}