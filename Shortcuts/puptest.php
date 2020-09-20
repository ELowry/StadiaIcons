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
	
	include $_SERVER['DOCUMENT_ROOT'] . '/inc/lang.php';
?>
<!DOCTYPE HTML>
<html lang="<?php echo $langPrefix ?>">
	<head>
		<title>StadiaIcons – <?php _e( 'popupTest->Popup Test' ) ?></title>
		<meta name="description" content="<?php _e( 'popupTest->This page is used to test for popup authorization.' ) ?>">
		<meta name="author" content="Eric Lowry">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
		
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
		<script>0</script>
		<main>
			<section class="forced">
				<div>
						<h1><?php _e( 'popupTest->This window should close shortly.' ) ?></h1>
						<p><?php _e( 'popupTest->Please do not close it yourself.' ) ?></p>
				</div>
			</section>
		</main>
		<?php include './inc/footer.php' ?>
	</body>
</html>