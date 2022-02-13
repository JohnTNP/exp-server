const Express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

let PORT = process.env.PORT || 5000

const app = Express()
app.use(Express.json())
app.use(cors())

const mongoUrl = 'mongodb+srv://johntnp:Benz723672@cluster0.hs6zk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose.connect(mongoUrl,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection.on('connected', () => {
    console.log('MongoDB is connectd')
})

// Schema
const Schema = mongoose.Schema
const ExpDateSchema = new Schema({
    name: String,
    expdate: String,
    description: String
})

// Model
const ExpDate = mongoose.model('ExpDate', ExpDateSchema)

// Save to DB
const data = {
    name: 'Milk',
    expdate: Date.now(),
    description: 'Test01'
}

const newExpDate = new ExpDate(data)
/* newExpDate.save(err => {
    if (err) {
        console.log("ERORR!!!")
    } else {
        console.log("Data saved!")
    }
}) */


// Routes
app.get('/getData', (req, res) => {
    ExpDate.find({ })
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            console.log('error: ', err)
        })
})

app.post('/insertData', (req, res) => {
    const reqBody = req.body
    const newExpDate = new ExpDate(reqBody)
    newExpDate.save(err => {
        if (err) {
            console.log('Error: ' + err)
            res.sendStatus(404)
        } else {
            console.log('Data created!')
            console.log(reqBody)
            res.sendStatus(200)
        }
    })
})


app.listen(PORT, () => {
    console.log('Server running at 5000')
})