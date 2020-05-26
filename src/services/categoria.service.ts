import {Request,Response} from "express";

import {Categoria, ICategoria} from "../Modelos/categoria.modelos";
import { Producto } from "../Modelos/producto.modelos";

import {ProductoService} from "../services/producto.service"

import { MongooseDocument } from "mongoose";
import {resolve} from "dns";


class CategoriaHelpers{

    GetCategoria(filter: any): Promise<ICategoria>{
        return new Promise<ICategoria>( (resolve) => {
            Categoria.find(filter,(err:Error,categoria:ICategoria)=>{
                if(err){
                    console.log(err);
                }else{
                    resolve(categoria);
                }
            });
        });
    }
}


export class CategoriaService extends CategoriaHelpers{

    public getAll(req: Request, res: Response){
        Categoria.find({},(err: Error, categorias: MongooseDocument)=>{
            if(err){
                res.status(401).send(err);
            }
            res.status(200).json(categorias);
        });
    }

    public getAllWProductos(req:Request, res: Response){

        Categoria.aggregate([{
            "$lookup":{
                from: "productos",
                localField:"_id",
                foreignField:"categoria",
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
        const c = new Categoria(req.body);
        const old_cat:any = await super.GetCategoria({name:c.nameCat});

        if( old_cat != c){
            await c.save((err:Error, category: ICategoria)=>{
                if(err){
                    res.status(401).send(err);
                }else{
                    res.status(200).json( category? {successed:true, category: category } : {successed:false} );
                }            
            });
        }else{
            res.status(200).json({successed:false});
        }        

    }

    public async deleteOne(req: Request, res: Response){
        const producto_service : ProductoService = new ProductoService();
        const productos:any = await producto_service.GetProducto({categoria: req.params.id_cat});

        if( productos.length > 0 ){
            res.status(200).json({successed:false});
            console.log("bucle 1")
        }else{

            Categoria.findByIdAndDelete(req.params.id_cat,(err:Error)=>{
                if(err){
                    res.status(401).send({successed:false});
                    console.log("bucle 2")
                }else{
                    res.status(200).json({successed:true});
                    console.log("se elimino")
                }
            });

        }

    }



}