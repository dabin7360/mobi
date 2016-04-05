$(function(){
	$('header').append('<span class="goback"></span>')
	.on('click',function(){
		window.history.back();
	});
})