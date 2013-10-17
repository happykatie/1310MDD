 

<div class="container main-frame" ng-controller="mainController">
    
    <!-- FIREBASE --- WORK IN PROGRESS
    <div id="loginDiv">
	  <span ng-show="user">
	    {{user.name}} | <a href="#" ng-click="logout()">Logout</a>
	  </span>
	  <a href="#" ng-hide="user" ng-click="login()">Login</a>
	</div>
	-->
	<div class="col-sm-6">
	
		<div id="login"><!-- -->

		  <h2>Please login below.</h2>
		  
		  <!-- POST keeps username/password from showing up in url -->
		  <form action="?" method="post">
			<input type="hidden" name="formtoken" value="<?php echo $formtoken; ?>" />
		  
		  <div id="formelm">
		  	<label for="username" class="fixedwidth">Username:</label>
			<input type="text" name="username" id="username" placeholder="username" maxlength="20" size="20" autofocus/><br />
		  </div>
		  <div id="formelm">
		  	<label for="password" class="fixedwidth">Password:</label>
			<input type="password" name="password" id="password" maxlength="20" size="20" /><br />
		  </div>
		  
		  <input id="submit" type="submit" value="Login" />
		  
		  
		  </form>
		  
		  <!--<h3>Don't have an account? <a href="/">Sign Up</a>.</h3>-->
		  
		</div> <!-- end login -->
		
	</div> <!-- end col-sm-6 -->

</div> <!-- end container -->