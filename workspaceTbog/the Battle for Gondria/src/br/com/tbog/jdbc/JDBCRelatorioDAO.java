package br.com.tbog.jdbc;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import br.com.tbog.classes.RelatorioMensal;
import br.com.tbog.classes.Usuario;
import br.com.tbog.jdbcinterfaces.RelatorioDAO;

public class JDBCRelatorioDAO implements RelatorioDAO {

	private Connection conexao;

	/*Construtor que inicia a classe JDBC com uma conexão vinda de alguma servlet*/
	public JDBCRelatorioDAO(Connection conexao) {
		this.conexao = conexao;
	}

	/*Função que busca um relatório existente no BD*/
	public RelatorioMensal buscaRelatorio(String mes, String ano) {

		/*Cria e faz uma instancia de um objeto da classe relatorioMensal*/
		RelatorioMensal relatoriobd = new RelatorioMensal();

		/*String que recebe um comando SQL para consultar se tem algum relatorio mensal identico no BD*/
		String comando = "SELECT mes, ano FROM consultas_mensais WHERE mes = '" + mes + "' AND ano = '" + ano + "' ";

		try {

			/*Cria uma instacia da classe Statement com a variável conexao*/
			Statement stmt = conexao.createStatement();

			/*Executa o comando SQL e armazena em um objeto da classe ResultSet
			 * gerando um Data Table*/
			ResultSet rs = stmt.executeQuery(comando);

			/*Instrução que verifica se há alguma linha no Data Table, caso exista
			 * pega as informações existentes*/
			while(rs.next()) {

				/*Variáveis que são colocadas as informações da consulta*/
				String mesbd = rs.getString("mes");
				String anobd = rs.getString("ano");

				/*Seta as isformações em objeto da classe RelatorioMensal*/
				relatoriobd.setMes(mesbd);
				relatoriobd.setAno(anobd);

			}

		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}

		/*Retorna um objeto RelatorioMensal para a servlet*/
		return relatoriobd;
	}

	/*Função que faz a contagem e registro dos cadastros*/
	public RelatorioMensal contaCadastros(RelatorioMensal relatorio, String primeiroDia, String ultimoDia) {

		/*String que recebe um comando SQL para contar o numero de cadastros entre
		 * o primeiro dia de uma mês e o último dia*/
		String comandoCadastrados = "SELECT COUNT(data_cadastro) AS dataDeCadastro";
		comandoCadastrados += " FROM usuarios WHERE data_cadastro BETWEEN '" + primeiroDia + "' AND '" + ultimoDia + "' ";

		try {

			/*Cria uma instacia da classe Statement com a variável conexao*/
			Statement stmt = conexao.createStatement();

			/*Executa o comando SQL e armazena em um objeto da classe ResultSet
			 * gerando um Data Table*/
			ResultSet rs = stmt.executeQuery(comandoCadastrados);

			/*Cria uma variável nula que conta o número de cadastros*/
			String numCadastros = null;

			/*Instrução que verifica se há alguma linha no Data Table, caso exista
			 * pega as informações existentes*/
			while(rs.next()) {

				/*Variável que são colocadas as informações da consulta*/
				numCadastros = rs.getString("dataDeCadastro");

				/*Seta no objeto relatorio vindo como parâmetro, o número de cadastros*/
				relatorio.setNumeroCadastros(numCadastros);
			}


		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}

		/*Retorna um objeto RelatorioMensal para a servlet*/
		return relatorio;
	}

	/*Função que faz a contagem e registro das visitas*/
	public RelatorioMensal contaAtivos(RelatorioMensal relatorio, String primeiroDia, String ultimoDia) {

		/*String que recebe um comando SQL para contar o numero de visitas entre
		 * o primeiro dia de uma mês e o último dia*/
		String comandoAtivos = "SELECT COUNT(ultimo_login) AS ultimoLogin FROM `usuarios`";
		comandoAtivos += " WHERE ultimo_login BETWEEN '" + primeiroDia + "' AND '" + ultimoDia + "' ";


		try {

			/*Cria uma instacia da classe Statement com a variável conexao*/
			Statement stmt = conexao.createStatement();

			/*Executa o comando SQL e armazena em um objeto da classe ResultSet
			 * gerando um Data Table*/
			ResultSet rs = stmt.executeQuery(comandoAtivos);

			/*Cria uma variável nula que conta o número de visitas*/
			String numAtivos = null;

			/*Instrução que verifica se há alguma linha no Data Table, caso exista
			 * pega as informações existentes*/			
			while(rs.next()){
				
				/*Variável que são colocadas as informações da consulta*/
				numAtivos = rs.getString("ultimoLogin");
				
				/*Seta no objeto relatorio vindo como parâmetro, o número de visitas*/
				relatorio.setNumeroVisitas(numAtivos);
			}


		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}

		return relatorio;
	}

	/*Função que gera um relatório e registra no BD*/
	public void geraRelatorio(String numCad, String  numAtv, String mes, String ano) {

		/*String que recebe um comando SQL para inserir no BD um relatorio Mensal*/
		String comandoRelatorio = "INSERT INTO consultas_mensais (mes, ano, numero_visitas, numero_cadastros)";
		comandoRelatorio +=" VALUES ('" + mes + "', '" + ano + "', '" + numAtv + "', '" + numCad + "')";

		try {
			/*Cria uma instacia da classe Statement com a variável conexao*/
			Statement stmt = conexao.createStatement();
			
			/*Executa o comdando SQL, inserindo um novo relatório no BD*/
			stmt.execute(comandoRelatorio);

		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}

	}

	/*Função que registra os relatórios mensais em uma lista em ordem mensal (Janeiro a Dezembro)*/
	public List<RelatorioMensal> agrupaRelatorios(String anoConsulta) {

		/*Cria uma lista que irá conter objetos da classe RelatorioMensal*/
		List<RelatorioMensal> listaDeRelatorios = new ArrayList<RelatorioMensal>();
		
		/*String que recebe um comando SQL para consultar os relatórios mensais 
		 * de um ano em ordem de mensal (Janeiro a Dezembro)*/
		String comando = "SELECT ano, mes, numero_visitas, numero_cadastros FROM consultas_mensais ";
		comando += "WHERE ano = '" + anoConsulta + "' ORDER BY mes";

		try {
			/*Cria uma instacia da classe Statement com a variável conexao*/
			Statement stmt = conexao.createStatement();
			
			/*Executa o comando SQL e armazena em um objeto da classe ResultSet
			 * gerando um Data Table*/
			ResultSet rs = stmt.executeQuery(comando);
			
			/*Instrução que verifica se há alguma linha no Data Table, caso exista
			 * pega as informações existentes*/
			while(rs.next()){

				/*Cria uma instancia da classe RelatorioMensal que irá conter as
				 * informações pertinente de cada mês*/
				RelatorioMensal relatorio = new RelatorioMensal();

				/*Variáveis que são colocadas as informações da consulta*/
				String mes = rs.getString("mes");
				String ano = rs.getString("ano");
				String numCadastros = rs.getString("numero_cadastros");
				String numAtivos = rs.getString("numero_visitas");

				/*Seta as informções da consulta de cada mês no objeto relatorio*/
				relatorio.setMes(mes);
				relatorio.setAno(ano);
				relatorio.setNumeroCadastros(numCadastros);
				relatorio.setNumeroVisitas(numAtivos);

				/*Adiciona em uma lista de objetos, o relatório*/
				listaDeRelatorios.add(relatorio);

			}

		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}

		/*Retorna uma lista com relatórios mensais*/
		return listaDeRelatorios;

	}

}
