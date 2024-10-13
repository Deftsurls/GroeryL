const express = require('express')
const path = require('path')
const methodOverride = require ('method-override')
const port = 8080;
const mongoose = require('mongoose')
const Groceries = require('./models/list')
const dotenv = require('dotenv').config()


mongoose.connect(process.env.MONGO)
    .then(() =>{
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.log("There was an error connecting to MongoDB")
        console.log(err)
    })

const app = express()

app.use(express.urlencoded({extended: true}))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'css')));
app.use(express.static('public'));
app.use(methodOverride('_method'))

const units = ['KG', 'LB', 'GR', '1 Caja X 32 ', 'Unidad', 'Arroba', 'L', '1 Caja']

app.get('/', (req, res) =>{
    res.render('home.ejs')
})

app.get('/groceriesList', async (req, res) =>{
    const products = await Groceries.find({});
    res.render('list.ejs', {products, units})
})
app.get('/products/new', (req, res) => {
    res.render('products/new.ejs', {units});
})

app.post('/products', async (req, res) => {
    const newProduct = new Groceries(req.body);
    await newProduct.save();
    res.redirect(`/groceriesList/`)
})

app.delete('/product/:id', async (req, res) =>{
    const {id} = req.params;
    await Groceries.findByIdAndDelete(id);
    res.redirect('/groceriesList/')
})
app.listen(port, ()=>{
    console.log(`server is running on port ${port}`)
})
