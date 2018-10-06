package br.com.tbog.servlets;

import java.io.IOException;
import java.sql.Connection;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import br.com.tbog.classes.RelatorioMensal;
import br.com.tbog.conexao.Conexao;
import br.com.tbog.jdbc.JDBCRelatorioDAO;

/**
 * Servlet implementation class ConstroiCharts
 */
@WebServlet("/ConstroiCharts")
public class ConstroiCharts extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ConstroiCharts() {
        super();
        // TODO Auto-generated constructor stub
    }
    
    private void process(HttpServletRequest request, HttpServletResponse response) 
    		throws ServletException, IOException {
    	
    	try {
    		
    		/*Abre uma conexão com BD*/
    		Conexao conec = new Conexao();
    		Connection conexao = conec.abrirConexao();
    		
    		/*Cria umas instacia da classe JDBCUsuarioDAO com a variável conexao*/
    		JDBCRelatorioDAO jdbcRelatorio = new JDBCRelatorioDAO(conexao);
    		
    		/*Cria uma isntacia da classe RelatorioMensal que poderá ou não
    		 * ser cadastrada no BD*/
    		RelatorioMensal relatorio = new RelatorioMensal();
    		
    		
    		/*Cria uma instancia da classe Calendar, pegando a data atual no sistema
    		 * no formato TIME ZONE e posteriormente pegando o último dia do mês com 
    		 * base nas informções da data pega no sistema*/
    		Calendar cal = GregorianCalendar.getInstance();
    		cal.setTime(new Date());
    		int ultDia = cal.getActualMaximum( Calendar.DAY_OF_MONTH );

    		/*Cria uma instancia da classe Calendar, pegando a data atual no sistema
    		 * no formato TIME ZONE e posteriormente pegando a data atual */
    		Calendar dataAtual = Calendar.getInstance(); 
    		dataAtual.setTime(new Date());
    		int hoje = dataAtual.get(Calendar.DAY_OF_MONTH);
    		
    		
    		/*Pega as informações primeiro dia do mês, mês e ano com base numa data pega do sistema
    		 *já convertendo-as em String para depois juntar as informções no formato ISO YYYY-MM-DD*/
    		Calendar cal_2 = GregorianCalendar.getInstance();
    		cal_2.setTime(new Date());
    		String priDia = Integer.toString(cal.getActualMinimum( Calendar.DAY_OF_MONTH ));
    		String priMes = Integer.toString(cal_2.get(Calendar.MONTH) + 1);
    		String priAno = Integer.toString(cal_2.get(Calendar.YEAR));
    		String dataPriFormat = priAno + "-" + priMes + "-" + priDia;		

    		/*Pega a último dia do mêse convertendoe em String para depois
    		 *  juntar as informções no formato ISO YYYY-MM-DD*/
    		String ultimoDia = Integer.toString(ultDia);
    		String dataUltFormat = priAno + "-" + priMes + "-" + ultimoDia;		

    		/*Cria uma lista de objetos com base na classe Relatorio Mensal*/
    		List<RelatorioMensal> listaDeRelatorios = null;
    		
    		/*Verifica se já tem um relatório do mesmo mês no BD*/
    		RelatorioMensal relatoriobd = jdbcRelatorio.buscaRelatorio(priMes, priAno);
    		
    		/*Verifica se o relatório daquele mês é nulo*/
    		if(relatoriobd.getMes() == null){
    				
    			/*Método que armazena em uma lista objetos de relatórios*/
				listaDeRelatorios = jdbcRelatorio.agrupaRelatorios(priAno);
    			
    		}else{

    			/*Vefirica se o relatório daquele mês já foi gerado, se sim o método agrupa relatórios
    			 * é chamado para pegar os relatórios já cadastrados*/
    			if((relatoriobd.getMes().equals(priMes))&&(relatoriobd.getAno().equals(priAno))) {
    				
    				/*Método que armazena em uma lista objetos de relatórios*/
    				listaDeRelatorios = jdbcRelatorio.agrupaRelatorios(priAno);
    				
    			}else {
    				/*Caso seja o último dia do mês, gera um novo relatório daquele mês,
    				 * e depois agrupa os demais em uma lista*/
    				if(hoje == ultDia) {
    					
    					/*Métodos que contam o número de cadastros e de usuário ativos*/
    					relatorio = jdbcRelatorio.contaCadastros(relatorio, dataPriFormat, dataUltFormat);
    					relatorio = jdbcRelatorio.contaAtivos(relatorio, dataPriFormat, dataUltFormat);
    					
    					/*Gera um novo relatório*/
    					jdbcRelatorio.geraRelatorio(relatorio.getNumeroCadastros(), relatorio.getNumeroVisitas(), priMes, priAno);
    					
    					/*Agrupa os relatórios em uma lista*/
    					listaDeRelatorios = jdbcRelatorio.agrupaRelatorios(priAno);
    				}
    			}
    		}
    		
    		
    		/*Fecha a conexão com o BD*/
    		conec.fecharConexao();
    		
    		/*Converte o hash em JSON para enviar ao FrontEnd*/
    		String json = new Gson().toJson(listaDeRelatorios);
    		
    		/*Configura e manda uma resposta ao FrontEnd*/
    		response.setContentType("application/json");
    		response.setCharacterEncoding("UTF-8");
    		response.getWriter().write(json);
    		
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
    	
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		process(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		process(request, response);
	}

}
