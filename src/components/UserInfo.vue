<template>
  <div class="mr-3 flex relative z-10" dir="rtl">
      <div class="h-20 w-20 rounded-full bg-gray-300">
        <img :src="user.avatar" class="h-20 w-full rounded-full border-white border-4 object-cover object-top" alt="User avatar">
      </div>
      <div class="mr-2">
        <div class="mt-3">{{ user.nickname }}</div>
        <div class="text-xs -mt-1">{{ user.bio }}</div>
        <slot></slot>
      </div>
  </div>
</template>

<script>
  export default {
    name: 'UserInfo',
    props: {
      user: {
        type: Object,
        required: true
      },
      size: {
        type: [Number, String],
        default: 20
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>