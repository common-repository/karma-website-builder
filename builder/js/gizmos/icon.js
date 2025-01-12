( function( $, karmaBuilder ){

	karmaBuilder.gizmos.icon = Backbone.View.extend({

		/**
		 * Build html for icon gizmo
		 */
		template : '<div class="karma-builder-gizmo-icon {{ data.className }} " data-form="{{ data.form }}"> {{{ data.params.icon }}} </div>',

		data: {},

		initialize: function(){

			this.setElement( this.$gizmoContainer );

		},

		setIcon: function( icon ){

			this.data.params.icon = icon;
			this.update();
		},

		render: function(){

			this.$gizmoContainer.append( KarmaView.getUnderscoreTemplate( this.template, this.data ) );


		},


	});


} )( jQuery, karmaBuilder );