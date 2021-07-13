<template>
  <div class="widget">
    <transition name="el-fade-in-linear" mode="out-in">
      <div v-for="pixivItem in pixivData" v-if="pixivItem.key === nowIndex" :key="pixivItem.key"
           @click="goToOrigin(pixivItem)">
        <img :src="pixivItem.image"/>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Widget',
  data() {
    return {
      show: true,
      pixivData: [],
      nowIndex: 0,
    }
  },
  created() {
    this.$http.get("https://mokeyjay.yojigen.tech/api/pixiv/storage/app/pixiv.json", {}).then(response => {
      for (let i = 0; i < response.data.image.length; i++) {
        this.pixivData.push({
          key: i,
          url: response.data.url[i],
          image: response.data.image[i]
        })
      }
      this.$nextTick(() => {
        this.waitRepeat(5000, () => {
          this.nowIndex = this.nowIndex >= this.pixivData.length - 1 ? 0 : this.nowIndex + 1
        })
      })
    })
  },
  methods: {
    wait(time, func) {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve();
        }, time)
      }).then(() => {
        func()
      });
    },
    waitRepeat(time, func) {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve();
        }, time)
      }).then(() => {
        func()
        this.waitRepeat(time, func)
      });
    },
    goToOrigin(pixivItem) {
      window.open("https://www.pixiv.net/" + pixivItem.url);
    }
  }
}
</script>

<style scoped>
.widget {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
}
</style>
