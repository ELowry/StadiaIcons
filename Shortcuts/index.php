<?php
	include 'get.php';
	
	if ($fullName != null && $shortName != null && $uid != null && $data!= null && property_exists($data->uids, $uid))
	{
		
		$urlParams = '?fullName=' . $fullName . '&shortName=' . $shortName . '&uid=' . $uid;
		if ($variant != 0)
		{
			$urlParams .= '&variant=' . $variant;
		}
		if ($alt != '')
		{
			$urlParams .= '&alt=' . $alt;
		}
?>
<!DOCTYPE HTML>
<html lang="en">
	<head>
		<title>StadiaIcons – <?php echo $fullName ?></title>
		<link rel="manifest" href="/stadia.webmanifest<?php echo $urlParams ?>">
		<meta name="Description" content="This page will allow you to install <?php echo $fullName ?> as a Progressive Web App with its corresponding StadiaIcon.">
		<meta name="mobile-web-app-capable" content="yes">
		<meta name="apple-mobile-web-app-capable" content="yes">
		<meta name="application-name" content="<?php echo $fullName ?>">
		<meta name="apple-mobile-web-app-title" content="<?php echo $shortName ?>">
		<meta name="theme-color" content="#202124">
		<meta name="msapplication-navbutton-color" content="#202124">
		<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
		<meta name="msapplication-starturl" content="<?php echo $myURL ?>/<?php echo $uid . '/' . $urlParams ?>">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		<meta name="theme-color" content="#202124">

		<?php
			echo '<link rel="icon" type="image/x-icon" sizes="16x16 32x32 48x48 64x64 128x128 256x256" href="' . $data->datasets->icons->uri . $data->uids->$uid->$variant . $alt . $data->datasets->icons->extension . '">' . "\n\t\t";
			echo '<link rel="icon" type="image/png" sizes="128x128" href="' . $data->datasets->{'images-128'}->uri . $data->uids->$uid->$variant . $alt . $data->datasets->{'images-128'}->extension . '">' . "\n\t\t";
			echo '<link rel="icon" type="image/png" sizes="192x192" href="' . $data->datasets->{'images-192'}->uri . $data->uids->$uid->$variant . $alt . $data->datasets->{'images-192'}->extension . '">' . "\n\t\t";
			echo '<link rel="icon" type="image/png" sizes="512x512" href="' . $data->datasets->{'images-512'}->uri . $data->uids->$uid->$variant . $alt . $data->datasets->{'images-512'}->extension . '">' . "\n\t\t";
			echo '<link rel="icon" type="image/png" sizes="1024x1024" href="' . $data->datasets->images->uri . $data->uids->$uid->$variant . $alt . $data->datasets->images->extension . '">' . "\n\t\t";
			echo '<link rel="icon" type="image/webp" sizes="1024x1024" href="' . $data->datasets->webp->uri . $data->uids->$uid->$variant . $alt . $data->datasets->webp->extension . '">' . "\n\t\t";
			echo '<link rel="apple-touch-icon" href="' . $data->datasets->{'images-192'}->uri . $data->uids->$uid->$variant . $alt . $data->datasets->{'images-192'}->extension . '">' . "\n";
		?>
		
		<link rel="stylesheet" href="/style.css">
		
		<script>
			var uid = '<?php echo $uid ?>';
		</script>
		<script src="/scripts.js"></script>
	</head>
	<body>
		<main>
			<section id="Loading" class="show">
				<div class="loader"><div></div><div></div><div></div><div></div></div>
			</section>
			<section id="InstallPrompt">
				<div>
					<h1><span class="gradient">StadiaIcons</span> Shortcuts</h1>
					<h2><?php echo $fullName ?></h2>
					<a id="InstallButton" href="https://stadia.google.com/player/<?php echo $uid ?>">
						<img  srcset="<?php
							echo preg_replace('/\s+/', "%20", $data->datasets->webp->uri . $data->uids->$uid->$variant . $alt . $data->datasets->webp->extension ) . ' 1024w, '
								. preg_replace('/\s+/', "%20", $data->datasets->images->uri . $data->uids->$uid->$variant . $alt . $data->datasets->images->extension ) . ' 1024w, '
								. preg_replace('/\s+/', "%20", $data->datasets->{'images-512'}->uri . $data->uids->$uid->$variant . $alt . $data->datasets->{'images-512'}->extension ) . ' 512w, '
								. preg_replace('/\s+/', "%20", $data->datasets->{'images-192'}->uri . $data->uids->$uid->$variant . $alt . $data->datasets->{'images-192'}->extension ) . ' 192w, '
								. preg_replace('/\s+/', "%20", $data->datasets->{'images-128'}->uri . $data->uids->$uid->$variant . $alt . $data->datasets->{'images-128'}->extension ) . ' 182w';
							?>" src="<?php
							echo $data->datasets->{'images-192'}->uri . $data->uids->$uid->$variant . $alt . $data->datasets->{'images-192'}->extension;
							?>" alt="<?php
							echo $fullName . ' Game Icon';
						?>" style="width: 30vw;" />
						<div>
							<button><span>Create a shortcut on your device.</span></button>
						</div>
					</a>
				</div>
			</section>
			<section id="PopupPrompt">
				<div>
					<h1><span class="gradient">StadiaIcons</span> Shortcuts</h1>
					<h2>First Installation</h2>
					<div class="inset">
						<p>This is the first time you are installing a StadiaIcon shortcut.</p>
						<p>In order to create shortcuts, you must authorize this website to display popup windows*.</p>
						<p>Depending on your browser, you should see a message requesting this authorization. It is typically to the right of the address bar.</p>
					</div>
					<p>If you do not see this message or once you have given authorization, please press this button:</p>
					<p style="padding-top: 2vw;"><button id="TestAccess"><span>Test Popup Access</span></button></p>
				</div>
				<div class="footnote">
					<p>* StadiaIcon shortcuts use Progressive Web Apps, and in order to open your game without the address bar at the top, the app instead opens the game in a regular browser tab using a popup and immediately closes in the background.</p>
				</div>
			</section>
			<section id="Installed">
				<div>
					<h1>Installation Successful</h1>
					<p>You should now be able to open <?php echo $fullName ?> directly from your Desktop or Start Menu.</p>
					<p style="padding-top: 2vw;"><button class="LaunchGame"><span>Launch <?php echo $fullName ?> Now</span></button></a></p>
				</div>
			</section>
			<section id="Uninstall">
				<div>
					<h1><span class="gradient">StadiaIcons</span> Shortcut Stopped</h1>
					<p>You pressed the <span class="hilight">Ctrl</span> key while the shortcut was launching.</p>
					<p>You may be trying to uninstall this shortcut. If that is the case, you should find an <em>uninstall</em> button in this window's settings. This menu is typically located in the top right.</p>
					<p>If not, you can simply press this button to start your game:</a>
					<p style="padding-top: 2vw;"><button class="LaunchGame"><span>Launch <?php echo $fullName ?></span></button></a></p>
				</div>
			</section>
			<section id="Unavailable">
				<div>
					<h1><span class="gradient">StadiaIcons</span> Shortcuts Error</h1>
					<h2>The shortcut may already be installed OR your browser may not be supported</h2>
					<p>If you have already installed the <?php echo $fullName ?> <span class="gradient">StadiaIcons</span> shortcut, you no longer need to access this link; simply use the installed shortcut to play your game!</p>
					<p>Otherwise, we strongly recommend using <a href="https://google.com/chrome" title="Download Chrome" target="_blank" rel="noreferrer noopener">Chrome</a> or <a href="https://microsoft.com/edge" title="Download Edge" target="_blank" rel="noreferrer noopener">Chromium Edge</a>.</p>
				</div>
			</section>
			<aside id="Alert">
					<h2>IMPORTANT</h2>
					<p>To uninstall this shortcut, please press the <span class="hilight">Ctrl</span> key as the shortcut launches.</p>
					<span class="close">×</span>
			</aside>
		</main>
		<footer>
			Copyright © 2020 Eric Lowry. All Rights Reserved.
		</footer>
	</body>
</html>
<?php
	}
	else
	{
		?>
<!DOCTYPE HTML>
<html lang="en">
	<head>
		<title><span class="gradient">StadiaIcons</span> – Error</title>
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
	</head>
	<body>
		<main>
			<section style="display: flex;">
				<div>
					<h1>There was an error processing your <span class="gradient">StadiaIcons</span> request.</h1>
					<p>Please close this page and try again. If the problem persists, please contact us on Reddit at <a href="https://reddit.com/user/EricLowry" target="_blank" rel="noreferrer noopener">u/EricLowry</a> or on <a href="https://github.com/ELowry/StadiaIcons/" target="_blank" rel="noreferrer noopener">GitHub</a>.</p>
				</div>
			</section>
		</main>
		<footer>
			Copyright © 2020 Eric Lowry. All Rights Reserved.
		</footer>
	</body>
</html>
		<?php
	}
?>