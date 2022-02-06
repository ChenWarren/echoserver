import { Request, Response } from "express"

const root = ( req: Request, res: Response) => {
    res.json({"message": "Hello world!"})
}

module.exports = root