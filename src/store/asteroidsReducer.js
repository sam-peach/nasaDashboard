import axios from "axios";
import history from "../history";
import { nasaKey } from "../keys";

/**
 * ACTION TYPES
 */
const GET_ASTEROIDS = "GET_ASTEROIDS";

/**
 * INITIAL STATE
 */
const defaultState = [];

/**
 * ACTION CREATORS
 */
const getAsteroidsAction = (asteroids) => ({ type: GET_ASTEROIDS, asteroids });

/**
 * THUNK CREATORS
 */
export const getAsteroids = () => async (dispatch) => {
  const { data } = await axios.get(
    `https://api.nasa.gov/neo/rest/v1/feed?start_date=2019-07-01&end_date=2019-07-01&api_key=${nasaKey}`
  );
  dispatch(getAsteroidsAction(data.near_earth_objects));
};
/**
 * REDUCER
 */
export default function(state = defaultState, action) {
  switch (action.type) {
    case GET_ASTEROIDS: {
      const data = action.asteroids["2019-07-01"];
      const holdArr = [];
      data.forEach((el) => {
        const size = parseInt(
          el.estimated_diameter.feet.estimated_diameter_max
        );
        const dist = parseInt(el.close_approach_data[0].miss_distance.miles);
        holdArr.push({ size: size, dist: dist, index: 1 });
      });
      return holdArr;
    }
    default:
      return state;
  }
}
