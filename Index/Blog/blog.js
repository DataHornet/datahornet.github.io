function createPostHTML(postTitle, postAuthor, postContent){
    var blogPost = document.createElement("a");
    $(blogPost).addClass("list-group-item");

    var title = document.createElement("h4");
    $(title).addClass("list-group-item-heading")
    $(title).html(postTitle);

    var caption = document.createElement("span");
    $(caption).addClass("blog-caption");
    
    var by = document.createElement("span");
    $(by).addClass("text-muted")
    $(by).html(" by ")

    var author = document.createElement("span");
    $(author).addClass("text-primary")
    $(author).html(postAuthor)
    
    $(caption).append(by)
    $(caption).append(author)

    $(title).append(caption);

    var body = document.createElement("p");
    $(body).addClass("list-group-item-text");
    $(body).html( postContent );

    $(blogPost).append(title);
    $(blogPost).append(body);

    $("#blog-posts").append(blogPost);
    
    var blogPostID = $(blogPost).uniqueId().attr("id");

    var $sidebar = $("#blog-sidebar-selection");

    var selection = document.createElement("li");
    var link = document.createElement("a");
    $(link).attr("data-post", "#" + blogPostID)
    $(link).html(postTitle);

    $(selection).append(link);
    $sidebar.append(selection);

    return $(blogPost)
}

function focusPost(post) {
    $('#blogPage').animate({
        scrollTop: $(post).offset().top - $("#coreNavBar").height() - 16
    });
}

$(document).ready(function () {
    /*REPLACE*/

    function generateRandomPost() {
        var things = ['Blah', 'Bloh', 'Bluh'];
        var authors = ['Ash Prosser', 'Tom Richardson', 'Ross Alexander'];

        var randomTitle = "";
        var n = 0;
        while (n < 3) {
            var thing = things[Math.floor(Math.random() * things.length)];
            randomTitle = randomTitle + " " + thing;
            n++;
        }

        var RandomAuthor = authors[Math.floor(Math.random() * authors.length)];

        var RandomParagraph = "";
        var n = 0;
        while (n < 1000){
            var thing = things[Math.floor(Math.random() * things.length)];
            RandomParagraph = RandomParagraph + " " + thing;
            n++;
        }

        createPostHTML(randomTitle, RandomAuthor, RandomParagraph)
    }

    var n = 0;
    while (n < 20) {
        generateRandomPost();
        n++;
    }

    $("#blog-sidebar a").on("click", function () {
        focusPost($(this).attr("data-post"))
    })
});