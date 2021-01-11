<template>
  <div class="book-card">
    <span>BookCard</span>
    <span>{{ book.title }}</span>
  </div>
</template>

<script lang="ts">
// import { ref } from 'vue';
// Types
// import { Book } from '../types/book';

export default {
  props: {
    book: {
      type: Object,
      required: true
    }
  },
  setup() {
    console.log('--- BookCard');
  }
};
</script>
