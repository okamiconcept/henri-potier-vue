<template>
  <section class="section">
    <h1 class="title is-2">Your cart</h1>

    <table v-if="count" class="table is-hoverable is-fullwidth">
      <thead>
        <tr>
          <th>
            <abbr title="Product">Product</abbr>
          </th>
          <th class="has-text-centered">
            <abbr title="Quantity">Quantity</abbr>
          </th>
          <th class="has-text-right">
            <abbr title="Price">Unit Price</abbr>
          </th>
          <th class="has-text-right">
            <abbr title="Total Price">Total Price</abbr>
          </th>
          <th></th>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <th></th>
          <th></th>
          <th class="has-text-right">Total before reduction</th>
          <th class="has-text-right">{{ total.toFixed(2) }} €</th>
          <th></th>
        </tr>
        <tr>
          <th></th>
          <th></th>
          <th class="has-text-right">
            Reduction
            {{ reduction ? reduction.offer.type : '' }}
          </th>
          <th class="has-text-right">
            {{ (reduction ? reduction.amount : 0).toFixed(2) }}
            €
          </th>
          <th></th>
        </tr>
        <tr>
          <th></th>
          <th></th>
          <th class="has-text-right">Total</th>
          <th class="has-text-right">
            {{ (total - (reduction ? reduction.amount : 0)).toFixed(2) }}
            €
          </th>
          <th></th>
        </tr>
      </tfoot>
      <tbody>
        <tr v-for="item in items" v-bind:key="item.isbn">
          <th>{{ item.product.title }}</th>
          <td>
            <div class="buttons has-addons is-centered">
              <button class="button" @click="changeQuantity(item, -1)">
                <span class="icon is-small">
                  <i class="fas fa-minus-square"></i>
                </span>
              </button>
              <span class="button">{{ item.quantity }}</span>
              <button class="button" @click="changeQuantity(item, 1)">
                <span class="icon is-small">
                  <i class="fas fa-plus-square"></i>
                </span>
              </button>
            </div>
          </td>
          <td class="has-text-right">{{ item.product.price.toFixed(2) }} €</td>
          <td class="has-text-right">{{ (item.product.price * item.quantity).toFixed(2) }} €</td>
          <td class="has-text-right">
            <button class="button is-danger" @click="deleteItem(item)">
              <span class="icon is-small">
                <i class="fas fa-trash-alt"></i>
              </span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="count === 0">Your cart is empty.</div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Order, OrderItem } from '@/store/OrderModel';
import { OrderModule } from '@/store/OrderModule';

@Component
export default class Cart extends Vue {
  public get count() {
    return OrderModule.count;
  }

  public get items() {
    return OrderModule.items;
  }

  public get reduction() {
    return OrderModule.reduction;
  }

  public get total() {
    return OrderModule.total;
  }

  public deleteItem(item: OrderItem) {
    OrderModule.deleteOrderItem(item);
  }

  public changeQuantity(item: OrderItem, quantity: number) {
    OrderModule.changeQuantityOrderItem({ orderItem: item, quantity });
  }
}
</script>