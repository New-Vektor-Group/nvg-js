function nvg_sw()
{
  return screen.width;     
}

function nvg_sh()
{
  return screen.height; 
}
////////////////////////

function scrollbotchat(nvgw)
{
	//Резкая прокрутка вниз
   $('#'+nvgw).scrollTop($('#'+nvgw)[0].scrollHeight);
}
////////////////////////

var namer = "";
function scrollTopSoft(namer2)
{
	namer = namer2;
	$("a[href='#"+namer+"']").click(function() {
$("html, body").animate({ scrollTop: 0 }, 'slow');
return false});
}
////////////////////////

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

function nvgcopy(btn, text)
{
  var copyTextareaBtn = $("#"+btn);

  copyTextareaBtn.click(function()
  {
    var copyTextarea = $("#"+text);
    var sel, range;
  var el = copyTextarea.focus()[0];
  if (window.getSelection && document.createRange) {
    sel = window.getSelection();
    if(sel.toString() == ''){
      range = document.createRange(); 
      range.selectNodeContents(el); 
      sel.removeAllRanges();
      sel.addRange(range);
    }
  }else if (document.selection) { 
    sel = document.selection.createRange();
    if(sel.text == ''){
      range = document.body.createTextRange();
      range.moveToElementText(el);
      range.select(); 
    }
  }
    try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Copying text command was ' + msg);
  } catch (err) {
    console.log('Oops, unable to copy');
  }
  });
}

////////////////////////

function setSmoothBTN(id)
{
  $("a[href='#"+id+"']").click(function() {
  $("html, body").animate({ scrollTop: $("#"+id).offset().top-100 }, 'slow');
  return false;
});
}