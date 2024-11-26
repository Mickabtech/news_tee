const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors  = require('cors');
const env = require('dotenv');
const path = require('path');
const NewsRoute = require("./routes/NewsRoute")
const bodyParser = require("body-parser");

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.urlencoded({ extended: true })); 

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/news', NewsRoute)
env.config()


const port = process.env.PORT || 3005
const mongodbURL = process.env.MONGOURI

mongoose.connect(mongodbURL)
.then(()=>{
    console.log('Database Connected')
}).catch(()=>{
    console.log('error connecting to Database')
})





app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})