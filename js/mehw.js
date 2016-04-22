

var ozMEHW = function( opts ) {var $ = jQuery.noConflict()
//// Strings
	,_height_ = 'height'
	,_width_  = 'width'

//// Elements
	,_window = $(window)

//// Settings
	,settings = $.extend({}, {

		t : '',         // Target
		m : _height_,   // Match: height, width, both

		r : true,       // Responsive

		//
	}, opts )

	,targets    = settings.t
	,match      = settings.m
	,responsive = settings.r

	,do_both   = match == 'both'
	,do_height = do_both || match == _height_
	,do_width  = do_both || match == _width_

//// Functions

	,debounce = function( func, wait, immediate ) {
		var timeout;
		return function() {
			var context = this
				,args = arguments
				,later = function() {
					timeout = null;
					if ( !immediate )
						func.apply( context, args );
				}
				,callNow = immediate && !timeout
			;
			clearTimeout(timeout);
			timeout = setTimeout( later, wait );
			if ( callNow )
				func.apply( context, args );
		};
	}
	,do_resize = debounce(function() {
		equalize()
	}, 250 )           // <-- TODO: figure out best wait time

	,equalize = function() {
		var
			targets_arr = targets.split('|')
			,the_width  = 0
			,the_height = 0
			,stacked    = false
			,tops       = 0
		;

		// Get tallest and widest values
		$.each( targets_arr, function( indx , trgt ) {

			var elm = $(trgt);

			elm.each(function( j ) {

				var
					_eq = elm.eq( j )
					,_w = _eq[_width_]()
					,_h = _eq[_height_]()
				;
				// var w = $(t).eq(j).width();
				// var h = $(t).eq(j).height();

				if ( _w > the_width  ) the_width  = _w;
				if ( _h > the_height ) the_height = _h;

				if ( responsive ) {
					if ( tops == 0 )
						tops = Math.round( trgt.top );
					if ( Math.round( trgt.top ) != tops )
						stacked = true
				}
			})
		});

		// Set targets to tallest and widest values
		$.each( targets_arr, function( indx , trgt ) {

			var elm = $(trgt);

			elm.each(function(j){

				if ( do_both || do_width )
					elm[_width_](the_width);

				if ( do_both || do_height ) {
					if ( stacked )
						elm[_height_]('auto');
					else
						elm[_height_](the_height);
				}
			})
		})
	};

	equalize();

	_window.on( 'resize', function( evt ) {
		// evt.preventDefault();
		do_resize()
	})
};

