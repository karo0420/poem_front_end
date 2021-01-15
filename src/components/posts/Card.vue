<template>
  <div class="mb-1">
    <div @click="goToDetail(post.id)" class="bg-white max-w-lg shadow-sm"> <!-- rounded-lg -->
    <!-- Writer -->
      <UserInfo :user="post.user.profile" v-if="showUserInfo" class="z-10" @click.native.stop="goToProfile(post.user.id)" />
      <div class="relative" :class="{'-top-16': showUserInfo}">
        <div class="h-56">
          <img :src="post.avatar" class="h-56 w-full object-cover object-center"> <!-- rounded-t-lg -->
        </div>
      </div>
      <!-- Text -->
      <div class="p-3">
        <h1 class="font-bold text-gray-900 text-lg text-center">❛ {{ post.title }} ❜</h1>
        <p v-html="isDetail?post.body:post.summary" class="mt-6 text-gray-600 text-sm leading-loose text-justify" dir="rtl">
          
        </p>
        <p class="mt-2 text-gray-400 text-xs text-right" dir="rtl">{{ post.created_at }} نوشته شده</p>
      </div>
      <!-- Voices -->
      <div class="p-3 my-5" dir="rtl" v-show="isDetail">
        <div class="text-sm p-3 bg-gray-300 text-black rounded-t-md">به این اثر گوش کنید</div>
        <slot name="voices"></slot>
      </div>
      <!-- Categories -->
      <div class="flex-wrap p-3 pt-0">
        <a v-for="(category, index) in post.categories" :key="index" class="text-xs text-gray-500 bg-gray-300 p-1 rounded-md mr-1 mb-1 inline-block" href="#">
          {{ category.title }}
        </a>
      </div>
      <div class="px-3">
        <hr>
      </div>
      <!-- Likes -->
      <div class="p-3">
        <div class="flex text-gray-800">
          <div @click.stop.prevent="test">
            <i class="fas fa-thumbs-up"></i> <span class="text-xs">2500</span>
          </div>
          <div class="ml-6">
            <i class="fas fa-comment"></i> <span class="text-xs">{{ post.comment_count }}</span>
          </div>
          <div class="ml-6">
            <i class="fas fa-eye"></i> <span class="text-xs">{{ post.view_count }}</span>
          </div>
        </div>
      </div>
      <!-- Comments -->
      <div class="p-3 bg-gray-100" v-show="isDetail"><slot name="comments"></slot></div>
    </div>
  </div>
</template>

<script>
  import UserInfo from '@/components/UserInfo.vue';

  export default {
    name: 'Card',
    components: {
      UserInfo
    },
    props: {
      post: {
        type: Object,
        required: true
      },
      isDetail: {
        type: Boolean,
        default: false
      },
      showUserInfo: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      goToDetail(id) {
        if (!this.isDetail)
          this.$router.push({ name: 'Detail', params: { id }});
      },
      goToProfile(id) {
        this.$router.push({ name: 'Profile', params: { id}});
      },
      test() {
        
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>