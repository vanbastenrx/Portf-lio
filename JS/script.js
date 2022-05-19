"use strict";

// Scroll
const menu = document.querySelectorAll(".nav-item");

const getScrollTopByHref = (el) => {
  const id = el.getAttribute("href");
  return document.querySelector(id).offsetTop;
};

const scrollToIdOnClick = (event) => {
  event.preventDefault();
  const to = getScrollTopByHref(event.target);
  scrollToPosition(to);
};

menu.forEach((item) => {
  item.addEventListener("click", scrollToIdOnClick);
});

const scrollToPosition = (to) => {
  window.scroll({
    top: to,
    behavior: "smooth",
  });
};

//Slider
const slider = () => {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotContainer = document.querySelector(".dots");

  let curSlide = 0;
  const maxSlide = slides.length;

  const createDots = () => {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = (slide) => {
    document
      .querySelectorAll(".dots_dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots_dot--active");
  };

  const goToSlide = (slide) => {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  const nextSlide = () => {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = () => {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = () => {
    goToSlide(0);
    createDots();
    activateDot(0);
  };
  init();

  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") prevSlide();
    e.key === "ArrowRight" && nextSlide();
  });

  dotContainer.addEventListener("click", (e) => {
    if (e.target.classList.contais("dots__dot")) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();
