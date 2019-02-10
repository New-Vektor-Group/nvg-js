var nvg_sw = screen.width;     
var nvg_sh = screen.height; 

function scrollbotchat(nvgw)
{
	//Резкая прокрутка вниз
   $('#'+nvgw).scrollTop($('#'+nvgw)[0].scrollHeight);
}

function scrollTopSoft(namer)
{
	$("a[href='#"+namer+"']").click(function() {
  $("html, body").animate({ scrollTop: 0 }, 'slow');
  return false;
});
}

function setBtnSofter(scroll_when, objBtn)
{
	//scroll_when = 90 default

$(window).scroll(function (event) {
   var scroll = $(window).scrollTop();
    if(scroll>scroll_when)
    {
      $("#"+objBtn).addClass("show");
      $("#"+objBtn).removeClass("hide");
    }
   else
    {
      $("#"+objBtn).removeClass("show");
     $("#"+objBtn).addClass("hide");
    }
});

}