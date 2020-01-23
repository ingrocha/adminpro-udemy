import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrums',
  templateUrl: './breadcrums.component.html',
  styles: []
})
export class BreadcrumsComponent implements OnInit {

  titulo = '';

  constructor( private router: Router , private title: Title, meta: Meta ) {
    this.getDataRoute().subscribe( evento => {
      console.log(evento);
      this.titulo = evento.titulo;
      title.setTitle(this.titulo);
      const metatTag: MetaDefinition = {
        name: 'description',
        content: this.titulo
      };

      meta.updateTag( metatTag );
    });

   }

  ngOnInit() {
  }

  getDataRoute(){
    return this.router.events.pipe(
      filter( resp => resp instanceof ActivationEnd ),
      filter( (resp: ActivationEnd) => resp.snapshot.firstChild === null ),
      map( (evento: ActivationEnd) => evento.snapshot.data)
    );
  }

}
