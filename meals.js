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
        '2025-08-03': [],
        '2025-08-04': [
            { floor: '20F', type: '한식🍚', name: '해물순두부찌개,흑미밥/쌀밥,돼지고기땅콩강정,후랑크소시지채소볶음,시래기된장조림,깍두기,*아이스티(복숭아맛)*' },
            { floor: '20F', type: '일품🍚', name: '베이컨미소라멘,유부양념밥,김말이튀김,일식양배추샐러드&드레싱,단무지/김치,바나나,*아이스티(복숭아맛)*' },
            { floor: '10F', type: '도시락🍱', name: '참치김치찌개,너비아니엿장조림,부추장떡,백미밥,연근조림,깍두기' },
            { floor: '10F', type: '브런치🥪', name: '새우샌드위치,감자샐러드,딸기드레싱,음료' },
            { floor: '10F', type: '샐러드🥗', name: '리코타치즈샐러드,딸기드레싱,음료' }
        ],
        '2025-08-05': [
            { floor: '20F', type: '한식🍚', name: '비빔밥,아욱된장국,감자크로켓&케찹,천사채샐러드,무말랭이고추잎무침,김치,*석류차*' },
            { floor: '20F', type: '일품🍚', name: '소고기마늘종파스타,수제마늘빵,제로탄산,콘치즈구이,샐러드&시저드레싱,피클&할라피뇨,*석류차*' },
            { floor: '10F', type: '도시락🍱', name: '오삼불고기,어묵채소볶음,콩나물국,백미밥,참나물무침,포기김치' },
            { floor: '10F', type: '브런치🥪', name: '흑임자닭가슴살샌드위치,파스타샐러드,유자파인드레싱,음료' },
            { floor: '10F', type: '샐러드🥗', name: '하우스케이준치킨샐러드,유자파인드레싱,음료' }
        ],
        '2025-08-06': [
            { floor: '20F', type: '한식🍚', name: '대파육개장,차조밥/쌀밥,버섯탕수,청포묵김가루무침,건새우마늘종볶음,깍두기,*수정과*' },
            { floor: '20F', type: '일품🍚', name: '새우필라프&토마토살사소스,유부장국,크림소스떡볶임,건새우마늘종볶음,샐러드&발사믹드레싱,김치,*수정과*' },
            { floor: '10F', type: '도시락🍱', name: '불닭맛볼카츠,감자채맛살볶음,메밀소바,흑미밥,양배추콘샐러드,포기김치' },
            { floor: '10F', type: '브런치🥪', name: '에그마요샌드위치,떡갈비샐러드,키위애플드레싱,음료' },
            { floor: '10F', type: '샐러드🥗', name: '베이컨감자무스샐러드,키위애플드레싱,음료' }
        ],
        '2025-08-07': [
            { floor: '20F', type: '한식🍚', name: '간장돼지불백,혼합잡곡밥/쌀밥,김치수제비,옥수수전,양배추쌈&쌈장,깍두기,*매실차*' },
            { floor: '20F', type: '일품🍚', name: '간자장면,계란팟국,꽃빵튀김&연유,중국식땅콩볶음,짜사이채무침,김치,*매실차*' },
            { floor: '10F', type: '도시락🍱', name: '제육볶음,꽈리고추감자조림,얼갈이된장국,백미밥,오이부추무침,포기김치' },
            { floor: '10F', type: '브런치🥪', name: '햄치즈샌드위치,과일샐러드,발사믹드레싱,음료' },
            { floor: '10F', type: '샐러드🥗', name: '닭고기콥샐러드,발사믹드레싱,음료' }
        ],
        '2025-08-08': [
            { floor: '20F', type: '한식🍚', name: '밀양돼지국밥,수수밥/쌀밥,장떡,미역줄기게맛살볶음,오이맛고추된장무침,깍두기,*블루베리맛홍초*' },
            { floor: '20F', type: '일품🍚', name: '고구마돈가스,쌀밥&후리가케,크림스프,감자튀김&케찹,샐러드&오렌지드레싱,푸실리샐러드,피클,*블루베리맛홍초*' },
            { floor: '10F', type: '도시락🍱', name: '닭살김치찜,미니돈까스,팽이버섯장국,백미밥,명엽채볶음,오이지무침' },
            { floor: '10F', type: '브런치🥪', name: '치킨텐더샌드위치,단호박샐러드,오리엔탈드레싱,음료' },
            { floor: '10F', type: '샐러드🥗', name: '우삼겹포케,오리엔탈드레싱,음료' }
        ],
        '2025-08-09': [],
        '2025-08-10': []
        // Add more days as needed
    };

    // 날짜 상태 관리
    let currentDate = new Date();

    // 날짜 포맷 함수
    function formatDate(date) {
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    }

    // 날짜 라벨 포맷 (예: 2025-08-04 (월))
    function getDateLabel(date) {
        const days = ['일', '월', '화', '수', '목', '금', '토'];
        return `${formatDate(date)} (${days[date.getDay()]})`;
    }

    function renderMealsForDate(date) {
        const dateStr = formatDate(date);
        const meals = weeklyMeals[dateStr] || [];
        const mealsGrid = document.querySelector('.meals-grid');
        const noMealMessage = document.getElementById('no-meal-message');
        const dateLabel = document.getElementById('meal-date-label');
        if (dateLabel) dateLabel.textContent = getDateLabel(date);

        mealsGrid.innerHTML = '';
        if (meals.length > 0) {
            noMealMessage.style.display = 'none';
            meals.forEach(meal => {
                const div = document.createElement('div');
                div.className = 'meal-card';
                const formattedName = meal.name.replace(/,/g, '<br>');
                div.innerHTML = `<strong>${meal.floor} ${meal.type}</strong>${formattedName}`;
                mealsGrid.appendChild(div);
            });
        } else {
            noMealMessage.style.display = 'block';
        }
    }

    // 화살표 버튼 이벤트
    document.getElementById('prev-meal-day').onclick = () => {
        currentDate.setDate(currentDate.getDate() - 1);
        renderMealsForDate(currentDate);
    };
    document.getElementById('next-meal-day').onclick = () => {
        currentDate.setDate(currentDate.getDate() + 1);
        renderMealsForDate(currentDate);
    };

    // 최초 렌더링
    renderMealsForDate(currentDate);
});
