import server from "./App.js";
const port = process.env.PORT || 3000;
server.listen(port, () => console.log("Servidor rodando:", port));