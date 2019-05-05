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

class nvg_modal
{
	constructor(mode, trigger, img, width_new = 500)
	{
		if(mode == "img" || mode == "" || mode == "img2")
		{
		this.tg = trigger;
		this.img = img;

		$(this.tg).css("cursor","pointer");
		$(this.tg).attr("onclick","$('"+this.tg+"_2').modal('show');");
		
		$("body").append(this.create_window(mode,width_new));
		}
	}

	create_window(mode, maxsizer)
	{
		if(mode=="img2")
        {
            var part1 = '<div class="modal fade" id="'+this.tg.substring(1)+'_2" tabindex="-1" role="dialog" aria-hidden="true">';
            var part2 = '<div class="modal-dialog" style="max-width: '+ maxsizer + 'px" role="document"><div style="background: none;" class="modal-content"><div style="border: none; background-color: snow; background-color: rgba(230,230,230,0.8);" class="modal-header">';
            var part3 = '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>';
            var part4 = '<div class="modal-body"><img style="position: relative; width: 100%;" src="'+this.img+'"></div>';
            var part5 = '</div></div></div>';
            return part1+part2+part3+part4+part5;
        }
        else
        {
            var part1 = '<div class="modal fade" id="'+this.tg.substring(1)+'_2" tabindex="-1" role="dialog" aria-hidden="true">';
            var part2 = '<div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header">';
            var part3 = '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>';
            var part4 = '<div class="modal-body"><img style="position: relative; width: 100%;" src="'+this.img+'"></div>';
            var part5 = '</div></div></div>';
            return part1+part2+part3+part4+part5;
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