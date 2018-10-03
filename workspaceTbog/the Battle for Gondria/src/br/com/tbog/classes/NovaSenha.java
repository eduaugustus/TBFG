package br.com.tbog.classes;

import java.util.Random;

public class NovaSenha {

	/*Método que gera uma senha aleatória com 9 digitos */
	public String novaSenha() {
		// TODO Auto-generated method stub
		Random rnd = new Random();
		int n = rnd.nextInt(999999999);
		return Integer.toString(n);
	}

}
