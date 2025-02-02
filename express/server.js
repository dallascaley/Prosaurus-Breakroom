const express = require('express')
const app = express()

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  console.log('whatever')
  //res.send('Hi') // just sends Hi
  //res.sendStatus(500) // just sends a 500 error
  //res.status(500).send('Hi') // does both things
  //res.status(500).json({message: "you done fucked up!"})  //this
  //res.download('server.js')
  res.render("index", { text2: 'World duh...'})
})

app.listen(3001)