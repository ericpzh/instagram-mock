import * as types from '../store/types.js';

export const addComment = (content) => ({
  type: types.ADD,
  payload : {
    content: content,
  },
});

export const likeComment = (target) => ({
  type: types.LIKE,
  payload : {
    target: target,
  },
});

export const replyLikeComment = (target) => ({
  type: types.REPLY_LIKE,
  payload : {
    target: target,
  },
});

export const replyComment = (target, content) => ({
  type: types.REPLY,
  payload : {
    target: target,
    content: content,
  },
});
