window.onload = function () {
  startCountDown(5, 1000);
}

function startCountDown(i, p, f) {
  var pause = p;
  var countDownObj = document.getElementById("countDown");

  countDownObj.count = function (i) {
    countDownObj.innerHTML = "Hold on, going back in " + i + "...";
    if (i == 1) {
      window.location.href = "http://jawe.pw";
      return;
    }
    setTimeout(function () {
      countDownObj.count(i - 1);
    },
      pause
      );
  }
  countDownObj.count(i);
}
