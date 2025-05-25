let cvData = { languages: [], skills: [] };
    let mode = 'view';

    window.addEventListener('DOMContentLoaded', () => {
      const saved = localStorage.getItem('cvData');
      if (saved) {
        cvData = JSON.parse(saved);
        renderAll();
      } else {
        fetch('data.json')
          .then(res => res.json())
          .then(data => {
            cvData = data;
            renderAll();
          });
      }
    });

    function renderAll() {
      renderList('languages');
      renderList('skills');
    }

    function renderList(section) {
      const list = document.getElementById(section + 'List');
      list.innerHTML = '';
      cvData[section].forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = item;
        list.appendChild(li);
      });
    }

    function toggleEdit(section) {
      if (mode === 'edit') {
        document.getElementById(section + 'Form').classList.toggle('active');
      }
    }

    function addItem(section) {
      const input = document.getElementById('new' + capitalize(section));
      const val = input.value.trim();
      if (val) {
        cvData[section].push(val);
        input.value = '';
        renderList(section);
        saveData();
      }
    }

    function saveData() {
      localStorage.setItem('cvData', JSON.stringify(cvData));
      alert('Məlumatlar saxlanıldı!');
    }

    function resetData() {
      localStorage.removeItem('cvData');
      location.reload();
    }

    function switchMode(newMode) {
      mode = newMode;
      document.querySelectorAll('.edit-form').forEach(el => {
        el.classList.remove('active');
      });
    }

    function capitalize(s) {
      return s.charAt(0).toUpperCase() + s.slice(1);
    }