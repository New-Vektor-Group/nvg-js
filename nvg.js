function nvg_connect(arg) {
  if(arg=="cookie")
  {
    $.getScript("http://ex.nvg-team.com/lib/nvg-cookie.js");
  }
  else if(arg=="math")
  {
    $.getScript("http://ex.nvg-team.com/lib/nvg-math.js");
  }
  else if(arg=="main")
  {
    $.getScript("http://ex.nvg-team.com/lib/nvg-main.js");
  }
  else if(arg=="snow")
  {
    $.getScript("http://ex.nvg-team.com/lib/nvg-snow.js");
  }
  else if(arg=="all")
  {
    $.getScript("http://ex.nvg-team.com/lib/nvg-snow.js");
    $.getScript("http://ex.nvg-team.com/lib/nvg-cookie.js");
    $.getScript("http://ex.nvg-team.com/lib/nvg-math.js");
    $.getScript("http://ex.nvg-team.com/lib/nvg-main.js");
  }
  else
  {
    alert("Connect error")
  }
}
