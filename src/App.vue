<template>
  <div class="app__container">
    <div class="app__header">
      <div class="columns is-centered pt-4 is-mobile">
        <div class="field has-addons">
          <div class="control">
            <input
              class="input"
              type="text"
              v-model="inputText"
              placeholder="Vue.js..."
            />
          </div>
          <div class="control" v-on:click="searchBooks">
            <a class="button is-info">
              検索
            </a>
          </div>
          <span class="control">
            <div class="select">
              <select v-model="selectedOpsion">
                <option>関連順</option>
                <option>新規順</option>
              </select>
            </div>
          </span>
        </div>
      </div>
    </div>

    <div class="app__content">
      <div class="columns books-container">
        <template v-for="(book, index) in sortedBooks" :key="index">
          <BookCard :book="book" />
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed } from 'vue';
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
    const selectedOpsion = ref<string>('関連順');
    const books = ref<Book[]>([]);
    // Note: Methods
    const searchBooks = async () => {
      if (!inputText.value) {
        return;
      }
      const _books = await getBooks(inputText.value);
      books.value = _books;
    };
    // Note: Computed
    const sortedBooks = computed(() => {
      if (selectedOpsion.value === '新規順') {
        // Todo: Sort Func
        const newOrderedBooks = books.value;
        newOrderedBooks.sort((a: Book, b: Book) => {
          if (a.publishedDate < b.publishedDate) {
            return -1;
          } else {
            return 1;
          }
        });
        console.log(' ---- new: ', newOrderedBooks);

        return newOrderedBooks;
      }
      return books.value;
    });

    return {
      inputText,
      sortedBooks,
      selectedOpsion,
      searchBooks
    };
  }
};
</script>

<style lang="scss">
body {
  margin: 0px;
  padding: 0px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
.app__container {
  .app__header {
    text-align: center;
    padding: 20px 0px;
  }
  .app__content {
    padding: 20px;
    .books-container {
      padding: 40px 0px;
      flex-wrap: wrap;
    }
  }
}
</style>
