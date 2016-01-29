define(['../js/lib/zepto'],function(){
	return function(){
		$('header').append('<span class="goback"></span>')
		.on('tap',function(){
			window.history.back();
		});
	}
})