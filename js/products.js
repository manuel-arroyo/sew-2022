"use strict";
class Products {
     constructor() {  
         this.rol = "CLIENTE"
     }

     loadData() {  
          var action = "Load";  
          $.ajax({  
               url:"/php/product_handler.php",  
               method:"POST",  
               data:{action:action},  
               success:function(data) {
                $('#products_container').html(data);  
               }  
          });
     }

     showProduct() {
          let id = parseInt(event.currentTarget.childNodes[3].childNodes[5].id);
          var action = "Show";  
          $.ajax({  
               url:"/php/product_handler.php",  
               method:"POST",  
               data:{
                    action: action,
                    product_id: id
               },  
               success:function(data) {
                    $('#products_container').html(data);
                    let id = parseInt($("#user_product_options")[0].parentElement.lastChild.id);

                    if (localStorage.session == "ADMIN") {
                         $("#user_product_options").html('<button name="delete" onclick="products.deleteProduct('+id+')">Eliminar producto</button>');
                    }
               }  
          });
     }

     deleteProduct(id) {
          var action = "Delete";  
          $.ajax({  
               url:"/php/product_handler.php",  
               method:"POST",  
               data:{
                    action: action,
                    product_id: id
               },  
               success:function(data) {
                    console.log("Deleted")
               }
          });
          this.loadData();
     }

     addToCart(product_id){
          let amount = $("#cantidad")[0].value;
          let storedCart = JSON.parse(localStorage.cart);
          storedCart.push({
               product_id: product_id,
               amount: amount});
          localStorage.cart = JSON.stringify(storedCart);
          this.loadData();
     }

     loadAdminFunctions() {
          if (localStorage.session == "ADMIN"){
               $("#import_products").html('<label for="xml_import"></label>\
               <input type="file" class="oculto" id="xml_import"\
                    name="xml_import" accept="text/xml" onchange="products.loadXMLFile(this.files)">\
                    <button id="import_btn">Importar Pedido</button>');
          }

          $("#import_btn").click(function() {
               $("#xml_import").click();
          });

     }
     loadXMLFile(file) {
          let reader = new FileReader();

          for (let i = 0; i < file.length; i++) {               
               reader.readAsText(file[0]);
               let self = this;
               reader.onload = function(e) {
                    let xmlToParse = reader.result;
                    let xmlDoc = jQuery.parseXML(xmlToParse);
                    self.saveXML(xmlDoc);
               };
               reader.onerror = function() {
                    console.log(reader.error);
               };    
          }
     }

     saveXML(xmlDoc) {
          let products = [];
          let lotes = xmlDoc.getElementsByTagName("pedido")[0].getElementsByTagName("lotes")
          for (let i = 0; i < lotes.length; i++) {
               let productos = lotes[i].getElementsByTagName("productos")[0].getElementsByTagName("producto");
               for (let j = 0; j < productos.length; j++) {
                    let producto = productos[j];
                    // Si hay stock lo metemos en la bbdd
                    if (producto.attributes[0]) {
                         products.push([
                              producto.getElementsByTagName("nombre")[0].textContent,
                              parseInt(producto.getElementsByTagName("precio")[0].textContent),
                              producto.getElementsByTagName("img_link")[0].textContent,
                              producto.getElementsByTagName("descripcion")[0].textContent
                         ]);
                    }
               }
          }

          var action = "Insert";  
          if (products.length > 0) { 
               $.ajax({  
                    url:"/php/product_handler.php",  
                    method:"POST",  
                    data:{
                         action: action,
                         products: products
                    },  
                    success:function(data) {
                         debugger
                         console.log("Data loaded");
                    }  
               });
          }
          this.loadData();
     }

     initialize() {
          this.loadData();
          this.loadAdminFunctions();
     }


}
var products = new Products();
$(document).ready(function(){ 
     products.initialize();
});