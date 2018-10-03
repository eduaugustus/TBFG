package br.com.tbog.classes;

import java.security.MessageDigest;

public class Criptografia {
	
	static public String criptografaSenha(String senha) {
		
		/*Senha concatenada a uma pratica de encriptação chamada 'Salt' */
		String senhaSalt = "20%$dkse17"+senha+"71eskd$%0217ksy350fih";
		
		/*Variável que irá receber a senha criptografada*/
		String senhaCript = "";
		
		try {
			/*Método MD5 usado para criptografar a senha*/
			MessageDigest algorithm = MessageDigest.getInstance("MD5");
			byte messageDigest[] = algorithm.digest(senhaSalt.getBytes("UTF-8"));
			 
			StringBuilder hexString = new StringBuilder();
			for (byte b : messageDigest) {
			  hexString.append(String.format("%02X", 0xFF & b));
			}
			
			senhaCript = hexString.toString();
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return senhaCript;
	}
	

}
