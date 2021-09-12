



function login(){
    var user = $("#user").val();
    loginSocket(user);
};

function enviarMensaje(){
    var mensaje = $("#mensaje").val();
    var usuario = $("#user").val();
    enviarMensajeSocket(usuario,'every',mensaje);
    
}
function verUsuarios(){
    ver_usuarios_logueados();
}

function crearMensaje(usuario, mensaje){
    return `
    <li><strong>${usuario}: </strong> ${mensaje} </li>
    `;
}

$('ul li').click(()=>{
    var link_class = $(this).find('a').attr('user'); // find this class name
    alert("link class name  ="+ link_class);
});

  