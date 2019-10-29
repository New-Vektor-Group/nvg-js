function nvgRand(min, max) 
		{
			/* Возвращает случайное число между min (включительно) и max (не включая max)*/
 		 	return Math.random() * (max - min) + min;
		}

class nvgm
{
	static sigm(x) 
		{
 		 	return 1/(1+Math.pow(Math.E, -x));
		}
}