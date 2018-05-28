<template>

  <div class="public-header">
    <div class="blog-name">
      <transition name="down-in">
        <p v-show="showControl.blogname">FUZHENGSONG'S BLOG</p>
      </transition>
    </div>
    <div class="nav-wrapper">
      <transition name="down-in">
        <div class="nav" v-show="showControl.nav">
          <router-link class="index fl" :to="{name: 'index'}">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-shouye"></use>
            </svg><span class="fz14 ml4">首页</span>
          </router-link>
          <a class="sort db fl" href="javascript:;">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-fenlei"></use>
            </svg><span class="fz14 ml4">分类</span>
          </a>
          <a class="tabs db fl" href="javascript:;">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-biaoqian"></use>
            </svg><span class="fz14 ml4">标签</span>
          </a>
          <a class="about db fl" href="javascript:;">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-guanyu"></use>
            </svg><span class="fz14 ml4">关于</span>
          </a>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        showControl: {
          blogname: false,
          nav: false
        }
      }
    },
    mounted() {
      let _this = this;
      let i = 0;
      let keys = Object.keys(this.showControl);
      this.__timer = setInterval(function () {
        _this.showControl[keys[i]] = true;
        i++;
        if (i === _this.showControl.length) {
          clearInterval(_this.__timer)
        }
      }, 200)
    },

    beforeDestroy() {
      if (this.__timer) {
        clearInterval(this.__timer);
      }
    }
  }
</script>

<style scoped lang="less">

  .down-in-enter-active,
  .down-in-leave-active {
    transition: all .3s ease;
  }

  .down-in-enter,
  .down-in-leave-to {
    transform: translateY(-40px);
    opacity: 0;
  }

  .public-header {
    width: 300px;
    margin: 40px auto;

    .blog-name {
      width: 300px;
      height: 40px;
      line-height: 40px;
      background-color: #000;
      color: #fff;
      text-align: center;
      letter-spacing: .1em;
    }

    .nav-wrapper{
      height: 20px;
      margin-top: 10px;
    }
    .nav{
      padding: 0 10px;
      overflow: hidden;

      a{
        width: 25%;
        text-align: center;
      }
      a:hover{
        color: #909399;
        text-decoration: none;
      }
    }
  }
</style>
