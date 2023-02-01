import Signal from './signal';

export interface StateData {}

export enum StateOptions {}

export class State {
  private _data: StateData;
  public onUpdate: Signal<StateOptions> = new Signal();
  constructor(initialState: StateData) {
    this._data = initialState;
  }
}
