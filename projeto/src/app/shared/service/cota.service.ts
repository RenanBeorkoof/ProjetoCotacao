import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseCotacao} from '../model/USDBRL.model';

@Injectable({
  providedIn: 'root'
})

export class CotaService {
  apiUrl = 'https://economia.awesomeapi.com.br/last/USD-BRL'

  constructor(  
    private httpClient: HttpClient
  ){}

  public getCotacao(): Observable<ResponseCotacao> {
    
    return this.httpClient.get<ResponseCotacao>(this.apiUrl);
  }
}
