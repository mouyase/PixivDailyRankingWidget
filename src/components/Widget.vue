<template>
  <div class="widget">
    <div v-for="pixivItem in pixivData" :key="pixivItem.key">
      <img :src="pixivItem.image">
    </div>
  </div>
</template>

<script>
export default {
  name: 'Widget',
  data() {
    return {
      pixivData: []
    }
  },
  created() {
    this.$http.get("/api/pixiv/storage/app/pixiv.json", {}).then(response => {
      for (let i = 0; i < response.data.image.length; i++) {
        this.pixivData.push({
          key: i,
          url: response.data.url,
          image: response.data.image[i]
        })
      }
    })
  }
}
</script>

<style scoped>
</style>
