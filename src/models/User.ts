const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    account: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
    },
    country: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    // friends: {
    //     f_count: {
    //         type: Number
    //     },
    //     friends: [{
    //         friend: {
    //             type: String
    //         }
    //     }]
    // },
    // clubs: {
    //     c_count: {
    //         type: Number
    //     },
    //     clubs:[{
    //         club: {
    //             type: String
    //         },
    //     }] 
    // },
    // favobooks: [{
    //     favobook: {
    //         type: String
    //     },
    //     ISBN: {
    //         type: Number
    //     }
    // }],
    // readlist:{
    //     b_count: {
    //         type: Number
    //     },
    //     readbooks:[{
    //         readbook: {
    //             type: String
    //         },
    //         ISBN: {
    //             type: Number
    //         }
    //     }]
    // },
    // reviews: {
    //     r_count: {
    //         type: Number
    //     },
    //     reviews: [{
    //         ISBN: {
    //             type: Number
    //         },
    //         review: {
    //             type: String
    //         },
    //         rate: {
    //             type: String
    //         }
    //     }],
    // },
    refreshToken: String
})

module.exports = model('User', userSchema)