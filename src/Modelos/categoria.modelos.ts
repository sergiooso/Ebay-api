import mongoose from "mongoose";

export interface ICategoria extends mongoose.Document {
    nameCat: string;
}

const CategoriaSchema = new mongoose.Schema({
    nameCat: {type: String , required: true}
});

export const Categoria = mongoose.model<ICategoria>("Categoria", CategoriaSchema);