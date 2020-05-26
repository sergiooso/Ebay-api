import {Request,Response} from "express";
export class MainService{
    public welcome(req:Request,res:Response){
        return res.send({message:`hello ${process.env.hello}`});
    }
}