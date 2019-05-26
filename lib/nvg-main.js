class nvgjs
{
  static getVersion()
  {
    return "7.1.2";
  }

////////////////////////
static scrollbot(nvgw)
{
  //Резкая прокрутка вниз
   $(nvgw).scrollTop($(nvgw)[0].scrollHeight);
}

static scrolltop(nvgw)
{
  //Резкая прокрутка вниз
   $(nvgw).scrollTop(0);
}
////////////////////////

static ScrollTopSoft()
{
$("html, body").animate({ scrollTop: 0 }, 'slow');
}

static ScrollBotSoft()
{
$("html, body").animate({ scrollTop: screen.height }, 'slow');
}

static ScrollSoft(ccoord)
{
$("html, body").animate({ scrollTop: ccoord }, 'slow');
}
////////////////////////

static go_ssl()
{
  if(location.protocol != 'https:')
  {
    location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
  }
}

////////////////////////

static isVisible(elem)
{
  var coords = elem.getBoundingClientRect();
  var windowHeight = document.documentElement.clientHeight;
  var topVisible = coords.top > 0 && coords.top < windowHeight;
  var bottomVisible = coords.bottom < windowHeight && coords.bottom > 0;
  return topVisible || bottomVisible;
}

////////////////////////

}

////////////////
function nvg_scroll()
{
  return document.documentElement.scrollTop;     
}

function nvg_sw()
{
  return screen.width;     
}

function nvg_sh()
{
  return screen.height; 
}

function nvg_swa()
{
  return window.innerWidth;     
}

function nvg_sha()
{
  return window.innerHeight; 
}
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