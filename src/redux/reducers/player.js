import { SAVE_POINTS, USER_LOGIN } from '../actions';

const INITAL_STATE = {
  name: '',
  assertions: '',
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
      score: state.score + payload,
    };
  default:
    return state;
  }
}

export default user;
