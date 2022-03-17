import { Request, Response } from 'express'
import formidable, { Fields, Files} from 'formidable'
import fs from 'fs'
import fsPromises from 'fs/promises'
import path from 'path'

const uploadFile = async ( req: Request, res: Response) => {

    const folderPath = path.join(__dirname, '..', 'uploads')
    if(!fs.existsSync(folderPath)){
        await fsPromises.mkdir(folderPath)
    }

    const form = formidable({
        uploadDir: folderPath, 
        keepExtensions: true,
        maxFileSize: 1024*1024, //1MB
        multiples: false
    })
    
    form.parse(req, async (err: Error, fields: Fields, files: Files)=>{
        if(err) res.status(500).json({"message": err.message})
        res.status(201).json({files})
        res.end()
    })
}

module.exports = { uploadFile }