import { USER_LOGIN } from '../actions';

const INITAL_STATE = {
  name: '',
  assertions: '',
  score: '',
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
  default:
    return state;
  }
}

export default user;
