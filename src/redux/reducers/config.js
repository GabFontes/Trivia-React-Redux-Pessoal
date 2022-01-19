import { SET_CONFIG } from '../actions';

const INITAL_STATE = {
  category: '',
  dificulty: '',
  type: '',
};

const config = (state = INITAL_STATE, { type, payload }) => {
  switch (type) {
  case SET_CONFIG:
    return {
      ...state,
      category: payload.category,
      dificulty: payload.dificulty,
      type: payload.type,
    };
  default:
    return state;
  }
};

export default config;
