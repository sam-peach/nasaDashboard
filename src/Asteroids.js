import React from "react";
import { connect } from "react-redux";
import { getAsteroids } from "./store/asteroidsReducer";
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  MarkSeries
} from "react-vis";

class Asteroids extends React.Component {
  componentDidMount() {
    this.props.getAsteroids();
  }

  render() {
    return (
      <div>
        Asteroids
        {this.props.asteroids.length ? (
          <XYPlot width={window.innerWidth} height={window.innerHeight}>
            <VerticalGridLines style={{ stroke: "white" }} />
            <HorizontalGridLines style={{ stroke: "white" }} />
            <XAxis />
            <YAxis />
            <MarkSeries
              className="mark-series-example"
              strokeWidth={2}
              color={"ff0000"}
              opacity="0.8"
              data={this.props.asteroids.length ? this.props.asteroids : []}
            />
          </XYPlot>
        ) : (
          []
        )}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    asteroids: state.asteroids
  };
};

const mapDispatch = (dispatch) => {
  return {
    getAsteroids: () => dispatch(getAsteroids())
  };
};

export default connect(
  mapState,
  mapDispatch
)(Asteroids);
