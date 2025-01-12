<?php

namespace KarmaBuilder\FPD;

/** Importing, Aliases, and Name Resolution */
use KarmaBuilder\Karma_Builder as Karma_Builder;
use KarmaBuilder\TypographyManager\Karma_Typography as Karma_Typography;
use KarmaBuilder\Core\Karma_Builder_Core as Karma_Builder_Core;
use KarmaBuilder\i18n\Karma_Builder_i18n as Karma_Builder_i18n;
use KarmaBuilder\BuilderLoader\Karma_Builder_Loader as Karma_Builder_Loader;
use KarmaBuilder\Views\Karma_Views as Karma_Views;
use KarmaBuilder\SettingPanel\Karma_Builder_Setting_Panel as Karma_Builder_Setting_Panel;
use KarmaBuilder\AdminArea\BuilderAdmin\Karma_Builder_Admin as Karma_Builder_Admin;
use KarmaBuilder\PublicArea\Karma_Builder_Public as Karma_Builder_Public;
use KarmaBuilder\Stylesheet\Karma_Stylesheet as Karma_Stylesheet;


if ( ! defined( 'ABSPATH' ) ) {
	/** Exit if accessed directly. */
	die( 'Silence is golden' );
}


/**
 * A Class Simple Creates the object and you want to use that object
 *
 * A Class definition that includes instance of different classes
 *
 * @link       http://pixflow.net
 * @since      0.1.0
 *
 * @package    Karma_Factory_Pattern
 * @subpackage Karma_Factory_Pattern/includes
 */

/**
 * Factory class.
 *
 * This includes base instance of different classes.
 *
 *
 * @since      0.1.0
 * @package    Karma_Factory_Pattern
 * @subpackage Karma_Factory_Pattern/includes
 * @author     Pixflow <info@pixflow.net>
 */
class Karma_Factory_Pattern {

	/**
	 * Class builder instance
	 *
	 * @since    0.1.0
	 * @access   public
	 * @var      object
	 */
	public static $builder;


	/**
	 * Class builder activator instance
	 *
	 * @since    0.1.0
	 * @access   public
	 * @var      object
	 */
	public static $builder_activator;

	/**
	 * Class builder core instance
	 *
	 * @since    0.1.0
	 * @access   public
	 * @var      object
	 */
	public static $builder_core;

	/**
	 * Class builder deactivator instance
	 *
	 * @since    0.1.0
	 * @access   public
	 * @var      object
	 */
	public static $builder_deactivator;

	/**
	 * Class builder i18n instance
	 *
	 * @since    0.1.0
	 * @access   public
	 * @var      object
	 */
	public static $builder_i18n;

	/**
	 * Class builder loader instance
	 *
	 * @since    0.1.0
	 * @access   public
	 * @var      object
	 */
	public static $builder_loader;

	/**
	 * Class builder views instance
	 *
	 * @since    0.1.0
	 * @access   public
	 * @var      object
	 */
	public static $builder_views;

	/**
	 * Class builder controller instance
	 *
	 * @since    0.1.0
	 * @access   public
	 * @var      object
	 */
	public static $builder_controller;


	/**
	 * Class builder admin instance
	 *
	 * @since    0.1.0
	 * @access   public
	 * @var      object
	 */
	public static $builder_admin;


	/**
	 * Class builder public instance
	 *
	 * @since    0.1.0
	 * @access   public
	 * @var      object
	 */
	public static $builder_public;

	/**
	 * Class karma stylesheet instance
	 *
	 * @since    0.1.0
	 * @access   public
	 * @var      object
	 */
	public static $stylesheet;

	/**
	 * Class karma typography instance.
	 *
	 * @since    0.1.0
	 * @access   public
	 * @var      object
	 */
	public static $typography;


	/**
	 * Private clone method to prevent cloning of the instance of the
	 * *Singleton* instance.
	 *
	 * @access   private
	 * @return   void
	 * @since    0.1.0
	 */
	private function __clone() {
	}

	/**
	 * Private unserialize method to prevent unserializing of the *Singleton* instance.
	 *
	 * @access   private
	 * @return   void
	 * @since    0.1.0
	 */
	private function __wakeup() {
	}

	/**
	 * Get builder instance
	 * @since    0.1.0
	 */
	public function __construct() {

		self::$builder = Karma_Builder::get_instance( $this );

	}


	/**
	 * Ready for get classes instance
	 * @since    0.1.0
	 */
	public function set_builder_class_instance() {

		$this->load_builder_typography();
		$this->load_builder_core();
		$this->load_builder_i18n();
		$this->load_builder_loader();
		$this->load_builder_views();
		$this->load_builder_controller();
		$this->load_builder_admin();
		$this->load_builder_public();
		$this->load_builder_stylesheet();

	}

	/**
	 * Set builder core class instance
	 * @since    0.1.0
	 */
	protected function load_builder_core() {

		self::$builder_core = Karma_Builder_Core::get_instance();

	}


	/**
	 * Set builder i18n class instance
	 * @since    0.1.0
	 */
	protected function load_builder_stylesheet() {

		self::$stylesheet = new Karma_Stylesheet();

	}

	/**
	 * Set builder i18n class instance
	 * @since    0.1.0
	 */
	protected function load_builder_i18n() {

		self::$builder_i18n = new Karma_Builder_i18n();

	}

	/**
	 * Set builder loader class instance
	 * @since    0.1.0
	 */
	protected function load_builder_loader() {

		self::$builder_loader = new Karma_Builder_Loader();

	}

	/**
	 * Set builder views class instance
	 * @since    0.1.0
	 */
	protected function load_builder_views() {

		self::$builder_views = new Karma_Views();

	}

	/**
	 * Set builder controller class instance
	 * @since    0.1.0
	 */
	protected function load_builder_controller() {

		self::$builder_controller = new Karma_Builder_Setting_Panel();

	}

	/**
	 * Set builder admin class instance
	 * @since    0.1.0
	 */
	protected function load_builder_admin() {

		self::$builder_admin = new Karma_Builder_Admin();

	}

	/**
	 * Set builder public class instance
	 * @since    0.1.0
	 */
	protected function load_builder_public() {

		self::$builder_public = new Karma_Builder_Public( self::$builder->get_plugin_name(), self::$builder->get_version() );

	}

	/**
	 * Set builder typography class instance
	 * @since    0.1.0
	 */
	protected function load_builder_typography() {

		self::$typography = new Karma_Typography();

	}

}