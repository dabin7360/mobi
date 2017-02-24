define('dbPop',['zepto'],function($){
	return function(popType){
		var confirmFooterInnerHtml = '<button class="pop-btn pop-confirm-btn">确认</button><button class="pop-btn pop-cancel-btn">取消</button>',
		alertFooterInnerHtml = '<button class="pop-btn pop-confirm-btn">确认</button>',
		curTypePopLen = $('#'+popType+'Pop').length,
		popFooterInnerHtml,popId,popHtml,resultObj,	
		dbConfirm = function(msg,confirmFun,cancelFun){
			var $curPop = $('#confirmPop');
			shwPop($curPop,msg);
			$curPop.on('click','.pop-confirm-btn',function(){
				btnHandle($curPop,confirmFun);
			});
			$curPop.on('click','.pop-cancel-btn',function(){
				btnHandle($curPop,cancelFun);
			});

		},
		dbAlert = function(msg,confirmFun){
			var $curPop = $('#alertPop');
			shwPop($curPop,msg);
			$curPop.on('click','.pop-confirm-btn',function(){
				btnHandle($curPop,confirmFun);
			});
		},
		dbToast = function(msg,sec){
			var $toast = $('.toast'),
				sec = sec ? sec : 2500;
			$toast.html(msg).addClass('shwPop');
			setTimeout(function(){
				$toast.removeClass('shwPop');
			},sec)
		};
		function btnHandle(curPop,fun){
			if (fun) {
				fun();
			};
			hidPop(curPop);
		};
		function shwPop(curPop,msg){
			curPop.find('.dabinPop-con').html(msg);
			curPop.addClass('shwPop');
			$('.layout').show();
		};
		function hidPop(curPop){
			curPop.removeClass('shwPop');
			$('.layout').fadeOut();
			curPop.off('click');
		};
		function createPopDom(){
			if (!curTypePopLen) {
				popHtml = '<div class="dabinPop" id="'+popId+'">'+
						 '<div class="dabinPop-con">'+
						 '</div>'+
						 '<div class="dabinPop-footer">'+
						 popFooterInnerHtml+
						 '</div>'+
					  '</div>';

				$('body').append(popHtml);
				if(!$('.layout').length){
					$('body').append('<div class="layout"></div>');
				}
			}
		};
		function createToastDom(){
			var toastHtml;
			if (!$('.toast').length) {
				toastHtml = '<section class="toast" id="toast"></section>';
				$('body').append(toastHtml);
			};
		}
		switch(popType){
			case 'confirm' :
					popFooterInnerHtml = confirmFooterInnerHtml;
					popId = 'confirmPop';
					resultObj = dbConfirm;
					createPopDom();
					break;
			case 'alert' :
					popFooterInnerHtml = alertFooterInnerHtml;
					popId = 'alertPop';
					resultObj = dbAlert;
					createPopDom();
					break;
			case 'toast' :
					createToastDom();
					resultObj = dbToast;
					break;
			default : 
					console.log('弹框创建失败！原因：您没有传入正确的弹框类型！');
					return;
					break;
		};		
		return resultObj;
	}
	
})