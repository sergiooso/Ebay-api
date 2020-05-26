import {Request,Response} from "express";
import {Carrito, ICarrito} from "../Modelos/carrito.modelos";

import {CompradorService} from "./comprador.service";

import { MongooseDocument } from "mongoose";
import { Resolver, resolve } from "dns";

class CarritoHelpers{

    GetCarrito(filter: any):Promise<ICarrito>{
        return new Promise<ICarrito>((resolve)=>{
            Carrito.find(filter,(err:Error,Carrito:ICarrito)=>{
                if(err){
                    console.log(err);
                }else{
                    resolve(Carrito);
                }
            });
        });
    } 
}

export class CarritoService extends CarritoHelpers{

    public getAll(req:Request, res:Response){
        Carrito.aggregate([
            {
                "$lookup":{
                    from:"compradores",
                    localField:"comprador",
                    foreignField:"_id",
                    as:"comprador"
                }    
            }
        ],(err:Error, data:any)=>{
            if(err){
                console.log("entre en el bucle 1");
                res.status(401).send(err);
            }else{
                console.log("entre en el bucle 1");
                res.status(200).json(data);
            }
        })
    }

    public async NewOne(req: Request, res: Response){
        const car = new Carrito(req.body);

        await car.save((err:Error, Carrito:ICarrito)=>{
            if(err){
                res.status(401).send(err);
            }else{
                res.status(200).json( Carrito? {successed:true, Carrito: Carrito } : {successed:false} );          
            }
        });
    }

    public async deleteOne(req: Request, res: Response){
        const comprador_service: CompradorService = new CompradorService();
        const compradores: any = await comprador_service.GetComprador({carrito: req.params.id});

        if(compradores.lenght>0){
            res.status(200).json({successed:false});
        }else{
            Carrito.findByIdAndDelete(req.params.id,(err:Error)=>{
                if(err){
                    res.status(401).send({successed:false});
                }else{
                    res.status(200).json({successed:true});
                }
            });
        }
    }
}
