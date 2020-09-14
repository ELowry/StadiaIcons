<?php
	include 'get.php';
?>
<!DOCTYPE HTML>
<html lang="en">
	<head>
		<title>StadiaIcons – BETA</title>
		<meta name="Description" content="There was an error processing your StadiaIcon request.">
		
		<?php
			if ($data != null)
			{
				echo '<link rel="icon" type="image/x-icon" sizes="16x16 32x32 48x48 64x64 128x128 256x256" href="' . $data->datasets->icons->uri . $data->uids->defaultIcon->{'0'} . $data->datasets->icons->extension . '">' . "\n\t\t";
				echo '<link rel="icon" type="image/png" sizes="128x128" href="' . $data->datasets->{'images-128'}->uri . $data->uids->defaultIcon->{'0'} . $data->datasets->{'images-128'}->extension . '">' . "\n\t\t";
				echo '<link rel="icon" type="image/png" sizes="192x192" href="' . $data->datasets->{'images-192'}->uri . $data->uids->defaultIcon->{'0'} . $data->datasets->{'images-192'}->extension . '">' . "\n\t\t";
				echo '<link rel="icon" type="image/png" sizes="512x512" href="' . $data->datasets->{'images-512'}->uri . $data->uids->defaultIcon->{'0'} . $alt . $data->datasets->{'images-512'}->extension . '">' . "\n\t\t";
				echo '<link rel="icon" type="image/png" sizes="1024x1024" href="' . $data->datasets->images->uri . $data->uids->defaultIcon->{'0'} . $data->datasets->images->extension . '">' . "\n\t\t";
				echo '<link rel="icon" type="image/webp" sizes="1024x1024" href="' . $data->datasets->webp->uri . $data->uids->defaultIcon->{'0'} . $data->datasets->webp->extension . '">' . "\n\t\t";
				echo '<link rel="apple-touch-icon" href="' . $data->datasets->{'images-192'}->uri . $data->uids->defaultIcon->{'0'} . $data->datasets->{'images-192'}->extension . '">' . "\n";
			}
		?>
		
		<link rel="stylesheet" href="/style.css">
		<style>
			#grid {
				display: flex;
				flex-wrap: wrap;
				justify-content: center;
				align-content: flex-start;
			}
			#grid > a {
				padding: 0 2vw;
			}
			#grid > a > figure,
			#grid > a > figure > img {
				margin: 0;
				padding: 0;
				max-width: 128px;
				height: auto;
			}
			#grid > a > figure {
				background-size: contain !important;
			}
			#grid > a > figure > img {
				transition: opacity 0.28s, filter 0.28s;
			}
			#grid > a:hover > figure > img {
				opacity: 0;
				filter: alpha(opacity=0);
			}
			figcaption {
				max-width: 128px;
			}
			a:not(:hover) figcaption {
				color: #fff;
			}
		</style>
		
		<script>
			window.addEventListener('load', function ()
			{
				document.getElementById('CloseAlert').addEventListener('click', (e) => {
					document.getElementById('Alert').style.display = 'none';
				});
			});
		</script>
	</head>
	<body>
		<main>
			<section style="display: flex;">
				<div style="max-width: 1600px; padding: 3vw;">
					<div style="margin: auto; max-width: 1024px; padding: 3vw;">
						<h1><span class="gradient">StadiaIcons</span> Shortcuts</h1>
						<h2>BETA TEST</h2>
						<p>Welcome to the <span class="gradient">StadiaIcons</span> Shortcuts beta test!</p>
						<p><strong>This project is a work in progress</strong>, and <em>I am mainly looking for feedback.</em></p>
						<p>Though each individual installation page is unlikely to change much in terms of how they function, this list will most likely be entirely redesigned and/or integrated directly within the Stadia using some form of extension/userscript.</p>
						<p><strong>Begin by picking one of these Stadia titles you own or have claimed and follow the instructions to install a <span class="gradient">StadiaIcons</span> Shortcut to your Desktop or Start Menu.</strong></p>
					</div>
					<?php
						if ($data != null)
						{
					?>
					<div id="grid">
						<?php
							foreach ( $data->uids as $currid => $imgs )
							{
								if ($currid != 'defaultIcon') {
									$name = $imgs->{'0'};
									$sname = str_replace( ' – ', ': ', $name );
									$imgname = str_replace ( array ( "'", '"', ' ' ), array ( '%27', '%22', '%20' ),  $data->uids->{$currid}->{'0'});
									echo '<a href="/' . $currid . '/?fullName=' . $name . '&shortName=' . $sname . '&uid=' . $currid . '" target="_blank">' . "\n\t\t\t\t\t"
										.	'<figure style="background: url(\'' . $data->datasets->{'images-192'}->uri . $imgname . $data->other->altSuffix . $data->datasets->{'images-192'}->extension . '\') no-repeat scroll;">' . "\n\t\t\t\t\t"
										.		'<img src="' . $data->datasets->{'images-192'}->uri . $imgname . $data->datasets->{'images-192'}->extension . '" alt="[Image]"/>' . "\n\t\t\t\t"
										.	'</figure>' . "\n\t\t\t\t"
										.	'<figcaption>' . $sname . '</figcaption>' . "\n\t\t\t\t"
										.'</a>' . "\n\t\t\t\t";
								}
							}
						?>
					</div>
					<?php
						}
						else
						{
							echo '<h2>ERROR: Could not retrieve images.</h2>';
						}
					?>
				</div>
			</section>
			<aside id="Alert" style="display: flex;">
					<h2>IMPORTANT</h2>
					<p>This project is a work in progress. It is likely that installed <strong>StadiaIcons</strong> shortcuts will be disabled some time in the future.</p>
					<span id="CloseAlert" class="close">×</span>
			</aside>
		</main>
		<footer>
			Copyright © 2020 Eric Lowry. All Rights Reserved.
		</footer>
	</body>
</html>