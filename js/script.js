"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const videoModal = document.getElementById("myModal");
  const videoFrame = document.getElementById("video");
  let videoSrc = "";

  document.querySelectorAll(".play-btn").forEach((button) => {
    button.addEventListener("click", () => {
      videoSrc = button.getAttribute("data-src") || "";
    });
  });

  if (videoModal && videoFrame) {
    videoModal.addEventListener("shown.bs.modal", () => {
      if (!videoSrc) return;
      videoFrame.setAttribute(
        "src",
        `${videoSrc}?autoplay=1&modestbranding=1&showinfo=0`
      );
    });

    videoModal.addEventListener("hide.bs.modal", () => {
      videoFrame.setAttribute("src", videoSrc);
    });
  }

  if (document.querySelector(".slider")) {
    new Swiper(".slider", {
      effect: "fade",
      navigation: {
        nextEl: ".main-slider-button-next",
        prevEl: ".main-slider-button-prev",
      },
    });
  }

  if (document.querySelector(".services-swiper")) {
    new Swiper(".services-swiper", {
      slidesPerView: 5,
      spaceBetween: 120,
      freeMode: true,
      pagination: {
        el: ".services-pagination",
        clickable: true,
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        572: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 4,
        },
        1280: {
          slidesPerView: 5,
        },
      },
    });
  }
});