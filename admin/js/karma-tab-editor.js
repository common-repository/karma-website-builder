/**
 * karmaTabEditor manager
 * The resources that add karma tab to WordPress post editor
 *
 * @since 0.1.0
 * @returns { void }
 */
var karmaTabEditor;
karmaTabEditor = function () {

	this.useKarma = karmaTabEditorData.use_karma;
	this.post = karmaTabEditorData.post_id;
	this.karmaURL = karmaTabEditorData.builder;
	var input = document.querySelector( 'input[value="karma_page"]' );
	if ( null != input ) {
		var inputID = input.getAttribute( 'id' );
		inputID = inputID.replace( "-key", "-value" );
		this.postMeta = document.getElementById( inputID );
	} else {
		this.postMeta = null;
	}
	this.init();

};

/**
 * init tab editor and events
 *
 * @since 0.1.0
 * @returns {void}
 */
karmaTabEditor.prototype.init = function () {

	'use strict';
	this.appendTabTOEditor();
	this.appendTabContainer();
	this.initTabEvent();
	if ( 'true' == this.useKarma ) {
		this.switchToKarma();
	}

};

/**
 * append tab to editor tabs
 *
 * @since 0.1.0
 * @returns {void}
 */
karmaTabEditor.prototype.appendTabTOEditor = function () {

	'use strict';
	var tabs = document.querySelector( '.wp-editor-tabs' ),
		karmaTab = document.createElement( 'button' );
	karmaTab.innerHTML = 'Karma Builder';
	karmaTab.setAttribute( 'id', 'content-karma' );
	karmaTab.setAttribute( 'class', 'wp-switch-editor switch-karma' );
	tabs.appendChild( karmaTab );
	this.tab = karmaTab;

};


/**
 * append karma tab container
 *
 * @since 0.1.0
 * @returns {void}
 */
karmaTabEditor.prototype.appendTabContainer = function () {

	'use strict';
	var wpContainer = document.getElementById( 'wp-content-editor-container' ),
		karmaContainer = document.createElement( 'div' );
	karmaContainer.innerHTML = '<div class="karma-tab-open-builder">' +
		'<div class="karma-tab-title">Build & Edit This Page Fully Visually</div>' +
		'<a class="karma-tab-button" href="' + this.karmaURL + '" target="_self">Edit With Karma</a>' +
		'</div>';
	karmaContainer.setAttribute( 'id', 'karma-container' );
	wpContainer.appendChild( karmaContainer );
	this.container = karmaContainer;

};

/**
 * add event to karma tab
 *
 * @since 0.1.0
 * @returns {void}
 */
karmaTabEditor.prototype.initTabEvent = function () {

	'use strict';
	var that = this,
		$ = jQuery;

	$( '.wp-switch-editor' ).on( 'click', function ( e ) {

		if ( $( this ).hasClass( 'switch-karma' ) ) {
			e.preventDefault();
			e.stopPropagation();
			that.switchToKarma();
		} else {
			that.switchToWordPress();
		}
	} )

};

/**
 * switch to WordPress content
 *
 * @since 0.1.0
 * @returns {void}
 */
karmaTabEditor.prototype.switchToWordPress = function () {

	'use strict';
	document.getElementById( 'wp-content-wrap' ).classList.remove( 'karma-active' );
	this.container.classList.remove( 'karma-active' );
	this.tab.classList.remove( 'karma-active' );
	this.useKarma = false;
	if ( null != this.postMeta ) {
		this.postMeta.value = 'false';
	}

};

/**
 * switch to karma content
 *
 * @since 0.1.0
 * @returns {void}
 */
karmaTabEditor.prototype.switchToKarma = function () {

	'use strict';
	document.getElementById( 'wp-content-wrap' ).classList.add( 'karma-active' );
	this.container.classList.add( 'karma-active' );
	this.tab.classList.add( 'karma-active' );
	if ( null != this.postMeta ) {
		this.postMeta.value = 'true';
	}
	this.useKarma = true;

};

window.addEventListener( 'load', function () {
	new karmaTabEditor;
} );
