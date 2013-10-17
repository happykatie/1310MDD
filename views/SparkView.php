<?php

class SparkView {
	
	public function showHeader() {
		include "views/header.inc";
	} //showHeader
	
	public function showFooter() {
		include "views/footer.inc";
	} //showFooter
	
	//Usering template, passing data into array
	public function show ($template, $data = array()) {
		
		$templatePath = "views/${template}.inc";
		//If file exists, include template path (dynamic variable)
		if (file_exists($templatePath)) {
			include $templatePath;
		}
	
	}
}

?>