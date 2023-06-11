// animasi aos
AOS.init();

// Update the count down every 1 second
const countdownDiscountElement = document.getElementById("countdown-discount");
if (countdownDiscountElement) {
  // set tanggal untuk countdown discount
  // disini tanggal diset tinggi sehingga tiap hari bisa di ambil jam countdown untuk discount
  var countDownDate = new Date("Jan 5, 2030 23:59:20").getTime();
  var x = setInterval(function () {
    // untuk mendapatkan waktu hari ini
    var now = new Date().getTime();

    // hitung selisih waktu saat ini dan tanggal berkahir diskon
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="demo"
    countdownDiscountElement.innerHTML =
      `${hours < 10 ? `0${hours}` : hours}` +
      ":" +
      `${minutes < 10 ? `0${minutes}` : minutes}` +
      ":" +
      `${seconds < 10 ? `0${seconds}` : seconds}`;

    // apabila sudah sampai tanggal diskon
    if (distance < 0) {
      clearInterval(x);
      countdownDiscountElement.innerHTML = "EXPIRED";
    }
  }, 1000);
}

// produk zoom
var addZoom = (target) => {
  // (A) GET CONTAINER + IMAGE SOURCE
  let container = document.getElementById(target),
    imgsrc =
      container.currentStyle || window.getComputedStyle(container, false);
  imgsrc = imgsrc.backgroundImage.slice(4, -1).replace(/"/g, "");
  if (container) {
  }
  // (B) LOAD IMAGE + ATTACH ZOOM
  let img = new Image();
  img.src = imgsrc;
  img.onload = () => {
    // (B1) CALCULATE ZOOM RATIO
    let ratio = img.naturalHeight / img.naturalWidth;
    let percentage = ratio * 150 + "%";

    // (B2) ATTACH ZOOM ON MOUSE MOVE
    container.onmousemove = (e) => {
      let rect = e.target.getBoundingClientRect(),
        xPos = e.clientX - rect.left,
        yPos = e.clientY - rect.top,
        xPercent = xPos / (container.clientWidth / 100) + "%",
        yPercent = yPos / ((container.clientWidth * ratio) / 100) + "%";
      let multiplier = 0.6;

      if (img.naturalWidth < 800) {
        multiplier = 1.2;
      } else if (img.naturalWidth > 2000) {
        multiplier = 0.3;
      }

      Object.assign(container.style, {
        backgroundPosition: xPercent + " " + yPercent,
        backgroundSize: img.naturalWidth * multiplier + "px",
      });
    };

    // (B3) RESET ZOOM ON MOUSE LEAVE
    container.onmouseleave = (e) => {
      Object.assign(container.style, {
        backgroundPosition: "center",
        backgroundSize: "cover",
      });
    };
  };
};

// (C) ATTACH FOLLOW ZOOM
if (document.getElementById("zoomC")) {
  window.onload = () => addZoom("zoomC");
  document.body.addEventListener("click", function (event) {
    if (event.target.className.includes("produk-image-thumbnail")) {
      const imgSrc = event.target.src;
      zoomC.style["background-image"] = 'url("' + imgSrc + '")';
    }
  });
}

const disiniElement = document.getElementsByClassName("disini");
disiniElement[0].addEventListener("click", () => {
  window.location.assign("/hubungi-kami.html");
});

// change produk image main

// show modal image
const imageModalEl = document.getElementById("image-modal");
if (imageModalEl) {
  const fullImageModal = new bootstrap.Modal(imageModalEl, {
    keyboard: false,
  });

  document.body.addEventListener("click", function (event) {
    if (event.target.className.includes("show-modal-image")) {
      showImage(event.target.src);
    }

    if (event.target.id === "btn-close-image-modal") {
      closeModalImage();
    }
  });

  const modalImageSrc = document.getElementById("modal-image-src");

  const showImage = (src) => {
    modalImageSrc.src = src;
    fullImageModal.show();
  };
  const closeModalImage = () => fullImageModal.hide();
}
