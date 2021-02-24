import * as types from '../store/types.js';

export const toggleLiked = (liked) => ({// like the post
  type: types.TOGGLE_LIKED,
  payload: {
    liked: liked,
  }
});
