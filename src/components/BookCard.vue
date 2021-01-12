<template>
  <div class="column is-one-quarter">
    <div class="card">
      <figure class="image">
        <img :src="book.imageLinks.smallThumbnail" />
      </figure>
      <div class="content p-3">
        <h4>
          <a :href="book.infoLink">
            {{ book.title }}
          </a>
        </h4>
        <h6>{{ book.publishedDate }}</h6>
        <p>{{ formatedDescription }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType } from 'vue';
// Utils
import truncate from '../utils/truncate';
import { Book } from '../types/book';

export default {
  props: {
    book: {
      type: Object as PropType<Book>,
      required: true
    }
  },
  setup(props: any) {
    const formatedDescription = truncate({ str: props.book.description });

    return {
      formatedDescription
    };
  }
};
</script>
