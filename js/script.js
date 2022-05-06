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
    modal('.modal-catalog', 'modal--active', '[data-modalCatalog]', '.modal-catalog__close');

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

            slider(
                '.catalog__window',
                '.catalog__field',
                '.catalog__card',
                300,
                20,
                false,
                false,
                false,
                '.catalog__arrow--prev',
                '.catalog__arrow--next',
                'catalog__arrow--inactive'
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

    // Подробнее в каталоге

    const catalogData = [
        {
            img: 'img/catalog/img1.png',
            name: 'Canaan Avalon 1066 50th',
            price: '138 000 ₽',
            characteristics: [
                {
                    key: 'Алгоритм',
                    value: 'SHA-256'
                },
                {
                    key: 'Производительность',
                    value: '50 TH/s'
                },
                {
                    key: 'Потребление',
                    value: '3250Вт'
                },
                {
                    key: 'Охлаждение',
                    value: '4 кулера'
                },
                {
                    key: 'Рабочая температура',
                    value: '-5 °C до 35 °C'
                },
                {
                    key: 'Вес',
                    value: '9 кг'
                },
            ],
            description: 'Avalon Miner 1066 с производительностью в 50t – это проверенная уже брендом технология и привычный потребителю формат высокого алюминиевого корпуса. В новом Avalon 1066 50 компания решила выжать максимум из уже известных 16-нм чипов. Показав, что они могут конкурировать на равных с новым поколением 7-нм, на которые выпускаются последние серии асиков.<br><br>При этом цена на новый Avalon Miner 1066 ниже, чем на новые майнеры аналогичной производительности. Еще один аргумент в пользу проверенных технологий.  К тому же помимо BTC  майнер подходит для добычи также Bitcoin Cash,  Crown, Peercoin на алгоритме SHA256.'
        },
        {
            img: 'img/catalog/img2.png',
            name: 'CAntminer Bitmain SJPRO 100th',
            price: '615 000 ₽',
            characteristics: [
                {
                    key: 'Алгоритм',
                    value: 'SHA-256'
                },
                {
                    key: 'Производительность',
                    value: '100 TH/s'
                },
                {
                    key: 'Потребление',
                    value: '3250Вт'
                },
                {
                    key: 'Охлаждение',
                    value: '2 кулера'
                },
                {
                    key: 'Рабочая температура',
                    value: '0 °C - 45 °C'
                },
                {
                    key: 'Размеры',
                    value: '37х19.5х29см'
                },
                {
                    key: 'Вес',
                    value: '13.5 кг'
                },
            ],
            description: 'Ожидаемо, что новая серия топовых майнеров от Bitmain Technologies сразу вышла в лидеры рынка криптооборудования. Хотя есть конкуренты и среди Whatsminer, но асик S19J PRO обходит его по показателям энергоэффективности. <br><br> Поставляется со встроенным блоком питания Битмайн, чтобы снизить любые энергопотери. И оно того стоит, энергоэффективность нового майнера S19J PRO 100 рекордная для таких мощностей – 32,5J/TH. Плюс блок оснащен защитой от перегрева и скачков напряжения, что крайне важно для такой сложной и прибыльной техники.'
        },
        {
            img: 'img/catalog/img3.png',
            name: 'MicroBT WhatsMiner m21s 50th',
            price: '185 000 ₽',
            characteristics: [
                {
                    key: 'Алгоритм',
                    value: 'SHA-256'
                },
                {
                    key: 'Производительность',
                    value: '50 TH/s ± 5%'
                },
                {
                    key: 'Потребление',
                    value: '3360Вт'
                },
                {
                    key: 'Охлаждение',
                    value: '2 кулера'
                },
                {
                    key: 'Рабочая температура',
                    value: '0 °C - 40 °C'
                },
                {
                    key: 'Вес',
                    value: '12.5 кг'
                },
            ],
            description: 'Удачная обновленная мощная линейка асиков Whatsminer M21S выпущена как ответ топовым битмайновским майнерам с большим шагом повышения хэшрейта. Потому асик M21S на 12-нм чипах модели TSMC  выдает 50 терахешей производительности без перегрузок. <br><br> Производитель Pangolinminer обрел не так давно новое название -  MicroBT, однако сохранил свои разработки ASIC-устройств. Потому asic M21S 50T сохранил энергетическую эффективность майнера, а также дизайн с двумя кулерами, которые максимально быстро прогоняют воздух через работающий асик и выводят тепло.'
        },
        {
            img: 'img/catalog/img4.png',
            name: 'MicroBT WhatsMiner m31s 74th',
            price: '365 000 ₽',
            characteristics: [
                {
                    key: 'Алгоритм',
                    value: 'SHA-256'
                },
                {
                    key: 'Производительность',
                    value: '74TH/s'
                },
                {
                    key: 'Потребление',
                    value: '3400Вт'
                },
                {
                    key: 'Охлаждение',
                    value: '2 кулера'
                },
                {
                    key: 'Уровень шума',
                    value: '75Дб'
                },
                {
                    key: 'Рабочая температура',
                    value: '-5°C до 40°C'
                },
                {
                    key: 'Размеры',
                    value: '43x15,5x24м'
                },
                {
                    key: 'Вес',
                    value: '12.5 кг'
                },
            ],
            description: 'Удачная обновленная мощная линейка асиков Whatsminer M21S выпущена как ответ топовым битмайновским майнерам с большим шагом повышения хэшрейта. Потому асик M21S на 12-нм чипах модели TSMC  выдает 50 терахешей производительности без перегрузок. <br><br> Производитель Pangolinminer обрел не так давно новое название -  MicroBT, однако сохранил свои разработки ASIC-устройств. Потому asic M21S 50T сохранил энергетическую эффективность майнера, а также дизайн с двумя кулерами, которые максимально быстро прогоняют воздух через работающий асик и выводят тепло.'
        },
        {
            img: 'img/catalog/img5.png',
            name: 'Antminer Bitmain s17+ 73th',
            price: '240 000 ₽',
            characteristics: [
                {
                    key: 'Алгоритм',
                    value: 'SHA-256'
                },
                {
                    key: 'Производительность',
                    value: '73TH/s ± 5%'
                },
                {
                    key: 'Потребление',
                    value: '2920Вт'
                },
                {
                    key: 'Охлаждение',
                    value: '4 кулера'
                },
                {
                    key: 'Рабочая температура',
                    value: '0 °C до 40 °C'
                },
                {
                    key: 'Вес',
                    value: '11 кг'
                },
            ],
            description: 'Крупнейший майнинг-производитель Bitmain прославился своими стабильно работающими асиками для майнинга, особенно много труда разработчики вкладывают во флагманские модели линеек S17, T17. Такие, как Antminer S17+ 73TH/S, чье сочетание еще в прошлом году поражавшей пределами хэшрейта производительности и энергопотребления вывело Битмайн на новый, недостижимый для некоторых конкурентов, уровень. <br><br> Теперь вы можете купить прибыльный asic S17+ 73T БУ со скидкой, но с сохранением всех его преимуществ. Как то: быстрая система охлаждения при работе с моментальным отводом тепла, легкий и функциональный корпус со встроенным блоком питания.'
        },
        {
            img: 'img/catalog/img6.png',
            name: 'MicroBT WhatsMiner M30s 86th',
            price: '560 000 ₽',
            characteristics: [
                {
                    key: 'Алгоритм',
                    value: 'SHA-256'
                },
                {
                    key: 'Производительность',
                    value: '90 TH/s'
                },
                {
                    key: 'Потребление',
                    value: '3600Вт'
                },
                {
                    key: 'Охлаждение',
                    value: '2 кулера'
                },
                {
                    key: 'Рабочая температура',
                    value: '-5 °C до 35 °C'
                },
                {
                    key: 'Вес',
                    value: '10.6 кг'
                },
            ],
            description: 'Нет никакого секрета, почему компания Whatsminer смогла добиться в своих асиках такой производительности при сохранении легкости, компактности и низкого потребления. Все дело в 444 чипах от Samsung по 8-нм технологиям, при этом значительно модернизированным, потому частично превосходящим даже асики на чипах 7-нм от конкурентов. <br><br> Добывать с  помощью M30S 90TH  можно не только Bitcoin, но и Bitcoin Cash, Crown, Litecoin Cash, Auroracoin. А его мощность легко заткнет за пояс топовые майнеры от Битмайн и других производителей.'
        }
    ]

    function modalCatalog(triggers) {
        const _triggers = document.querySelectorAll(triggers)
        const img = document.querySelector('[data-catImg]')
        const name = document.querySelector('[data-catName]')
        const price = document.querySelector('[data-catPrice]')
        const catUl = document.querySelector('[data-catUl]')
        const description = document.querySelector('[data-catDesc]')

        _triggers.forEach((trigger, index) => {
            trigger.addEventListener('click', () => {
                catalogData.forEach((item, index2) => {
                    if (index === index2) {
                        img.setAttribute('src', `${item.img}`)
                        name.textContent = item.name
                        price.textContent = item.price
                        description.innerHTML = item.description
                        catUl.innerHTML = "";
                        item.characteristics.forEach(charact => {
                            catUl.insertAdjacentHTML('beforeend', `<li class="catalog__card__li modal-catalog__li"><span>${charact.key}</span> <span>${charact.value}</span></li>`)
                        })
                    }
                })
            })
        })

    }

    modalCatalog('[data-modalcatalog]')

});