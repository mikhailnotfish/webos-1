document.addEventListener("DOMContentLoaded", () => {

  let highestZ = 100;

  function bringToFront(element) {
    highestZ++;
    element.style.zIndex = highestZ;
  }

  function updateTime() {
    const timeElement = document.getElementById("timeElement");

    if (timeElement) {
      timeElement.textContent = new Date().toLocaleString();
    }
  }

  updateTime();
  setInterval(updateTime, 1000);

  function dragElement(element) {

    if (!element) return;

    const header = element.querySelector(".windowheader");

    if (!header) return;

    let startX = 0;
    let startY = 0;
    let dragX = 0;
    let dragY = 0;

    header.addEventListener("mousedown", dragStart);

    function dragStart(e) {

      bringToFront(element);

      dragX = e.clientX;
      dragY = e.clientY;

      document.addEventListener(
        "mousemove",
        dragMove
      );

      document.addEventListener(
        "mouseup",
        dragEnd
      );
    }

    function dragMove(e) {

      startX = dragX - e.clientX;
      startY = dragY - e.clientY;

      dragX = e.clientX;
      dragY = e.clientY;

      element.style.top =
        (element.offsetTop - startY) + "px";

      element.style.left =
        (element.offsetLeft - startX) + "px";
    }

    function dragEnd() {

      document.removeEventListener(
        "mousemove",
        dragMove
      );

      document.removeEventListener(
        "mouseup",
        dragEnd
      );
    }
  }

  function createWindowOpenListener(
    iconId,
    windowId
  ) {

    const icon =
      document.getElementById(iconId);

    const win =
      document.getElementById(windowId);

    if (!icon || !win) return;

    icon.addEventListener("dblclick", () => {

      win.style.display = "flex";
      bringToFront(win);

    });
  }

  function createWindowCloseListener(
    windowId,
    buttonId
  ) {

    const win =
      document.getElementById(windowId);

    const button =
      document.getElementById(buttonId);

    if (!win || !button) return;

    button.addEventListener("click", () => {

      win.style.display = "none";

    });
  }

  const fishData = [
    {
      name: "Pleco",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbawIA7Jiy8FFaFJhFTxXSEOywk0SNGfNW6A&s"
    },
    {
      name: "Angelfish",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuon2x9QHOBLBRjw6_KJlhlhhGKmtXIwrI2g&s"
    }
  ];

  function initFishfinder() {

    const content =
      document.getElementById(
        "fishfinderContent"
      );

    if (!content) return;

    content.innerHTML = "";

    fishData.forEach(fish => {

      const card =
        document.createElement("div");

      card.className = "fish-card";

      card.innerHTML = `
        <h3>${fish.name}</h3>
        <img src="${fish.image}" alt="${fish.name}">
      `;

      content.appendChild(card);

    });
  }

  createWindowOpenListener(
    "welcomeIcon",
    "welcome"
  );

  createWindowOpenListener(
    "fishfinderIcon",
    "fishfinder"
  );

  createWindowCloseListener(
    "welcome",
    "welcomeclose"
  );

  createWindowCloseListener(
    "fishfinder",
    "fishfinderclose"
  );

  dragElement(
    document.getElementById("welcome")
  );

  dragElement(
    document.getElementById("fishfinder")
  );

  document
    .querySelectorAll(".window")
    .forEach(windowEl => {

      windowEl.addEventListener(
        "mousedown",
        () => bringToFront(windowEl)
      );

    });

  initFishfinder();

});





