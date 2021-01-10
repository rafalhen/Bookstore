const { render } = require("node-sass");

{
  'use strict';

  const select = {
    templateOf: {
      bookTemplate: '#template-book',
    },
    containerOf: {
      bookList: '.books-list',
      filters: '.filters',
    },
  };

  render() {
    const thisBooksList = this;
    for(let book of thisBooksList.data){
      const generatedHTML = templates.bookTemplate(book);
      const element = utils.createDOMFromHTML(generatedHTML);
      thisBooksList.menuContainer.appendChild(element);
    };
  };
}
