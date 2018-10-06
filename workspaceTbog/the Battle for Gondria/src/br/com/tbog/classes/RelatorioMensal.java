package br.com.tbog.classes;

public class RelatorioMensal {

	/*Variáveis que montam o molde de como o Relatório Mensal é*/
	private String id;
	private String mes;
	private String ano;
	private String numeroVisitas;
	private String numeroCadastros;
	
	/*Getter - Id*/
	public String getId() {
		return id;
	}
	
	/*Setter - Id*/
	public void setId(String id) {
		this.id = id;
	}

	/*Getter - Mes*/
	public String getMes() {
		return mes;
	}

	/*Setter - Mes*/
	public void setMes(String mes) {
		this.mes = mes;
	}

	/*Getter - Ano*/
	public String getAno() {
		return ano;
	}

	/*Setter - Ano*/
	public void setAno(String ano) {
		this.ano = ano;
	}

	/*Getter - numeoro de visitas*/
	public String getNumeroVisitas() {
		return numeroVisitas;
	}

	/*Setter - numeoro de visitas*/
	public void setNumeroVisitas(String numeroVisitas) {
		this.numeroVisitas = numeroVisitas;
	}

	/*Getter -  - numeoro de cadastros*/
	public String getNumeroCadastros() {
		return numeroCadastros;
	}

	/*Setter - numeoro de cadastros*/
	public void setNumeroCadastros(String numeroCadastros) {
		this.numeroCadastros = numeroCadastros;
	}
	
}
