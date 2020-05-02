<template>
  <div class="mb-3">

    <div class="bg-white rounded-lg max-w-lg shadow-sm">
      <div>
        <div class="h-56">
          <img :src="post.avatar" class="h-56 w-full object-cover object-center rounded-t-lg">
        </div>
      </div>
      <div class="p-3">
        <h1 class="font-bold text-gray-900 text-lg text-center">{{ post.title }}</h1>
        <p class="mt-1 text-gray-600">
          {{ post.summary}}
        </p>
        <p class="mt-2 text-gray-400 text-xs text-right">{{ post.created_at }}</p>
      </div>
      <div class="flex p-3">
        <div class="h-12 w-12 rounded-full">
          <img src="@/assets/images/avatar1.jpg" class="h-12 w-full rounded-full object-cover object-top" alt="User avatar">
        </div>
        <div :class="{'mt-2': post.user.bio.length === 0}" class="ml-2">
          <div>{{ post.user.nickname }}</div>
          <div class="text-xs">{{ post.user.bio }}</div>
        </div>
      </div>
      <div class="flex-wrap p-3 pt-0">
        <a v-for="(category, index) in post.categories" :key="index" class="text-xs text-gray-500 bg-gray-300 p-1 rounded-md mr-1 mb-1 inline-block" href="#">
          {{ category.title }}
        </a>
      </div>
      <div class="px-3">
        <hr>
      </div>
      <div class="p-3">
        <div class="flex text-gray-800">
          <div>
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
    </div>

  </div>
</template>

<script>
  export default {
    name: 'Card',
    props: {
      post: {
        type: Object,
        required: true
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>