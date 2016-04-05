function Pop(){
	var l = $(".db-pop").length;
	this.init = (function(){
		$("body").append('<div class="db-pop pop'+l+'"></div>');
		if(!l){
			$(".db-pop").after('<div class="overlay"></div>');
		}			
	})()
	this.toast = function(msg,sec){
		var popDom = $(".pop"+l);
		if($('.db-pop').hasClass('up-shw')){
            return;
        }
    	function hid(){
    		popDom.removeClass('up-shw');
    	}
		popDom.html('<div class="pop-con">'+msg+'</div>');
        popDom.addClass('up-shw');
		setTimeout(hid,sec);
	}

	this.alert = function(msg,fn){
		var popDom = $(".pop"+l);
		popDom.html('<div class="pop-con">'+msg+'</div><span class="confirm">确定</span>');
		popDom.addClass('up-shw');
		$(".overlay").show();
		popDom.find(".confirm").on("tap",function(){
			if(fn){
				fn();
			}
			popDom.removeClass('up-shw');
			$(".overlay").fadeOut(700);
		})
	}
    //点击确定执行fn，点击取消执行fn2
	this.confirm = function(msg,fn,fn2){
		var popDom = $(".pop"+l);
		popDom.html('<div class="pop-con">'+msg+'</div><div class="pop_btn"><span class="cancel">取消</span><span class="confirm">确定</span></div>');
		popDom.addClass('up-shw');
        $(".overlay").show();
		popDom.find(".cancel").on("tap",function(){
            if(fn2){
                if(!fn2()){
                    return;
                }
            }
			popDom.removeClass('up-shw');
			$(".overlay").fadeOut(700);
		})
		popDom.find(".confirm").on("tap",function(){
			if(fn){
				if(fn() === false){
                    return;
                }
			}
			popDom.removeClass('up-shw');
			$(".overlay").fadeOut(700);
		})
		}

    //手动隐藏pop
    this.hidPop = function(){
        $('.db-pop').hide();
        $(".overlay").hide();
    }
}