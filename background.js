// =========================
// Alarm Helper Functions
// =========================

// 다음 평일(월~금) 지정 시:분의 타임스탬프
function getNextWeekdayTime(hour, minute) {
  const now = new Date();
  const target = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute, 0, 0);

  // 이미 지났으면 +1일
  if (target.getTime() <= now.getTime()) {
    target.setDate(target.getDate() + 1);
  }
  // 토(6), 일(0) 제외하고 평일까지 이동
  while (target.getDay() === 0 || target.getDay() === 6) {
    target.setDate(target.getDate() + 1);
  }
  return target.getTime();
}

// 다음 특정 요일(0:일 ~ 6:토)의 특정 시:분 타임스탬프
function getNextWeekdayAt(weekday, hour, minute) {
  const now = new Date();
  const target = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute, 0, 0);
  let diff = (weekday - target.getDay() + 7) % 7; // 앞으로 남은 요일 차
  // 오늘이 그 요일인데 이미 시간이 지났으면 다음 주
  if (diff === 0 && target.getTime() <= now.getTime()) diff = 7;
  target.setDate(target.getDate() + diff);
  return target.getTime();
}

// 주말 여부
function isWeekend(d = new Date()) {
  const day = d.getDay(); // 0:일, 6:토
  return day === 0 || day === 6;
}

// 주말이면 다음 평일 시각으로 재예약만 하고 true 반환(= 알림 스킵)
function skipWeekendAndReschedule(name, hour, minute) {
  if (!isWeekend()) return false; // 평일 → 스킵 안 함
  chrome.alarms.create(name, { when: getNextWeekdayTime(hour, minute) });
  return true; // 주말이라 재예약만
}

// =========================
// Alarm Initialization
// =========================

function ensureAlarms() {
  chrome.alarms.clearAll(() => {
    // 평일 알람 3종
    chrome.alarms.create("morningAlarm", { when: getNextWeekdayTime(8, 30) });
    chrome.alarms.create("lunchAlarm", { when: getNextWeekdayTime(12, 0) });
    chrome.alarms.create("eveningAlarm", { when: getNextWeekdayTime(17, 59) });

    // 주간 설문: 항상 "금요일 14:30"에 시작, 이후 1주 간격
    chrome.alarms.create("surveyAlarm", {
      when: getNextWeekdayAt(5, 14, 30), // 5 = 금요일
      periodInMinutes: 10080, // 1주일
    });
  });
}

// 설치/업데이트 시 설정
chrome.runtime.onInstalled.addListener(() => {
  ensureAlarms();
});

// 브라우저 시작 시 재보장 (권장)
chrome.runtime.onStartup &&
  chrome.runtime.onStartup.addListener(() => {
    ensureAlarms();
  });

// =========================
// Alarm Handler
// =========================

chrome.alarms.onAlarm.addListener((alarm) => {
  let title = "",
    message = "",
    iconUrl = "",
    notificationId = "";

  if (alarm.name === "morningAlarm") {
    // 주말 무음: 재예약만
    if (skipWeekendAndReschedule("morningAlarm", 8, 30)) return;

    // 다음 평일 재예약
    chrome.alarms.create("morningAlarm", { when: getNextWeekdayTime(8, 30) });
    title = "🌞 입실 시간이에요!";
    message = "오늘 하루도 화이팅!! 지금 바로 입실 체크 꾹!";
    iconUrl = "icons/morning.png";
    notificationId = "morning-noti";
  } else if (alarm.name === "lunchAlarm") {
    if (skipWeekendAndReschedule("lunchAlarm", 12, 0)) return;

    chrome.alarms.create("lunchAlarm", { when: getNextWeekdayTime(12, 0) });
    title = "📢 와~~ 점심시간이다!";
    message = "오늘 뭐 먹지? 급식 메뉴 확인하러 가자 🍱";
    iconUrl = "icons/lunch.png";
    notificationId = "lunch-noti";
  } else if (alarm.name === "eveningAlarm") {
    if (skipWeekendAndReschedule("eveningAlarm", 17, 59)) return;

    chrome.alarms.create("eveningAlarm", { when: getNextWeekdayTime(17, 59) });
    title = "🌙 퇴실도 잊지 마세요~";
    message = "오늘 하루도 수고 많았어요 :) 퇴실 체크하고 퇴근 완료!";
    iconUrl = "icons/evening.png";
    notificationId = "evening-noti";
  } else if (alarm.name === "surveyAlarm") {
    // 금요일 14:30 고정 주기이므로 보통 주말에 안 울림.
    // 그래도 안전하게 주말이면 스킵
    if (isWeekend()) return;

    title = "📋 주간 설문 찬스!";
    message = "벌써 주말? 설문 하나만 딱 하고 쉬어요~ 😎";
    iconUrl = "icons/survey.png";
    notificationId = "survey-noti";
  }

  if (!notificationId) return; // 방어

  chrome.notifications.create(notificationId, {
    type: "basic",
    iconUrl,
    title,
    message,
    priority: 2,
  });
});
