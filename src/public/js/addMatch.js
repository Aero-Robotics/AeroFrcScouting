//importlar ve değişkenler
const electron = require("electron");
const { ipcRenderer } = electron;
const $ = require("jquery");
const fs = require("fs");
const path = require("path");
var numberOfFristTeams = 0;
var numberOfSecondTeams = 0;
var firstallience = [];
var Secondallience = [];
const goBackButton = document.getElementById("gobackButton");
const NextButton = document.getElementById("NextButton");

//jquery kodları
function create_custom_dropdowns() {
  $("select").each(function (i, select) {
    if (!$(this).next().hasClass("dropdown-select")) {
      $(this).after(
        '<div class="dropdown-select wide ' +
          ($(this).attr("class") || "") +
          '" tabindex="0"><span class="current"></span><div class="list"><ul></ul></div></div>'
      );
      var dropdown = $(this).next();
      var options = $(select).find("option");
      var selected = $(this).find("option:selected");
      dropdown
        .find(".current")
        .html(selected.data("display-text") || selected.text());
      options.each(function (j, o) {
        var display = $(o).data("display-text") || "";
        dropdown
          .find("ul")
          .append(
            '<li class="option ' +
              ($(o).is(":selected") ? "selected" : "") +
              '" data-value="' +
              $(o).val() +
              '" data-display-text="' +
              display +
              '">' +
              $(o).text() +
              "</li>"
          );
      });
    }
  });

  $(".dropdown-select ul").before(
    '<div class="dd-search"><input id="txtSearchValue" autocomplete="off" onkeyup="filter()" class="dd-searchbox" type="text"></div>'
  );
}

// Event listeners

// Open/close
$(document).on("click", ".dropdown-select", function (event) {
  if ($(event.target).hasClass("dd-searchbox")) {
    return;
  }
  $(".dropdown-select").not($(this)).removeClass("open");
  $(this).toggleClass("open");
  if ($(this).hasClass("open")) {
    $(this).find(".option").attr("tabindex", 0);
    $(this).find(".selected").focus();
  } else {
    $(this).find(".option").removeAttr("tabindex");
    $(this).focus();
  }
});

// Close when clicking outside
$(document).on("click", function (event) {
  if ($(event.target).closest(".dropdown-select").length === 0) {
    $(".dropdown-select").removeClass("open");
    $(".dropdown-select .option").removeAttr("tabindex");
  }
  event.stopPropagation();
});

function filter() {
  var valThis = $("#txtSearchValue").val();
  $(".dropdown-select ul > li").each(function () {
    var text = $(this).text();
    text.toLowerCase().indexOf(valThis.toLowerCase()) > -1
      ? $(this).show()
      : $(this).hide();
  });
}
// Search

// Option click
$(document).on("click", ".dropdown-select .option", function (event) {
  $(this).closest(".list").find(".selected").removeClass("selected");
  $(this).addClass("selected");
  var text = $(this).data("display-text") || $(this).text();
  $(this).closest(".dropdown-select").find(".current").text(text);
  $(this)
    .closest(".dropdown-select")
    .prev("select")
    .val($(this).data("value"))
    .trigger("change");
});

// Keyboard events
$(document).on("keydown", ".dropdown-select", function (event) {
  var focused_option = $(
    $(this).find(".list .option:focus")[0] ||
      $(this).find(".list .option.selected")[0]
  );
  // Space or Enter
  //if (event.keyCode == 32 || event.keyCode == 13) {
  if (event.keyCode == 13) {
    if ($(this).hasClass("open")) {
      focused_option.trigger("click");
    } else {
      $(this).trigger("click");
    }
    return false;
    // Down
  } else if (event.keyCode == 40) {
    if (!$(this).hasClass("open")) {
      $(this).trigger("click");
    } else {
      focused_option.next().focus();
    }
    return false;
    // Up
  } else if (event.keyCode == 38) {
    if (!$(this).hasClass("open")) {
      $(this).trigger("click");
    } else {
      var focused_option = $(
        $(this).find(".list .option:focus")[0] ||
          $(this).find(".list .option.selected")[0]
      );
      focused_option.prev().focus();
    }
    return false;
    // Esc
  } else if (event.keyCode == 27) {
    if ($(this).hasClass("open")) {
      $(this).trigger("click");
    }
    return false;
  }
});

$(document).ready(function () {
  create_custom_dropdowns();
});

$("#mySelect1").change(function () {
  var selectedText = $(this).find("option:selected").text();
  if (selectedText != "select frist alience") {
    if (numberOfFristTeams < 3) {
      var same = false;
      firstallience.forEach(function (item) {
        if (selectedText == item) {
          same = true;
          return false; // döngüyü durdurun
        }
      });


      Secondallience.forEach(function (item) {
        if (selectedText == item) {
          same = true;
          return false; // döngüyü durdurun
        }
      });

      if (same == false) {
        numberOfFristTeams++;
        var div = $("#listFristAllience");
        var button = $(
          '<button type="button" id="' +
            numberOfFristTeams +
            '" class="button">' +
            selectedText +
            "</button>"
        );
        div.append(button);
        firstallience.push(selectedText);
      } else {
        ipcRenderer.send("ShowWarningMessagebox", {
          title: "same team",
          message: "the team cannot be the same",
        });
      }
    } else {
      ipcRenderer.send("ShowWarningMessagebox", {
        title: "more team",
        message: "you can't add team more than 3.",
      });
    }
  }
});

// JSON dosyasını oku
const jsonFile = fs.readFileSync('src/teams_with_flag.json', 'utf-8');
const getData = JSON.parse(jsonFile);

// Seçim öğesine verileri yükle
const select = document.getElementById("mySelect1");
const select2 = document.getElementById("mySelect2");

getData.forEach((veri) => {
  const option = document.createElement("option");
  option.value = veri.teamNumber;

  // Bayrağı option öğesine ekle
  const flag = veri.flag.replace(/\\u/g, "\\u");
  const flagSpan = document.createElement("span");
  flagSpan.innerHTML = flag;
  option.appendChild(flagSpan);

  // Takım adını option öğesine ekle
  const name = document.createTextNode(
    ` ${veri.nameShort} (${veri.teamNumber})`
  );
  option.appendChild(name);

  // Bayrak ve takım adını option text özelliğine ekle
  option.text = "";
  const flagAndNameSpan = document.createElement("span");
  flagAndNameSpan.style.display = "flex";
  flagAndNameSpan.style.alignItems = "center";
  flagAndNameSpan.appendChild(flagSpan);
  flagAndNameSpan.appendChild(name);
  option.appendChild(flagAndNameSpan);

  select.appendChild(option);
});

getData.forEach((veri) => {
  const option = document.createElement("option");
  option.value = veri.teamNumber;

  // Bayrağı option öğesine ekle
  const flag = veri.flag.replace(/\\u/g, "\\u");
  const flagSpan = document.createElement("span");
  flagSpan.innerHTML = flag;
  option.appendChild(flagSpan);

  // Takım adını option öğesine ekle
  const name = document.createTextNode(
    ` ${veri.nameShort} (${veri.teamNumber})`
  );
  option.appendChild(name);

  // Bayrak ve takım adını option text özelliğine ekle
  option.text = "";
  const flagAndNameSpan = document.createElement("span");
  flagAndNameSpan.style.display = "flex";
  flagAndNameSpan.style.alignItems = "center";
  flagAndNameSpan.appendChild(flagSpan);
  flagAndNameSpan.appendChild(name);
  option.appendChild(flagAndNameSpan);

  select2.appendChild(option);
});

$("#listFristAllience").on("click", ".button", function () {
  numberOfFristTeams--; // decrease the count of teams
  var id = $(this).attr("id");
  $("#" + id).remove(); // remove the button from DOM
  firstallience.splice(id - 1, 1); // remove the button's text from the array
  // find the index of the item to be removed in the array
  var indexToRemove = firstallience.indexOf($(this).text());
  if (indexToRemove > -1) {
    firstallience.splice(indexToRemove, 1); // remove the button's text from the array
  }
  console.log(firstallience);
});


$("#mySelect2").change(function () {
  var selectedText = $(this).find("option:selected").text();
  if (selectedText != "select second alience") {
    if (numberOfSecondTeams < 3) {
      var same = false;
      Secondallience.forEach(function (item) {
        if (selectedText == item) {
          same = true;
          return false; // döngüyü durdurun
        }
      });
      firstallience.forEach(function (item) {
        if (selectedText == item) {
          same = true;
          return false; // döngüyü durdurun
        }
      });

      if (same == false) {
        numberOfSecondTeams++;
        var div = $("#listSecondAllience");
        var button = $(
          '<button type="button" id="' +
            numberOfSecondTeams +
            '" class="button">' +
            selectedText +
            "</button>"
        );
        div.append(button);
        Secondallience.push(selectedText);
      }
      if(same==true)
      {
        ipcRenderer.send("ShowWarningMessagebox", {
          title: "same team",
          message: "the team cannot be the same",
        });
      }
    } else {
      ipcRenderer.send("ShowWarningMessagebox", {
        title: "more team",
        message: "you can't add team more than 3.",
      });
    }
  }
});

$("#listSecondAllience").on("click", ".button", function () {
  numberOfSecondTeams--; // decrease the count of teams
  var id = $(this).attr("id");
  $("#" + id).remove(); // remove the button from DOM
  Secondallience.splice(id - 1, 1); // remove the button's text from the array
  // find the index of the item to be removed in the array
  var indexToRemove = Secondallience.indexOf($(this).text());
  if (indexToRemove > -1) {
    Secondallience.splice(indexToRemove, 1); // remove the button's text from the array
  }
  console.log(Secondallience);
});

goBackButton.addEventListener("click", function () {
  ipcRenderer.send("goBackAddMatch");
});

NextButton.addEventListener("click", function () {
  ipcRenderer.send("nextAddMatch",{frist:firstallience,second:Secondallience});
});