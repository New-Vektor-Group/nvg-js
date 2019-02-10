function nvg_connect(arg) {
  if(arg=="cookie")
  {
    var js = document.createElement("script");

js.type = "text/javascript";
js.src = "lib/nvg-cookie.js";
document.body.appendChild(js);
  }
  else if(arg=="math")
  {
        var js = document.createElement("script");

js.type = "text/javascript";
js.src = "lib/nvg-math.js";
document.body.appendChild(js);
  }
  else if(arg=="main")
  {
        var js = document.createElement("script");

js.type = "text/javascript";
js.src = "lib/nvg-main.js";
document.body.appendChild(js);
  }
  else if(arg=="snow")
  {
        var js = document.createElement("script");

js.type = "text/javascript";
js.src = "lib/nvg-snow.js";
document.body.appendChild(js);
  }
  else if(arg=="all")
  {
            var js = document.createElement("script");

js.type = "text/javascript";
js.src = "lib/nvg-snow.js";
document.body.appendChild(js);
js.src = "lib/nvg-math.js";
document.body.appendChild(js);
js.src = "lib/nvg-main.js";
document.body.appendChild(js);
js.src = "lib/nvg-cookie.js";
document.body.appendChild(js);
  }
  else
  {
    alert("Connect error")
  }
}
