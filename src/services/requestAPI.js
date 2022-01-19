const REQUEST_TOKEN = 'https://opentdb.com/api_token.php?command=request';
const REQUEST_API = 'https://opentdb.com/api.php?amount=5&token=';
const REQUEST_CATEGORY = 'https://opentdb.com/api_category.php';

export const requestToken = () => fetch(REQUEST_TOKEN)
  .then((response) => response.json())
  .then((data) => data.token);

export const getQuestions = async (token, configs) => {
  const { type, dificulty, category } = configs;
  if (category === '' && dificulty === '' && type === '') {
    return fetch(`${REQUEST_API}${token}`)
      .then((response) => response.json());
  }
  const config = `&type=${type}&difficulty=${dificulty}&category=${category}`;
  return fetch(`${REQUEST_API}${token}${config}`)
    .then((response) => response.json());
};

export const getCategory = () => fetch(REQUEST_CATEGORY)
  .then((response) => response.json())
  .then((data) => data.trivia_categories);
