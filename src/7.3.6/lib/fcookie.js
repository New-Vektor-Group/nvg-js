function nvg_cook(inputId)
{
  this.inputId = inputId;

  $(this.inputId).bind('input', function(){
  localStorage.setItem(this.inputId, $(this).val());
  nvg_cook.prototype.setCookie("ede56579ee9d437820a0f9",1,{expires: 86400});
  });

  if(nvg_cook.prototype.getCookie("ede56579ee9d437820a0f9")==1)
  	$(this.inputId).val(localStorage.getItem(this.inputId.slice(1)));

	this.delMe = function()
	{
		localStorage.removeItem(this.inputId.slice(1));
	}

  nvg_cook.prototype.getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

  nvg_cook.prototype.setCookie(name, value, options) {
  options = options || {};

  var expires = options.expires;

  if (typeof expires == "number" && expires) {
    var d = new Date();
    d.setTime(d.getTime() + expires * 1000);
    expires = options.expires = d;
  }
  if (expires && expires.toUTCString) {
    options.expires = expires.toUTCString();
  }

  value = encodeURIComponent(value);

  var updatedCookie = name + "=" + value;

  for (var propName in options) {
    updatedCookie += "; " + propName;
    var propValue = options[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }

  document.cookie = updatedCookie;
}

  nvg_cook.prototype.deleteCookie(name) {
  nvg_cook.prototype.setCookie(name, "", {
    expires: -1
  })
}
}