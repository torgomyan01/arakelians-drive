function $(target) {
  return document.querySelectorAll(target);
}

function $el(target) {
  return document.querySelector(target);
}

document.addEventListener('DOMContentLoaded', function() {
  const faqContainer = document.getElementById('faq-container');
  let currentlyOpen = null;

  // Проверяем, что контейнер FAQ существует
  if (faqContainer) {
    // Կարգավորել CSS անցումներ
    const style = document.createElement('style');
    style.textContent = `
      .faq-content {
        transition: max-height 0.7s ease;
        overflow: hidden;
      }
      
      .rotate-180 {
        transform: rotate(180deg);
        transition: transform 0.3s ease;
      }
    `;
    document.head.appendChild(style);

    const faqButtons = faqContainer.querySelectorAll('button[data-faq-index]');
    
    faqButtons.forEach(button => {
      button.addEventListener('click', function() {
        const index = this.getAttribute('data-faq-index');
        const content = this.nextElementSibling;
        const arrow = this.querySelector('svg');

        if (currentlyOpen === index) {
          closeFaq(content, arrow);
          currentlyOpen = null;
        } else {
          if (currentlyOpen) {
            const prevButton = faqContainer.querySelector(`button[data-faq-index="${currentlyOpen}"]`);
            if (prevButton) {
              const prevContent = prevButton.nextElementSibling;
              const prevArrow = prevButton.querySelector('svg');
              closeFaq(prevContent, prevArrow);
            }
          }
          openFaq(content, arrow);
          currentlyOpen = index;
        }
      });
    });

    function openFaq(content, arrow) {
      if (!content || !arrow) return;
      content.style.maxHeight = content.scrollHeight + 'px';
      arrow.classList.add('rotate-180');
      content.parentElement.classList.add('active');
    }

    function closeFaq(content, arrow) {
      if (!content || !arrow) return;
      content.style.maxHeight = '0px';
      arrow.classList.remove('rotate-180');
      content.parentElement.classList.remove('active');
    }

    window.addEventListener('resize', function() {
      if (currentlyOpen) {
        const openButton = faqContainer.querySelector(`button[data-faq-index="${currentlyOpen}"]`);
        if (openButton) {
          const openContent = openButton.nextElementSibling;
          if (openContent) {
            openContent.style.maxHeight = openContent.scrollHeight + 'px';
          }
        }
      }
    });
  }

  // Инициализация слайдера (Swiper)
  if (typeof Swiper !== 'undefined') {
    const swiper = new Swiper(".mySwiper", {
      slidesPerView: 1,
      spaceBetween: 20,
      speed: 800,
      loop: true,
      centerInsufficientSlides: true,

      breakpoints: {
        575: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 40,
        }
      }
    });

    // Custom arrow navigation
    const prevBtn = document.querySelector(".swiper-button-prev-custom");
    const nextBtn = document.querySelector(".swiper-button-next-custom");
    if (prevBtn && nextBtn) {
      prevBtn.onclick = () => swiper.slidePrev();
      nextBtn.onclick = () => swiper.slideNext();
    }

    // Correct pagination update
    function updatePagination() {
      const realSlides = swiper.slides.length - (swiper.loopedSlides * 2);
      const current = (swiper.realIndex % realSlides) + 1;

      const paginationEl = document.getElementById("paginationText");
      if (paginationEl) {
        paginationEl.textContent = `${current}/${realSlides}`;
      }
    }

    swiper.on("slideChange", updatePagination);
    updatePagination();
  }

  // Header фикс при скролле
  const header = document.getElementById("header");
  window.addEventListener("scroll", () => {
    if (!header) return;
    if (window.scrollY > 10) {
      header.classList.add("fix");
    } else {
      header.classList.remove("fix");
    }
  });

  // Toggle меню
  document.querySelectorAll(".drop-menu").forEach(menu => {
    menu.addEventListener("click", function () {
      this.classList.toggle("is-active");

      const headerMenu = document.querySelector(".header-menu");
      if (headerMenu) {
        headerMenu.classList.toggle("open");
      }

      document.documentElement.classList.toggle("overflow"); // html
      document.body.classList.toggle("overflow");            // body
    });
  });

});


const car = document.querySelector('.car-img');

const carObserver = new IntersectionObserver(
  ([entry]) => {
    if (!entry.isIntersecting) return;
    car.classList.add('animate');
    carObserver.disconnect();
  },
  { threshold: 0.4 }
);

carObserver.observe(car);

const car2 = document.querySelector('.car2');

if (car2) {
  const carObserver = new IntersectionObserver(
    ([entry], obs) => {
      if (!entry.isIntersecting) return;

      car2.classList.add('animate');
      obs.unobserve(car2);
    },
    {
      threshold: 0.4, // когда 40% элемента в зоне видимости
    }
  );

  carObserver.observe(car2);
}