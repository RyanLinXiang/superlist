let div_items = $("#items");
let div_top5 = $("#top5");
let div_itemfull = $("#itemfull");
let inp_search = $("#search");
let btn_search_submit = $("#search_submit");
let inp_search_loc = $("#search_loc");
let btn_search_loc_submit = $("#search_loc_submit");
let btn_close_itemfull = $("#close_itemfull");
let btn_new_entry = $("#new_entry");
let btn_close_entry = $("#close_add_entry");
let btn_close_message = $("#close_message");
let btn_form_reset = $("#reset");
let div_entry = $("#add_entry");
let ul_matches = $("#matches");
let div_message = $("#message");
let form = $(document.entry);
let all_locs = [];
let lastclass;

let url = "http://localhost:3000/";
let data = {};
let error = false;

function connect_to_api(url, type, data) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: url,
      contentType: "application/json",
      type: type,
      data: data,
      success: resolve,
      error: reject,
    });
  });
}

function create_items(items, mode) {
  div_items.empty();

  items.forEach((e, i) => {
    if (i === 0 && mode == "default")
      e.forEach((e) => {
        all_locs.push(e);
      });
    else if (i === 1 && mode == "default") {
      div_top5.find("ul").empty();
      e.forEach((e) => {
        div_top5
          .find("ul")
          .append(
            `<li><a data-loc="${e}" href="javascript:void(0);" class="search_locs">${e}</a></li>`
          );
      });
    } else
      div_items.append(
        `<div class="box"><p class="title is-4">${
          e.title
        }</p><p class="subtitle">${e.description.substring(
          0,
          99
        )} ...<a href="javascript:void(0);" class="readmore" data-id="${
          e.id
        }">read more</a></p></div>`
      );
  });
}

function create_itemfull(item) {
  div_itemfull.find(".modal-card-title").empty();
  div_itemfull.find(".modal-card-title").append(`${item.title}`);
  div_itemfull.find(".modal-card-body").empty();
  div_itemfull
    .find(".modal-card-body")
    .append(`<p class="subtitle">${item.description}</p>`);
  div_itemfull.find(".modal-card-foot").empty();
  // div_itemfull.find(".modal-card-foot").append(`<p class="content">${item.price} Euro, ${item.vb?'negotiable':'not negotiable'} posted on ${item.creation_date.split("-")[2].split("T")[0]}/${item.creation_date.split("-")[1]}/${item.creation_date.split("-")[0]} (${item.dayspast} day${item.dayspast>1?'s':''} old) by <a href="mailto:${item.email}">${item.name}</a></p>`);

  div_itemfull.find(".modal-card-foot")
    .append(`<nav class="level" style="width:100%">
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Loc</p>
            <p class="title">${item.location}</p>
          </div>
        </div>        
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Price</p>
            <p class="title">${item.price}</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Negotiable?</p>
            <p class="title">${item.vb ? "yes" : "no"}</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Contact</p>
            <p class="title"><a href="mailto:${item.email}">${item.name}</a></p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Days</p>
            <p class="title">${item.dayspast}</p>
          </div>
        </div>
      </nav>`);

  div_itemfull.toggleClass("is-active");
}

function create_matches(key) {
  let matches;
  ul_matches.empty();
  let regexp = new RegExp(`${key}`, "i");
  if (inp_search_loc.val()) {
    if ((matches = all_locs.filter((e) => (e.search(regexp) != -1 ? 1 : 0)))) {
      matches.forEach((e) =>
        ul_matches.append(
          `<li><a href="javascript:void(0)" class="dropdown-item">${e}</a></li>`
        )
      );
    }
  }
}

connect_to_api(url + "show", "GET").then((e) => create_items(e, "default"));

div_items.on("click", (e) => {
  if (e.target.className === "readmore")
    connect_to_api(url + "show/" + e.target.dataset.id, "GET").then(
      create_itemfull
    );
});

div_top5.on("click", (e) => {
  if (e.target.className === "search_locs")
    connect_to_api(
      url + "search/loc/" + e.target.dataset.loc,
      "GET"
    ).then((e) => create_items(e, "search"));
});

btn_search_submit.on("click", () => {
  if (inp_search.val()) {
    connect_to_api(url + "search/" + inp_search.val(), "GET").then((e) =>
      create_items(e, "search")
    );
  }
});

form.on("submit", (e) => {
  e.preventDefault();
  let root = e.target;
  let error = false;
  let success = true;

  if (
    root.title.value &&
    root.description.value &&
    root.name.value &&
    root.loc.value &&
    root.price.value &&
    root.email.value
  ) {
    if (!isNaN(parseFloat(root.price.value)) || root.price.value == 0) {
      let data = {
        title: root.title.value,
        description: root.description.value,
        name: root.name.value,
        loc: root.loc.value,
        price: root.price.value,
        vb: root.vb.checked == true ? 1 : 0,
        email: root.email.value,
      };

      connect_to_api(url + "add", "POST", JSON.stringify(data)).catch(
        console.log
      );
      connect_to_api(url + "show", "GET").then((e) =>
        create_items(e, "default")
      );
      form.trigger("reset");
      success = "Your entry has been successfully added!";
      div_entry.toggleClass("is-active");
    } else error = "Price must be in the format xx.xx or 0!";
  } else error = "Please fill out all fields!";

  if (error) {
    div_message.toggleClass("is-active");
    lastclass = "is-danger";
    div_message.find(".message-header p").append("Error!");
    div_message.find(".message").addClass(lastclass);
    div_message.find(".message-body").append(error);
  } else {
    div_message.toggleClass("is-active");
    lastclass = "is-primary";
    div_message.find(".message-header p").append("Success!");
    div_message.find(".message").addClass(lastclass);
    div_message.find(".message-body").append(success);
  }
});

btn_close_itemfull.on("click", function () {
  div_itemfull.toggleClass("is-active");
});
btn_new_entry.on("click", function () {
  div_entry.toggleClass("is-active");
});
btn_close_entry.on("click", function () {
  div_entry.toggleClass("is-active");
  form.trigger("reset");
});
btn_form_reset.on("click", () => form.trigger("reset"));
inp_search_loc.on("keyup", function () {
  create_matches(this.value);
});
inp_search_loc.on("click", () => inp_search_loc.val(""));

ul_matches.on("click", (e) => {
  if (e.target.tagName === "A") {
    inp_search_loc.val(e.target.text);
    ul_matches.empty();
    connect_to_api(url + "search/loc/" + e.target.text, "GET").then((e) =>
      create_items(e, "search")
    );
  }
});

btn_close_message.on("click", function () {
  div_message.toggleClass("is-active");
  div_message.find(".message-header p").empty();
  div_message.find(".message").removeClass(lastclass);
  div_message.find(".message-body").empty();
});
