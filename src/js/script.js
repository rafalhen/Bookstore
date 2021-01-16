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

  const classNames = {
    favouriteBook: 'favorite',
    hidden: 'hidden',
    bookImage: 'book__image',
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
      thisBooksList.initActions();
      thisBooksList.determineRatingBgc();
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

    render() {
      const thisBooksList = this;
      for(let book of thisBooksList.data){
        book.ratingBgc = thisBooksList.determineRatingBgc(book.rating);
        const generatedHTML = templates.bookTemplate(book);
        const element = utils.createDOMFromHTML(generatedHTML);
        thisBooksList.menuContainer.appendChild(element);

      }
    }


    filterBooks(){
      const thisBooksList = this;
      for(let book of thisBooksList.data){
        const bookToBeHidden = document.querySelector('.book__image[data-id="' + book.id + '"]');
        let shouldBeHidden = false;
        for(let filterName of thisBooksList.filters){
          if(!book.details[filterName]){
            shouldBeHidden = true;
            break;
          }
        }
        if(shouldBeHidden){
          bookToBeHidden.classList.add(classNames.hidden);
        } else {
          bookToBeHidden.classList.remove(classNames.hidden);
        }
      }
    }

    determineRatingBgc(rating) {
      let bgc = '';
      if(rating<6){
        bgc = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%);';
      }
      if(rating >6 && rating<=8){
        bgc = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%);';
      }
      if(rating>8 && rating<=9){
        bgc = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%);';
      }
      if(rating>9){
        bgc = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%);';
      }
      return bgc;
    }



    initActions(){
      const thisBooksList = this;
      thisBooksList.menuContainer.addEventListener('dblclick', function(event){
        event.preventDefault();
        const clickedElement = event.target.offsetParent;

        if(clickedElement.classList.contains(classNames.bookImage)){
          const id = clickedElement.getAttribute('data-id');
          if(!clickedElement.classList.contains(classNames.favouriteBook)){
            thisBooksList.favouriteBooks.push(id);
            clickedElement.classList.add(classNames.favouriteBook);
          } else {
            thisBooksList.favouriteBooks.splice(thisBooksList.favouriteBooks.indexOf(id), 1);
            clickedElement.classList.remove(classNames.favouriteBook);
          }
        }
      });

      thisBooksList.filterWrapper.addEventListener('click', function(event){
        const clickedElement = event.target;
        if(clickedElement.tagName === 'INPUT' && clickedElement.type === 'checkbox' && clickedElement.name === 'filter' ){
          if(clickedElement.checked){
            thisBooksList.filters.push(clickedElement.value);
            thisBooksList.filterBooks();
          } else {
            thisBooksList.filters.splice(thisBooksList.filters.indexOf(clickedElement.value), 1);
            thisBooksList.filterBooks();
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