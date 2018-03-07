/*! hashgo.js v1.0.0 MIT License By Yimi https://github.com/yimicat */
var H = (function (window) {
    var _logTipText = '-HashGo ';
    var HashGo = function() {
        this.version = '1.0.0';
        this.hashData = {};
        this.options =  {
            mark : '!',
            indexUrl : null,
            notFindUrlCall : function () {},
            beforeCall : function () {}
        };
    };

    //clone object
    function _cloneObj(oldObj){
        if(typeof(oldObj)!='object')
            return oldObj;
        if(typeof(oldObj==null))
            return oldObj;
        var newObj=Object();
        for(var i in oldObj)
            newObj[i]=_cloneObj(oldObj[i]);
        return newObj;
    }

    //extend object
    function _extend(){
        var args = arguments;
        if(args.length<2)
            return;
        var temp = _cloneObj(args[0]);
        for(var n=1;n<args.length;n++){
            for(var i in args[n])
                temp[i]=args[n][i];
        }
        return temp;
    }

    /**
     * initialize onhashchange
     */
    var _initHashChange = function () {
        var _that = this;
        window.onhashchange = function() {
            var _now_hash = _that.getNowUrl();

            if(typeof _that.options.beforeCall === "function") {
                _that.options.beforeCall.call(null, _now_hash);
            } else {
                console.error(_logTipText, '[beforeCall] function error');
            }

            if(_that.hashData.hasOwnProperty(_now_hash)) {
                try {
                    if(typeof _that.hashData[_now_hash].func === "function") {
                        _that.hashData[_now_hash].func.call(null, _now_hash);
                    } else {
                        console.error(_logTipText, '[' + _now_hash + '] function error');
                    }
                } catch(e) {
                    console.error(_logTipText, '[' + _now_hash + ']function call error:' + e);
                }

            } else {
                console.error(_logTipText, '[' + _now_hash + ']not find');
                if(typeof _that.options.notFindUrlCall === "function") {
                    _that.options.notFindUrlCall.call(null, _now_hash);
                } else {
                    console.error(_logTipText, '[notFindUrlCall] function error');
                }
            }
        };
    };

    /**
     * initialize config
     * @param opts
     */
    HashGo.prototype.init = function (opts) {
        _extend(this.options, opts);
        _initHashChange.call(this);

        if(this.options.indexUrl) {
            this.go();
        }
    };

    /**
     * go to
     */
    HashGo.prototype.go = function (url) {
        window.location.hash = this.options.mark + (url || this.options.indexUrl);
    };

    /**
     * get now url
     * @return {string}
     */
    HashGo.prototype.getNowUrl = function () {
        var _that = this;
        return window.location.hash.substring(_that.options.mark.length + 1);
    };

    /**
     * register router url
     * @param url
     * @param func
     * @return {HashGo}
     */
    HashGo.prototype.router = function (url, func) {
        this.hashData[url] = {func : func};
        return this;
    };

    return window.H ? new HashGo() : window.H = new HashGo();
})(window);