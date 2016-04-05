require.config({
	paths:{
		zepto:'lib/zepto',
		pubjs:'m-public'
	},
	shim:{
		'zepto':{
			exports:'$'
		}
	}
})

require(['zepto','pubjs'],function($,init){
	init();
})