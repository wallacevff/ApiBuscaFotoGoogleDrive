import { Express } from "express";
import {OSController as controller} from "../controllers/OSController";
import { AuthMiddlware } from "../middlewares/AuthMiddlware";
export class OSRouter {
    static Route(app : Express){
        app.route("/osOuPedido/").get(AuthMiddlware.Bearer,controller.FotoOsOuPedido);
    }
}