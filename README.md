# component-bombBox
组件名称：弹框<br>
组件功能：支持页头(title的显示隐藏)，页尾(操作btn个数及显示隐藏)的动态配置<br>
组件参数：

      $.bombBox({
            
                // 内容(适配html代码或是文本)
                content: '确定要进行某项操作吗？',

                // 关闭按钮开关
                hasCloseBtnFlag: true,

                // 标题(不需要title,可以置为''即可)
                title: '标题',

                // 内容区宽度
                width: 'auto',

                // 自动关闭弹框时间(单位:秒)
                time: 3,

                // 操作btn开关
                hasFootFlag: true,

                // 操作btn个数(适配1个或2个操作btn)
                footBtnNumber: 2,

                // 确定按钮文本
                okText: '确定Btn',

                // 确定按钮callback函数开关
                okCallBack: false,

                // 确定按钮回调函数
                ok: function(){},

                // 取消按钮文本
                cancelText: '取消Btn',

                // 取消按钮callback函数开关
                cancelCallBack: false,

                // 取消按钮回调函数
                cancel: function(){},

                // 蒙版层级
                zIndex: 9
            });
