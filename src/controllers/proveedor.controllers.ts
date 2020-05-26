import {Application} from "express";
import {ProveedorService} from "../services/proveedor.service";

export class Proveedorcontroller{
    private prov_service: ProveedorService;
    constructor(private app:Application){
        this.prov_service = new ProveedorService();
        this.routes(); 
    }
    private routes(){
        this.app.route("/proveedores").get(this.prov_service.getAll);
        this.app.route("/proveedores/productos").get(this.prov_service.getAllWProductos);
        
        this.app.route("/proveedor/:id").delete(this.prov_service.deleteOne);
        this.app.route("/proveedor").post(this.prov_service.NewOne);
        
        /*this.app.route("/proveedor/:id")
        .get(this.prov_service.getid)
        .put(this.prov_service.actualizar);
        */
    }
}