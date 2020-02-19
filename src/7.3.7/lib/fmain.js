if (typeof var_dump === "undefined") { 
	var var_dump = function (obj, alerti)
	{
		var out = '';
		for (var i in obj)
    {
			out += i + ": " + obj[i] + "\n";
		}
		if(alerti === true)
			alert(out);
		return out;
	};
}

nvgjs.isnoSelfHideCollapse = false;
nvgjs.btnCollapse = "noelementt"; 
nvgjs.attrcollapse = "noelementt";
nvgjs.framework = "bs";

nvgjs.get = function(parm)
{
  return new URL(window.location.href).searchParams.get(parm);
};

nvgjs.set = function(parm, value)
{
  var url = new URL(window.location.href);
  var search_params = new URLSearchParams(url.search);
  if(nvgjs.get(parm))
    search_params.set(parm, value);
  else
    search_params.append(parm, value);
  url.search = search_params.toString();

  try
  {
    window.history.pushState("NVG JS", "", url.toString());
  }
  catch(err){}
  return url.toString();
};

nvgjs.https = function()
{
  if(location.protocol != 'https:')
    location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
};

nvgjs.getVersion = function()
{
  return "7.3.7";
};

nvgjs.ScrollBot = function(nvgw)
{
   $(nvgw).scrollTop($(nvgw)[0].scrollHeight);
};

nvgjs.ScrollTop = function(nvgw)
{
   $(nvgw).scrollTop(0);
};

nvgjs.ScrollTopSoft = function()
{
  $("html, body").animate({ scrollTop: 0 }, 'slow');
};

nvgjs.ScrollBotSoft = function()
{
  $("html, body").animate({ scrollTop: screen.height }, 'slow');
};

nvgjs.ScrollSoft = function(coord)
{
  $("html, body").animate({ scrollTop: coord }, 'slow');
};

nvgjs.ScrollTo = function(a0101x304329, speed)
{
  if(speed === undefined)
    speed = 800;

  $('html, body').animate({ 
  scrollTop: $(a0101x304329).offset().top 
  }, speed);
};

nvgjs.isVisible = function(elem, oft, ofb, ofl, ofr)
{
  if(oft === undefined)
    oft = 0;
  if(ofb === undefined)
    ofb = 0;
  if(ofl === undefined)
    ofl = 0;
  if(ofr === undefined)
    ofr = 0;

  var ika = 0;
  var coords = $(elem)[ika].getBoundingClientRect();

  var windowHeight = document.documentElement.clientHeight;
  var windowWidth = document.documentElement.clientWidth;

  var topVisible = coords.top-oft > 0 && coords.top-oft < windowHeight;
  var bottomVisible = coords.bottom-ofb < windowHeight && coords.bottom-ofb > 0;

  var leftVisible = coords.left-ofl > 0 && coords.left-ofl < windowWidth;
  var rightVisible = coords.right-ofr < windowWidth && coords.right-ofr > 0;

  var a = topVisible || bottomVisible;
  var b = leftVisible || rightVisible;
  return a && b;
};

nvgjs.Collision = function(elem1,elem2,pos1,pos2,offsety,offsetx)
{
  if(pos1 === undefined)
    pos1 = 0;
  if(pos2 === undefined)
    pos2 = 0;
  if(offsety === undefined)
    offsety = 0;
  if(offsetx === undefined)
    offsetx = 0;

  /*default by absolute position => posN = 0 else 1*/
  var el1 = $(elem1);
  var el2 = $(elem2);

  var T1 = el1.offset().top-offsety;
  var T2 = el2.offset().top;
  if(pos1==1) T1 = el1.position().top-offsety;
  if(pos2==1) T2 = el2.position().top;

  var L1 = el1.offset().left-offsetx;
  var L2 = el2.offset().left;
  if(pos1==1) L1 = el1.position().left-offsetx;
  if(pos2==1) L2 = el2.position().left;

  var B1 = el1.offset().top + el1.outerHeight() + offsety;
  var B2 = el2.offset().top + el2.outerHeight();
  if(pos1==1) B1 = el1.position().top + el1.outerHeight() + offsety;
  if(pos2==1) B2 = el2.position().top + el2.outerHeight();

  var R1 = el1.offset().left + el1.outerWidth() + offsetx;
  var R2 = el2.offset().left + el2.outerWidth();
  if(pos1==1) R1 = el1.position().left + el1.outerWidth() + offsetx;
  if(pos2==1) R2 = el2.position().left + el2.outerWidth();

  if(T1 <= B2 && B1 >= T2 && L1 <= R2 && R1 >= L2)
    return true;
  else
    return false;

};

nvgjs.isMobile = function() { 
 if( navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i) )
  return true;
else
  return false;
};

nvgjs.isMScreen = function() {
   if(window.innerWidth <= 800 && window.innerHeight <= 600)
     return true;
   else
     return false;
};

nvgjs.clearSelection = function()
{
  if (window.getSelection) {
      if (window.getSelection().empty) { 
        window.getSelection().empty();
      } else if (window.getSelection().removeAllRanges) {
        window.getSelection().removeAllRanges();
      }
    } else if (document.selection) { 
      document.selection.empty();
    }
};

nvgjs.noSelfHideCollapse = function(btnCollapse1, framework)
{
  if(framework !== undefined)
    nvgjs.framework = framework;

  nvgjs.isnoSelfHideCollapse = true;

  if(btnCollapse1 !== undefined)
    nvgjs.btnCollapse = btnCollapse1;

  if(nvgjs.framework == "bs")
  {
    $(nvgjs.btnCollapse).on('click', function() 
    { 
    nvgjs.attrcollapse = $(this).attr("data-target"); 
    }); 
  }
  else if(nvgjs.framework == "uk")
  {
    $(nvgjs.btnCollapse).attr("uk-accordion","collapsible: false");
  }
};

function nvgjs(){}

/*Bootstrap*/
if(nvgjs.framework == "bs")
{
  $('.collapse').on('hide.bs.collapse',function(e)
  {
    if(nvgjs.isnoSelfHideCollapse)
    { 
      if($(this).attr("id")==nvgjs.attrcollapse.substr(1)) 
        e.preventDefault(); 
    }
  });
}

function nvg_sw()
{
  return screen.width;     
}

function nvg_sh()
{
  return screen.height; 
}

function nvg_ww()
{
  return window.innerWidth;     
}

function nvg_wh()
{
  return window.innerHeight; 
}

function nvg_scroll()
{
  return document.documentElement.scrollTop || document.body.scrollTop;     
}

function nvg_scroll_pr()
{
  return Math.ceil(100*(nvg_scroll()/($(document).height()-nvg_wh())));
}

function nvgcopy(btn, text, isInput, funcSucc)
{
  if(text === undefined || text === 0)
    text = btn;
  if(isInput === undefined || isInput === 0)
    isInput = false;

  var copyTextareaBtn = $(btn);

  copyTextareaBtn.click(function()
  {
    var copyTextarea = $(text);
    if(text==btn)
      copyTextarea = $(this);
    if(isInput)
    {
      try
      {
        copyTextarea.select();
      }
      catch(err){
        console.log("error copy " + err);
      }
      try
      {
        copyTextarea.setSelectionRange(0, 99999);
      }
      catch(err){}
      document.execCommand("copy");
      nvgjs.clearSelection();
      if(funcSucc !== undefined)
        funcSucc();
      return true;
    }

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
    document.execCommand('copy');
    nvgjs.clearSelection();
    if(funcSucc !== undefined)
      funcSucc();
    return true;
  } catch (err) {
    console.log('Oops, unable to copy');
    return false;
  }
  });
}

window.nvgMob = function() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

window.nvgPC = function() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return !check;
};