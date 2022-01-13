const REQUEST_TOKEN = 'https://opentdb.com/api_token.php?command=request';

const requestToken = () => fetch(REQUEST_TOKEN)
  .then((response) => response.json())
  .then((data) => data.token);

export default requestToken;
