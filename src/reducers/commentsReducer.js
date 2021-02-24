import * as types from '../store/types.js';
import { avatarGenerator } from '../assets/utils/avatarGenerator.js';

const initComments = [
  {
    id: 1,
    avatar: 1,
    name: "selfcomment",
    content: "Lorem Ipsum is simply @dummy text of the #printing and #typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley",
    liked: false,
    likes: 5,
    time: "19h",
    replies: [],
  },
  {
    id: 2,
    avatar: 2,
    name: "normalcomment",
    content: "of type and #scrambled it to make a type specimen book.",
    liked: false,
    likes: 4,
    time: "15h",
    replies: [1],
  },
  {
    id: 3,
    avatar: 3,
    name: "longestcomment",
    content: "survived not only #five centuries, but #also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    liked: false,
    likes: 2,
    time: "12h",
    replies: [2,3],
  },
  {
    id: 4,
    avatar: 4,
    name: "longcomment",
    content: "Contrary #to popular belief, #Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC,",
    liked: true,
    likes: 61,
    time: "5h",
    replies: [],
  },
  {
    id: 5,
    avatar: 5,
    name: "shortercomment",
    content: "psum #dolor sit am",
    liked: false,
    likes: 6,
    time: "4h",
    replies: [],
  },
  {
    id: 6,
    avatar: 1,
    name: "shortcomment",
    content: "theory of @ethics, very popular",
    liked: true,
    likes: 7,
    time: "2h",
    replies: [],
  },
  {
    id: 7,
    avatar: 2,
    name: "shortestcomment",
    content: "very @popular",
    liked: false,
    likes: 7,
    time: "1h",
    replies: [],
  }
];

const initReplyComments = [
  {
    id: 1,
    avatar: 2,
    name: "normalcomment",
    content: "of type and @scrambled it to make a type specimen book.",
    liked: false,
    likes: 2,
    time: "2h",
  },
  {
    id: 2,
    avatar: 3,
    name: "longestcomment",
    content: "survived not #only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    liked: false,
    likes: 0,
    time: "1h",
  },
  {
    id: 3,
    avatar: 5,
    name: "shortercomment",
    content: "psum #dolor @sit am",
    liked: false,
    likes: 1,
    time: "1h",
  },
]

const initState = {
  comments: initComments,
  replyComment: initReplyComments,
};

const commentsReducer = (state = initState, action) => {
  let { comments, replyComment } = state;
  switch (action.type) {
    case types.ADD: {
      let { content } = action.payload;

      const newComment = {
        id: comments.length+1,
        avatar: 0,
        name: "currentuser",
        content: content,
        liked: false,
        likes: 0,
        time: "1m",
        replies: [],
      }

      return {
        ...state,
        comments: [...comments, newComment],
      }
    }

    case types.LIKE: {
      let { target } = action.payload;
      comments[target].liked = !comments[target].liked;
      if (comments[target].liked) {
        comments[target].likes += 1;
      } else {
        comments[target].likes -= 1;
      }
      return {
        ...state,
        comments,
      }
    }

    case types.REPLY_LIKE: {
      let { target } = action.payload;
      const reply_index = target-1;
      replyComment[reply_index].liked = !replyComment[reply_index].liked;
      if (replyComment[reply_index].liked) {
        replyComment[reply_index].likes += 1;
      } else {
        replyComment[reply_index].likes -= 1;
      }

      return {
        ...state,
        replyComment,
      }
    }

    case types.REPLY: {
      let { target, content } = action.payload;

      const commentIdx = Number(target) - 1;
      const replyCommentID = replyComment.length + 1;

      comments[commentIdx].replies.push(replyCommentID);

      const newComment = {
        id: replyCommentID,
        avatar: 0,
        name: "currentuser",
        content: content,
        liked: false,
        likes: 0,
        time: "1m",
      }

      return {
        ...state,
        comments,
        replyComment: [...replyComment, newComment]
      }
    }

    default: {
      return state;
    }
  }
};

export default commentsReducer;
