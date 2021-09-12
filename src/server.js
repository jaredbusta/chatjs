const express = require("express");
const { copyFileSync } = require("fs");
const app  = express();


const http = require("http");
const server = http.createServer(app);
server.listen(3000);
// console.log(__dirname+  "/frontend");
app.use(express.static(__dirname+  "/frontend"));

const socketIO = require("socket.io")();
const io = socketIO.listen(server);
/**
 * Control de usuarios conectados
 */
function addUsers(socket, datos){
    userOnId[socket.id] = datos.usuario;
    if(idsOnUser[datos.usuario]==null){
        idsOnUser[datos.usuario] = new Array();
        idsOnUser[datos.usuario].push(socket.id);
    }else{
        idsOnUser[datos.usuario].push(socket.id);
    }
}

userOnId=new Array();
idsOnUser=new Array();

io.on('connect',(socket)=>{
    console.log(`Nueva conexion id:  ${socket.id}`);    
    socket.on('datos_usuario',(datos)=>{
        addUsers(socket, datos);   
        io.emit('nuevo_usuario',{"user":datos.usuario}); //envia al cliente
    });

    socket.on('send_message',(data)=>{
        io.emit('response_message',{'from': data.from,'message':data.message});
    });

    socket.on('send_private_message',(data)=>{
        
        id_socket  = userOnId[data.to];
        io.to(id_socket).emit('response_message',{'from': data.from,'message':data.message});
    });

    socket.on('users_logged',()=> {
        console.log(userOnId);
        socket.emit("lista_logged",{'data':userOnId});
    });

    socket.on('disconnect',(reason)=>{
        console.log("se deconecto " + userOnId[socket.id]);
        try{
            user = userOnId[socket.id];
            delete idsOnUser[user];
            delete userOnId[socket.id];
        }
        catch(e){
            console.error(e);
            console.log("No usuarios logueados");
        }
        
    });
});