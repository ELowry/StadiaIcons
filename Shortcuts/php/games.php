<?php

	/* LICENSED UNDER AGPL 3.0
	This file is part of StadiaIcons.

	StadiaIcons is free software: you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	StadiaIcons is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with StadiaIcons.  If not, see <https://www.gnu.org/licenses/>.
	*/
	
	$ignoreGET = true;

	include $_SERVER['DOCUMENT_ROOT'] . '/inc/get.php';
	
	include $_SERVER['DOCUMENT_ROOT'] . '/inc/lang.php';
?>
<!DOCTYPE HTML>
<html lang="<?php echo $langPrefix ?>">
	<head>
		<title>StadiaIcons – Shortcuts BETA – <?php _e( 'games->meta->Stadia Games List' ) ?></title>
		<meta name="description" content="<?php _e( 'games->meta->Install shortcuts for Stadia games to your desktop with corresponding StadiaIcons!' ) ?>">
		<meta name="keywords" content="<?php _e( 'meta->Stadia, Icons, Design, Gaming, Game, Shortcut' ) ?>">
		<meta name="author" content="Eric Lowry">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
		
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
		
		<meta property="og:title" content="<?php _e( 'games->meta->Stadia Games List' ) ?>">
		<meta property="og:site_name" content="StadiaIcons Shortcuts">
		<meta property="og:url" content="https://<?php echo $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'] ?>">
		<meta property="og:description" content="<?php _e( 'games->meta->Install shortcuts for Stadia games to your desktop with corresponding StadiaIcons!' ) ?>">
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
		<meta name="twitter:description" content="<?php _e( 'games->meta->Install shortcuts for Stadia games to your desktop with corresponding StadiaIcons!' ) ?>">
		<meta name="twitter:title" content="StadiaIcons Shortcuts – <?php _e( 'games->meta->Stadia Games List' ) ?>">
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
						<h2><?php _e( 'games->content->BETA TEST' ) ?></h2>
						<p><?php _e( 'games->content->Welcome to the %s Shortcuts beta test!', '<span class="gradient">StadiaIcons</span>' ) ?></p>
						<p><?php _e( 'games->content-><strong>This project is a work in progress</strong>, and <em>I am mainly looking for feedback.</em>' ) ?></p>
						<p><?php _e( 'games->content->Though each individual installation page is unlikely to change much in terms of how they function, this list will most likely be entirely redesigned and/or integrated directly within the Stadia using some form of extension/userscript.' ) ?></p>
						<p><strong><?php _e( 'games->content->Begin by picking one of these Stadia titles you own or have claimed and follow the instructions to install a %s Shortcut to your Desktop or Start Menu.', '<span class="gradient">StadiaIcons</span>' ) ?></strong></p>
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
										.		'<img src="' . $data->datasets->{'images-192'}->uri . $imgname . $data->datasets->{'images-192'}->extension . '" alt="[' . __( 'games->content->%s icon', $name ) . ']" tytle="' . $sname . '"/>' . "\n\t\t\t\t\t"
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
							echo '<h2>' . __( 'games->content->ERROR: Could not retrieve images.' ) . '</h2>';
						}
					?>
				</div>
			</section>
			<aside id="Alert" style="z-index: 10;">
					<h2><?php _e( 'generic->IMPORTANT' ) ?></h2>
					<p><?php _e( 'games->content->This project is a work in progress. It is likely that installed %s shortcuts will be disabled some time in the future.', '<strong>StadiaIcons</strong>' ) ?></p>
					<span id="CloseAlert" class="close">×</span>
			</aside>
		</main>
		<?php include $_SERVER['DOCUMENT_ROOT'] . '/inc/footer.php'; ?>
	</body>
</html>