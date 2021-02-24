import * as types from '../store/types.js';

export const addComment = (content) => ({// add a comment
  type: types.ADD,
  payload : {
    content: content,
  },
});

export const likeComment = (target) => ({// like a comment
  type: types.LIKE,
  payload : {
    target: target,
  },
});

export const replyLikeComment = (target) => ({// like a replied comment
  type: types.REPLY_LIKE,
  payload : {
    target: target,
  },
});

export const replyComment = (target, content) => ({// reply to a comment
  type: types.REPLY,
  payload : {
    target: target,
    content: content,
  },
});
