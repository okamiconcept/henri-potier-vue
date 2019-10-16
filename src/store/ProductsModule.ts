import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import { Product } from './ProductModel';
import { fetchProducts } from './ProductsApi';
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
    const products = await fetchProducts();

    this.setItems(products);
    this.setLoading(false);
  }
}

export const ProductsModule = getModule(Products);
