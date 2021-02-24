import * as types from '../store/types.js';

export const toPortrait = () => ({// to portrait mode
  type: types.PORTRAIT,
});

export const toLandscape = () => ({//to landscape mode
  type: types.LANDSCAPE,
});

export const updateSize = (height, width) => ({//update window size hook
  type: types.UPDATE_SIZE,
  payload: {
    width: width,
    height: height,
  }
});
