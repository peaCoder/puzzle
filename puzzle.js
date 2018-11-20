// JavaScript Document
var time = 0;
var pause = true;
var set_time;
var d = new Array(10);//1-9的数字，省略了0
var d_direct = new Array([0],/*0不要，从1开始*/[2,4],[1,3,5],[2,6],[1,5,7],[2,4,6,8],[3,5,9],[4,8],[5,7,9],[6,8]);//每个div可以移动的位置
var d_posXY = new Array([0],[0,0],[150,0],[300,0],[0,150],[150,150],[300,150],[0,300],[150,300],[300,300]);//每个div的位置[left,top]
d[1]=1;d[2]=2;d[3]=3;d[4]=4;d[5]=5;d[6]=6;d[7]=7;d[8]=8;d[9]=0;//每个div的默认排列顺序

function move(id){
	var i=1;
	for(i=1;i<10;++i){//找出div的位置
		if(d[i]==id) break;
	}
	var target_d=0;//存储div可以移动的编号，如果为0则表示不能移动
	target_d=whereCanGo(i);
	if(target_d!=0){//表示可以移动
		d[i]=0;//将当前的div设置为0；
		d[target_d]=id;//将div移动后位置设置id
		//将的d[i]的left和top也改一下
		document.getElementById("d"+id).style.left = d_posXY[target_d][0]+"px";
		document.getElementById("d"+id).style.top = d_posXY[target_d][1]+"px";
	}
	//判断游戏是否完成
	var finish_flag = true;
	for(var k=1;k<9;++k){
		if(d[k]!=k){
			finish_flag = false;
			break;
		}
	}
	if(finish_flag==true){
		/*if(!pause){
			start();
		}*/
		clearInterval(set_time);
		alert("congratulations!!!");
		
	}
}

function whereCanGo(cur_div){//判断是否可以移动，返回的是空白div的位置
	var j = 0;
	var move_flag = false;
	for(j=0;j<d_direct[cur_div].length;++j){//将所有可以移动的位置遍历一遍
		if(d[d_direct[cur_div][j]]==0){
			move_flag = true;//表示是空白div的位置
			break;
		}
	}
	if(move_flag==true){
		return d_direct[cur_div][j];
	}
	else 
		return 0;//返回0时表示不能移动
}

function timer(){
	time += 1;
	var min = parseInt(time / 60);
	var sec = time % 60;
	document.getElementById("timer").innerHTML=min + "分" + sec + "秒";
}

function start(){
	if(pause){
		document.getElementById("start").innerHTML="暂停";
		pause = false;
		set_time = setInterval(timer,1000);
	}
	else{
		document.getElementById("start").innerHTML="开始";
		pause = true;
		clearInterval(set_time);
	}
	
}

function reset(){
	time = 0;
	random_d();
	if(pause) start();
}

function random_d(){//随机打乱拼图，从第九块开始，生成一个随机数，将两块进行对换
	for(var i=9;i>1;--i){
		var ran=parseInt(Math.random()*(i-1)+1);//生成一个1-i的随机数；
		if(d[i]!=0){
			document.getElementById("d"+d[i]).style.left=d_posXY[ran][0]+"px";
			document.getElementById("d"+d[i]).style.top=d_posXY[ran][1]+"px";
		}
		if(d[ran]!=0){
			document.getElementById("d"+d[ran]).style.left=d_posXY[i][0]+"px";
			document.getElementById("d"+d[ran]).style.top=d_posXY[i][1]+"px";
		}
		var temp=d[ran];
		d[ran]=d[i];
		d[i]=temp;
	}
}
window.onload=function(){
	reset();
}
