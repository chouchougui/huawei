if (typeof JSON !== "object") { JSON = {}; }
(function () {
    "use strict"; var rx_one = /^[\],:{}\s]*$/; var rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g; var rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g; var rx_four = /(?:^|:|,)(?:\s*\[)+/g; var rx_escapable = /[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g; var rx_dangerous = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g; function f(n) { return n < 10 ? "0" + n : n; }
    function this_value() { return this.valueOf(); }
    if (typeof Date.prototype.toJSON !== "function") { Date.prototype.toJSON = function () { return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null; }; Boolean.prototype.toJSON = this_value; Number.prototype.toJSON = this_value; String.prototype.toJSON = this_value; } var gap; var indent; var meta; var rep; function quote(string) { rx_escapable.lastIndex = 0; return rx_escapable.test(string) ? "\"" + string.replace(rx_escapable, function (a) { var c = meta[a]; return typeof c === "string" ? c : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4); }) + "\"" : "\"" + string + "\""; } function str(key, holder) { var i; var k; var v; var length; var mind = gap; var partial; var value = holder[key]; if (value && typeof value === "object" && typeof value.toJSON === "function") { value = value.toJSON(key); } if (typeof rep === "function") { value = rep.call(holder, key, value); } switch (typeof value) { case "string": return quote(value); case "number": return isFinite(value) ? String(value) : "null"; case "boolean": case "null": return String(value); case "object": if (!value) { return "null"; } gap += indent; partial = []; if (Object.prototype.toString.apply(value) === "[object Array]") { length = value.length; for (i = 0; i < length; i += 1) { partial[i] = str(i, value) || "null"; } v = partial.length === 0 ? "[]" : gap ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]" : "[" + partial.join(",") + "]"; gap = mind; return v; } if (rep && typeof rep === "object") { length = rep.length; for (i = 0; i < length; i += 1) { if (typeof rep[i] === "string") { k = rep[i]; v = str(k, value); if (v) { partial.push(quote(k) + (gap ? ": " : ":") + v); } } } } else { for (k in value) { if (Object.prototype.hasOwnProperty.call(value, k)) { v = str(k, value); if (v) { partial.push(quote(k) + (gap ? ": " : ":") + v); } } } } v = partial.length === 0 ? "{}" : gap ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}" : "{" + partial.join(",") + "}"; gap = mind; return v; } } if (typeof JSON.stringify !== "function") { meta = { "\b": "\\b", "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", "\"": "\\\"", "\\": "\\\\" }; JSON.stringify = function (value, replacer, space) { var i; gap = ""; indent = ""; if (typeof space === "number") { for (i = 0; i < space; i += 1) { indent += " "; } } else if (typeof space === "string") { indent = space; } rep = replacer; if (replacer && typeof replacer !== "function" && (typeof replacer !== "object" || typeof replacer.length !== "number")) { throw new Error("JSON.stringify"); } return str("", { "": value }); }; } if (typeof JSON.parse !== "function") { JSON.parse = function (text, reviver) { var j; function walk(holder, key) { var k; var v; var value = holder[key]; if (value && typeof value === "object") { for (k in value) { if (Object.prototype.hasOwnProperty.call(value, k)) { v = walk(value, k); if (v !== undefined) { value[k] = v; } else { delete value[k]; } } } } return reviver.call(holder, key, value); } text = String(text); rx_dangerous.lastIndex = 0; if (rx_dangerous.test(text)) { text = text.replace(rx_dangerous, function (a) { return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4); }); } if (rx_one.test(text.replace(rx_two, "@").replace(rx_three, "]").replace(rx_four, ""))) { j = eval("(" + text + ")"); return (typeof reviver === "function") ? walk({ "": j }, "") : j; } throw new SyntaxError("JSON.parse"); }; }
}());


jQuery.cookie = function (name, value, options) {
    if (typeof value != 'undefined') {
        options = options || {};
        if (value === null) {
            value = '';
            options = $.extend({}, options);
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString();
        }
        var path = options.path ? '; path=' + (options.path) : '';
        var domain = options.domain ? '; domain=' + (options.domain) : '';
        var secure = options.secure ? '; secure' : '';
        if (typeof (options.encode) == "undefined" || options.encode) {
            document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
        }
        else {
            document.cookie = [name, '=', value, expires, path, domain, secure].join('');
        }
    } else {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};


var Huawei = new Object();

Huawei.Personalization = {
    CookieKey: 'userTag',
    CookieSize: 5,
    AddSearchWord: true,
    AjaxFlag: 0,

    /*
     *  get cookie
     */
    GetCookie: function (c_name) {
        /*
        if (document.cookie.length == 0)
            return null;

        c_start = document.cookie.indexOf(c_name + "=")
        if (c_start == -1)
            return null;

        c_start = c_start + c_name.length + 1;
        c_end = document.cookie.indexOf(";", c_start);

        if (c_end == -1)
            c_end = document.cookie.length;
        */

        return $.cookie(c_name);
    },
    /*
     *  set cookie
     */
    SetCookie: function (c_name, value, expire_day, encode) {
        /*
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + expire_day);
        document.cookie = c_name + "=" + escape(value) + ((expire_day == null) ? "" : ";expires=" + exdate.toGMTString());
        */
        if (typeof (value) == "string" && encode) {
            value = value.replace("=", "").replace(";", "");
        }
        $.cookie(c_name, value, { expires: expire_day, path: '/', domain: 'huawei.com', encode: encode })
    },
    SetUserTagCookie: function (length, digital_data) {
        if (digital_data == null)
            return;

        var cookie_user_tag = this.GetCookie(this.CookieKey);
        var user_tag = null;
        try {
            user_tag = cookie_user_tag == null ? null : eval('(' + cookie_user_tag + ')');
        } catch (e) {
            $.cookie(this.CookieKey, null);
            return;
        }
        var new_cookie_user_tag = this.CalculateTag(digital_data, user_tag);

        if (new_cookie_user_tag != null)
            new_cookie_user_tag = this.GetTopNumberTags(length, new_cookie_user_tag);

        this.SetCookie(this.CookieKey, JSON.stringify(new_cookie_user_tag), 1, false);
    },

    CalculateTagByKeyWords: function (keywords) {
        var visitorId = $.cookie("visitorId");
        if (visitorId == null) {
            visitorId = "";
        }

        if (!Huawei.Personalization.AddSearchWord) {
            return;
        }

        Huawei.Personalization.AddSearchWord = false;

        setInterval(function () {
            Huawei.Personalization.AddSearchWord = true;
        }, 3000);

        var url = "/api/api/UpdateUserTagByKeyWords?visitorId=" + visitorId + "&keywords=" + encodeURIComponent(keywords);

        $.ajax({
            async: true,
            type: 'post',
            url: url,
            success: function (data, status, xhr) {
                if (data) {
                    if (data.Error) {
                    }
                    else {
                        var userTag = JSON.parse(data);
                        if (userTag) {
                            var digit = {};
                            digit.attributes = new Array();
                            for (var i = 0; i < userTag.length; i++) {
                                var newTag = {};
                                newTag.category = userTag[i].Category;
                                newTag.name = userTag[i].Tag;
                                newTag.score = userTag[i].Score;
                                newTag.max = userTag[i].MaxScore;
                                if (newTag.category && newTag.name && newTag.score && newTag.max)
                                    digit.attributes.push(newTag);
                            }

                            if (digit) {
                                Huawei.Personalization.SetUserTagCookie(Huawei.Personalization.CookieSize, digit);
                            }
                        }


                    }
                }
            },
            error: function (ee) {

            }
        });
    },

    GetTopNumberTags: function (number, cookie_user_tag) {
        function sort_tags(key, desc) {
            return function (a, b) {
                return desc ? ~~(a[key] < b[key]) : ~~(a[key] > b[key]);
            }
        }

        var categorys = new Array();
        for (var i in cookie_user_tag.categorys) {
            var category = cookie_user_tag.categorys[i];
            var tags_array = new Array();

            for (var j in category.tags) {

                var tag = category.tags[j];
                var obj = new Object();
                obj.tag = tag.tag;
                obj.score = parseInt(tag.score);
                tags_array.push(obj);
            }

            var top_number_tags_array = tags_array.sort(sort_tags('score', true));

            top_number_tags_array = top_number_tags_array.length > number ? top_number_tags_array.slice(0, number) : top_number_tags_array;

            var obj_category = new Object();
            obj_category.category = category.category;
            obj_category.tags = top_number_tags_array;
            categorys.push(obj_category);
        }

        cookie_user_tag.categorys = categorys;

        return cookie_user_tag;
    },

    CalculateTag: function (digital_data, cookie_user_tag) {
        var isNull = true;
        if (cookie_user_tag) {
            isNull = false;
            if (!cookie_user_tag.categorys) {
                isNull = true;
            }
        }

        if (isNull) {
            var obj = new Object();
            obj.level = null;
            obj.categorys = new Array();

            var level = 0;
            for (var i in digital_data.attributes) {
                var data = digital_data.attributes[i];

                var obj3 = new Object();
                obj3.tag = data.name;
                obj3.score = data.score;

                var result = Huawei.Personalization.FindObjByCategory(obj.categorys, data.category);

                if (result == null) {
                    var obj2 = new Object();
                    obj2.category = data.category;
                    obj2.tags = new Array();
                    obj2.tags.push(obj3);

                    obj.categorys.push(obj2);
                }
                else {
                    if (result.tags != null) {
                        result.tags.push(obj3);
                    }
                }

                level += parseInt(data.score);
            }

            obj.level = level.toString();

            return obj;
        } else {
            var level = parseInt(cookie_user_tag.level);

            for (var i in digital_data.attributes) {
                var data = digital_data.attributes[i];

                var result = Huawei.Personalization.FindObjByCategoryAndTagNameFromCookie(cookie_user_tag.categorys, data.category, data.name);
                var category = Huawei.Personalization.FindObjByCategoryNameFromCookie(cookie_user_tag.categorys, data.category);
                if (result == null) {
                    var obj3 = new Object();
                    obj3.tag = data.name;
                    obj3.score = data.score;

                    var obj2 = new Object();
                    obj2.category = data.category;
                    obj2.tags = new Array();

                    obj2.tags.push(obj3);

                    cookie_user_tag.categorys.push(obj2);

                    level += parseInt(data.score);
                } else {
                    if (result.length == undefined) {
                        var score = parseInt(data.score) + parseInt(result.score);
                        var increased_score = 0;
                        if (score >= parseInt(data.max)) {
                            score = data.max;
                            increased_score = parseInt(data.max) - parseInt(result.score);
                            if (increased_score < 0) {
                                increased_score == 0;
                            }
                        }
                        else {
                            increased_score = parseInt(data.score); score - parseInt(data.score);
                        }

                        level += increased_score;
                        result.score = score.toString();

                        Huawei.Personalization.SortTag(category, result);

                    } else {
                        var obj3 = new Object();
                        obj3.tag = data.name;
                        obj3.score = data.score;

                        //result.push(obj3);
                        Huawei.Personalization.PushTag(result, obj3);

                        level += parseInt(data.score);
                    }
                }
            }

            cookie_user_tag.level = level.toString();

            return cookie_user_tag;
        }
    },
    SortTag: function (category, tag) {
        for (var subtag in category.tags) {
            if (category.tags[subtag].tag !== tag.tag) {
                if (tag.score >= category.tags[subtag].score) {
                    //找出数组在的位置，移除，增加到头部
                    var index = -1;
                    for (var i = 0; i < category.tags.length; i++) {
                        if (category.tags[i].tag === tag.tag) {
                            index = i;
                        }
                    }
                    if (index > 0) {
                        category.tags.splice(index, 1);
                        category.tags.unshift(tag);
                    }
                }
            }
        }
    },
    PushTag: function (tagArray, tag) {
        var index = -1;
        for (var i in tagArray) {
            if (tagArray[i].tag <= tag.tag) {
                index = i;
            }
        };
        if (tagArray.constructor === Array) {
            if (index === -1) {
                tagArray.push(tag);
            } else {
                tagArray.splice(index, 0, tag);
            }
        } else {
            tagArray = new Array();
            if (index === -1) {
                tagArray.push(tag);
            } else {
                tagArray.splice(index, 0, tag);
            }
        }
    },
    Findcompare: function (obj1, obj2) {
        if (typeof (obj1) != "string" || typeof (obj2) != "string") {
            return obj1 == obj2;
        } else {
            return obj1.toLowerCase() == obj2.toLowerCase();
        }
    },
    FindObjByCategoryNameFromCookie: function (obj, category) {
        for (var i in obj) {
            if (obj.hasOwnProperty(i)) {
                var data = obj[i];
                if (Huawei.Personalization.Findcompare(data.category, category)) {
                    return data;
                }
            }
        }
        return null;
    },
    FindObjByCategoryAndTagNameFromCookie: function (obj, category, tag_name) {
        for (var i in obj) {
            var data = obj[i];

            if (Huawei.Personalization.Findcompare(data.category, category)) {
                for (var j in data.tags) {
                    var tag = data.tags[j];
                    if (Huawei.Personalization.Findcompare(tag.tag, tag_name))
                        return tag;
                }

                return data.tags;
            }
        }

        return null;
    },
    FindObjByCategory: function (obj, category) {
        for (var i in obj) {
            var data = obj[i];

            if (Huawei.Personalization.Findcompare(data.category, category))
                return data;
        }

        return null;
    },
    FindObjByCategoryAndTagNameFromPageTags: function (obj, category, tag_name) {
        for (var i in obj) {
            if (Huawei.Personalization.Findcompare(obj[i].category, category) && Huawei.Personalization.Findcompare(obj[i].name, tag_name))
                return obj[i];
        }

        return null;
    },
    GetTagsByKeyword: function (value) {
        if (value == '' || value == null)
            return null;

        var return_data = null;

        $.ajax({
            url: '/ajax/HuaweiPersonalizationAPI.ashx',
            data: {
                cmd: 'getTagsByKeyword', keyword: value
            },
            type: 'POST',
            dataType: 'JSON',
            cache: false,
            async: false,
            success: function (data) {
                return_data = data;
            }
        });

        return return_data;
    },
    CombineTags: function (page_tags, keyword_tags) {
        if (page_tags == null && keyword_tags == null)
            return null;
        else if (page_tags == null)
            return keyword_tags;
        else if (keyword_tags == null)
            return page_tags;

        for (var i in keyword_tags) {
            var data = keyword_tags[i];

            for (var j in data.tags) {
                var tag = data.tags[j];

                var obj = Huawei.Personalization.FindObjByCategoryAndTagNameFromPageTags(page_tags.attributes, data.category, tag.name);

                if (obj == null) {
                    var obj2 = new Object();
                    obj2.category = data.category;
                    obj2.name = tag.name;
                    obj2.score = tag.score;
                    obj2.min = tag.min;
                    obj2.max = tag.max;

                    page_tags.attributes.push(obj2);
                } else {
                    obj.score = parseInt(tag.score) > parseInt(obj.score) ? tag.score : obj.score;
                }
            }
        }

        return page_tags;
    },

    getPersonalize: function (objHtml, id, huaweiName, huaweiValue, url, tagetId) {
        //var SC_Model = $(objHtml).find("#hideViewModel").val();
        //if (SC_Model == "True") {
        var imgUrl;
        $.ajax({
            async: true,
            type: 'get',
            url: url,
            header: {

            },
            beforeSend: function (request) {
                //imgUrl = $(objHtml).find(".row img").attr("src");
                //$(objHtml).find(".row img").attr("src", "\\Assets\\CBG\\img\\loading-bg.png");
                $(objHtml).attr("style", "display:block;");

                //$(objHtml).addClass("loading-bg");
                //$(objHtml).find(".row div").eq(1).addClass("loading-icon");
                //$(objHtml).find(".row div").eq(2).attr("style", "display:none;");

                request.setRequestHeader("X-HUAWEI-ItemId", tagetId);
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

                if (xhr.getResponseHeader("DataSourceID") && id != null) {
                    if (xhr.getResponseHeader("DataSourceID").toLowerCase() == id.toLowerCase()) {
                        Huawei.Personalization.GetStyle(objHtml, imgUrl);
                        return;
                    }
                    $(objHtml).children().remove();
                    $(objHtml).append($(data).children());
                    //$(objHtml).removeClass("loading-bg");
                } else {
                    if ($.trim(data) == "") {
                        $(objHtml).remove();
                        return;
                    } else {
                        Huawei.Personalization.GetStyle(objHtml, imgUrl);
                    }
                }
                if (Huawei.Personalization.AjaxFlag === 1) {
                    Huawei.Personalization.AjaxFlag = 2;
                    if (typeof (scSendPersonalizationFlag) != "undefined") {
                        scSendPersonalizationFlag("success", "");
                    }
                }
            },
            error: function (ee) {
                Huawei.Personalization.GetStyle(objHtml, imgUrl);
                if (Huawei.Personalization.AjaxFlag === 1) {
                    Huawei.Personalization.AjaxFlag = 2;
                    if (typeof (scSendPersonalizationFlag) != "undefined") {
                        scSendPersonalizationFlag("error", "");
                    }
                }
            }
        });
        //}
    },
    GetStyle: function (objHtml, imgUrl) {
        $(objHtml).find("section").removeClass("hw1_loading");
        $(objHtml).find("section").find("div").removeClass("spinner");
        $(objHtml).find(".hw1_img").attr("style", "display:block;");
        $(objHtml).find(".hw1_img_subinfo").attr("style", "display:block;");
        //$(objHtml).find(".row img").attr("src", imgUrl);
        //$(objHtml).removeClass("loading-bg");
        //$(objHtml).find(".row div").eq(1).removeClass("loading-icon");
        //$(objHtml).find(".row div").eq(2).attr("style", "display:block;");
    },
    GetQueryString: function (name, str) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = str.substr(1).match(reg);
        if (r != null) return decodeURIComponent(r[2]); return null;
    },
    GetUserTags: function () {
        var visitorId = $.cookie("visitorId");
        if (visitorId == null) {
            visitorId = "";
        }

        var url = "/api/api/GetUserTag?visitorId=" + visitorId;

        $.ajax({
            async: true,
            type: 'post',
            url: url,
            success: function (data, status, xhr) {
                if (data) {
                    if (data.Error) {
                    }
                    else if (data.newId) {
                        Huawei.Personalization.SetCookie("visitorId", data.newId, 180);
                        Huawei.Personalization.SetCookie("per_last", new Date().getTime(), 180);
                    }
                    else {
                        Huawei.Personalization.SetCookie("userTag", JSON.stringify(data), 180, false);
                        Huawei.Personalization.SetCookie("per_last", new Date().getTime(), 180);
                    }
                }
            },
            error: function (ee) {

            }
        });
    },

    //设置登陆用户职位标签Begin

    //设置
    SetLoginUser: function (loginUserPosition) {
        var per_loginuser = Huawei.Personalization.GetCookie("per_loginuser");
        if (per_loginuser == null) {
            Huawei.Personalization.SetCookie("per_loginuser", loginUserPosition, 1);//登陆超时时间和邓驰沟通后暂定一天
        } else {
            if (per_loginuser !== loginUserPosition) {
                Huawei.Personalization.SetCookie("per_loginuser", loginUserPosition, 1);//登陆超时时间和邓驰沟通后暂定一天
            }
        }
    },
    //清空
    RemoveLoginUser: function () {
        Huawei.Personalization.SetCookie("per_loginuser", "", -1);
    },
    //设置登陆用户职位标签End

    SendAdobeEvent: function (elementName, tags) {

        var ele = "";//"Product|Router|20,Product|Switch|10";

        var digit = {};
        digit.attributes = new Array();
        var arrayTag = tags.split(',');
        for (var j = 0; j < arrayTag.length; j++) {
            var categoryTag = arrayTag[j];
            var strEle = categoryTag.split('|');

            var newTag = {};
            newTag.category = strEle[0];
            newTag.name = strEle[1];
            newTag.score = strEle[2];
            newTag.max = strEle[3];
            if (newTag.category && newTag.name && newTag.score && newTag.max) {
                digit.attributes.push(newTag);
                ele = ele + strEle[0] + "|" + strEle[1] + "|" + strEle[2] + ",";
            }
        }
        Huawei.Personalization.SetUserTagCookie(Huawei.Personalization.CookieSize, digit);

        if (ele.length - 1 === ele.lastIndexOf(',')) {
            ele = ele.substring(0, ele.length - 1);
        }
        if (typeof (scSendEvent) != "undefined") {
            scSendEvent(elementName, ele);
        }
    }

};


$(document).ready(function () {
    var Per_last = $.cookie("per_last");
    if (Per_last == null) {
        Huawei.Personalization.SetCookie("per_last", new Date().getTime(), 180);
        Huawei.Personalization.GetUserTags();
    }
    else {
        if (new Date().getTime() - Per_last > 86400000) {
            Huawei.Personalization.GetUserTags();
        }
    }

    if (typeof (digitalData) != "undefined") {
        Huawei.Personalization.SetUserTagCookie(Huawei.Personalization.CookieSize, digitalData);
    }

    //搜索加分 begin
    //站内搜索  企业网  cn
    var seachTermWords = Huawei.Personalization.GetQueryString("sp.keyword", document.location.href);
    if (seachTermWords) {
        Huawei.Personalization.CalculateTagByKeyWords(seachTermWords);
    }

    //站内搜索  集团网  jp
    seachTermWords = Huawei.Personalization.GetQueryString("keywords", document.location.search);
    if (seachTermWords) {
        Huawei.Personalization.CalculateTagByKeyWords(seachTermWords);
    }

    //站内搜索  集团网  cn
    seachTermWords = Huawei.Personalization.GetQueryString("searchString", document.location.href);
    if (seachTermWords) {
        Huawei.Personalization.CalculateTagByKeyWords(seachTermWords);
    }

    //站外搜索
    if (document.referrer) {
        var baiduSearchWords = Huawei.Personalization.GetQueryString("wd", document.referrer);
        if (baiduSearchWords) {
            Huawei.Personalization.CalculateTagByKeyWords(baiduSearchWords);
        }
    }
    //搜索加分 end



});
