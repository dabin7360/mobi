define('upload',['zepto'],function($){
	return function(btnDom,s){
		var  btn = $(btnDom);
		var w = btn.width(),
			h = btn.height(),
			btnStyle = 'display:block;width:' + w + 'px;height:' + h + 'px;overflow:hidden;border:0;margin:0;padding:0;position:absolute;top:0;left:0;filter:alpha(opacity=0);-moz-opacity:0;-khtml-opacity: 0;opacity: 0;cursor:pointer;',
			btnIframe = document.createElement('iframe');
			

		$(btnIframe).on('load', function(){

			var timestrap = (+new Date()).toString(36),
				wrapper,
				btnIframeDoc,
				btnIframeBody;

			btnIframeDoc = (btnIframe.contentDocument || btnIframe.contentWindow.document);
			btnIframeBody = btnIframeDoc.body;
			wrapper = btnIframeDoc.createElement('div');
			
			var fileName = s.fileName || 'Filedata';
			var forMata = '';
			
			var params = s.data;
			if(typeof params == 'object'){
				for(var i in params){
					forMata += '<input type="hidden" name="' + i + '" value="' + params[i] + '" />';
				}
			}
			
			wrapper.innerHTML = '<form id="edui_form_' + timestrap + '" target="edui_iframe_' + timestrap + '" method="POST" enctype="multipart/form-data" action="' + s.url+ '" ' +
			'style="' + btnStyle + '">' +
			'<input id="edui_input_' + timestrap + '" type="file" accept="image/png,image/jpg" name="' + fileName + '" ' + 
			'style="' + btnStyle + '">' + forMata +
			'</form>' +
			'<iframe id="edui_iframe_' + timestrap + '" name="edui_iframe_' + timestrap + '" style="display:none;width:0;height:0;border:0;margin:0;padding:0;position:absolute;"></iframe>';
			
			//wrapper.id = me.ui.id + '_iframeupload';
			btnIframeBody.style.cssText = btnStyle;
			btnIframeBody.style.width = w + 'px';
			btnIframeBody.style.height = h + 'px';
			btnIframeBody.appendChild(wrapper);

			if (btnIframeBody.parentNode) {
				btnIframeBody.parentNode.style.width = w + 'px';
				btnIframeBody.parentNode.style.height = w + 'px';
			}

			var form = btnIframeDoc.getElementById('edui_form_' + timestrap);
			var input = btnIframeDoc.getElementById('edui_input_' + timestrap);
			var iframe = btnIframeDoc.getElementById('edui_iframe_' + timestrap);

			$(input).on('change', function(){
				if(!input.value) return;
				function callback(){
					try{
						var json,
							body = (iframe.contentDocument || iframe.contentWindow.document).body,
							result = body.innerText || body.textContent || '';
						json = (new Function("return " + result))();
						if(json) {
							s.success(json);
						}
					}catch(er){
						s.error && s.error(json);
					}
					form.reset();
					$(iframe).off('load', callback);
				};
		  
				$(iframe).on('load', callback);
				form.action = s.url;
				form.submit();
			});
			
		});
		$(btnIframe).attr('style',btnStyle)
		btn.attr('style','position:relative');
		btn.append(btnIframe);
	}
})
