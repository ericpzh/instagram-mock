import * as types from '../store/types.js';

export const toPortrait = () => ({
  type: types.PORTRAIT,
});

export const toLandscape = () => ({
  type: types.LANDSCAPE,
});

export const updateSize = (height, width) => ({
  type: types.UPDATE_SIZE,
  payload: {
    width: width,
    height: height,
  }
});
