import { Component, OnInit, Output, Input, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtProgress', {static: true}) txtProgress: ElementRef;
  @Input() leyenda: string = 'Leyenda';
  @Input() porcentaje: number = 50;

  @Output() cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  cambiarValor( valor: number ) {

    if (this.porcentaje >= 100 && valor === 5) {
      this.porcentaje = 100;
      this.cambioValor.emit( this.porcentaje );
      return;
    }

    if (this.porcentaje <= 0 && valor === -5) {
      this.porcentaje = 0;
      this.cambioValor.emit( this.porcentaje );
      return;
    }

    this.porcentaje += valor;

    if (this.porcentaje < 0) {
      this.porcentaje = 0;
    } else if ( this.porcentaje > 100) {
      this.porcentaje = 100;
    }

    this.cambioValor.emit( this.porcentaje );
  }

  onChange( event: number ) {


     console.log();

     if ( event <= 0 ) {
      this.porcentaje = 0;
    } else if (event >= 100) {
      this.porcentaje = 100;
    } else {
      this.porcentaje = event;
    }

     this.txtProgress.nativeElement.value = this.porcentaje;
     this.cambioValor.emit( this.porcentaje );
  }

}
