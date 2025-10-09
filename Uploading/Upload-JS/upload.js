//     UPLOAD US - JS
// <!---------------------------------------------------------------------------------------->



document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(form);

    fetch("messagephp/message.php", {
      method: "POST",
      body: formData
    })
    .then(response => {
      if (response.redirected) {
        window.location.href = response.url;
      } else {
        return response.text().then(text => alert(text));
      }
    })
    .catch(error => {
      alert("An error occurred: " + error.message);
    });
  });
});

