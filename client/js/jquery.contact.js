(function($) { 
	"use strict";
	
jQuery(document).ready(function(){

	$('#cform').submit(function(){

		//Getting attr value as api end point.
		var action = $(this).attr('action');
		
		console.log(action);
		$("#message").slideUp(100,function() {
		$('#message').hide();
		$('#cform').hide();
		$('.conForm').append(`
			<div class="loader-container">
			<img src="images/sending.gif" class="contact-loader" />
			</div>
		`);

 		// $('#submit')
		// 	.before('<img src="images/sending.gif" class="contact-loader" />')
		// 	.attr('disabled','disabled');

		// $.post(action, {
		// 	name: $('#name').val(),
		// 	email: $('#email').val(),
		// 	comments: $('#comments').val(),
		// },
		// 	function(data){
		// 		document.getElementById('message').innerHTML = `<div>
		// 		<span>
		// 			Thank you! I will get back to you ASAP!!
		// 		</span>
		// 		<div>
		// 		<div>
		// 			<button id="show-form-btn">Send another email</button>
		// 		</div>
		// 		`;

		// 		$('.conForm').remove('.loader-container');

		// 		$('#show-form-btn').on('click',function(){
		// 			$('#cform').show();
		// 			$('#message').hide();
		// 		});

		// 		$('#message').slideDown('slow');
		// 		$('.contact-loader')
		// 			.fadeOut('slow',function(){
		// 				$(this).remove()
		// 			});
		// 		$('#submit').removeAttr('disabled');
		// 		if(data.match('success') != null){
		// 			$('#cform').slideUp('slow');
		// 		} 
		// 	}
		// );
			setTimeout(() => {
				// $('.loader-container').remove();
				// $('#message').show().append(`
				// 	<div class="sent-confirmation">
				// 		<span>
				// 			Thank you! I will get back to you ASAP!!
				// 		</span>
				// 		<div>
				// 		<div>
				// 			<button id="show-form-btn">Send another email</button>
				// 	</div>
				// 	`);
				// 	$('#show-form-btn').on('click',function(){
				// 	$('#cform').show();
				// 	$('#name').val("");
				// 	$('#email').val("");
				// 	$('#comments').val("");
				// 	$('.sent-confirmation').remove();
				// });				
			}, 2000);

		});

		return false;

	});

});

}(jQuery));