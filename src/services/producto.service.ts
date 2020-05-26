import {Request,Response} from "express";
import {Producto, IProducts} from "../Modelos/producto.modelos";

import {CategoriaService} from "./categoria.service";

import { MongooseDocument } from "mongoose";
import { Resolver } from "dns";
//import { Proveedor } from "../Modelos/proveedor.Modelos";


class ProductoHelpers{

    GetProducto(filter: any):Promise<IProducts>{
        return new Promise<IProducts>( (resolve) => {
            Producto.find(filter,(err:Error,Producto:IProducts)=>{
                if(err){
                    console.log(err);
                }else{
                    resolve(Producto);
                }
            });
        });
    }
}

export class ProductoService extends ProductoHelpers{
    /*
    public GetProducto(req:Request,res:Response){
        Producto.findById(req.params.id).populate("categoria").exec((err:Error,producto:IProducts)=>{
            if(err){
                res.status(401).json(err);
            }else{
                res.status(200).json(producto);
            }
            
        });
    }

    public getall(req:Request,res:Response){
        Producto.find({},(err:Error,proveedores:MongooseDocument)=>{
            if(err){
                res.status(401).send(err);
            }
            res.status(200).json(proveedores);
        });
   }*/

   public getAll(req:Request, res:Response){
       Producto.aggregate([
           {
                
                "$lookup":{
                    from: "proveedores",
                    localField:"proveedor",
                    foreignField:"_id",
                    as: "proveedor"
                    
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

   /*public Update(req: Request,res: Response){
    console.log("entro");

   }*/

   /*
   public NewOne(req: Request, res: Response){
       const prod = new Producto(req.body);
       prod.save((err:Error, producto: IProducts)=>{
        if(err){
            res.status(401).send(err);
        }
        res.status(200).json( producto? {"successed":true, "producto":producto} : {"successed":false});
       });
   }*/

   public async NewOne(req: Request, res: Response){
       const prod = new Producto(req.body);
       const old_prod:any = await super.GetProducto({name:prod.name});

       console.log(prod);
       console.log(req.body);

       if( old_prod.lenght != prod ){
            console.log("entre bucle 1");
           await prod.save((err:Error, Producto: IProducts)=>{
                if(err){
                    res.status(401).send(err);
                }else{
                    res.status(200).json( Producto? {successed:true, Producto: Producto } : {successed:false} );
                    
                }
           });
       }else{
            console.log("entre bucle 2");
            res.status(200).json({successed:false});
       }
   }

   public async deleteOne(req:Request, res:Response){
       Producto.findByIdAndDelete(req.params.id,(err:Error)=>{
            if(err){
                res.status(401).json({successed:false, message:"server got an error, contact support if this error is still happening"});
            }else{
                res.status(200).json({successed:true,message:"Product deleted successfully"});
            }
       });
   }

   public async getOne(req:Request, res:Response){
       const produ:any = await super.GetProducto({_id:req.params.id});
       res.status(200).json(produ[0]);
   }

   public async updateOne(req:Request, res:Response){
       const old_produ:any = await super.GetProducto({
           name:req.body.name,
           _id: { $nin: [req.params.id] }
       });

       if( old_produ.lenght === 0 ){
           Producto.findByIdAndUpdate(req.params.id,req.body,(err:Error)=>{
            if(err){
                res.status(401).json({successed:false, message:"server got an error, contact support if this error is still happening"});
            }else{
                res.status(200).json({successed:true,message:"Product updated successfully"});
            }
           });
       }else{
           res.status(200).json({successed:false});
       }
   }
//
}