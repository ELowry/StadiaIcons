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

	if( !isset( $errors ) )
	{
		$errors = [];
	}

	// LANGUAGE DETECTION

	// Grab Available Languages

	$langs = file_get_contents( $_SERVER['DOCUMENT_ROOT'] . '/lang/langs.json' );

	if ( $langs === false )
	{
		array_push( $errors, 'The langs JSON file could not be retrieved.' );
	}
	else
	{
		$langs = json_decode( $langs );
		
		if ( $langs === null )
		{
			array_push( $errors, 'The langs JSON file could not be parsed.' );
		}
	}

	// Grab Language Parameter

	$lang = null;
	$possibles = [];

	if( !isset( $_GET['lang'] ) || !$lang = filter_var( $_GET['lang'], FILTER_SANITIZE_STRING ) )
	{
		$lang = null;
	}
	else
	{
		$lang = VerifyLang( $lang, $langs, $possibles );
	}

	if( $lang === null )
	{

		// Grab Browser Preferences

		if( !isset( $_SERVER['HTTP_ACCEPT_LANGUAGE'] ) )
		{
			return [];
		}
		$languageList = $_SERVER['HTTP_ACCEPT_LANGUAGE'];

		$languages = [];
		$languageRanges = explode( ',', trim( $languageList ) );

		foreach( $languageRanges as $languageRange )
		{
			if( preg_match( '/(\*|[a-zA-Z0-9]{1,8}(?:-[a-zA-Z0-9]{1,8})*)(?:\s*;\s*q\s*=\s*(0(?:\.\d{0,3})|1(?:\.0{0,3})))?/', trim( $languageRange ), $match ) )
			{
				if( !isset( $match[2] ) )
				{
					$match[2] = '1.0';
				}
				else
				{
					$match[2] = (string)floatval( $match[2] );
				}

				if( !isset( $languages[$match[2]] ) )
				{
					$languages[$match[2]] = [];
				}

				$languages[$match[2]][] = strtolower( $match[1] );
			}
		}

		krsort( $languages );

		foreach( $languages as $priority => $val )
		{
			if( $priority != 0 )
			{
				foreach( $val as $language )
				{
					$result = VerifyLang( $language, $langs, $possibles );
					if( $result !== null && $result !== false )
					{
						$lang = $result;
						break 2;
					}
				}
			}
		}

	}

	if( empty( $lang ) )
	{
		if( count( $possibles ) > 0 )
		{
			$lang = $langs->{ $possibles[0] }[0];
		}
		else
		{
			$lang = 'en_US';
		}
	}

	// Grab the corresponding file
	
	if ( empty( $lang ) )
	{
		array_push( $errors, '' );
	}
	else
	{
		$langData = file_get_contents( $_SERVER['DOCUMENT_ROOT'] . '/lang/'  . $lang . '.json' );

		if ( $langData === false )
		{
			array_push( $errors, 'The ' . $lang . ' JSON file could not be retrieved.' );
		}
		else
		{
			$langData = json_decode( $langData );
		
			if ( $langData === null )
			{
				array_push( $errors, 'The ' . $lang . ' JSON file could not be parsed.' );
			}
		}
		
		$langPrefix = preg_split( "/(-|_)/", $lang )[0];
	}


	// TRANSLATION FUNCTION

	function __()
	{
		$args = func_get_args();
		$count = count( $args );
		
		if( $count <= 0 )
		{
			return null;
		}
		elseif( $count == 1 )
		{
			return GetTranslation( $args[0] );
		}
		elseif( $count == 2 )
		{
			if( strpos($args[0], '%s') === false )
			{
				return null;
			}
			return sprintf( GetTranslation( $args[0] ), $args[1] );
		}
		else
		{
			$argParams = [];
			for($i = 1; $i < $count; $i++ )
			{
				if( strpos($args[0], '%' . $i . '$s') === false )
				{
					return null;
				}
				array_push( $argParams, $args[$i] );
			}
			return vsprintf( GetTranslation( $args[0] ), $argParams );
		}
	}
	function _e()
	{
		$args = func_get_args();
		echo call_user_func_array("__", $args);
	}


	// TOOLS

	function VerifyLang( $lang, $langs, &$possibles )
	{
		$lang = preg_split( "/(-|_)/", $lang );
		$prefix = strtolower( $lang[0] );
		if( count( $lang ) <= 1 )
		{
			if( property_exists( $langs, $prefix ) )
			{
				array_push( $possibles, $prefix );
			}
			return false;
		}
		$suffix = strtoupper( $lang[1] );
		$lang = $prefix . '_' . $suffix;
		
		if( $langs === null || !property_exists( $langs, $prefix ) )
		{
			return null;
		}
		foreach( $langs->$prefix as $langCode )
		{
			if ( $langCode === $lang )
			{
				return $lang;
			}
		}
		array_push( $possibles, $prefix );
		return false;
	}

	function GetTranslation( $str )
	{
		global $langData;
		global $lang;
		global $errors;

		if( empty( $str ) || empty( $langData ) )
		{
			return false;
		}

		$outcome = $langData;

		$str = explode( "->", $str );
		for( $i = 0; $i < count( $str ); $i++ )
		{
			if( !property_exists( $outcome, $str[$i] ) )
			{
				array_push( $errors, 'The translation string "' . $str[$i] . '" is missing from the ' . $lang . ' language file.' );
				return null;
			}
			$outcome = $outcome->{ $str[$i] };
		}
		return $outcome;
	}