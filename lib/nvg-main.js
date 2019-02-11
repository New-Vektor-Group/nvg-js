var nvg_sw = screen.width;     
var nvg_sh = screen.height; 

function scrollbotchat(nvgw)
{
	//Резкая прокрутка вниз
   $('#'+nvgw).scrollTop($('#'+nvgw)[0].scrollHeight);
}

var namer = "";
function scrollTopSoft(namer2)
{
	namer = namer2;
	$("a[href='#"+namer+"']").click(function() {
$("html, body").animate({ scrollTop: 0 }, 'slow');
return false});
}

var objBtn = "";
var scroll_when = 90000;
function setBtnSofter(scroll_when2, objBtn2)
{
	objBtn = objBtn2;
	scroll_when = scroll_when2;
}

$(window).scroll(function (event) {
   var scroll = $(window).scrollTop();
    if(scroll>scroll_when)
    {
      $("#"+objBtn).addClass("show");
      $("#"+objBtn).removeClass("hide");
      $("#"+objBtn).css("transform","translate(0px,0px)");
    }
   else
    {
     $("#"+objBtn).removeClass("show");
     $("#"+objBtn).addClass("hide");
     $("#"+objBtn).css("transform","translate(1000px,-10000px)");
    }
});