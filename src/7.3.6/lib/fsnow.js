function nvg_snow(zindex)
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

    this.redraw = function()
    {        
        this.hide();
        this.draw();
    };

    this.update = function()
    {
        this.redraw();
        this.init();
    };

    this.init = function()
    {
        if (this.browserok)
        {
            this.actions=true;
            window.onload=this.initsnow();
        }
    };

    this.stop = function()
    {
        this.actions=false;
    };

    this.hide = function()
    {
        for (var i=0;i<=this.snowmax;i++)
        {
            document.getElementById("snowflake"+i).remove();
        }
    };

    this.delete = function()
    {
       this.stop();
       this.hide();
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