import {
  extend
} from 'lodash';

export default {

  UPDATE_USER_INFO(state, data){
    state.userInfo = extend({}, state.userInfo, data);
  }

}

