const scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true
});
const target = document.querySelector('#js-target');
scroll.scrollTo(target);
