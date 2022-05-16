<?php
include ("./config.php");
class Cart {
    private $db;

    function __construct() {
      $this -> db = new Database();
      $this -> db -> connect_db();
    }

    public function execute_query($query) {
      return mysqli_query($this->db->con, $query);
    }

    public function create_products_to_buy($cart) {
      $result = "";
      $prod_count = count($cart);
      for ($i = 0; $i < $prod_count; $i++) { 
        $product_to_buy = $cart[$i];

        $id = intval($product_to_buy["product_id"]);
        $amount = intval($product_to_buy["amount"]);
        $query = "INSERT INTO product_to_buy (product_id, amount) VALUES ({$id}, {$amount})"; 

        $result .= $this->execute_query($query);
      }
      return $result;
    }

    public function create_invoice($prod_count, $user_id, $total, $direction) {
      $product_ids = array();
      $result = $this->execute_query("SELECT id FROM product_to_buy ORDER BY id DESC LIMIT {$prod_count}");
      
      while($row = mysqli_fetch_object($result)) {        
        array_push($product_ids, $row->id);
        $last_id = $row -> id;
        $query = "INSERT INTO invoices (product_to_buy_id, user_id, total, direction) VALUES ({$last_id}, {$user_id}, {$total}, {$direction})"; 
        $this->execute_query($query);
      }
    }
}
?>