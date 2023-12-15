/*const products =require('../data.js')

const getProducts=((req,res)=>{
    res.json(products)
})

const getProduct=((req,res)=>{
    const id=Number(req.params.productID)
    const product=products.find(product=>product.id===id)
    if(!product) 
    {
        return res.status(404).send('Product not Found')
    }
    res.json(product)
})
const createProduct = ((req, res) => {
    const newProduct = {
        id: products.length + 1,
        name: req.body.name,
        price: req.body.price
    }
    products.push(newProduct)
    res.status(201).json(newProduct)
})

const updateProduct = ((req, res) => {
    const id = Number(req.params.productID)
    const index = products.findIndex(product => product.id === id)
    const updatedProduct = {
        id: products[index].id,
        name: req.body.name,
        price: req.body.price
    }

    products[index] = updatedProduct
    res.status(200).json('Product updated')
})

const deleteProduct = ((req, res) => {
    const id = Number(req.params.productID)
    const index = products.findIndex(product => product.id === id)
    products.splice(index,1)
    res.status(200).json('Product deleted')
})

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}*/

const Product =require('../module/Product.js')

const getProducts=((req,res)=>{
    Product.find({})
        .then(result=>res.status(200).json({result}))
        .catch(()=>res.status(500).json({msg:error}))
})

const getProduct = ((req, res) => {
    Product.findOne({ _id: req.params.productID })
        .then(result => res.status(200).json({ result }))
        .catch(() => res.status(404).json({msg: 'Product not found'}))
})

const createProduct = ((req, res) => {
    Product.create(req.body)
        .then(result => res.status(200).json({ result }))
        .catch((error) => res.status(500).json({msg:  error }))
})

const updateProduct = ((req, res) => {
    Product.findOneAndUpdate({ _id: req.params.productID }, req.body, { new: true, runValidators: true })
        .then(result => res.status(200).json({ result }))
        .catch((error) => res.status(404).json({msg: 'Product not found' }))
})

const deleteProduct = ((req, res) => {
    Product.findOneAndDelete({ _id: req.params.productID })
        .then(result => res.status(200).json({ result }))
        .catch((error) => res.status(404).json({msg: 'Product not found' }))
})

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}