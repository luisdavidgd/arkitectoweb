// Assign handlers immediately after making the request,
// and remember the jqxhr object for this request
var posts = $.getJSON('https://blog.arkitectoweb.com/wp-json/wp/v2/posts/?per_page=3', function () {
    console.log("post success");
})
    .done(function (data) {
        console.log(data);
        var items = [];
        $.each(data, function (i, item) {
            var authorsJSON = item._links.author[0].href;
            // Assign handlers immediately after making the request,
            // and remember the jqxhr object for this request
            var authors = $.getJSON(authorsJSON, function () {
                console.log("author success");
            })
                .done(function () {
                    console.log("author second success");
                })
                .fail(function () {
                    console.log("author error");
                })
                .always(function () {
                    console.log("author complete");
                });

            // Perform other work here ...

            // Set another completion function for the request above
            authors.complete(function () {
                console.log("author second complete");
                //items.push("<div class='col-md-4'><div class='blog'><div class='blog-img'><img class='img-responsive' src='"+item._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url+"' alt=''></div><div class='blog-content'><ul class='blog-meta'><li><i class='fa fa-user'></i>"+item._embedded.author[0].name+"</li><li><i class='fa fa-clock-o'></i>"+item.date+"</li><li><i class='fa fa-comments'></i>57</li></ul><h3>" + item.title.rendered + "</h3>" + item.content.rendered + "<a href='"+item.link+"'>Read more</a></div></div></div>");
                items.push("<div class='col-md-4'><div class='blog'><div class='blog-img'><img class='img-responsive' src='#' alt=''></div><div class='blog-content'><ul class='blog-meta'><li><i class='fa fa-user'></i>" + item.author + "</li><li><i class='fa fa-clock-o'></i>" + item.date + "</li><li><i class='fa fa-comments'></i>57</li></ul><h3>" + item.title.rendered + "</h3>" + item.excerpt.rendered + "<a href='" + item.link + "'>Read more</a></div></div></div>");
            });

        });

        $("<ul/>", {
            class: "my-new-list",
            html: items.join("")
        }).appendTo("#posts");
    })
    .fail(function () {
        console.log("post error");
    })
    .always(function () {
        console.log("post complete");
    });

// Perform other work here ...

// Set another completion function for the request above
posts.complete(function () {
    console.log("post second complete");
    //items.push("<div class='col-md-4'><div class='blog'><div class='blog-img'><img class='img-responsive' src='"+item._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url+"' alt=''></div><div class='blog-content'><ul class='blog-meta'><li><i class='fa fa-user'></i>"+item._embedded.author[0].name+"</li><li><i class='fa fa-clock-o'></i>"+item.date+"</li><li><i class='fa fa-comments'></i>57</li></ul><h3>" + item.title.rendered + "</h3>" + item.content.rendered + "<a href='"+item.link+"'>Read more</a></div></div></div>");
    //items.push("<div class='col-md-4'><div class='blog'><div class='blog-img'><img class='img-responsive' src='#' alt=''></div><div class='blog-content'><ul class='blog-meta'><li><i class='fa fa-user'></i>" + item.author + "</li><li><i class='fa fa-clock-o'></i>" + item.date + "</li><li><i class='fa fa-comments'></i>57</li></ul><h3>" + item.title.rendered + "</h3>" + item.excerpt.rendered + "<a href='" + item.link + "'>Read more</a></div></div></div>");
});
