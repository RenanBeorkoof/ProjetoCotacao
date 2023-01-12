import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { interval } from 'rxjs';
import { CotaService } from 'src/app/shared/service/cota.service';
import {MatTableDataSource} from '@angular/material/table';

export interface PeriodicElement {
  Valor: string;
  Data:  string;
  Diferenca: string;
}

interface DadosCota {
  usd : string;
  brl : string;
  real : string;
  hora : string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements AfterViewInit{
  displayedColumns: string[] = ['Data', 'Valor', 'Diferenca'];
  lista : PeriodicElement[] = [];
  dataSource = new MatTableDataSource(this.lista);
  dadoscota?: DadosCota;

  constructor(
    public cotaService: CotaService,
  ){}

  @ViewChild(MatSort) sort: MatSort = new MatSort();

  ngAfterViewInit() {
    this.getCota();
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {}

  fetchCota(){
    this.cotaService.getCotacao().subscribe(data => {
      this.dadoscota = {
        usd : data.USDBRL.code,
        brl : data.USDBRL.codein,
        real : parseFloat(data.USDBRL.ask).toFixed(2),
        hora : data.USDBRL.create_date
      }
      console.log(this.dadoscota);
    });
  }

  getCota(){
    this.fetchCota();
    const secondsCounter = interval(30000);
    secondsCounter.subscribe(n =>{
    var olddata : PeriodicElement = {
      Data : this.dadoscota?.hora || "vazio",
      Valor : this.dadoscota?.real || "vazio2",
      Diferenca: "",
    }

    this.fetchCota();
    olddata.Diferenca = (parseFloat(olddata.Valor) - parseFloat(this.dadoscota?.real || "0")).toFixed(2);
      this.lista = [olddata,...this.lista];
      this.dataSource.data = this.lista; 
      this.dataSource.sort = this.sort;
    }); 
  }
}
