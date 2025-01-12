( function( $, karmaBuilder ){

	karmaBuilder.text = karmaBuilder.shortcodes.extend({

		events: {
			'blur .karma-editable-content'               : 'saveContent',
			'click .karma-editable-content'              : 'updateFontStyleGizmo',
			'click.focusElement'						 : 'focusElement',
			'keydown .karma-editable-content'	         : 'preventFromNewLine',
			'drop .karma-editable-content'               : 'preventFromDrop'
		},

		initialize: function ( options ) {

			karmaBuilder.text.__super__.initialize.apply( this, arguments );
			this.options = options;
			if( this.options.renderStatus ){
				this.render();
			}
			this.el.querySelector('.karma-text-content').contentEditable = true;

		},

		/**
		 * Render text element
		 *
		 * @since 0.1.0
		 * @return {void}
		 */
		render : function () {

			var source = this.template( this.model );
			this.el.querySelector('.karma-element-content').innerHTML = source;


		},

		/**
		 * Prevent from drop any HTML elements on editable content
		 *
		 * @since 0.1.0
		 * @return {boolean}
		 */
		preventFromDrop : function ( e ) {

			e.preventDefault();
			return false;

		},


		/**
		 * Save the content of the text element
		 *
		 * @since 0.1.0
		 * @return {void}
		 */
		saveContent : function () {

			var content = this.el.querySelector( '.karma-text-tag' ),
				contentData = this.el.querySelector('.karma-text-tag').innerHTML,
				focusElement = this.el.querySelector('.karma-editable-content'),
				contentValue = content.innerText ;

			if ( "" == contentValue.trim() ) {
				content.innerText = "Write down something cool";
			}

			focusElement.classList.remove('karma-text-element-focus');

			this.model.set( { 'shortcode_content' : contentData }, { silent : true } );

		},

		/**
		 * get text typography and change innerHtml of text
		 *
		 * @since 0.1.0
		 * @return {void}
		 */
		tag: function(){
			
			var element = this.el.querySelector( '.karma-text-tag' ),
				tagAttr = this.getAttributes( ['tag'] ),
				newTag = document.createElement( tagAttr.tag );

			newTag.innerHTML = element.innerHTML;
			newTag.contentEditable = true ;
			newTag.classList.add( 'karma-text-tag', 'karma-document-click', 'karma-editable-content' );
			element.parentNode.replaceChild( newTag, element );

		},

		/**
		 * get text element alignment
		 *
		 * @since 0.1.0
		 * @return {void}
		 */
		align: function () {

			var elementId 	= this.el.getAttribute( 'data-name' ).replace( '_', '-' ) + '-' + this.el.getAttribute( 'data-element-key' ),
				alignAttr = this.getAttributes( ['align'] );
			this.renderCss( "#" + elementId + " .karma-text-tag", 'text-align', alignAttr.align  );


		},


		/**
		 * Set color for text element
		 *
		 * @since 0.1.0
		 * @return {void}
		 */
		color : function(){

			var elementId 	= this.el.getAttribute( 'data-name' ).replace( '_', '-' ) + '-' + this.el.getAttribute( 'data-element-key' ),
				colorValue = this.getAttributes( ['color'] );
			this.renderCss( "#" + elementId + " .karma-text-tag", 'color', colorValue.color  );

		},


		/**
		 * Active on editable elements and check inner text
		 *
		 * @since 0.1.0
		 * @return {boolean}
		 */
		focusElement : function () {

			var content = this.el.querySelector( '.karma-text-tag' ),
				contentValue = content.innerText ,
				focusElement = this.el.querySelector( '.karma-editable-content' );

			if ( "Write down something cool" == contentValue.trim() ) {
				content.innerHTML = "&nbsp;";
			}
			if( false == focusElement.classList.contains( 'focus' ) ){
				focusElement.classList.add( 'karma-text-element-focus' );
				focusElement.focus();
			}

			return true;

		},

		/**
		 * Update font styles for text element
		 *
		 * @since 0.1.0
		 * @return {void}
		 */
		updateFontStyleGizmo : function ( event ) {

			var selectedText = this.getSelectionHtml(),
				getClickedElement = ( '' != selectedText.html ) ? $( selectedText.parent ).get( 0 ) : document.elementFromPoint( event.clientX, event.clientY ),
				computedObject = window.getComputedStyle( getClickedElement ),
				tagName = getClickedElement.tagName;

			this.updateBoldStyle( computedObject, tagName );
			this.updateItalicStyle( computedObject, tagName );
			this.updateUnderlineStyle( computedObject, tagName , getClickedElement );

		},

		/**
		 * Update bold styles for text element
		 *
		 * @param   {Object}    computedObject  Selected DOM node.
		 * @param   {tagName}   tagName         The tag name of Selected DOM node.
		 *
		 * @since 0.1.0
		 * @return {void}
		 */
		updateBoldStyle : function( computedObject, tagName ){

			if ( 'B' == tagName || '700' == computedObject.getPropertyValue('font-weight') ) {
				this.el.querySelector('.karma-set-bold-style').classList.add('karma-drop-down-active-item');
			} else {
				this.el.querySelector('.karma-set-bold-style').classList.remove('karma-drop-down-active-item');
			}

		},

		/**
		 * Update bold styles for text element
		 *
		 * @param   {Object}    computedObject  Selected DOM node.
		 * @param   {tagName}   tagName         The tag name of Selected DOM node.
		 *
		 * @since 0.1.0
		 * @return {void}
		 */
		updateUnderlineStyle : function( computedObject, tagName, getClickedElement ){
			
			if ( 'U' == tagName || 'underline' == computedObject.getPropertyValue('text-decoration')  || getClickedElement.closest("U")  ){
				this.el.querySelector('.karma-set-underline-style').classList.add('karma-drop-down-active-item');
			} else {
				this.el.querySelector('.karma-set-underline-style ').classList.remove('karma-drop-down-active-item');
			}

		},

		/**
		 * Update bold styles for text element
		 *
		 * @param   {Object}    computedObject  Selected DOM node.
		 * @param   {tagName}   tagName         The tag name of Selected DOM node.
		 *
		 * @since 0.1.0
		 * @return {void}
		 */
		updateItalicStyle : function ( computedObject, tagName  ) {

			if ( 'I' == tagName || 'italic' == computedObject.getPropertyValue('font-style') ){
				this.el.querySelector('.karma-set-italic-style').classList.add('karma-drop-down-active-item');
			} else {
				this.el.querySelector('.karma-set-italic-style').classList.remove('karma-drop-down-active-item');
			}

		},

		/**
		 * Return HTML of selected text
		 *
		 *
		 * @since 0.1.0
		 * @return {Object} html : return html of selected text , parent : parent element of selected text
		 */
		getSelectionHtml : function(){

			var html = "";
			if ( typeof window.getSelection != "undefined" ) {
				var selected = window.getSelection();
				if ( selected.rangeCount ) {
					var container = document.createElement("div");
					for ( var i = 0, len = selected.rangeCount; i < len; ++i ) {
						container.appendChild( selected.getRangeAt(i).cloneContents() );
					}
					html = container.innerHTML;
					var parentEl = selected.getRangeAt(0).commonAncestorContainer;
					if ( parentEl.nodeType != 1 ) {
						parentEl = parentEl.parentNode;
					}
				}
			} else if ( typeof document.selection != "undefined" ) {
				if ( document.selection.type == "Text" ) {
					html = document.selection.createRange().htmlText;
					var parentEl = sel.createRange().parentElement();
				}
			}

			return {
				'html'      : html,
				'parent'    : parentEl
			};

		},



	});

})( jQuery, karmaBuilder );