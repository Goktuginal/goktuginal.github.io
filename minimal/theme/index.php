<!DOCTYPE html>

<!-- https://goktuginal.github.io/minimal/theme -->

<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="shortcut icon" href="assets/ico/favicon.png">

    <title>Personal Page</title>

    <!-- Bootstrap core CSS -->
    <link href="assets/css/bootstrap.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="assets/css/main.css" rel="stylesheet">
	<link rel="stylesheet" href="assets/css/font-awesome.min.css">

    <script src="assets/js/jquery.min.js"></script>
	<script src="assets/js/modernizr.custom.js"></script>
	

	
    <link href='http://fonts.googleapis.com/css?family=Oswald:400,300,700' rel='stylesheet' type='text/css'>
    <link href='http://fonts.googleapis.com/css?family=EB+Garamond' rel='stylesheet' type='text/css'>

    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="assets/js/html5shiv.js"></script>
      <script src="assets/js/respond.min.js"></script>
    <![endif]-->
  </head>

  <body data-spy="scroll" data-offset="0" data-target="#theMenu">
		
	<!-- Menu -->
	<nav class="menu" id="theMenu">
		<div class="menu-wrap">
			<h1 class="logo"><a href="index.html#home">Minimal</a></h1>
			<i class="icon-remove menu-close"></i>
			<a href="#home" class="smoothScroll">Home</a>
			<a href="#about" class="smoothScroll">About</a>
			<a href="#portfolio" class="smoothScroll">Portfolio</a>
			<a href="#contact" class="smoothScroll">Contact</a>
			<a href="#"><i class="icon-facebook"></i></a>
			<a href="#"><i class="icon-twitter"></i></a>
			<a href="#"><i class="icon-dribbble"></i></a>
			<a href="#"><i class="icon-envelope"></i></a>
		</div>
		
		<!-- Menu button -->
		<div id="menuToggle"><i class="icon-reorder"></i></div>
	</nav>


	
	<!-- ========== HEADER SECTION ========== -->
	<section id="home" name="home"></section>
	<div id="headerwrap">
		<div class="container">
			<br>
			<div class="row">
				<h1>PERSONAL PAGE</h1>
				<br>
				<h3>Hello, I'm Göktuğ</h3>
				<br>
				<br>
				<div class="col-lg-6 col-lg-offset-3">
				</div>
			</div>
		</div><!-- /container -->
	</div><!-- /headerwrap -->
	
	
	
	<!-- ========== ABOUT SECTION ========== -->
	<section id="about" name="about"></section>
	<div id="f">
		<div class="container">
			<div class="row">
				<h3>ABOUT ME</h3>
				<p class="centered"><i class="icon icon-circle"></i><i class="icon icon-circle"></i><i class="icon icon-circle"></i></p>
				
				<!-- INTRO INFORMATIO-->
				<div class="col-lg-6 col-lg-offset-3">
					<p>ACADEMIC HISTORY
					YEDITEPE UNIVERSITY
					Bachelor of Science in Computer, 2010-2015
					</p>
					<p>
					YEDITEPE UNIVERSITY
					Master of Science in Computer, 2015-2018
					- Academic Excellence in Neural Network and Machine Learning
					- Published a paper on Computer Architecture and Machine Learning Techniques - Presented paper in Takayama, Japan
					</p>
					<p>
					UNIVERSITAT POLITÈCNICA DE VALÈNCIA
					Master of Science in Artificial Intelligence and Image Processing, 2020-PRESENT
					</p>
					<p> 
					- Advanced C and C# Language
					- Python Language (CPython)
					- HTML5, CSS, Javascript, PHP
					- Tensorflow, Pytorch, PyCharm
					- Neural Network, Machine Learning
					- Language education at Bournemouth Language Academy - Advanced english language proved by IELTS
					</p>
				</div>								
			</div>
		</div><!-- /container -->
	</div><!-- /f -->
	

	<!-- ========== CAROUSEL SECTION ========== -->	
	<section id="portfolio" name="portfolio"></section>
	<div id="f">
		<div class="container">
			<div class="row centered">
				<h3>SOME PROJECTS</h3>
				<p class="centered"><i class="icon icon-circle"></i><i class="icon icon-circle"></i><i class="icon icon-circle"></i></p>
				
				<div class="col-lg-6 col-lg-offset-3">
					<div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
						<!-- Wrapper for slides -->
						<div class="carousel-inner">
							<div class="item active centered">
								<img class="img-responsive" src="assets/img/c1.png" alt="">
							</div>
							<div class="item centered">
								<img class="img-responsive" src="assets/img/c2.png" alt="">
							</div>
							<div class="item centered">
								<img class="img-responsive" src="assets/img/c3.png" alt="">
							</div>
						</div>
						<br>
						<br>
						<ol class="carousel-indicators">
						    <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
						    <li data-target="#carousel-example-generic" data-slide-to="1"></li>
						    <li data-target="#carousel-example-generic" data-slide-to="2"></li>
						</ol>
					</div>
				</div><!-- col-lg-8 -->
			</div><!-- row -->
		</div><!-- container -->
	</div>	<!-- f -->

	<?php include 'contact.php';  ?> 

	

    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
	<script src="assets/js/classie.js"></script>
    <script src="assets/js/bootstrap.min.js"></script>
    <script src="assets/js/smoothscroll.js"></script>
	<script src="assets/js/main.js"></script>
</body>
</html>
