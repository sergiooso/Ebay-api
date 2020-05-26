import {Application} from "express";
import {CompradorService} from "../services/comprador.service"

export class CompradorController{
    private comp_service: CompradorService;
    
    constructor(private app:Application){
        this.comp_service = new CompradorService();
        this.routes();
    }

    private routes(){
        this.app.route("/compradores").get(this.comp_service.getAll);
        this.app.route("compradoreliminado/:id").delete(this.comp_service.deleteOne);
        this.app.route("/comprador").post(this.comp_service.NewOne);
    }
}