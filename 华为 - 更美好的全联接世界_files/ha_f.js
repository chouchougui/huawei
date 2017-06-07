var win = parent ? parent.window : window;
(function (window, document) {
     (function (win, doc, script) {
    var js,
        fjs = doc.getElementsByTagName(script)[0],
        add = function (url, id) {
            if (!doc.getElementById(id)) {
                js = doc.createElement(script);
                js.src = url;
                js.async = true;
                id && (js.id = id);
                fjs.parentNode.insertBefore(js, fjs);
            }
        };

    setTimeout(function(){
     add(("https:" == location.protocol ? "https:" : "http:") + '//app.huawei.com/hwa-c/configresource/js/general/ha.js?v=6667', 'ha');
    },1);
  })(window, document, 'script');
}(win, win.document));