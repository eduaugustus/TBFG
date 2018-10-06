package br.com.tbog.classes;

import java.util.Random;
public class RandomInt {
		public String anyRandomInt( int low, int high) {
			Random random= new Random();
			int randomInt = random.nextInt(high) + low;
			System.out.println("random integer from " + low + " to " + high + ":" + randomInt);		
			return Integer.toString(randomInt);
		}

}
