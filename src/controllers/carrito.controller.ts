import {Application} from "express";
import { CarritoService } from "../services/carrito.service";

export class CarritoController{
    
    private car_service: CarritoService;

    constructor(private app: Application){
        this.car_service = new CarritoService();
        this.routes();
    }

    private routes(){
        this.app.route("/carritos").get(this.car_service.getAll);

        this.app.route("/carrito").post(this.car_service.NewOne);

        this.app.route("/carrito/:id").delete(this.car_service.deleteOne);

        
    }
}