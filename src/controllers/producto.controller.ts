import {Application} from "express";
import {ProductoService} from "../services/producto.service";

export class ProductoController{
    private prod_service: ProductoService;
    constructor(private app: Application){
        this.prod_service = new ProductoService();
        this.routes();
    }
    private routes(){
        this.app.route("/productosTodos").get(this.prod_service.getAll);

        this.app.route("/producto").post(this.prod_service.NewOne);

        this.app.route("/producto/:id")
        .get(this.prod_service.getOne)
        .delete(this.prod_service.deleteOne)
        .put(this.prod_service.updateOne);
    }
    
}