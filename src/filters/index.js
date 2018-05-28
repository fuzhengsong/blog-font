import Vue from 'vue';


const time = function(time,type){
  let newTime = new Date(time);
  if(type === '-'){
    return newTime.getFullYear()+ '-'+ ('0' + (newTime.getMonth()+1)).slice(-2) + '-' + ('0'+newTime.getDate()).slice(-2);
  } else {
    return newTime.getFullYear()+ '年'+ ('0' + (newTime.getMonth()+1)).slice(-2) + '月' + ('0'+newTime.getDate()).slice(-2) + '日';
  }

};


Vue.filter('time', time);


