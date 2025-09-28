let saveBtn = document.querySelector(".input-btn");
let myLinks = [];
// let deleteMode = false;
let inputEl = document.querySelector(".input-el");
let list = document.querySelector(".list");
// let listItems;
let linksFromLocalStorage = JSON.parse(localStorage.getItem("myLinks"));
// console.log(linksFromLocalStorage);
let deleteLinkBtn = document.querySelector(".delete-link-btn");
let deleteBtn = document.querySelector(".delete-btn");
let tabBtn = document.querySelector(".tab-btn");
let cenclebtn = document.querySelector("#cencleBtn");
let confirmDeleteBtn = document.querySelector("#confirmDeleteBtn")

if (linksFromLocalStorage) {
  myLinks = linksFromLocalStorage;
  render(myLinks);
}
//  myLinks = JSON.stringify(myLinks)
// console.log(typeof myLinks)
// myLinks = JSON.parse(myLinks)
// console.log(typeof myLinks)

// localStorage.setItem("myLinks", "www.new.com")
// localStorage.clear()
// console.log(localStorage.getItem("myLinks"))

saveBtn.addEventListener("click", function () {
  // myLeads.push("www.helloworld.com");
  // console.log(myLeads)
  // inputEl.value = "";
  // console.log("save btn clicked")
  if (inputEl.value !== "") {
    myLinks.push(inputEl.value);
    // list.textContent = myLinks
    //   // updateDisplay();
  }
  localStorage.setItem("myLinks", JSON.stringify(myLinks));

  //   console.log(myLinks);
  // list.innerHTML += "<li>" + myLeads + "</li>"
  // myLeads.pop()
  render(myLinks);
  // console.log(localStorage.getItem("myLinks"));
});

function render(links) {
  let listItems = "";
  list.innerHTML = "";

  for (i = 0; i < links.length; i++) {
    // console.log(links[i]);
    // listItems += myLinks[i]
    // let li = document.createElement("li")
    // let a = document.createElement("a")
    // a.textContent += myLinks[i]
    // li.append(a)
    // list.append(li)

    // listItems += "<li><a target='_blank' href='" + myLinks[i] + "'>" + myLinks[i] + "</a></li>"  //can write it this way
    //but it is not clean

    listItems += `<li>
                           <a target='_blank' href='${links[i]}'> ${links[i]} 
                           </a>
                         </li> `;
    // can also write this way but this way is more clean its called template strings or template literals

    //     console.log(listItems);
  }

  list.innerHTML = listItems;
}

// const tabs = [{ url: "www.google.com" }];

tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLinks.push(tabs[0].url);
    localStorage.setItem("mylinks", JSON.stringify(myLinks));
    render(myLinks);
    console.log(myLinks);
    // list.textContent += tabs[0].url
  });
});

deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myLinks = [];
  render(myLinks);
  list.innerHTML = myLinks;
  // console.log(localStorage);
  console.log("delete button clicked");
});

function deleteLink(showCheckboxes = false) {
  list.innerHTML = "";

  myLinks.forEach((item, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "item";

    if (showCheckboxes) {
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.dataset.index = index;
      itemDiv.appendChild(checkbox);
    }

    const span = document.createElement("span");
    span.textContent = item;
    span.style.marginLeft = "10px";
    itemDiv.appendChild(span);

    list.appendChild(itemDiv);
  });
}
// render(lin)

// Initial render
// deleteLink();

// Show checkboxes on Delete button click
deleteLinkBtn.addEventListener("click", () => {
  deleteLink(true);
  confirmDeleteBtn.classList.remove("hidden");
  deleteLinkBtn.classList.add("hidden");
  cenclebtn.classList.remove("hidden");
});

cenclebtn.addEventListener("click", function () {
  console.log("cencle btn clicked");
  render(myLinks);
  cenclebtn.classList.add("hidden");
  deleteLinkBtn.classList.remove("hidden");
  confirmDeleteBtn.classList.add("hidden");
});

// Confirm deletion
confirmDeleteBtn.addEventListener("click", () => {
  const checkboxes = list.querySelectorAll('input[type="checkbox"]');
  const indexesToDelete = [];

  checkboxes.forEach((cb) => {
    if (cb.checked) {
      indexesToDelete.push(parseInt(cb.dataset.index));
    }
  });

  // Delete from items array (in reverse to avoid index shifting)
  indexesToDelete
    .sort((a, b) => b - a)
    .forEach((index) => {
      myLinks.splice(index, 1);
    });
  // saveToLocalStorage(); // Update localStorage
  localStorage.setItem("myLinks", JSON.stringify(myLinks));

  deleteLink(false); // Refresh list
  confirmDeleteBtn.classList.add("hidden"); // Hide confirm button
  deleteLinkBtn.classList.remove("hidden");
  cenclebtn.classList.add("hidden");
  render(myLinks);
});
