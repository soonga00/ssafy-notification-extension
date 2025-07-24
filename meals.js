const weeklyMeals = {
  '2025-07-24': [ // 월요일
    { floor: '20F', type: '한식', name: '햄구이(스팸)&볶음김치\n수수밥/쌀밥\n미니된장찌개\n오징어완자전\n마늘종게맛살볶음\n건파래볶음 + 석류차' },
    { floor: '20F', type: '일품', name: '치킨까스' },
    { floor: '10F', type: '도시락', name: '참치마요' },
    { floor: '10F', type: '브런치', name: '에그샌드위치' },
    { floor: '10F', type: '샐러드', name: '닭가슴살샐러드' }
  ],
  // ...다른 요일 추가
};

const today = new Date();
const yyyy = today.getFullYear();
const mm = String(today.getMonth() + 1).padStart(2, '0');
const dd = String(today.getDate()).padStart(2, '0');
const todayStr = `${yyyy}-${mm}-${dd}`;

const meals = weeklyMeals[todayStr] || [];

const mealsGrid = document.querySelector('.meals-grid');
mealsGrid.innerHTML = '';
meals.forEach(meal => {
  const div = document.createElement('div');
  div.className = 'meal-card';
  const formattedName = meal.name.replace(/\n/g, '<br>');
  div.innerHTML = `<strong>${meal.floor} ${meal.type}</strong>${formattedName}`;
  mealsGrid.appendChild(div);
});