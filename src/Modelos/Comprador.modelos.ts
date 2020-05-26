import mongoose from "mongoose";

export interface IComprador extends mongoose.Document {
    name: string;
    correoElectronico: string;
    edad: number;
    direccion: string;
    telefono: String;
    sexo: string;
}

const CompradorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    correoElectronico: {type: String, required: true},
    edad: {type: Number, required: true},
    direccion: {type: String, required: true},
    telefono: {type: String, required: true},
    sexo: {type: String, required: true}
});

export const Comprador = mongoose.model<IComprador>("Comprador", CompradorSchema);