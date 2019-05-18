class nvgtext
{
	static nl2br (str, is_xhtml) {
    if (typeof str === 'undefined' || str === null) {
        return '';
    }
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
	}

	static nocopy(element)
	{
		$(element).css("-webkit-user-select","none");
		$(element).css("-khtml-user-select","none");
		$(element).css("-moz-user-select","none");
		$(element).css("-ms-user-select","none");
		$(element).css("-o-user-select","none");
		$(element).css("user-select","none");
	}
}