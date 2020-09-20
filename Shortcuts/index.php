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
	
	$checkSubdir = true;

	include $_SERVER['DOCUMENT_ROOT'] . '/inc/get.php';

	include $_SERVER['DOCUMENT_ROOT'] . '/inc/lang.php';
	
	if( $info->isValid )
	{
		
		$urlParams = '?fullName=' . $fullName . '&shortName=' . $shortName . '&uid=' . $uid;
		if( $variant != 0 )
		{
			$urlParams .= '&variant=' . $variant;
		}
		if( $alt != '' )
		{
			$urlParams .= '&alt=' . $alt;
		}
?>
<!DOCTYPE HTML>
<html lang="<?php echo $langPrefix ?>">
	<head>
		<title>StadiaIcons – <?php echo $fullName ?> – Shortcut</title>
		<meta name="description" content="<?php _e( 'meta->This page will allow you to install %s as a Progressive Web App with its corresponding StadiaIcon.',  $fullName ) ?>">
		<meta name="keywords" content="<?php echo __( 'meta->Stadia, Icons, Design, Gaming, Game, Shortcut' ) . ', ' . $shortName ?>">
		<meta name="author" content="Eric Lowry">
		
		<link rel="manifest" href="/stadia.webmanifest<?php echo $urlParams ?>">
		
		<meta name="mobile-web-app-capable" content="yes">
		<meta name="apple-mobile-web-app-capable" content="yes">
		<meta name="application-name" content="<?php echo $fullName ?>">
		<meta name="apple-mobile-web-app-title" content="<?php echo $shortName ?>">
		<meta name="theme-color" content="#202124">
		<meta name="msapplication-navbutton-color" content="#202124">
		<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
		<meta name="msapplication-starturl" content="<?php echo $info->shortcutUrl ?>">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
		<meta name="theme-color" content="#202124">

		<?php
			echo '<link rel="icon" type="image/x-icon" sizes="16x16 32x32 48x48 64x64 128x128 256x256" href="' . $info->images->icon . '">' . "\n\t\t";
			echo '<link rel="icon" type="image/png" sizes="128x128" href="' . $info->images->image128 . '">' . "\n\t\t";
			echo '<link rel="icon" type="image/png" sizes="192x192" href="' . $info->images->image192 . '">' . "\n\t\t";
			echo '<link rel="icon" type="image/png" sizes="512x512" href="' . $info->images->image512 . '">' . "\n\t\t";
			echo '<link rel="icon" type="image/png" sizes="1024x1024" href="' . $info->images->image . '">' . "\n\t\t";
			echo '<link rel="icon" type="image/webp" sizes="1024x1024" href="' . $info->images->webp . '">' . "\n\t\t";
			echo '<link rel="apple-touch-icon" href="' . $info->images->image192 . '">' . "\n";
		?>
		
		<meta property="og:title" content="<?php echo $shortName ?> shortcut">
		<meta property="og:site_name" content="StadiaIcons Shortcuts">
		<meta property="og:url" content="https://<?php echo $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'] ?>">
		<meta property="og:description" content="<?php echo __( 'meta->This page will allow you to install %s as a Progressive Web App with its corresponding StadiaIcon.',  $fullName ) ?>">
		<meta property="og:type" content="website">
		<meta property="og:image" content="https://raw.githubusercontent.com/ELowry/StadiaIcons/master/Header.png">
		<?php
			echo '<meta property="og:image" content="' . $info->images->image . '">' . "\n\t\t";
			echo '<meta property="og:image" content="' . $info->images->webp . '">' . "\n\t\t";
			echo '<meta property="og:image" content="' . $info->images->image512 . '">' . "\n\t\t";
			echo '<meta property="og:image" content="' . $info->images->image192 . '">' . "\n\t\t";
			echo '<meta property="og:image" content="' . $info->images->image128 . '">' . "\n";
		?>
		
		<meta name="twitter:card" content="summary_large_image">
		<meta name="twitter:site" content="@EricLowry14">
		<meta name="twitter:description" content="<?php echo __( 'meta->This page will allow you to install %s as a Progressive Web App with its corresponding StadiaIcon.',  $fullName ) ?>">
		<meta name="twitter:title" content="StadiaIcons – <?php echo $fullName ?> – Shortcut">
		<meta name="twitter:image" content="https://raw.githubusercontent.com/ELowry/StadiaIcons/master/Header.png">
		
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
			<section id="Installed">
				<div>
					<h1><?php _e( 'main->installed->Installation Successful' ) ?></h1>
					<p><?php _e( 'main->installed->You should now be able to open %s directly from your Desktop or Start Menu.', $fullName ) ?></p>
					<p style="padding-top: 2vw;"><button class="LaunchGame"><span><?php _e( 'main->installed->Launch %s Now', $fullName ) ?></span></button></a></p>
				</div>
			</section>
			<section id="InstallPrompt">
				<div>
					<h1><span class="gradient">StadiaIcons</span> Shortcuts</h1>
					<h2><?php echo $fullName ?></h2>
					<a id="InstallButton" href="https://stadia.google.com/player/<?php echo $uid ?>">
						<img  srcset="<?php
							echo preg_replace('/\s+/', "%20", $info->images->webp ) . ' 1024w, '
								. preg_replace('/\s+/', "%20", $info->images->image ) . ' 1024w, '
								. preg_replace('/\s+/', "%20", $info->images->image512 ) . ' 512w, '
								. preg_replace('/\s+/', "%20", $info->images->image192 ) . ' 192w, '
								. preg_replace('/\s+/', "%20", $info->images->image128 ) . ' 182w';
							?>" src="<?php
							echo $info->images->image192;
							?>" alt="<?php
							echo $fullName . ' Game Icon';
						?>" style="width: 30vw;" />
						<div>
							<button><span><?php _e( 'main->installPrompt->Create a shortcut on your device.' ) ?></span></button>
						</div>
					</a>
				</div>
			</section>
			<section id="PopupPrompt">
				<div>
					<h1><span class="gradient">StadiaIcons</span> Shortcuts</h1>
					<h2><?php _e( 'main->popupPrompt->First Installation' ) ?></h2>
					<div class="inset">
						<p><?php _e( 'main->popupPrompt->This is the first time you are installing a StadiaIcon shortcut.' ) ?></p>
						<p><?php _e( 'main->popupPrompt->In order to create shortcuts, you must authorize this website to display popup windows*.' ) ?></p>
						<p><?php _e( 'main->popupPrompt->Depending on your browser, you should see a message requesting this authorization. It is typically to the right of the address bar.' ) ?></p>
					</div>
					<p><?php _e( 'main->popupPrompt->If you do not see this message or once you have given authorization, please press this button:' ) ?></p>
					<p style="padding-top: 2vw;"><button id="TestAccess"><span><?php _e( 'main->popupPrompt->Test Popup Access' ) ?></span></button></p>
				</div>
				<div class="footnote">
					<p><?php _e( 'main->popupPrompt->* StadiaIcon shortcuts use Progressive Web Apps, and in order to open your game without the address bar at the top, the app instead opens the game in a regular browser tab using a popup and immediately closes in the background.' ) ?></p>
				</div>
			</section>
			<section id="Uninstall">
				<div>
					<h1><span class="gradient">StadiaIcons</span> Shortcut <?php _e( 'main->uninstall->Stopped' ) ?></h1>
					<p><?php _e( 'main->uninstall->You pressed the %s key while the shortcut was launching.', '<span class="hilight">Ctrl</span>' ) ?></p>
					<p><?php _e( 'main->uninstall->You may be trying to uninstall this shortcut. If that is the case, you should find an <em>uninstall</em> button in this window\'s settings. This menu is typically located in the top right.' ) ?></p>
					<p><?php _e( 'main->uninstall->If not, you can simply press this button to start your game:' ) ?></a>
					<p style="padding-top: 2vw;"><button class="LaunchGame"><span><?php _e( 'main->uninstall->Launch %s', $fullName ) ?></span></button></a></p>
				</div>
			</section>
			<section id="Unavailable">
				<div>
					<h1><span class="gradient">StadiaIcons</span> Shortcuts – <?php _e( 'generic->Error' ) ?></h1>
					<h2><?php _e( 'main->unavailable->The shortcut may already be installed OR your browser may not be supported' ) ?></h2>
					<p><?php _e( 'main->unavailable->If you have already installed the %1$s %2$s shortcut, you no longer need to access this link; simply use the installed shortcut to play your game!', $fullName, '<span class="gradient">StadiaIcons</span>' ) ?></p>
					<p><?php _e( 'main->unavailable->Otherwise, we strongly recommend using %1$sDownload Chrome%2$s or %3$sDownload Edge%4$s.', '<a href="https://google.com/chrome" title="', '" target="_blank" rel="noreferrer noopener">Chrome</a>', '<a href="https://microsoft.com/edge" title="', '" target="_blank" rel="noreferrer noopener">Chromium Edge</a>' ) ?></p>
				</div>
			</section>
			<aside id="Alert">
					<h2><?php _e( 'generic->IMPORTANT' ) ?></h2>
					<p><?php _e( 'main->alert->To uninstall this shortcut, please press the %s key as the shortcut launches.', '<span class="hilight">Ctrl</span>' ) ?></p>
					<span class="close">×</span>
			</aside>
		</main>
		<?php include $_SERVER['DOCUMENT_ROOT'] . '/inc/footer.php'; ?>
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
		<title>StadiaIcons – <?php _e( 'generic->Error' ) ?></title>
		<meta name="description" content="<?php _e( 'error->There was an error processing your %s request.', 'StadiaIcons' ) ?>">
		<meta name="keywords" content="<?php echo __('meta->Stadia, Icons, Design, Gaming, Game, Shortcut' ) . ', ' . $shortName ?>">
		<meta name="author" content="Eric Lowry">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		
		<?php
			echo '<link rel="icon" type="image/x-icon" sizes="16x16 32x32 48x48 64x64 128x128 256x256" href="' . $info->images->icon . '">' . "\n\t\t";
			echo '<link rel="icon" type="image/png" sizes="128x128" href="' . $info->images->image128 . '">' . "\n\t\t";
			echo '<link rel="icon" type="image/png" sizes="192x192" href="' . $info->images->image192 . '">' . "\n\t\t";
			echo '<link rel="icon" type="image/png" sizes="512x512" href="' . $info->images->image512 . '">' . "\n\t\t";
			echo '<link rel="icon" type="image/png" sizes="1024x1024" href="' . $info->images->image . '">' . "\n\t\t";
			echo '<link rel="icon" type="image/webp" sizes="1024x1024" href="' . $info->images->webp . '">' . "\n\t\t";
			echo '<link rel="apple-touch-icon" href="' . $info->images->image192 . '">' . "\n";
		?>
		
		<link rel="stylesheet" href="/style.css">
	</head>
	<body>
		<main>
			<section style="display: flex;">
				<div>
					<h1><?php _e( 'error->There was an error processing your %s request.', '<span class="gradient">StadiaIcons</span>' ) ?></h1>
					<p><?php _e( 'error->Please close this page and try again. If the problem persists, please contact us on Reddit at %1$s or on %2$s.', '<a href="https://reddit.com/user/EricLowry" target="_blank" rel="noreferrer noopener">u/EricLowry</a>', '<a href="https://github.com/ELowry/StadiaIcons/" target="_blank" rel="noreferrer noopener">GitHub</a>' ) ?></p>
				</div>
			</section>
		</main>
		<?php include $_SERVER['DOCUMENT_ROOT'] . '/inc/footer.php'; ?>
	</body>
</html>
		<?php
	}
?>