import * as types from '../store/types.js';

export const toggleLiked = (liked) => ({
  type: types.TOGGLE_LIKED,
  payload: {
    liked: liked,
  }
});
