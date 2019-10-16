<template>
  <header>
    <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <router-link class="navbar-item" to="/">HENRI POTIER</router-link>

        <a
          role="button"
          class="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
          <router-link to="/products" class="navbar-item">Products</router-link>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <router-link
                class="button is-info badge has-badge-rounded has-badge-danger"
                v-bind:data-badge="this.count"
                to="/cart"
              >
                <span class="icon">
                  <i class="fas fa-shopping-cart"></i>
                </span>
                <strong>View Order</strong>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapState } from 'vuex';
import { Order } from '../OrderModel';
import { OrderModule } from '@/OrderModule';

@Component
export default class Header extends Vue {
  public get count() {
    return OrderModule.count;
  }
}
</script>
