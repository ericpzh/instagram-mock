import pic1 from "../assets/images/pic1.jpg";
import pic2 from "../assets/images/pic2.jpg";
import pic3 from "../assets/images/pic3.jpg";
import * as types from '../store/types.js';

const initState = {
  id: "1",
  avatar: "1",
  name: "alicedubin",
  location: "Four Seasons Hotel Hampshire, England",
  pictures: [pic1, pic2, pic3],
  time: "14 HOURS",
  likes: 54,
  liked: false,
};

const postReducer = (state = initState, action) => {
  let { id, avatar, name, location, pictures, likes, liked } = state;
  switch (action.type) {
    case types.TOGGLE_LIKED: {
      if (action.payload.liked) {
        return {
          ...state,
          liked: true,
          likes: likes + 1,
        }
      } else {
        return {
          ...state,
          liked: false,
          likes: likes - 1,
        }
      }

    }
    default: {
      return state;
    }
  }
};

export default postReducer;
