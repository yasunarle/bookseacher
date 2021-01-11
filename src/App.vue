<template>
  <div class="app__container">
    <h1>Book Seacher</h1>
    <input type="text" v-model="inputText" />
    <button @click="searchBooks">検索</button>

    <div class="books-container" v-for="(book, index) in books" :key="index">
      <BookCard :book="book" />
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
// Components
import BookCard from './components/BookCard.vue';
// Utils
import getBooks from './utils/getBooks';
// Types
import { Book } from './types/book';

export default {
  components: {
    BookCard
  },
  props: {},
  setup() {
    // Note: State
    const inputText = ref<string>('');
    const books = ref<Book[]>([]);
    // Note: Methods
    const searchBooks = async () => {
      if (!inputText.value) {
        return;
      }
      const _books = await getBooks(inputText.value);
      books.value = _books;
    };

    return {
      inputText,
      books,
      searchBooks
    };
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}
</style>
