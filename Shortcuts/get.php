<?php
	$myURL = 'https://stadiaicons.000webhostapp.com';
	
	if( !isset( $_GET['fullName'] ) || !$fullName = filter_var ( $_GET['fullName'], FILTER_SANITIZE_STRING ) ) {
		$fullName = null;
	}
	if( !isset( $_GET['shortName'] ) || !$shortName = filter_var ( $_GET['shortName'], FILTER_SANITIZE_STRING ) ) {
		$shortName = $fullName;
	}
	if( !isset( $_GET['uid'] ) || !$uid = filter_var ( $_GET['uid'], FILTER_SANITIZE_STRING ) ) {
		$uid = null;
	}
	if( !isset( $_GET['variant'] ) || !$variant = filter_var ( $_GET['variant'], FILTER_SANITIZE_NUMBER_INT ) ) {
		$variant = 0;
	}
	if( !isset( $_GET['alt'] ) || !$alt = filter_var ( $_GET['alt'], FILTER_SANITIZE_STRING ) ) {
		$alt = '';
	}
	
	$data = json_decode( file_get_contents( "https://raw.githubusercontent.com/ELowry/StadiaIcons/master/refs.json" ) );