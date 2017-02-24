require.config({
	paths:{
		zepto:'lib/zepto',
		pubjs:'public'
	},
	shim:{
		'zepto':{
			exports:'$'
		}
	}
})

require(['zepto','pubjs'],function($,init){
	
})