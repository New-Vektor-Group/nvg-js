function nvg_snow(zindex)
{
    nvg_snow.prototype.movesnow()
    {
        if(nvg_snow.prototype.actions)
        {
            for (var i = 0; i <= nvg_snow.prototype.snowmax; i++)
            {
                nvg_snow.prototype.crds[i] += nvg_snow.prototype.x_mv[i];
                nvg_snow.prototype.snow[i].posy+= nvg_snow.prototype.snow[i].sink;
                nvg_snow.prototype.snow[i].style.left = nvg_snow.prototype.snow[i].posx+nvg_snow.prototype.lftrght[i]*Math.sin(nvg_snow.prototype.crds[i])+'px';
                nvg_snow.prototype.snow[i].style.top= nvg_snow.prototype.snow[i].posy+'px';

                if (nvg_snow.prototype.snow[i].posy>= nvg_snow.prototype.marginbottom-2*nvg_snow.prototype.snow[i].size || parseInt(nvg_snow.prototype.snow[i].style.left)>(nvg_snow.prototype.marginright-3*nvg_snow.prototype.lftrght[i]))
                {
                        if (nvg_snow.prototype.snowingzone==1) {nvg_snow.prototype.snow[i].posx=nvg_snow.prototype.randommaker(nvg_snow.prototype.marginright-nvg_snow.prototype.snow[i].size)};
                        if (nvg_snow.prototype.snowingzone==2) {nvg_snow.prototype.snow[i].posx=nvg_snow.prototype.randommaker(nvg_snow.prototype.marginright/2-nvg_snow.prototype.snow[i].size)};
                        if (nvg_snow.prototype.snowingzone==3) {nvg_snow.prototype.snow[i].posx=nvg_snow.prototype.randommaker(nvg_snow.prototype.marginright/2-nvg_snow.prototype.snow[i].size)+nvg_snow.prototype.marginright/4};
                        if (nvg_snow.prototype.snowingzone==4) {nvg_snow.prototype.snow[i].posx=nvg_snow.prototype.randommaker(nvg_snow.prototype.marginright/2-nvg_snow.prototype.snow[i].size)+nvg_snow.prototype.marginright/2};
                        nvg_snow.prototype.snow[i].posy=0;
                }
        }
        var nvg_snow.prototype2 = nvg_snow.prototype;
        setTimeout(function() {nvg_snow.prototype2.movesnow();},nvg_snow.prototype2.speed);
        }
    }

    nvg_snow.prototype.draw()
    {        
        for (var i=0;i<=nvg_snow.prototype.snowmax;i++)
        {
            document.body.innerHTML += ("<span id='snowflake"+i+"' style='z-index:"+nvg_snow.prototype.zindex+";position:fixed;top:-"+nvg_snow.prototype.snowmaxsize+"'>"+nvg_snow.prototype.snowletter+"</span>");
        }
    }

    nvg_snow.prototype.redraw()
    {        
        nvg_snow.prototype.hide();
        nvg_snow.prototype.draw();
    }

    nvg_snow.prototype.update()
    {
        nvg_snow.prototype.redraw();
        nvg_snow.prototype.init();
    }

    nvg_snow.prototype.init()
    {
        if (nvg_snow.prototype.browserok)
        {
            nvg_snow.prototype.actions=true;
            window.onload=nvg_snow.prototype.initsnow();
        }

    }

    nvg_snow.prototype.stop()
    {
        nvg_snow.prototype.actions=false;
    }

    nvg_snow.prototype.hide()
    {
       for (var i=0;i<=nvg_snow.prototype.snowmax;i++)
        {
            document.getElementById("snowflake"+i).remove();
        }
    }

    nvg_snow.prototype.delete()
    {
       nvg_snow.prototype.stop();
       nvg_snow.prototype.hide();
    }

    nvg_snow.prototype.randommaker(range)
    {
        nvg_snow.prototype.rand=Math.floor(range*Math.random());
        return nvg_snow.prototype.rand
    }

    nvg_snow.prototype.initsnow()
    {
        if (nvg_snow.prototype.ie5 || nvg_snow.prototype.opera) 
            nvg_snow.prototype.marginright = document.body.clientWidth-15;
        else if (nvg_snow.prototype.ns6)
            nvg_snow.prototype.marginright = window.innerWidth-15;
        else
            nvg_snow.prototype.marginright = window.innerWidth-15;

        nvg_snow.prototype.marginbottom = window.innerHeight+100;

        nvg_snow.prototype.snowsizerange=nvg_snow.prototype.snowmaxsize-nvg_snow.prototype.snowminsize;

        for (var i = 0; i <= nvg_snow.prototype.snowmax; i++)
        {
            nvg_snow.prototype.crds[i] = 0;
            nvg_snow.prototype.lftrght[i] = Math.random()*25;
            nvg_snow.prototype.x_mv[i] = 0.03 + Math.random()/10;
            nvg_snow.prototype.snow[i]=document.getElementById("snowflake"+i);
            nvg_snow.prototype.snow[i].style.fontFamily=nvg_snow.prototype.snowtype[nvg_snow.prototype.randommaker(nvg_snow.prototype.snowtype.length)];
            nvg_snow.prototype.snow[i].size=nvg_snow.prototype.randommaker(nvg_snow.prototype.snowsizerange)+nvg_snow.prototype.snowminsize;
            nvg_snow.prototype.snow[i].style.fontSize=nvg_snow.prototype.snow[i].size+'px';
            nvg_snow.prototype.snow[i].style.color=nvg_snow.prototype.snowcolor[nvg_snow.prototype.randommaker(nvg_snow.prototype.snowcolor.length)];
            nvg_snow.prototype.snow[i].style.zIndex=1000;
            nvg_snow.prototype.snow[i].sink=nvg_snow.prototype.sinkspeed*nvg_snow.prototype.snow[i].size/5;
            if (nvg_snow.prototype.snowingzone==1) {nvg_snow.prototype.snow[i].posx=nvg_snow.prototype.randommaker(nvg_snow.prototype.marginright-nvg_snow.prototype.snow[i].size)};
            if (nvg_snow.prototype.snowingzone==2) {nvg_snow.prototype.snow[i].posx=nvg_snow.prototype.randommaker(nvg_snow.prototype.marginright/2-nvg_snow.prototype.snow[i].size)};
            if (nvg_snow.prototype.snowingzone==3) {nvg_snow.prototype.snow[i].posx=nvg_snow.prototype.randommaker(nvg_snow.prototype.marginright/2-nvg_snow.prototype.snow[i].size)+nvg_snow.prototype.marginright/4};
            if (nvg_snow.prototype.snowingzone==4) {nvg_snow.prototype.snow[i].posx=nvg_snow.prototype.randommaker(nvg_snow.prototype.marginright/2-nvg_snow.prototype.snow[i].size)+nvg_snow.prototype.marginright/2};
            nvg_snow.prototype.snow[i].posy=nvg_snow.prototype.randommaker(2*nvg_snow.prototype.marginbottom-nvg_snow.prototype.marginbottom-2*nvg_snow.prototype.snow[i].size);
            nvg_snow.prototype.snow[i].style.left=nvg_snow.prototype.snow[i].posx+'px';
            nvg_snow.prototype.snow[i].style.top=nvg_snow.prototype.snow[i].posy+'px';
        }
        nvg_snow.prototype.movesnow();
    }

    if(zindex === undefined)
        zindex = 1000;

    nvg_snow.prototype.speed = 50;
    nvg_snow.prototype.snowmax=30;
    nvg_snow.prototype.snowcolor=new Array("#b9dff5","#7fc7ff","#7fb1ff","#7fc7ff","#b9dff5");
    nvg_snow.prototype.snowtype=new Array("Times");
    nvg_snow.prototype.snowletter="*";
    nvg_snow.prototype.sinkspeed=0.6;
    nvg_snow.prototype.snowmaxsize=50;
    nvg_snow.prototype.snowminsize=25;
    nvg_snow.prototype.zindex=zindex;
    /* 1 for all */
    /* 2 for left */
    /* 3 for center */
    /* 4 for right */
    nvg_snow.prototype.snowingzone=1;

    /* Do not edit below nvg_snow.prototype line */
    nvg_snow.prototype.actions = true;
    nvg_snow.prototype.snow=new Array();
    nvg_snow.prototype.marginbottom;
    nvg_snow.prototype.marginright;
    nvg_snow.prototype.i_snow=0;
    nvg_snow.prototype.x_mv=new Array();
    nvg_snow.prototype.crds=new Array();
    nvg_snow.prototype.lftrght=new Array();
    nvg_snow.prototype.browserinfos=navigator.userAgent;
    nvg_snow.prototype.ie5=document.all&&document.getElementById&&!nvg_snow.prototype.browserinfos.match(/Opera/);
    nvg_snow.prototype.ns6=document.getElementById&&!document.all;
    nvg_snow.prototype.opera=nvg_snow.prototype.browserinfos.match(/Opera/);
    nvg_snow.prototype.browserok=nvg_snow.prototype.ie5||nvg_snow.prototype.ns6||nvg_snow.prototype.opera;

    nvg_snow.prototype.draw();
    nvg_snow.prototype.init();
}