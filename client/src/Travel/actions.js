import { SET_LOCATION, GET_FLIGHT } from './actionTypes';
import axios from 'axios';

export const setLocation = (location) => ({ type: SET_LOCATION, location });

export const getFlight = (flight) => ({ type: GET_FLIGHT, flight });

export const fetchFlight = (from, to) => dispatch => {
  axios.get(`https://www.google.com/flights/#search;f=${from};t=${to};mc=m`)
    .then(flight => dispatch(getFlight(flight)));
};