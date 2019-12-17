'use strict'
function Image(image_url, title, description, keyword, horns) {
    this.image_url = image_url;
    this.title = title;
    this.description = description;
    this.keyword = keyword;
    this.horns = horns;

}
let keywords = [];

Image.prototype.render = function () {
    let templateId = '#showtemplate';
    let template = $(templateId).html();
    let templateRender = Handlebars.compile(template);
    let showType = templateRender(this);
    $('#photo-template').append(showType);
    // let showType = $(`
    // <li>
    //   <h2></h2>
    //   <img/>
    //   <p></p>
    // </li>
    // `).clone();
    // showType.find('h2').text(this.title);
    // showType.find('img').attr('src', this.image_url);
    // showType.find('p').text(this.description);
    // showType.addClass(this.keyword);
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
// function data() {

// }
$.get('data/page-1.json')
    .then(data => {
        data.forEach(element => {
            let newImage = new Image(element.image_url, element.title, element.description, element.keyword, element.horns);
            newImage.filterKeword();
            newImage.render();
        });
    });




