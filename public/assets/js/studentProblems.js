
const insert = document.getElementById('insertPost');

const apiUrl = 'http://localhost:5000/post';

window.onload = ()=> {

    let req = fetch(apiUrl,{
        method: "GET",
    })
    .then(res => {
        return res.json();
    })
    .then( res => {
        // console.log(res); // now you should send it the dom function
        toDom(res);
    })
    // console.log('this should fetch all student problems and prsent them on the dom')
}

function toDom(postsArray) { // this post array it come from the fetch
    // console.log('\n\t in the DOM \n')
    // console.log(document.getElementById('posts-template'));
    // console.log(postsArray);

    const template = document.getElementById('posts-template');
    let text = template.innerHTML;
    let compile = Handlebars.compile(text);
    let rendered = compile({ post: postsArray });
    insert.innerHTML = rendered;

}