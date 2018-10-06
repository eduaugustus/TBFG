 package br.com.tbog.classes;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Date;

public class Usuario implements Serializable{

	/*Variáveis que montam o molde de como o Usuário é*/
	private static final long serialVersionUID = 1L;
	private String id;
	private String nome;
	private String nascimento;
	private String email;
	private String apelido;
	private String senha;
	private String permissao;
	private String login;
	private String dataCadastro;
	
	/*Getter - Id*/
	public String getId() {
		return id;
	}
	
	/*Setter  - Id*/
	public void setId(String id) {
		this.id = id;
	}
	
	/*Getter - Nome*/
	public String getNome() {
		return nome;
	}
	
	/*Setter  - Nome*/
	public void setNome(String nome) {
		this.nome = nome;
	}
	
	/*Getter - Nascimento*/
	public String getNascimento() {
		return nascimento;
	}
	
	/*Setter - Nascimento*/
	public void setNascimento(String nascimento) {
		this.nascimento = nascimento;
	}
	
	/*Getter - Email*/
	public String getEmail() {
		return email;
	}
	
	/*Setter  - Email*/
	public void setEmail(String email) {
		this.email = email;
	}
	
	/*Getter - Apelido*/
	public String getApelido() {
		return apelido;
	}
	
	/*Setter  - Apelido*/
	public void setApelido(String apelido) {
		this.apelido = apelido;
	}
	
	/*Getter - Senha*/
	public String getSenha() {
		return senha;
	}
	
	/*Setter  - Senha*/
	public void setSenha(String senha) {
		this.senha = senha;
	}
	
	/*Getter - Permissao*/
	public String getPermissao() {
		return permissao;
	}
	
	/*Setter - Permissao*/
	public void setPermissao(String permissao) {
		this.permissao = permissao;
	}
	
	/*Getter - Login*/
	public String getLogin() {
		return login;
	}
	
	/*Setter - Login*/
	public void setLogin(String login) {
		this.login = login;
	}
	
	/*Getter - data de cadastro*/
	public String getDataCadastro() {
		return dataCadastro;
	}
	
	/*Setter - data de cadastro*/
	public void setDataCadastro(String dataCadastro) {
		this.dataCadastro = dataCadastro;
	}
	
	/*Método que converte uma strind de data vinda no formato DD/MM/YYYY para o formato ISO
	 *YYYY-MM-DD que o banco de dados registre*/
	public String converteDataParaBD() {
		String[] nascimentoDividido = nascimento.split("/");
		String nascimentoConvertido = nascimentoDividido[2] + "-" + nascimentoDividido[1] + "-" + nascimentoDividido[0];
		return nascimentoConvertido;
	}
	
	/*Método que converte uma strind de nascimento vinda no formato YYYY-MM-DD para o formato de
	 *leitura brasileiro DD/MM/YYYY*/
	public String converteNascimentoParaFrontend(String nascimento) {
		String[] nascimentoDividido = nascimento.split("-");
		String nascimentoConvertido = nascimentoDividido[2] + "/" + nascimentoDividido[1] + "/" + nascimentoDividido[0];
		return nascimentoConvertido;
	}
	
	/*Método que converte um objeto de data Date no formato ISO YYYY-MM-DD em String*/
	public String converteDateParaStringISO(Date Data){
		System.out.println(Data +" ---- Data aqui LOGIN");
		   SimpleDateFormat FormataData = new SimpleDateFormat("yyyy-MM-dd");
		   String date = FormataData.format(Data);
		   System.out.println(date.toString());
		   return date.toString(); 
		}
	
}
