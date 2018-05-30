<template>
    <section class="article-catalog" >
      <div class="icon-control" >
        <transition name="icon" mode="out-in">
          <svg class="icon" aria-hidden="true" v-if="!catalogShow" @click="catalogShow = !catalogShow" key="menu">
            <use xlink:href="#icon-catalogue"></use>
          </svg>
          <svg class="icon" aria-hidden="true" v-else @click="catalogShow = !catalogShow" key="close">
            <use xlink:href="#icon-close"></use>
          </svg>
        </transition>
      </div>
      <transition name="slide">
        <div class="catalogs" :style="{'height': clientInner}" v-if="catalogShow">
          <div class="catalog-inner">
            <div class="header mb20">
              文章目录
            </div>
            <div class="catalog-list tal" >
              <catalog-list :list="list"></catalog-list>
              <!--<ul class="nav">-->
                <!--<li v-for="item in list"><a href="javascript:;">{{item.name}}</a>-->
                  <!--<ul ></ul>-->
                <!--</li>-->
              <!--</ul>-->
            </div>
          </div>

        </div>
      </transition>

    </section>
</template>

<script>
  import {
    mapGetters
  } from 'vuex';

  export default {

    data(){
      return {
        catalogShow: false,
        list : []
      }
    },
    watch: {
      detail: {
        handler: function (val) {
          if (val.detail && val.detail.content) {
            this.$nextTick(() => {
              let images = document.getElementsByTagName('img');
              this.watchImages(images);
            })
          }
        },

        deep: true
      }
    },

    computed: {
      clientInner(){
        return (document.documentElement.clientHeight || window.innerHeight) +'px'
      },

      ...mapGetters({
        detail: 'getArticleDetail'
      })
    },

    methods: {
      watchImages(images){
        let _this = this;
        let __timer = setTimeout(function(){
          let complete = [...images].every(item => {
            return item.complete
          });
          if(complete){
            _this.createCatalog();
            _this.catalogShow = true;
            clearTimeout(__timer);
          } else {
            _this.watchImages(images)
          }
        },200)
      },

      createCatalog() {
        let eleList = [];
        for (let i = 1; i <= 6; i++) {
          let currentTag = 'h' + i;
          let eles = document.getElementsByTagName(currentTag);
          if (eles.length) {
            eleList.push([...eles]);
          }
        }
        if (eleList.length === 0) return;
        let elelist = [];
        eleList.forEach((item, index) => {
          item.forEach(itm => {
            let item = {};
            item.name = itm.innerText || itm.firstChild.nodeValue;
            item.children = [];
            let rect = itm.getBoundingClientRect();
            if(rect.top === 0) return;
            //获取元素距离文档顶部的距离
            item.top = rect.top + (window.pageYOffset || document.documentElement.scrollTop) - (document.documentElement.clientTop || 0);
            item.level = index + 1;
            elelist.push(item);
          })
        });

        // 按高度排序
        elelist.sort((a, b) => a.top - b.top);

        function chargement(current, next, root) {

          // 如果下一个标题level等级比较大， 则为前一个元素的子元素，并将parent属性指向前一个元素
          if(next.level > current.level){
            if(!current.children){
              current.children = [];
            }
            current.children.push(next);
            next.parent = current;

            // 如果等级相等，则通过parent属性寻找共同父元素
          } else if(next.level === current.level){
            let parent = current.parent;
            if(parent === undefined){
              root.push(next);
            } else {
              parent.children.push(next)
            }

            // 如果下一个标题level较小（等级高）,直接push到根数据（因为这里用来比较的都是root下的数据，没有比root更高层次的结构）
          } else if(next.level < current.level){
            root.push(next);
          }
        }

        let renderList = [];
        elelist.forEach((item,index) =>{
          if(index === 0){
            renderList.push(item);
          }
          if(index+1 <= elelist.length -1){
            chargement(item, elelist[index+1], renderList);
          }
        });
        this.list = renderList;

      }
    }
  }
</script>

<style lang="less">

  .icon-enter-active, .icon-leave-active{
    transition: opacity .3s ;
  }

  .icon-enter, .icon-leave-to{
    opacity: 0;
  }

  .slide-enter-active, .slide-leave-active{
    transition: transform .3s ;
  }

  .slide-enter, .slide-leave-to{
    transform: translateX(320px);
  }

  .article-catalog{

    .catalog-inner{
      position: relative;
      padding: 20px 10px;
      color: #999;
      text-align: center;

      .header{
        height: 30px;
        line-height: 30px;
        color: #87daff;
      }

      .catalog-list{
        max-height: ~"calc(100vh - 100px)";
        width: ~"calc(100% + 20px)";
        overflow: auto;
      }

      .nav{
        padding: 0 2px 5px 10px;
        font-size: 14px;

        li{
          width: 260px;
          padding-left: 10px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow:ellipsis;
          line-height: 1.8;
        }

        span{
          transition: all .3s ease;
          border-bottom: 1px solid #999;
          cursor: pointer;

          &.active{
            color: #87daff;
            border-color: #87daff;
          }

          &:hover{
            text-decoration: none;
            color: #87daff;
            border-color: #87daff;
          }
        }
      }
    }

    .catalogs{
      position: fixed;
      right: 0;
      top: 0;
      width: 320px;
      background-color: #222;
      z-index: 5000;
    }

    .icon-control{
      position: fixed;
      right: 40px;
      bottom: 10%;
      width: 20px;
      height: 20px;
      text-align: center;
      line-height: 20px;
      background-color: #222;
      z-index: 6000;
    }

    .icon{
      font-size: 18px;
      color: #87daff;
      cursor: pointer;
    }
  }
</style>
