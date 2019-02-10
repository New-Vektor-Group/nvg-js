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
  else if(arg=="all")
  {
    $.getScript("lib/nvg-snow.js");
	$.getScript("lib/nvg-cookie.js");
    $.getScript("lib/nvg-math.js");
    $.getScript("lib/nvg-main.js");
  }
  else
  {
    alert("Connect error")
  }
}