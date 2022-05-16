<?php
    class Database {
        public $con;
        private $dbhost = 'localhost';
        private $dbuser = 'DBUSER2021';
        private $dbpass = 'DBPSWD2021';
        private $dbname = 'dbsew2022';
        function __construct(){
        }
        public function connect_db(){
            $this->con = mysqli_connect($this->dbhost, $this->dbuser, $this->dbpass, $this->dbname);

            if(mysqli_connect_error()){
				die("Conexión a la base de datos falló " . mysqli_connect_error() . mysqli_connect_errno());
			}
        }

        public function sanitize($var){
            $return = mysqli_real_escape_string($this->con, $var);
            return $return;
          }

    }
?>