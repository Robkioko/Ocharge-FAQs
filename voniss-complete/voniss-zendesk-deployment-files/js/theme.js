/*
  Template Name: Voniss
  Version: v2.1
  Author: Allies Interactive
  Website: http://www.diziana.com/
  Corporate Website : http://www.diziana.com
  Contact: support@diziana.com
  Follow: https://www.twitter.com/diziana.com
  Like: https://www.facebook.com/diziana.engage
  Purchase: Diziana.com
  License: You must have a valid license purchased only from
  diziana.com in order to legally use the theme for your project.
  Copyright: © 2016 Allies Interactive Services Pvt. Ltd. All Rights Reserved
*/

$(function() {
    $(".dropdown-menu li a").click(function() {
        $(this).parents(".btn-group").find('.selector').text($(this).text());
        $(this).parents(".btn-group").find('.selector').val($(this).text());
    });
    $(".track").bind("touchstart", function(event) {
        // alert(event.touches.length);
    });
});

/* Section Tree With Article In Accordion Format */
(function(_w, _d, $) {

    'use strict';

    $(_d).ready(function() {

        var groupPanel = $('.category-section-list .panel-group');
        var _contents = $('.section-tree-with-article > ul > li');
        var finalContent = '';
        var _template = '<div><div class="panel panel-default"><div class="panel-heading"><h5 class="panel-title">';
        _template += '<a data-toggle="collapse" data-parent="#' + groupPanel.attr('id') + '" href="#article-INDEX" class="collapsed">';
        _template += '<span class="heading"></span><i class="indicator glyphicon glyphicon-plus"></i></a></h5></div>';
        _template += '<div id="article-INDEX" class="panel-collapse collapse">';
        _template += '<div class="panel-body"></div></div></div>';

        _contents.each(function(_index, _item) {
            var _liEle = $(_item);
            var _templateClone = $(_template).clone();

            _templateClone.find('.panel-title .heading').html(_liEle.find('h2').html());
            _templateClone.find('.panel-title a.collapsed').attr('href', '#article-' + _index);
            _templateClone.find('.panel-heading + .panel-collapse.collapse').attr('id', 'article-' + _index);
            _templateClone.find('.panel-body').append(_liEle.find('ul'));

            finalContent += _templateClone.html();
        });

        groupPanel.html(finalContent);

        $('.collapse').on('shown.bs.collapse', function() {
            $(this).parent().find(".glyphicon-plus").removeClass("glyphicon-plus").addClass("glyphicon-minus");
        }).on('hidden.bs.collapse', function() {
            $(this).parent().find(".glyphicon-minus").removeClass("glyphicon-minus").addClass("glyphicon-plus");
        });

        $('body').addClass('hc_body');

        $('a.login, .article-subscribe-btn > a, .request-form input[type=submit], .support-product input[type=submit], .topic-subscribe > a, .topic-unsubscribe, .community-post-page input[type=submit] ').addClass('btn');
        $('.article-subscribe-btn > a ').addClass('pull-right');

        /* Show Placeholder name */
        $('#query').attr('placeholder', 'Product name or model number');

        /* Show active tab for Contribution Page, Following Page, Result List Page, ETC */

        $('.my-activities-nav.nav-bordered li').each(function(id, it) {
            if (typeof $(it).find('a').get(0) == 'undefined') {
                $(it).addClass('active');
            }
        });

        $('.my-activities-sub-nav.nav-spaced li').each(function(id, it) {
            if (typeof $(it).find('a').get(0) == 'undefined') {
                $(it).addClass('active');
            }
        });

        var x = new Date();
        var y = x.getFullYear();
        $('#year').html(y);

    });


}(window, document, jQuery));

$(document).ready(function() {
    /* -------------------------------------------------------- 
    Promoted Artciles Accordian 
    ----------------------------------------------------------- */
    if ($('.accordion-wrapper').get(0) != 'undefined') {
        var _accordionActor = $('.accordion-wrapper .promoted-articles > ul > li > a');
        _accordionActor.after('<article class="article-body collapse" style="display: none;"><p class="loading-info">Loading...</p></article>');
        //_accordionActor.addClass('plus-icon'); 
        _accordionActor.on('click', function(e) {
            e.preventDefault();
            var _self = $(this);
            var _info = this.href.split('/articles/');
            var _name = _info[1].split('-');
            var _id = _name[0];

            _self.next('.article-body').slideToggle(250);
            _self.toggleClass('open');
            if (_self.hasClass("open")) {
                _self.removeClass('plus-icon').addClass('minus-icon');
            } else {
                _self.addClass('plus-icon').removeClass('minus-icon');
            }

            // Stop to send again and agin ajax request to load content 
            if (typeof _self.next('.article-body').find('.loading-info').get(0) == 'undefined') {
                return '';
            }

            $.ajax({
                url: '/api/v2/help_center/articles/' + _id + '.json',
                type: 'GET',
                dataType: 'json',
                /*'beforeSend': function(xhr) { 
                xhr.setRequestHeader("Authorization","Basic "+_self.settings.apiToken); 
                }, */
                success: function(result) {
                    var _article = result.article;
                    var _body = $('<div>').append(_article.body);

                    if (typeof _body.find('.article-body').get(0) != 'undefined') {
                        _self.next('.article-body').html(_body.find('.article-body').html() + '<div><a class="read-more-article-link btn" href="' + _self.attr('href') + '">View Page</a></div>');
                    } else if (typeof $(_body.find('p')).get(0) != 'undefined') {
                        _self.next('.article-body').html($(_body.find('p')[0]).html() + '<div><a class="read-more-article-link btn" href="' + _self.attr('href') + '">View Page</a></div>');
                    } else {
                        _self.next('.article-body').html('<div><a class="read-more-article-link btn" href="' + _self.attr('href') + '">View Page</a></div>');
                    }
                },
                error: function() {
                    console.log('failure');
                }
            });
        });

    } // accordion if end (Promoted Articles) 

});

$(document).ready(function() {

    // social share popups
    $(".share a").click(function(e) {
        e.preventDefault();
        window.open(this.href, "", "height = 500, width = 500");
    });

    // toggle the share dropdown in communities
    $(".share-label").on("click", function(e) {
        e.stopPropagation();
        var isSelected = this.getAttribute("aria-selected") == "true";
        this.setAttribute("aria-selected", !isSelected);
        $(".share-label").not(this).attr("aria-selected", "false");
    });

    $(document).on("click", function() {
        $(".share-label").attr("aria-selected", "false");
    });

    // show form controls when the textarea receives focus or backbutton is used and value exists
    var $answerbodyTextarea = $(".answer-body textarea"),
        $answerFormControls = $(".answer-form-controls"),
        $commentContainerTextarea = $(".comment-container textarea"),
        $commentContainerFormControls = $(".comment-form-controls");

    $answerbodyTextarea.one("focus", function() {
        $answerFormControls.show();
    });

    $commentContainerTextarea.one("focus", function() {
        $commentContainerFormControls.show();
    });

    if ($commentContainerTextarea.val() !== "") {
        $commentContainerFormControls.show();
    }

    if ($answerbodyTextarea.val() !== "") {
        $answerFormControls.show();
    }

    // Submit requests filter form in the request list page
    $("#request-status-select, #request-organization-select")
        .on("change", function() {
            search();
        });

    // Submit requests filter form in the request list page
    $("#quick-search").on("keypress", function(e) {
        if (e.which === 13) {
            search();
        }
    });

    function search() {
        window.location.search = $.param({
            query: $("#quick-search").val(),
            status: $("#request-status-select").val(),
            organization_id: $("#request-organization-select").val()
        });
    }

    // Submit organization form in the request page
    $("#request-organization select").on("change", function() {
        this.form.submit();
    });

    // Function to list categories in all templates

    var _src = 'YOUR_ASSETS_PATH';

    // get id and template name
    var _location = window.location.href.split('/');
    if (_location.length > 5) {
        var _templatename = _location[5];
        var _templateid = _location[6].split('-')[0];
    }

    var categoriesList = function(_categories) {
        if (typeof HelpCenter.user.locale == 'undefined') {
            HelpCenter.user.locale = window.location.pathname.replace('/', '').replace('?', '/').split('/')[1];
        }

        $.ajax({
            url: '/api/v2/help_center/' + HelpCenter.user.locale + '/categories.json',
            type: 'GET',
            dataType: 'json',
            success: _categories
        });
    };

    var _list = '';

    categoriesList(function(data) {
        $(data.categories).each(function(idx, itm) {
            _list = _list + '<li><a href="' + itm.html_url + '" id="' + itm.id + '"><article class="text-center"><div class="category_icon"><img src="' + _src + itm.id + '.png?v=' + (new Date().getTime()) + '" class="cat-image ' + itm.id + '"/></div><h4>' + itm.name + '</h4><p class="description">' + itm.description + '</p></article></a></li>'
        });
        $('.hc-category-list').html(_list);
        $('.hc-category-list a#' + _templateid).addClass('active');

        if (_templatename == 'sections' || _templatename == 'articles') {
            var categoryid = $('.breadcrumbs > li:nth-child(2) > a').attr('href').split('/categories/')[1].split('-')[0];
            $('.hc-category-list a#' + categoryid).addClass('active');
        }

    });

    // function to list categories in all templates ends here

});