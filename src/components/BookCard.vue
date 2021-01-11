<template>
  <div class="column is-one-quarter">
    <div class="card">
      <figure class="image">
        <img :src="book.imageLinks.smallThumbnail" />
      </figure>
      <div class="content p-3">
        <h4>{{ book.title }}</h4>
        <h6>{{ book.publishedDate }}</h6>
        <p>{{ description }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// Utils
import truncate from '../utils/truncate';

export default {
  props: {
    book: {
      type: Object,
      required: true
    }
  },
  setup(props: any) {
    const description = truncate({ str: props.book.description });

    return {
      description
    };
  }
};
</script>
