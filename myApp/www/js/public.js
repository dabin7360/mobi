$(function(){
	$('header').append('<span class="goback"></span>')
	.on('tap',function(){
		window.history.back();
	});
})