import { RESET_USER_LOGIN, SAVE_POINTS, USER_LOGIN } from '../actions';

const INITAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

function user(state = INITAL_STATE, { type, payload }) {
  switch (type) {
  case USER_LOGIN:
    return {
      ...state,
      name: payload.name,
      gravatarEmail: payload.email,
    };
  case SAVE_POINTS:
    return {
      ...state,
      score: state.score + payload.score,
      assertions: state.assertions + payload.assertions,
    };
  case RESET_USER_LOGIN:
    return INITAL_STATE;
  default:
    return state;
  }
}

export default user;
