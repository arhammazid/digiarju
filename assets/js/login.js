const API_URL = "https://script.google.com/macros/s/AKfycbzbwL2PRrvtWjm2rOzuHly49V9EyJjH6B1F9dmKQkVzIBv5OW5-O2Khvd4S9j3uwBE/exec";

function handleLogin(event) {
  event.preventDefault();

  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;

  document.getElementById("login-loading").style.display = "block";
  document.getElementById("login-error").style.display = "none";

  fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({
      username,
      password
    })
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById("login-loading").style.display = "none";

    if (data.success) {
      alert("Selamat datang " + data.nama);
      localStorage.setItem("user", JSON.stringify(data));
      window.location.href = "dashboard.html";
    } else {
      showError(data.message);
    }
  })
  .catch(err => {
    showError("Koneksi gagal");
    console.error(err);
  });
}

function showError(msg) {
  const el = document.getElementById("login-error");
  el.innerText = msg;
  el.style.display = "block";
}
