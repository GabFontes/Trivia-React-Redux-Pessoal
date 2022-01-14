const toggleAnsweredClass = () => {
  const alternatives = document.querySelectorAll('.questions');
  alternatives.forEach((button) => {
    button.classList.toggle(button.name === 'correct-answer' ? 'correct' : 'incorrect');
  });
};

export default toggleAnsweredClass;
