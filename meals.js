document.addEventListener('DOMContentLoaded', () => {
    // Dummy data for weekly meals. You would replace this with actual data fetched from an API.
    // Added more days for demonstration purposes.
    const weeklyMeals = {
        '2025-07-24': [ // Wednesday (오늘)
            { floor: '20F', type: '한식', name: '햄구이(스팸)&볶음김치\n수수밥/쌀밥\n미니된장찌개\n오징어완자전\n마늘종게맛살볶음\n건파래볶음 + 석류차' },
            { floor: '20F', type: '일품', name: '치킨까스' },
            { floor: '10F', type: '도시락', name: '참치마요' },
            { floor: '10F', type: '브런치', name: '에그샌드위치' },
            { floor: '10F', type: '샐러드', name: '닭가슴살샐러드' }
        ],
        '2025-07-25': [ // Thursday
            { floor: '20F', type: '한식', name: '불고기\n잡곡밥\n미역국\n계란찜\n김치' },
            { floor: '20F', type: '일품', name: '돈까스' },
            { floor: '10F', type: '도시락', name: '제육볶음' }
        ],
        '2025-07-26': [ // Friday
            { floor: '20F', type: '한식', name: '비빔밥\n콩나물국\n순대볶음\n깍두기' },
            { floor: '20F', type: '일품', name: '파스타' }
        ],
        '2025-07-27': [], // Saturday - No meals
        '2025-07-28': [ // Sunday
            { floor: '20F', type: '한식', name: '김치찌개\n쌀밥\n두부조림\n어묵볶음' }
        ]
        // Add more days as needed
    };

    // Get today's date in YYYY-MM-DD format
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const dd = String(today.getDate()).padStart(2, '0');
    const todayStr = `${yyyy}-${mm}-${dd}`;

    // Get meals for today
    const meals = weeklyMeals[todayStr] || [];

    const mealsGrid = document.querySelector('.meals-grid');
    const noMealMessage = document.getElementById('no-meal-message');

    // Clear existing content
    mealsGrid.innerHTML = '';

    if (meals.length > 0) {
        // Hide no meal message if there are meals
        noMealMessage.style.display = 'none';
        // Populate the meals grid
        meals.forEach(meal => {
            const div = document.createElement('div');
            div.className = 'meal-card';
            // Replace newline characters with <br> for proper HTML display
            const formattedName = meal.name.replace(/\n/g, '<br>');
            div.innerHTML = `<strong>${meal.floor} ${meal.type}</strong>${formattedName}`;
            mealsGrid.appendChild(div);
        });
    } else {
        // Show no meal message if no meals are found for today
        noMealMessage.style.display = 'block';
    }

    // Add event listener for the "Add Shortcut" button (placeholder functionality)
    const addShortcutButton = document.querySelector('.add-shortcut');
    addShortcutButton.addEventListener('click', () => {
        // In a real extension, you would open a modal or a new tab
        // to allow the user to add a new shortcut.
        // For now, we'll just log a message.
        console.log('Add new shortcut functionality would go here!');
        alert('새로운 바로가기 추가 기능은 개발 중입니다!'); // Using alert for demonstration, replace with custom modal in production
    });
});
