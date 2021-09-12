const socket = io.connect();

socket.on('nuevo_usuario',(data)=>{
    $("#resultado_login").append( `<li> <a class='user'>  ${data.user}</a></li>`);
});

socket.on('response_message',(data)=>{
    $("#cajita_chat").append(crearMensaje(data.from,data.message));
});

socket.on("lista_logged",(data)=>{
    console.log(data);
})

function loginSocket(user){
    socket.emit('datos_usuario',{
        "correo" : user + "@gmail.com",
        "usuario": user,
    });
};

function enviarMensajeSocket(from,to, message){
    socket.emit('send_message',{'from': from,  'to':to,  'message':message});   
}

function ver_usuarios_logueados(){
    socket.emit('users_logged',{}); 
}
