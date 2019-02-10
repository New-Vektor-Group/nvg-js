function nvg_connect(arg,path) {
  if(arg=="cookie")
  {
    var js = document.createElement("script");

js.type = "text/javascript";
js.src = path+"lib/nvg-cookie.js";
document.head.appendChild(js);
  }
  else if(arg=="math")
  {
        var js = document.createElement("script");

js.type = "text/javascript";
js.src = path+"lib/nvg-math.js";
document.head.appendChild(js);
  }
  else if(arg=="main")
  {
        var js = document.createElement("script");

js.type = "text/javascript";
js.src = path+"lib/nvg-main.js";
document.head.appendChild(js);
  }
  else if(arg=="snow")
  {
        var js = document.createElement("script");

js.type = "text/javascript";
js.src = path+"lib/nvg-snow.js";
document.head.appendChild(js);
  }
  else if(arg=="all")
  {
            var js0 = document.createElement("script");
                js1 = document.createElement("script");
                js2 = document.createElement("script");
                js3 = document.createElement("script");

js0.type = "text/javascript";js1.type = "text/javascript";js2.type = "text/javascript";js3.type = "text/javascript";
js0.src = path+"lib/nvg-snow.js";
document.head.appendChild(js0);
js1.src = path+"lib/nvg-math.js";
document.head.appendChild(js1);
js2.src = path+"lib/nvg-main.js";
document.head.appendChild(js2);
js3.src = path+"lib/nvg-cookie.js";
document.head.appendChild(js3);
  }
  else
  {
    alert("Connect error")
  }
}
