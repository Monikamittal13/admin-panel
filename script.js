var url =
  "http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D";
let headTable = document.getElementById("table-body");
let infoTable = document.getElementById("info-content");

let res = new XMLHttpRequest();
res.open("GET", url, true);
res.send();
res.onreadystatechange = function () {
  if (res.readyState == 4) {
    let data = JSON.parse(res.responseText);
    //console.log(data)
    for (let i = 0; i < data.length; i++) {
      id = data[i]["id"];
      first = data[i]["firstName"];
      last = data[i]["lastName"];
      mail = data[i]["email"];
      phone = data[i]["phone"];
      address = data[i]["address"];
      description = data[i]["description"];
      tableList(id, first, last, mail, phone, address, description);
    }
  }
};

function tableList(id, first, last, mail, phone, address, description) {
  let row = document.createElement("tr");
  row.classList.add("data-row");
  row.id = id;
  row.addEventListener("click", function () {
    let result = document.getElementsByClassName("data-row");
    for (i = 0; i < result.length; i++) {
      result[i].style.backgroundColor = "white";
    }
    document.getElementById(id).style.backgroundColor = "lightseagreen";
    let innerName =
      "<div><b>User selected:</b>" + first + " " + last + "</div>";
    let innerDescription =
      "<div><b> Description: </b><textarea cols='50' rows='5' readonly>" +
      description +
      "</textarea></div >";
    let street = "<div><b>Address:</b>" + address["streetAddress"] + "</div>";
    let city = "<div><b>City:</b>" + address["city"] + "</div>";
    let state = "<div><b>State:</b>" + address["state"] + "</div>";
    let zip = "<div><b>Zip:</b>" + address["zip"] + "</div>";
    let innerTotal = innerName + innerDescription + street + city + state + zip;
    //console.log(innerTotal)

    infoTable.innerHTML = innerTotal;
    infoTable.style.display = "block";
  });

  columnOne = document.createElement("td");
  columnOne.classList.add("column1");
  columnOne.innerText = id;
  columnTwo = document.createElement("td");
  columnTwo.classList.add("column2");
  columnTwo.innerText = first;
  columnThree = document.createElement("td");
  columnThree.classList.add("column3");
  columnThree.innerText = last;
  columnFour = document.createElement("td");
  columnFour.classList.add("column4");
  columnFour.innerText = mail;
  columnFive = document.createElement("td");
  columnFive.classList.add("column5");
  columnFive.innerText = phone;

  row.appendChild(columnOne);
  row.appendChild(columnTwo);
  row.appendChild(columnThree);
  row.appendChild(columnFour);
  row.appendChild(columnFive);

  headTable.appendChild(row);
}

let searchBox = document.getElementById("search-box");
let searchElement = document.getElementsByClassName("data-row");

searchBox.addEventListener("input", function () {
  content = searchBox.value;
  for (i = 0; i < searchElement.length; i++) {
    name = searchElement[i].getElementsByClassName("column2")[0].innerText;
    name = name.toLowerCase();
    if (!name.includes(content)) {
      searchElement[i].style.display = "none";
    } else {
      searchElement[i].style.display = "";
    }
  }
});
