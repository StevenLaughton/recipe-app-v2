import {environment} from "../environments/environment";

export interface BaseServiceOptions {
  controller: string;
}

export class BaseService {
  private readonly _controller: string = null;

  constructor({controller}: BaseServiceOptions) {
    this._controller = controller;
  }

  protected url(route: string): string {
    return `${environment.apiUrl}/${this._controller}/${route}`;
  }
}
