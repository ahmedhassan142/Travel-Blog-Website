import Schema from 'mongoose'
import mongoose from 'mongoose'



const productivemodel = new mongoose.Schema({
    name:String
    ,
    price:String
    ,
    assembled:String,

    desembled
    :String,
    colour:String
    
})
 export const productive=mongoose.models.colorfulproducts||mongoose.model('colorfulproducts',productivemodel)