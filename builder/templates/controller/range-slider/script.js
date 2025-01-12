jQuery( document ).off( 'karma_finish_form_builder.range' ).on('karma_finish_form_builder.range',function() {


	var rangeSlider = document.querySelectorAll( '.karma-range-slider-content' );
	_.each( rangeSlider, function ( parent ) {

		var $ = jQuery,
		$karmaRangeSlider = $( parent ).find( '.karma-range-slider-range' ),
		$karmaRangeInput = $( parent ).find( '.karma-range-slider-input' ),
		changingSlider,
		doneChangingInterval = 10;

		$karmaRangeInput.css( 'width' ,  $karmaRangeInput.val().length  * 7 );

		$karmaRangeSlider.rangeslider({

			polyfill: false

		})
		$karmaRangeSlider.on( 'input', function () {

			$karmaRangeInput[0].value = this.value;
			clearTimeout( changingSlider );
			changingSlider = setTimeout( function () {
				$karmaRangeInput.trigger( 'input' );
			}, doneChangingInterval );

		});
		$karmaRangeInput.on( 'input', function () {

			var changedValue = ( "" == this.value ) ? this.defaultValue : this.value;

			if ( parseInt(changedValue) > parseInt( $( this ).attr( 'max' ) ) ){
				changedValue = $( this ).attr( 'max' )
			} else if ( parseInt( changedValue ) < parseInt( $( this ).attr( 'min' ) ) ){
				changedValue = $( this ).attr( 'min' )
			}
			$( this ).val( changedValue );
			$karmaRangeSlider.val( changedValue ).change();
			this.style.width = (   changedValue.length * 7  ) + 'px';

		});

	});

});

