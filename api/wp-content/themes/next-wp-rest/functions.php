<?php

require dirname( __FILE__ ) . '/vendor/autoload.php';
require dirname( __FILE__ ) . '/src/Init.php';

add_action('graphql_register_types', function () {
    register_graphql_field('Post', 'elementorData', [
        'type' => 'String',
        'discription' => __('Elementor Data JSON', 'wp-graphql'),
        'resolve' => function ($post) {
            $data = get_post_meta($post->ID, '_elementor_data', true);
            return !empty($data) ? $data : null;
        }
    ]);
});
