<?php
 include 'products.php';
 $crud = new Products();

if(isset($_POST["action"]))
 {
    #Si la accion es cargar, se devuelven todos los productos
    if($_POST["action"] == "Load") {
        echo $crud->get_products_styled("SELECT * FROM products ORDER BY id DESC");
    }

    if($_POST["action"] == "Delete") {
        echo $crud->execute_query("DELETE FROM products WHERE `products`.`id` = '".$_POST["product_id"]."'");
    }

    if($_POST["action"] == "Show")  {
        echo $crud->get_product_styled("SELECT * FROM products WHERE id = '".$_POST["product_id"]."'");
    }

    if($_POST["action"] == "Get")  {
        echo $crud->get_list_item_products($_POST["product_ids"]);
    }

    if($_POST["action"] == "Insert")  {
        echo $crud->insert_products($_POST["products"]);
    } 
 }  
?>