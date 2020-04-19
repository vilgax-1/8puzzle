export class Breadth {
  solution: any;
  hash = {};
  values = new Array(100000000);
  size = 0;
  puzzle: any;
  goalState = [1, 2, 3, 4, 5 , 6, 7, 8, 0 ];

  constructor() {}

  move(state, successors, pos, steps) {
    let newState;
    newState = state.slice();
    this.swap(newState, pos, pos + steps);
    return newState;
  }

  hashState(state) {
    let hash = 0;
    for (let i = 0; i < state.length; i++) {
      hash += state[i] * Math.pow(state.length, i);
    }
    return hash;
  }

  getSuccessors(state) {
    let newState;
    let stateAux;
    const successors = [];
    const pos = state.indexOf(0);
    const row = Math.floor(pos / 3);
    const col = pos % 3;
    if (row > 0) {
      newState = this.move(state, successors, pos, -3);
      if (!this.compare(newState, state.prev)) {
        stateAux = this.hashState(newState);
        if (typeof this.hash[stateAux] === 'undefined') {
          this.hash[stateAux] = newState;
          newState.prev = state;
          successors.push(newState);
        }
      }
    }
    if (col > 0) {
      newState = this.move(state, successors, pos, -1);
      if (!this.compare(newState, state.prev)) {
        stateAux = this.hashState(newState);
        if (typeof this.hash[stateAux] === 'undefined') {
          this.hash[stateAux] = newState;
          newState.prev = state;
          successors.push(newState);
        }
      }
    }
    if (row < 2) {
      newState = this.move(state, successors, pos, 3);
      if (!this.compare(newState, state.prev)) {
        stateAux = this.hashState(newState);
        if (typeof this.hash[stateAux] === 'undefined') {
          this.hash[stateAux] = newState;
          newState.prev = state;
          successors.push(newState);
        }
      }
    }
    if (col < 2) {
      newState = this.move(state, successors, pos, 1);
      if (!this.compare(newState, state.prev)) {
        stateAux = this.hashState(newState);
        if (typeof this.hash[stateAux] === 'undefined') {
          this.hash[stateAux] = newState;
          newState.prev = state;
          successors.push(newState);
        }
      }
    }
    return successors;
  }

  swap(state, from, to) {
    const aux = state[from];
    state[from] = state[to];
    state[to] = aux;
  }

  collateStates(i) {
    let _ = this.values[i].prev;
    const result = [this.values[i]];
    while (_) {
      for (let j = 0; j < this.size; j++) {
        if (this.compare(_, this.values[j])) {
          _ = this.values[j].prev;
          result.push(this.values[j]);
          break;
        }
      }
    }
    return result.reverse();
  }

  breadthFirstSearch(state) {
    this.values = new Array(1000000);
    state.prev = null;
    this.values[0] = state;
    this.size++;
    for (let i = 0; i < this.size; i++) {
      if (this.compare(this.goalState, this.values[i])) {
        this.solution = this.collateStates(i);
        return this.collateStates(i);
      } else {
        const successorsAux = this.getSuccessors(this.values[i]);
        for (let k = 0; k < successorsAux.length; k++) {
          this.values[this.size] = successorsAux[k];
          this.size++;
        }
      }
    }
  }

  compare(arr1, arr2) {
    if (!arr1 || !arr2) {
      return false;
    }
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }
    return true;
  }

  getSolution() {
    return this.solution;
  }

  checkSolvable(state) {
    const pos = state.indexOf(0);
    const stateAux = state.slice();
    stateAux.splice(pos, 1);
    let count = 0;
    for (let i = 0; i < stateAux.length; i++) {
      for (let j = i + 1; j < stateAux.length; j++) {
        if (stateAux[i] > stateAux[j]) {
          count++;
        }
      }
    }
    return count % 2 === 0;
  }
}
