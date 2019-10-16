<template>
  <div>
    <div class="card" v-if="productData">
      <div class="card-image">
        <figure class="image is-3by4">
          <img v-bind:src="productData.cover" v-bind:alt="productData.title" />
        </figure>
      </div>
      <div class="card-content">
        <div class="media">
          <div class="media-content">
            <p class="title is-4">{{ productData.title }}</p>
            <p class="subtitle is-6">
              {{ productData.price.toFixed(2) }} €
              <button
                class="button is-info is-pulled-right"
                @click="addToOrder()"
              >
                <span class="icon">
                  <i class="fas fa-cart-arrow-down"></i>
                </span>
                <span>Add to cart</span>
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { mapState } from 'vuex';
import { Order } from '@/store/OrderModel';
import { OrderModule } from '@/store/OrderModule';
import { Product } from '@/store/ProductModel';

@Component
export default class ProductItem extends Vue {
  @Prop({ default: null })
  public readonly product!: Product;

  public productData: Product = this.product;

  public addToOrder() {
    OrderModule.addProductToOrder({ product: this.productData, quantity: 1 });
  }
}
</script>
