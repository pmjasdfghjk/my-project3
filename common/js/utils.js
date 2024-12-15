class Utils {
    constructor() {
        this.baseUrl = 'https://code.itndedu.com/pz';
        this.isLoading = false; // 用于跟踪 loading 状态
    }

    getUserInfo() {
        uni.login({
            success: (res) => {
                this.request({
                    url: '/auth/wxLogin',
                    data: {
                        code: res.code
                    },
                    success: (res) => {
                        
                    }
                });
            }
        });
    }

    request(option = { showLoading: false }) {
        if (!option.url) {
            return false;
        }

        if (option.showLoading) {
            this.showLoading();
        }

        uni.request({
            url: this.baseUrl + option.url,
            data: option.data ? option.data : {},
            header: option.header ? option.header : {},
            method: option.method ? option.method : 'GET',
            success: (res) => {
                this.hideLoading(); // 确保每次请求后都调用 hideLoading
                // 后端返回的数据是异常的
                if (res.data.code !== 10000) {
                    // 将失败的结果返回出去
                    if (option.fail && typeof option.fail === 'function') {
                        option.fail(res);
                    }
                } else {
                    if (option.success && typeof option.success === 'function') {
                        option.success(res.data);
                    }
                }
            },
            fail: (response) => {
                this.hideLoading(); // 确保每次请求后都调用 hideLoading
                
            }
        });
    }

    // 创建加载的loading效果
    showLoading() {
        if (!this.isLoading) {
            uni.showLoading({
                title: '加载中',
                success: () => {
                    this.isLoading = true; // 设置状态为正在加载
                },
                fail: () => {
                    this.isLoading = false; // 失败时重置状态
                }
            });
        }
    }

    hideLoading() {
        if (this.isLoading) {
            uni.hideLoading();
            this.isLoading = false; // 重置状态
        }
    }
}

export default new Utils();