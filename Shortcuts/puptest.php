<!DOCTYPE HTML>
<html lang="en">
	<head>
		<title>StadiaIcons – Test</title>
		<meta name="Description" content="This page is used to test for popup authorization.">
		
		<script>
			window.addEventListener('load', function () {
				this.opener.postMessage({'loaded': true}, "*");
				this.close();
			});
		</script>
	</head>
	<body style="margin: 0; background-color: #202124; font-family: 'Roboto',sans-serif;">
		<main style="display: flex; flex-direction: column; text-align: center; align-items: center; justify-content: center; flex-wrap: wrap; box-sizing: border-box; min-height: 100vh; padding: 3vw; color: #fff;">
			<h1 style="font-family: 'Google Sans','Product Sans','Roboto',sans-serif;">This window should close shortly.</h1>
			<p>Please do not close it yourself.</p>
		</main>
		<footer style="padding: 1em 5vw; padding: calc(0.5em + 1.2vw) 5vw; max-width: 100vw; width: 100%; background-color: rgba(255,255,255,0.03); text-align: center; color: rgba(255,255,255,0.6); box-sizing: border-box;">
			Copyright © 2020 Eric Lowry. All Rights Reserved.
		</footer>
	</body>
</html>