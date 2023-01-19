import jasonwebtoken, { JwtPayload, SignOptions } from "jsonwebtoken";
const path: string = "[/Services/TokenService/";

export class Token {
    static CeateToken(code: string) {
        try {
            const payload: JwtPayload = {
                id: code
            };
            const token: string = jasonwebtoken.sign(payload,"PPx4+QItjv33yVahgbBMVAPzuDN4/xCmiilTNu31RAytkGbpsb/Pm8+QUJ38kgExshP2DfhrWN0Ow/nAOeVo7RMYAxuFAflNIUhzgPvLkiFpX6DlHwur1ANAyuR4WGqKhtx+IJINWoJ73K3CXKJXH9vFiSNJQKR6wrK6KlpUiaGfpfNolOHYGfcN0omPfdtP/4KPUOYN/TjIm3VJ373kWbpHv37xufeQwf1QGntNzy7sO5iscQxPh8O3JBiIvC57ZmTZqt6GvW/uUah3nTwayUDvXIQI3J0x5z+g/rxpzqwjcY+UeCWfnQzsiCBd5HPdllEmOfFCvhzW+KIyaWCq/Q==");
            return token;
        }
        catch(e: any){
            throw new Error("Erro na criação do Token" + e.message);
        }
}

    static VerificaToken(token: string) {
        try {
            const payload: string | JwtPayload = jasonwebtoken.verify(token, process.env.SECRET as string);
            return payload;
        }
        catch (e) {
            throw new Error("Token Inválido");
        }
    }

    static AdquirirTokenRequest(tokenUnhandled: string): string {
        try {
            return tokenUnhandled.replace("Bearer ", "");
        }
        catch (e) {
            throw new Error("Token Inválido!");
        }
    }
} 
//console.log(Token.CeateToken("asd"));