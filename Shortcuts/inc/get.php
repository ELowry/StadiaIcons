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
	
	$myURL = 'https://stadiaicons.000webhostapp.com';
	$errors = [];
	$uid = null;
	
	
	// GATHERING & SANITIZING GET PARAMETERS
	
	if ( !( isset( $ignoreGET ) && $ignoreGET === true ) )
	{
		
		$subdir = trim( explode( '?', $_SERVER['REQUEST_URI'], 2 )[0], '/' );
	
		if( !isset( $_GET['fullName'] ) || !$fullName = filter_var( $_GET['fullName'], FILTER_SANITIZE_STRING ) )
		{
			$fullName = null;
			array_push( $errors, 'The fullName parameter is missing or invalid.' );
		}
		
		if( !isset( $_GET['shortName'] ) || !$shortName = filter_var( $_GET['shortName'], FILTER_SANITIZE_STRING ) )
		{
			$shortName = $fullName;
		}
		
		if( !isset( $_GET['uid'] ) || !$uid = filter_var( $_GET['uid'], FILTER_SANITIZE_STRING ) )
		{
			$uid = null;
			array_push( $errors, 'The uid parameter is missing or invalid.' );
		}
		elseif( !checkUID( $uid ) )
		{
			$uid = null;
			array_push( $errors, 'The uid parameter does not follow the proper format.' );
		}
		elseif( (isset( $checkSubdir ) && $checkSubdir === true) && $uid !== $subdir )
		{
			$uid = null;
			array_push( $errors, 'The uid parameter does not correspond to the current subdirectory.' );
		}
		
		if( !isset( $_GET['variant'] ) || !$variant = filter_var( $_GET['variant'], FILTER_SANITIZE_NUMBER_INT ) )
		{
			$variant = 0;
		}
		
		if( !isset( $_GET['alt'] ) || !$alt = filter_var( $_GET['alt'], FILTER_SANITIZE_STRING ) )
		{
			$alt = '';
		}
		
	}
	
	
	// FETCHING THE STADIAICONS DATASET
	
	$gitBase = 'https://raw.githubusercontent.com/ELowry/StadiaIcons/master/';
	$refs = file_get_contents( $gitBase . 'refs.json' );
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
	
	
	// SANITIZING THE STADIAICONS DATASET
	
	$cleanData = $data;
	$dataError = false;
	
	// Checking the structure
	
	if( !property_exists( $cleanData, 'datasets') )
	{
		array_push( $errors, 'The refs.json data structure is missing the datasets object.' );
		$dataError = true;
	}
	if( !property_exists( $cleanData, 'other') )
	{
		array_push( $errors, 'The refs.json data structure is missing the others object.' );
		$dataError = true;
	}
	if( !property_exists( $cleanData, 'uids') )
	{
		array_push( $errors, 'The refs.json data structure is missing the uids object.' );
		$dataError = true;
	}
	
	// Checking contents
	
	// datasets
	foreach( $cleanData->datasets as $key => &$dataset )
	{
		if( !property_exists( $dataset, 'extension') )
		{
			array_push( $errors, 'The refs.json data structure\\\'s ' . $key . ' dataset is missing the extension value.' );
			$dataError = true;
		}
		else
		{
			$dataset->extension = filter_var ( $dataset->extension, FILTER_SANITIZE_STRING );
			if( $dataset->extension == false || substr( $dataset->extension, 0, 1 ) !== '.' && strlen( $dataset->extension ) < 7 )
			{
				array_push( $errors, 'The refs.json data structure\\\'s ' . $key . ' dataset\\\'s extension value is not valid.' );
				$dataError = true;
			}
		}
		
		if( !property_exists( $dataset, 'uri') )
		{
			array_push( $errors, 'The refs.json data structure\\\'s ' . $key . ' dataset is missing the uri value.' );
			$dataError = true;
		}
		else
		{
			$dataset->uri = filter_var ( $dataset->uri, FILTER_SANITIZE_STRING );
			if( $dataset->uri === false || substr ($dataset->uri, 0, strlen($gitBase) ) !== $gitBase )
			{
				array_push( $errors, 'The refs.json data structure\\\'s ' . $key . ' dataset\\\'s uri value is not valid.' );
				$dataError = true;
			}
		}
	}
	
	// other
	if( !property_exists( $cleanData->other, 'altSuffix' ) )
	{
		array_push( $errors, 'The refs.json data structure\\\'s other object is missing the altSuffix value.' );
		$dataError = true;
	}
	else
	{
		$cleanData->other->altSuffix = filter_var ( $cleanData->other->altSuffix, FILTER_SANITIZE_STRING );
		if( $cleanData->other->altSuffix === false )
		{
			array_push( $errors, 'The refs.json data structure\\\'s other object value is not valid.' );
			$dataError = true;
		}
	}
	
	// uids
	foreach( $cleanData->uids as $key => &$currUid )
	{
		if( !checkUID( $key ) )
		{
			array_push( $errors, 'The refs.json data structure\\\'s ' . $key . ' uid is not a valid game uid.' );
			$dataError = true;
		}
		elseif( count( (array)$currUid ) <= 0 )
		{
			array_push( $errors, 'The refs.json data structure\\\'s ' . $key . ' uid does not have children.' );
			$dataError = true;
		}
		else{
			foreach( $currUid as $subkey => &$currName )
			{
				$currName = filter_var ( $currName, FILTER_SANITIZE_STRING );
				if( $currName == false )
				{
					array_push( $errors, 'The refs.json data structure\\\'s ' . $key . ' uid\\\'s ' . $subkey . ' value is not valid.' );
					$dataError = true;
				}
			}
		}
	}
	
	// Applying data if clean or nulling it in the case of errors
	if( $dataError )
	{
		$data = null;
	}
	else
	{
		$data = $cleanData;
	}
	
	if ( !( isset( $ignoreGET ) && $ignoreGET === true ) )
	{
	
		// ALT fallback
		if( $alt !== '' )
		{
			$alt = $data->other->altSuffix;
		}
		
		// GATHER RELEVANT INFO INTO A CLEAN OBJECT
		
		$info = new stdClass();
		
		$info->isValid = ($fullName != null && $shortName != null && $uid != null && $data!= null);
			
		$info->hasIcon = ( $uid !== null && property_exists( $data->uids, $uid ) );
		
		if( !$info->hasIcon )
		{
			$uid = 'defaultIcon';
		}
		
		
		$info->shortcutUrl = $myURL . '/' . $uid . '/?fullName=' . $fullName . '&shortName=' . $shortName . '&uid=' . $uid;
		
		$info->variantFound = ( $variant != null );
		if( $info->variantFound )
		{
			for( $variant; $variant >= 0; $variant-- )
			{
				if( property_exists( $data->uids->$uid, $variant ) )
				{
					break;
				}
				else
				{
					$info->variantFound = false;
				}
			}
			$info->shortcutUrl .= '&variant=' . $variant;
		}
		
		if( $alt != null )
		{
			$info->shortcutUrl .= '&alt=' . $alt;
		}
		
		
		
		if( $uid != null && $data!= null )
		{
			$info->images = new stdClass();
			
			$info->images->icon = $data->datasets->icons->uri . $data->uids->$uid->$variant . $alt . $data->datasets->icons->extension;
			$info->images->image128 = $data->datasets->{'images-128'}->uri . $data->uids->$uid->$variant . $alt . $data->datasets->{'images-128'}->extension;
			$info->images->image192 = $data->datasets->{'images-192'}->uri . $data->uids->$uid->$variant . $alt . $data->datasets->{'images-192'}->extension;
			$info->images->image512 = $data->datasets->{'images-512'}->uri . $data->uids->$uid->$variant . $alt . $data->datasets->{'images-512'}->extension;
			$info->images->image = $data->datasets->images->uri . $data->uids->$uid->$variant . $alt . $data->datasets->images->extension;
			$info->images->webp = $data->datasets->webp->uri . $data->uids->$uid->$variant . $alt . $data->datasets->webp->extension;
		}
	
	}
	
	// TOOLS
	
	function checkUID( $uidVal )
	{
		return $uidVal === 'defaultIcon' || preg_match( '/^[A-z0-9]{32}rcp1$/', $uidVal ) === 1;
	}