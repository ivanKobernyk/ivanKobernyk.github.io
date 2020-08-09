$(function () {
    $('.photo__slider').slick({
        prevArrow: '<button class="slick-prev" type="button"><img class="slick__img"src="images/arrow-left.svg" alt=""></button>',
        nextArrow: '<button class="slick-next" type="button"><img class="slick__img"src="images/arrow-right.svg" alt=""></button>',
    });

$('.menu__btn').on('click', function () {
    $('.menu__list').slideToggle();
});
});