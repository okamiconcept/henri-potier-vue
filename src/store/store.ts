import Vue from 'vue';
import Vuex from 'vuex';
import { OrderState } from './OrderModule';
import { ProductsState } from './ProductsModule';

export interface IRootState {
  order: OrderState;
  products: ProductsState;
}

Vue.use(Vuex);

export default new Vuex.Store<IRootState>({});
