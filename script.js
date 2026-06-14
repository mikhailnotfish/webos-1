// ==================== CLOCK ====================
function updateTime() {
  const timeElement = document.getElementById("timeElement");
  if (timeElement) {
    timeElement.textContent = new Date().toLocaleString();
  }
}

updateTime();
setInterval(updateTime, 1000);

// ==================== WINDOW DRAGGING ====================
function dragElement(element) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  const header = element.querySelector(".windowheader");

  if (header) {
    header.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    element.style.top = (element.offsetTop - pos2) + "px";
    element.style.left = (element.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

// ==================== WINDOW MANAGEMENT ====================
function createWindowCloseListener(windowId, closeButtonId) {
  document.getElementById(closeButtonId).addEventListener("click", () => {
    document.getElementById(windowId).style.display = "none";
  });
}

function createWindowOpenListener(iconId, windowId) {
  document.getElementById(iconId).addEventListener("dblclick", () => {
    document.getElementById(windowId).style.display = "flex";
  });
}

// Welcome window
createWindowOpenListener("welcomeIcon", "welcome");
createWindowCloseListener("welcome", "welcomeclose");
dragElement(document.querySelector("#welcome"));

// ==================== FISHFINDER APP ====================
const fishData = [
  { name: "Pleco", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbawIA7Jiy8FFaFJhFTxXSEOywk0SNGfNW6A&s" },
  { name: "Angelfish", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuon2x9QHOBLBRjw6_KJlhlhhGKmtXIwrI2g&s" }
];

function initFishfinder() {
  const content = document.getElementById("fishfinderContent");
  
  fishData.forEach(fish => {
    const fishDiv = document.createElement("div");
    fishDiv.style.marginBottom = "20px";
    
    const title = document.createElement("h3");
    title.textContent = fish.name;
    title.style.color = "white";
    title.style.margin = "0";
    
    const img = document.createElement("img");
    img.src = fish.image;
    img.style.width = "100%";
    img.style.borderRadius = "4px";
    
    fishDiv.appendChild(title);
    fishDiv.appendChild(img);
    content.appendChild(fishDiv);
  });
}

initFishfinder();
createWindowOpenListener("fishfinderIcon", "fishfinder");
createWindowCloseListener("fishfinder", "fishfinderclose");
dragElement(document.querySelector("#fishfinder"));





