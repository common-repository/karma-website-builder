( function( $, karmaBuilder ){

	karmaBuilder.shortcodes = Backbone.View.extend({

		events: {
			'before/buildGizmo'									: 'gimzoAction' ,
			'karma/before/deleteElement'                        : 'removeElementPlaceholder',
			'karma/after/deleteElement'                        	: 'createPlaceholderOnDelete',
			'click .karma-drop-down-icon'						: 'openDropDownGizmo' ,
			'click'												: 'showElementGizmo',
			'click.childGizmo .karma-have-child-gizmo'			: 'showElementChildGizmo',
			'click.showGizmo .karma-more-setting'				: 'showGizmoRelatedToMore',
			'click .karma-drop-down-box'						: 'updateDropDownBox' ,
			'click .karma-delete-element-setting'				: "deleteElementBox",
			'click .karma-duplicate-element-setting'			: "duplicateElement",
			'click.removeActiveElement'         			    : 'callBlur',
			'click .karma-delete-message-box-delete-button'     : 'DeleteElement',
			'click .karma-delete-message-box-cancel-button'     : 'cancelDeleteElement',
			'click .karma-delete-message-box'   			    : 'cancelDeleteElement',
			'click .karma-delete-message-container'   			: 'deleteBoxStopPropagation',
			'click .karma-new-section-button'   				: 'newSectionDropDown',
			'karma/after/clickElement'							: 'updateHiddenGizmoStatus',
			'karma/finish/dropElement'							: 'createDefaultResponsiveSpace'



		},


		/** Drop area template for elements */
		placeholderTemplate: '<div class="karma-element-placeholder {{ data.className }}" >'
		+ '<div class="karma-inner-placeholder" >'
		+ '</div>'
		+ '</div>',

		/** Alignment placeholder for elements */
		alignmentPlaceholderTemplate: '<div class="karma-left-alignment-placeholder" data-element-align="left" >'
		+ '</div>'
		+ '<div class="karma-center-alignment-placeholder" data-element-align="center" >'
		+ '</div>'
		+ '<div class="karma-right-alignment-placeholder" data-element-align="right" >'
		+ '</div>',

		resizeId : 0 ,

		initialize : function( options ) {

			this.template = options.template;

			if( this.model ) {
				_.bindAll(this, "update","destroy");
				this.model.bind( 'change', this.update );
				this.model.bind( 'destroy', this.destroy );
			}
			this.gizmoParams = options.gizmoParams;
			this.callFunctionsOnResize();
			this.toolTipHtml();
			this.karmaLinksDocumentClick();
			this.initSortable();

		},

		/**
		 * ]Update column helper on window resize
		 *
		 * @since 2.0
		 *
		 * @returns {void}
		 */
		//@TODO change setTimeout to request animation frame  + make this function automatically
		callFunctionsOnResize: function (){

			var that = this;
			window.addEventListener( 'resize', function (){

				clearTimeout( that.resizeId );
				that.resizeId = setTimeout( function (){
					$('.karma-builder-element[data-name="karma_column"]').each(function (){
						var column = $(this).find('.karma-column');
						$(this).find('.ui-resizable.karma-right-spacing').css({ width : column.css('padding-right') });
						$(this).find('.ui-resizable.karma-left-spacing').css({ width : column.css('padding-left') })
					});
				}, 200 );

			} );

		},

		/**
		 * Call blur inside sortable elements
		 * jQuery stops the default functionality of the browser when sorting a list,
		 * so the blur is never called
		 *
		 * @since 0.1.0
		 *
		 * @returns {void}
		 */
		callBlur : function () {

			if ( null == this.el.querySelector( 'div[contenteditable=true]' ) ){
				document.activeElement.blur();
			}

		},

		/**
		 * Init sortable on elements
		 *
		 * @since   0.1.0
		 * @returns {void}
		 */
		initSortable: function (){

			var elementName = this.model.get( 'shortcode_name' ),
				that        = this;
			if ( 'karma_column' != elementName && 'karma_section' != elementName ){

				that.$el.find( '.karma-element-content' ).draggable( {
					zIndex  : 999999,
					helper  : 'clone',
					appendTo: '#karma-builder-layout',
					delay   : 100,
					cancel  : ".karma-active-element",
					helper: function( event ) {
						return $( event.target ).closest(".karma-builder-element").clone();
					},
					start   : function ( event, UI ){

						KarmaView.createOverlay();
						var helperNode      = UI.helper[ 0 ],
							originalElement = $( this )[ 0 ],
							oldStyle        = helperNode.getAttribute( 'style' ),
							newStyle        = oldStyle + 'width:'
								+ originalElement.offsetWidth
								+ 'px;height:'
								+ originalElement.offsetHeight
								+ 'px;transform:scale(.9);opacity:.7;';
						helperNode.setAttribute( 'style', newStyle );
						originalElement.parentElement.classList.add( 'karma-self-placeholder' );


					},
					drag: function ( event, UI ){

						KarmaView.scroll( UI, event );
						KarmaView.detectDropAreas( event, UI );

					},
					stop: function ( event ){

						KarmaView.removeOverlay();
						clearInterval( KarmaView.flyScroll );
						var dropArea        = document.querySelector( '.karma-show-placeholder' ),
							originalElement = $( this )[ 0 ],
							orginalContainer = originalElement.closest(".karma-builder-element");
						if ( null != dropArea && dropArea.classList.contains('karma-element-placeholder-' + orginalContainer.getAttribute('data-element-key') ) ) {
							orginalContainer.classList.remove( 'karma-self-placeholder' );
						} else if ( null != dropArea && dropArea.classList.contains( 'karma-alignment-placeholder' ) ){
							that.alignmentPlaceholder( originalElement, dropArea, event );
						}else if ( null != dropArea && !dropArea.classList.contains( 'karma-self-placeholder' ) ) {
							that.beforeSortElement( dropArea, orginalContainer );
						} else if ( null == dropArea && null != originalElement && orginalContainer.classList.contains('karma-self-placeholder')) {
							orginalContainer.classList.remove( 'karma-self-placeholder' );
						}
						KarmaView.removePlaceHolders();
					}
				} );
			}

		},
		/**
		 * If drop area of element is alignment drop area set the element alignment
		 *
		 * @param   {object}    originalElement Sortable element
		 * @param   {object}    dropArea        DOM node
		 * @param 	{object}  	event	DOM events
		 *
		 * @since   0.1.0
		 * @returns {void}
		 */
		alignmentPlaceholder :function ( originalElement, dropArea, event ){

			var alignPosition = document.elementFromPoint( event.clientX, event.clientY ).getAttribute( 'data-element-align');

			if ( undefined != alignPosition ) {
				this.setAttributes( {'elementalign' : alignPosition }, false );
			}

			originalElement. closest( '.karma-builder-element').classList.remove( 'karma-self-placeholder' );
			dropArea.classList.remove( 'karma-show-placeholder' );

		},

		/**
		 * set Element alignment to element
		 *
		 * @since   0.1.0
		 * @returns {void}
		 */
		elementalign : function (){

			var regex = new RegExp('(?:^|\\s)karma-element-alignment-(.*?)(?!\\S)'),
				align = this.getAttributes( [ 'elementalign' ] ),
				element = this.el;


			element.className = element.className.replace( regex, " karma-element-alignment-" + align.elementalign );

		},

		/**
		 * set padding top for element function
		 *
		 * @since   0.1.0
		 * @returns {void}
		 */
		topspacepadding : function () {

			var that = this ;
			this.renderCss( '#' + that.elementSelector(), 'padding-top', that.getAttributes( ['topspacepadding'] ).topspacepadding + 'px' );


		},

		/**
		 * set padding top for element function
		 *
		 * @since   2.0
		 * @returns {void}
		 */
		createDefaultResponsiveSpace : function () {

			var that = this;
			this.renderCss( '#' + that.elementSelector(), 'padding-top', that.getAttributes( [ 'topspacepadding' ] ).topspacepadding + 'px' );
			this.renderCss( '#' + that.elementSelector(), 'padding-top', that.getAttributes( [ 'tablettopspacepadding' ] ).tablettopspacepadding + 'px', 'tablet' );
			this.renderCss( '#' + that.elementSelector(), 'padding-top', that.getAttributes( [ 'mobiletopspacepadding' ] ).mobiletopspacepadding + 'px', 'mobile' );

		},

		/**
		 * Removes active elements
		 *
		 * @since   0.1.0
		 * @returns {void}
		 */
		removeActiveElement: function (){

			var activeElement = document.querySelector( '.karma-active-element' );
			if ( null != activeElement ){
				activeElement.classList.remove( 'karma-active-element' );
			}

		},

		/**
		 * Sort elements
		 *
		 * @param   {object}    dropArea        DOM node
		 * @param   {object}    originalElement Sortable element
		 *
		 * @since   0.1.0
		 * @returns {void}
		 */
		beforeSortElement: function ( dropArea, originalElement ){

			if ( null == dropArea ){
				/** It means the draggable should revert back to original position */
				originalElement.classList.remove( 'karma-self-placeholder' );
				return;
			}

			var viewObject       = $( originalElement ).backboneView(),
				oldParentKey     = viewObject.model.get( 'element_key' ),
				newParentKey     = dropArea.closest( '.karma-builder-element' ).getAttribute( 'data-element-key' ),
				parentColumnView = viewObject.$el.parents( '.karma-builder-element' ).backboneView(),
				elementID        = viewObject.model.get( 'shortcode_name' ).replace( /_/g, '-' ) + '-' + viewObject.model.get( 'element_key' ),
				script           = $( '#script-' + elementID ).clone(),
				style            = $( '#style-' + elementID ).clone();

			//@TODO Refine style and script tag
			this.sortElement( viewObject, dropArea, newParentKey );
			this.removeExtraAssets( elementID );
			viewObject.$el.append( script );
			viewObject.$el.append( style );
			KarmaView.$el.trigger( 'karma/after/dropElement', [ newParentKey ] );
			KarmaView.$el.trigger( 'karma/after/dropElement', [ oldParentKey ] );

			parentColumnView.createPlaceHolders();


		},

		/**
		 * Sort elements
		 *
		 * @param   {object}    viewObject      Instance of sortable element view
		 * @param   {object}    dropArea        DOM node
		 * @param   {number}    newParentKey    Parent key of sortable element
		 *
		 * @since   0.1.0
		 * @returns {void}
		 */
		sortElement: function ( viewObject, dropArea, newParentKey ){

			var htmlOBJ = viewObject.$el,
				placeholders = document.querySelectorAll('.karma-element-placeholder-' + viewObject.model.get('element_key') ),
				placeholder = ( 2 == placeholders.length ) ? placeholders[1] : placeholders[0];

			$( placeholder ).remove();
			viewObject.el.outerHTML = '';
			$( dropArea ).replaceWith( htmlOBJ );
			viewObject.el.classList.remove( 'karma-self-placeholder' );
			viewObject.model.set( { 'parent_key': newParentKey, 'order': 1 }, { silent: true } );
			viewObject.createPlaceHolders();
			if ( "karma_image" == viewObject.model.get( 'shortcode_name' ) ){
				var columnInstance = viewObject.$el.closest( '.karma-builder-element[data-name="karma_column"]' ).backboneView();
				columnInstance.$el.trigger( 'karma/finish/modifyColumns', [ viewObject.el ] );
			}

		},

		/**
		 * trigger document click on links which have karma-document-click class
		 *
		 * @since 0.1.0
		 *
		 * @returns {void}
		 */
		karmaLinksDocumentClick: function (){

			this.$el.find( ".karma-document-click[href*=\"javascript:\"]" ).off( 'click.documentClick' ).on( 'click.documentClick', function (){

				$( document ).trigger( 'click' );

			} );

		},

		/**
		 * Call necessary function after init any elements
		 *
		 * @since 0.1.0
		 *
		 * @returns {void}
		 */
		renderSettings: function (){

			this.createPlaceHolders();
			this.createGizmo();
			this.delegateEvents();
			this.$el.trigger( 'karma/finish/renderElement' );

		},

		/**
		 * Create placeholders for each elements as drop area
		 * The function skip column and section for creating placeholders
		 *
		 * @since 0.1.0
		 *
		 * @returns {void}
		 */
		createPlaceHolders: function (){

			var getName    = this.model.get( 'shortcode_name' ),
				elementKey = this.model.get( 'element_key' ),
				placeholderHTML;
			if ( 'karma_column' != getName && 'karma_section' != getName ){
				placeholderHTML = KarmaView.getUnderscoreTemplate( this.placeholderTemplate,
					{
						className: 'karma-insert-between-elements-placeholder karma-element-placeholder-' + elementKey
					});
				this.el.insertAdjacentHTML( 'afterend', placeholderHTML );
				if ( 1 == this.model.get( 'order' ) ){
					this.el.insertAdjacentHTML( 'beforebegin', placeholderHTML );
				}

				this.createSelfPlaceholder();
			}else if ( 'karma_column' == getName && 0 == karmaBuilder.karmaModels.where( { parent_key: this.model.get( 'element_key' ) } ).length ){
				placeholderHTML = KarmaView.getUnderscoreTemplate( this.placeholderTemplate, { className: 'karma-column-placeholder' } );
				this.el.querySelector( '.karma-column-margin' ).innerHTML = placeholderHTML;
			}else if ( 'karma_section' == getName ){
				placeholderHTML = KarmaView.getUnderscoreTemplate(
					this.placeholderTemplate,
					{
						className: 'karma-insert-between-sections-placeholder karma-section-placeholder-' + elementKey
					}
				);
				this.el.insertAdjacentHTML( 'afterend', placeholderHTML );
				if ( 1 == this.model.get( 'order' ) ){
					this.el.insertAdjacentHTML( 'beforebegin', placeholderHTML );
				}

			}

		},

		/**
		 * Create placeholders for each elements as alignment
		 *
		 * @since 0.1.0
		 *
		 * @returns {void}
		 */
		createSelfPlaceholder: function (){

			if ( undefined == this.el.querySelector( '.karma-alignment-placeholder' ) ){
				var alignmentPlaceholder = KarmaView.getUnderscoreTemplate( this.alignmentPlaceholderTemplate ),
					div                  = document.createElement( "div" );
				div.classList.add( 'karma-alignment-placeholder' );
				div.innerHTML = alignmentPlaceholder;
				this.el.appendChild( div );
			}

		},

		/**
		 * call element method related to the changed attribute
		 *
		 * @param    {object}    model    updated element model.
		 *
		 * @since 0.1.0
		 *
		 * @returns {boolean}
		 */
		update: function ( model ){

			for ( var i in model.changed.shortcode_attributes.changed ){
				if ( 'function' === typeof this[ i ] ){
					this[ i ]();

				}else{
					this.render();
				}
			}

		},

		/**
		 * Render elements
		 *
		 * @since 0.1.0
		 * @returns {void}
		 */
		render: function (){

			this.el.innerHTML = this.template( this.model );

		},

		/**
		 * Delete elements model and html
		 *
		 * @since 0.1.0
		 * @returns {void}
		 */
		destroy: function (){

			var parentKey   = this.model.get( 'parent_key' ),
				elementKey = this.model.get( 'element_key' ),
				elementName = this.model.get( 'shortcode_name' );

			this.beforeDeleteElements();
			this.$el.find( '.karma-builder-element' ).each( function (){

				var childKey = $( this ).attr( 'data-element-key' );
				karmaBuilder.karmaModels.remove( karmaBuilder.karmaModels.where( { "element_key": childKey } ) );

			} );

			// COMPLETELY UNBIND THE VIEW
			this.undelegateEvents();
			this.$el.removeData().unbind();

			// Remove view from DOM
			this.remove();
			this.removeExtraAssets( elementName.replace( /_/g, '-') + '-' + elementKey );
			karmaBuilder.karmaModels.remove( this.model );
			Backbone.View.prototype.remove.call( this );
			this.afterDeleteElement( parentKey, elementName );
			this.loadBlankPage();

		},

		/**
		 * load blank page when content is empty
		 *
		 * @since 0.1.0
		 * @returns {void}
		 */
		loadBlankPage : function () {

			var karmaLayout = document.querySelector( '#karma-builder-layout' );

			if( null == document.querySelector( '.karma-section' ) ){
				var template = KarmaView.getWpTemplate( 'karma-blank-page' ) ;
				karmaLayout.innerHTML=template;
			}

		},

		/**
		 * Remove element placeholders after delete element
		 *
		 * @since 0.1.0
		 * @returns {void}
		 */
		beforeDeleteElements: function (){

			// REMOVE THE PLACEHOLDER
			this.$el.nextAll( '.karma-insert-between-elements-placeholder' ).first().remove();
			if ( 'karma_section' == this.model.get( 'shortcode_name' ) ){
				this.$el.next( '.karma-new-section' ).remove();
			}

		},

		/**
		 * Reorder elements after delete
		 *
		 * @param {string}  parentKey       Element key of parent element
		 *
		 * @since 0.1.0
		 * @returns {void}
		 */
		reorderAfterDelete: function ( parentKey ){

			if ( '' == parentKey ){
				KarmaView.reorderSections();
				KarmaView.$el.trigger('karma/after/sortSections');
			}else{
				KarmaView.$el.trigger( 'karma/after/dropElement/', [ parentKey ] );
			}

		},

		/**
		 * Do some extra work after delete element
		 * If all elements remove in specific column this function create placeholder for that empty column
		 *
		 * @param {string}  parentKey       Element key of parent element
		 * @param {string}  elementName     Element name
		 *
		 * @since 0.1.0
		 * @returns {void}
		 */
		afterDeleteElement: function ( parentKey, elementName ){


			this.reorderAfterDelete( parentKey );
			if ( 'karma_column' != elementName && 'karma_section' != elementName ){
				var columnInstance = $( '[data-element-key="' + parentKey + '"]' ).backboneView(),
					parentSection  = columnInstance.el.closest( '.karma-section' );

				columnInstance.createPlaceHolders();
				this.checkIfColumnsEmpty( parentSection );

			}

		},

		/**
		 * If All columns are empty in section add Class Empty to them
		 *
		 * @param { object }  section       Element key of parent element
		 *
		 * @since 0.1.0
		 *
		 * @returns {void}
		 */
		checkIfColumnsEmpty: function ( section ){

			if ( 0 == section.querySelectorAll( '.karma-column .karma-builder-element' ).length ){
				$( section ).find( '.karma-builder-element[data-name="karma_column"]' ).addClass( 'karma-empty-column' );
			}

		},

		/**
		 * Duplicate elements
		 *
		 * @since 0.1.0
		 * @returns {void}
		 */
		duplicateElement: function (){

			var that                   = this,
				duplicatedElementModel = {
					parent : JSON.parse( JSON.stringify( that.model ) ),
					childes: that.getChildElements( that.model.get( 'element_key' ) ),
					grid: ( 'karma_section' == that.model.get('shortcode_name') ) ? that.currentGrid() : []
				};

			KarmaView.renderElements( KarmaView.getPlaceholder( this ), duplicatedElementModel );


		},

		/**
		 * Returns child of elements which passed to the function
		 *
		 * @param {string} parentElementKey   Element key to return its child(ren)
		 * @since 0.1.0
		 * @returns {Array}
		 */
		getChildElements: function ( parentElementKey ){

			var childElementsModel = karmaBuilder.karmaModels.where( { parent_key: parentElementKey } ),
				that               = this,
				elementsModel      = [];

			_.each( childElementsModel, function ( model ){
				var elementModel = {
					parent : JSON.parse( JSON.stringify( model ) ),
					childes: that.getChildElements( model.get( 'element_key' ) )
				};
				elementsModel.push( elementModel );
			} );

			return elementsModel;

		},

		/**
		 * open box of delete element
		 *
		 * @since 0.1.0
		 * @returns {void}
		 */
		deleteElementBox: function (){

			var deleteBox       = this.el.querySelector( '.karma-delete-message-box' ),
				deleteContainer = this.el.querySelector( '.karma-delete-message-container' );

			if ( null == deleteBox ){
				var template = KarmaView.getWpTemplate( 'karma-delete-message-box' );
				this.$el.append( template );
			}else{

				if ( deleteBox.classList.contains( "karma-delete-box-animation" ) ){
					deleteBox.classList.remove( "karma-delete-box-animation" );
				}
				if ( deleteContainer.classList.contains( "karma-delete-container-animation" ) ){
					deleteContainer.classList.remove( "karma-delete-container-animation" );
				}
				deleteBox.style.display = "flex";
			}

		},


		/**
		 * cancel delete element on click in cancel box
		 *
		 * @since 0.1.0
		 * @returns {void}
		 */
		cancelDeleteElement: function (){

			var deleteBox       = this.el.querySelector( '.karma-delete-message-box' ),
				deleteContainer = this.el.querySelector( '.karma-delete-message-container' );
			deleteContainer.classList.add( "karma-delete-container-animation" );
			deleteBox.classList.add( "karma-delete-box-animation" );
			setTimeout( function (){

				deleteBox.style.display = "none";

			}, 300 );

		},

		/**
		 *  delete element on click in delete box
		 *
		 * @since 0.1.0
		 * @returns {void}
		 */
		DeleteElement : function (){

			var that = this;
			var deleteBox       = this.el.querySelector( '.karma-delete-message-box' ),
				deleteContainer = this.el.querySelector( '.karma-delete-message-container' ),
				selectAll       = this.$el.find( '.karma-builder-element div:not(.karma-delete-message-box)' );
			deleteContainer.classList.add( "karma-delete-container-animation" );
			deleteBox.classList.add( "karma-delete-box-animation" );
			selectAll.css( "display", "none" );
			setTimeout( function (){

				that.destroy();

			}, 100 );

		},

		/**
		 * stop click in delete box container
		 *
		 * @since 0.1.0
		 * @returns {void}
		 */
		deleteBoxStopPropagation: function ( e ){

			e.stopPropagation();

		},

		/**
		 * Remove script and style tag of element
		 *
		 * @param   {string}    elementID
		 *
		 * @since 0.1.0
		 * @return {void}
		 */
		removeExtraAssets: function ( elementID ){

			var style  = $( '#style-' + elementID ),
				script = $( '#script-' + elementID );

			if ( script.length ){
				script.remove();
			}

			if ( style.length ){
				style.remove();
			}

		},

		/**
		 * Update attribute(s) of element
		 *
		 * @param    {Object}    newAttributes list of new attribute
		 * @param    {boolean}    silent model in silent mode
		 *
		 * @since 0.1.0
		 *
		 * @returns {void}
		 */
		setAttributes: function ( newAttributes, silent ){

			var model               = this.model,
				shortcodeAttributes = JSON.parse( JSON.stringify( model.attributes.shortcode_attributes ) );
			shortcodeAttributes.changed = {};
			for ( var attr in newAttributes ){
				shortcodeAttributes[ attr ] = newAttributes[ attr ];
				shortcodeAttributes.changed[ attr ] = newAttributes[ attr ];
			}

			model.set( { 'shortcode_attributes': shortcodeAttributes }, { silent: silent } );

		},

		/**
		 * GET Specific attribute(s) of element
		 * @example getAttributes ( ['space', 'slow'] ) // returns { space : 200, slow : false }
		 *
		 *
		 * @param    {Array}    attributesNames List of name attribute
		 *
		 * @since 0.1.0
		 *
		 * @returns {object}     The value of given attribute
		 */
		getAttributes: function ( attributesNames ){

			var model               = this.model,
				shortcodeAttributes = JSON.parse( JSON.stringify( model.attributes.shortcode_attributes ) ),
				attributeValue      = {};

			for ( var attr in attributesNames ){
				if ( 'undefined' != typeof shortcodeAttributes[ attributesNames[ attr ] ] ){
					attributeValue[ attributesNames[ attr ] ] = shortcodeAttributes[ attributesNames[ attr ] ];
				}
			}
			return attributeValue;

		},

		/**
		 * find children of model
		 *
		 * @since 0.1.0
		 *
		 * @returns {Array} - children models id
		 */
		findChildren: function (){

			return karmaBuilder.karmaModels.where( { 'parent_key': this.model.attributes[ 'element_key' ] } );

		},

		/**
		 * Open setting panel of each Element
		 *
		 * @since 0.1.0
		 *
		 * @returns void
		 */
		showSettingPanel : function ( e ) {

			e.stopPropagation();
			this.removeElementChildGizmo();
			$( ".open-drop-down-gizmo" ).removeClass( 'open-drop-down-gizmo' );
			var form = $( e.currentTarget ).data('form'),
				that = this;

			KarmaView.closeElementPanel().removeSettingPanel();
			window.elementSettingPanel = new window.top.karmaBuilderActions.elementSettingPanel( { model : this.model, viewInstance : that  } );
			var result = elementSettingPanel.openSettingPanel( form );
			elementSettingPanel.delegateEvents();
			if( false == result ){
				elementSettingPanel.removeSettingPanel();
			}

		},

		/**
		 * Remove Class from javascript element
		 *
		 * @param    {object}    el        element to remove Class
		 * @param    {string}    className   name of class to remove
		 *
		 * @since 0.1.0
		 *
		 * @returns {void}
		 */
		removeClass: function ( el, className ){

			if ( this.el.classList ){
				this.el.classList.remove( className );
			}else{
				this.el.className = this.el.className.replace( new RegExp( '(^|\\b)' + className.split( ' ' ).join( '|' ) + '(\\b|$)', 'gi' ), ' ' );
			}

		},

		/**
		 * returns the element name with its key
		 *
		 * @since 0.1.0
		 *
		 * @returns { string }  Element name with its key
		 */
		elementSelector: function (){

			return this.el.getAttribute( 'data-name' ).replace( /_/g, '-' ) + '-' + this.el.getAttribute( 'data-element-key' );

		},

		/**
		 * renders the css of model inside style tag
		 *
		 * @param    { string }    selector     Css selector
		 * @param    { string }    attribute    CSS attribute
		 * @param    { string }    value        CSS value
		 *
		 * @since 0.1.0
		 *
		 * @returns { void }
		 */
		//@TODO: add multiple selector
		renderCss: function ( selector, attribute, value, device ){

			document.querySelector( '#style-' + this.elementSelector() ).innerHTML = this.generateNewStyle( selector, attribute, value, device );

		},

		/**
		 * get mobile or tablet css from style
		 *
		 * @param    { string }    content  Css selector
		 * @param    { string }    device   mobile or tablet
		 *
		 * @since 2.0
		 *
		 * @returns { object }  CSS content and device regex
		 */
		getDeviceStyle: function ( content, device ) {

			if ( 'tablet' == device ) {
				var deviceRegex = /\/\*tablet-start\*\/(.*?)\/\*tablet-finish\*\//ig;
			} else if ( 'mobile' == device ) {
				var deviceRegex = /\/\*mobile-start\*\/(.*?)\/\*mobile-finish\*\//ig;
			}
			var result = deviceRegex.exec( content );
			if ( null == result ) {
				content = '';
			} else {
				content = result[ 1 ];
			}

			var cssObject = {};
			cssObject.content = content;
			cssObject.deviceRegex = deviceRegex;
			return cssObject;

		},

		/**
		 * split responsive device css and main css
		 *
		 * @param    { string }    content  Css selector
		 *
		 * @since 2.0
		 *
		 * @returns { object }  contains responsive device CSS and main css
		 */
		splitDeviceStyle: function ( content ) {

			var deviceRegex = /@media.*?-finish\*\/}/ig,
				responsiveStyle = '';
			while ( (result = deviceRegex.exec( content )) !== null ) {
				// This is necessary to avoid infinite loops with zero-width matches
				if ( result.index === deviceRegex.lastIndex ) {
					deviceRegex.lastIndex++;
				}

				// The result can be accessed through the `m`-variable.
				responsiveStyle = responsiveStyle + result[ 0 ];
			}

			content = content.replace( deviceRegex, '' );
			var splitContent = {};
			splitContent.responsive = responsiveStyle;
			splitContent.mainContent = content;
			splitContent.deviceRegex = deviceRegex;
			return splitContent;

		},

		/**
		 * get CSS content from style tag
		 *
		 * @param    { string }    device   device name
		 *
		 * @since 2.0
		 *
		 * @returns { object }  contains responsive device CSS and main css
		 */
		getCss: function ( device ) {

			var oldStyle = document.querySelector( '#style-' + this.elementSelector() ).innerHTML,
				responsiveStyle = '',
				addMediaQuery = false,
				deviceRegex = '';
			originalStyle = oldStyle;
			if ( 'tablet' == device || 'mobile' == device ) {
				var result = this.getDeviceStyle( oldStyle, device );
				oldStyle = result.content;
				deviceRegex = result.deviceRegex;
				if ( '' == oldStyle ) {
					addMediaQuery = true;
				}
			} else {
				var splitContent = this.splitDeviceStyle( oldStyle );
				responsiveStyle = splitContent.responsive;
				oldStyle = splitContent.mainContent;
				deviceRegex = splitContent.deviceRegex;
			}

			var cssObject = {};
			cssObject.deviceRegex = deviceRegex;
			cssObject.responsiveStyle = responsiveStyle;
			cssObject.oldStyle = oldStyle;
			cssObject.originalStyle = originalStyle;
			cssObject.addMediaQuery = addMediaQuery;
			return cssObject;

		},

		/**
		 * put CSS content to style tag
		 *
		 * @param    { object }    cssObject    Css object
		 * @param    { string }    device       device name
		 * @param    { string }    newStyle     CSS selector
		 *
		 * @since 2.0
		 *
		 * @returns { string }  contains responsive device CSS and main css
		 */
		putResponsiveCss: function ( cssObject, device, newStyle ) {

			if ( 'tablet' == device || 'mobile' == device ) {
				if ( cssObject.addMediaQuery ) {
					var deviceMediaQueryPrefix = '',
						deviceMediaQueryPostfix = '';
					if ( 'tablet' == device ) {
						deviceMediaQueryPrefix = '@media screen and (max-width: 1020px) { /*tablet-start*/';
						deviceMediaQueryPostfix = '/*tablet-finish*/}';
					} else if ( 'mobile' == device ) {
						deviceMediaQueryPrefix = '@media screen and (max-width: 430px) { /*mobile-start*/';
						deviceMediaQueryPostfix = '/*mobile-finish*/}';
					}
					newStyle = cssObject.originalStyle + deviceMediaQueryPrefix + newStyle + deviceMediaQueryPostfix;
				} else {
					newStyle = cssObject.originalStyle.replace( cssObject.deviceRegex, '/*' + device + '-start*/' + newStyle + '/*' + device + '-finish*/' )
				}
			} else {
				newStyle = newStyle + cssObject.responsiveStyle;
			}

			return newStyle;

		},

		/**
		 * renders the css of
		 * model inside style tag
		 *
		 * @param    { string }    selector    Css selector
		 * @param    { string }    attribute    CSS attribute
		 * @param    { string }    value        CSS value
		 *
		 * @since 0.1.0
		 *
		 * @returns { string } new style of element to insert inside style tag
		 */
		generateNewStyle: function ( selector, attribute, value, device ) {

			var regex = /(.*?){(.*?)}/g,
				pattern = new RegExp( regex ),
				selector = selector.trim(),
				content = '',
				result;

			var cssObject = this.getCss( device );

			if ( '' != cssObject.oldStyle ) {
				while ( ( result = pattern.exec( cssObject.oldStyle ) ) !== null ) {
					// This is necessary to avoid infinite loops with zero-width matches
					if ( result.index === regex.lastIndex ) {
						regex.lastIndex++;
					}

					if ( result[ 1 ].trim() == selector ) {
						content = result[ 2 ];
						break;
					}
				}
			}

			var cssProperty = {};
			if ( '' != content ) {
				var splitContent = content.split( ';' );

				_.each( splitContent, function ( property ) {
					var cssString = property.split( /(.*?)(:([^\/]))/g );
					if ( "" != cssString[ 1 ] && undefined != cssString[ 1 ] ) {
						cssProperty[ cssString[ 1 ] ] = cssString[ 3 ] + cssString[ 4 ];
					}
				} );

				cssObject.oldStyle = this.removeOldSelector( selector, cssObject.oldStyle );
			}
			cssProperty[ attribute ] = value;
			var newStyle = cssObject.oldStyle + this.generateStyleString( selector, cssProperty );

			newStyle = this.putResponsiveCss( cssObject, device, newStyle );
			return newStyle;

		},

		/**
		 * Remove old style string
		 *
		 * @param    { string }    selector        CSS attribute
		 * @param    { string }    oldStyle        Old css string
		 *
		 * @since 0.1.0
		 *
		 * @returns { string } new style of element without old css block
		 */
		removeOldSelector: function ( selector, oldStyle ){

			var pattern = selector.replace( /\*/g , '\\*' ) + '{(.*?)}',
				regex   = new RegExp( pattern, 'g' );
			
			return oldStyle.replace( regex, "" );

		},

		/**
		 * renders the css of model inside style tag
		 *
		 * @param    { string }    selector        CSS attribute
		 * @param    { object }    cssProperty     CSS value
		 *
		 * @since 0.1.0
		 *
		 * @returns { string } new style of element to insert inside style tag
		 */
		generateStyleString: function ( selector, cssProperty ){

			var style = selector + '{';
			_.each( cssProperty, function ( value, property ){
				style += property + ':' + value + ';';
			} );
			style += '}';
			return style;
		},

});

	karmaBuilder.shortcodes.extend = function( child ) {

		var view = Backbone.View.extend.apply( this, arguments );
		if( true === child.denyEvents ){
			return view;
		}
		view.prototype.events = _.extend({}, this.prototype.events, child.events );
		return view;

	};

	karmaBuilder.shortcodes = karmaBuilder.shortcodes.extend( karmaBuilder.gizmos.prototype );

} )( jQuery, karmaBuilder );