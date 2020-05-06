<template>
  <div class="home">
    <Card v-for="(post, index) in posts" :key="index" :post="post" />
  </div>
</template>

<script>
import Card from '@/components/Card.vue';

export default {
  name: 'Home',
  components: {
    Card
  },
  props: {
    posts: {
      type: Array,
      required: true
    }
  },
  methods: {
    test() {
      
    }
  }
}
</script>
