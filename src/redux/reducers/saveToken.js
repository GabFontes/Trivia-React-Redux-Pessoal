import { SAVE_TOKEN } from '../actions';

const INITAL_STATE = '';

function token(state = INITAL_STATE, { type, payload }) {
  switch (type) {
    case SAVE_TOKEN:
      return payload;
    default:
      return state;
  }
};

export default token;
