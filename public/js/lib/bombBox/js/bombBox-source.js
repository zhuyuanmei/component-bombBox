/**
 * 弹框模块
 * @author zym
 * @version 1.0
 * @since 2016-06-12
 */
define(function(require, exports, module) {
    var Mustache = require('mustache');

    var $window = $(window),
        count = 1,
        isLock = false;

    var tpl = {
        contentTpl:[
            '<div class="rDialog-wrap">',
                '{{#hasCloseBtn}}',
                '<a href="javascript:;" class="rDialog-close" title="关闭"></a>',
                '{{/hasCloseBtn}}',
                '{{#hasTitle}}',
                '<div class="rDialog-header">{{title}}</div>',
                '{{/hasTitle}}',
                '<div class="rDialog-content">{{&content}}</div>',
                '{{#hasFoot}}',
                '<div class="rDialog-footer"></div>',
                '{{/hasFoot}}',
            '</div>'
        ]
    };

    var BombBox = function(options) {
        this.settings = $.extend({}, BombBox.defaults, options);
        this.init();
    }

    BombBox.prototype = {
        /**
         * 初始化
         */
        init : function() {
            this.create();
        },

        /**
         * 创建
         */
        create : function() {
            var _this = this;

            // html渲染模板
            var hasTitleFlag = _this.settings.title === '' ? false : true;

            var dataObj = {hasCloseBtn: _this.settings.hasCloseBtnFlag,hasTitle: hasTitleFlag,title: _this.settings.title,content:_this.settings.content,hasFoot: _this.settings.hasFootFlag};

            var contentTpl = Mustache.render(tpl.contentTpl.join(''),dataObj);

            // 弹框，蒙版追加至body
            _this.preview = $(contentTpl);
            _this.preview.prependTo('body');

            _this.mask = $('<div>').css({ zIndex : _this.settings.zIndex }).addClass('rDialog-mask');
            _this.mask.appendTo('body');

            _this.preview.css('z-index',_this.settings.zIndex + (count++));

            // 设置确定按钮函数
            if (_this.settings.hasFootFlag && $.isFunction(_this.settings.ok)) {
                _this.ok();
            }

            // 设置取消按钮函数
            if (_this.settings.hasFootFlag && $.isFunction(_this.settings.cancel) && parseInt(_this.settings.footBtnNumber) > 1) {
                _this.cancel();
            }

            // 设置size
            _this.size();

            // 设置position
            _this.position();

            // 事件绑定
            _this.bindEvent();
        },

        /**
         * 确定按钮
         */
        ok : function() {
            var _this = this,
                footer = _this.preview.find('.rDialog-footer')[0];

            var closeBtn = $('<a href="javascript:;">'+_this.settings.okText+'</a>');

            closeBtn.prependTo(footer);

            if(parseInt(_this.settings.footBtnNumber) < 2){
                closeBtn.css('width','100%');
            }

            closeBtn.on('click',function(){
                if(_this.settings.okCallBack){
                    _this.settings.ok();
                }else{
                    _this.close();
                }
            });
        },

        /**
         * 取消按钮
         */
        cancel : function() {
            var _this = this,
                footer = _this.preview.find('.rDialog-footer')[0];

            var closeBtn = $('<a href="javascript:;" class="rDialog-cancel">'+_this.settings.cancelText+'</a>');

            closeBtn.prependTo(footer);

            closeBtn.on('click',function(){
                if(_this.settings.cancelCallBack){
                    _this.settings.cancel();
                }else{
                    _this.close();
                }
            });
        },

        /**
         * 设置大小
         */
        size : function() {
            var _this = this,
                content = _this.preview.find('.rDialog-content'),
                wrap = _this.preview;

            if(parseInt(_this.settings.width) >= $window.width()){
                var widthVal = $window.width() > 720 ? '60%' : '90%';

                wrap.css({
                    width : widthVal
                });
            }else{
                var widthVal = 0;

                if((parseInt(_this.settings.width) + parseInt(content.css('padding-left'))*2) >= $window.width() || _this.settings.width === 'auto'){
                    widthVal = $window.width() > 720 ? '60%' : '90%';

                    wrap.css({
                        width : widthVal
                    });
                }else{
                    content.css({
                        width : parseInt(_this.settings.width)
                    });

                    wrap.css('width',content.width() + parseInt(content.css('padding-left'))*2);
                }
            }
        },

        /**
         * 设置位置
         */
        position : function() {
            var _this = this;

            _this.preview.css({
                'left': '50%',
                'top': '50%',
                '-webkit-transform':'translate3d(-50%,-50%,0)'
            });
        },

        /**
         * 设置锁屏
         */
        lock : function() {
            if (isLock) return;

            isLock = true;
        },

        /**
         * 关闭锁屏
         */
        unLock : function() {
            var _this = this;

            if (_this.settings.lock) {
                if (isLock) {
                    _this.mask.remove();
                    isLock = false;
                }
            }
        },

        /**
         * 关闭弹框
         */
        close : function() {
            var _this = this;

            _this.preview.remove();
            _this.mask.remove();
        },

        /**
         * 定时关闭
         */
        time : function() {
            var _this = this;

            _this.closeTimer = setTimeout(function() {
                _this.close();
            }, parseInt(_this.settings.time) * 1000);
        },

        /**
         * 事件绑定
         */
        bindEvent : function() {
            var _this = this,
                close = _this.preview.find('.rDialog-close');

            //设置定时关闭弹框函数
            if (_this.settings.time) {
                _this.time();
            }

            // close event
            close.on('click', function() {
                _this.close();
            });

            // resize event
            $window.on('resize', function() {
                _this.position();
            });
        }
    }

    /**
     * 默认配置
     */
    BombBox.defaults = {
        // 内容
        content: '请稍等...',

        // closeBtn开关
        hasCloseBtnFlag: true,

        // 标题
        title: '提示',

        // 内容区宽度
        width: 'auto',

        // 操作btn开关
        hasFootFlag: true,

        // 操作btn个数
        footBtnNumber: 2,

        // 确定按钮文本
        okText: '确定',

        // ok的callback函数开关
        okCallBack: false,

        // 确定按钮回调函数
        ok: function(){},

        // 取消按钮文本
        cancelText: '取消',

        // cancel的callback函数开关
        cancelCallBack: false,

        // 取消按钮回调函数
        cancel: function(){},

        // 自动关闭弹框时间(秒)
        time: null,

        // 是否锁屏
        lock: false,

        // 蒙版层级
        zIndex: 9
    }

    var rBombBox = function(options) {
        new BombBox(options);
    }

    window.rBombBox = $.rBombBox = $.bombBox = rBombBox;
});