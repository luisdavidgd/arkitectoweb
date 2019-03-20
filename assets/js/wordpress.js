$.ajax({
    url: 'https://blog.arkitectoweb.com/wp-json/wp/v2/posts/?_embed',
    dataType: "json",
    success: function (data) {
        console.log(data);
        var items = [];
        $.each(data, function (i, item) {
            items.push("<div class='col-md-4'><div class='blog'><div class='blog-img'><img class='img-responsive' src='"+item._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url+"' alt=''></div><div class='blog-content'><ul class='blog-meta'><li><i class='fa fa-user'></i>"+item._embedded.author[0].name+"</li><li><i class='fa fa-clock-o'></i>"+item.date+"</li><li><i class='fa fa-comments'></i>57</li></ul><h3>" + item.title.rendered + "</h3>" + item.content.rendered + "<a href='"+item.link+"'>Read more</a></div></div></div>");
        });

        $("<ul/>", {
            class: "my-new-list",
            html: items.join("")
        }).appendTo("#posts");  
    }
});