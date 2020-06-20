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
    z-index:zindex
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


//Jquery
function nvgs(obj2, scroll_when2, direction2, animate, scroll_when2_2){
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