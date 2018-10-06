package br.com.tbog.conexao;
import java.sql.Connection;
public class Conexao {
	
	private Connection conexao;
	
	/*Método que abre a conexao com o banco de dados*/
	public Connection abrirConexao() {
		try {
			/*Instrução que identifica o driver usado para conexão com o BD*/
			Class.forName("org.gjt.mm.mysql.Driver");
			conexao = java.sql.DriverManager.getConnection(
					"jdbc:mysql://localhost:3306/bd_gondria", "root", "root");
		} catch (Exception e) {
			e.printStackTrace();
		}
		return conexao;
	}
	
	/*Método que fecha a conexao com o banco de dados*/
	public void fecharConexao() {
		try {
			conexao.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
}
