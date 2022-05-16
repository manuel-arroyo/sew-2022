"use strict";
class Util {
    constructor() {
    }
    loadHtmlFiles() {
        $(".nav-placeholder").load("/html/nav_bar.html");
        $("footer").load("/html/footer.html");
    }
    initializateCart() {
        if (localStorage.cart == undefined || localStorage.cart == "") {
            localStorage.cart = JSON.stringify([]);
        }
    }
    // Just for debugger optimization
    clearCart(){
        localStorage.cart = JSON.stringify([]);
    }
    initializate(){
        this.loadHtmlFiles();
        this.initializateCart();
    }

}
var util = new Util();
$(document).ready(function () {
    util.initializate();
})