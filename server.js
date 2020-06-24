const express = require('express')
const path = require('path')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

// Serve static assets if in production 
if(process.env.NODE_ENV === "production"){
    // set static folder
    app.use(express.static('client/build'))

    app.get('*' , (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client' , 'build', 'index.html'))
    })
}

const PORT = process.env.PORT || 5000 

app.listen(PORT , () => console.log(`Server run at port ${PORT}`))