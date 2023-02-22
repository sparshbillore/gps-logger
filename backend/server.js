const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
// import cors from "cors";
const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// app.use(
//     cors({
//       origin: "http://localhost:3000",
//     })
//   );

app.get('/', (req, res) => {
    redirect('/')
})


app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/devices', require('./routes/devicesRoutes'))


app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started at ${PORT}`))

