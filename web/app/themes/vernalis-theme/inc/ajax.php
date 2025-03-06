<?php

function ajax_seances() {

	$salle_id = isset( $_POST['salle_id'] ) ? $_POST['salle_id'] : null;

	$args_events = array(
		'post_type' => 'product',
		'posts_per_page' => -1,
		'order' => 'DESC',
		'orderby' => 'publish_date',
		'post_status' => array( 'publish' ),
	);

	$args_events['meta_query'] = array(
		'relation' => 'and',
		array(
			'key'     => 'salle',
			'value'   => $salle_id,
			'compare' => '=',
		),
	);

	// sort by month
	$events = Timber\Timber::get_posts( $args_events )->to_array();
	$response = array();
	foreach ( $events as $key => $event ) {
		$seances = get_field( 'seance', $event->ID );
		$seances = array_filter(
			$seances,
			function ( $seance ) {
				$seance_date = DateTime::createFromFormat( 'd/m/Y H:i', $seance['date_et_heure'] );
				$seance_date = $seance_date->getTimestamp();
				$calendar_start_date = isset( $_POST['start'] ) ? $_POST['start'] : null;
				$calendar_end_date = isset( $_POST['end'] ) ? $_POST['end'] : null;
				return $seance_date > $calendar_start_date && $seance_date < $calendar_end_date;
			}
		);
		// get only date_et_heure property in seances
		$seances = array_map(
			function ( $seance ) {
				return $seance['date_et_heure'];
			},
			$seances
		);
		if ( empty( $seances ) ) {
			continue;
		}
		$response = $seances;
	}
	wp_send_json_success( $response );
	die;
}

add_action( 'wp_ajax_generate_calendar_seances', 'ajax_seances' );
add_action( 'wp_ajax_nopriv_generate_calendar_seances', 'ajax_seances' );
