document.addEventListener("DOMContentLoaded", function () {
  let currentDate = new Date();
  let tomorrow = new Date();
  tomorrow.setDate(currentDate.getDate() + 1);
  let tomorrowStr = tomorrow.toISOString().split('T')[0];

  let futureCards = [
        { title: "Thứ 5 ngày 24/4/2025 ", content: "Môn GDCD và CÔNG NGHỆ", date: "2025-04-30" },
        { title: "Thứ 6 ngày 25/4/2025 ", content: "Môn TIN HỌC và LỊCH SỬ ĐỊA LÍ", date: "2025-04-30" },
        { title: "Thứ 2 ngày 28/4/2025 ", content: "Môn KHTN và NGỮ VĂN", date: "2025-04-30" },
        { title: "Thứ 3 ngày 29/4/2025 ", content: "Môn TOÁN và TIẾNG ANH", date: "2025-04-30" },
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

document.addEventListener("DOMContentLoaded", function () {
    const deletedCards = JSON.parse(localStorage.getItem("deletedCards")) || [];
    const correctPassword = "1979198420082010"; // Thay đổi mật khẩu tại đây
    const notificationCount = document.getElementById("notification-count");

    function updateCardCount() {
        let visibleCards = document.querySelectorAll(".card:not([style*='display: none'])").length;
        notificationCount.textContent = visibleCards.toString().padStart(2, "0");
    }

    // Ẩn các thẻ đã bị xóa trước đó
    document.querySelectorAll(".card").forEach((card) => {
        if (deletedCards.includes(card.dataset.id)) {
            card.style.display = "none";
        }
    });

    updateCardCount(); // Cập nhật số lượng ban đầu

    // Xử lý sự kiện khi bấm vào nút xóa
    document.querySelectorAll(".delete-btn").forEach((btn) => {
        btn.addEventListener("click", function () {
            let card = this.closest(".card");
            let cardId = card.dataset.id;
            let enteredPassword = prompt("Nhập mật khẩu để xóa thẻ:");

            if (enteredPassword === correctPassword) {
                alert("Xóa thành công!");
                card.style.display = "none";

                if (!deletedCards.includes(cardId)) {
                    deletedCards.push(cardId);
                }

                localStorage.setItem("deletedCards", JSON.stringify(deletedCards));
                updateCardCount(); // Cập nhật bộ đếm ngay lập tức
            } else {
                alert("Mật khẩu không đúng! Không thể xóa thẻ.");
            }
        });
    });

    // Xử lý sự kiện khi bấm vào nút khôi phục
    document.getElementById("restore-btn").addEventListener("click", function () {
        if (deletedCards.length === 0) {
            alert("Không có thẻ nào để khôi phục.");
            return;
        }

        let enteredPassword = prompt("Nhập mật khẩu để khôi phục thẻ:");
        if (enteredPassword !== correctPassword) {
            alert("Mật khẩu không đúng! Không thể khôi phục thẻ.");
            return;
        }

        let restoreContainer = document.createElement("div");
        restoreContainer.id = "restore-container";

        let title = document.createElement("p");
        title.innerText = "Chọn thẻ cần khôi phục:";
        restoreContainer.appendChild(title);

        deletedCards.forEach((cardId) => {
            let label = document.createElement("label");
            label.innerHTML = `<input type="checkbox" value="${cardId}"> Thẻ ${cardId}`;
            restoreContainer.appendChild(label);
            restoreContainer.appendChild(document.createElement("br"));
        });

        let confirmBtn = document.createElement("button");
        confirmBtn.id = "confirm-restore";
        confirmBtn.innerText = "Khôi phục";
        restoreContainer.appendChild(confirmBtn);

        document.body.appendChild(restoreContainer);

        confirmBtn.addEventListener("click", function () {
            let selectedCards = Array.from(
                restoreContainer.querySelectorAll("input:checked")
            ).map((checkbox) => checkbox.value);

            if (selectedCards.length === 0) {
                alert("Bạn chưa chọn thẻ nào để khôi phục.");
                return;
            }

            selectedCards.forEach((cardId) => {
                let card = document.querySelector(`.card[data-id="${cardId}"]`);
                if (card) {
                    card.style.display = "block";
                    card.classList.add("fade-in"); // Hiệu ứng hiện lại
                }
                deletedCards.splice(deletedCards.indexOf(cardId), 1);
            });

            localStorage.setItem("deletedCards", JSON.stringify(deletedCards));
            updateCardCount(); // Cập nhật bộ đếm ngay lập tức
            alert("Khôi phục thành công!");

            document.body.removeChild(restoreContainer);
        });
    });
});

function generateFilterOptions() {
    let select = document.getElementById("filter-select");
    let cards = document.querySelectorAll(".card");
    let uniqueIds = new Set();

    cards.forEach(card => uniqueIds.add(card.getAttribute("data-id")));

    uniqueIds.forEach(id => {
        let option = document.createElement("option");
        option.value = id;
        option.textContent = "Thẻ " + id;
        select.appendChild(option);
    });
}

// Lọc thẻ dựa vào bộ lọc
function filterCards() {
    let selectedId = document.getElementById("filter-select").value;
    let cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        let cardId = card.getAttribute("data-id");
        card.style.display = (selectedId === "" || cardId === selectedId) ? "block" : "none";
    });
}

// Gọi hàm tạo bộ lọc khi trang tải
document.addEventListener("DOMContentLoaded", generateFilterOptions);
