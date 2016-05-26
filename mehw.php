<?php
/*
Plugin Name: Match Element Height Width
Plugin URI: http://ozwebservices.com/
Description: Use CSS class selector(s) to make DOM elements same width and/or height. (Makes use of jQuery.)
Author: Hugh Smith
Author URI: http://ozwebservices.com/
Version: 0.3
*/

// No direct access
if ( ! defined( 'ABSPATH' ) ) exit;


if ( ! class_exists( "ozMatchElementHeightWidth" ) ) {
class ozMatchElementHeightWidth {



	function __construct() {

		add_shortcode( 'mehw', array( $this, 'run_shortcode' ) );

		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
	}

	function run_shortcode( $atts, $content = null ) {

		extract( shortcode_atts( array(
			'target'     => '',        // selector, multiples '|' separated
			'match'      => 'height',  // height, width, both
			'responsive' => true,
		), $atts ) );

		// Return a commented message if no target is passed
		if ( $target == '' ) {

			return '<!-- MEHW: a target/selector was not passed into shortcode, [mehw target="TARGET"] -->';
		}

		ob_start();
		?><script>jQuery(document).ready(function($){new ozMEHW({<?php


			echo 't:"'.$target.'"';
			echo $match == 'height' ? '' : ',m:"'.$match.'"' ;
			echo $responsive        ? '' : ',r:"false"'      ;


		?>})})</script><?php

		return ob_get_clean();
	}

	function enqueue_scripts() {

		wp_register_script( 'mehw' , plugins_url('/js/mehw.min.js', __FILE__), array('jquery'), '1.0', true );
		wp_enqueue_script( 'mehw' );
	}

}
}
$mehw = new ozMatchElementHeightWidth();

