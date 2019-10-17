import Vue from 'vue';
import Vuex from 'vuex';
import { OrderState } from './OrderModule';
import { ProductsState } from './ProductsModule';

export interface IRootState {
  order: OrderState;
  products: ProductsState;
}

Vue.use(Vuex);

const store = new Vuex.Store<IRootState>({});

store.subscribe((mutation, state) => {
  localStorage.setItem('hpv-order', JSON.stringify(state.order));
});

export default store;
