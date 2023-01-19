export function retornaParametros(req: any) {
    if (req.query.numos && req.query.subos) {
        return `${req.query.numos}-${req.query.subos}`
    }
    else if (req.query.numos) {
        return req.query.numos;
    }
    else if(req.query.numpedido){
        return req.query.numpedido
    }
    else if(req.query.search){
        return req.query.search;
    }
    return "";
    
}