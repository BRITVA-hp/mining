document.addEventListener('DOMContentLoaded', () => {

        // burger
        function burger(burger, menu, menuActiveClass, burgerClose, elements) {
            const _burger = document.querySelector(burger);
            const _menu = document.querySelector(menu);
            const _burgerClose = document.querySelector(burgerClose);
            const _elements = document.querySelectorAll(elements);
            _burger.addEventListener('click', () => {
                _menu.classList.add(menuActiveClass);
            });
            _burgerClose.addEventListener('click', () => {
                _menu.classList.remove(menuActiveClass);
            });
            _elements.forEach(item => {
                item.addEventListener('click', () => {
                    _menu.classList.remove(menuActiveClass);
                });
            });
        }
    
        burger('.main__burger', '.main__nav-mob', 'main__nav-mob--active', '.main__nav-mob__close', '.main__li-mob');


          // функция для модалки

    function calcScroll() {
        let div = document.createElement('div');
      
        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';
      
        document.body.appendChild(div);
        let scarollWidth = div.offsetWidth - div.clientWidth;
        div.remove();
      
        return scarollWidth;
    }

    let scrollWidth = calcScroll();

    function modal(modal, modalActiveClass, triggers, modalClose) {
        const triggers_ = document.querySelectorAll(triggers),
              modal_ = document.querySelector(modal),
              modalClose_ = document.querySelector(modalClose);

        if (triggers_.length > 0) {
            triggers_.forEach(item => {
                item.addEventListener('click', () => {
                    modal_.classList.add(modalActiveClass);
                    document.body.style.overflow = 'hidden';
                    document.body.style.marginRight = `${scrollWidth}px`;
                });
            });

            modalClose_.addEventListener('click', () => {
                modal_.classList.remove(modalActiveClass);
                document.body.style.overflow = '';
                document.body.style.marginRight = '0px';
            });
    
            modal_.addEventListener('click', (e) => {
                if (e.target.classList.contains(modal.replace(/\./, ''))) {
                    modal_.classList.remove(modalActiveClass);
                    document.body.style.overflow = '';
                    document.body.style.marginRight = '0px';
                }
            });
        }
    }

    modal('.modal-main', 'modal--active', '[data-modal]', '.modal-main__close');

              // Функция слайдера
              function slider(window, field, cards, cardWidth, margin, dotsWrap, dotClass, dotClassActive, arrowPrev, arrowNext, arrowClass, sliderName, sliderSlideName) {
                const window_ = document.querySelector(window),
                    field_ = document.querySelector(field),
                    cards_ = document.querySelectorAll(cards),
                    arrowPrev_ = document.querySelector(arrowPrev),
                    arrowNext_ = document.querySelector(arrowNext),
                    sliderName_ = document.querySelector(sliderName),
                    sliderSlideName_ = document.querySelectorAll(sliderSlideName);
        
                let startPoint,
                    swipeAction,
                    endPoint,
                    sliderCounter = 0,
                    dots_ = [];
        
                // Устанавливаем фиксированную ширину поля слайдов
        
                field_.style.width = `${cardWidth * cards_.length + (margin * (cards_.length - 1))}px`;
                field_.style.marginLeft = '20px';
                field_.style.marginRight = '20px';
        
                // Слайд следующий
        
                function slideNext() {
                    sliderCounter++;
                    arrowNext_.classList.remove(arrowClass);
                    arrowPrev_.classList.remove(arrowClass);
                    if (sliderCounter >= cards_.length) {
                        sliderCounter = cards_.length - 1;
                    }
                    if ((sliderCounter + 1) == cards_.length) {
                        arrowNext_.classList.add(arrowClass);
                    }
                    if (dotsWrap) {
                        dots_.forEach((item, index)=> {
                        item.classList.remove(dotClassActive);
                        if (index == sliderCounter) {
                            item.classList.add(dotClassActive);
                        }
                        });
                    }
                    field_.style.transform = `translateX(-${(cardWidth + margin) * sliderCounter}px)`;
                    if (sliderName_) {
                    }
                }
        
                // Слайд предыдущий
        
                function slidePrev() {
                    sliderCounter--;
                    arrowNext_.classList.remove(arrowClass);
                    arrowPrev_.classList.remove(arrowClass);
                    if (sliderCounter <= 0) {
                        sliderCounter = 0;
                    }
                    if (sliderCounter == 0) {
                        arrowPrev_.classList.add(arrowClass);
                    }
                    if (dotsWrap) {
                        dots_.forEach((item, index)=> {
                            item.classList.remove(dotClassActive);
                            if (index == sliderCounter) {
                                item.classList.add(dotClassActive);
                            }
                        });
                    }
                    field_.style.transform = `translateX(-${(cardWidth + margin) * sliderCounter}px)`;
                    if (sliderName_) {
                    }
                }
        
                // Рендер точек
        
                if (dotsWrap) {
                    const dotsWrap_ = document.querySelector(dotsWrap);
            
                    cards_.forEach(() => {
                        const dot = document.createElement('div');
                        dot.classList.add(dotClass);
                        dotsWrap_.appendChild(dot);
                        dots_.push(dot);
                    });
                    dots_[0].classList.add(dotClassActive);
                    dots_.forEach((item, index) => {
                        item.addEventListener('click', () => {
                        sliderCounter = index;
                        arrowNext_.classList.remove(arrowClass);
                        arrowPrev_.classList.remove(arrowClass);
                        if (sliderCounter == 0) {
                            arrowPrev_.classList.add(arrowClass);
                        }
                        if ((sliderCounter + 1) == cards_.length) {
                            arrowNext_.classList.add(arrowClass);
                        }
                        dots_.forEach(item_ => {
                            item_.classList.remove(dotClassActive);
                        });
                        item.classList.add(dotClassActive);
                        field_.style.transform = `translateX(-${(cardWidth + margin) * sliderCounter}px)`;
                        });
                    });
                }
        
                // Переключение на стрелки
        
                arrowPrev_.addEventListener('click', () => {
                    slidePrev();
                });
        
                arrowNext_.addEventListener('click', () => {
                    slideNext();
                });
        
                // Свайп слайдов тач-событиями
        
                window_.addEventListener('touchstart', (e) => {
                    startPoint = e.changedTouches[0].pageX;
                });
        
                window_.addEventListener('touchmove', (e) => {
                    swipeAction = e.changedTouches[0].pageX - startPoint;
                    field_.style.transform = `translateX(${swipeAction + (-(cardWidth + margin) * sliderCounter)}px)`;
                });
        
                window_.addEventListener('touchend', (e) => {
                    endPoint = e.changedTouches[0].pageX;
                    if (Math.abs(startPoint - endPoint) > 50) {
                        arrowNext_.classList.remove(arrowClass);
                        arrowPrev_.classList.remove(arrowClass);
                        if (endPoint < startPoint) {
                            slideNext();
                        } else {
                            slidePrev();
                        }
                    } else {
                        field_.style.transform = `translateX(-${(cardWidth + margin) * sliderCounter}px)`;
                    }
                });
            }
        
            slider(
                '.cons__window--desc',
                '.cons__field--desc',
                '.cons__card--desc',
                350,
                20,
                false,
                false,
                false,
                '.cons__arrow--prev',
                '.cons__arrow--next',
                'cons__arrow--inactive'
            );

    // Видео

    function video() {
        const play = document.querySelectorAll('.cons__play'),
            video = document.querySelector('#video'),
            modalVideo = document.querySelector('.modal-video');

        play.forEach(item => {
            item.addEventListener('click', (e) => {
                const path = e.currentTarget.getAttribute('data-video');
                modalVideo.classList.add('modal--active');
                document.body.style.overflow = 'hidden';
                video.setAttribute('src', path);
                video.play();
            });
        });

        modalVideo.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal--active')) {
                modalVideo.classList.remove('modal--active');
                video.pause();
                document.body.style.overflow = '';
            }
        });
    }

    video();

    const forms = document.querySelectorAll('form');

       forms.forEach(item => {
           bindPostData(item);
       });

       const postData = async (url, data) => {
           let res = await fetch(url, {
               method: "POST",
               headers: {
                   'Content-Type': 'application/json'
               },
               body: data
           });

           return await res.json();
       };

       async function getResource(url) {
           let res = await fetch(url);

           if (!res.ok) {
               throw new Error(`Could not fetch ${url}, status: ${res.status}`);
           }

           return await res.json();
       }

       function bindPostData(form) {
           form.addEventListener('submit', (e) => {
               e.preventDefault();

               const formData = new FormData(form);
  
               const data = {
                    api_token: 'kDyfNjQ02nt7Mceh3sqMOnIbKJEcBeyVD9ZqZ5oSABGWCKDZOpipGEiTijFR',
                    name: formData.get('name'),
                    phone: formData.get('phone').replace(/[^0-9]/g,""),
                    //host: window.location.host,
                    host: 'miner-boost.ru',
                    referrer: document.referrer,
                    url_query_string: window.location.href
               }; 

               if (data.name.length === 0 || data.phone.length === 0 ){
                   alert("Не все поля заполнены!!!")
                   return
               }

               const json = JSON.stringify(data);
            
               postData('https://in.leads-hunter.com/api/v1/lead.add', json)
                   .then(data => {
                       console.log(data);
                       if (data.data.response === 200 || data.data.response === 201){
                        alert("Заявка успешно оформлена!")
                    }
                      // showThanksModal(message.success);
                       statusMessage.remove();
                   }).catch(() => {
                       // showThanksModal(message.failure);
                   }).finally(() => {
                       form.reset();
                   });
           });
       }

});