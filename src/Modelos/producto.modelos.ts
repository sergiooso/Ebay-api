import mongoose from "mongoose";
import {IProveedor} from "./proveedor.Modelos"
import {ICategoria} from "./categoria.modelos"

export interface IProducts extends mongoose.Document { 
    name: string;
    precio_venta: number;
    precio_compra: number;
    cantidad: number;
    proveedor: IProveedor;
    categoria: ICategoria;
    
    
}

const ProductoSchema = new mongoose.Schema({
    name: { type: String, required: true},
    precio_venta: {type: Number, required: true},
    precio_compra: {type: Number, required: true},
    cantidad: {type: Number, required: true},
    proveedor: { type: mongoose.Schema.Types.ObjectId, ref: "Proveedor" },
    categoria: { type: mongoose.Schema.Types.ObjectId, ref: "Categoria"}
});


export const Producto = mongoose.model<IProducts>("Producto", ProductoSchema);