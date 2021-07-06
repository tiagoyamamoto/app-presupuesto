import { PresupuestoService } from 'src/app/services/presupuesto.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-listar-gasto',
  templateUrl: './listar-gasto.component.html',
  styleUrls: ['./listar-gasto.component.css']
})
export class ListarGastoComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  presupuesto: number;
  restante: number;
  listGastos: any[] = [];

  constructor(
    private _presupuestoService: PresupuestoService) {
    this.presupuesto = 0;
    this.restante = 0;
    this.subscription = this._presupuestoService.getGastos().subscribe(data => {
      this.restante = this.restante - data.cantidad;
      this.listGastos.push(data);
      // console.log(data);
    });
  }

  ngOnInit(): void {
    this.presupuesto = this._presupuestoService.presupuesto;
    this.restante = this._presupuestoService.restante;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // tslint:disable-next-line: typedef
  alicarColorRestante() {
    if (this.presupuesto / 4 > this.restante) {
      return 'alert alert-danger';
    } else if (this.presupuesto / 2 > this.restante) {
      return 'alert alert-warning';
    } else {
      return 'alert alert-secondary';
    }
  }

}
