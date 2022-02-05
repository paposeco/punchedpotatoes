let searchIndex;
let pagesIndex;
const getdata = async function() {
  try {
    const response = await fetch("/my-index.json");
    pagesIndex = await response.json();
    searchIndex = lunr(function() {
      this.field("title");
      this.field("content");
      this.ref("uri");
      pagesIndex.forEach((page) => this.add(page));
      console.log(pagesIndex);
    });
  } catch (error) {
    console.log(error);
  }
};

const userquery = async function(searchquery) {
  await getdata();
  const searchonindex = searchIndex.search(searchquery);
  return searchonindex;
};

//userquery("pork");

const form = document.querySelector("form");

const handlesubmit = async function(event) {
  event.preventDefault();
  const formdata = new FormData(form);
  let searchquery;
  for (const value of formdata.values()) {
    searchquery = value;
  }
  const resultsarray = await userquery(searchquery);
  let titlesarray = [];
  const resultsdiv = document.createElement("div");
  const button = document.createElement("button");
  button.addEventListener("click", function(event) {
    resultsdiv.remove();
  });
  button.textContent = "x";
  const divtitle = document.createElement("h2");
  divtitle.textContent = "Search Results";
  resultsdiv.classList.add("searchresults");
  document.getElementById("content").appendChild(resultsdiv);
  const divheader = document.createElement("div");
  divheader.setAttribute("id", "searchresultsheader");
  resultsdiv.appendChild(divheader);
  divheader.appendChild(divtitle);
  divheader.appendChild(button);
  const ul = document.createElement("ul");
  resultsdiv.appendChild(ul);
  resultsarray.forEach((element) => {
    const pagecontent = pagesIndex.find((page) => page.uri === element.ref);
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.setAttribute("href", "/recipes" + element.ref);
    a.textContent = pagecontent.title;
    li.appendChild(a);
    ul.appendChild(li);
  });
};

form.addEventListener("submit", handlesubmit);
