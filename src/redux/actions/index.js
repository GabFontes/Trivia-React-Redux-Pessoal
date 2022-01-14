export const USER_LOGIN = 'USER_LOGIN';
export const SAVE_TOKEN = 'SAVE_TOKEN';
export const SAVE_POINTS = 'SAVE_POINTS';

export const userLogin = (payload) => ({
  type: USER_LOGIN,
  payload,
});

export const token = (payload) => ({
  type: SAVE_TOKEN,
  payload,
});

export const points = (payload) => ({
  type: SAVE_POINTS,
  payload,
});
