
    var bannerCount = $("#index-banner .swiper-container .carousel-inner .swiper-slide").length;
    if (bannerCount > 0) {
        for (var i = 0; i < bannerCount; i++) {
            if (i == 0) {
                $("#index-banner .swiper-container ol.carousel-indicators").append('<li data-target="#index-banner" data-slide-to="0" class="active"></li>');
                $("#index-banner .swiper-container .carousel-inner .swiper-slide").eq(0).addClass("swiper-slide item active");
            } else {
                $("#index-banner .swiper-container ol.carousel-indicators").append('<li data-target="#index-banner" data-slide-to="' + i + '";></li>');
            }
        }
    }
    
    /*卡片个性化*/
    $(function () {
        var baners = $(".hw1_multi_img");
        if (baners.length > 0) {
            for (var i = 0; i < baners.length; i++) {
                var DataSourceID = $(baners).eq(i).find("#hideDataSourceID").val();
                var queryUrl = $(baners).eq(i).find("#hideTargetUrl").val();
                var viewModel = $(baners).eq(i).find("#hideViewModel").val();
                var huaweiName = $(baners).eq(i).find("#hideHuaweiName").val();
                var huaweiValue = $(baners).eq(i).find("#hideHuaweiValue").val();
                var targetIdValue = $(baners).eq(i).find("#hideTargetId").val();
                if (queryUrl != null && queryUrl != "" && viewModel.toLowerCase() == "false") {
                    Huawei.Personalization.getPersonalize($(baners).eq(i), DataSourceID, huaweiName, huaweiValue, queryUrl, targetIdValue);
                }
                else {
                    $(baners).eq(i).find("section").removeClass("hw1_loading");
                    $(baners).eq(i).find("section").find("div").removeClass("spinner");
                    $(baners).eq(i).find(".hw1_img").attr("style", "display:block;");
                    $(baners).eq(i).find(".hw1_img_subinfo").attr("style", "display:block;");
                    $(baners).eq(i).attr("style", "display:block;");
                }
            }
        }
    });
    
    /*首页banner个性化*/
    $(function () {
        var baners = $(".swiper-slide.item");
        if (baners.length > 0) {
            for (var i = 0; i < baners.length; i++) {
                var queryUrl = $(baners).eq(i).find("#hideTargetUrl").val();
                var viewModel = $(baners).eq(i).find("#hideViewModel").val();
                if (queryUrl != null && queryUrl != "" && viewModel.toLowerCase() == "false") {
                    $($(baners).eq(i)).attr("chid", i);
                    showloading($(baners).eq(i));                    
                }
            }
            //huawei.eventBinding();
            $(window).trigger("resize");
            for (var i = 0; i < baners.length; i++) {
                var DataSource = $(baners).eq(i).find("#hideDataSourceID").val();
                var queryUrl = $(baners).eq(i).find("#hideTargetUrl").val();
                var huaweiName = $(baners).eq(i).find("#hideHuaweiName").val();
                var viewModel = $(baners).eq(i).find("#hideViewModel").val();
                var huaweiValue = $(baners).eq(i).find("#hideHuaweiValue").val();
                var targetIdValue = $(baners).eq(i).find("#hideTargetId").val();
                if (queryUrl != null && queryUrl != "" && viewModel.toLowerCase() == "false") {
                    ajaxload($(baners).eq(i), DataSource, huaweiName, huaweiValue, queryUrl, targetIdValue, i, true);
                }
            }
        }

        var banersNew = $(".hw1_banner");
        if (banersNew.length > 0) {
            for (var i = 0; i < banersNew.length; i++) {
                var queryUrl = $(banersNew).eq(i).find("#hideTargetUrl").val();
                var viewModel = $(banersNew).eq(i).find("#hideViewModel").val();
                if (queryUrl != null && queryUrl != "" && viewModel.toLowerCase() == "false") {
                    showloadingNew($(banersNew).eq(i));
                }
            }
            $(window).trigger("resize");
            for (var i = 0; i < banersNew.length; i++) {
                var DataSource = $(banersNew).eq(i).find("#hideDataSourceID").val();
                var queryUrl = $(banersNew).eq(i).find("#hideTargetUrl").val();
                var viewModel = $(banersNew).eq(i).find("#hideViewModel").val();
                var huaweiName = $(banersNew).eq(i).find("#hideHuaweiName").val();
                var huaweiValue = $(banersNew).eq(i).find("#hideHuaweiValue").val();
                var targetIdValue = $(banersNew).eq(i).find("#hideTargetId").val();
                if (queryUrl != null && queryUrl != "" && viewModel.toLowerCase() == "false") {
                    ajaxload($(banersNew).eq(i), DataSource, huaweiName, huaweiValue, queryUrl, targetIdValue, i, false);
                }
            }
        }
    });
   
   
    function ajaxload(objHTML, objHfDatasource, huaweiName, huaweiValue, queryUrl, targetId, num, flag) {
        //var SC_Model = $(objHTML).find("#hideViewModel").val();
        //if (SC_Model == "True") {
        //$(objHTML).attr("chid", num);
        //showloading(objHTML);
            $.ajax({
                async: true,
                //防止缓存，URL加上变量参数
                url: queryUrl,
                type: 'get',
                headers: {},
                beforeSend: function (request) {
                    
                    request.setRequestHeader("X-HUAWEI-ItemId", targetId);
                    var login_userTag = $.cookie("per_loginuser");
                    if (login_userTag) {
                        request.setRequestHeader("X-HUAWEI-LoginUser", login_userTag);
                    }

                    if (document.referrer) {
                        request.setRequestHeader("X-HUAWEI-RS", document.referrer);
                    }

                    var name = JSON.parse(huaweiName);
                    var value = JSON.parse(huaweiValue);
                    var huaweilength = JSON.parse(huaweiName).length;
                    for (var i = 0; i < huaweilength; i++) {
                        var nameStr = decodeURIComponent(decodeURIComponent(name[i]));
                        var valueStr = value[i];
                        if (nameStr == "X-HUAWEI-RS") {
                            valueStr = encodeURIComponent(decodeURIComponent(decodeURIComponent(valueStr)));
                        } else {
                            valueStr = decodeURIComponent(decodeURIComponent(valueStr));
                        }

                        request.setRequestHeader(decodeURIComponent(decodeURIComponent(name[i])), valueStr);
                    }
                    if (Huawei.Personalization.AjaxFlag < 1) {
                        Huawei.Personalization.AjaxFlag = 1;
                    }
                },
                success: function (data, status, xhr) {
                    if (flag) {
                        if (xhr.getResponseHeader("DataSourceID") != undefined && xhr.getResponseHeader("DataSourceID") != "") {
                            if (xhr.getResponseHeader("DataSourceID").toLowerCase() != objHfDatasource.toLowerCase()) {
                                //$(objHTML).html(data);                           
                                $(objHTML).children().remove();
                                $(objHTML).attr("data-big-img", $(data).attr("data-big-img"));
                                $(objHTML).attr("data-small-img", $(data).attr("data-small-img"));
                                $(objHTML).append($(data).children());
                                //huawei.eventBinding();
                                $(window).trigger("resize");
                                $(objHTML).find(".carousel-caption").css({ 'display': 'block' });
                                hideloading1(objHTML);
                            }
                            else {
                                hideloading2(objHTML);
                            }
                        } else {
                            hideloading2(objHTML);
                            if ($.trim(data) == "") {
                                $(objHTML).remove();
                                $(".carousel-indicators span.swiper-pagination-switch").eq(num).remove();
                                return;
                            }
                        }
                    } else {
                        if (xhr.getResponseHeader("DataSourceID") != undefined && xhr.getResponseHeader("DataSourceID") != "") {
                            if (xhr.getResponseHeader("DataSourceID").toLowerCase() != objHfDatasource.toLowerCase()) {                          
                                $(objHTML).children().remove();
                                $(objHTML).append($(data).children());
                                $(window).trigger("resize");
                                hideloadingNew1(objHTML);
                            }
                            else {
                                hideloadingNew2(objHTML);
                            }
                        } else {
                            hideloadingNew2(objHTML);
                            if ($.trim(data) == "") {
                                $(objHTML).remove();
                                return;
                            }
                        }
                    }
                    //hideloading(objHTML);
                    if (Huawei.Personalization.AjaxFlag === 1) {
                        Huawei.Personalization.AjaxFlag = 2;
                        if (typeof (scSendPersonalizationFlag) != "undefined") {
                            scSendPersonalizationFlag("success", "");
                        }
                    }
                },
                error: function (data, status, xhr) {
                    if (flag) {
                        hideloading2(objHTML);
                    } else {
                        hideloadingNew2(objHTML);
                    }
                    if (Huawei.Personalization.AjaxFlag === 1) {
                        Huawei.Personalization.AjaxFlag = 2;
                        if (typeof (scSendPersonalizationFlag) != "undefined") {
                            scSendPersonalizationFlag("error", "");
                        }
                    }
                }
            });
        //}
    }

    function sleep() {
        var t1 = new Date();
        var t2=new Date();
        while ((t2 - t1) < 10000) {
            t2 = new Date();
        }
    }

    var childlist = new Array();
    function showloading(objHTML) {
        var count = childlist.length;
        childlist[count] = new Object();
        childlist[count].chid = $(objHTML).attr("chid");
        childlist[count].content = $(objHTML).children();
        childlist[count].bigimg = $(objHTML).attr("data-big-img");
        childlist[count].smimg = $(objHTML).attr("data-small-img");
        $(objHTML).children().not("[type='hidden']").remove();
        $(objHTML).attr("data-big-img", "Assets/CBG/img/huawei_loading.gif");
        $(objHTML).attr("data-small-img", "Assets/CBG/img/huawei_loading.gif");
        //$(objHTML).css("background-image", "url('/Assets/CBG/img/loading-bg.png')");        
        $(objHTML).css("background-image", "url('/Assets/CBG/img/huawei_loading.gif')");
        //$(objHTML).addClass("loading-bg");
        $(objHTML).css("background-color", "#eee");
        //$(objHTML).append("<div class='loading-icon'></div>");
        //huawei.eventBinding();
        $(window).trigger("resize");
        
        
    }
 
    function hideloading1(objHTML) {
        $(objHTML).css("background-color", "");
    }
    function hideloading2(objHTML) {
        $(objHTML).css("background-color", "");
        for (var i = 0; i < childlist.length; i++) {
            if (childlist[i].chid == $(objHTML).attr("chid")) {
                $(objHTML).attr("data-big-img", childlist[i].bigimg);
                $(objHTML).attr("data-small-img",childlist[i].smimg);
                $(objHTML).children().remove();
                $(objHTML).append(childlist[i].content);
                //huawei.eventBinding();
                $(window).trigger("resize");
                $(objHTML).find(".carousel-caption").css({ 'display': 'block' });
                return;
            }
        }
    }


    var childnew = new Object();
    function showloadingNew(objHTML) {
        childnew.content = $(objHTML).children();
        $(window).trigger("resize");
    }

    function hideloadingNew1(objHTML) {
        $(objHTML).find("section").removeClass("hw1_loading");
        $(objHTML).find("section").find("div").removeClass("spinner");
        $(objHTML).find("#hw1_content").show();
        $(objHTML).find("#hw1_front").show();
    }
    function hideloadingNew2(objHTML) {
        $(objHTML).children().remove();
        $(objHTML).append(childnew.content);
        $(objHTML).find("section").removeClass("hw1_loading");
        $(objHTML).find("section").find("div").removeClass("spinner");
        $(objHTML).find("#hw1_content").show();
        $(objHTML).find("#hw1_front").show();
        $(window).trigger("resize");
    }
