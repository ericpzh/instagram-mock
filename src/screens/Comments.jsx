import { avatarGetter } from '../assets/utils/avatarGenerator.js';
import { useState, useEffect } from 'react';
import {
  Icon,
  Header,
  Image,
} from 'semantic-ui-react';

const maxCommentCount = 3;

function SinglePortraitComment({id, name, content, liked}, index, likeComment, likable=true){
  return (
    <div className="portrait-single-comment" key={id}>
      <div className="portrait-single-comment-text">
        <p> <strong> { name } </strong> &nbsp; { content } </p>
      </div>
      {
        likable &&
        <div className="text-button">
          <Icon size="small" name={liked ? "heart" : "heart outline"} onClick={()=>likeComment(index)}/>
        </div>
      }
    </div>
  )
}

export function PortraitComments(props) {
  if (props.comments.length <= maxCommentCount){
    return (
      <div className="portrait-comments-group">
        {
          SinglePortraitComment(props.comments[0], 0, props.likeComment, false)
        }
        {
          props.comments.slice(1,).map(
            (comment, index) => SinglePortraitComment(comment, 1+index, props.likeComment)
          )
        }
      </div>
    );
  } else {
    return (
      <div className="portrait-comments-group">
        {
          SinglePortraitComment(props.comments[0], 0, props.likeComment, false)
        }
        <div className="portrait-forced-left text-button">
          <p className="portrait-comments-view-all-text" onClick={props.toLandscape}> View all {props.comments.length} comments </p>
        </div>
        {
          props.comments.slice(-(maxCommentCount-1),).map(
            (comment, index) => SinglePortraitComment(comment, props.comments.length-(maxCommentCount-1)+index, props.likeComment)
          )
        }
      </div>
    );
  }
}

function SingleReplyComment(replyComment, id, index, replyLikeComment, replyToComment){
  return (
    <div key={index}>
      <div className="landscape-single-comment">
        <div className="landscape-single-comment-header">
          <Image src={avatarGetter(replyComment.avatar)} avatar className="landscape-single-comment-avatar"/>

          <div className="landscape-single-comment-text">
            <p> <strong> { replyComment.name } </strong> &nbsp; { replyComment.content } </p>
          </div>
        </div>
        <div className="text-button">
          <Icon size="small" name={replyComment.liked ? "heart" : "heart outline"} onClick={()=>replyLikeComment(replyComment.id)}/>
        </div>
      </div>
      <div className="landscape-single-comment-info">
        <p className="landscape-single-comment-info-text">
          {replyComment.time}
        </p>
        {
          replyComment.likes == 1 &&
          <h5 className="landscape-single-comment-info-text"> {replyComment.likes} like </h5>
        }
        {
          replyComment.likes > 1 &&
          <h5 className="landscape-single-comment-info-text"> {replyComment.likes} likes </h5>
        }
        <h5 className="landscape-single-comment-info-text text-button" onClick={() => replyToComment(replyComment.name, id)}>
          Reply
        </h5>
      </div>
    </div>
  )
}

function SingleLandscapeComment({id, avatar, name, content, liked, likes, time, replies}, replyComment, index, likeComment, replyLikeComment, replyToComment, expand, setExpand, likable=true){
  return (
    <div key={id}>
      <div className="landscape-single-comment">
        <div className="landscape-single-comment-header">
          <Image src={avatarGetter(avatar)} avatar className="landscape-single-comment-avatar"/>

          <div className="landscape-single-comment-text">
            <p> <strong> { name } </strong> &nbsp; { content } </p>
          </div>
        </div>
        {
          likable &&
          <div className="text-button">
            <Icon size="small" name={liked ? "heart" : "heart outline"} onClick={()=>likeComment(index)}/>
          </div>
        }
      </div>
      <div className="landscape-single-comment-info">
        <p className="landscape-single-comment-info-text">
          {time}
        </p>
        {
          likes == 1 &&
          <h5 className="landscape-single-comment-info-text"> {likes} like </h5>
        }
        {
          likes > 1 &&
          <h5 className="landscape-single-comment-info-text"> {likes} likes </h5>
        }
        {
          likable &&
          <h5 className="landscape-single-comment-info-text text-button" onClick={() => replyToComment(name, id)}>
            Reply
          </h5>
        }
      </div>
        {
          !expand && replies.length > 0 &&
          <div className="text-button" onClick={()=>setExpand(index-1, !expand)}>
            <div className="landscape-single-comment-view-replies">
              <hr className="landscape-single-comment-view-replies-left" style={{width:"40px"}}/>
              <p>  View replies ({replies.length}) </p>
            </div>
          </div>
        }
        {
          expand && replies.length > 0 &&
          <div className="reply-comment-group">
            {
              replies.map( (repliesID, index) => SingleReplyComment(replyComment[repliesID-1], id, index, replyLikeComment, replyToComment))
            }
          </div>
        }
    </div>
  )
}

export function LandscapeComments(props) {
  const [expand, setExpand] = useState(Array(props.comments.length).fill(false));

  function setSingleExpand(idx, expanded){
    let newExpand = [...expand]
    newExpand[idx] = expanded;
    setExpand(newExpand);
  }

  return (
    <div className="landscape-comments-group">
      {
        SingleLandscapeComment(props.comments[0], props.replyComment, 0, props.likeComment, props.replyLikeComment, props.replyToComment, expand[0], setSingleExpand, false)
      }
      {
        props.comments.slice(1,).map(
          (comment, index) => SingleLandscapeComment(comment, props.replyComment, 1+index, props.likeComment, props.replyLikeComment, props.replyToComment, expand[index], setSingleExpand)
        )
      }
    </div>
  );
}
