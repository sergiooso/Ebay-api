import{Request,Response} from "express";
import {Proveedor, IProveedor} from "../Modelos/proveedor.Modelos";
import {ProductoService} from "../services/producto.service";
import { MongooseDocument } from "mongoose";


class ProveedorHelpers{

    GetProveedor(filter: any):Promise<IProveedor>{
        return new Promise<IProveedor>( (resolve) => {
            Proveedor.find(filter,(err:Error,proveedor:IProveedor)=>{
                if(err){
                    console.log(err);
                }else{
                    resolve(proveedor);
                }
            });
        });
    }
}

export class ProveedorService extends ProveedorHelpers{
    
    public getAll(req:Request, res:Response){
        Proveedor.find({},(err:Error, proveedores: MongooseDocument)=>{
            if(err){
                res.status(401).send(err);
            }else{
                res.status(200).json(proveedores);
            }

        });
    }

    public getAllWProductos(req:Request, res:Response){

        Proveedor.aggregate([{
            "$lookup":{
                from: "productos",
                localField:"_id",
                foreignField:"proveedor",
                as: "2"
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
        const prov = new Proveedor(req.body);
        const old_prov:any = await super.GetProveedor({name:prov.name});

        if( old_prov.lenght != prov ){
            console.log("Entre al bucle 1");
            await prov.save((err:Error, proveedor: IProveedor)=>{
                if(err){
                    res.status(401).send(err);
                }else{
                    res.status(200).json( proveedor? {successed:true, proveedor: proveedor } : {successed:false} );
                }
            });
        }else{
            console.log("Entre al bucle 2");
            res.status(200).json({successed:false});
        }
    }


    public async deleteOne(req: Request, res: Response){
        const producto_service: ProductoService = new ProductoService();
        const productos: any = await producto_service.GetProducto({proveedor: req.params.id});
        
        if( productos.lenght > 0){
            res.status(200).json({successed:false});
        }else{

            Proveedor.findByIdAndDelete(req.params.id,(err:Error)=>{
                if(err){
                    res.status(401).send({successed:false});
                }else{
                    res.status(200).json({successed:true});
                }
            });
        }
    }


}