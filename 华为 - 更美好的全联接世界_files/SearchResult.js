function Usearch(obj) {
    var btn = $(obj);
    var keyword = encodeURIComponent(btn.prev().val());
    var language = $("#currentLanguage").val();
    if (language == "zh") language = "cn";
    
    if ($("#psirtId").val() != undefined && $("#psirtId").val() == "psirtId") {
        if (language == "cn") {
            //window.open("http://www.huawei.com/cn/search/#permissionSwitch=false&resType=psirt&searchType=ST-BULLETINS&searchString=" + keyword);
            var url = "http://www.huawei.com/cn/search/#permissionSwitch=false&resType=psirt&searchType=ST-BULLETINS&searchString=" + keyword;
            $("#linkUrl").attr("href", url);
            $("#forward").click();
        } else if (language == "en") {
            //window.open("http://www.huawei.com/en/search/#permissionSwitch=false&resType=psirt&searchType=ST-BULLETINS&searchString=" + keyword);
            var url = "http://www.huawei.com/en/search/#permissionSwitch=false&resType=psirt&searchType=ST-BULLETINS&searchString=" + keyword;
            $("#linkUrl").attr("href", url);
            $("#forward").click();
        } else {
            //window.open($("#SearchUrl").val() + "?keywords=" + keyword + "&contentTypes=" + "{9704BDD0-A1CF-4706-BDFC-210721E028F2}");
            var url = $("#SearchUrl").val() + "?keywords=" + keyword + "&contentTypes=" + "{9704BDD0-A1CF-4706-BDFC-210721E028F2}";
            $("#linkUrl").attr("href", url);
            $("#forward").click();
        }
        //Huawei.Personalization.CalculateTagByKeyWords(keyword);
    }
    else {
        redirectUrl(keyword, language);
    }
}
function Usearchs(obj) {
    var btn = $(obj);
    var keyword = encodeURIComponent(btn.val());
    var language = $("#currentLanguage").val();
    if (language == "zh") language = "cn";
     if ($("#psirtId").val() != undefined && $("#psirtId").val() == "psirtId") {
        if (language == "cn") {
            //window.open("http://www.huawei.com/cn/search/#permissionSwitch=false&resType=psirt&searchType=ST-BULLETINS&searchString=" + keyword);
            var url = "http://www.huawei.com/cn/search/#permissionSwitch=false&resType=psirt&searchType=ST-BULLETINS&searchString=" + keyword;
            $("#linkUrl").attr("href", url);
            $("#forward").click();
        } else if (language == "en") {
            //window.open("http://www.huawei.com/en/search/#permissionSwitch=false&resType=psirt&searchType=ST-BULLETINS&searchString=" + keyword);
            var url = "http://www.huawei.com/en/search/#permissionSwitch=false&resType=psirt&searchType=ST-BULLETINS&searchString=" + keyword;
            $("#linkUrl").attr("href", url);
            $("#forward").click();
        } else {
            //window.open($("#SearchUrl").val() + "?keywords=" + keyword + "&contentTypes=" + "{9704BDD0-A1CF-4706-BDFC-210721E028F2}");
            var url = $("#SearchUrl").val() + "?keywords=" + keyword + "&contentTypes=" + "{9704BDD0-A1CF-4706-BDFC-210721E028F2}";
            $("#linkUrl").attr("href", url);
            $("#forward").click();
        }
    }
    else {
        redirectUrl(keyword, language);
    }
}
function UsearchMobile() {
    var warn = "Please type a keyword for your search";
    var KeyText = $('#search-box-h-mobile').attr("value");
    var language = $("#currentLanguage").val();
    if (language == "zh") language = "cn";
    if (KeyText == "") {
        alert(warn);
        return false;
    } else {
        if (KeyText.indexOf("@") > 0) {
            KeyText = KeyText.replace("@", "%40");
        }
        redirectUrl(encodeURIComponent(encodeURIComponent(KeyText)), language);
    }
}

function redirectUrl(keyword, language)
{
    if (language == "cn") {
        //window.open("http://www.huawei.com/cn/search/?lang=zh#currentPage=1&resLang=zh&searchType=www_all&searchString=" + keyword);
        var url = "http://www.huawei.com/cn/search/?lang=zh#currentPage=1&resLang=zh&searchType=www_all&searchString=" + keyword;
        $("#linkUrl").attr("href", url);
        $("#forward").click();
    } else if (language == "en") {
        //window.open("http://www.huawei.com/en/search/?lang=en#currentPage=1&resLang=en&searchType=www_all&searchString=" + keyword);
        var url = "http://www.huawei.com/en/search/?lang=en#currentPage=1&resLang=en&searchType=www_all&searchString=" + keyword;
        $("#linkUrl").attr("href", url);
        $("#forward").click();
    } else {
        var url = $("#SearchUrl").val() + "?keywords=" + keyword;
        $("#linkUrl").attr("href", url);
        $("#forward").click();
    }
    //Huawei.Personalization.CalculateTagByKeyWords(keyword);
}