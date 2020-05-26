import{Request,Response} from "express";

import{ Comprador, IComprador } from "../Modelos/Comprador.modelos";
import {CarritoService} from "../services/carrito.service";

import { MongooseDocument } from "mongoose";
import { resolve } from "dns";

class CompradorHelpers{

    GetComprador(filter: any):Promise<IComprador>{
        return new Promise<IComprador>((resolve)=>{
            Comprador.find(filter,(err:Error,Comprador:IComprador)=>{
                if(err){
                    console.log(err);
                }else{
                    resolve(Comprador);
                }
            });
        });
    }
}

export class CompradorService extends CompradorHelpers{

    public getAll(req:Request, res:Response){
        Comprador.find({},(err:Error, compradores: MongooseDocument)=>{
            if(err){
                res.status(401).send(err);
            }else{
                res.status(200).json(compradores);
            }
        });
    }

    public getAllWCarrito(req:Request, res: Response){
        Comprador.aggregate([{
            "$lookup":{
                from: "carritos",
                localField:"_id",
                foreignField:"comprador",
                as: "1"
            }
        }],(err:Error,data:any)=>{
            if(err){
                res.status(401).send(err);
            }else{
                res.status(200).json(data);
            }
        })
    }

    public async NewOne(req: Request, res: Response){
        const comp = new Comprador(req.body);
        const old_comp: any=await super.GetComprador({name:comp.name});

        if( old_comp != comp){
            console.log("Entre al bucle 1");
            await comp.save((err:Error, Comprador: IComprador)=>{
                if(err){
                    res.status(401).send(err);
                }else{
                    res.status(200).json( Comprador? {successed:true, comprador:Comprador }: {successed:false});
                }
            });
        }else{
            console.log("Entre al bucle 2");
            res.status(200).json({successed:false});
        }
    }


    public async deleteOne(req: Request, res: Response){
        //const comp_service: CompradorService = new CompradorService();
       // const comprador: any = await comp_service.GetComprador({comprador: req.params.id});

        console.log("Entro");

        Comprador.findByIdAndDelete(req.params.id,(err:Error)=>{
            if(err){
                res.status(401).json({successed:false, message:"server got an error, contact support if this error is still happening"});
            }else{
                res.status(200).json({successed:true,message:"User deleted successfully"});
            } 
        });
    }




}