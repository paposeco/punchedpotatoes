const articles = document.querySelectorAll("article");

articles.forEach((article) => {
  const articlechildren = article.childNodes;
  let articleDiv;
  for (let i = 0; i < articlechildren.length; i++) {
    if (
      articlechildren[i].nodeName === "DIV" &&
      articlechildren[i].className === ""
    ) {
      articleDiv = articlechildren[i];
      const articledescription = article.querySelector(".description");
      const displaydescription = document.createElement("div");
      displaydescription.classList.add("displaydescription");
      displaydescription.textContent = "> Click to read fluff <";
      displaydescription.addEventListener("click", (event) => {
        if (articledescription.hidden) {
          displaydescription.textContent = "> Hide <";
          articledescription.hidden = false;
        } else {
          displaydescription.textContent = "> Click to read fluff <";
          articledescription.hidden = true;
        }
      });
      articleDiv.insertBefore(displaydescription, articledescription);
      break;
    }
  }
  let articleDivParas = [];
  let articleDivChildren = articleDiv.childNodes;
  for (let i = 0; i < articleDivChildren.length; i++) {
    if (articleDivChildren[i].nodeName === "P") {
      articleDivParas.push(articleDivChildren[i]);
    }
  }
  let paraWithImages = [];
  for (let i = 0; i < articleDivParas.length; i++) {
    if (articleDivParas[i].firstChild.nodeName === "IMG") {
      paraWithImages.push(articleDivParas[i]);
    }
  }

  for (let i = 0; i < paraWithImages.length - 2; i++) {
    const currentpara = paraWithImages[i];
    const sibling = currentpara.nextSibling;
    if (sibling !== null) {
      const nextsibling = sibling.nextSibling;
      if (nextsibling !== null) {
        const nextsiblingchild = nextsibling.firstChild;
        if (nextsiblingchild.nodeName === "IMG") {
          currentpara.classList.add("tutorialimage");
          nextsibling.classList.add("tutorialimage");
        }
      }
    }
  }
});
