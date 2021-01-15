<template>
  <div class="max-w-lg">
    <UserInfo :user="user" />
    <div>
      <div class="mt-4 text-center text-sm p-3">
        آثار
      </div>
      <div>
        <Card v-for="(post, index) in posts" :key="index" :post="post" :showUserInfo="false" />
      </div>
    </div>
  </div>
</template>

<script>
  import UserInfo from '@/components/UserInfo.vue';
  import PostService from '@/services/PostService';
  import Card from '@/components/posts/Card.vue';

  export default {
    name: 'Profile',
    components: {
      UserInfo,
      Card
    },
    data() {
      return {
        posts: []
      }
    },
    props: {
      id: {
        type: [Number, String],
        required: true
      },
      user: {
        type: Object,
        required: true
      }
    },
    mounted() {
      PostService.getByUserId(this.id)
        .then(posts=> {
          this.posts = posts.data.data;
          //console.log(posts.data.data)
        }).catch(err=> {

        })
    }
  }
</script>

<style lang="scss" scoped>

</style>