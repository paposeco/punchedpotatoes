const yieldSpan = document.querySelector(".yield");
const cookTimeSpan = document.querySelector(".duration");
const publishdate = document.querySelector(".publishdate");
const selectImage = document.querySelector("img"); // first image
const recipeName = document.querySelector(".postTitle");
const recipeIngredientsLi = document.querySelectorAll("article li");

let ingredients = [];
for (let i = 0; i < recipeIngredientsLi.length; i++) {
  ingredients.push(`"${recipeIngredientsLi[i].textContent}"`);
}

const paras = document.querySelectorAll("div.singlepagecontent p");
let instructionsPara = [];
for (let i = 0; i < paras.length - 1; i++) {
  const textcontent = paras[i].textContent;
  if (textcontent !== "" && paras[i].children.length === 0) {
    instructionsPara.push(`"${textcontent}"`);
  }
}

let instructions = [];

for (let i = 0; i < instructionsPara.length; i++) {
  instructions.push(`{"@type": "HowToStep",
        "text": ${instructionsPara[i]}}`);
}

const ascript = document.createElement("script");
const head = document.querySelector("head");

ascript.setAttribute("type", "application/ld+json");
ascript.textContent = `{
  "@context": "https://schema.org",
  "@type": "Recipe",
  "author": "Punched Potatoes",
  "cooktime": "${cookTimeSpan.textContent}",
  "datePublished": "${publishdate.textContent}",
  "image": "${selectImage.src}",
  "recipeIngredient": [${Array.from(ingredients)}],
  "name": "${recipeName.textContent}",
  "recipeInstructions": [${Array.from(instructions)}],
  "recipeYield": "${yieldSpan.textContent}"
}`;

head.appendChild(ascript);

let paraWithImages = [];

for (let i = 0; i < paras.length; i++) {
  if (paras[i].firstChild.nodeName === "IMG") {
    paraWithImages.push(paras[i]);
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

const postcontent = document.querySelector(".singlepagecontent");
const description = document.querySelector(".description");
const displaydescription = document.createElement("div");
displaydescription.classList.add("displaydescription");
displaydescription.textContent = "> Click to read fluff <";
displaydescription.addEventListener("click", (event) => {
  if (description.hidden) {
    displaydescription.textContent = "> Hide <";
    description.hidden = false;
  } else {
    displaydescription.textContent = "> Click to read fluff <";
    description.hidden = true;
  }
});
postcontent.insertBefore(displaydescription, description);
