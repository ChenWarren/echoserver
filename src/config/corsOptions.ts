const wl = require('./whiteList')

const corsOptions = {
    origin: (origin: string, callback:Function) => {
        if(wl.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    optionsSuccessStatus: 200,
}

module.exports = corsOptions