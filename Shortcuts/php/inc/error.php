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
	
	if( !isset( $_GET['code'] ) || !$code = filter_var( $_GET['code'], FILTER_SANITIZE_NUMBER_INT ) )
	{
		$code = 404;
		$errors = ['The fullName parameter is missing or invalid.'];
	}
	
	include $_SERVER['DOCUMENT_ROOT'] . '/inc/lang.php';
?>
<!DOCTYPE HTML>
<html lang="<?php echo $langPrefix ?>">
	<head>
		<title>StadiaIcons – <?php echo __( 'generic->Error' ) . ' ' . $code ?></title>
		<meta name="description" content="There was an error loading this page: error <?php echo $code . ': ' . __( 'error->codes->' . $code ) ?>">
		<meta name="author" content="Eric Lowry">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
		
		<link rel="stylesheet" href="/style.css">
	</head>
	<body>
		<script>0</script>
		<main>
			<section class="forced">
				<div>
					<h1><?php _e( 'error->Error %1$s: %2$s',  $code, __( 'error->codes->' . $code ) ) ?></h1>
					<p><?php _e( 'error->%1$sClick Here%2$s to return to the home page.', '<a href="/">', '</a>' ) ?></p>
				</div>
			</section>
		</main>
		<?php include 'footer.php' ?>
	</body>
</html>