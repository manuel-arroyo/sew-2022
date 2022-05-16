"use strict";
class Cart {
     constructor() {  
         this.rol = "CLIENTE"
     }

     loadCart() {
          if (JSON.parse(localStorage.cart).length > 0) {
               let product_ids = JSON.parse(localStorage.cart).map(e => e.product_id);
               var action = "Get";
               $.ajax({
                    url:"/php/product_handler.php",  
                    method:"POST",  
                    data:{
                         action:action,
                         product_ids: product_ids
                    },  
                    success:function(data) {
                         $('#cart_list').html(data);
                         cart.calculateTotal();                    
                   }  
               });
          }
     }

     calculateTotal() {
          let units = JSON.parse(localStorage.cart).map(e => e.amount);
          let items = $("#cart_list")[0].children;
          let total = 0;

          for (let i = 0; i < units.length; i++) {
               let cantidad = document.createElement("p");
               cantidad.textContent =   units[i];
               items[i].appendChild(cantidad);
               let price = items[i].children[2].innerHTML;
               total += units[i] * parseInt(price.slice(0,-2));
               
          }

          $("#total_amout").val(total +"€");
     }

     removeFromCart(cart_index) {
          debugger
          let storedCart = JSON.parse(localStorage.cart);
          storedCart.splice(cart_index,1);
          localStorage.cart = JSON.stringify(storedCart);
          this.loadCart();
     }

     saveProductsToBuy(cart, user_id, total, direction) {
          var action = "Create";
          let self = this;
          $.ajax({
               url:"/php/cart_handler.php",  
               method:"POST",  
               data:{
                    action: action,
                    cart: cart
               }, 
               success: function(data) {
                    self.createInvoice(cart.length, user_id, total, direction);
                    console.log("Create products to buy: Success");                   
               }
          });
     }

     createInvoice(prod_count, user_id, total, direction) {
          var action = "Invoice";
          $.ajax({
               url:"/php/cart_handler.php",  
               method:"POST",  
               data:{
                    action: action,
                    user_id: user_id,
                    total: total,
                    direction: direction,
                    prod_count: prod_count
               }, 
               success: function(data) {
                    util.clearCart();
                    window.location.pathname = "/html/purchased.html";
                    console.log("Create products to buy: Success");                   
               }
          });
     }

     finish() {
          //obtenemos direccion
          let direction = $("#direction")[0].value;
          //obtenemos total
          let total = parseFloat( ($("#total_amout")[0].value).slice(0,-2));
          //obtenemos id usuario
          let user_id = parseInt(localStorage.id);

          let cart = JSON.parse(localStorage.cart);
          this.saveProductsToBuy(cart, user_id, total, direction);
     }

     initialize() {
        this.loadCart();
     }


}
var cart = new Cart();
$(document).ready(function(){ 
     cart.initialize();
});
