<?php

//handles database access
class mainController {
	
	private $db;
	
	public function __construct($dsn, $user, $pass) {
		try {
			$this->db = new \PDO($dsn, $user, $pass);
		}
		catch (\PDOException $e) {
			var_dump($e);
		}
	} //__construct
	
	/**
	* @return array Records from the database as an array of arrays
	*/
	
	
	//--- GET USER BY USERNAME PASSWORD ------------------------------------
	public function getUserByNamePass($name, $pass) {
	
		//prepare SQL SELECT statement, grab info from db
		$stmt = $this->db->prepare("
			SELECT userId AS id, username AS name, firstname AS fname
			FROM users
			WHERE (username = :name)
				AND (password = MD5(CONCAT(usersalt,:pass)))
		");
		
		//If statement is executed, it's going to place info into array 
		if ($stmt->execute(array(':name' => $name, ':pass' => $pass))) {
			//fetch rows
			$rows = $stmt->fetchAll(\PDO::FETCH_ASSOC);
			//if I get 1 user
			if (count($rows) === 1) {
				//show that row of 1st user
				return $rows[0];	
			}
		}
		
		return FALSE;
	}
	
	
		
}

?>