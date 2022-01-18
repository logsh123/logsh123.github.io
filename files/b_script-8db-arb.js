'use strict'
// плавная прокрутка
const b_anchorsBuy = document.querySelectorAll('a[href*="#b-form"]');

function B_scrollingAnchors(anchors) {
    for (let anchor of anchors) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault()
        
            const blockID = anchor.getAttribute('href').substr(1)
        
            document.getElementById(blockID).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })
        })
    }
}
B_scrollingAnchors(b_anchorsBuy);

// переменные для слайдера
let b_position_0 = "b-position-0";
let b_position_1 = "b-position-1";
let b_position_2 = "b-position-2";
let b_position_3 = "b-position-3";
let b_position_4 = "b-position-4";
let b_active = "b-active";

// slider
function B_sliders(block, btn) {
    for (let i=0; i < btn.length; i++) {
        btn[i].addEventListener('click', () => {
            
            let b_numb_0 = i - 1;
            let b_numb_1 = i;
            let b_numb_2 = i + 1;
            let b_numb_3 = i + 2;
            let b_numb_4 = i + 3;

            for (let y=0; y < block.length; y++) {
                block[y].classList.remove("b-position-0");
                block[y].classList.remove("b-position-1");
                block[y].classList.remove("b-position-2");
                block[y].classList.remove("b-position-3");
                block[y].classList.remove("b-position-4");
                btn[y].classList.remove("b-active");
            }

            function B_addClass2(item, numb, name) {
                let maxLength = item.length - 1;
                if (numb == item.length) {
                    item[0].classList.add(name);
                } else if (numb < 0) {
                    item[maxLength].classList.add(name);
                } else if (numb == (item.length + 1)) {
                    item[1].classList.add(name);
                } else if (numb == (item.length + 2)) {
                    item[2].classList.add(name);
                } else {
                    item[numb].classList.add(name);
                }
            }

            B_addClass2(block, b_numb_0, b_position_0);
            B_addClass2(block, b_numb_1, b_position_1);
            B_addClass2(block, b_numb_2, b_position_2);
            B_addClass2(block, b_numb_3, b_position_3);
            B_addClass2(block, b_numb_4, b_position_4);
            B_addClass2(btn, b_numb_1, b_active);
        });
    }
}

let b_reviewsSlider = document.querySelectorAll('.b-reviews-slider');
let b_reviewsBtn = document.querySelectorAll('.b-btn');

B_sliders(b_reviewsSlider, b_reviewsBtn);


// в лево
function b_sliderLeft(block, btn) {
    
    function B_addClass(item, name) { 
        let b_lenghtClassList = 0;
        let b_maxItem = item.length - 1;
        for (let y=0; y < item.length; y++) {
            let b_next = y - 1;
            b_lenghtClassList = item[y].classList.length; 
            for (let i=0; i < b_lenghtClassList; i++) {
                if (item[y].classList[i] == name) {
                    item[y].classList.remove(name);
                    if (b_next < 0) {
                        item[b_maxItem].classList.add(name);
                        return;
                    } else {
                        item[b_next].classList.add(name);
                        return;
                    }
                }
            }   
        }
    }
    B_addClass(block, b_position_0);
    B_addClass(block, b_position_1);
    B_addClass(block, b_position_2);
    B_addClass(block, b_position_3);
    B_addClass(block, b_position_4);
    B_addClass(btn, b_active);
}
// в право
function b_sliderRight(block, btn) {

    function B_addClass(item, name) { 
        let b_lenghtClassList = 0;
        for (let y=0; y < item.length; y++) {
            let b_next = y + 1;
            b_lenghtClassList = item[y].classList.length; 
            for (let i=0; i < b_lenghtClassList; i++) {
                if (item[y].classList[i] == name) {
                    item[y].classList.remove(name);
                    if (b_next > (item.length -1)) {
                        item[0].classList.add(name);
                        return;
                    } else {
                        item[b_next].classList.add(name);
                        return;
                    }
                }
            }   
        }
    }
    B_addClass(block, b_position_0);
    B_addClass(block, b_position_1);
    B_addClass(block, b_position_2);
    B_addClass(block, b_position_3);
    B_addClass(block, b_position_4);
    B_addClass(btn, b_active);
}
// нажатие на кнопку в лево/право
let b_btnLeft = document.querySelector('#b-left');
b_btnLeft.addEventListener('click', ()=> {
    b_sliderLeft(b_reviewsSlider, b_reviewsBtn);
});
let b_btnRight = document.querySelector('#b-right');
b_btnRight.addEventListener('click', ()=> {
    b_sliderRight(b_reviewsSlider, b_reviewsBtn);
});

// перелистывания пальцем
function B_touchSlider(box, slider, btn) {

    let touchStartX = null; //Точка начала касания
    let touchPositionX = null; //Текущая позиция
    const sensitivity = 50; // Чувствительность

    //Перехватываем события
    box.addEventListener("touchstart", (e)=> {TouchStart(e)}); //Начало касания
    box.addEventListener("touchmove", (e)=> {TouchMove(e)}); //Движение пальцем по экрану
    box.addEventListener("touchend", (e)=> {TouchEnd(e)}); //Пользователь отпустил экран

    function TouchStart(e) {
        //Получаем текущую позицию касания
        touchStartX = e.changedTouches[0].pageX;
    }

    function TouchMove(e) {
        //Получаем новую позицию
        touchPositionX = e.changedTouches[0].pageX;
    }

    function TouchEnd(e) {
        if (touchPositionX < (touchStartX - sensitivity )) {
            b_sliderRight(slider, btn);
        } else if (touchPositionX > (touchStartX + sensitivity)) {
            b_sliderLeft(slider, btn);
        }
    }

}
// 
let b_reviews = document.querySelector('.b-reviews-boxsliders');
B_touchSlider(b_reviews, b_reviewsSlider, b_reviewsBtn);

// -------------------------
// -------------------------
// сбрасывает позици листьев/еды (для ресайза ширены экрана)
function b_itemResize (layer, startX) {
    for (let i=0; i < layer.length; i++) {
        layer[i].style.left = '';
        b_windowWidth = screen.width / 2;
        for (let i=0; i < layer.length; i++) {
            startX[i] = layer[i].offsetLeft;
        }    
    }
}
// при изменении ширены окна
window.addEventListener('resize', function(event){
    b_itemResize(b_layer_1, b_startItemX_1);
    b_itemResize(b_layer_2, b_startItemX_2);
    b_itemResize(b_layer_3, b_startItemX_3);
    b_itemResize(b_layer_4, b_startItemX_4);
});

// собыите движения мыши и движения листьев/еды по слоям

    let b_windowWidth = screen.width / 2;
    let b_windowHeaght = screen.height / 2;
    let b_layer_1 = document.querySelectorAll('.b-layer-1');
    let b_layer_2 = document.querySelectorAll('.b-layer-2');
    let b_layer_3 = document.querySelectorAll('.b-layer-3');
    let b_layer_4 = document.querySelectorAll('.b-layer-4');
    let b_mausX = b_windowWidth;
    let b_mausY = b_windowHeaght;
    // на сколько смешаються
    let b_index_1 = 1;
    let b_index_2 = 3;
    let b_index_3 = 5;
    let b_index_4 = 7;
    // записываю стартовы позиции вирусов
    let b_startItemX_1 = [];
    for (let i=0; i < b_layer_1.length; i++) {
        b_startItemX_1[i] = b_layer_1[i].offsetLeft;
    }
    
    let b_startItemX_2 = [];
    for (let i=0; i < b_layer_2.length; i++) {
        b_startItemX_2[i] = b_layer_2[i].offsetLeft;
    }
    
    let b_startItemX_3 = [];
    for (let i=0; i < b_layer_3.length; i++) {
        b_startItemX_3[i] = b_layer_3[i].offsetLeft;
    }

    let b_startItemX_4 = [];
    for (let i=0; i < b_layer_4.length; i++) {
        b_startItemX_4[i] = b_layer_4[i].offsetLeft;
    }

// 
function B_layerShift_plusLeft(layer, start, maxindex, index) {
    if (layer[0].offsetLeft <= (start[0] + maxindex)) {
        for (let i=0; i < layer.length; i++) {
            layer[i].style.left = layer[i].offsetLeft + index + 'px';
        }
    }
}

function B_layerShift_minusLeft(layer, start, maxindex, index) {
    if (layer[0].offsetLeft >= (start[0] - maxindex)) {
        for (let i=0; i < layer.length; i++) {
            layer[i].style.left = layer[i].offsetLeft - index + 'px';
        }
    }
}
// 
function b_mausEventXY(maxIndex_x1, maxIndex_x2, maxIndex_x3, maxIndex_x4) {
    // maxIndex шаг движения
        // X
        if (event.clientX < b_mausX) {
            b_mausX = event.clientX;
            B_layerShift_minusLeft(b_layer_1, b_startItemX_1, maxIndex_x1, b_index_1);
            B_layerShift_minusLeft(b_layer_2, b_startItemX_2, maxIndex_x2, b_index_2);
            B_layerShift_minusLeft(b_layer_3, b_startItemX_3, maxIndex_x3, b_index_3);
            B_layerShift_minusLeft(b_layer_4, b_startItemX_4, maxIndex_x4, b_index_4);
        } else if (event.clientX > b_mausX) {
            b_mausX = event.clientX;
            B_layerShift_plusLeft(b_layer_1, b_startItemX_1, maxIndex_x1, b_index_1);
            B_layerShift_plusLeft(b_layer_2, b_startItemX_2, maxIndex_x2, b_index_2);
            B_layerShift_plusLeft(b_layer_3, b_startItemX_3, maxIndex_x3, b_index_3);
            B_layerShift_plusLeft(b_layer_4, b_startItemX_4, maxIndex_x4, b_index_4);
        }
    return;
}

window.addEventListener('mousemove', ()=> {
    if (window.screen.width < 994) {
        b_mausEventXY(3, 6, 9, 12);
    } else {
        b_mausEventXY(10, 30, 50, 70);
    }
});

// прокрутка до secret и его анимация
let b_secret = document.querySelector('.b-secret');
let b_secretItem = document.querySelectorAll('.b-secret-item');
let b_secretScroll = b_secret.getBoundingClientRect().top - document.body.getBoundingClientRect().top - (innerHeight * 0.2);
let b_secretScroll_b = b_secret.getBoundingClientRect().bottom - document.body.getBoundingClientRect().top - (innerHeight * 0.1);
function B_secretAnim() {

if ((window.pageYOffset > b_secretScroll) && (window.pageYOffset < b_secretScroll_b)) {
        setTimeout(()=> {
            b_secretItem[0].classList.add("scale-in-center1");
            b_secretItem[1].classList.add("scale-in-center2");
        }, 100);
} else {
    window.addEventListener('scroll', ()=> {
        if ((window.pageYOffset > b_secretScroll) && (window.pageYOffset < b_secretScroll_b)) {
            setTimeout(()=> {
                b_secretItem[0].classList.add("scale-in-center1");
                b_secretItem[1].classList.add("scale-in-center2");
            }, 100);
        }
    });
}
}
B_secretAnim();


// прокрутка до schedule и его анимация
let b_schedule = document.querySelector('.b-schedule-table');
let b_scheduleItem = document.querySelectorAll('.b-schedule-table__item');
let b_scheduleCircle = document.querySelector('.b-schedule-circle').children;
let b_scheduleScroll = b_schedule.getBoundingClientRect().top - document.body.getBoundingClientRect().top - (innerHeight * 0.5);
let b_scheduleScroll_b = b_schedule.getBoundingClientRect().bottom - document.body.getBoundingClientRect().top - (innerHeight * 0.1);
function B_scheduleAnim() {

if ((window.pageYOffset > b_scheduleScroll) && (window.pageYOffset < b_scheduleScroll_b)) {
        setTimeout(()=> {
            b_scheduleItem[0].classList.add("scale-in-center11");
            b_scheduleItem[1].classList.add("scale-in-center22");
            b_scheduleItem[2].classList.add("scale-in-center33");
            b_scheduleItem[3].classList.add("scale-in-center44");

            b_scheduleCircle[0].classList.add("scale-in-center11");
            b_scheduleCircle[1].classList.add("scale-in-center22");
            b_scheduleCircle[2].classList.add("scale-in-center33");
            b_scheduleCircle[3].classList.add("scale-in-center44");
        }, 100);
} else {
    window.addEventListener('scroll', ()=> {
        if ((window.pageYOffset > b_scheduleScroll) && (window.pageYOffset < b_scheduleScroll_b)) {
            setTimeout(()=> {
                b_scheduleItem[0].classList.add("scale-in-center11");
                b_scheduleItem[1].classList.add("scale-in-center22");
                b_scheduleItem[2].classList.add("scale-in-center33");
                b_scheduleItem[3].classList.add("scale-in-center44");

                b_scheduleCircle[0].classList.add("scale-in-center11");
                b_scheduleCircle[1].classList.add("scale-in-center22");
                b_scheduleCircle[2].classList.add("scale-in-center33");
                b_scheduleCircle[3].classList.add("scale-in-center44");
            }, 100);
        }
    });
}
}
B_scheduleAnim();