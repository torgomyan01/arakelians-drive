function $(target) {
  return document.querySelectorAll(target);
}

function $el(target) {
  return document.querySelector(target);
}

document.addEventListener('DOMContentLoaded', function() {
  const faqContainer = document.getElementById('faq-container');
  let currentlyOpen = null;
  
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
  
  // Կլիկի event listener ավելացնել բոլոր FAQ կոճակների համար
  const faqButtons = faqContainer.querySelectorAll('button[data-faq-index]');
  
  faqButtons.forEach(button => {
    button.addEventListener('click', function() {
      const index = this.getAttribute('data-faq-index');
      const content = this.nextElementSibling;
      const arrow = this.querySelector('svg');
      
      // Եթե սա արդեն բացված է, փակիր այն
      if (currentlyOpen === index) {
        closeFaq(content, arrow);
        currentlyOpen = null;
      } else {
        // Փակիր նախկինում բացվածը
        if (currentlyOpen) {
          const prevButton = faqContainer.querySelector(`button[data-faq-index="${currentlyOpen}"]`);
          const prevContent = prevButton.nextElementSibling;
          const prevArrow = prevButton.querySelector('svg');
          closeFaq(prevContent, prevArrow);
        }
        
        // Բացիր ընտրվածը
        openFaq(content, arrow);
        currentlyOpen = index;
      }
    });
  });
  
  function openFaq(content, arrow) {
    // Սահմանել բարձրությունը բովանդակության համար
    content.style.maxHeight = content.scrollHeight + 'px';
    
    // Պտտել սլաքը
    arrow.classList.add('rotate-180');
    
    // Ավելացնել բացման հետ կապված դասեր, եթե անհրաժեշտ է
    content.parentElement.classList.add('active');
  }
  
  function closeFaq(content, arrow) {
    // Վերականգնել բարձրությունը
    content.style.maxHeight = '0px';
    
    // Վերականգնել սլաքի պտույտը
    arrow.classList.remove('rotate-180');
    
    // Հեռացնել ակտիվ դասերը
    content.parentElement.classList.remove('active');
  }
  
  // Նաև ավելացնել համապատասխանությունը viewport-ի չափը փոխելու դեպքում
  window.addEventListener('resize', function() {
    if (currentlyOpen) {
      const openButton = faqContainer.querySelector(`button[data-faq-index="${currentlyOpen}"]`);
      const openContent = openButton.nextElementSibling;
      openContent.style.maxHeight = openContent.scrollHeight + 'px';
    }
  });
});

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
document.querySelector(".swiper-button-prev-custom").onclick = () => swiper.slidePrev();
document.querySelector(".swiper-button-next-custom").onclick = () => swiper.slideNext();


// Correct pagination update
function updatePagination() {
  const realSlides = swiper.slides.length - (swiper.loopedSlides * 2); // ← правильный total
  const current = (swiper.realIndex % realSlides) + 1;

  document.getElementById("paginationText").textContent = `${current}/${realSlides}`;
}

swiper.on("slideChange", updatePagination);
updatePagination();

window.addEventListener("scroll", () => {
  const header = document.getElementById("header");

  if (window.scrollY > 10) {
    header.classList.add("fix");
  } else {
    header.classList.remove("fix");
  }
});

document.querySelectorAll(".drop-menu").forEach(menu => {
  menu.addEventListener("click", function () {

    this.classList.toggle("is-active");

    document.querySelector(".header-menu")
      .classList.toggle("open");

    document.documentElement.classList.toggle("overflow"); // html
    document.body.classList.toggle("overflow");            // body
  });
});