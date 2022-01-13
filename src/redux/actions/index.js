export const USER_LOGIN = 'USER_LOGIN';
export const SAVE_TOKEN = 'SAVE_TOKEN';

export const userLogin = (payload) => ({
  type: USER_LOGIN,
  payload,
});

export const token = (payload) => ({
  type: SAVE_TOKEN,
  payload,
});
