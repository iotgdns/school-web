$(document).ready(function () {
    $.ajax({
      url: 'https://us-central1-gdns-web.cloudfunctions.net/init_data',
      data: {"key":1234},
      type: 'POST',
      crossDomain: true,
      dataType: 'json',
      success: function(result) {
            let init = result.init;
            Object.keys(init.main).forEach(function(key) {
                $('.' + key).html(init.main[key]);
            });
            Object.keys(init.about).forEach(function(key) {
                $('.' + key).html(init.about[key]);
            });

            let news = result.news;
            news.forEach(ne => {
                $('#newss').append(news_card(ne))
            });
      },
      error: function() {
          alert('Something went wrong!');
      }
  });
});

function news_card(n) {
    return `
<div class="col-md-6 col-lg-4 wow bounceInUp" data-wow-duration="1.4s">
    <div class="box">
        <div class="icon" style="background: `+ n.theme.bgc +`;"><i class="fa fa-`+ n.theme.icon +`" style="color: #`+ n.theme.icoc +`;"></i></div>
        <h4 class="title"><a href="">`+ n.title +`</a></h4>
        <p class="description text-justify">`+ n.content +`</p>
    </div>
</div>`;
}
