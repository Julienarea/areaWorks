document.getElementById("linkForm").addEventListener("submit", function (event) {
  event.preventDefault();
  const linkInput = document.getElementById("link");
  const linkNameInput = document.getElementById("linkName");
  const link = linkInput.value;
  const linkName = linkNameInput.value;

  if (!link || !linkName) {
      alert("Пожалуйста, заполните все поля.");
      return;
  }

  displayLink(link, linkName);
  linkInput.value = "";
  linkNameInput.value = "";
  saveLinksToLocalStorage();
});

document.addEventListener("DOMContentLoaded", function () {
  loadLinksFromLocalStorage();
});

function displayLink(link, linkName) {
  const linksContainer = document.getElementById("linksContainer");
  const linkWrapper = document.createElement("div");

  const linkElement = document.createElement("a");
  linkElement.href = link;
  linkElement.textContent = linkName;
  linkWrapper.appendChild(linkElement);

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Удалить";
  deleteButton.addEventListener("click", function () {
      linksContainer.removeChild(linkWrapper);
      saveLinksToLocalStorage();
  });
  linkWrapper.appendChild(deleteButton);

  linksContainer.appendChild(linkWrapper);
}

function saveLinksToLocalStorage() {
  const linksContainer = document.getElementById("linksContainer");
  const links = [];
  for (const linkWrapper of linksContainer.children) {
      const linkElement = linkWrapper.querySelector("a");
      links.push({ link: linkElement.href, linkName: linkElement.textContent });
  }
  localStorage.setItem("links", JSON.stringify(links));
}

function loadLinksFromLocalStorage() {
  const linksContainer = document.getElementById("linksContainer");
  const links = JSON.parse(localStorage.getItem("links"));
  if (links) {
      for (const link of links) {
          displayLink(link.link, link.linkName);
      }
  }
}
