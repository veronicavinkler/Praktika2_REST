const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/film', db.getFilm)
app.get('/film/:id', db.getFilmById)
app.get('/actor', db.getActor)
app.get('/actor/:id', db.getActorById)
app.get('/category', db.getCategory)
app.get('/category/:id', db.getCategoryById)
app.get('/language/:id', db.getLanguage)
app.get('/language/:id', db.getLanguageById)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})