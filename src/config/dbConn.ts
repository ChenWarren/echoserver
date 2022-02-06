const mongoose = require('mongoose')

const conn = async () => {
    try{
        await mongoose.connect(process.env.DATABASE_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
    } catch(err){
        console.error(err)
    }
}

module.exports = conn