function nvgRand(min, max) 
    {
      // Возвращает случайное число между min (включительно) и max (не включая max)
      return Math.random() * (max - min) + min;
    }

class nvgm
{
  static sigm(x) 
    {
      return 1/(1+Math.pow(Math.E, -x));
    }
}

class nvgjs
{
  static getVersion()
  {
    return "7.1.0";
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

class nvgtext
{
  static nl2br (str, is_xhtml) {
    if (typeof str === 'undefined' || str === null) {
        return '';
    }
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
  }

  static nocopy(element)
  {
    $(element).css("-webkit-user-select","none");
    $(element).css("-khtml-user-select","none");
    $(element).css("-moz-user-select","none");
    $(element).css("-ms-user-select","none");
    $(element).css("-o-user-select","none");
    $(element).css("user-select","none");
  }
}

class nvg_snow
{
    constructor()
    {
        this.speed = 50;
        this.snowmax=30;
        this.snowcolor=new Array("#b9dff5","#7fc7ff","#7fb1ff","#7fc7ff","#b9dff5");
        this.snowtype=new Array("Times");
        this.snowletter="*";
        this.sinkspeed=0.6;
        this.snowmaxsize=50;
        this.snowminsize=25;
        // 1 for all
        // 2 for left
        // 3 for center
        // 4 for right
        this.snowingzone=1;

        // Do not edit below this line
        this.actions = true;
        this.snow=new Array();
        this.marginbottom;
        this.marginright;
        this.i_snow=0;
        this.x_mv=new Array();
        this.crds=new Array();
        this.lftrght=new Array();
        this.browserinfos=navigator.userAgent;
        this.ie5=document.all&&document.getElementById&&!this.browserinfos.match(/Opera/);
        this.ns6=document.getElementById&&!document.all;
        this.opera=this.browserinfos.match(/Opera/);
        this.browserok=this.ie5||this.ns6||this.opera;

        this.draw();
        this.init();
    }

    movesnow()
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
                        if (this.snowingzone==1) {this.snow[i].posx=this.randommaker(this.marginright-this.snow[i].size)};
                        if (this.snowingzone==2) {this.snow[i].posx=this.randommaker(this.marginright/2-this.snow[i].size)};
                        if (this.snowingzone==3) {this.snow[i].posx=this.randommaker(this.marginright/2-this.snow[i].size)+this.marginright/4};
                        if (this.snowingzone==4) {this.snow[i].posx=this.randommaker(this.marginright/2-this.snow[i].size)+this.marginright/2};
                        this.snow[i].posy=0;
                }
        }
        var this2 = this;
        setTimeout(function() {this2.movesnow();},this2.speed);
        }
    }

    draw()
    {        
        for (var i=0;i<=this.snowmax;i++)
        {
            document.body.innerHTML += ("<span id='snowflake"+i+"' style='position:absolute;top:-"+this.snowmaxsize+"'>"+this.snowletter+"</span>");
        }
    }

    redraw()
    {        
        this.hide();
        this.draw();
    }

    update()
    {
        this.redraw();
        this.init();
    }

    init()
    {
        if (this.browserok)
        {
        this.actions=true;
        window.onload=this.initsnow();
        }

    }

    stop()
    {
        this.actions=false;
    }

    hide()
    {
       for (var i=0;i<=this.snowmax;i++)
        {
            document.getElementById("snowflake"+i).remove();
        }
    }

    delete()
    {
       this.stop();
       this.hide();
    }

    randommaker(range)
    {
        this.rand=Math.floor(range*Math.random());
        return this.rand
    }

    initsnow()
    {
        if (this.ie5 || this.opera) 
        {
                this.marginbottom = document.body.scrollHeight;
                this.marginright = document.body.clientWidth-15;
        }
        else if (this.ns6) {
                this.marginbottom = document.body.scrollHeight;
                this.marginright = window.innerWidth-15;
        }

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
                if (this.snowingzone==1) {this.snow[i].posx=this.randommaker(this.marginright-this.snow[i].size)};
                if (this.snowingzone==2) {this.snow[i].posx=this.randommaker(this.marginright/2-this.snow[i].size)};
                if (this.snowingzone==3) {this.snow[i].posx=this.randommaker(this.marginright/2-this.snow[i].size)+this.marginright/4};
                if (this.snowingzone==4) {this.snow[i].posx=this.randommaker(this.marginright/2-this.snow[i].size)+this.marginright/2};
                this.snow[i].posy=this.randommaker(2*this.marginbottom-this.marginbottom-2*this.snow[i].size);
                this.snow[i].style.left=this.snow[i].posx+'px';
                this.snow[i].style.top=this.snow[i].posy+'px';
        }
        this.movesnow();
    }
}

class nvgs
{
  static countEls = [];
  static enabled = true;


  constructor(obj2, scroll_when2, direction2, scroll_when2_2 = undefined)
  {
    if(scroll_when2 !== "") 
      this.scroll_when = scroll_when2;
    else
      this.scroll_when = 90;

    if(scroll_when2_2 !== undefined) 
      this.scroll_when2 = scroll_when2_2;

    if(direction2 !== "") 
      this.direction = direction2;
    else 
      this.direction = 1;

    if(obj2 == "")
    {
      this.obj = "";
    }
    else 
      this.obj = obj2;

    if(this.direction !== 0)
    {
      setTimeout(function(){$(this.obj).css("transform","translate(1000px,-10000px)");},1);
      setTimeout(function(){$(this.obj).removeClass("show");$(this.obj).addClass("hide");},1);
    }

    $(this.obj).addClass("fade");

    this.needshf = false;

    nvgs.countEls.push(this);
  }

static elsoft(element)
{
  var scroll = $(window).scrollTop();

        if(element.direction===1)
    {
      if(scroll>=element.scroll_when)
    {
      this.needshf = false;
      nvgs.sh5df543(element.obj);
    }
   else
    {
     this.needshf = true;
     nvgs.hds5df543(element.obj, this.needshf);

    }
    }

        else if(element.direction===0)
    {

      if(scroll<=element.scroll_when)
    {
      this.needshf = false;
      nvgs.sh5df543(element.obj);
    }
   else
    {
      this.needshf = true;
      nvgs.hds5df543(element.obj, this.needshf);
    }
    }

        else
    {

      if(scroll >= element.scroll_when && scroll <= element.scroll_when2)
    {
      this.needshf = false;
      nvgs.sh5df543(element.obj);
    }
    else
    {
      this.needshf = true;
      nvgs.hds5df543(element.obj, this.needshf);
    }
    }
}

static sh5df543(objj)
{
  $(objj).addClass("show");
  $(objj).removeClass("hide");
  setTimeout(function(){$(objj).css("transform","translate(0px,0px)");},0);
}

static hds5df543(objj, needshf)
{
 $(objj).removeClass("show");
 $(objj).addClass("hide");
 setTimeout(function(){if(needshf) $(objj).css("transform","translate(1000px,-10000px)");},100);
}

static setFix(el,wh, ofx, ofy)
{
  if(wh=="tl")
  {
    $(el).css("position","fixed");
    $(el).css("top",ofy+"px");
    $(el).css("left",ofx+"px");
    $(el).css("z-index","1001");
  }
  if(wh=="tr")
  {
    $(el).css("position","fixed");
    $(el).css("top",ofy+"px");
    $(el).css("right",ofx+"px");
    $(el).css("z-index","1001");
  }
  if(wh=="bl")
  {
    $(el).css("position","fixed");
    $(el).css("bottom",ofy+"px");
    $(el).css("left",ofx+"px");
    $(el).css("z-index","1001");
  }
  if(wh=="br")
  {
    $(el).css("position","fixed");
    $(el).css("bottom",ofy+"px");
    $(el).css("right",ofx+"px");
    $(el).css("z-index","1001");
  }
}

}

$(window).scroll(function ()
{
if(nvgs.enabled)
{
    nvgs.countEls.forEach(function(element)
  {
  nvgs.elsoft(element);
});
}

});

class nvg_cook
{
  static getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

static setCookie(name, value, options) {
  options = options || {};

  var expires = options.expires;

  if (typeof expires == "number" && expires) {
    var d = new Date();
    d.setTime(d.getTime() + expires * 1000);
    expires = options.expires = d;
  }
  if (expires && expires.toUTCString) {
    options.expires = expires.toUTCString();
  }

  value = encodeURIComponent(value);

  var updatedCookie = name + "=" + value;

  for (var propName in options) {
    updatedCookie += "; " + propName;
    var propValue = options[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }

  document.cookie = updatedCookie;
}

static deleteCookie(name) {
  nvg_cook.setCookie(name, "", {
    expires: -1
  })
}
}

class nvgi
{
  static block_f;
  static needToS = false;
  static paste = false;
  static ToS = "";

  static getImg(pastee, callback)
  {
    if(pastee.clipboardData == false)
    {
          if(typeof(callback) == "function")
          {
              callback(undefined);
          }
      };

      var files = pastee.clipboardData.items;

      if(files == undefined)
      {
          if(typeof(callback) == "function")
          {
              callback(undefined);
          }
      };

      for (var i = 0; i < files.length; i++)
      {
          if (files[i].type.indexOf("image") == -1) 
            continue;
          var blob = files[i].getAsFile();

          if(typeof(callback) == "function")
          {
            callback(blob);
          }
      }
  }

}

class nvg_modal
{
  constructor(mode, trigger, img, width_new = 500)
  {
    if(mode == "img" || mode == "" || mode == "img2")
    {
    this.tg = trigger;
    this.img = img;

    $(this.tg).css("cursor","pointer");
    $(this.tg).attr("onclick","$('"+this.tg+"_2').modal('show');");
    
    $("body").append(this.create_window(mode,width_new));
    }
  }

  create_window(mode, maxsizer)
  {
    if(mode=="img2")
        {
            var part1 = '<div class="modal fade" id="'+this.tg.substring(1)+'_2" tabindex="-1" role="dialog" aria-hidden="true">';
            var part2 = '<div class="modal-dialog" style="max-width: '+ maxsizer + 'px" role="document"><div style="background: none;" class="modal-content"><div style="border: none; background-color: snow; background-color: rgba(230,230,230,0.8);" class="modal-header">';
            var part3 = '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>';
            var part4 = '<div class="modal-body"><img style="position: relative; width: 100%;" src="'+this.img+'"></div>';
            var part5 = '</div></div></div>';
            return part1+part2+part3+part4+part5;
        }
        else
        {
            var part1 = '<div class="modal fade" id="'+this.tg.substring(1)+'_2" tabindex="-1" role="dialog" aria-hidden="true">';
            var part2 = '<div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header">';
            var part3 = '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>';
            var part4 = '<div class="modal-body"><img style="position: relative; width: 100%;" src="'+this.img+'"></div>';
            var part5 = '</div></div></div>';
            return part1+part2+part3+part4+part5;
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