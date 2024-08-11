
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


app.get('/edit/:userid',async (req,res) => {
    let user = await userModel.findOne({id: req.params.id})
    res.render("edit",{user})
})


app.post('/update/:id',async (req,res) => {
    let {image , name, email} = req.body
    let user = await userModel.findOneAndUpdate({id: req.params.user},{image, name, email} , {new:true})
    res.redirect("/read")
})


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
