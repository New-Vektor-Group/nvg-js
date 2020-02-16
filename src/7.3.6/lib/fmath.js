nvgR.I = function(min, max, f) 
{
	if(f === undefined)
		f = false;

	/* min [] и max ()*/
 	if(f)
 		return Math.floor(Math.random() * (max - min) + min);
 	else
 		return Math.random() * (max - min) + min;
};

nvgR.C = function(caps, lang)
{
	if(caps === undefined)
		caps = true;
	if(lang === undefined)
		lang = 'en';

	var chars = "ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
	if(lang=='ru'){
		chars = "ЙФЯЦЫЧУВСКАМЕПИНРТГОЬШЛБЩДЮЗЖХЭЪйфяцычувскамепинртгоьшлбщдюзжхэъ";
		if(!caps)
			chars = chars.slice(32);
	}
	else{
		if(!caps)
			chars = chars.slice(26);
	}
	
	var rnum = Math.floor(Math.random() * chars.length);
	var randomstring = chars.substring(rnum,rnum+1);
	return randomstring;
};

nvgR.D = function(zero)
{
	if(zero === undefined)
		zero = true;

	if(zero)
		return nvgR.I(0,10,1);
	else
		return nvgR.I(1,10,1);
};

nvgR.N = function(d)
{
	if(d === undefined)
		d = 1;
	return nvgR.I(Math.pow(10,d-1),Math.pow(10,d-1)*10,1);
};

function nvgR(){}

nvgM.sigm = function(x) 
{
 	return 1/(1+Math.pow(Math.E, -x));
};
function nvgM(){}