// ==========================
// Shortcut 관련
// ==========================
function showShortcutForm() {
  document.getElementById('shortcut-modal').style.display = 'flex';
  document.getElementById('modal-shortcut-title').value = '';
  document.getElementById('modal-shortcut-url').value = '';
  document.getElementById('modal-shortcut-title').focus();
}

function hideShortcutForm() {
  document.getElementById('shortcut-modal').style.display = 'none';
}

function addShortcutFromModal() {
  const title = document.getElementById('modal-shortcut-title').value.trim();
  const url = document.getElementById('modal-shortcut-url').value.trim();
  if (!title || !url) return;

  chrome.storage.local.get({ shortcuts: [] }, (data) => {
    const shortcuts = data.shortcuts;
    shortcuts.push({ title, url });
    chrome.storage.local.set({ shortcuts }, () => {
      renderShortcuts();
      hideShortcutForm();
    });
  });
}

function renderShortcuts() {
  chrome.storage.local.get({ shortcuts: [] }, (data) => {
    const grid = document.querySelector('.shortcut-grid');
    grid.innerHTML = ''; // shortcut 영역만 초기화

    // 기본 3개
    const defaults = [
      { title: 'Edu SSAFY', url: 'https://edu.ssafy.com/' },
      { title: 'SWEA', url: 'https://swexpertacademy.com/main/main.do' },
      { title: 'SSAFY Git', url: 'https://project.ssafy.com/home' }
    ];
    defaults.forEach(sc => {
      const a = document.createElement('a');
      a.href = sc.url;
      a.target = '_blank';
      a.className = 'shortcut-card';
      a.textContent = sc.title;
      grid.appendChild(a);
    });

    // 사용자 저장된 바로가기
    data.shortcuts.forEach((sc, idx) => {
      const a = document.createElement('a');
      a.href = sc.url;
      a.target = '_blank';
      a.className = 'shortcut-card';
      a.textContent = sc.title;

      // 삭제 버튼
      const removeBtn = document.createElement('button');
      removeBtn.className = 'shortcut-remove';
      removeBtn.type = 'button';
      removeBtn.title = '삭제';
      removeBtn.innerHTML = '&times;';
      removeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        removeShortcut(idx);
      });

      a.appendChild(removeBtn);
      grid.appendChild(a);
    });

    // + 버튼
    const btn = document.createElement('button');
    btn.className = 'add-shortcut';
    btn.textContent = '+';
    btn.type = 'button';
    btn.onclick = showShortcutForm; // ✅ 여기서만 모달 띄우기
    grid.appendChild(btn);
  });
}

function removeShortcut(idx) {
  chrome.storage.local.get({ shortcuts: [] }, (data) => {
    const shortcuts = data.shortcuts;
    shortcuts.splice(idx, 1);
    chrome.storage.local.set({ shortcuts }, renderShortcuts);
  });
}

// ==========================
// Init
// ==========================
document.addEventListener('DOMContentLoaded', () => {
  renderShortcuts();

  // 모달 버튼 이벤트
  document.getElementById('modal-add-btn').addEventListener('click', addShortcutFromModal);
  document.getElementById('modal-cancel-btn').addEventListener('click', hideShortcutForm);

  // 엔터 입력으로 추가
  document.getElementById('modal-shortcut-url').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addShortcutFromModal();
  });

  // ==========================
  // 알람 토글
  // ==========================
  const alarmToggle = document.getElementById('alarm-toggle');
  const alarmSwitch = document.getElementById('alarm-switch');
  const circle = alarmSwitch?.querySelector('.switch-circle');
  if (!alarmToggle || !alarmSwitch || !circle) return; // 방어

  function updateSwitchUI(checked) {
    alarmSwitch.style.background = checked ? '#2563eb' : '#e5e7eb';
    circle.style.left = checked ? '24px' : '3px';
  }

  // 초기 상태 로드
  chrome.storage.local.get({ alarmEnabled: true }, (data) => {
    const enabled = !!data.alarmEnabled;
    alarmToggle.checked = enabled;
    updateSwitchUI(enabled);
  });

  // 클릭 시 토글
  alarmSwitch.addEventListener('click', (e) => {
    e.preventDefault();
    const next = !alarmToggle.checked;
    alarmToggle.checked = next;
    updateSwitchUI(next);
    chrome.storage.local.set({ alarmEnabled: next });
    chrome.runtime.sendMessage({ type: 'alarm-toggle', enabled: next });
  });

  // 외부에서 변경 시도도 반영
  alarmToggle.addEventListener('change', function () {
    updateSwitchUI(this.checked);
    chrome.storage.local.set({ alarmEnabled: this.checked });
    chrome.runtime.sendMessage({ type: 'alarm-toggle', enabled: this.checked });
  });
});
