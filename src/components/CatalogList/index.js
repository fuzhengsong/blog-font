import Vue from 'vue';
const scrollTo = function (scrollDuration, targetPos) {
  let currentHeight = window.scrollY || document.documentElement.scrollTop;
  const scrollHeight = Math.abs(currentHeight - targetPos);
  const scrollStep = Math.PI / (scrollDuration / 15);
  const cosParameter = scrollHeight / 2;
  let scrollCount = 0,
    scrollMargin,
    currentSet = currentHeight,
    scrollInterval = setInterval(function () {
        scrollCount = scrollCount + 1;
        scrollMargin = cosParameter - cosParameter * Math.cos(scrollCount * scrollStep);

        if(currentHeight - targetPos < 0){
          currentSet = currentSet + scrollMargin;
          if(currentSet > targetPos){
            window.scrollTo(0, targetPos);
            clearInterval(scrollInterval);
          } else {
            window.scrollTo(0, currentSet);
          }
        } else {
          currentSet = currentSet - scrollMargin;
          if(currentSet < targetPos){
            window.scrollTo(0, targetPos);
            clearInterval(scrollInterval);
          } else {
            window.scrollTo(0, currentSet);
          }
        }
    }, 15);
};

Vue.component('catalog-list', {
  render: function(createElement) {
    function createEle(data, pre) {
      return createElement('ul', {
          'class': {
            nav: true
          }
        }, data.map((item,index) => {
          var prefix = pre? pre + (index + 1) + '.' : (index + 1) + '.';
           if (item.children.length) {
            return createElement('li', [
              createElement('span', {
                on: {
                  click: function () {
                    scrollTo(2000, item.top)
                  }
                }
              }, prefix + item.name),
              createEle(item.children, prefix)
            ])

          } else {
            return createElement('li', [
              createElement('span', {
                  on: {
                    click: function () {
                      scrollTo(2000, item.top)
                    }
                  }
                }, prefix + item.name)
            ])
          }
        })
      )
    }
    if (this.list.length) {
      return createEle(this.list);
    }
  },

  props: {
    list: {
      type: Array,
      required:
        true
    }
  }
})
;
