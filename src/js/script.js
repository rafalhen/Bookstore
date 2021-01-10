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

  const classNames = {
    favouriteBooks: 'favorite',
    hidden: 'hidden',
    bookImage: 'book_image',
  }

  class BooksList {
    constructor(){
      const thisBooksList = this;
      thisBooksList.initData();
      thisBooksList.getElements();
      thisBooksList.render();
      thisBooksList.initAction();
    }

    initData(){
      const thisBooksList = this;
      thisBooksList.data = dataSource.books;
    }

    getElements(){
      const thisBooksList = this;

      thisBooksList.menuContainer = document.querySelector(select.containerOf.bookList);
      thisBooksList.filterWrapper = document.querySelector(select.containerOf.filters);
      thisBooksList.favouriteBooks = [];
      thisBooksList.filters = [];
    }

    render(){
      const thisBooksList = this;

      for(let book of thisBooksList.data){
        const generatedHTML = templates.bookTemplate(book);
        const element = utils.createDOMFromHTML(generatedHTML);
        thisBooksList.menuContainer.appendChild(element);
      }
    }



    initAction(){
      const thisBooksList = this;

      thisBooksList.menuContainer.addEventListener('dblclick', function(event){
        event.preventDefault();
        const clickedElement = event.target.offsetParent;

        if(clickedElement.classList.contains(classNames.bookImage)){
          const id = clickedElement.getAttribute('data-id');
          if(!clickedElement.classList.contains(classNames.favouriteBooks)){
            thisBooksList.favouriteBooks.push(id);
            clickedElement.classList.add(classNames.favouriteBooks);
          } else {
            thisBooksList.favouriteBooks.splice(thisBooksList.favouriteBooks.indexOf(id), 1);
            clickedElement.classList.remove(classNames.favouriteBooks);
          }
        }
      });

      thisBooksList.filterWrapper.addEventListener('click', function(event){
        const clickedElement = event.target;
        if(clickedElement.tagName === 'INPUT' && clickedElement.type === 'checkbox' && clickedElement.name === 'filter' ){
          if(clickedElement.checked) {
            thisBooksList.filters.push(clickedElement.value);

          } else {
            thisBooksList.filters.splice(thisBooksList.filters.indexOf(clickedElement.value), 1);

          }
        }
      });
    }
  }

  const app = {
    initializeProject: function(){
      new BooksList();
    }
  };
  app.initializeProject();
}
