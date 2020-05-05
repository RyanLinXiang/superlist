

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
let div_entry = $("#add_entry");
let ul_matches = $("#matches");
let form = $(document.entry);
let all_locs = [];

let url = "http://localhost:3000/";
let data = {};
let error = false;
  

function connect_to_api(url, type, data) {
    return new Promise((resolve,reject)=>{   
        $.ajax({
            url: url,
            contentType: "application/json",
            type: type,
            data: data,
            success: resolve,
            error: reject
        });
    })
}   

function create_items(items, mode) {
    
    div_items.empty();

    items.forEach((e, i) => {
        if (i === 0 && mode == "default")
            e.forEach(e => { all_locs.push(e) });
        else if (i === 1 && mode == "default") {
            div_top5.find("ul").empty();
            e.forEach(e => { div_top5.append(`<li><a data-loc="${e}" href="javascript:void(0);" class="search_locs">${e}</a></li>`) });
        }    
        else
            div_items.append(`<div>${e.title}<br>${e.description.substring(0, 99)} ...</div><button class="readmore" data-id="${e.id}">Readmore</button>`);
    })

}

function create_itemfull(item) {
        div_itemfull.find(".modal-content").empty();
        div_itemfull.find(".modal-content").append( `<div>${item.title}<br>${item.description}<br>posted on ${item.date.split("-")[2].split("T")[0]}/${item.date.split("-")[1]}/${item.date.split("-")[0]}</div>` );    
        div_itemfull.toggleClass( "is-active" );              
}

function create_matches(key) {
    let matches;
    ul_matches.empty();
    let regexp = new RegExp(`${key}`,"i");
    if (inp_search_loc.val()) {
        if (matches = all_locs.filter(e=>e.search(regexp)!=-1?1:0)) {
        matches.forEach(e=>ul_matches.append(`<li><a href="javascript:void(0)">${e}</a></li>`));
        }
    }    
}

connect_to_api(url+"show", "GET").then(e=>create_items(e,"default"));

div_items.on("click",e=>{
    if(e.target.className==="readmore") 
        connect_to_api(url+"show/"+e.target.dataset.id, "GET").then(create_itemfull);    
});

div_top5.on("click",e=>{
    if(e.target.className==="search_locs") 
        connect_to_api(url+"search/loc/"+e.target.dataset.loc, "GET").then(e=>create_items(e,"search"));        
});

btn_search_submit.on("click",()=>{
    if (inp_search.val()) {
        connect_to_api(url+"search/"+inp_search.val(), "GET").then(e=>create_items(e,"search"));
    }
})



form.on("submit",e=>{
   
    e.preventDefault();
    let root = e.target;

    if (root.title.value && root.description.value && root.name.value && root.loc.value && root.price.value && root.email.value) {

            let data = {title:root.title.value,
                        description:root.description.value,
                        name:root.name.value,
                        loc:root.loc.value,
                        price:root.price.value,
                        vb:(root.vb.checked == true)?1:0,
                        email:root.email.value};

            connect_to_api(url+"add", "POST", JSON.stringify(data)).then(()=>{
                connect_to_api(url+"show", "GET").then(e=>create_items(e,"default"));
                form.trigger("reset");
            });
              
        

    }
})

btn_close_itemfull.on("click",  function(){div_itemfull.toggleClass( "is-active" )});
btn_new_entry.on("click",  function(){div_entry.toggleClass( "is-active" )});
btn_close_entry.on("click",  function(){div_entry.toggleClass( "is-active" )});
inp_search_loc.on("keyup",function(){create_matches(this.value)});
ul_matches.on("click",e=>{
    if(e.target.tagName==="A"){
        inp_search_loc.val(e.target.text);
        ul_matches.empty();
        connect_to_api(url+"search/loc/"+e.target.text, "GET").then(e=>create_items(e,"search"));        
    }    
});
inp_search_loc.on("click",()=>inp_search_loc.val(""));