"use strict";
class Session {
    constructor() {  
        this.rol = "CLIENTE"
    }
    checkSession() {
        if (localStorage.session == undefined 
            && window.location.pathname == "/html/cart.html"){
            if (window.location.pathname != "/html/login.html" 
              && window.location.pathname != "/html/register.html") {
                window.location.pathname = "/html/login.html";

            }
        }
    }

    closeSession() {
        localStorage.session = undefined;
        localStorage.id = undefined;
        localStorage.cart = JSON.stringify([]);
        window.location.pathname = "/html/index.html";
    }

    /*Esta función edita los formularios para que hagan llamadas
    mediante ajax y no llamen directament a la url de destino */
    attachFormSubmiters() {
        this.attachLogSubmitter();
        this.attachRegisterSubmitter();
    }
    
    attachLogSubmitter() {
        $("#form_login").submit(function(event) {            
            event.preventDefault();
            if (validador.validarLogin()) {                
                let $form = $(this);
                let url = $form.attr('action');
                
                var posting = $.post(url, {
                    username: $('#username').val(),
                    password: $('#password').val(),
                    action: "Login"
                });

                posting.done(function(data) {
                    localStorage.session = JSON.parse(data).rol;
                    localStorage.id = JSON.parse(data).id;      
                    window.location.pathname = "/html/index.html";
                });
            }
        });
    }

    attachRegisterSubmitter() {
        $("#form_register").submit(function(event) {            
            event.preventDefault();
            debugger
            if (validador.validarRegistro()) {                
                let $form = $(this);
                let url = $form.attr('action');
                
                var posting = $.post(url, {
                    username: $('#username').val(),
                    email: $('#email').val(),
                    password: $('#password').val(),
                    action: "Register"
                });

                posting.done(function(data) {
                    window.location.pathname = "/html/login.html";
                });
            }
        });
    }    

    loadMenu() {
        if($("#session_menu")){
            if (localStorage.session == "ADMIN" || localStorage.session == "CLIENT"){
                $("#session_menu").html('<a onclick="session.closeSession()">\
                        Cerrar Sesión</a>');
            } else {
                $("#session_menu").html('<a href="/html/login.html">\
                        Iniciar Sesión</a>\
                    <a href="/html/register.html">\
                    Registrarse</a>')
            }


        }
    }


}
var session = new Session();

$(document).ready(function () {
    session.checkSession();
    session.attachFormSubmiters();
    session.loadMenu();
})