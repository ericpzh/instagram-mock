import { useState } from 'react';
import { connect } from 'react-redux';
import store from "../store";
import { addComment, likeComment } from "../actions/commentsActions.js";
import { toggleLiked } from "../actions/postActions.js";
import { toLandscape } from "../actions/screenActions.js";
import { avatarGetter } from '../assets/utils/avatarGenerator.js';
import { PortraitComments } from "./Comments.jsx";
import {
  Input,
  Segment,
  Image,
  Icon,
  Divider,
} from 'semantic-ui-react';

function Portrait(props) {
  const [pictureIndex, setPictureIndex] = useState(0); //current post picture
  const [prevPictureIndex, setPrevPictureIndex] = useState(undefined); //previous post picture
  const [inputValue, setInputValue] = useState(""); //state of input below

  return (
    <div className="portrait">
      <div className="container">
        <Segment className="segment">
          <div className="header portrait-header">
            <div className="portrait-header">
              <div className="text-button">
                <Image src={avatarGetter(props.post.avatar)} avatar className="portrait-header-avatar"/>
              </div>
              <div className="portrait-header-text">
                <div className="text-button">
                  <h4 className="portrait-header-name"> {props.post.name} </h4>
                </div>
                <div className="text-button">
                  <p className="portrait-header-location">{props.post.location}</p>
                </div>
              </div>
            </div>
            <div className="text-button">
              <Icon name="ellipsis horizontal"/>
            </div>
          </div>

          <div className="portrait-image">
            <div className="portrait-image-wrapper"
              style={{ backgroundImage: "url(" + props.post.pictures[prevPictureIndex] + ")" }}
            >
              {
                props.post.pictures.map( //picture array to allow slide show
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

              {
                pictureIndex > 0 &&
                <div className="floated-left text-button image-button">
                  <Icon name="arrow circle left" size="big" inverted onClick={
                    () => { //left click
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
                    () => { //right click
                      setPictureIndex(pictureIndex + 1);
                      setPrevPictureIndex(pictureIndex);
                    }
                  }/>
                </div>
              }
            </div>


            <div className="portrait-image-reactions">
              <div>
                <Icon className="icon-button-left text-button" onClick = {() => props.toggleLiked(!props.post.liked)} size="large" name={ props.post.liked? "heart" : "heart outline" }/>
                <Icon className="icon-button-center text-button" onClick = {props.toLandscape} size="large" name="comment outline"/>
                <Icon className="icon-button-center text-button" size="large" name="share square"/>
              </div>
              <div>
                {
                  props.post.pictures.map( //dots indicator of pictures
                    (pic, index) => <Icon key={index} size="mini" name={index === pictureIndex ? "circle" : "circle outline"} />
                  )
                }
              </div>
              <div>
                <Icon className="icon-button-center" size="mini" name=""/>
                <Icon className="icon-button-center" size="mini" name=""/>
                <Icon className="icon-button-right text-button" size="large" name="bookmark outline"/>
              </div>
            </div>
          </div>

          <h5 className="portrait-likes-count portrait-forced-left"> {props.post.likes} likes </h5>

          <div className="portrait-comments">
            <PortraitComments comments={props.comments.comments} toLandscape={props.toLandscape} likeComment={props.likeComment}/>
          </div>

          <div className="portrait-time portrait-forced-left">
            <p className="portrait-time-text"> {props.post.time} AGO </p>
          </div>

          <Divider className="divider"/>

          <div className="portrait-add-comment">
            <Input transparent placeholder='Add a comment...' value={inputValue} onChange={(e, { value }) => setInputValue(value)}/>
            {
              inputValue !== ""?
              (
                <div className="text-button">
                  <h5 className="post-button" onClick={
                    ()=>{ //on 'post' hit
                      props.addComment(inputValue);
                      setInputValue("");
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
    toggleLiked: (liked) => dispatch(toggleLiked(liked)),
    toLandscape: () => dispatch(toLandscape()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Portrait)
