$(function(){
  hzlzh.app.head();
  hzlzh.app.search();
  hzlzh.app.update();
  hzlzh.app.tab();
  hzlzh.app.fade();
  hzlzh.app.calendar();
  hzlzh.app.bbs();
  hzlzh.app.hot();
});

var hzlzh = {};
hzlzh.app = {};
hzlzh.app.head = function (){
  $('.city a').each(function (){
    $(this).click(function (){
      $('.city a').attr('class','');
      $(this).attr('class','active');
    });
  });
};
hzlzh.app.search = function (){
  var arrText = [
    '例如：荷棠鱼坊烧鱼 或 樱花日本料理',
    '例如：昌平区育新站龙旗广场2号楼609室',
    '例如：万达影院双人情侣券',
    '例如：东莞出事了，大老虎是谁？',
    '例如：北京初春降雪，天气变幻莫测'
  ];
  var iNow = 0;
  $('#search .text').val(arrText[iNow]);

  $('.menu li').each(function (index){
    $(this).click(function (){
      $('.menu li').attr('class','gradient');
      $(this).attr('class','active');
      iNow = index;
      $('#search .text').val(arrText[iNow]);
    });

    $('#search .text').focus(function(){
      if($(this).val() == arrText[iNow]){
        $(this).val('');
      }
    });
    $('#search .text').blur(function(){
      if($(this).val() == ''){
        $(this).val(arrText[iNow]);
      }
    });
  });

};
hzlzh.app.update = function (){
  var oDiv = $('.wrap');
  var oUl = oDiv.find('ul');
  var oBtnUp = $('#up');
  var oBtnDown = $('#down');
  var iH = 0;
  var str = '';
  var arrData = [
    { 'name':'萱萱', 'time':4, 'title':'那些灿烂华美的瞬间', 'url':'#1' },
    { 'name':'畅畅', 'time':5, 'title':'广东3天抓获涉黄疑犯', 'url':'#2' },
    { 'name':'萱萱', 'time':6, 'title':'国台办回应王郁琦', 'url':'#3' },
    { 'name':'畅畅', 'time':7, 'title':'那些灿烂华美的瞬间', 'url':'#4' },
    { 'name':'萱萱', 'time':8, 'title':'那些灿烂华美的瞬间', 'url':'#5' },
    { 'name':'畅畅', 'time':9, 'title':'广东3天抓获涉黄疑犯', 'url':'#6' },
    { 'name':'萱萱', 'time':10, 'title':'国台办回应王郁琦', 'url':'#7' },
    { 'name':'畅畅', 'time':11, 'title':'那些灿烂华美的瞬间', 'url':'#8' }
  ];
  var iNow = 0;
  var timer = null;
  for(var i=0;i<arrData.length;i++){
    str += '<li><a href="'+arrData[i].url+'"><strong>'+arrData[i].name+'</strong>&nbsp;<span>'+arrData[i].time+'分钟前</span>&nbsp;写了一篇新文章：'+arrData[i].title+'…</a></li>';
  }
  oUl.html(str);
  iH = oUl.find('li').height();

  function doMove(num){
    iNow += num;
    if(iNow>0){/* 第一次得到的iNow就是num,规定它大于0时是向下移动 */
      iNow = -(arrData.length-1); /* 把ul里的最后一个li显示出来，这样往下移动就会显示前一个li */
    }
    if(Math.abs(iNow)>arrData.length-1){/* 向上移动是负的 */
      oUl.css('top','0');
      iNow = 0;
    }
    oUl.stop().animate({'top':iH*iNow},3000,'elasticOut');
  }
  oBtnUp.click(function(){
    doMove(-1);
  });
  oBtnDown.click(function(){
    doMove(1);
  });

  function autoPlay(){
    timer = setInterval(function(){
      doMove(-1);
    },3000);
  }
  autoPlay();

  oDiv.hover(function (){ /* hover(over,out) */
    clearInterval(timer);
  },autoPlay);
  oBtnUp.hover(function (){
    clearInterval(timer);
  },autoPlay);
  oBtnDown.hover(function (){
    clearInterval(timer);
  },autoPlay);
};
hzlzh.app.tab = function (){

  function fnTab(oNav, aCon, sEvent){
    var aElem = oNav.children();
    aCon.hide().eq(0).show();

    aElem.each(function (index){
      $(this).on(sEvent,function (){
        aElem.removeClass('active').addClass('gradient');
        $(this).removeClass('gradient').addClass('active');
        aElem.find('a').attr('class','triangle_gray');
        $(this).find('a').attr('class','triangle_down');
        aCon.hide().eq(index).show();
      });
    });
  }

  fnTab($('.tabNav1'),$('.tabCon1'),'click');
  fnTab($('.tabNav2'),$('.tabCon2'),'click');
  fnTab($('.tabNav3'),$('.tabCon3'),'mouseover');
  fnTab($('.tabNav4'),$('.tabCon4'),'mouseover');
};
hzlzh.app.fade = function (){

  var oDiv = $('.fade');
  var aUli = oDiv.find('ul li');
  var aOli = oDiv.find('ol li');
  var arr = [ '爸爸去哪儿啦~', '人像摄影中的光影感', '娇柔妩媚、美艳大方' ];
  var oP = oDiv.find('p');
  var iNow = 0;
  var timer = null;

  function fade(){
    aUli.each(function(index){
      if(index != iNow){
        aUli.eq(index).fadeOut();
        aOli.eq(index).find('img').removeClass('active');
      }
      else{
        aUli.eq(iNow).fadeIn();
        aOli.eq(iNow).find('img').addClass('active');
      }
      oP.text(arr[iNow]);
    });
  }

  fade();

  aOli.click(function (){
    iNow = $(this).index();
    fade();
  });

  function autoPlay(){
    timer = setInterval(function (){
      iNow++;
      iNow %= arr.length;
      fade();
    },2000);
  }

  autoPlay();

  oDiv.hover(function (){
    clearInterval(timer);
  },autoPlay);

};
hzlzh.app.calendar = function (){

  var aSpan = $('.calendar h3 span');
  var aImg = $('.calendar .img');
  var oInfo = $('.today_info');
  var oImg = oInfo.find('img');
  var oStrong = oInfo.find('strong');
  var oP = oInfo.find('p');


  aImg.hover(function (){
    var iTop = $(this).parent().position().top-40;
    var iLeft = $(this).parent().position().left+60;
    var index = $(this).parent().index()%aSpan.size();


    oInfo.css({'left':iLeft, 'top':iTop});
    oImg.attr('src',$(this).attr('src'));
    oStrong.text(aSpan.eq(index).text());
    oP.text($(this).attr('info'));
    oInfo.show();
  },function (){
    oInfo.hide();
  });
};
hzlzh.app.bbs = function (){
  $('.bbs ol li').mouseover(function (){
    $('.bbs ol li').removeClass('active');
    $(this).addClass('active');
  });
};
hzlzh.app.hot = function (){
  var arr = [
    '',
    '用户1<br />人气1',
    '用户名：性感宝贝<br />区域：朝阳CBD<br />人气：124987',
    '用户3<br />人气3',
    '用户4<br />人气4',
    '用户5<br />人气5',
    '用户6<br />人气6',
    '用户7<br />人气7',
    '用户8<br />人气8',
    '用户9<br />人气9',
    '用户10<br />人气10'
  ];
  $('.hot_area li').mouseover(function (){
    if($(this).index() == 0) return;

    $('.hot_area li p').remove();
    $(this).append('<p style="width:'+($(this).width()-12)+'px; height:'+($(this).height()-12)+'px; ">'+arr[$(this).index()]+'</p>');
  });
};