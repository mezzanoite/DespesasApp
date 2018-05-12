import { Injectable } from '@angular/core';
import { Despesa } from './despesa';
import { LocalStorageService } from 'angular-2-local-storage';

@Injectable({
  providedIn: 'root'
})
export class DespesaService {
  private desepesas: Despesa[] = new Array();

  constructor(private localStorageService: LocalStorageService) { }

  getDb(): void {
    this.desepesas = [];
    if (this.localStorageService.get("despesas") != null) {
        this.desepesas = <Despesa[]> JSON.parse(<string>this.localStorageService.get("despesas"));
    }
  }

  public getAll(): Despesa[] {
    this.getDb();
    return this.desepesas;
  }

  public save(despesa: Despesa): void {
    this.getDb();
    this.desepesas.push(despesa)
    this.localStorageService.set("despesas", JSON.stringify(this.desepesas));
  }

  public delete(despesaId: number): void {
    for (var i=0; i < this.desepesas.length; i++) {
      if (this.desepesas[i].id == despesaId) {
        this.desepesas.splice(i, 1);
      }
    }
    this.localStorageService.set("despesas", JSON.stringify(this.desepesas));
  }
}
