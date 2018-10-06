package br.com.tbog.jdbcinterfaces;

import java.util.List;

import br.com.tbog.classes.RelatorioMensal;

public interface RelatorioDAO {

	/*Interface buscaRelatorio que define acesso e manipulação do BD*/
	public RelatorioMensal buscaRelatorio(String mes, String ano);
	
	/*Interface contaCadastros que define acesso e manipulação do BD*/
	public RelatorioMensal contaCadastros(RelatorioMensal relatorio, String primeiroDia, String ultimoDia);
	
	/*Interface contaAtivos que define acesso e manipulação do BD*/
	public RelatorioMensal contaAtivos(RelatorioMensal relatorio, String primeiroDia, String ultimoDia);
	
	/*Interface geraRelatorio que define acesso e manipulação do BD*/
	public void geraRelatorio(String numCad, String  numAtv, String mes, String ano);
	
	/*Interface agrupaRelatorios que define acesso e manipulação do BD*/
	public List<RelatorioMensal> agrupaRelatorios(String anoConsulta);
	
}
