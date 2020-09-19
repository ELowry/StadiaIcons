<?php
	$ignoreGET = true;

	include './inc/get.php';
?>
<!DOCTYPE HTML>
<html lang="en">
	<head>
		<title>StadiaIcons – Shortcuts BETA – Stadia Games List</title>
		<meta name="description" content="Install shortcuts for Stadia games to your desktop with corresponding StadiaIcons!">
		<meta name="keywords" content="Stadia, Icons, Design, Gaming, Shortcuts">
		<meta name="author" content="Eric Lowry">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		
		<?php
			if( $data != null )
			{
				echo '<link rel="icon" type="image/x-icon" sizes="16x16 32x32 48x48 64x64 128x128 256x256" href="' . $data->datasets->icons->uri . $data->uids->defaultIcon->{'0'} . $data->datasets->icons->extension . '">' . "\n\t\t";
				echo '<link rel="icon" type="image/png" sizes="128x128" href="' . $data->datasets->{'images-128'}->uri . $data->uids->defaultIcon->{'0'} . $data->datasets->{'images-128'}->extension . '">' . "\n\t\t";
				echo '<link rel="icon" type="image/png" sizes="192x192" href="' . $data->datasets->{'images-192'}->uri . $data->uids->defaultIcon->{'0'} . $data->datasets->{'images-192'}->extension . '">' . "\n\t\t";
				echo '<link rel="icon" type="image/png" sizes="512x512" href="' . $data->datasets->{'images-512'}->uri . $data->uids->defaultIcon->{'0'} . $data->datasets->{'images-512'}->extension . '">' . "\n\t\t";
				echo '<link rel="icon" type="image/png" sizes="1024x1024" href="' . $data->datasets->images->uri . $data->uids->defaultIcon->{'0'} . $data->datasets->images->extension . '">' . "\n\t\t";
				echo '<link rel="icon" type="image/webp" sizes="1024x1024" href="' . $data->datasets->webp->uri . $data->uids->defaultIcon->{'0'} . $data->datasets->webp->extension . '">' . "\n\t\t";
				echo '<link rel="apple-touch-icon" href="' . $data->datasets->{'images-192'}->uri . $data->uids->defaultIcon->{'0'} . $data->datasets->{'images-192'}->extension . '">' . "\n";
			}
		?>
		
		<meta property="og:title" content="Games List">
		<meta property="og:site_name" content="StadiaIcons Shortcuts">
		<meta property="og:url" content="https://<?php echo $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'] ?>">
		<meta property="og:description" content="Install shortcuts for Stadia games to your desktop with corresponding StadiaIcons!">
		<meta property="og:type" content="website">
		<meta property="og:image" content="https://raw.githubusercontent.com/ELowry/StadiaIcons/master/Header.png">
		<?php
			if( $data != null )
			{
				echo '<meta property="og:image" content="' . $data->datasets->images->uri . $data->datasets->images->extension . '">' . "\n\t\t";
				echo '<meta property="og:image" content="' . $data->datasets->webp->uri . $data->datasets->webp->extension . '">' . "\n\t\t";
				echo '<meta property="og:image" content="' . $data->datasets->{'images-512'}->uri . $data->datasets->{'images-512'}->extension . '">' . "\n\t\t";
				echo '<meta property="og:image" content="' . $data->datasets->{'images-192'}->uri . $data->datasets->{'images-192'}->extension . '">' . "\n\t\t";
				echo '<meta property="og:image" content="' . $data->datasets->{'images-128'}->uri . $data->datasets->{'images-128'}->extension . '">' . "\n";
			}
		?>
		
		<meta name="twitter:card" content="summary_large_image">
		<meta name="twitter:site" content="@EricLowry14">
		<meta name="twitter:description" content="Install shortcuts for Stadia games to your desktop with corresponding StadiaIcons!">
		<meta name="twitter:title" content="StadiaIcons Shortcuts – Stadia Games List">
		<meta name="twitter:image" content="https://raw.githubusercontent.com/ELowry/StadiaIcons/master/Header.png">
		
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
				width: 128px;
				background-size: contain !important;
			}
			#grid > a > figure > img {
				width: 128px;
				height: 128px;
				transition: opacity 0.28s, filter 0.28s;
			}
			#grid > a:hover > figure > img {
				opacity: 0;
				filter: alpha(opacity=0);
			}
			a:not(:hover) figcaption {
				color: #fff;
			}
		</style>
		
		<script>
			window.addEventListener('load', function ()
			{
				var hasResolved = false;
				
				setTimeout(function() {
					if (!hasResolved)
					{
					document.getElementById('Alert').style.display = 'flex';
					document.getElementById('Games').style.display = 'flex';
					document.getElementById('Loading').className = '';
					}
				}, 12000);
				
				document.getElementById('CloseAlert').addEventListener('click', (e) => {
					document.getElementById('Alert').style.display = 'none';
				});
				
				Promise.all(Array.from(document.images).filter(img => !img.complete).map(img => new Promise(resolve => {
					img.addEventListener('load', resolve);
					img.addEventListener('error', resolve);
				}))).then(() => {
					hasResolved = true;
					document.getElementById('Alert').style.display = 'flex';
					document.getElementById('Games').style.display = 'flex';
					document.getElementById('Loading').className = '';
				});
			});
		</script>
	</head>
	<body>
		<main>
			<section id="Loading" class="show">
				<div class="loader"><div></div><div></div><div></div><div></div></div>
			</section>
			<section id="Games" style="display: none;">
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
						if( $data != null )
						{
					?>
					<div id="grid">
						<?php
							foreach( $data->uids as $currid => $imgs )
							{
								if( $currid != 'defaultIcon' ) {
									$name = $imgs->{'0'};
									$sname = str_replace( ' – ', ': ', $name );
									$imgname = str_replace ( array ( "'", '"', ' ' ), array ( '%27', '%22', '%20' ),  $data->uids->{$currid}->{'0'});
									echo '<a href="/' . $currid . '/?fullName=' . $name . '&shortName=' . $sname . '&uid=' . $currid . '" target="_blank">' . "\n\t\t\t\t\t"
										.	'<figure style="background: url(\'' . $data->datasets->{'images-192'}->uri . $imgname . $data->other->altSuffix . $data->datasets->{'images-192'}->extension . '\') no-repeat scroll;">' . "\n\t\t\t\t\t"
										.		'<img src="' . $data->datasets->{'images-192'}->uri . $imgname . $data->datasets->{'images-192'}->extension . '" alt="[' . $name . ' icon]" tytle="' . $sname . '"/>' . "\n\t\t\t\t\t"
										.		'<figcaption>' . $sname . '</figcaption>' . "\n\t\t\t\t"
										.	'</figure>' . "\n\t\t\t\t"
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
			<aside id="Alert" style="z-index: 10;">
					<h2>IMPORTANT</h2>
					<p>This project is a work in progress. It is likely that installed <strong>StadiaIcons</strong> shortcuts will be disabled some time in the future.</p>
					<span id="CloseAlert" class="close">×</span>
			</aside>
		</main>
		<?php include './inc/footer.php'; ?>
	</body>
</html>