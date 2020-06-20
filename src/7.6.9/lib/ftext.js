nvgtext.nl2br = function(str, is_xhtml)
{
	if (typeof str === 'undefined' || str === null)
	    return '';
	var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
	return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
};

nvgtext.nocopy = function(element)
{
	$(element).css("-webkit-user-select","none");
	$(element).css("-khtml-user-select","none");
	$(element).css("-moz-user-select","none");
	$(element).css("-ms-user-select","none");
	$(element).css("-o-user-select","none");
	$(element).css("user-select","none");
	
	$(element).bind('cut copy paste', function(e) {
		e.preventDefault();
	});
};

nvgtext.boldFunc=function(str, p1, offset, s){
	return '<strong>'+(p1)+'</strong>'
};

nvgtext.italicFunc=function(str, p1, offset, s){
	return '<em>'+(p1)+'</em>'
};

nvgtext.underlinedFunc=function(str, p1, offset, s){
	return '<ins>'+(p1)+'</ins>'
};

nvgtext.ahrefFunc=function(str,b,c,d){
	return '<a href="'+b+'" target="_blank" class="text-primary">'+(c)+'</a>'
};

nvgtext.imghrefFunc=function(str,b,c,d){
	return '<img src="'+b+'" class="img-fluid" style="max-height:500px;">'
};

nvgtext.hightFunc=function(str, p1, offset, s){
	return '<span class="bg-primary">'+(p1)+'</span>'
};

pasBB = function(wh,wha)
{
    $textarea=$(wh).parent().next().children("textarea");
    start = $textarea[0].selectionStart;
    finish = $textarea[0].selectionEnd;
    sel = $textarea.get(0).value.substring(start, finish);
    v = $textarea.val();
    textBefore = v.substring(0,  start);
    textAfter  = v.substring(finish, v.length);
    $textarea.val(textBefore+textAfter);
    if(sel=="")
        sel="text";
    a=" [b]"+sel+"[/b] ";
    if(wha==1)
        a=" [i]"+sel+"[/i] ";
    else if(wha==2)
        a=" [u]"+sel+"[/u] ";
    else if(wha==3)
        a=" [url="+sel+"]"+sel+"[/url] ";
    else if(wha==4)
        a=" [h]"+sel+"[/h] ";
    else if(wha==5)
        a=" [img="+sel+"]";

    v = $textarea.val();
    textBefore = v.substring(0,  start);
    textAfter  = v.substring(start, v.length);
    $textarea.val(textBefore + a + textAfter);

    $str=BBconvert("#"+$textarea.attr("id"));
    $textarea.parent().next().next().children(".output-test").html($str);
};

BBconvert = function(t)
{
    $str=nvgtext.nl2br($(t).val());
    $format_search =  [
        /\[b\](.*?)\[\/b\]/ig,
        /\[i\](.*?)\[\/i\]/ig,
        /\[u\](.*?)\[\/u\]/ig,
        /\[h\](.*?)\[\/h\]/ig,
        /\[url=(.*)\](.*)\[\/url\]/ig,
        /\[img=(.*)\]/ig
    ];
    $format_replace = [
        boldFunc,
        italicFunc,
        underlinedFunc,
        hightFunc,
        ahrefFunc,
        imghrefFunc
    ];
    for (var i =0;i<$format_search.length;i++) {
      $str = $str.replace($format_search[i], $format_replace[i]);
    }
    return $str;
};

$(".ianswer").on("input",function(){
    $str=BBconvert(this);
    $(this).parent().next().next().children(".output-test").html($str);
});

function nvgtext(){}