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

  const templates = {
    bookTemplate: Handlebars.compile(document.querySelector(select.templateOf.bookTemplate).innerHTML),
  };

  class BooksList {
    constructor(){
      const thisBooksList = this;
      thisBooksList.initData();
      thisBooksList.getElements();
      thisBooksList.render();
    }

    initData(){
      const thisBooksList = this;
      thisBooksList.data = dataSource.books;
    }

    getElements(){
      const thisBooksList = this;

      thisBooksList.menuContainer = document.querySelector(select.containerOf.bookList);
    }

    render(){
      const thisBooksList = this;

      for(let book of thisBooksList){
        const generatedHTML = templates.bookTemplate(book);
        const element = utils.createDOMFromHTML(generatedHTML);
        thisBooksList.menuContainer.appendChild(element);
      }
    }
  }

  const app = {
    initializeProject: function(){
      new BooksList();
    }
  };
  app.initializeProject();
}
