document.addEventListener("DOMContentLoaded", function () {
  let currentDate = new Date();
  let tomorrow = new Date();
  tomorrow.setDate(currentDate.getDate() + 1);
  let tomorrowStr = tomorrow.toISOString().split('T')[0];

  let futureCards = [
      { title: "Thứ 5 ngày 13/3/2025 ", content: "Kiểm tra GKII môn GDCD", date: "2025-03-29" },
      { title: "Thứ 6 ngày 14/3/2025 ", content: "Kiểm tra GKII môn TOÁN", date: "2025-03-29" },
      { title: "Thứ 2 ngày 17/3/2025 ", content: "Kiểm tra GKII môn KHTN", date: "2025-03-29" },
      { title: "Thứ 3 ngày 18/3/2025 ", content: "Kiểm tra GKII môn NGỮ VĂN", date: "2025-03-29" },
      { title: "Thứ 4 ngày 19/3/2025 ", content: "Kiểm tra GKII môn TIẾNG ANH - ĐỊA LÍ", date: "2025-03-29" },
      { title: "Thứ 3 ngày 25/3/2025 ", content: "Kiểm tra GKII môn CÔNG NGHỆ - GDTC - MĨ THUẬT", date: "2025-03-29" },
      { title: "Thứ 4 ngày 26/3/2025 ", content: "Kiểm tra GKII môn ÂM NHẠC", date: "2025-03-29" },
      { title: "Thứ 5 ngày 27/3/2025 ", content: "Kiểm tra GKII môn LỊCH SỬ", date: "2025-03-29" },
      { title: "Thứ 6 ngày 28/3/2025 ", content: "Kiểm tra GKII môn TIN HỌC", date: "2025-03-29" },
      { title: "Thứ 3 ngày 11/3/2025 ", content: "Buổi chiều được nghỉ", date: "2025-03-12" },
      { title: "Thứ 3 ngày 11/3/2025 ", content: "Nộp bài video lịch sử", date: "2025-03-12" },
      { title: "Thứ 3 ngày 18/3/2025 ", content: "Nộp bài video mĩ thuật", date: "2025-03-18" },
  ];

  let groupedCards = futureCards.reduce((acc, card) => {
      if (!acc[card.date]) acc[card.date] = [];
      acc[card.date].push(card);
      return acc;
  }, {});

  if (Object.keys(groupedCards).length > 0) {
      let overlay = document.createElement("div");
      overlay.classList.add("modal-overlay");

      let modal = document.createElement("div");
      modal.classList.add("modal");

      let tables = Object.keys(groupedCards).map(date => {
          return `
              <div class="date-section">
                  <h3>Ngày ${date}</h3>
                  <table>
                      <thead>
                          <tr>
                              <th>Tiêu đề</th>
                              <th>Nội dung</th>
                          </tr>
                      </thead>
                      <tbody>
                          ${groupedCards[date].map(card => `
                              <tr>
                                  <td>${card.title}</td>
                                  <td>${card.content}</td>
                              </tr>
                          `).join('')}
                      </tbody>
                  </table>
              </div>
          `;
      }).join('');

      modal.innerHTML = `
          <div class="modal-title">Thông báo</div>
          <div class="modal-content">${tables}</div>
          <div class="modal-footer">
              <button onclick="closeModal()">Đóng</button>
          </div>
      `;

      document.body.appendChild(overlay);
      document.body.appendChild(modal);

      overlay.style.display = "block";
      modal.style.display = "block";

      window.closeModal = function () {
          overlay.style.display = "none";
          modal.style.display = "none";
          document.body.removeChild(overlay);
          document.body.removeChild(modal);
      };
  }

  let table = document.querySelector("table");
  let selectedDate = table.getAttribute("data-date"); // Lấy ngày chỉ định từ HTML
  let container = document.getElementById("scheduleTable");

  let filteredCards = futureCards.filter(card => card.date === selectedDate);

  filteredCards.forEach(item => {
      let row = document.createElement("tr");
      row.innerHTML = `<td>${item.title}</td><td>${item.content}</td>`;
      container.appendChild(row);
  });
});

// Chặn chuột phải
document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
  alert("Chuột phải bị vô hiệu hóa!");
});

// Chặn sao chép (Ctrl + C, Ctrl + X, Ctrl + V, Ctrl + U,...)
document.addEventListener("keydown", function (e) {
  if (
      (e.ctrlKey && (e.key === "c" || e.key === "x" || e.key === "v" || e.key === "u")) || // Ctrl + C, X, V, U
      (e.metaKey && (e.key === "c" || e.key === "x" || e.key === "v" || e.key === "u")) || // Command trên Mac
      e.key === "F12" || // Chặn DevTools
      (e.ctrlKey && e.shiftKey && e.key === "I") || // Ctrl + Shift + I
      (e.ctrlKey && e.shiftKey && e.key === "J") || // Ctrl + Shift + J
      (e.ctrlKey && e.key === "S") || // Ctrl + S
      (e.ctrlKey && e.key === "P") // Ctrl + P
  ) {
      e.preventDefault();
      alert("Chức năng này đã bị vô hiệu hóa!");
  }
});

// Chặn kéo thả để tránh kéo ảnh ra khỏi trang
document.addEventListener("dragstart", function (e) {
  e.preventDefault();
});
