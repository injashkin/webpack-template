import './main.scss';
import './fonts/fonts.scss';

function component(text) {
  const element = document.createElement('h1');
  element.textContent = text;
  return element;
}

document.body.prepend(component('Проект собран на Webpack'));
