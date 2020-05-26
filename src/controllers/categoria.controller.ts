import {Application} from "express";
import {CategoriaService} from "../services/categoria.service"

export class CategoriaController{
    private cat_service: CategoriaService;

    constructor(private app: Application){
        this.cat_service = new CategoriaService();
        this.routes();
    }
    private routes(){
        this.app.route("/categorias").get(this.cat_service.getAll);

        this.app.route("/categoria").post(this.cat_service.NewOne);

        this.app.route("categorias/productos").get(this.cat_service.getAllWProductos);
        this.app.route("/categoria/:id_cat").delete(this.cat_service.deleteOne);
    
    }
}