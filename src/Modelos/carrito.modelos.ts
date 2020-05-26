import mongoose from "mongoose";
import { IComprador } from "./Comprador.modelos"


export interface ICarrito extends mongoose.Document {
    fecha: string;
    cantidadElementos: number;
    estado: String;
    comprador: IComprador;
}

const CarritoSchema = new mongoose.Schema({
    fecha: {type: String, required: true},
    cantidadElementos: {type: Number, required: true},
    estado: {type: String, required: true},
    comprador: { type: mongoose.Schema.Types.ObjectId, ref: "comprador"}
});

export const Carrito = mongoose.model<ICarrito>("Carrito", CarritoSchema);