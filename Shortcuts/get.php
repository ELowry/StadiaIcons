<?php
	$myURL = 'https://stadiaicons.000webhostapp.com';
	$errors = [];
	$uid = null;
	
	if ( !( isset( $ignoreGET ) && $ignoreGET === true ) )
	{
		
		$subdir = trim( explode( '?', $_SERVER['REQUEST_URI'], 2 )[0], '/' );
	
		if( !isset( $_GET['fullName'] ) || !$fullName = filter_var ( $_GET['fullName'], FILTER_SANITIZE_STRING ) )
		{
			$fullName = null;
			array_push( $errors, 'The fullName parameter is missing or invalid.' );
		}
		
		if( !isset( $_GET['shortName'] ) || !$shortName = filter_var ( $_GET['shortName'], FILTER_SANITIZE_STRING ) )
		{
			$shortName = $fullName;
		}
		
		if( !isset( $_GET['uid'] ) || !$uid = filter_var ( $_GET['uid'], FILTER_SANITIZE_STRING ) )
		{
			$uid = null;
			array_push( $errors, 'The uid parameter is missing or invalid.' );
		}
		elseif( $uid === 'defaultIcon' || preg_match( '/^[A-z0-9]{32}rcp1$/', $uid ) !== 1 )
		{
			$uid = null;
			array_push( $errors, 'The uid parameter does not follow the proper format.' );
		}
		elseif( (isset( $checkSubdir ) && $checkSubdir === true) && $uid !== $subdir )
		{
			$uid = null;
			array_push( $errors, 'The uid parameter does not correspond to the current subdirectory.' );
		}
		
		if( !isset( $_GET['variant'] ) || !$variant = filter_var ( $_GET['variant'], FILTER_SANITIZE_NUMBER_INT ) )
		{
			$variant = 0;
		}
		
		if( !isset( $_GET['alt'] ) || !$alt = filter_var ( $_GET['alt'], FILTER_SANITIZE_STRING ) )
		{
			$alt = '';
		}
		
	}
	
	$refs = file_get_contents( "https://raw.githubusercontent.com/ELowry/StadiaIcons/master/refs.json" );
	$data = null;
	
	if ( $refs === false )
	{
		array_push( $errors, 'The refs JSON file could not be retrieved.' );
	}
	else
	{
		$data = json_decode( $refs );
		
		if ( $data === null )
		{
			array_push( $errors, 'The refs JSON file could not be parsed.' );
		}
	}