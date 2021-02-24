import * as types from '../store/types.js';

const initState = {
  isPortrait: true,
  width: 1080,
  height: 1920,
};

const screenReducer = (state = initState, action) => { //allow global access to screen properties
  let { isPortrait, width, height, } = state;
  switch (action.type) {
    case types.PORTRAIT: { // to portrait mode
      return {
        ...state,
        isPortrait: true,
      }
    }

    case types.LANDSCAPE: { //to landscape mode
      return {
        ...state,
        isPortrait: false,
      }
    }

    case types.UPDATE_SIZE: { //update window size
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
