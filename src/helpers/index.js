const toggleAnsweredClass = () => {
  const alternatives = document.querySelectorAll('.questions');
  alternatives.forEach((button) => {
    button.classList.toggle('answered');
  });
};

export default toggleAnsweredClass;
