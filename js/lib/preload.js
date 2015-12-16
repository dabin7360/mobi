var PreLoad=function(a,b){var c=b||{};this.source=a,this.count=0,this.total=a.length,this.onload=c.onload,this.prefix=c.prefix||"",this.init()};PreLoad.prototype.init=function(){var a=this;a.source.forEach(function(b){var c=b.replace(/[#\?].*$/,'').substr(b.lastIndexOf(".")+1).toLowerCase(),d=a.prefix+b;switch(c){case"js":a.script.call(a,d);break;case"css":a.stylesheet.call(a,d);break;case"svg":case"jpg":case"gif":case"png":case"jpeg":a.image.call(a,d)}})},PreLoad.prototype.getProgress=function(){return Math.round(this.count/this.total*100)},PreLoad.prototype.image=function(a){var b=document.createElement("img");this.load(b,a),b.src=a},PreLoad.prototype.stylesheet=function(a){var b=document.createElement("link");this.load(b,a),b.rel="stylesheet",b.type="text/css",b.href=a,document.head.appendChild(b)},PreLoad.prototype.script=function(a){var b=document.createElement("script");this.load(b,a),b.type="text/javascript",b.src=a,document.head.appendChild(b)},PreLoad.prototype.load=function(a,b){var c=this;a.onload=a.onerror=a.onabort=function(a){c.onload&&c.onload({count:++c.count,total:c.total,item:b,type:a.type})}};
				
var resources = [
	'js/zepto.min.js', 'js/package.js', 'css/animate.min.css',
	'images/p1-curve.png',
	'images/p2-backdrop-dark.png',
	'images/p2-backdrop.png',
	'images/p3-backdrop-dark-2.png',
	'images/p3-backdrop.png',
	'images/p4-backdrop-dark.png',
	'images/p4-backdrop.png',
	'images/p5-backdrop-dark.png',
	'images/p5-backdrop.png',
	'images/pack1-s7360cc0655.png',
	'images/pack2-sa3afc76d41.png',
	'images/pack3-s46bac2f2f8.png',
	'images/pack4-sf9f33bdcc8.png',
	'images/pack5-s9e23033a52.png'
]

new PreLoad(resources, {
	onload: function(load) {
		var count = load.count,
			total = load.total,
			percent = Math.ceil(100 * count / total)

		//DOM变化
		var progressBar = document.querySelector('#progress')
		progressBar.style.width = 48 + percent * 2 + 'px'
		progressBar.innerHTML = percent + '%'

		//LOAD COMPLETE
		if (count == total) {
			var el = progressBar.parentNode.parentNode
			$(el).on('webkitTransitionEnd', function() {
				this.parentNode.removeChild(this)
				window.pageInit && window.pageInit()
			})
			$('#pages').html($('#tmpl').html())
			$('#tmpl').remove()
			$(el).addClass('complete')
		}
	}
})