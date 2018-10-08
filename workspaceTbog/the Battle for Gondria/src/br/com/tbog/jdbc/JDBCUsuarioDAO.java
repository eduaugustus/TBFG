package br.com.tbog.jdbc;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import br.com.tbog.classes.Criptografia;
import br.com.tbog.classes.Pontuacao;
import br.com.tbog.classes.Ranking;
import br.com.tbog.classes.Usuario;
import br.com.tbog.jdbcinterfaces.UsuarioDAO;

public class JDBCUsuarioDAO implements UsuarioDAO {

	private Connection conexao;
	
	public JDBCUsuarioDAO(Connection conexao) {
		this.conexao = conexao;
	}
	
	public void adicionaVisita(Usuario usuariobd){
		Date dataLogin = new Date(); 
		String ultimoLogin = usuariobd.converteDateParaStringISO(dataLogin);
		String comando = "UPDATE usuarios SET ultimo_login = '" + ultimoLogin + "'";
		comando += " WHERE apelido = '" + usuariobd.getApelido() + "'";
		
		try {
			Statement stmt = conexao.createStatement(); 
			stmt.executeUpdate(comando);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/*M�todo que ir� buscar as informa��es de um usu�rio com o apelido do mesmo*/
	public Usuario buscarPorUsuario(Usuario usuarioFront) {
		String comando = "SELECT * FROM usuarios WHERE apelido =? OR email = ?";
		Usuario usuariobd = new Usuario();
		PreparedStatement p;
		try {
			p = this.conexao.prepareStatement(comando);
			p.setString(1, usuarioFront.getApelido());
			p.setString(2,usuarioFront.getEmail());
			ResultSet rs = p.executeQuery();
			while (rs.next()) {
				String id = rs.getString("id")	;			
				String apelido = rs.getString("apelido");
				String nome = rs.getString("nome");
				String nascimento = usuariobd.converteNascimentoParaFrontend(rs.getString("data_nascimento"));
				String email = rs.getString("email");
				String senha = rs.getString("senha");
				String permissao = rs.getString("permissao");
				usuariobd.setId(id);
				usuariobd.setNome(nome);
				usuariobd.setApelido(apelido);
				usuariobd.setSenha(senha);
				usuariobd.setEmail(email);
				usuariobd.setNascimento(nascimento);
				usuariobd.setPermissao(permissao);
				
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		return usuariobd;
	}
	

	/*M�todo que ir� inserir um usu�rio dentro do BD*/
	public boolean inserir(Usuario usuario) {
			
			String comando = "INSERT INTO usuarios (nome, apelido, data_nascimento, email, senha, data_cadastro, permissao)"; 
			comando += "VALUES (?,?,?,?,?,?,?)";
			PreparedStatement p;
			try {
				p = this.conexao.prepareStatement(comando);
				p.setString(1, usuario.getNome());
				p.setString(2, usuario.getApelido());
				p.setString(3, usuario.getNascimento());
				p.setString(4, usuario.getEmail());
				p.setString(5, Criptografia.criptografaSenha(usuario.getSenha()));
				p.setString(6, usuario.getDataCadastro());
				p.setString(7, usuario.getPermissao());
				p.execute();
			} catch (SQLException e) {
				e.printStackTrace();
				return false;
			}
			return true;
		}
	
	public List<Usuario> buscarUsuarios(String login, String permissao){
		List<Usuario> listaDeUsuarios= new ArrayList<Usuario>();
		String comando = "SELECT * FROM usuarios WHERE apelido LIKE ? AND permissao = ?";
		String logindb= "%"+login+"%";
		try {
			PreparedStatement p = conexao.prepareStatement(comando);
			p.setString(1, logindb);
			p.setString(2, permissao);
			ResultSet rs  = p.executeQuery();
			while(rs.next()) {
				Usuario usuario =new Usuario();
				usuario.setApelido(rs.getString("apelido"));
				usuario.setId(rs.getString("id"));
				usuario.setEmail(rs.getString("email"));
				usuario.setNome(rs.getString("nome"));
				usuario.setNascimento(usuario.converteNascimentoParaFrontend(rs.getString("data_nascimento")));
				usuario.setPermissao(rs.getString("permissao"));
				usuario.setDataCadastro(usuario.converteNascimentoParaFrontend(rs.getString("data_cadastro")));
				listaDeUsuarios.add(usuario);
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		return listaDeUsuarios;
	}
	


	public List<Pontuacao> consultaRanking(String fase) {
		// TODO Auto-generated method stub
		List<Pontuacao> listaPon = new ArrayList<Pontuacao>();
		int fasebd= Integer.parseInt(fase);
		String comando="SELECT  usuarios.apelido , pontuacoes.pontuacao,pontuacoes.tempo FROM usuarios, "
				+ "pontuacoes WHERE usuarios.id = pontuacoes.usuarios_id AND fase= ? ORDER BY usuarios.apelido ASC" ;
		if(fasebd>0) {
		try {
			PreparedStatement p = this.conexao.prepareStatement(comando);
			p.setInt(1, fasebd);
			ResultSet rs = p.executeQuery();
			while(rs.next()) {
				Pontuacao pon = new Pontuacao();
				pon.setPontuacao(rs.getString("pontuacao"));
				pon.setTempo(rs.getString("tempo"));
				pon.setUsuario(rs.getString("apelido"));
				listaPon.add(pon);
			}
			return listaPon;
		}catch(Exception e) {
				e.printStackTrace();
			}
		}else {
			String sql1= "SELECT  usuarios.apelido , pontuacoes.pontuacao, pontuacoes.tempo, pontuacoes.usuarios_id FROM usuarios, pontuacoes WHERE usuarios.id = pontuacoes.usuarios_id";
			try {
				PreparedStatement p = this.conexao.prepareStatement(sql1);
				ResultSet rs = p.executeQuery();
				while(rs.next()) {
					Pontuacao pon = new Pontuacao();
					pon.setPontuacao(rs.getString("pontuacao"));
					pon.setTempo(rs.getString("tempo"));
					String apel = rs.getString("apelido");
					if(apel==null) {
						apel="";
					}
					pon.setUsuario(apel);
					pon.setId(Integer.toString(rs.getInt("usuarios_id")));
					listaPon.add(pon);
				}
			String sql = "select * from usuarios where id = (select max(id) from usuarios);";
			Statement stmt = conexao.createStatement();
			ResultSet ru= 	stmt.executeQuery(sql);
			ru.next();
			int numeroUsuarios = ru.getInt("id");
			List<Pontuacao> listaFinal = new ArrayList<Pontuacao>();
			for(int i = 0 ; i<numeroUsuarios;i++) {
				List<Pontuacao> listUsu  = new ArrayList<Pontuacao>();
				int id = i+1;
				for(int u = 0 ; u<listaPon.size();u++) {
					if(listaPon.get(u).getId().equals(Integer.toString(id))) {
						Pontuacao po = listaPon.get(u);			
						listUsu.add(po);
					}
				}
				Ranking rg = new Ranking();
				Pontuacao pn = rg.formataRanking(listUsu);
				listaFinal.add(pn);
			}
			return listaFinal;
			}catch(Exception e) {
				e.printStackTrace();
				}
			}
		return listaPon;
	}


	public boolean inserePontuacao(String fase, String pontuacao, Usuario usuario, String tempo) {
		// TODO Auto-generated method stub
		String sql = "SELECT * FROM pontuacoes as p , usuarios as u WHERE p.fase = ? AND p.usuarios_id=?";
		try {
			PreparedStatement p = this.conexao.prepareStatement(sql);
			p.setString(1, fase);
			p.setString(2, usuario.getId());
			ResultSet rs =p.executeQuery();
			if(rs.next()) {				
				if(Integer.parseInt(rs.getString("pontuacao"))<Integer.parseInt(pontuacao)) {
					String sqlu = "UPDATE pontuacoes  SET pontuacao = "+pontuacao+ " ,tempo = '"+tempo+"' WHERE usuarios_id = "+usuario.getId()+" AND fase="+fase; 
					Statement stmt = this.conexao.createStatement();
					stmt.executeUpdate(sqlu);
					return true;
				}else {
					return false;
				}
			}else {
				String comando = "INSERT INTO pontuacoes (fase,pontuacao,usuarios_id,tempo) VALUES(?,?,?,?)";
				PreparedStatement ps= this.conexao.prepareStatement(comando);
				ps.setString(1, fase);
				ps.setString(2, pontuacao);
				ps.setInt(3, Integer.parseInt(usuario.getId()));
				ps.setString(4, tempo);
				int count = ps.executeUpdate();
				if (count > 0){
					return true; 
				}else {
					return false;
				}
			}
		}catch(Exception e ) {
			e.printStackTrace();
		}
		
		try {
		}catch(Exception e) {
			e.printStackTrace();
		}
		return false;
	}
	
	public boolean atualizarUsuario(Usuario usuarioFrontEnd) {
		
		String comando = "UPDATE usuarios SET senha=?, nome=?, data_nascimento=?, email=?";
		comando += " WHERE id=?";
		PreparedStatement p;
		try {
			p = this.conexao.prepareStatement(comando);
			p.setString(1, Criptografia.criptografaSenha(usuarioFrontEnd.getSenha()));
			p.setString(2, usuarioFrontEnd.getNome());
			p.setString(3, usuarioFrontEnd.getNascimento());
			p.setString(4, usuarioFrontEnd.getEmail());
			p.setString(5, usuarioFrontEnd.getId());
			p.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
		return true;
}


	public void novaSenha(Usuario usuariobd) {
		String sql = "UPDATE usuarios SET senha='"+usuariobd.getSenha()+"' WHERE id="+usuariobd.getId();
		try {
			Statement stmt= conexao.createStatement();
			stmt.executeUpdate(sql);
		}catch(Exception e){
			e.printStackTrace();
		}
	}
	
	public boolean deletaUsuario(Usuario usuario) {
		String ranking = "DELETE FROM pontuacoes WHERE usuarios_id = ?";
		try{
			PreparedStatement p = conexao.prepareStatement(ranking);
			p.setString(1,usuario.getId());
			p.execute();
		}catch(Exception e){
			e.printStackTrace();
			return false;
		}
		
		String comando = "DELETE FROM USUARIOS WHERE id = ?";
		try{
		PreparedStatement p = conexao.prepareStatement(comando);
		p.setString(1,usuario.getId());
		p.execute();
		}catch(Exception e){
			e.printStackTrace();
			return false;
		}
		return true;
	}
	
	/*Fase que busca a última fase do jogador*/
	public String buscaUltimaFase(Usuario usuario){
		
		String queryFase = "SELECT MAX(fase) AS `faseParada` FROM pontuacoes WHERE usuarios_id = '"+usuario.getId()+"' ";
		
		String faseParada = "0"; 
		
		try{
			Statement stmt = conexao.createStatement();
			ResultSet rs = stmt.executeQuery(queryFase);
			
			/*Instrução que verifica se há alguma linha no Data Table, caso exista
			 * pega as informações existentes*/
			while(rs.next()) {

				/*Variável que são colocadas as informações da consulta*/
				faseParada = rs.getString("faseParada");

			}
			
		}catch(Exception e){
			e.printStackTrace();
		}
		
		if(faseParada == null){
			faseParada = "0";
		}
		
		return faseParada;
	}

	public Pontuacao buscaPontuacaoPorFase(String fase, String usuarioId) {
		
		Pontuacao pontuacaobd = new Pontuacao();
		String queryBuscaPontFase = "SELECT * FROM `pontuacoes` WHERE usuarios_id =? AND fase =?";
		
		try {
			PreparedStatement p = conexao.prepareStatement(queryBuscaPontFase);
			p.setString(1, usuarioId);
			p.setString(2, fase);
			ResultSet rs = p.executeQuery();
			
			while(rs.next()) {
				
				pontuacaobd.setId(rs.getString("id"));
				pontuacaobd.setFase(rs.getString("fase"));
				pontuacaobd.setPontuacao(rs.getString("pontuacao"));
				pontuacaobd.setTempo(rs.getString("tempo"));
				pontuacaobd.setUsuario(rs.getString("usuarios_id"));
				
			}
			
			
		}catch(Exception e) {
			e.printStackTrace();
		}
		
		return pontuacaobd;
	}

	public void cadastraNovaPontucao(Pontuacao pontuacao) {
			
		String insertPontuacao = "INSERT INTO pontuacoes(tempo, pontuacao, fase, usuarios_id)"
				+ " VALUES (?,?,?,?)";
		
		try {
			PreparedStatement p = conexao.prepareStatement(insertPontuacao);
			p.setString(1, pontuacao.getTempo());
			p.setString(2, pontuacao.getPontuacao());
			p.setString(3, pontuacao.getFase());
			System.out.println(pontuacao.getUsuario());
			p.setString(4, pontuacao.getUsuario());
			p.execute();
			
		}catch(Exception e) {
			e.printStackTrace();
		}
		
	}
	
	public int formataTempoParaSegundos(String tempo) {
		
		String[] tempoSeparado = tempo.split(":");
		
		int horas = Integer.parseInt(tempoSeparado[0]);
		int minutos = Integer.parseInt(tempoSeparado[1]);
		int segundos = Integer.parseInt(tempoSeparado[2]);
		
		int segundosSoma = (horas * 3600) + (minutos * 60) + segundos;
		
		return segundosSoma;
	}

	public void atualizaPontuacao(Pontuacao pontuacao) {
		String updatePontuacao = "UPDATE pontuacoes SET tempo=?, pontuacao=? WHERE usuarios_id =? AND fase =?";
		try {
			PreparedStatement p = conexao.prepareStatement(updatePontuacao);
			p.setString(1, pontuacao.getTempo());
			p.setString(2, pontuacao.getPontuacao());
			p.setString(3, pontuacao.getUsuario());
			p.setString(4, pontuacao.getFase());
			p.executeUpdate();
			
		}catch(Exception e) {
			e.printStackTrace();
		}
	}
	
	

}
