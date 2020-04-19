import { Component } from '@angular/core';
import { timer } from 'rxjs';
import * as _ from 'lodash';
import { Breadth } from './Classes/Breadth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Breadth first search';
  numberOrder: any = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  history = [];
  constructor(
  ) {}

  get randomColor() {
    const x = Math.floor(Math.random() * 256);
    const y = Math.floor(Math.random() * 256);
    const z = Math.floor(Math.random() * 256);
    return `rgb(${x},${y},${z})`;
  }

  orden() {
    const order = prompt('Ingresa el orden y el espacio vacio como 0 (ejem: 01234..)');
    if (order.length !== 9) {
      alert('El Puzzle no esta lleno');
    } else {
      const aux = order.split('');
      if (aux.includes('0')) {
        _.forEach(aux, (value, index) => this.numberOrder[index] = parseInt(value));
      } else {
        alert('No se encontro el espacio en blanco, vuelve a intentarlo');
      }
    }
  }
  resolver() {
    const time = timer(2000);
    this.history = [];
    const aux = new Breadth();
    if (aux.checkSolvable(this.numberOrder)) {
      aux.breadthFirstSearch(this.numberOrder);
      const solution = aux.getSolution();
      _.forEach(solution, (value) => {
        time.subscribe(() => {
          this.numberOrder = value;
          this.history.push(value);
        });
      });
    } else {
      alert('no se encontro una solución, prueba otra combinacion');
    }
  }
}
