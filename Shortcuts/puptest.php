<!DOCTYPE HTML>
<html lang="en">
	<head>
		<title>StadiaIcons – Test</title>
		<meta name="Description" content="This page is used to test for popup authorization.">
		
		<script>
			window.addEventListener('load', function () {
				if (this.opener !== null)
				{
					this.opener.postMessage({'loaded': true}, "*");
					this.close();
				}
				else
				{
					window.setTimeout(function ()
					{
						this.location.replace("/");
					}, 2000);
				}
			});
		</script>
		
		<link rel="stylesheet" href="/style.css">
	</head>
	<body>
		<main>
			<section style="display: flex;">
				<div>
						<h1>This window should close shortly.</h1>
						<p>Please do not close it yourself.</p>
				</div>
			</section>
		</main>
		<?php include './inc/footer.php' ?>
	</body>
</html>