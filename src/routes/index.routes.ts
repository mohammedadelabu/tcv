import express, { NextFunction, Response, Request } from 'express';
const router = express.Router();
import { User } from "../model/user";




router.get('/',(req: Request, res: Response)=>{
    res.render('home')
}) 




export default router;
