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
      noMealMessage.style.display = "block";
    }
  }

  async function loadMeals() {
    // 로딩 표시(선택)
    if (noMealMessage) {
      noMealMessage.style.display = "block";
      noMealMessage.textContent = "급식 정보를 불러오는 중...";
    }

    // 캐시 무력화용 버전 파라미터 (일 단위)
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
    } catch (e) {
      // 실패 시 로컬 캐시 폴백
      const cached = localStorage.getItem("mealData");
      if (cached) {
        const { data } = JSON.parse(cached);
        weeklyMeals = data || {};
        if (noMealMessage) noMealMessage.textContent = "네트워크 오류로 캐시 데이터를 표시합니다.";
      } else {
        weeklyMeals = {};
        if (noMealMessage) noMealMessage.textContent = "급식 정보를 불러오지 못했습니다.";
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
