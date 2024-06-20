document.addEventListener("DOMContentLoaded", function() {
  // Lấy các phần tử cần thay đổi display
  const loginTabContent = document.getElementById("login-tab-content");
  const signupTabContent = document.getElementById("signup-tab-content");

  // Lấy phần tử <a> với class là tablinksignup và thêm event listener cho nó
  const linksignup = document.querySelector(".tablinksignup");
  const linksignin = document.querySelector(".tablinksignin");

  linksignup.addEventListener("click", function(event) {
      // Ngăn chặn hành vi mặc định của thẻ <a> (chẳng hạn nhảy đến URL khác)
      event.preventDefault();

      // Thay đổi thuộc tính display của các phần tử
      if (loginTabContent.style.display === "block") {
          loginTabContent.style.display = "none";
          signupTabContent.style.display = "block";
      } else {
          loginTabContent.style.display = "block";
          signupTabContent.style.display = "none";
      }
  });
  linksignin.addEventListener("click", function(event) {
    // Ngăn chặn hành vi mặc định của thẻ <a> (chẳng hạn nhảy đến URL khác)
    event.preventDefault();

    // Thay đổi thuộc tính display của các phần tử
    if (loginTabContent.style.display === "block") {
        loginTabContent.style.display = "none";
        signupTabContent.style.display = "block";
    } else {
        loginTabContent.style.display = "block";
        signupTabContent.style.display = "none";
    }
});
});
