<template>
  <div>
    <Card :post="post" :isDetail="true">
      <template #comments><Comments /></template>
      <template #voices><Voices /></template>
    </Card>
  </div>
</template>

<script>
  import Card from '@/components/posts/Card.vue';
  import Comments from '@/components/posts/Comments.vue';
  import Voices from '@/components/posts/Voices.vue';

  export default {
    name: 'Detail',
    components: {
      Card,
      Comments,
      Voices
    },
    data() {
      return {
        testData: true
      }
    },
    props: {
      id: {
        type: [Number, String],
        required: true
      },
      post: {
        type: Object,
        required: true
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>