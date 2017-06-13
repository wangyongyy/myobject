

$(function(){
	$('#search_button').button({
		disabled : false,
		icons : {
			primary : 'ui-icon-search',
		},
		label : '查找',
	});
	
	
	$('#member, #logout').hide();
	if($.cookie('user')){
		$('#member, #logout').show();
		$('#reg_a, #login_a').hide();
		$('#member').html($.cookie('user'));
	}else{
		$('#member, #logout').hide();
		$('#reg_a, #login_a').show();
	};
	$('#logout').click(function(){
		$.removeCookie('user');
		window.location.href = '/jQueryUI/jQuery_09/';
	})
	$('#loading').dialog({
		autoOpen : false,
		modal : true,
		closeOnEscape : false,
		resizable : false,
		draggable : false,
		width : 180,
		height : 50,
	}).parent().parent().find('.ui-widget-header').hide();
	
	$('#reg_a').click(function(){
		$('#reg').dialog('open');
	});
	
	
	$('#reg').dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		width : 370,
		height : 350,
		buttons : {
			'提交' : function(){
				$(this).submit();
			}
		},
		closeText : '关闭',
	}).buttonset().validate({
		
		submitHandler : function(form){
			$(form).ajaxSubmit({
				url : 'add.php',
				type : 'POST',
				beforeSubmit : function(formDate,jqForm,options){
					$('#loading').dialog('open');
					$('#reg').dialog('widget').find('button').eq(1).button('disable');
				},
				success : function(responseText,statusText){
					//alert('提交');
					if(responseText){
						$('#loading').css('background','url(images/success.gif) no-repeat 20px center').html('数据新增成功');
						$('#reg').dialog('widget').find('button').eq(1).button('enable')
						$.cookie('user',$('#user').val());
						setTimeout(function(){
							$('#loading').dialog('close');
							$('#reg').dialog('close');
							$('#reg').resetForm();
							$('#reg span.star').html('*').removeClass('succ');
							$('#loading').css('background','url(images/loading.gif) no-repeat 20px center').html('数据交互中...');
							$('#member, #logout').show();
							$('#reg_a, #login_a').hide();
							$('#member').html($.cookie('user'));
						},1000)
					}
				}
			});
		},
		
		showErrors : function(errorMap,errorList){
			var errors = this.numberOfInvalids();
			//自动扩展
			if(errors>0){
				$('#reg').dialog('option','height',errors*20+350);
			}else{
				$('#reg').dialog('option','height',errors*20+350);
			};
			this.defaultShowErrors();
		},
		
		highlight : function(element,errorClass){
			$(element).css('border','1px solid #f00');
			$(element).parent().find('span').html('*').removeClass('succ');
		},
		unhighlight : function(element,errorClass){
			$(element).css('border','1px solid #ccc');
			$(element).parent().find('span').html('&nbsp;').addClass('succ');
		},
		
		
		
		errorLabelContainer : 'ol.reg_error',
		wrapper : 'li',
		
		
		rules : {
			user : {
				required : true,
				minlength : 2,
				remote : {
					url : 'is_user.php',
					type : 'POST',
				}
			},
			pass : {
				required : true,
				minlength : 6,
			},
			email : {
				required : true,
				email : true,
			},
			date : {
				date : true,
			},
		},
		messages : {
			user : {
				required : '账号不得为空',
				minlength : jQuery.format('账号不得小于{0}位'),
				remote : '账号被占用',
			},
			pass : {
				required : '密码不得为空',
				minlength : jQuery.format('密码不得小于{0}位'),
			},
			email : {
				required : '邮编不得为空',
				email : '请输入正确的邮箱地址',
			},
		},
	});
	
	//登录
	$('#login_a').click(function(){
		$('#login').dialog('open');
	});
	
	
	$('#login').dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		width : 370,
		height : 240,
		buttons : {
			'登录' : function(){
				$(this).submit();
			}
		},
		closeText : '关闭',
	}).validate({
		
		submitHandler : function(form){
			$(form).ajaxSubmit({
				url : 'login.php',
				type : 'POST',
				beforeSubmit : function(formDate,jqForm,options){
					$('#loading').dialog('open');
					$('#login').dialog('widget').find('button').eq(1).button('disable');
				},
				success : function(responseText,statusText){
					//alert('提交');
					if(responseText){
						$('#loading').css('background','url(images/success.gif) no-repeat 20px center').html('登录成功');
						$('#login').dialog('widget').find('button').eq(1).button('enable')
						
						if($('#expires').is(':checked')){
							$.cookie('user',$('#login_user').val(),{
								expires : 7,
							});
						}else{
							$.cookie('user',$('#login_user').val());
						};
						
						
						
						setTimeout(function(){
							$('#loading').dialog('close');
							$('#login').dialog('close');
							$('#login').resetForm();
							$('#login span.star').html('*').removeClass('succ');
							$('#loading').css('background','url(images/loading.gif) no-repeat 20px center').html('数据交互中...');
							$('#member, #logout').show();
							$('#reg_a, #login_a').hide();
							$('#member').html($.cookie('user'));
						},1000)
					}
				}
			});
		},
		
		showErrors : function(errorMap,errorList){
			var errors = this.numberOfInvalids();
			//自动扩展
			if(errors>0){
				$('#login').dialog('option','height',errors*20+240);
			}else{
				$('#login').dialog('option','height',errors*20+240);
			};
			this.defaultShowErrors();
		},
		
		highlight : function(element,errorClass){
			$(element).css('border','1px solid #f00');
			$(element).parent().find('span').html('*').removeClass('succ');
		},
		unhighlight : function(element,errorClass){
			$(element).css('border','1px solid #ccc');
			$(element).parent().find('span').html('&nbsp;').addClass('succ');
		},
		
		
		
		errorLabelContainer : 'ol.login_error',
		wrapper : 'li',
		
		
		rules : {
			login_user : {
				required : true,
				minlength : 2,
			},
			login_pass : {
				required : true,
				minlength : 6,
				remote : {
					url : 'login.php',
					type : 'POST',
					data : {
						login_user : function(){
							return $('#login_user').val();
						},
					},
				},
			},
		},
		messages : {
			login_user : {
				required : '账号不得为空',
				minlength : jQuery.format('账号不得小于{0}位'),
			},
			login_pass : {
				required : '密码不得为空',
				minlength : jQuery.format('密码不得小于{0}位'),
				remote : '账号或密码错误!',
			},
		},
	});
	
	
	
	$('#birthday').datepicker({
		dateFormat : 'yy-mm-dd',
		dayNamesMin : ['日','一','二','三','四','五','六'],
		monthNames : ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
		altField : '#abc',
		altFormat : 'dd/mm/yy',
		//appendText : '日历',
		showWeek : true,
		weekHeader : '周',
		firstDay : 1,
		showOtherMonths : true,
		changeMonth : true,
		monthNamesShort : ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
		changeYear : true,
		showOn : 'both',
		buttonText : '日了',
		buttonImage : 'images/calendar.gif',
		buttonImageOnly : true,
		showButtonPanel : true,
		closeText : '关闭',
		currentText : '今天dd',
		nextText : '下一月mm',
		prevText : '上一月mm',
		navigationAsDateFormat : true,
		yearSuffix : '年',
		showMonthAfterYear : true,
		yearRange : '1950:2040',
		//minDate : -1110,
		//maxDate : 0,
		//defaultDate : -2,
		//gotoCurrent : true,
		duration : 50,
		beforeShow : function(){
			$('#date').datepicker('refresh');
		},
	});
	//alert($('#date').datepicker('setDate'));
	
	$('#reg input[title]').tooltip({
		//disabled : false,
		//content : '改变文字',
		position : {
			my : 'left center',
			at : 'right+5 center',
		}
	});
	$('#email').autocomplete({
		minLength : 1,
		delay : 50,
		autoFocus : true,
		source : function(request,response){
			//response(['aa','aaaa','aaaaaa','bb']);
			var hosts = ['qq.com','163.com','263.com','gmail.com','hotmail.com'],
			term = request.term,
			ix = term.indexOf('@'),
			name = term,
			host = '';
			result = [];
			result.push(term);
			
			if(ix>-1){
				name = term.slice(0,ix);
				host = term.slice(ix + 1);
			}
			if(name){
				var findedHosts = (host ? $.grep(hosts,function(value,index){
						return value.indexOf(host)>-1;
					}) : hosts),
					findedResult = $.map(findedHosts,function(value,index){
					return name + '@' +value;
				});
				result = result.concat(findedResult);
			}
			
			response(result);
		}
	});
	
	$('#tabs').tabs({
		//collapsible : true,
		//disabled : [0,1],
		//event : 'mouseover',
		//active : false,
		//heightStyle : 'fill',
		//show : true,
		//hide : true,
		//create : function(event,ui){
			//alert(ui.tab.get());
			//alert($(ui.tab.get()).html());
			//alert($(ui.panel.get()).html());
		//},
		activate : function(event,ui){
			//alert('切换后触发');
			alert($(ui.oldTab.get()).html());
			alert($(ui.newTab.get()).html());
		}
	});
	
	
});
