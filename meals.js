document.addEventListener("DOMContentLoaded", () => {
  const DATA_URL = "https://soonga00.github.io/ssafy-meal-data/meals.json";

  // 상태
  let weeklyMeals = {};
  let currentDate = new Date();

  // DOM
  const mealsGrid = document.querySelector(".meals-grid");
  const noMealMessage = document.getElementById("no-meal-message");
  const dateLabel = document.getElementById("meal-date-label");
  const prevBtn = document.getElementById("prev-meal-day");
  const nextBtn = document.getElementById("next-meal-day");

  const showNoMeal = () => {
    if (noMealMessage) noMealMessage.style.display = "block";
  };
  const hideNoMeal = () => {
    if (noMealMessage) noMealMessage.style.display = "none";
  };

  // util
  const formatDate = (date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const getDateLabel = (date) => {
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    return `${formatDate(date)} (${days[date.getDay()]})`;
  };

  function renderMealsForDate(date) {
    const dateStr = formatDate(date);
    const meals = weeklyMeals[dateStr] || [];
    if (dateLabel) dateLabel.textContent = getDateLabel(date);

    if (!mealsGrid || !noMealMessage) return;

    mealsGrid.innerHTML = "";
    if (meals.length > 0) {
      hideNoMeal();
      noMealMessage.style.display = "none";
      meals.forEach((meal) => {
        const div = document.createElement("div");
        div.className = "meal-card";
        const formattedName = String(meal.name || "")
          .replace(/,/g, "<br>") // 쉼표 기준 줄바꿈(기존 로직 유지)
          .replace(/\n/g, "<br>"); // 개행도 줄바꿈 처리
        div.innerHTML = `<strong>${meal.floor} ${meal.type}</strong><br>${formattedName}`;
        mealsGrid.appendChild(div);
      });
    } else {
      showNoMeal;
    }
  }

  async function loadMeals() {
    const v = new Date().toISOString().slice(0, 10);

    try {
      const res = await fetch(`${DATA_URL}?v=${v}`, { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      // 데이터 기본 검증(객체 형태 기대)
      if (typeof data !== "object" || data === null) {
        throw new Error("Invalid JSON shape");
      }

      weeklyMeals = data;
      // 로컬 캐시 저장
      localStorage.setItem("mealData", JSON.stringify({ data, ts: Date.now() }));
    } catch {
      const cached = localStorage.getItem("mealData");
      if (cached) {
        const { data } = JSON.parse(cached);
        weeklyMeals = data || {};
      } else {
        weeklyMeals = {};
      }
    } finally {
      renderMealsForDate(currentDate);
    }
  }

  // 네비게이션
  if (prevBtn) {
    prevBtn.onclick = () => {
      currentDate.setDate(currentDate.getDate() - 1);
      renderMealsForDate(currentDate);
    };
  }
  if (nextBtn) {
    nextBtn.onclick = () => {
      currentDate.setDate(currentDate.getDate() + 1);
      renderMealsForDate(currentDate);
    };
  }

  // 시작
  loadMeals();
});
