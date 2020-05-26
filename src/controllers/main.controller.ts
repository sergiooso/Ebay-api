import {Application} from "express";
import {MainService} from "../services/main.service";

export class mainController{
    private mainservices:MainService;
    constructor(private app:Application){
         this.mainservices = new MainService();
         this.routes();
    }
    public routes(){
        this.app.get("/",this.mainservices.welcome);
    }
}