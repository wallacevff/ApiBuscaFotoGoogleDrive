const gdrive = require("../googleDriveFunctions");

const fs = require('fs').promises;
import { retornaParametros } from "../components/variaveisReq";
export class OSController {
    static async FotoOsOuPedido(req: any, res: any) {
        try {
            var str: string = (retornaParametros(req) as unknown) as string;
            if (str == "") {
                res.json({ status: 400, mensagem: "Foto da OS não encontrata" });
                return;
            }
            //console.log(str);
            const typesImg = ["", ".png", ".jpg", "-OS.jpg", "-OS.png"];
            //var img = ""
            var i: any;
            let count = 0;
            var img: any = await new Promise((resolve, reject) => {
                typesImg.forEach(async (type, index) => {
                    console.log(`${str}${type}`)
                    i = await gdrive(`${str}${type}`)
                    if (typeof (i) != 'undefined') {
                        return resolve(i as any);
                    }
                    if ((i == "" || !i) && count == typesImg.length - 1) {
                        reject(new Error("Imagem não encontrada"));
                    }
                    count++;
                });



            });
            //console.log(img)
            var a = Buffer.from(img.media).toString("base64");
            if (req.query.flag == "html") {
                res.end(`<html<head></head><body><img src="data:image/jpg;base64,${a}"></body></html>`);
                return;
            }
            if (req.query.flag == "json") {
                res.json({ id: img.id, media: `data:image/jpg;base64,${a}`});
                return
            }
            
            res.writeHead(200, {
                'Content-Type': 'image/jpg',
                'Content-Length': img.media.length
            });
            
           
            res.end(img.media);
            return;
        }
        catch (e) {
            res.json({ status: 400, mensagem: (e as any).message });
        }
    }
}