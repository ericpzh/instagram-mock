import * as types from '../store/types.js';

const initState = {
  isPortrait: true,
  width: 1080,
  height: 1920,
};

const screenReducer = (state = initState, action) => {
  let { isPortrait, width, height, } = state;
  switch (action.type) {
    case types.PORTRAIT: {
      return {
        ...state,
        isPortrait: true,
      }
    }

    case types.LANDSCAPE: {
      return {
        ...state,
        isPortrait: false,
      }
    }

    case types.UPDATE_SIZE: {
      return {
        ...state,
        width: action.payload.width,
        height: action.payload.height,
      }
    }

    default: {
      return state;
    }
  }
};

export default screenReducer;
