<template>
  <div class="home p-2">
    <button @click="test" class="bg-gray-700 text-white pt-2">Load posts</button>
    <Card v-for="(post, index) in posts" :key="index" :post="post" />
    
  </div>
</template>

<script>
import Card from '@/components/Card.vue';
import PostService from '@/services/PostService';

export default {
  name: 'Home',
  components: {
    Card
  },
  data() {
    return {
      posts: []
    }
  },
  methods: {
    test() {
      PostService.getAll().then(res=> this.posts = res.data);
    }
  }
}
</script>
