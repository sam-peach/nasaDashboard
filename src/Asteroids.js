import React from "react";
import { connect } from "react-redux";
import { getAsteroids } from "./store/asteroidsReducer";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

class Asteroids extends React.Component {
  componentDidMount() {
    this.props.getAsteroids();
  }

  render() {
    return (
      <div style={{ minHeight: "350px" }}>
        Asteroids
        {this.props.asteroids.length ? (
          <ScatterChart
            width={800}
            height={250}
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
            <XAxis
              type="category"
              dataKey="size"
              interval={0}
              tick={{ fontSize: 0 }}
              tickLine={{ transform: "translate(0, -6)" }}
            />
            <YAxis
              dataKey="index"
              // name="sunday"
              // height={1}
              padding={{ top: 125 }}
              domain={[0, 1]}
              width={80}
              tick={false}
              tickLine={false}
              axisLine={false}
              label={{ value: "Asteroids", position: "insideRight" }}
            />
            <ZAxis
              type="number"
              dataKey="size"
              // domain={domain}
              range={[100, 10000]}
            />
            <Tooltip
              cursor={{ strokeDasharray: "3 3" }}
              wrapperStyle={{ zIndex: 100 }}
              content={this.renderTooltip}
            />
            <Scatter data={this.props.asteroids} fill="#8884d8" />
          </ScatterChart>
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
