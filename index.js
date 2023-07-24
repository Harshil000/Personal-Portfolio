import express from "express";
import path from "path";
import mongoose from "mongoose";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express()

const DB = 'mongodb+srv://techshock01:techshock01060107@cluster0.xj797r2.mongodb.net/Client_info?retryWrites=true&w=majority'
mongoose.connect(DB).then(() => {
    console.log("Connection established between Database and page successfully");
}).catch((err) => {
    console.log("Error occur connecting to databse")
})

let schem = new mongoose.Schema({
    Name: String,
    E_Mail: String,
    Number: String
})

let collection = mongoose.model('info', schem)

const staticPath = path.join(__dirname , '/public')

app.use(express.urlencoded())
app.use(express.static(staticPath));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname , "/public/port.html"))
})

app.get('/projects', (req, res) => {
    res.sendFile(path.join(__dirname , "/public/projects.html"))
})

app.post("/", (req, res) => {
    let my_data = new collection(req.body)
    my_data.save().then(() => {
        res.send("Your details has been send to database")
        console.log(req.body)
    }).catch(() => {
        res.status(400).send("Your data is not submitted")
    })
})

app.listen(3000, () => {
    console.log("Server started successfully at port 3000")
})