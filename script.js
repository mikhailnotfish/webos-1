document.addEventListener("DOMContentLoaded", () => {


  let highestZ = 100;

  function bringToFront(element) {
    highestZ++;
    element.style.zIndex = highestZ;
  }



  function updateTime() {
    const timeElement =
      document.getElementById("timeElement");

    if (timeElement) {
      timeElement.textContent =
        new Date().toLocaleString();
    }
  }

  updateTime();
  setInterval(updateTime, 1000);



  function dragElement(element) {

    if (!element) return;

    const header =
      element.querySelector(".windowheader");

    if (!header) return;

    let pos1 = 0;
    let pos2 = 0;
    let pos3 = 0;
    let pos4 = 0;

    header.addEventListener("mousedown", dragMouseDown);

    function dragMouseDown(e) {

      e.preventDefault();

      bringToFront(element);

      pos3 = e.clientX;
      pos4 = e.clientY;

      document.addEventListener(
        "mouseup",
        closeDragElement
      );

      document.addEventListener(
        "mousemove",
        elementDrag
      );
    }

    function elementDrag(e) {

      e.preventDefault();

      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;

      pos3 = e.clientX;
      pos4 = e.clientY;

      element.style.top =
        (element.offsetTop - pos2) + "px";

      element.style.left =
        (element.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {

      document.removeEventListener(
        "mouseup",
        closeDragElement
      );

      document.removeEventListener(
        "mousemove",
        elementDrag
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
      image: "images/placofish.png"
    },

    {
      name: "Angelfish",
      image: "images/angelfish.png"
    },

    {
      name: "Clownfish",
      image: "images/clownfish.png"
    },

    {
      name: "Betta",
      image: "images/bettafish.png"
    },

    {
      name: "Goldfish",
      image: "images/goldfish.png"
    },

    {
      name: "Discus",
      image: "images/discusfish.png"
    },

    {
      name: "Neon Tetra",
      image: "images/tetrafish.png"
    },

    {
      name: "Guppy",
      image: "images/guppyfish.png"
    },

    {
      name: "Zebrafish",
      image: "images/zebrafish.png"
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
        <img
          src="${fish.image}"
          alt="${fish.name}"
          style="width:100%;margin-bottom:20px;"
        >
      `;

      content.appendChild(card);

    });
  }


  const notepadText =
    document.getElementById(
      "notepadText"
    );

  const saveButton =
    document.getElementById(
      "saveNoteButton"
    );

  if (notepadText) {

    const savedNote =
      localStorage.getItem(
        "fishos-note"
      );

    if (savedNote) {
      notepadText.value = savedNote;
    }
  }

  if (saveButton) {

    saveButton.addEventListener(
      "click",
      () => {

        localStorage.setItem(
          "fishos-note",
          notepadText.value
        );

        alert(
          "FishPad note saved!"
        );
      }
    );
  }



  createWindowOpenListener(
    "welcomeIcon",
    "welcome"
  );

  createWindowOpenListener(
    "fishfinderIcon",
    "fishfinder"
  );

  createWindowOpenListener(
    "notepadIcon",
    "notepad"
  );

  createWindowCloseListener(
    "welcome",
    "welcomeclose"
  );

  createWindowCloseListener(
    "fishfinder",
    "fishfinderclose"
  );

  createWindowCloseListener(
    "notepad",
    "notepadclose"
  );

  createWindowCloseListener(
  "fishtunes",
  "fishtunesclose"
);

  createWindowOpenListener(
  "notepadIcon",
  "notepad"
);

createWindowOpenListener(
  "fishtunesIcon",
  "fishtunes"
);

  dragElement(
    document.getElementById("welcome")
  );

  dragElement(
    document.getElementById("fishfinder")
  );

  dragElement(
    document.getElementById("notepad")
  );
dragElement(
  document.getElementById("fishtunes")
);
  document
    .querySelectorAll(".window")
    .forEach(win => {

      win.addEventListener(
        "mousedown",
        () => bringToFront(win)
      );

    });



  initFishfinder();

});





