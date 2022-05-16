<?php
include ("./config.php");
class Products {
    private $db;

    function __construct() {
        $this -> db = new Database();
        $this -> db -> connect_db();
    }

    public function execute_query($query) {
        return mysqli_query($this->db->con, $query);
    }

    public function get_products_styled($query) {
        $output = '<div class="products_shop_container">';
        $result = $this->execute_query($query);

        while($row = mysqli_fetch_object($result)) {
            $output .= '
            <div class="product_item" onclick="products.showProduct()">
                <div class="product_img">
                  <img src="'.$row->img_link.'">
                </div>
                <div class="product_info">
                  <p class="product_price" >'.$row->price.' €</p> 
                  <p class="product_name">'.$row->name.'</p>    
                  <p hidden id="'.$row->id.'">    
                </div>
            </div>';
        }
        $output .= '</div>';

        return $output;
    }

    public function get_list_item_products($pruduct_array) {
      $output = '';

      for ($i = 0; $i < count($pruduct_array); $i++) { 
        $id = $pruduct_array[$i];

        $query = "SELECT * FROM products WHERE id = {$id}"; 

        $result = $this->execute_query($query);
        while($row = mysqli_fetch_object($result)) {
          $output .= '
          <li class="product_list_item">
              <img src="'.$row->img_link.'" alt="Product img">
              <p class="list_product_name">'.$row->name.'</p>  
              <p class="list_product_price" >'.$row->price.' €</p> 
          </li>';
        }
      }
      return $output;
  }

  public function get_product_styled($query) {
      $output = '';
      $result = $this->execute_query($query);
      while($row = mysqli_fetch_object($result)) {
          $output .= '
          <div class="single_product">
            <div class="single_product_item"">
                <div class="single_product_img">
                  <img src="'.$row->img_link.'">
                </div>
                <section class="single_product_info">
                  <h2 class="single_product_name">'.$row->name.'</h2>
                  <hr>    
                  <p class="single_product_name">'.$row->description.'</p> 
                  <p class="single_product_price" >Precio: '.$row->price.' €</p>
                  <div id="user_product_options" >
                    <label for="cantidad">Cantidad:</label>
                    <input type="number" id="cantidad" name="cantidad" 
                      value="1" min="1" max="10">
                  </div>
                  <button class="buy_btn" id="buy" name="buy"  onclick="products.addToCart('.$row->id.')">Añadir al Carrito</button>

                  <p hidden id="'.$row->id.'">  
                </section>
            </div>
            <div class="back_btn"> 
              <button onclick="products.loadData()">Regresar</button>
            </div>
          </div>
          ';

      }
      return $output;
  }

  public function insert_products($products) {
    $products = $_POST['products'];
    for ($i = 0; $i < count($products); $i++) {
        $product = $products[$i];

        $name = $product[0];
        $price = $product[1];
        $img_link = $product[2];
        $desc = $product[3];
         
        $query = "INSERT INTO products (name, price, img_link, description, stock) VALUES ('{$name}', {$price}, '{$img_link}', '{$desc}', 1)";
        $this->execute_query($query);        
    }
  }


}
?>