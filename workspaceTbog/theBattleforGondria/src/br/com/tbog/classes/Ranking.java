package br.com.tbog.classes;

import java.util.List;

public class Ranking {

	public Pontuacao formataRanking(List<Pontuacao> listUsu) {
		// TODO Auto-generated method stub
		Pontuacao pon = new Pontuacao();
		int pontuacaototal = 0;
		int[] total = {0 , 0, 0 };
		for(int i = 0; i<listUsu.size();i++) {
			pontuacaototal = pontuacaototal + Integer.parseInt(listUsu.get(i).getPontuacao());
			int[] time = formataTempo(listUsu.get(i).getTempo());
			total= somaTempo(time,total);			
			pon.setUsuario(listUsu.get(i).getUsuario());
		}
		String tempoFinal = formataTime(total);
		pon.setTempo(tempoFinal);
		pon.setPontuacao(Integer.toString(pontuacaototal));
		pon.setFase("0");
		return pon;
	}

	private String formataTime(int[] total) {
		// TODO Auto-generated method stub
		String[] tempoS = {"","",""};
		for(int i =0;i<total.length;i++) {
			if(((i==0)||(i==1))&&total[i]<10) {
				tempoS[i]= "0"+Integer.toString(total[i]);
			}else {
				tempoS[i]= Integer.toString(total[i]);				
			} 
			
		}
		String tempo = tempoS[0]+":"+tempoS[1]+":"+tempoS[2];
		return tempo;
	}

	private int[] somaTempo(int[] time, int[] total) {
		// TODO Auto-generated method stub
		int[] tempo = {0,0,0};
		for(int u = 2; u>=0;u--) {
			if(u!=0) {
			if(time[u]+total[u]>60) {				
				total[u-1] =total[u-1]+1;
				total[u]=total[u]-60;
			}
			}
			
		tempo[u]= time[u]+total[u];
		}
		return tempo;
		
	}

	private int[] formataTempo(String tempo) {
		// TODO Auto-generated method stub
		String[] tempos = tempo.split(":");
		int[] time = {0,0,0};
		for(int i =0 ; i<tempos.length;i++) {
			time[i]=Integer.parseInt(tempos[i]); 
		}
		return time;
	}

}
