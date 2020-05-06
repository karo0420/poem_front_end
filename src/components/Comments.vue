<template>
  <div dir="rtl">

    <div v-for="(comment, index) in current.comments.data" :key="index" class="mt-5">
      <div class="font-bold">{{ comment.user.profile.nickname }}</div>
      <div class="text-xs -mt-1">{{ comment.user.profile.bio }}</div>
      <div class="text-sm mr-6">{{ comment.body }}</div>
      <div class="text-gray-400 text-xs text-left">{{ comment.created_at }} نوشته شده</div>
    </div>
    <div class="text-center text-xs mt-6 shake-slow shake-constant" v-show="isLoading">
      <span class="px-3 py-1 rounded bg-gray-100">
        درحال بارگذاری ، شکیبا باشید... 
      </span>
    </div>
    <div class="text-center text-xs mt-6" v-show="showMoreCommentBtn">
      <button @click="loadMore" class="px-3 py-1 rounded bg-gray-100">
        <span class="mx-2">نمایش دیدگاهای بیشتر</span>
        <i class="fas fa-chevron-circle-down"></i>
      </button>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex';
  import UserInfo from '@/components/UserInfo.vue';
  
  export default {
    name: 'Comments',
    components: {
      UserInfo
    },
    data() {
      return {
        isLoading: true
      }
    },
    methods: {
      ...mapActions('post', ['getComments']),
      loadMore() {
        this.loadComments()
      },
      loadComments(page = 1) {
        this.isLoading = true;
        this.getComments({postId: this.current.post.id}) // Pass page argument to specific page
          .then(comments=> {
            this.isLoading = false;
          })
          .catch(err=> {
            this.isLoading = false;
            // Retry
          })
      }
    },
    computed: {
      ...mapState('post', ['current']),
      showMoreCommentBtn() {
        if ((this.current.comments.pages.last_page == undefined || 
              (this.current.comments.page+1 <= this.current.comments.pages.last_page)) && !this.isLoading )
          return true;
        else
          return false;
      }
    },
    mounted() {
      this.loadComments();
    },
  }
</script>

<style lang="scss" scoped>

</style>