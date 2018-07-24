const numberFormats = {
    en: {
        currency: {
            style: 'currency', currency: 'USD'
        }
    },
    cn: {
        currency: {
            style: 'currency', currency: 'CNY', currencyDisplay: 'symbol'
        }
    }
}

const messages = {
    en: {
        $vuetify: {
            noDataText: 'Please select....'
        },
        common: {
            search: 'Search',
            ok: 'OK',
            cancel: 'Cancel',
            currency: '$',
            loading: 'loading...',
            days: 'days',
            months: 'months',
            years: 'years',
            class: 'classes',
            next: 'Next',
            previous: 'Previous',
            familyName: 'Family Name',
            givenName: 'Given Name',
            age: 'Age',
            gender: 'Gender',
            avatar: 'Avatar',
            required: 'It is requried field'
        },
        app: {
            title: 'Smart Training',
            logged_user: 'Sign in as {0}'
        },
        login: {
            title: 'Sign In',
            username: 'Username',
            password: 'Password',
            repasswd: 'Re-Password',
            invalid_username: 'Invalid Username',
            invalid_password: 'Invalid Password',
            invalid_repasswd: 'Two password are different'
        },
        toolbar: {
            home: 'Home',
            trainer: 'Trainer',
            trainee: 'Trainee',
            training: 'Training'
        },
        training: {
            new: 'New Training',
            label: {
                type: 'Training Type',
                title: 'Training Name',
                description: 'Training Description',
                startDate: 'Start Date',
                endDate: 'End Date',
                unitPrice: 'Unit Price',
                limitation: 'Limitation'
            },
            type: {
                CLASS: 'per time',
                MONTH: 'Monthly',
                QUARTER: 'Quarterly',
                YEAR: 'Yearly'
            },
            rule: {
                title: 'The title can not be empty and less than 10 characters',
                startDate: {
                    required: 'The start date of a training can not be empty'
                },
                type: {
                    required: 'Training type must be selected'
                },
                limitation: 'The limitation must be bigger than 0',
                unitPrice: 'The unit price must be not negative'
            },
            create: {
                success: 'Create the new training successfullly.',
                error: 'Create the new training error: \n {0}'
            },
            none_attendee: "There's no attendees of this training."
        },
        trainee: {
            new: 'Add Trainee',
            registered: {
                training: 'Registered Trainings',
                age: 'Registered Age'
            },
            newStep: {
                newAccount: 'Add User Account',
                addProp: 'Add Addtional Property',
                complete: 'Completed'
            },
            createDone: 'has been created successfully!'
        }
    },
    cn: {
        $vuetify: {
            noDataText: '请选择...'
        },
        common: {
            search: '搜索',
            ok: '确定',
            cancel: '取消',
            currency: '￥',
            loading: '加载中...',
            days: '天',
            months: '月',
            years: '年',
            class: '门课',
            next: '下一步',
            previous: '上一步',
            familyName: '姓',
            givenName: '名',
            age: '年龄',
            gender: '性别',
            avatar: '头像',
            required: '必填'
        },
         app: {
             title: '智训管理系统',
             logged_user: '登录用户: {0}'
         },
        login: {
            title: '请登录',
            username: '用户名',
            password: '密码',
            repasswd: '确认密码',
            invalid_username: '用户名格式错误',
            invalid_password: '密码格式错误',
            invalid_repasswd: '确认密码与密码不一致'
        },
        toolbar: {
            home: '主页',
            trainer: '教练员',
            trainee: '学员',
            training: '课程'
        },
        training: {
            new: '新建课程',
            label: {
                type: '课程类型',
                title: '课程名称',
                description: '课程简介',
                startDate: '开始日期',
                endDate: '结束日期',
                unitPrice: '单价',
                limitation: '人数'
            },
            type: {
                CLASS: '次卡',
                MONTH: '月卡',
                QUARTER: '季卡',
                YEAR: '年卡'
            },
            rule: {
                title: '课程名称不能为空且小于10个字符',
                date: {
                    required: '课程开始日期不能为空'
                },
                type: {
                    required: '课程类型必须选择'
                },
                limitation: '报名人数限制要大于0',
                unitPrice: '课程单价必须大于0'
            },
            create: {
                success: '新课程创建成功!',
                error: '新课程创建失败: \n {0}'
            },
            none_attendee: '没有学员报名这项培训'
        },
        trainee: {
            new: '新增学员',
            registered: {
                training: '报名课程',
                age: '注册时间'
            },
            newStep: {
                newAccount: '添加账户',
                addProp: '详细设置',
                complete: '完成'
            },
            createDone: '创建完成!'
        }
    }
}

export { messages, numberFormats }
