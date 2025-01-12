( function( $, karmaBuilder ){

	karmaBuilder.gizmos.text = Backbone.View.extend({

		/**
		 * Build html for icon gizmo
		 */
		template : '<div class="karma-builder-gizmo-text {{ data.className }} " data-form="{{ data.form }}"> {{{ data.params.value }}}'
			+ '<# if( "count" == data.params.mode ){ print( " " + data.order ); } #>'
			+ ' </div>',

		data: {},

		initialize :function(){

			this.setElement( $('<div>') );

		},
		
		render: function(){

			this.update();
			this.$gizmoContainer.append( this.el );

		},

		update: function(){

			this.data.order =  this.elementView.model.get('order');
			this.el.innerHTML = KarmaView.getUnderscoreTemplate( this.template, this.data );

		}

	});

} )( jQuery, karmaBuilder );