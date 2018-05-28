import {
  isObject
} from 'lodash';

class Storage{

  constructor(){
    if(window.localStorage){
      this.storge = window.localStorage;
    } else {
      console.warn('has no localStorage');
    }
  }

  getItem(name){
    let value;
    try{
      value =  this.storge.getItem(name);
    } catch(err){
      console.warn(err)
    }
    try{
       value = JSON.parse(value);
    } catch(err){
    }
    return value
  }

  setItem(name, value){
    let storeValue = value;
    if(isObject(value)){
      storeValue = JSON.stringify(value);
    }

    try{
      this.storge.setItem(name, storeValue);
    } catch(err){
      console.warn(err);
    }
  }
}

export default Storage;
