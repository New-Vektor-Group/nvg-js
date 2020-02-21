nvgs.countEls = [];
nvgs.enabled = true;

nvgs.setFix = function(el, wh, ofx, ofy)
{
  if(ofx == undefined)
    ofx = 0;
  if(ofy == undefined)
    ofy = ofx;

  $(el).css("position","fixed");
  $(el).css("z-index","1001");

  if(wh[0]=="t")
    $(el).css("top",ofy+"px");
  else if(wh[0]=="b")
    $(el).css("bottom",ofy+"px");

  if(wh[1]=="l")
    $(el).css("left",ofx+"px");
  else if(wh[1]=="r")
    $(el).css("right",ofx+"px");
  else if(wh[1]=="c")
    $(el).css("left",(50+ofx)+"%");
};

function nvgs(obj2, scroll_when2, direction2, animate, scroll_when2_2)
{
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