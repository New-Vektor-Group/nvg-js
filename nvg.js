function nvg_connect(arg) {
  if(arg=="cookie")
  {
    $.getScript("lib/nvg-cookie.js");
  }
  else if(arg=="math")
  {
    $.getScript("lib/nvg-math.js");
  }
  else if(arg=="main")
  {
    $.getScript("lib/nvg-main.js");
  }
  else if(arg=="snow")
  {
    $.getScript("lib/nvg-snow.js");
  }
  else
  {
    alert("Connect error")
  }
}