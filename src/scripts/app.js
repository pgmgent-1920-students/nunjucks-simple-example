// imports
import '../styles/main.css';
const nunjucks = require('nunjucks');

// nunjucks configuration
const TEMPLATES_PATH = './templates';
nunjucks.configure(TEMPLATES_PATH, {
  autoescape: true
});

// on load and on hasChange, read route and render template
window.onload = () => {initHashRouter()};
window.onhashchange = () => {initHashRouter();};

// translate url to correct route
function initHashRouter() {
  const hash = document.location.hash.split('#!/')
  const route = (hash.length == 2) ? hash[1] : '404';
  renderTemplate(route);
}

function renderTemplate(route) {
  let data;
  let templateFile = route;
  switch (route) {
    case '':
    case 'home':
      templateFile = 'home' 
      data = {
        title: 'Hello PGM',
        content: 'lorem ipsum dolor ...'
      };
      break;
    case 'about':
      data = {
        title: 'About PGM',
        content: 'lorem ipsum dolor ...'
      };
      break;
    case 'contact':
      data = {
        title: 'Contact us',
        content: 'Contacteer ons',
        email: 'frederick.roegiers@arteveldehs.be'
      };
      break;
    default: // route not found
      templateFile = '404'
      data = {
        title: '404 - not found',
        description: 'asjemenou'
      }
      break;
  }

  // render home template with data
  let template = nunjucks.render(`${templateFile}.html`, data);
  document.getElementById('app').innerHTML = template;
}