<?php
/*
Plugin Name: Mits Imsakiyah
Plugin URI: http://adisucipto.net
Description: shortcode imsakiyah menggunakan prayertimes.js
Version: 0.0.1
Author: adi sucipto
Author URI: https://adisucipto.
*/

// First register resources with init
function mits_imsakiyah_resource() {
	wp_register_script("mits-imsakiyah-lib", plugin_dir_url(__FILE__)."js/PrayTimes/PrayTimes.js");
    wp_register_script("mits-imsakiyah-script", plugin_dir_url(__FILE__)."js/imsakiyah.js", array('jquery','mits-imsakiyah-lib'));
	wp_register_style("mits-imsakiyah-style", plugin_dir_url(__FILE__)."css/style.css", array());
}
add_action( 'init', 'mits_imsakiyah_resource' );

add_shortcode( 'mits_imsakiyah', 'mits_imsakiyah' );
function mits_imsakiyah() {

	//wp_enqueue_script( 'jquery' );
	wp_enqueue_script("mits-imsakiyah-script");
	wp_enqueue_style("mits-imsakiyah-style");

	//tampilan imsakiyah
    $imsakiyah = "";
    $imsakiyah .='<div class="imsakiyah">';
    //inner
    $imsakiyah .='  <div class="imsakiyah-inner">';

    //judul + pilih kota
    //$imsakiyah .='      <div id="pilih-kota"></div>';
    //tabel imsakiyah
    $imsakiyah .='<table align="center">
<tr>
    <td id="table-title" class="caption"></td>
    <td id="pilih-kota"></td>
</tr>
</table>';
    $imsakiyah .='<table id="timetable" class="timetable">';
    $imsakiyah .='<tbody></tbody>';
    $imsakiyah .='</table>';

    $imsakiyah .='  </div>';
    //end inner
    $imsakiyah .='</div>';


	return $imsakiyah;
}
