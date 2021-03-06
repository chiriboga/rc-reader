/*
* RSS Reader Plugin for InsideAvon
* Author: Richard Chiriboga
* Modeled after FeedEk jQuery RSS/ATOM Feed Plugin (http://jquery-plugins.net/FeedEk/FeedEk.html)
*/
(function ($) {
    $.fn.FeedEk = function (opt) {
        var def = { FeedUrl: '', MaxCount: 5, ShowDesc: true, ShowPubDate: true, ListStyle: '' };
        if (opt) { $.extend(def, opt) }
        var idd = $(this).attr('id');
        if (def.FeedUrl == null || def.FeedUrl == '') {
            $('#' + idd).empty();
            return
        }
        var pubdt;
        $('#' + idd).empty().append('<div style="text-align:left; padding:3px;"><img src="/images/loading.gif" /></div>');
        $.ajax({
            url: 'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=' + def.MaxCount + '&output=json&q=' + encodeURIComponent(def.FeedUrl) + '&callback=?',
            dataType: 'json',
            success: function (data) {
                $('#' + idd).empty();
                $('#' + idd).append('<ul class="' + def.ListStyle + '" />');
                var new_list = $('#' + idd + ' ul');
                var HTMLmarkup = '';
                $.each(data.responseData.feed.entries, function (i, entry) {
                    HTMLmarkup += '<li>';
                    if (def.ShowPubDate) {
                        pubdt = new Date(entry.publishedDate);
                        HTMLmarkup += '<span class="rss_date">' + pubdt.toLocaleDateString() + '</span>';
                    }
                    HTMLmarkup += '<a href="' + entry.link + '" target="_blank" class="rss_title_link">' + entry.title + '</a>';
                    if (def.ShowDesc) {
                        HTMLmarkup += '<p class="rss_description">' + entry.content + '</p>';
                    }
                    HTMLmarkup += '</li>';
                })
                $(new_list).append(HTMLmarkup);
            }
        })
    }
})(jQuery);

//Use
/*
<script type="text/javascript">
$(document).ready(function(){
   $('#divRss2').FeedEk({
   FeedUrl : 'http://investor.avoncompany.com/corporate.rss?c=90402&amp;Rule=Cat=news~subcat=ALL',
   MaxCount : 5,
   ShowDesc : false,
   ShowPubDate: true,
   ListStyle: 'rss_reader_list' // CSS Class for the UL
  });
});
</script>
*/
