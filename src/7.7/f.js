nvg_cook.getCookie = function(name){
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

nvg_cook.setCookie = function(name, value, options){
  options = options || {};

  var expires = options.expires;

  if (typeof expires == "number" && expires)
  {
    var d = new Date();
    d.setTime(d.getTime() + expires * 1000);
    expires = options.expires = d;
  }

  if (expires && expires.toUTCString)
    options.expires = expires.toUTCString();

  value = encodeURIComponent(value);

  var updatedCookie = name + "=" + value;

  for (var propName in options)
  {
    updatedCookie += "; " + propName;
    var propValue = options[propName];
    if (propValue !== true)
      updatedCookie += "=" + propValue;
  }

  document.cookie = updatedCookie;
};

nvg_cook.deleteCookie = function(name)
{
  nvg_cook.setCookie(name, "", {
    expires: -1
  });
};

function nvg_cook(inputId, expire){
  this.delMe = function(){
    localStorage.removeItem(this.inputId.slice(1));
  };

  this.clear = function(){
    this.delMe();
    $(this.inputId).val('');
  };

  if(expire === undefined)
    this.expire = 86400;
  else
    this.expire = expire;

  this.inputId = inputId;

  $(this.inputId).bind('input', function()
  {
    localStorage.setItem(this.id, $(this).val());
    nvg_cook.setCookie("ede56579ee9d437820a0f9"+this.id,1,{expires: this.expire});
  });

  if(nvg_cook.getCookie("ede56579ee9d437820a0f9"+this.inputId.slice(1))==1)
    $(this.inputId).val(localStorage.getItem(this.inputId.slice(1)));
}

nvgtext.nl2br = function(str, is_xhtml)
{
  if (typeof str === 'undefined' || str === null)
      return '';
  var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
  return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
};

nvgtext.nocopy = function(element)
{
  $(element).css("-webkit-user-select","none");
  $(element).css("-khtml-user-select","none");
  $(element).css("-moz-user-select","none");
  $(element).css("-ms-user-select","none");
  $(element).css("-o-user-select","none");
  $(element).css("user-select","none");
  
  $(element).bind('cut copy paste', function(e) {
    e.preventDefault();
  });
};

nvgtext.boldFunc=function(str, p1, offset, s){
  return '<strong>'+(p1)+'</strong>'
};

nvgtext.italicFunc=function(str, p1, offset, s){
  return '<em>'+(p1)+'</em>'
};

nvgtext.underlinedFunc=function(str, p1, offset, s){
  return '<ins>'+(p1)+'</ins>'
};

nvgtext.ahrefFunc=function(str,b,c,d){
  return '<a href="'+b+'" target="_blank" class="text-primary">'+(c)+'</a>'
};

nvgtext.imghrefFunc=function(str,b,c,d){
  return '<img src="'+b+'" class="img-fluid" style="max-height:500px;">'
};

nvgtext.hightFunc=function(str, p1, offset, s){
  return '<span class="bg-primary">'+(p1)+'</span>'
};

pasBB = function(wh,wha)
{
    $textarea=$(wh).parent().next().children("textarea");
    start = $textarea[0].selectionStart;
    finish = $textarea[0].selectionEnd;
    sel = $textarea.get(0).value.substring(start, finish);
    v = $textarea.val();
    textBefore = v.substring(0,  start);
    textAfter  = v.substring(finish, v.length);
    $textarea.val(textBefore+textAfter);
    if(sel=="")
        sel="text";
    a=" [b]"+sel+"[/b] ";
    if(wha==1)
        a=" [i]"+sel+"[/i] ";
    else if(wha==2)
        a=" [u]"+sel+"[/u] ";
    else if(wha==3)
        a=" [url="+sel+"]"+sel+"[/url] ";
    else if(wha==4)
        a=" [h]"+sel+"[/h] ";
    else if(wha==5)
        a=" [img="+sel+"]";

    v = $textarea.val();
    textBefore = v.substring(0,  start);
    textAfter  = v.substring(start, v.length);
    $textarea.val(textBefore + a + textAfter);

    $str=BBconvert("#"+$textarea.attr("id"));
    $textarea.parent().next().next().children(".output-test").html($str);
};

BBconvert = function(t)
{
    $str=nvgtext.nl2br($(t).val());
    $format_search =  [
        /\[b\](.*?)\[\/b\]/ig,
        /\[i\](.*?)\[\/i\]/ig,
        /\[u\](.*?)\[\/u\]/ig,
        /\[h\](.*?)\[\/h\]/ig,
        /\[url=(.*)\](.*)\[\/url\]/ig,
        /\[img=(.*)\]/ig
    ];
    $format_replace = [
        boldFunc,
        italicFunc,
        underlinedFunc,
        hightFunc,
        ahrefFunc,
        imghrefFunc
    ];
    for (var i =0;i<$format_search.length;i++) {
      $str = $str.replace($format_search[i], $format_replace[i]);
    }
    return $str;
};

$(".ianswer").on("input",function(){
    $str=BBconvert(this);
    $(this).parent().next().next().children(".output-test").html($str);
});

function nvgtext(){}


function nvg_snow(zindex)
{
    try
    {
        this.movesnow = function()
        {
            if(this.actions)
            {
                for (var i = 0; i <= this.snowmax; i++)
                {
                    this.crds[i] += this.x_mv[i];
                    this.snow[i].posy+= this.snow[i].sink;
                    this.snow[i].style.left = this.snow[i].posx+this.lftrght[i]*Math.sin(this.crds[i])+'px';
                    this.snow[i].style.top= this.snow[i].posy+'px';

                    if (this.snow[i].posy>= this.marginbottom-2*this.snow[i].size || parseInt(this.snow[i].style.left)>(this.marginright-3*this.lftrght[i]))
                    {
                        if (this.snowingzone==1) {this.snow[i].posx=this.randommaker(this.marginright-this.snow[i].size);}
                        if (this.snowingzone==2) {this.snow[i].posx=this.randommaker(this.marginright/2-this.snow[i].size);}
                        if (this.snowingzone==3) {this.snow[i].posx=this.randommaker(this.marginright/2-this.snow[i].size)+this.marginright/4;}
                        if (this.snowingzone==4) {this.snow[i].posx=this.randommaker(this.marginright/2-this.snow[i].size)+this.marginright/2;}
                        this.snow[i].posy=0;
                    }
                }
                var this2 = this;
                setTimeout(function() {this2.movesnow();},this2.speed);
            }
        };

        this.draw = function()
        {        
            for (var i=0;i<=this.snowmax;i++)
            {
                document.body.innerHTML += ("<span id='snowflake"+i+"' style='z-index:"+this.zindex+";position:fixed;top:-"+this.snowmaxsize+"'>"+this.snowletter+"</span>");
            }
        };

        this.clear = function()
        {
            for (var i=0;i<=this.snowmax;i++)
            {
                document.getElementById("snowflake"+i).remove();
            }
        };

        this.init = function()
        {
            if (this.browserok)
            {
                this.actions = true;
                var this2 = this;
                setTimeout(function(){this2.initsnow();},500);
            }
        };

        this.stop = function()
        {
            this.actions=false;
        };

        this.delete = function()
        {
           this.stop();
           this.hide();
        };

        this.update = function()
        {
            this.delete();
            this.draw();
            this.init();
        };   

        this.randommaker = function(range)
        {
            this.rand=Math.floor(range*Math.random());
            return this.rand;
        };

        this.initsnow = function()
        {
            if (this.ie5 || this.opera) 
                this.marginright = document.body.clientWidth-15;
            else if (this.ns6)
                this.marginright = window.innerWidth-15;
            else
                this.marginright = window.innerWidth-15;

            this.marginbottom = window.innerHeight+100;

            this.snowsizerange=this.snowmaxsize-this.snowminsize;

            for (var i = 0; i <= this.snowmax; i++)
            {
                this.crds[i] = 0;
                this.lftrght[i] = Math.random()*25;
                this.x_mv[i] = 0.03 + Math.random()/10;
                this.snow[i]=document.getElementById("snowflake"+i);
                this.snow[i].style.fontFamily=this.snowtype[this.randommaker(this.snowtype.length)];
                this.snow[i].size=this.randommaker(this.snowsizerange)+this.snowminsize;
                this.snow[i].style.fontSize=this.snow[i].size+'px';
                this.snow[i].style.color=this.snowcolor[this.randommaker(this.snowcolor.length)];
                this.snow[i].style.zIndex=1000;
                this.snow[i].sink=this.sinkspeed*this.snow[i].size/5;
                if (this.snowingzone==1) {this.snow[i].posx=this.randommaker(this.marginright-this.snow[i].size);}
                if (this.snowingzone==2) {this.snow[i].posx=this.randommaker(this.marginright/2-this.snow[i].size);}
                if (this.snowingzone==3) {this.snow[i].posx=this.randommaker(this.marginright/2-this.snow[i].size)+this.marginright/4;}
                if (this.snowingzone==4) {this.snow[i].posx=this.randommaker(this.marginright/2-this.snow[i].size)+this.marginright/2;}
                this.snow[i].posy=this.randommaker(2*this.marginbottom-this.marginbottom-2*this.snow[i].size);
                this.snow[i].style.left=this.snow[i].posx+'px';
                this.snow[i].style.top=this.snow[i].posy+'px';
            }
            this.movesnow();
        };

        if(zindex === undefined)
            zindex = 1000;

        this.speed = 50;
        this.snowmax=30;
        this.snowcolor=new Array("#b9dff5","#7fc7ff","#7fb1ff","#7fc7ff","#b9dff5");
        this.snowtype=new Array("Times");
        this.snowletter="*";
        this.sinkspeed=0.6;
        this.snowmaxsize=50;
        this.snowminsize=25;
        this.zindex=zindex;
        /* 1 for all */
        /* 2 for left */
        /* 3 for center */
        /* 4 for right */
        this.snowingzone=1;

        /* Do not edit below this line */
        this.actions = true;
        this.snow=[];
        this.marginbottom=0;
        this.marginright=0;
        this.i_snow=0;
        this.x_mv=[];
        this.crds=[];
        this.lftrght=[];
        this.browserinfos=navigator.userAgent;
        this.ie5=document.all&&document.getElementById&&!this.browserinfos.match(/Opera/);
        this.ns6=document.getElementById&&!document.all;
        this.opera=this.browserinfos.match(/Opera/);
        this.browserok=this.ie5||this.ns6||this.opera;

        this.draw();
        this.init();
    }
    catch(e)
    {
        console.log("Error with snow!");
    }
}

nvgR.I = function(min, max, f) 
{
  if(f === undefined)
    f = false;

  /* min [] и max ()*/
  if(f)
    return Math.floor(Math.random() * (max - min) + min);
  else
    return Math.random() * (max - min) + min;
};

nvgR.C = function(caps, lang)
{
  if(caps === undefined)
    caps = true;
  if(lang === undefined)
    lang = 'en';

  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
  if(lang=='ru'){
    chars = "ЙФЯЦЫЧУВСКАМЕПИНРТГОЬШЛБЩДЮЗЖХЭЪйфяцычувскамепинртгоьшлбщдюзжхэъ";
    if(!caps)
      chars = chars.slice(32);
  }
  else{
    if(!caps)
      chars = chars.slice(26);
  }
  
  var rnum = Math.floor(Math.random() * chars.length);
  var randomstring = chars.substring(rnum,rnum+1);
  return randomstring;
};

nvgR.D = function(zero)
{
  if(zero === undefined)
    zero = true;

  if(zero)
    return nvgR.I(0,10,1);
  else
    return nvgR.I(1,10,1);
};

nvgR.N = function(d)
{
  if(d === undefined)
    d = 1;
  return nvgR.I(Math.pow(10,d-1),Math.pow(10,d-1)*10,1);
};

function nvgR(){}

nvgM.sigm = function(x) 
{
  return 1/(1+Math.pow(Math.E, -x));
};
function nvgM(){}

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

nvgjs.css = function(el, styles){
  var els = document.querySelectorAll(el);

  els.forEach(function(el, ind){
    for(var s in styles){
      el.style[s] = styles[s];
    }
  });
};

nvgjs.nodrag = function(elID){
  document.getElementById(elID).ondragstart = function() { return false; };
};

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

nvgjs.ajax = function(method, url, success,error)
{
	var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
           if (xmlhttp.status == 200) 
           	success();
           else 
           	error();
        }
    };

    xmlhttp.open(method, url, true);
    xmlhttp.send();
};

nvgjs.https = function()
{
  if(location.protocol != 'https:')
    location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
};

nvgjs.getVersion = function()
{
  return "7.6.9";
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
  $("html, body").animate({ scrollTop: window.innerHeight+window.outerHeight }, 'slow');
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

nvgjs.inDisplay = function(elem, oft, ofb, ofl, ofr)
{
  if(oft === undefined)
    oft = 0;
  if(ofb === undefined)
    ofb = 0;
  if(ofl === undefined)
    ofl = 0;
  if(ofr === undefined)
    ofr = 0;

  var coords = $(elem)[0].getBoundingClientRect();

  var windowHeight = document.documentElement.clientHeight;
  var windowWidth = document.documentElement.clientWidth;

  var topVisible = coords.top-oft > 0 && coords.top-oft < windowHeight;
  var bottomVisible = coords.bottom-ofb < windowHeight && coords.bottom-ofb > 0;

  var leftVisible = coords.left-ofl > 0 && coords.left-ofl < windowWidth;
  var rightVisible = coords.right-ofr < windowWidth && coords.right-ofr > 0;

  var a = topVisible && bottomVisible;
  var b = leftVisible && rightVisible;
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

nvgi.block_f = false;
nvgi.needToS = false;
nvgi.paste = false;
nvgi.ToS = "";

nvgi.getImg = function(pastee, callback){
  if(pastee.clipboardData == false)
  {
    if(typeof(callback) == "function")
        callback(undefined);
  }

  var files = pastee.clipboardData.items;

  if(files == undefined)
  {
    if(typeof(callback) == "function")
      callback(undefined);
  }

  for (var i = 0; i < files.length; i++)
  {
    if (files[i].type.indexOf("image") == -1) 
      continue;
    var blob = files[i].getAsFile();

    if(typeof(callback) == "function")
      callback(blob);
  }
};

nvgi.preLoad = function(elems, srcname, isCss){
  if(srcname===undefined || srcname === 0)
    srcname = "data-src";
  if(isCss===undefined)
    isCss = 0;

  var allClassElements = document.getElementsByClassName(elems);
  var allImages = [];
  var allImagesOld = [];
  var xCounter = [];

  for (var i = 0; i < allClassElements.length; i++)
  {
    var img = new Image();
    var x = allClassElements[i];
    var imageSrc = $(x).attr(srcname);
    img.src = imageSrc;
    allImages.push(img);
    allImagesOld.push(x);
    xCounter.push(i);
  }

  xCounter.forEach(function(ee){
    allImages[ee].onload = function()
    {
      if(isCss==0)
        $(allImagesOld[ee]).attr("src",allImages[ee].src);
      else
      {
        /*$(allImagesOld[ee]).css({"background-image":"url('"+allImages[ee].src+"')"});*/
        if($(allImagesOld[ee]).attr("style") == undefined)
          $(allImagesOld[ee]).attr("style","background-image: url('"+allImages[ee].src+"') !important");
        else
          $(allImagesOld[ee]).attr("style",$(allImagesOld[ee]).attr("style")+" background-image: url('"+allImages[ee].src+"') !important");
      }
    };
  });
};

nvgi.preLoadId = function(elem, srcname, isCss){
  if(srcname===undefined || srcname === 0)
      srcname = "data-src";
  if(isCss===undefined)
      isCss = 0;

  var img = new Image();
  var x = document.getElementById(elem);
  var imageSrc = $(x).attr(srcname);
  img.src = imageSrc;

  img.onload = function()
  {
    if(isCss==0)
      $(x).attr("src",img.src);
    else
    {
      /*$(x).css({"background-image":"url('"+allImages[ee].src+"')"});*/
      if($(x).attr("style") == undefined)
        $(x).attr("style","background-image: url('"+img.src+"') !important");
      else
        $(x).attr("style",$(x).attr("style")+" background-image: url('"+img.src+"') !important");
    } 
  };
};

function nvgi(){}

nvg_modal.framework = "bs";
function nvg_modal(mode, trigger, img, width_new)
{
  nvg_modal.prototype.create_window = function(mode, maxsizer, tg, img)
  {
    var parts = [];
    if(mode=="img2")
    {
      if(nvg_modal.framework == "bs")
      {
        parts.push('<div class="modal fade" id="'+tg.substring(1)+'_2" tabindex="-1" role="dialog" aria-hidden="true">');
        parts.push('<div class="modal-dialog" style="max-width: '+ maxsizer + 'px" role="document"><div style="background: none;" class="modal-content"><div style="border: none; background-color: snow; background-color: rgba(230,230,230,0.8);" class="modal-header">');
        parts.push('<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>');
        parts.push('<div class="modal-body"><img style="position: relative; width: 100%;" src="'+img+'"></div>');
        parts.push('</div></div></div>');
      }
    }
    else
    {
      if(nvg_modal.framework == "bs")
      {
        parts.push('<div class="modal fade" id="'+tg.substring(1)+'_2" tabindex="-1" role="dialog" aria-hidden="true">');
        parts.push('<div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header">');
        parts.push('<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>');
        parts.push('<div class="modal-body"><img style="position: relative; width: 100%;" src="'+img+'"></div>');
        parts.push('</div></div></div>');
      }
    }
    return parts.join("");
  };

  if(width_new === undefined)
    width_new = 500;

  this.tg = trigger;
  this.img = img;

  if(mode == "img" || mode == "" || mode == "img2")
  {
    if(nvg_modal.framework == "bs")
    {
      $(this.tg).css("cursor","pointer");
      $(this.tg).attr("onclick","$('"+this.tg+"_2').modal('show');");      
      $("body").append(nvg_modal.prototype.create_window(mode,width_new,this.tg, this.img));
    }
  }
}

window.addEventListener("paste", function(e){
    if(nvgi.paste)
    {
      nvgi.getImg(e, function(iblob){
        if(iblob)
          {           
            var img = new Image();
            img.onload = function(){
            if(nvgi.needToS && nvgi.Tos != "")
              $(nvgi.ToS).html(img);
            };

            nvgi.block_f = iblob;

            var URLObj = window.URL || window.webkitURL;
            img.src = URLObj.createObjectURL(iblob);
        }
    });
    }
}, false);

nvgs.countEls = [];
nvgs.enabled = true;

nvgs.setFix = function(el, wh, ofx, ofy, zindex){
  if(ofx == undefined)
    ofx = 0;
  if(ofy == undefined)
    ofy = ofx;
  if(zindex == undefined)
    zindex = 1001;

  nvgjs.css(el,{
    position:"fixed",
    zIndex:zindex
  });

  if(wh[0]=="t")
    nvgjs.css(el,{
      top: ofy+"px"
    });
  else if(wh[0]=="b")
    nvgjs.css(el,{
        bottom: ofy+"px"
    });

  if(wh[1]=="l")
    nvgjs.css(el,{
        left: ofx+"px"
    });
  else if(wh[1]=="r")
    nvgjs.css(el,{
        right: ofx+"px"
    });
  else if(wh[1]=="c")
    nvgjs.css(el,{
        left: (50+ofx)+"%"
    });
};

nvgs.sh5df543 = function(objj, animate)
  {
    $(objj).css("display",'inherit');
    if(animate)
    {
      $(objj).stop();
      $(objj).animate({
        opacity: 1
      },100);
    }
    /*setTimeout(function(){},200);*/
  };

nvgs.hds5df543 = function(objj, animate)
  {
    if(animate)
    {
      $(objj).stop();
      $(objj).animate({
        opacity: 0
      },100);
      setTimeout(function(){$(objj).css("display",'none');},155);
    }
    else
      $(objj).css("display",'none');
  };

  nvgs.elsoft = function(element)
  {
    var scroll = $(window).scrollTop();

    if(element.direction)
    {
      if(scroll >= element.scroll_when)
      {
        if(element.needshf) {
          element.needshf = false;
          nvgs.sh5df543(element.obj, element.animate);
        }
      }
      else
      {
        
        if(!element.needshf) {
          element.needshf = true;
          nvgs.hds5df543(element.obj, element.animate);
        }
      }
    }
    else if(!element.direction)
    {
      if(scroll<=element.scroll_when)
      {
        if(element.needshf) {
          element.needshf = false;
          nvgs.sh5df543(element.obj, element.animate);
        }
      }
      else
      {
        if(!element.needshf) {
          element.needshf = true;
          nvgs.hds5df543(element.obj, element.animate);
        }
      }
    }
    else
    {
      if(scroll >= element.scroll_when && scroll <= element.scroll_when2)
      {
        if(element.needshf) {
          element.needshf = false;
          nvgs.sh5df543(element.obj, element.animate);
        }
      }
      else
      {
        if(!element.needshf) {
          element.needshf = true;
          nvgs.hds5df543(element.obj, element.animate);
        }
      }
    }
  };

/*Jquery*/
function nvgs(obj2, scroll_when2, direction2, animate, scroll_when2_2)
{
  if(obj2 == "")
    this.obj = "";
  else 
    this.obj = obj2;

  if(scroll_when2 !== "" && scroll_when2 !== undefined) 
    this.scroll_when = scroll_when2;
  else
    this.scroll_when = 90;

  if(scroll_when2_2 !== "" && scroll_when2_2 !== undefined) 
    this.scroll_when2 = scroll_when2_2;

  if(direction2 !== "" && direction2 !== undefined) 
    this.direction = direction2;
  else 
    this.direction = true;

  if(animate !== "" && animate !== undefined) 
    this.animate = animate;
  else 
    this.animate = true;

  this.needshf = false;
  nvgs.elsoft(this);
  nvgs.countEls.push(this);
}

var isScrolling52234;
$(window).scroll(function ()
{ 
  window.clearTimeout(isScrolling52234);
  isScrolling52234 = setTimeout(function() {
    if(nvgs.enabled === true)
    {
      nvgs.countEls.forEach(function(element)
      {
        nvgs.elsoft(element);
      });
    }
  }, 1000);

  if(nvgs.enabled === true)
  {
    nvgs.countEls.forEach(function(element)
    {
      nvgs.elsoft(element);
    });
  }
});


const getSort = ({ target }) => {
        const order = (target.dataset.order = -(target.dataset.order || -1));
        const index = [...target.parentNode.cells].indexOf(target);
        const collator = new Intl.Collator(['en', 'ru'], { numeric: true });
        const comparator = (index, order) => (a, b) => order * collator.compare(
            a.children[index].innerHTML,
            b.children[index].innerHTML
        );
        
        for(const tBody of target.closest('table').tBodies)
            tBody.append(...[...tBody.rows].sort(comparator(index, order)));

        for(const cell of target.parentNode.cells)
            cell.classList.toggle('sorted', cell === target);
    };
    
    document.querySelectorAll('.table_sort thead').forEach(tableTH => tableTH.addEventListener('click', () => getSort(event)));
    $("th[ss]").click();

    var sd=$(".table_sort td:last-child");
    var i = 0;
    sd.each(function (e,ee) {
      i++;
      $(ee).text(i);
    })