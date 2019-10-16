<template>
  <section class="section">
    <div class="columns">
      <div class="column">
        <h1 class="title is-2">Products</h1>
      </div>

      <form class="column" @submit.prevent="onSearch">
        <div class="field">
          <p class="control has-icons-left has-icons-right">
            <input class="input" type="text" placeholder="Search" v-model="search" />
            <span class="icon is-small is-left">
              <i class="fas fa-search"></i>
            </span>
          </p>
        </div>
      </form>
    </div>

    <transition-group name="fade" v-if="!loading" class="columns is-multiline" tag="div">
      <ProductItem
        class="column is-one-quarter fade-item"
        v-for="product in filteredProducts"
        v-bind:key="product.isbn"
        v-bind:product="product"
      ></ProductItem>
    </transition-group>
    <div v-if="loading">Chargement en cours...</div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { ProductsModule } from '@/store/ProductsModule';
import ProductItem from '../components/Product.vue';

@Component({
  components: {
    ProductItem
  }
})
export default class Products extends Vue {
  public get loading() {
    return ProductsModule.loading;
  }

  public search: string = '';

  public get filteredProducts() {
    return this.search
      ? ProductsModule.items.filter((item) => item.title.toLowerCase().includes(this.search.toLowerCase()))
      : ProductsModule.items;
  }

  private created() {
    ProductsModule.fetchProducts();
  }
}
</script>

<style lang="scss" scoped>
.fade-item {
  backface-visibility: hidden;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease-out;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>