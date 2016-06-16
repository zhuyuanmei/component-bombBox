# component-bombBox
组件名称：弹框<br>
组件功能：支持页头(title的显示隐藏)，页尾(操作btn个数及显示隐藏)的动态配置<br>
组件参数：

$.bombBox({

                // 内容
                content: '确定要进行某项操作吗？',

                // 关闭按钮开关
                hasCloseBtnFlag: true,

                // 标题
                title: '标题',

                // 内容区宽度
                width: 'auto',

                // 自动关闭弹框时间(秒)
                time: 3,

                // 操作btn开关
                hasFootFlag: true,

                // 操作btn个数
                footBtnNumber: 2,

                // 确定按钮文本
                okText: '确定Btn',

                // ok的callback函数开关
                okCallBack: false,

                // 确定按钮回调函数
                ok: function(){},

                // 取消按钮文本
                cancelText: '取消Btn',

                // cancel的callback函数开关
                cancelCallBack: false,

                // 取消按钮回调函数
                cancel: function(){},

                // 蒙版层级
                zIndex: 9
            });
