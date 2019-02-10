function nvgRand(min, max) 
		{
			// Возвращает случайное число между min (включительно) и max (не включая max)
 		 			return Math.random() * (max - min) + min;
		}