export class ConsommationSectorielle {
    id:number;
	nbrConsom:number;
	  SecteursCom:string;
	  annee:number;
	  periode:string;
	  totalConsom :number;
	  consommationBrut:number;
	  dureeMoy:string;
	  type:string;
	  ConsommationSectorielle(){
		this.nbrConsom=0;
		this.dureeMoy="0";
		this.totalConsom=0;
		this.consommationBrut=0;
	  }
}
