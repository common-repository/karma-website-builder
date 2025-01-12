( function( $, karmaBuilder ){

	karmaBuilder.gizmos.multiDropDown = Backbone.View.extend({

		events: {

			'click .karma-gizmo-multi-drop-down-content-box div'   			: 'changeValue',
		},

		/**
		 * Build html for position gizmo
		 */
		template: ' <button class="karma-drop-down-icon karma-multi-drop-down-gizmo" ><div class="karma-default-icon"  >{{{ data.icon }}}</div> </button> '
		+ '<div class="karma-gizmo-multi-drop-down-content karma-drop-down-box">'
		+ '<div class="karma-gizmo-multi-drop-down-content-box">'
		+ ' <# _.each( data.params, function( params ){  #>'
		+ '<# var selected = ( data.defaultValue == params.value  ) ? "karma-active-multi-drop-down" : "" #>'
		+ '<div class="karma-gizmo-multi-drop-down-box {{selected}}" data-drop-down-value="{{params.value}}">'
		+"<# if(!('' == params.icon || undefined == params.icon) ){ #>"
		+ '<div class="karma-gizmo-multi-drop-down-icon" style="background-image: url( {{ params.icon }})">'
		+ '</div>'
		+'<# } #>'
		+"<# if(!('' == params.text || undefined == params.text) ){ #>"
		+ '<div class="karma-gizmo-multi-drop-down-text">{{{ params.text }}}'
		+ '</div>'
		+'<# } #>'
		+ '</div>'
		+ '<# }) #>'
		+ '</div>'
		+ '</div>',

		/**
		 *  initialize position
		 *
		 * @since 2.0
		 *
		 * @returns {void}
		 */
		initialize: function () {

			this.setElement( $('<div>') );

		},

		/**
		 *  render position
		 *
		 * @since 2.0
		 *
		 * @returns {void}
		 */
		render: function () {

			this.update();
			this.$gizmoContainer.append( this.el );
		},

		/**
		 *  update position
		 *
		 * @since 2.0
		 *
		 * @returns {void}
		 */
		update: function () {
			this.data.defaultValue = this.elementView.getAttributes( [ this.data.model ] )[this.data.model];
			this.el.innerHTML = KarmaView.getUnderscoreTemplate( this.template, this.data );

		},
		/**
		 *  change model
		 *
		 * @since 2.0
		 *
		 * @returns {void}
		 */
		changeValue: function ( e ) {

			if( 'undefined' == this.data.model ){
					console.error("Model Should Be Define In Describe Php");
			}else{
				var content = e.target.closest( '.karma-gizmo-multi-drop-down-box' ),
					contentDataValue = content.getAttribute( 'data-drop-down-value' );

				this.$el.find( '.karma-gizmo-multi-drop-down-box' ).removeClass('karma-active-multi-drop-down');
				content.classList.add('karma-active-multi-drop-down');

				if ( "" !== contentDataValue  ) {
					var dataModel = {};

					dataModel[ this.data.model ] = contentDataValue;
					this.elementView.setAttributes( dataModel ,  false );
				}
			}


		}

	});
} )( jQuery, karmaBuilder );
