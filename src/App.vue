<template>
  <div class="app__container">
    <div class="pt-6">
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
              <select v-model="selectedOption">
                <option>関連順</option>
                <option>新規順</option>
              </select>
            </div>
          </span>
        </div>
      </div>
    </div>

    <div class="p-5">
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
    const selectedOption = ref<string>('関連順');
    const books = ref<Book[]>([]);
    // Note: Methods
    const searchBooks = async (): Promise<void> => {
      if (!inputText.value) {
        return;
      }
      const _books = await getBooks(inputText.value);
      books.value = _books;
    };
    const sortBooksNewOrder = (books: Book[]): void => {
      books.sort((a: Book, b: Book) => {
        if (a.publishedDate > b.publishedDate) {
          return -1;
        } else {
          return 1;
        }
      });
    };
    const sortBooksRelation = (books: Book[]): void => {
      books.sort((a: Book, b: Book) => {
        if (a.relatedOrder < b.relatedOrder) {
          return -1;
        } else {
          return 1;
        }
      });
    };
    // Note: Computed
    const sortedBooks = computed<Book[]>(() => {
      if (selectedOption.value === '関連順') {
        sortBooksRelation(books.value);
        return books.value;
      }
      if (selectedOption.value === '新規順') {
        sortBooksNewOrder(books.value);
      }
      return books.value;
    });

    return {
      inputText,
      sortedBooks,
      selectedOption,
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
  a:hover {
    color: seagreen;
    cursor: pointer;
  }
}
.app__container {
  .books-container {
    padding: 60px 0px;
    flex-wrap: wrap;
  }
}
</style>
