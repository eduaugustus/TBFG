package br.com.tbog.classes;

public class Pontuacao implements Comparable<Pontuacao>{

	/*Variáveis que montam o molde de como a pontução é*/
	private String pontuacao;
	private String tempo;
	private String fase;
	private String id;
	private String usuario;
	
	/*Getter - Pontuação*/
	public String getPontuacao() {
		return pontuacao;
	}
	
	/*Setter - Pontuação */
	public void setPontuacao(String pontuacao) {
		this.pontuacao = pontuacao;
	}
	
	/*Getter - Tempo*/
	public String getTempo() {
		return tempo;
	}
	
	/*Setter - Tempo*/
	public void setTempo(String tempo) {
		this.tempo = tempo;
	}
	
	/*Getter - Fase*/
	public String getFase() {
		return fase;
	}
	
	/*Setter - Fase*/
	public void setFase(String fase) {
		this.fase = fase;
	}
	
	/*Getter - Id*/
	public String getId() {
		return id;
	}
	
	/*Setter - Id*/
	public void setId(String id) {
		this.id = id;
	}
	
	/*Getter - Usuario*/
	public String getUsuario() {
		return usuario;
	}
	
	/*Setter - Usuario*/
	public void setUsuario(String usuario) {
		this.usuario = usuario;
	}
	
	public int compareTo(Pontuacao pon) {
		// TODO Auto-generated method stub
		  int comparepon = Integer.parseInt(((Pontuacao)pon).getPontuacao());
	        /* For Ascending order*/
	        return Integer.parseInt(this.pontuacao)-comparepon;
	}
}
