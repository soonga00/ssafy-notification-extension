function getTimeToday(hour, minute) {
  const now = new Date();
  const target = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute, 0, 0);
  // 만약 이미 지난 시간이면 내일로 설정
  if (target.getTime() < now.getTime()) {
    target.setDate(target.getDate() + 1);
  }
  return target.getTime();
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create('morningAlarm', {
    when: getTimeToday(8, 30),
    periodInMinutes: 1440
  });
  chrome.alarms.create('lunchAlarm', {
    when: getTimeToday(12, 0),
    periodInMinutes: 1440
  });
  chrome.alarms.create('eveningAlarm', {
    when: getTimeToday(17, 55),
    periodInMinutes: 1440
  });
  chrome.alarms.create('surveyAlarm', {
    when: getTimeToday(16, 0), // 금요일 오후 4시
    periodInMinutes: 10080 // 1주일
  });
});

chrome.alarms.onAlarm.addListener((alarm) => {
  let title = '';
  let message = '';
  let iconUrl = '';
  let notificationId = '';

  if (alarm.name === 'morningAlarm') {
    title = '🌞 입실 시간이에요!';
    message = '오늘 하루도 화이팅!! 지금 바로 입실 체크 꾹!';
    iconUrl = 'icons/morning.png';
    notificationId = 'ssafy-noti';
  } else if (alarm.name === 'eveningAlarm') {
    title = '🌙 퇴실도 잊지 마세요~';
    message = '오늘 하루도 수고 많았어요 :) 퇴실 체크하고 퇴근 완료!';
    iconUrl = 'icons/evening.png';
    notificationId = 'ssafy-noti';
  } else if (alarm.name === 'surveyAlarm') {
    // 오늘이 금요일인지 확인
    const today = new Date();
    if (today.getDay() === 5) { // 0:일 ~ 5:금 ~ 6:토
      title = '📋 주간 설문 찬스!';
      message = '벌써 주말? 설문 하나만 딱 하고 쉬어요~ 😎';
      iconUrl = 'icons/survey.png';
      notificationId = 'ssafy-noti';
    } else {
      // 금요일이 아니면 알림을 띄우지 않음
      return;
    }
  } else {
    title = '📢 와~~ 점심시간이다!';
    message = '오늘 뭐 먹지? 급식 메뉴 확인하러 가자 🍱';
    iconUrl = 'icons/lunch.png';
    notificationId = 'lunch-noti';
  }

  chrome.notifications.create(notificationId, {
    type: 'basic',
    iconUrl: iconUrl,
    title: title,
    message: message,
    priority: 2
  });
});