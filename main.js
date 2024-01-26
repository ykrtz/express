const express = require("express");
const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => res.send('Hello World!' ))


// Get all users
app.get('/users', async (req, res) => {
    try {
      res.json("here are the useres")
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Error retrieving users' })
    }
  })
  
  
app.post('/users', async (req, res) => {
  try {
    res.json(req.body)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error creating user' })
  }
})


app.listen(PORT, () => console.log(`Server up at PORT:${PORT}`))
