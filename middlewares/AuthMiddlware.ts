import { Token } from "../Services/TokenService";
import { Request, Response } from "express";


class AuthMiddlware {
    static Bearer = (req: Request, res: Response, next: CallableFunction) => {
        try {
            const token = Token.AdquirirTokenRequest(req.headers.authorization as string)
            Token.VerificaToken(token);
        }
        catch (e) {
            return res.json({ erro: (e as Error).message });
        }
        return next()
    }
}
export { AuthMiddlware }