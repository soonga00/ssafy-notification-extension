document.addEventListener('DOMContentLoaded', () => {
  const mealElement = document.getElementById('meal');
  mealElement.textContent = getTodayMeal();
});
