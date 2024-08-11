
require('dotenv').config(); 
const express = require('express')
const app = express()
const path = require('path')



const userModel = require('./models/user')

app.set("view engine", "ejs")


app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req,res) => {
    res.render("index")
})

app.get('/read',async (req,res) => {
    let allusers = await userModel.find()
    res.render("read", {users: allusers})
})

app.post('/create', async (req,res) => {
  
    //creating a dynamic user when a user put information and press submit

    let {name ,email, image} = req.body

    let createdUser = await userModel.create({
        name : name,
        email : email,
        image : image
    })

    res.redirect("/read")

})
app.get('/delete/:id',async (req,res) => {
    let dynamicuser = await userModel.findOneAndDelete({_id: req.params.id})
    res.redirect("/read",)
})


app.listen(3000)
