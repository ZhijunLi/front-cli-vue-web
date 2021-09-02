<template>
<div>
  <van-button type="primary">主要按钮</van-button>
</div>
</template>

<script>
export default {
  name: "Demo",
  created() {
    this.$request({
      url: this.$api.user.info,
      data:{}
    }).then(data=>{
      console.log(data)
    })
  }

}
</script>

<style scoped>

</style>
