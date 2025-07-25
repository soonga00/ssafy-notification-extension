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
    // 기본 3개는 유지, 이후 사용자 추가
    grid.innerHTML = `
      <a href="https://edu.ssafy.com/" target="_blank" class="shortcut-card">Edu SSAFY</a>
      <a href="https://swexpertacademy.com/main/main.do" target="_blank" class="shortcut-card">SWEA</a>
      <a href="https://project.ssafy.com/home" target="_blank" class="shortcut-card">SSAFY Git</a>
      <div id="shortcut-form" style="display:none; margin-top:10px;">
        <input type="text" id="shortcut-title" placeholder="이름" style="width:40%;" />
        <input type="url" id="shortcut-url" placeholder="링크" style="width:50%;" />
        <button id="add-shortcut-btn">추가</button>
      </div>
    `;
    data.shortcuts.forEach((sc, idx) => {
      const a = document.createElement('a');
      a.href = sc.url;
      a.target = '_blank';
      a.className = 'shortcut-card';
      a.textContent = sc.title;

      // x 버튼 생성
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
    // +버튼 다시 추가
    const btn = document.createElement('button');
    btn.className = 'add-shortcut';
    btn.textContent = '+';
    btn.type = 'button';
    btn.onclick = showShortcutForm;
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

document.addEventListener('DOMContentLoaded', () => {
  renderShortcuts();

  // 모달 버튼 이벤트
  document.getElementById('modal-add-btn').addEventListener('click', addShortcutFromModal);
  document.getElementById('modal-cancel-btn').addEventListener('click', hideShortcutForm);

  // 엔터로도 추가 가능
  document.getElementById('modal-shortcut-url').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addShortcutFromModal();
  });

  // + 버튼 및 기타 이벤트
  document.body.addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('add-shortcut')) {
      showShortcutForm();
    }
  });
});