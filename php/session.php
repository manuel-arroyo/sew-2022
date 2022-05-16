<?php
include ("./config.php");
class Session {
    private $db;

    function __construct() {
        $this -> db = new Database();
        $this -> db -> connect_db();
    }

    public function execute_query($query) {
        return mysqli_query($this->db->con, $query);
    }

    public function get_user($username, $password) {
        $output = '';
        $result = $this->execute_query("SELECT rol, id FROM users WHERE username = '{$username}' and password = '{$password}'");

        while($row = mysqli_fetch_object($result)) {
            $output .= json_encode($row);
        }
        return $output;
    }
    public function get_product_styled($query) {
        $output = '';
        $result = $this->execute_query($query);

        while($row = mysqli_fetch_object($result)) {
            $output .= '
            <div class="single_product_item"">
                <div class="single_product_img">
                  <img src="'.$row->img_link.'">
                </div>
                <div class="single_product_info">
                  <h2 class="single_product_name">'.$row->name.'</h2>    
                  <p class="single_product_name">'.$row->description.'</p> 
                  <p class="single_product_price" >Precio: '.$row->price.' €</p> 
                  <label for="cantidad">Número de elementos:</label>
                  <input type="number" id="cantidad" name="cantidad" 
                    value="1" min="1" max="10">
                  <button id="buy" name="buy"  onclick="products.addToCart('.$row->id.')">Comprar</button>
                  <p hidden id="'.$row->id.'">  
                </div>
                <button onclick="products.loadData()">Regresar</button>
            </div>';

        }
        return $output;
    }
}
?>