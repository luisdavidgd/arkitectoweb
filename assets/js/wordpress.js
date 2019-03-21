var posts = [];
get_latest_posts();

function get_latest_posts() {
    $.ajax({
        url: 'https://blog.arkitectoweb.com/wp-json/wp/v2/posts/?_embed&per_page=3',
        dataType: "json",
        success: function (data) {
            $.each(data, function (i, item) {
                var image = 'assets/img/blog' + (i + 1) + '.jpg'; // default image
                if (item._embedded.hasOwnProperty('wp:featuredmedia')) { // if exists
                    image = item._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url;
                }
                var author = item._embedded.author[0].name;
                var unformat_date = item.date;
                var date = formatDate(new Date(unformat_date)); // format date
                var comments = 0;
                if (item._embedded.hasOwnProperty('replies')) { // if exists
                    comments = item._embedded.replies.length;
                }
                var title = item.title.rendered;
                var excerpt = item.excerpt.rendered;
                var link = item.link;

                post = {};

                post['image'] = image;
                post['author'] = author;
                post['date'] = date;
                post['comments'] = comments;
                post['title'] = title;
                post['excerpt'] = excerpt;
                post['link'] = link;

                posts.push(post);
            });
        }
    }).done(function () {
        $.each(posts, function (i, item) {
            $('#post-' + i + ' .post-author').html(item.author);
            $('#post-' + i + ' .post-title').html(item.title);
            $('#post-' + i + ' .post-link').attr("href", item.link);
            $('#post-' + i + ' .post-link').attr("target", '_blank');
            $('#post-' + i + ' .post-img').attr("src", item.image);
            $('#post-' + i + ' .post-excerpt').html(item.excerpt);
            $('#post-' + i + ' .post-comments').html(item.comments);
            $('#post-' + i + ' .post-date').html(item.date);
        });
    }).fail(function () {
        console.log('fail');
    });;
}


function formatDate(date) {
    var monthNames = [
        "Enero", "Febrero", "Marzo",
        "Abril", "Mayo", "Junio", "Julio",
        "Agosto", "Setiembre", "Octubre",
        "Noviembre", "Diciembre"
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    //return day + ' de ' + monthNames[monthIndex] + ' de ' + year;
    return monthNames[monthIndex] + ' ' + day + ', ' + year;
}