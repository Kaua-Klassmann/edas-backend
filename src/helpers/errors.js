export const jsonSyntaxError = (err, req, res, next) => {
    if( err instanceof SyntaxError && 
        err.status === 400 && 
        'body' in err) {
        
        //console.log(err);
        return res.status(400).json({error: "Erro de sintaxe do JSON"});
    };
    
    next();
};