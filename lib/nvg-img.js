class nvgi
{
	static block_f;
	static needToS = false;
	static paste = false;
	static ToS = "";

	static getImg(pastee, callback)
	{
		if(pastee.clipboardData == false)
		{
        	if(typeof(callback) == "function")
        	{
            	callback(undefined);
        	}
    	};

    	var files = pastee.clipboardData.items;

    	if(files == undefined)
    	{
        	if(typeof(callback) == "function")
        	{
        	    callback(undefined);
        	}
    	};

    	for (var i = 0; i < files.length; i++)
    	{
        	if (files[i].type.indexOf("image") == -1) 
        		continue;
        	var blob = files[i].getAsFile();

        	if(typeof(callback) == "function")
        	{
            callback(blob);
        	}
    	}
	}

}

window.addEventListener("paste", function(e){

    if(nvgi.paste)
    {
    	nvgi.getImg(e, function(iblob){
        if(iblob)
        	{           
            var img = new Image();
            img.onload = function(){
            if(nvgi.needToS && nvgi.Tos != "")
            	$(nvgi.ToS).html(img);
            };

            nvgi.block_f = iblob;

            var URLObj = window.URL || window.webkitURL;
            img.src = URLObj.createObjectURL(iblob);
        }
    });
    }

}, false);