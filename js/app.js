'use strict'

function Image(image_url, title, description, keyword, horns) {
    this.image_url = image_url;
    this.title = title;
    this.description = description;
    this.keyword = keyword;
    this.horns = horns;
Image.all.push(this);
}

let keywords = [];
Image.all=[];
Image.prototype.render = function () {
    let templateId = '#showtemplate';
    let template = $(templateId).html();
    let templateRender = Handlebars.compile(template);
    let showType = templateRender(this);
    $('#photo-template').append(showType);
   
}
Image.prototype.filterKeword = function () {
    // google ( how to check if something is already in array js)
    //2 try to find if keyword is in the array "keywords"
    //3 if not we should push (keywords will have unique keywords)
    if (!(keywords.includes(this.keyword))) {
        //4 we need to put them in the select new function
        keywords.push(this.keyword);
        // 5 loop through the keywords append to dropdown
        $("#dropdown1").append(`<option value='${this.keyword}'>` + this.keyword + '</option>');
    }
}
// Image.prototype.handlerFunction = 
$("#dropdown1").on('change', (val) => {
    let selectedVal = val.target.value;
    //console.log(selectedVal);
    if (selectedVal === 'default') {
        $('li').show();
    } else {
        // $('li').hide();
        $('li').hide();
        $(`.${selectedVal}`).fadeIn(200);
    }
});

$(document).ready(function () {
    show('data/page-1.json');
})


function show(fileName){ 
    console.log(fileName);
    Image.all=[]; // 1. Clear the array
    keywords = [];
    // Clear the filterKeyword array and the select
    $('#dropdown1').html(`<option value="default">Filter by keyword</option>`); 
    // $('#photo-template').html('<ul></ul>');
    $('#photo-template').empty();
    $.get(fileName)
    .then(data => {
       
        data.forEach(element => {
            let newImage = new Image(element.image_url, element.title, element.description, element.keyword, element.horns);
            newImage.filterKeword();
            newImage.render();
        });
    });
}

$('#page1').on('click',() => {show('data/page-1.json')});
$('#page2').on('click', () => {show('data/page-2.json')});


function sortBy(attr){
    Image.all.sort(function (a, b) {
    var attrOne= a[attr].toUpperCase();
    var attrTwo= b[attr].toUpperCase();
    if (attrOne < attrTwo) {
        return -1;
    }
    if (attrTwo < attrOne) {
        return 1;
    }
    return 0;
});
}
 
$('#sortTitle').on("click", ()=>{
    sortBy('title');
    $('#photo-template').empty();
    Image.all.forEach(element => {
        let newImage = new Image(element.image_url, element.title, element.description, element.keyword, element.horns);
        newImage.render();
    });

});