<?php
namespace KarmaBuilder\SettingPanel;

use KarmaBuilder\FPD\Karma_Factory_Pattern as Karma_Factory_Pattern;

if ( ! defined( 'ABSPATH' ) ) {
	/** Exit if accessed directly. */
	die('Silence is golden');
}

/**
 * The file that defines the builder controllers
 *
 * A class definition that controllers use in elements panel
 *
 * @link       http://pixflow.net
 * @since      0.1.0
 *
 * @package    Karma_Builder
 * @subpackage Karma_Controller/includes
 */

/**
 * Builder controllers.
 *
 * This includes builder builder controllers and load their dependency.
 *
 *
 * @since      0.1.0
 * @package    Karma_Controller
 * @subpackage Karma_Controller/includes
 * @author     Pixflow <info@pixflow.net>
 */


class Karma_Builder_Setting_Panel {

	const TITLE = 'title';

	const TITLE_WITH_BACKGROUND = 'title-with-background';

	const IMAGE = 'image';

	const RANGE = 'range';

	const TEXT = 'text';

	const COLOR_PICKER = 'color-picker';

	const RADIO_IMAGE = 'radio-image';

	const RANGE_SLIDER = 'range-slider';

	const GRID = 'grid';

	const CHECK_BOX = 'check-box';

	const IMAGE_POSITION = 'image-position';

	const UNSPLASH = 'unsplash';

	const SWITCH_PANEL = 'switch-panel';

	const UPLOAD_IMAGE = 'upload-image';

	const DROPDOWN = 'dropdown';

	const TAB = 'tab';


	/**
	 * Load and register the sub templates in builder
	 *
	 * @since    0.1.0
	 * @access   private
	 */
	private $extends = array(
		'groups'	=>	'setting-panel-groups'
	);

	/**
	 * Load and register the controllers in builder
	 *
	 * @since    0.1.0
	 * @access   public
	 */
	public function register_controllers(){

		$class_info = new \ReflectionClass( __CLASS__ );
		$available_controller = $class_info->getConstants();
		$available_controller  = apply_filters( 'karma_controller', $available_controller  );
		$karma_view = Karma_Factory_Pattern::$builder_views;
		foreach ( $available_controller as $controller ){
			$karma_view->load_controller_js_templates( $controller );
			$karma_view->load_controller_script( $controller );
		}

	}

	/**
	 * Load and register extends in builder
	 *
	 * @since    0.1.0
	 * @access   public
	 */
	public function register_extends(){

		$extends = $this->extends;
		$available_extends = apply_filters( 'karma_builder_extends', $extends );
		$karma_view = Karma_Factory_Pattern::$builder_views;
		foreach ( $available_extends as $extend ){
			$karma_view->load_extend_js_templates( $extend );
			$karma_view->load_extend_script( $extend );
		}

	}

}

