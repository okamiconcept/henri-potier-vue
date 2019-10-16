<template>
  <section class="section">
    <h1 class="title is-2">Welcome to Henri Potier E-shop!</h1>

    <router-link class="button is-primary" to="/products">View our products</router-link>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Home extends Vue {}
</script>
