( function( $, karmaBuilder ){

	karmaBuilder.gizmos.fontStyle = Backbone.View.extend({

		events:{
			'click .karma-set-bold-style'		: 'setBoldStyle' ,
			'click .karma-set-italic-style'		: 'setItalicStyle' ,
			'click .karma-set-underline-style'	: 'setUnderlineStyle' ,
		},
		/**
		 * Drop area template for elements
		 **/
		template :' <button class="karma-drop-down-icon  karma-font-style-drop-down-gizmo"> {{{ data.params.defaultIcon }}} </button> '
			+ '<div class="karma-drop-down-box karma-font-style-drop-down">'
				+ '<button class="karma-set-bold-style" >'
					+ '{{{ data.params.bold }}}'
				+ '</button>'
				+ '<button class="karma-set-italic-style" >'
					+ '{{{ data.params.italic }}}'
				+ '</button>'
				+ '<button class="karma-set-underline-style" >'
					+ '{{{ data.params.underline }}}'
				+ '</button>'
			+ '</div>' ,

		initialize :function(){
			this.setElement( $('<div>') );
		},

		render: function(){

			this.update();
			this.$gizmoContainer.append( this.el );

		},

		update: function(){

			this.el.innerHTML = KarmaView.getUnderscoreTemplate( this.template, this.data );

		},


		/**
		 * Set italic style
		 *
		 * @since 0.1.0
		 *
		 * @returns {void}
		 */
		setItalicStyle : function () {

			document.execCommand( 'italic', false, null );

		} ,

		/**
		 * Set underline style
		 *
		 * @since 0.1.0
		 *
		 * @returns {void}
		 */
		setUnderlineStyle : function () {

			document.execCommand( 'underline', false, null );

		},

		/**
		 * Set bold style
		 *
		 * @since 0.1.0
		 *
		 * @returns {void}
		 */
		setBoldStyle : function () {

			document.execCommand( 'bold', false, null );

		},

	});


} )( jQuery, karmaBuilder );