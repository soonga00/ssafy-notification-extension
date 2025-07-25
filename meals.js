document.addEventListener('DOMContentLoaded', () => {
    // Dummy data for weekly meals. You would replace this with actual data fetched from an API.
    // Added more days for demonstration purposes.
    const weeklyMeals = {
        '2025-07-24': [
            { floor: '20F', type: '한식', name: '햄구이(스팸)&볶음김치\n수수밥/쌀밥\n미니된장찌개\n오징어완자전\n마늘종게맛살볶음\n건파래볶음 + 석류차' },
            { floor: '20F', type: '일품', name: '치킨까스' },
            { floor: '10F', type: '도시락', name: '참치마요' },
            { floor: '10F', type: '브런치', name: '에그샌드위치' },
            { floor: '10F', type: '샐러드', name: '닭가슴살샐러드' }
        ],
        '2025-07-25': [
            { floor: '20F', type: '한식🍚', name: '오므라이스&케찹,가다랭이국,쫄면채소무침,푸실리샐러드,샐러드&드레싱,김치,*모과차*' },
            { floor: '20F', type: '일품🍚', name: '[도산분식]국물떡볶이,꼬마김밥,가다랭이국,순대튀김,샐러드&드레싱,단무지,*모과차*' },
            { floor: '10F', type: '도시락🍱', name: '단호박찜닭,어묵강정,순두부맑은국,백미밥,도라지오이무침,포기김치' },
            { floor: '10F', type: '브런치🥪', name: '옛날토스트,치즈스틱샐러드,음료' },
            { floor: '10F', type: '샐러드🥗', name: '치킨텐더 단호박 보울' }
        ],
        '2025-07-26': [],
        '2025-07-27': [],
        '2025-07-28': [
            { floor: '20F', type: '한식🍚', name: '돼지고기김치볶음,현미밥/쌀밥,미역국,부추전,샐러드&드레싱,깍두기,*오미자차*' },
            { floor: '20F', type: '일품🍚', name: '바베큐폭찹,계란채소볶음밥,미역국,생선가스&타르타르,샐러드&드레싱,양배추피클,*오미자차*' },
            { floor: '10F', type: '도시락🍱', name: '순살강정,동그랑땡+케찹,부대찌개,백미밥,마카로니샐러드,포기김치' },
            { floor: '10F', type: '브런치🥪', name: '햄계란샌드위치,돈까스샐러드,음료' },
            { floor: '10F', type: '샐러드🥗', name: '간장닭조림 버섯 샐러드,음료' }
        ],
        '2025-07-29': [
            { floor: '20F', type: '일반식🍚', name: '햄버그스테이크,까르보나라스파게티,쌀밥&후리가케/일식장국,더운채소/반달감자튀김&케찹,일식양배추샐러드&D,사각단무지,*아이스초코*' },
            { floor: '10F', type: '도시락🍱', name: '미운영' },
            { floor: '10F', type: '브런치🥪', name: 'BELT샌드위치,두부샐러드,음료' },
            { floor: '10F', type: '샐러드🥗', name: '매콤제육보울' }
        ],
        '2025-07-30': [
            { floor: '20F', type: '일반식🍚', name: '한방닭다리백숙,흑미찹쌀밥,김치전,조랭이떡옥수수샐러드,도토리묵&양념장,깍두기/수박,*식혜*' },
            { floor: '10F', type: '도시락🍱', name: '미운영' },
            { floor: '10F', type: '브런치🥪', name: '당근라페샌드위치,고구마샐러드,음료' },
            { floor: '10F', type: '샐러드🥗', name: '새우튀김 감자무스 샐러드,음료' }
        ],
        '2025-07-31': [
            { floor: '20F', type: '한식🍚', name: '부대찌개,보리밥/쌀밥,미트볼케찹조림,느타리버섯꽈리볶음,게맛살겨자냉채,깍두기,*아이스티(레몬)*' },
            { floor: '20F', type: '일품🍚', name: '장조림버터밥,시금치된장국,모둠튀김강정,웅엉땅콩조림,게맛살겨자냉채,깍두기,*아이스티(레몬)*' },
            { floor: '10F', type: '도시락🍱', name: '영콘소불고기,볶음우동,김치콩나물국,흑미밥,새콤달콤무생채,포기김치' },
            { floor: '10F', type: '브런치🥪', name: '참치샌드위치,마카로니샐러드,음료' },
            { floor: '10F', type: '샐러드🥗', name: '닭가슴살 파인애플 샐러드,음료' }
        ],
        '2025-08-01': [
            { floor: '20F', type: '한식🍚', name: '사골떡국,미니수수밥/쌀밥,잡채,어묵채매운볶음,깻잎순겉절이,배추겉절이,*츄러스/복분자차*' },
            { floor: '20F', type: '일품🍚', name: '명태회냉면,사골온육수,유부양념밥,교자만두찜&초간장,마카로니콘샐러드,냉면김치,*츄러스/복분자차*' },
            { floor: '10F', type: '도시락🍱', name: '고구마치즈돈까스,신당동떡볶이,냉우동,백미밥,쫄면,포기김치' },
            { floor: '10F', type: '브런치🥪', name: '함박스테이크샌드위치,병아리콩샐러드,음료' },
            { floor: '10F', type: '샐러드🥗', name: '훈제오리 단호박 샐러드,음료' }
        ],
        '2025-08-02': [],
        '2025-08-03': []
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
            const formattedName = meal.name.replace(/,/g, '<br>');
            div.innerHTML = `<strong>${meal.floor} ${meal.type}</strong>${formattedName}`;
            mealsGrid.appendChild(div);
        });
    } else {
        // Show no meal message if no meals are found for today
        noMealMessage.style.display = 'block';
    }
});
