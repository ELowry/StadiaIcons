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
	
?>
<footer>
<?php
if( function_exists('__') )
{
?>
	<p><?php _e( 'footer->Copyright © %1$s Eric Lowry. Licensed under %2$s.', date("Y"), '<a href="/LICENSE.txt">AGPL 3.0</a>' ) ?></p>
	<p><?php _e( 'footer->Follow %1$sStadiaIcons on GitHub%2$s', '<a href="https://github.com/ELowry/StadiaIcons/" target="_blank" rel="noreferrer noopener">', '</a>' ) ?></p>
<?php
}
else
{
?>
	<p>Copyright © 2020 Eric Lowry. Licensed under <a href="/LICENSE.txt">AGPL 3.0</a>.</p>
	<p>Follow <a href="https://github.com/ELowry/StadiaIcons/" target="_blank" rel="noreferrer noopener">StadiaIcons on GitHub</a></p>
<?php
}
?>
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