jQuery(document).ready(function(){
	var form = jQuery('.calculator');

	var budget = jQuery('#textinput');
	var cost = jQuery('.cost_display');

	// register input change events
	jQuery('input').on('change keydown keyup', function(){
		calculate();
	});

	calculate();

	function calculate()
	{
		// check if budget is valid number
		var budget_val = budget.val();
		if( isNaN( budget_val ) ){
			// show an error
			jQuery('.valid-budget-error').show();
			return;
		} else {
			jQuery('.valid-budget-error').hide();
		}

		budget_val = parseFloat( budget_val );

		// use checkboxes to calculate the new cost
		form.find('input[type=checkbox]').each(function(i,j){
			var obj = jQuery(j);

			if(obj.prop('checked')) {
				var modifier = parseFloat( obj.data('value') );
				budget_val = budget_val + modifier;
			}
		});

		// set cost
		if( isNaN( budget_val ) ){
			budget_val = 0;
		}

		cost.text( numberWithCommas( budget_val.toFixed( 2 ) ) );
	}

	function numberWithCommas(x) {
		// from: http://stackoverflow.com/a/2901298/581048
	    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
});
