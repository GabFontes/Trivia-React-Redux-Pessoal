const toggleAnsweredClass = () => {
  const alternatives = document.querySelector('.questions');
  alternatives.classList.toggle('answered');
};

export default toggleAnsweredClass;
