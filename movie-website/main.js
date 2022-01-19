const reload = (entries) => {
  if (entries[0].isIntersecting) {
    entries[0].target.parentNode.style.transform = `translateX(${-300}px)`;
  }
};

const arrows = document.querySelectorAll(".arrow");
const movieLists = document.querySelectorAll(".movie-list");
const observer = new IntersectionObserver(reload, {
  rootMargin: "0px -500px 0px 0px"
});

arrows.forEach((arrow, i) => {
  arrow.addEventListener("click", () => {
    const { value } = movieLists[i].computedStyleMap().get("transform")[0].x;
    observer.observe(movieLists[i].lastElementChild);
    movieLists[i].style.transform = `translateX(${value - 300}px)`;
  });
});

const ball = document.querySelector(".toggle");
const items = document.querySelectorAll(
  ".toggle, .togle-ball, .sidebar, .sidebar-icon, .container, .movie-list-title, .movie-list-item-text, .movie-list-item-title, .navbar-container"
);

ball.addEventListener("click", () => {
  items.forEach((item) => {
    // item.style.transition = "all 0.3s ease-in-out";
    item.classList.toggle("active");
  });
});
