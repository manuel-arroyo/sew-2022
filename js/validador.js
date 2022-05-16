"use strict";
class Validador {
    constructor() {        
    }    
    validarRegistro() {
        var form = document.getElementById("form_register");

        let errors = true;
        if(form){
            // Valida name, mostrando los mensajes mas críticos primero.
            let nameInput = form.elements[0];
            if(nameInput.value.length >= 32) {
                nameInput.placeholder = "Nombre demasiado largo."; 
            } else if(nameInput.value.length <= 2) {
                nameInput.placeholder = "Nombre demasiado corto";   
            }
            
            // Valida email, mostrando los mensajes mas críticos primero.
            let emailInput = form.elements[1];
            if(emailInput.value.length >= 255 ) {
                emailInput.placeholder = "Correo electrónico demasiado largo.";        
                errors = false;
            }else if(emailInput.value.length <= 2 ) {
                emailInput.placeholder = "Correo electrónico demasiado corto.";
            } else if(!(emailInput.value.includes("@") && emailInput.value.includes("."))) {
                emailInput.placeholder = "Correo electrónico incorrecto.";
            }

            // Valida contraseña, mostrando los mensajes mas críticos primero.
            let passwordInput = form.elements[2];
            let passwordConfirmInput = form.elements[3];
            if(passwordInput.value != passwordConfirmInput.value) {
                passwordInput.placeholder = "Las contraseñas no coinciden";
            }else if(passwordInput.value.length >= 255 ) {
                passwordInput.placeholder = "Contraseña demasiado larga.";
            }else if(passwordInput.value.length < 8 ) {
                passwordInput.placeholder = "Contraseña demasiado corta.";
            }
        }
        else{
            console.log("No se ha encontrado el formulario...");
        }
        return errors;
    }

    validarLogin() {
        var form = document.getElementById("form_login");

        let no_errors = true;
        if(form != undefined){
            let nameInput = form.elements[0];
            if(nameInput.value.length <= 0) {
                nameInput.placeholder = "El nombre no puede estar vacío.";        
                no_errors = false;
            }

            let passwordInput = form.elements[1];
            if(passwordInput.value.length <= 0 ) {
                passwordInput.placeholder = "La contraseña no puede estar vacía";        
                no_errors = false;
            }
        } else {
            console.log("No se ha encontrado el formulario...");
        }
        return no_errors;
    }
}
var validador = new Validador();
