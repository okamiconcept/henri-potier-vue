import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import { Product } from './ProductModel';
import store from './store';

export interface ProductsState {
  count: number;
  loading: boolean;
  items: Product[];
}

@Module({ namespaced: true, dynamic: true, name: 'products', store })
class Products extends VuexModule implements ProductsState {
  public count = 0;
  public loading = true;
  public items: Product[] = [];
  private apiURL = 'http://henri-potier.xebia.fr';

  @Mutation
  public setLoading(value: boolean) {
    this.loading = value;
  }

  @Mutation
  public setItems(items: Product[]) {
    this.items = items;
  }

  @Action
  public async fetchProducts() {
    this.setLoading(true);
    const route = '/books';
    const response = await fetch(this.apiURL + route);

    this.setItems(await response.json());
    this.setLoading(false);
  }
}

export const ProductsModule = getModule(Products);
