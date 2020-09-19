<?php
	if( !isset( $_GET['code'] ) || !$code = filter_var( $_GET['code'], FILTER_SANITIZE_NUMBER_INT ) )
	{
		$code = 404;
		$errors = ['The fullName parameter is missing or invalid.'];
	}
?>
<!DOCTYPE HTML>
<html lang="en">
	<head>
		<title>StadiaIcons – Error <?php echo $code ?></title>
		<meta name="Description" content="This page is used to test for popup authorization.">
		
		<link rel="stylesheet" href="/style.css">
	</head>
	<body style="">
		<main>
			<section style="display: flex;">
				<div>
					<h1 style="font-family: 'Google Sans','Product Sans','Roboto',sans-serif;">Error <?php
						echo $code . ': ';
						switch( $code )
						{
							case 400:
								echo'Bad Request';
							case 401:
								echo'Unauthorized';
							case 403:
								echo'Forbidden';
							case 404:
								echo'Not Found';
						}
					?></h1>
					<p><a href="/">Click Here</a> to return to the home page.</p>
				</div>
			</section>
		</main>
		<?php include 'footer.php' ?>
	</body>
</html>