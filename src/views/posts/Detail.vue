<template>
  <div>
    <Card :post="post" :isDetail="true">
      <Comments />
    </Card>
  </div>
</template>

<script>
  import Card from '@/components/Card.vue';
  import Comments from '@/components/Comments.vue';

  export default {
    name: 'Detail',
    components: {
      Card,
      Comments
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