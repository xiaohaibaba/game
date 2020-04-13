// 玩家一名称
var first_player_name;
// 玩家一头像地址
var first_player_avatar;
// 玩家二名称
var second_player_name;
// 玩家二头像地址
var second_player_avatar;
// 头像个数
var avatarnum=10;
// 玩家一 保存当前局中生成过的随机数(保存已经生成过的随机数,确保change需要重新生成的随机数不再生成已经生成过的随机数)
var first_random_already = new Array();
// 保存玩家一 在当前局的三个随机数
var first_random_current;
// 玩家二 保存当前局中生成过的随机数(保存已经生成过的随机数,确保change需要重新生成的随机数不再生成已经生成过的随机数)
var second_random_already = new Array();
// 保存玩家二 在当前局的三个随机数
var second_random_current;
// 0-100的随机数
var random_number_calculate;
// 初始化change按钮的记录次数,只允许change一次
var first_changeval = 0;
var second_changeval = 0;
// 玩家一表达式计数器,最大为5时,可以进行计算
var first_expression_number = 1;
// 玩家二表达式计数器,最大为5时,可以进行计算
var second_expression_number = 1;
// 重新开始游戏的标记,当为2的时候触发
var giveupCount = 0;

Object.extend = function(destination, source) {
  for (property in source) {
    destination[property] = source[property];
  }
  return destination;
}
Object.prototype.extend = function(object) {
  return Object.extend.apply(this, [this, object]);
}

function Base(){
 
}
Base.prototype={
	initialize:function(){
		this.oninit(); //调用了一个虚方法
	},
	oninit:function(){
		 //留一个空的方法
	}
}
 
function InitGame(){

}
 
InitGame.prototype=(new Base()).extend({
	oninit:function(){//实现抽象基类中的oninit虚方法
		//初始化游戏
		initgames(avatarnum);
		//DIV点击单选效果
		$(".square_first").click(function(){
			clear("first");
			$(this).addClass("bgColor");
			first_player_avatar = $(this).children().attr("src");
		});
		//DIV点击单选效果
		$(".square_second").click(function(){
			clear("second");
			$(this).addClass("bgColor");
			second_player_avatar = $(this).children().attr("src");
		});
		
		//选择卡片后,就更改颜色,表示不可选,按钮点击功能禁用
		$(".cardnum").click(function(){
			if($(this).attr("id").indexOf("first")>=0){
				//防止超出了界限,弹出错误窗口的问题
				if(parseInt(first_expression_number)<6){
					// 是奇数才可以选择数字
					if(parseInt(first_expression_number) % 2 == 0){
						showerror("Please select operation symbol");
						return;
					}
					if($(this).hasClass("bgColor")){
						showerror("This number has been used");
						return;
					}
					$(this).addClass("bgColor");
					//将卡片的数字显示在表达式中
					$("#first_number_"+first_expression_number).html($(this).html());
					//把first_expression_number设置进去,用于删除元素的时候,可以恢复卡片的样式
					$(this).attr("number_date",first_expression_number);
					first_expression_number++;
				}
			}else if($(this).attr("id").indexOf("second")>=0){
				if(parseInt(second_expression_number)<6){
					// 是奇数才可以选择数字
					if(parseInt(second_expression_number) % 2 == 0){
						showerror("Please select operation symbol");
						return;
					}
					if($(this).hasClass("bgColor")){
						showerror("This number has been used");
						return;
					}
					$(this).addClass("bgColor");
					//将卡片的数字显示在表达式中
					$("#second_number_"+second_expression_number).html($(this).html());
					//把second_expression_number设置进去,用于删除元素的时候,可以恢复卡片的样式
					$(this).attr("number_date",second_expression_number);
					second_expression_number++;
				}
			}
		});
		$(".symbol").click(function(){
			if($(this).attr("class").indexOf("first")>=0){
				if(parseInt(first_expression_number)<6){
					// 是偶数才可以选择运算符号
					if(parseInt(first_expression_number) % 2 == 1){
						showerror("Please select card number");
						return;
					}
					//将卡片的数字显示在表达式中
					$("#first_number_"+first_expression_number).html($(this).html());
					first_expression_number++;
				}
			}else if($(this).attr("class").indexOf("second")>=0){
				if(parseInt(second_expression_number)<6){
					// 是偶数才可以选择运算符号
					if(parseInt(second_expression_number) % 2 == 1){
						showerror("Please select card number");
						return;
					}
					//将卡片的数字显示在表达式中
					$("#second_number_"+second_expression_number).html($(this).html());
					second_expression_number++;
				}
			}
		});
	}
});


$(document).ready(function(){
	var initGame = new InitGame();
	initGame.initialize();
});
//初始化头像
function initavatar(avatarnum){
	for(var i=0;i<avatarnum;i++){
		$('#first_container').append("<div class='avatar square_first'><img src='img/head/"+i+".jpg'/></div>");
		$('#second_container').append("<div class='avatar square_second'><img src='img/head/"+i+".jpg'/></div>");
	}
}
//div单选样式
function clear(temp) {
    $(".square_"+temp).each(function() {
		if($(this).hasClass("bgColor")){
			$(this).removeClass("bgColor");
		}
    });
}

//初始化游戏
function initgames(avatarnum){
	//玩家一头像地址
	first_player_avatar = null;
	//玩家二头像地址
	second_player_avatar = null;
	// 玩家一名称
	first_player_name = "";
	$("input[name='firstPlayer']").val("");
	// 玩家二名称
	second_player_name = "";
	$("input[name='secondPlayer']").val("");
	// 玩家一 保存当前局中生成过的随机数(保存已经生成过的随机数,确保change需要重新生成的随机数不再生成已经生成过的随机数)
	first_random_already = new Array();
	// 玩家二 保存当前局中生成过的随机数(保存已经生成过的随机数,确保change需要重新生成的随机数不再生成已经生成过的随机数)
	second_random_already = new Array();
	// 初始化change按钮的记录次数,只允许change一次
	first_changeval = 0;
	second_changeval = 0;
	// 玩家一表达式计数器,最大为5时,可以进行计算
	first_expression_number = 1;
	// 玩家二表达式计数器,最大为5时,可以进行计算
	second_expression_number = 1;
	// 重新开始游戏的标记,当为2的时候触发
	giveupCount = 0;
	//去除头像勾选样式
	$(".avatar").removeClass("bgColor");
	//初始化头像
	initavatar(avatarnum);
}

//玩家一点击next
function firstPlayerOnclickNext(){
	//校验姓名和头像是否已经选择
	if(!validateFirstIsOk()){
		showerror("player name or avatar cannot be empty");
		return;
	}
	//显示画面二
	showSecondPlayer();
}

//玩家二点击next
function secondPlayerOnclickNext(){
	//校验姓名和头像是否已经选择
	if(!validateSecondIsOk()){
		showerror("player name or avatar cannot be empty");
		return;
	}
	//显示画面三
	showPlaying();
	//给玩家头像和名称赋值
	assignmentNameAndVavtar();
	//生成所有随机数
	createAllRandomNumber();
}

//继续游戏
function continueGame(){
	hiddenWin();
	replay();
}
//生成所有随机数
function createAllRandomNumber(){
	//生成玩家一的三个随机数
	randomNumberByFirstPlayer(0,10);
	//生成玩家二的三个随机数
	randomNumberBySecondPlayer(0,10);
	//随机选取一个玩家,让它的数字随机组合生成一个数字
	
	// //生成一个0-100的随机数
	// randomNumberCalculate(0,100);
	//随机让一个玩家赢
	randomPlayerWin();
}
//随机让一个玩家赢
function randomPlayerWin(){
	//随机获取一个玩家的标,1或2
	var player = randomNumber(1,3);
	var playerName = playerNameByIndex(player);
	//获取玩家三张卡片的数字
	var resultStr = "";
	for (var i = 0; i < 3; i++) {
		//拼接卡片数字first_cardnum_0
		resultStr += $("#"+playerName+"_cardnum_"+i).html();
		//拼接一个算术符号
		resultStr += randomCalculate();
	}
	resultStr = resultStr.substr(0, resultStr.length-1)
	//去掉最后一个算术符号
	var result = eval(resultStr);
	//如果计算结果小于0,重新计算
	if(result<0){
		randomPlayerWin();
		return;
	}
	console.log(resultStr+"="+result)
	$("#randomNumberCalculate").html(result);
}
//获取一个随机的算数符号,不要除法,避免出现小数
function randomCalculate(){
	var randomCalculate = new Array("+","-","*");
	return randomCalculate[randomNumber(0,3)];
}
//通过下标获取玩家名字
function playerNameByIndex(index){
	if(index==1){
		return "first";
	}else if(index==2){
		return "second";
	}
}

function randomNumberByFirstPlayer(x,y) {
	//每开始一局,就需要重置
	first_random_current = new Array(3);
	//生成三个随机数
	for (var i = 0; i < 3; i++) {
		//生成一个随机数,x上限，y下限  
		var rand = randomNumber(x,y);
		$("#first_cardnum_"+i).html(rand);
		first_random_already.push(rand);
		first_random_current.push(rand);
	}
}

//玩家二生成三个随机数,在同一局中,不会生成重复的随机数,生成次数最多等于两次
function randomNumberBySecondPlayer(x,y) {
	//每开始一局,就需要重置
	second_random_current = new Array(3);
	//生成三个随机数
	for (var i = 0; i < 3; i++) {
		//生成一个随机数,x上限，y下限  
		var rand = randomNumber(x,y);
		$("#second_cardnum_"+i).html(rand);
		second_random_already.push(rand);
		second_random_current.push(rand);
	}
}
//通过change生成的随机数不会出现当前局中已生成过的随机数
function randomNumberPlayerChange(param) {
	// 当已经生成的数据放到临时数组中
	var temp;
	//每开始一局,就需要重置
	if("first"==param){
		first_random_current = new Array(3);
		temp = first_random_already;
	}else if("second"==param){
		second_random_current = new Array(3);
		temp = second_random_already;
	}
	//生成三个随机数
	for (var i = 0; i < 3; i++) {
		//生成一个随机数,x上限，y下限  
		var rand = randomNumber(0,10);
		if(temp.length>0){
			//如果已生成的随机数组中含有这个随机数,就需要重新生成
			while(temp.indexOf(rand)>=0){
				rand = randomNumber(0,10);
			}
		}
		if("first"==param){
			$("#first_cardnum_"+i).html(rand);
			first_random_already.push(rand);
			first_random_current.push(rand);
		}else if("second"==param){
			$("#second_cardnum_"+i).html(rand);
			second_random_already.push(rand);
			second_random_current.push(rand);
		}
	}
}

//生成一个0-100的随机数,此方法作废
// function randomNumberCalculate(x,y){
// 	var rand = randomNumber(x,y);
// 	//赋值给匹配值
// 	random_number_calculate = rand;
// 	$("#randomNumberCalculate").html(rand);
// }

//生成随机数,x下限，y上限  
function randomNumber(x,y) {
    var rand = parseInt(Math.random() * (x - y) + y);
    return rand;
}

//给玩家头像和名称赋值
function assignmentNameAndVavtar(){
	$("#firstPlayerName").html(first_player_name);
	$("#secondPlayerName").html(second_player_name);
	$("#firstPlayerAvatar").attr('src',first_player_avatar);
	$("#secondPlayerAvatar").attr('src',second_player_avatar);
} 
//校验玩家一姓名和头像是否已经选择
function validateFirstIsOk(){
	var firstPlayer = $("input[name='firstPlayer']").val();
	first_player_name = firstPlayer;
	if(first_player_avatar && firstPlayer){
		return true;
	}
	return false;
}

//校验玩家一姓名和头像是否已经选择
function validateSecondIsOk(){
	var secondPlayer = $("input[name='secondPlayer']").val();
	second_player_name = secondPlayer;
	if(second_player_avatar && secondPlayer){
		return true;
	}
	return false;
}

//显示画面一,玩家一输入用户名和选择头像
function showFirstPlayer(){
	$("#first").css("display","block");//显示div
	$("#second").css("display","none");//隐藏div
	$("#playing").css("display","none");//隐藏div
}

//显示画面二,玩家二输入用户名和选择头像
function showSecondPlayer(){
	$("#first").css("display","none");//隐藏div
	$("#second").css("display","block");//显示div
	$("#playing").css("display","none");//隐藏div
}
//显示画面三
function showPlaying(){
	$("#playing").css("display","block");//显示div
	$("#first").css("display","none");//隐藏div
	$("#second").css("display","none");//显示div
}

//隐藏画面一
function hiddenFirstPlayer(){
	$("#first").css("display","block");//隐藏div
}
//隐藏画面二
function hiddenSecondPlayer(){
	$("#second").css("display","block");//隐藏div
}
//隐藏画面三
function hiddenPlaying(){
	$("#playing").css("display","block");//隐藏div
}
//玩家提交结果
function submitGame(param){
	var number_1,number_2,number_3,number_4,number_5;
	if("first".indexOf(param)>=0){
		number_1 = $("#first_number_1").text();
		number_2 = $("#first_number_2").text();
		number_3 = $("#first_number_3").text();
		number_4 = $("#first_number_4").text();
		number_5 = $("#first_number_5").text();
	}else if("second".indexOf(param)>=0){
		number_1 = $("#second_number_1").text();
		number_2 = $("#second_number_2").text();
		number_3 = $("#second_number_3").text();
		number_4 = $("#second_number_4").text();
		number_5 = $("#second_number_5").text();
	}else{
		return;
	}
	//如果公式没有填完整
	if(!(number_1 && number_2 && 
		number_3 && number_4 && number_5)){
		showerror("The item to be entered cannot be");
		return;
	}
	//填充完整后,就可以进行计算了
	var result = eval(number_1+replaceOperationSymbol(number_2)+number_3+replaceOperationSymbol(number_4)+number_5);
	//如果相等
	if(parseInt(result) != parseInt($("#randomNumberCalculate").html())){
		showerror("Calculation result mismatch")
		return;
	}
	var winer = $("#"+param+"PlayerName").html();
	
	//如果相等
	showWin(winer+" wins this round!");
	//增加分数
	addScore(param);
}

//增加分数
function addScore(param){
	var score = parseInt($("#"+param+"_score").html());
	score++;
	$("#"+param+"_score").html(score);
}
//玩家删除一个数字
function deleteNumber(param){
	var number;
	if("first".indexOf(param)>=0){
		number = parseInt(first_expression_number);
		number--;
		if(number>0){
			$(".cardnum").each(function(){
				if($(this).attr("class").indexOf("first")>=0){
					if(parseInt($(this).attr("number_date"))==number){
						$(this).removeClass("bgColor");
					}
				}
				if($(this).attr("class").indexOf("second")>=0){
					if(parseInt($(this).attr("number_date"))==number){
						$(this).removeClass("bgColor");
					}
				}
			});
			$("#first_number_"+number).html("");
			first_expression_number--;
		}
	}
	if("second".indexOf(param)>=0){
		number = parseInt(second_expression_number);
		number--;
		if(number>0){
			$(".cardnum").each(function(){
				if($(this).attr("class").indexOf("second")>=0){
					if(parseInt($(this).attr("number_date"))==number){
						$(this).removeClass("bgColor");
					}
				}
			});
			$("#second_number_"+number).html("");
			second_expression_number--;
		}
	}
}
//需要替换算术运算符,x ÷,计算机是不识别的
function replaceOperationSymbol(symbol){
	var temp;
	switch(symbol) {
		case "+":
			temp = "+";
		    break;
		case "-":
			temp = "-";
			break;
		case "x":
			temp = "*";
	        break;
		case "÷":
			temp = "/";
			break;
	}
	return temp;
}


//错误信息弹窗
function showerror(msg){
	$('.errormsg').css("display","block");
	$("#errormsg").html(msg);
	setTimeout("hiddenmsg()", 3000);
}
//成功信息弹窗
function showsuccess(msg){
	$('.successmsg').css("display","block");
	$("#successmsg").html(msg);
	setTimeout("hiddenmsg()", 3000);
}
//隐藏错误信息弹窗
function hiddenmsg(){
	$('.errormsg').css("display","none");
	$("#errormsg").html("");
	$('.successmsg').css("display","none");
	$("#successmsg").html("");
}
//玩家change
function change(param){
	if('first'.indexOf(param)>=0){
		//判断first_changeval是否有点击change
		if(parseInt(first_changeval)>0){
			showerror("Can't use change again");
			return;
		}
		//锁定按钮,防止重复提交
		$("#firstChange").attr("disabled", true);
		//自增1
		first_changeval++;
		//解除锁定
		$("#firstChange").removeAttr("disabled");
	}else if('second'.indexOf(param)>=0){
		//判断second_changeval是否有点击change
		if(parseInt(second_changeval)>0){
			showerror("Can't use change again");
			return;
		}
		//锁定按钮,防止重复提交
		$("#secondChange").attr("disabled", true);
		//自增1
		second_changeval++;
		//解除锁定
		$("#secondChange").removeAttr("disabled");
	}
	//生成change的随机数
	randomNumberPlayerChange(param);
	//移除样式
	$(".cardnum").each(function(){
		if($(this).attr("class").indexOf(param)>=0){
			$(this).removeClass("bgColor");
		}
	});
}
//玩家give up,锁住所有按钮,除exit按钮
function giveup(param){
	if(giveupCount>0){
		//重新开始游戏
		replay();
		return;
	}
	lockBtn(param);
	giveupCount++;
}

//重新开始游戏
function replay(){
	showsuccess("Restart Game")
	resttingPlayer('first');
	resttingPlayer('second');
	clearBg('first');
	clearBg('second');
	unfreezeBtn();
	clearNumber();
	//重置give up值
	giveupCount = 0;
	//生成所有随机数
	createAllRandomNumber();
	
}
//清除背景
function clearBg(param){
	$(".cardnum").each(function(){
		if($(this).attr("class").indexOf(param)>=0){
			$(this).removeClass("bgColor");
		}
	});
}
//清除表达式的值
function clearNumber(param){
	if(param){
		$(".number").each(function(){
			if($(this).attr("class").indexOf(param)>=0){
				$(this).html("");
			}
		});
	}else{
		$(".number").each(function(){
			$(this).html("");
		});
	}
}
//按钮限制
function lockBtn(param){
	$(".btn").each(function(){
		if($(this).attr("class").indexOf(param)>=0){
			$(this).attr("disabled", true);
		}
	});
}
//解除按钮限制
function unfreezeBtn(param){
	if(param){
		$(".btn").each(function(){
			if($(this).attr("class").indexOf(param)>=0){
				$(this).removeAttr("disabled");
			}
		});
	}else{
		$(".btn").each(function(){
			$(this).removeAttr("disabled");
		});
	}
}

//重置玩家的配置信息
function resttingPlayer(param){
	if("first".indexOf(param)>=0){
		// 玩家一 保存当前局中生成过的随机数(保存已经生成过的随机数,确保change需要重新生成的随机数不再生成已经生成过的随机数)
		first_random_already = new Array();
		// 初始化change按钮的记录次数,只允许change一次
		first_changeval = 0;
		// 玩家一表达式计数器,最大为5时,可以进行计算
		first_expression_number = 1;
	}
	if("second".indexOf(param)>=0){
		// 玩家一 保存当前局中生成过的随机数(保存已经生成过的随机数,确保change需要重新生成的随机数不再生成已经生成过的随机数)
		second_random_already = new Array();
		// 初始化change按钮的记录次数,只允许change一次
		second_changeval = 0;
		// 玩家一表达式计数器,最大为5时,可以进行计算
		second_expression_number = 1;
	}
	
}

//询问是否退出游戏
function exitGame(param){
	if("first".indexOf(param)>=0){
		showExitGame("Dear "+first_player_name+", do you want to quit the game ?");
	}else if("second".indexOf(param)>=0){
		showExitGame("Dear "+second_player_name+", do you want to quit the game ?");
	}
}
//不退出游戏
function noexitGame(){
	hiddenExitGame();
}
//确定退出游戏
function defineExitGame(){
	//初始化游戏,参数为0,表示不需要初始化头像了
	initgames(0);
	//隐藏弹窗
	hiddenExitGame();
	//隐藏第三个页面
	hiddenPlaying();
	//展示第一个页面
	showFirstPlayer();
}
function showWin(msg){
	$('#wingamemsg').html(msg);
	$('.wingame').css("display","block");
}
function hiddenWin(){
	$('.wingame').css("display","none");
}

function showExitGame(msg){
	$('#exitgamemsg').html(msg);
	$('.exitgame').css("display","block");
}
function hiddenExitGame(){
	$('.exitgame').css("display","none");
}
