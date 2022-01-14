const REQUEST_TOKEN = 'https://opentdb.com/api_token.php?command=request';
const REQUEST_API = 'https://opentdb.com/api.php?amount=5&token=';

export const requestToken = () => fetch(REQUEST_TOKEN)
  .then((response) => response.json())
  .then((data) => data.token);

export const getQuestions = (token) => fetch(`${REQUEST_API}${token}`)
  .then((response) => response.json())
  .then((data) => data.results);
