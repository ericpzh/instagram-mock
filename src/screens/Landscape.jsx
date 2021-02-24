import { useState } from 'react';
import { connect } from 'react-redux';
import store from "../store";
import { addComment, likeComment, replyComment, replyLikeComment } from "../actions/commentsActions.js";
import { toggleLiked } from "../actions/postActions.js";
import { toPortrait } from "../actions/screenActions.js";
import { avatarGetter } from '../assets/utils/avatarGenerator.js';
import { LandscapeComments } from "./Comments.jsx";

import {
  Input,
  Segment,
  Image,
  Header,
  Icon,
  Divider,
} from 'semantic-ui-react';


function Landscape(props) {
  const [pictureIndex, setPictureIndex] = useState(0);
  const [prevPictureIndex, setPrevPictureIndex] = useState(undefined);
  const [inputValue, setInputValue] = useState("");
  const [replyName, setReplyName] = useState("");
  const [replyID, setReplyID] = useState(undefined);


  function replyToComment(name, id){
    setInputValue("@" + name + " ");
    setReplyID(id);
    setReplyName("@" + name + " ");
  }

  return (
    <div className="landscape centerd">
      <div className="container landscape-container">
        <Segment className="segment landscape-segment">

          <div className="landscape-image"
            style={{
              backgroundImage: "url(" + props.post.pictures[prevPictureIndex] + ")" 
            }}
          >
            {
              props.post.pictures.map(
                (picture, index) =>
                <img
                  key={index}
                  src={props.post.pictures[pictureIndex]}
                  style={{display: pictureIndex === index? 'block' : 'none'}}
                  className={prevPictureIndex !== undefined &&
                    (prevPictureIndex < pictureIndex ? "image-slide-right" : "image-slide-left")}
                  />
              )
            }

            <div className="floated-top-left text-button image-button">
              <Icon name="close" size="large" inverted onClick={props.toPortrait} />
            </div>
            {
              pictureIndex > 0 &&
              <div className="floated-left text-button image-button">
                <Icon name="arrow circle left" size="big" inverted onClick={
                  () => {
                    setPictureIndex(pictureIndex - 1);
                    setPrevPictureIndex(pictureIndex);
                  }
                }/>
              </div>
            }
            {
              pictureIndex < props.post.pictures.length-1 &&
              <div className="floated-right text-button image-button">
                <Icon name="arrow circle right" size="big" inverted onClick={
                  () => {
                    setPictureIndex(pictureIndex + 1);
                    setPrevPictureIndex(pictureIndex);
                  }
                }/>
              </div>
            }
            <div className="floated-bottom text-button image-button">
              {
                props.post.pictures.map(
                  (pic, index) => <Icon key={index} size="small" name={index === pictureIndex ? "circle" : "circle outline"} inverted/>
                )
              }
            </div>
          </div>

          <div className="landscape-info">
            <div>
              <div className="header landscape-header">
                <div className="landscape-header">
                  <div className="text-button">
                    <Image src={avatarGetter(props.post.avatar)} avatar className="landscape-header-avatar"/>
                  </div>
                  <div className="landscape-header-text">
                    <div className="text-button">
                      <h4> {props.post.name} &nbsp; &middot; &nbsp; Following </h4>
                    </div>
                    <div className="text-button">
                      <p className="landscape-header-location">{props.post.location}</p>
                    </div>
                  </div>
                </div>

                <div className="text-button">
                  <Icon name="ellipsis horizontal"/>
                </div>
              </div>

              <Divider className="landscape-divider"/>

              <div className="landscape-comments">
                <LandscapeComments comments={props.comments.comments} replyComment={props.comments.replyComment} toLandscape={props.toLandscape} likeComment={props.likeComment} replyLikeComment={props.replyLikeComment} replyToComment={replyToComment}/>
              </div>
            </div>

            <div>
              <Divider className="landscape-divider"/>
              <div className="portrait-image-reactions">
                <div>
                  <Icon className="icon-button-left text-button" onClick = {() => props.toggleLiked(!props.post.liked)} size="large" name={ props.post.liked? "heart" : "heart outline" }/>
                  <Icon className="icon-button-center text-button" size="large" name="comment outline"/>
                  <Icon className="icon-button-center text-button" size="large" name="share square"/>
                </div>
                <div>
                  <Icon className="icon-button-center" size="mini" name=""/>
                  <Icon className="icon-button-center" size="mini" name=""/>
                  <Icon className="icon-button-right text-button" size="large" name="bookmark outline"/>
                </div>
              </div>

              <h5 className="portrait-likes-count portrait-forced-left"> {props.post.likes} likes </h5>

              <div className="portrait-time portrait-forced-left">
                <p className="portrait-time-text"> {props.post.time} AGO </p>
              </div>

              <Divider className="landscape-divider"/>

              <div className="portrait-add-comment">
                <Input transparent placeholder='Add a comment...' value={inputValue} onChange={(e, { value }) => setInputValue(value)}/>
                {
                  inputValue !== ""?
                  (
                    <div className="text-button">
                      <h5 className="post-button" onClick={
                        ()=>{
                          const content = inputValue;

                          if (replyID && content.substring(0,replyName.length) === replyName) {
                            props.replyComment(replyID, content.substring(replyName.length,));
                          } else{
                            props.addComment(content);
                          }
                          setInputValue("");
                          setReplyID(undefined);
                          setReplyName("");
                        }
                      }> Post </h5>
                    </div>
                  ) : (
                    <div className="text-button">
                      <h5 className="post-button-disabled"> Post </h5>
                    </div>
                  )
                }

              </div>
            </div>
          </div>
        </Segment>
      </div>
    </div>
  );
}

const mapStateToProps = ( state ) => {
  return {
    screen: state.screen,
    comments: state.comments,
    post: state.post,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addComment: (content) => dispatch(addComment(content)),
    likeComment: (target) => dispatch(likeComment(target)),
    replyComment: (target,content) => dispatch(replyComment(target,content)),
    replyLikeComment: (target) => dispatch(replyLikeComment(target)),
    toggleLiked: (liked) => dispatch(toggleLiked(liked)),
    toPortrait: () => dispatch(toPortrait()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Landscape)
