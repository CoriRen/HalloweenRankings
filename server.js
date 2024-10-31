const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const hostname = '0.0.0.0'
const PORT = 10000
require('dotenv').config()

let db,
    //dbConnectionStr = process.env.DB_STRING
    dbConnectionStr = DB_STRING,
    dbName = 'halloween'

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

MongoClient.connect(dbConnectionStr)
//change connectionString to dbConnectionStr
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })

app.get('/',(request, response)=>{
    db.collection('movies').find().toArray()
    .then(data => {
        response.render('index.ejs', { movies: data })
    })
    .catch(error => console.error(error))
})

app.post('/addMovie', (request, response) => {
    db.collection('movies').insertOne({movieName: request.body.movieName,
    movieRating: request.body.movieRating})
    .then(result => {
        console.log('Movie Added')
        response.redirect('/')
    })
    .catch(error => console.error(error))
})

app.put('/updateMovieRating', (request, response) => {
    db.collection('movies').updateOne({movieName: request.body.movieName,
    movieRating: request.body.movieRating},{
        $set: {
            movieRating:request.body.mRating
        }
    })
    .then(result => {
        console.log('Movie Rating Updated')
        response.json('Movie Rating Updated')
        response.redirect('/')
    })
    .catch(error => console.error(error))
})

app.delete('/deleteMovie', (request, response) => {
    db.collection('movies').deleteOne({movieName: request.body.movieName})
    .then(result => {
        console.log('Movie Deleted')
        response.json('Movie Deleted')
    })
.catch(error => console.error(error))

})






app.listen(process.env.PORT || PORT, hostname, ()=>{
    console.log(`Server running on port ${PORT}`)
})