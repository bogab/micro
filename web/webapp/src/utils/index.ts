const toggleFullScreen = () => {
    let doc = window.document;
    let docEl = doc.documentElement;

    // @ts-ignore
    let requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
    // @ts-ignore
    let cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
    // @ts-ignore
    if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
        requestFullScreen.call(docEl);
    } else {
        cancelFullScreen.call(doc);
    }
};

const getCookieValue = (a: string) => {
    let b = document.cookie.match('(^|;)\\s*' + a + '\\s*=\\s*([^;]+)');
    return b ? b.pop() : '';
}

const setCookie = (a: string, v: string, days: number) => {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = a + "=" + (v || "") + expires + "; path=/";
}


const copyTxt = (text: string) => {

    // @ts-ignore
    if (!navigator.clipboard) {
        return fallbackCopyTextToClipboard(text);

    }

    let flag = false;

    // @ts-ignore
    navigator.clipboard.writeText(text).then(
        function () {
            flag = true
        },
        function () {
            flag = false
        },
    );

    return flag
}

let XTools = {}

// @ts-ignore
XTools.install = function (Vue, options) {

    let _xools = {
        toggleFullScreen,
        getCookieValue,
        setCookie,
        copyTxt
    }

    // add the instance method
    if (!Vue.prototype.hasOwnProperty('$xools')) {
        Object.defineProperty(Vue.prototype, '$xools', {
            get: function get() {
                return _xools;
            },
        });
    }
}

export default {
    XTools, Utils: {
        toggleFullScreen,
        getCookieValue,
        setCookie,
        copyTxt
    }
};


function fallbackCopyTextToClipboard(text: string) {
    let textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    let flag = false;
    try {
        document.execCommand('copy');
        flag = true
    } catch (err) {
        flag = false
    }

    document.body.removeChild(textArea);
    return flag;
}