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
////////////////////////

<li class="my-4"><h5>Sroll button in bottom right</h5>
							<p class="nvgc py-3 px-3">setBtnSofter(<code>offset</code>, <code>btn_id</code>);</p>
							<div>Set button, which should be to show or to hide in relative to current scroll position.</div>
							<div>For example, (HTML) <br><code>&lt;button id="scrbtn" class="btn"&gt;Scroll&lt;button/&gt;</code>
							<br>.(JS).<br><var>setBtnSofter(<code>40, scrbtn</code>);</var></div>
						</li>