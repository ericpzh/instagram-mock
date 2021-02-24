import { connect } from 'react-redux';
import './App.css';
import './assets/styles/Portrait.css';
import './assets/styles/Landscape.css';
import './assets/styles/Comments.css';
import 'semantic-ui-css/semantic.min.css';
import Portrait from "./screens/Portrait";
import Landscape from "./screens/Landscape";
import useWindowDimension from "./assets/utils/useWindowDimension.js";
import { updateSize } from "./actions/screenActions.js";
import { toPortrait } from "./actions/screenActions.js";

function App(props) {
  const { height, width } = useWindowDimension();
  props.updateSize(height, width);

  if (width < 800) {
    props.toPortrait();
    return (
      <Portrait/>
    )
  }

  return (
    <div className="App">
      {
        props.isPortrait ? <Portrait/> : <Landscape/>
      }
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isPortrait: state.screen.isPortrait,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateSize: (height, width) => dispatch(updateSize(height, width)),
    toPortrait: () => dispatch(toPortrait()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
