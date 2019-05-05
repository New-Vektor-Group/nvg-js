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
      setTimeout(function(){$(this.obj).css("transform","translate(1000px,-10000px)");},0);
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
     nvgs.hds5df543(element.obj);

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
      nvgs.hds5df543(element.obj);
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
      nvgs.hds5df543(element.obj);
    }
    }
}

static sh5df543(objj)
{
  $(objj).addClass("show");
  $(objj).removeClass("hide");
  setTimeout(function(){$(objj).css("transform","translate(0px,0px)");},0);
}

static hds5df543(objj)
{
 $(objj).removeClass("show");
 $(objj).addClass("hide");
 setTimeout(function(){if(this.needshf) {$(objj).css("transform","translate(1000px,-10000px)");}},400);
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