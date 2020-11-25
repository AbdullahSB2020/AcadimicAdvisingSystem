
    
function formatPosts(posts){
    let postArray = [];
    posts.forEach((post) => {

        let postDate = Date.parse(post.date);
        let date = new Date(postDate);
        let d = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}, ${date.getHours()}:${date.getMinutes()}`
        // here I couldn't change the post object, so I came with this way
        let postObj = {
            date: d,
            _id: post._id,
            title: post.title
        }
        postArray.push(postObj);
    })

    return postArray ;
}

module.exports = formatPosts;