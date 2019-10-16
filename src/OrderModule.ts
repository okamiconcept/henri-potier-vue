import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import { OrderItem } from './OrderModel';
import { CommercialOffer, Product } from './ProductModel';
import store from './store';

export interface OrderState {
  count: number;
  total: number;
  items: OrderItem[];
  reduction: { offer: CommercialOffer; amount: number } | null;
  offers: CommercialOffer[];
}

@Module({ namespaced: true, dynamic: true, name: 'order', store })
class Order extends VuexModule implements OrderState {
  public count = 0;
  public total = 0;
  public items: OrderItem[] = [];
  public reduction: { offer: CommercialOffer; amount: number } | null = null;
  public offers: CommercialOffer[] = [];

  @Mutation
  public setItems(items: OrderItem[]) {
    this.items = items;
    this.count = this.items.reduce((value, item) => value + item.quantity, 0);
    this.total = this.items.reduce((value, item) => value + item.quantity * item.product.price, 0);
  }

  @Action({ rawError: true })
  public addProductToOrder(value: { product: Product; quantity: number }) {
    const items = [...this.items];

    const productInOrder = items.find((orderItem) => orderItem.product.isbn === value.product.isbn);

    if (productInOrder) {
      productInOrder.quantity++;
    } else {
      items.push({
        id: value.product.isbn,
        ...value
      });
    }

    this.setItems(items);
  }

  @Action
  public deleteOrderItem(orderItem: OrderItem) {
    let items = [...this.items];

    items = items.filter((oi) => oi.id !== orderItem.id);

    this.setItems(items);
  }

  @Action
  public changeQuantityOrderItem(value: { orderItem: OrderItem; quantity: number }) {
    let items = [...this.items];

    const orderItemInOrder = items.find((oi) => oi.id === value.orderItem.id);

    if (orderItemInOrder) {
      orderItemInOrder.quantity += value.quantity;

      if (orderItemInOrder.quantity <= 0) {
        items = items.filter((oi) => oi.id !== value.orderItem.id);
      }
    }

    this.setItems(items);
  }

  private calculateReductionForOffer(order: Order, offer: CommercialOffer) {
    switch (offer.type) {
      case 'percentage': {
        return order.total * (offer.value / 100);
      }
      case 'minus': {
        return offer.value;
      }
      case 'slice': {
        const nbSlice = Math.floor(order.total / offer.sliceValue);
        return nbSlice * offer.value;
      }
    }
  }

  private calculateBestReduction(order: Order, offers: CommercialOffer[]) {
    return offers
      .map((offer) => ({ offer, amount: this.calculateReductionForOffer(order, offer) }))
      .sort((a, b) => (a.amount < b.amount ? 1 : -1))[0];
  }
}

export const OrderModule = getModule(Order);
