<footer>
	<p>Copyright © 2020 Eric Lowry. All Rights Reserved.</p>
	<p>Follow <a href="https://github.com/ELowry/StadiaIcons/" target="_blank" rel="noreferrer noopener">StadiaIcons on GitHub</a></p>
</footer>
<?php
	if ( isset( $errors ) && !empty( $errors ) )
	{
		echo "<script>console.warn('Data fetching error";
		if ( count( $errors ) === 1 )
		{
			echo ":', '" . $errors[0] . "');</script>";
		}
		else
		{
			echo "s: ', [";
			foreach( $errors as $error )
			{
				echo "'" . $error . "',";
			}
			echo ']);</script>';
		}
	}
?>