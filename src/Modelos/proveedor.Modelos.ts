import mongoose from "mongoose";


export interface IProveedor extends mongoose.Document { 
    name: string;
    direccion: string;
    tipo: string;
}

const ProveedorSchema = new mongoose.Schema({
    //_id:{type:String,required:true},
    name: { type: String, required: true },
    tipo: {type: String, required: true},
    direccion: { type: String, required: false }
});

export const Proveedor = mongoose.model<IProveedor>("Proveedor", ProveedorSchema);
