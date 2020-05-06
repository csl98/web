import Vue from 'vue';

let win = window,
    doc = document,
    docEl = doc.documentElement,
    body = doc.body,
    head = doc.head;

function deepMerge() {
    let options, name, src, copy, copyIsArray, clone,
        target = arguments[ 0 ] || {},
        i = 1,
        length = arguments.length,
        isPlainObject = function (obj) {
            let proto, Ctor;
            if ( !obj || toString.call( obj ) !== "[object Object]" ) {
                return false;
            }
            proto = Object.getPrototypeOf( obj );
            if ( !proto ) {
                return true;
            }
            Ctor = Object.hasOwnProperty.call( proto, "constructor" ) && proto.constructor;
            return typeof Ctor === "function" && Object.hasOwnProperty.toString.call( Ctor ) === Object.hasOwnProperty.toString.call( Object );
        };

    for ( ; i < length; i++ ) {

        // Only deal with non-null/undefined values
        if ( ( options = arguments[ i ] ) != null ) {

            // Extend the base object
            for ( name in options ) {
                src = target[ name ];
                copy = options[ name ];

                // Prevent never-ending loop
                if ( target === copy ) {
                    continue;
                }

                // Recurse if we're merging plain objects or arrays
                if (copy && ( isPlainObject( copy ) ||
                    ( copyIsArray = Array.isArray( copy ) ) ) ) {

                    if ( copyIsArray ) {
                        copyIsArray = false;
                        clone = src && Array.isArray( src ) ? src : [];

                    } else {
                        clone = src && isPlainObject( src ) ? src : {};
                    }

                    // Never move original objects, clone them
                    target[ name ] = deepMerge(clone, copy );

                    // Don't bring in undefined values
                } else if ( copy !== undefined ) {
                    target[ name ] = copy;
                }
            }
        }
    }

    // Return the modified object
    return target;
}

deepMerge(Vue.prototype, {
    REGEXP: {
        phone: /^[1][3,4,5,7,8][0-9]{9}$/,
        tel: /^0\d{2,3}-\d{7,8}(-\d{1,6})?$/,
        email: /^[0-9A-Za-z][\.-_0-9A-Za-z]*@(qq\.com$|163\.com$|126\.com$|263\.com$|sina\.com$|gmail\.com$|hotmail\.com$)/,
        username: /^[a-zA-Z0-9_-]{4,16}$/,
        IDCard: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
        chinese: /^[\u4e00-\u9fa5]+$/,
        html: /<("[^"]*"|'[^']*'|[^'">])*>/,
        zipcode: /^[0-8][0-7]\d{4}$/
    },
    $swiperDefault: {
        resistanceRatio: 0,
        freeModeMomentumBounce: false,
        lazy: {
            loadPrevNext: true
        },
        pagination: {
            renderCustom(swiper, current, total) {
                let html = "",
                    el = swiper.el.querySelector(this.el),
                    fn = function (e) {
                        let target = e.target,
                            index = Number(target.dataset.index);
                        if (Array.prototype.slice.call(target.classList).indexOf('swiper-pagination-item') > -1) {
                            if (swiper.realIndex !== index) {
                                this.removeEventListener(e.type, fn);
                                swiper[swiper.params.loop ? "slideToLoop" : "slideTo"](index);
                            }
                        }
                    };
                for (let i = 0; i < total; i++) {
                    let _this = el.children[i];
                    _this.dataset.index = i;
                    _this.classList.add('swiper-pagination-item');
                    if (current - 1 === i) {
                        _this.classList.add('active');
                    } else {
                        _this.classList.remove('active');
                    }
                    html += _this.outerHTML;
                }
                el.addEventListener('click', fn);
                return html;
            }
        }
    },
    $deepMerge: deepMerge,
    $getChildren(name) {
        let result = [], fn = function (arr) {
            for (let i = 0; i < arr.length; i ++) {
                if (arr[i].$vnode.tag.toLowerCase().search(name) !== -1) {
                    result.push(arr[i]);
                }
                fn(arr[i].$children);
            }
        };
        fn(this.$children);
        return result;
    },
    $throttle(func, mustRun = 300, wait = 100) {
        let timeout = null, startTime = new Date().getTime();
        return function() {
            let curTime = new Date().getTime();
            clearTimeout(timeout);
            if (curTime - startTime >= mustRun) {
                func.apply(this, arguments);
                startTime = curTime;
            } else {
                timeout = setTimeout(() => func.apply(this, arguments), wait);
            }
        };
    },
    $log() {
        let mobile = this.$root.$getChildren('mobileconsole')[0];
        if (mobile) mobile.log = [];
        if (arguments.length > 1) {
            if (mobile) mobile.log.push(arguments);
            console.log('$log:', [...arguments]);
        } else {
            if (mobile) mobile.log.push(arguments[0]);
            console.log('$log:', arguments[0]);
        }
    },
    $typeof(obj, no) {
        let t = Object.prototype.toString,
            s = t.call(obj).split(' ')[1],
            str = s.substring(0, s.length - 1).toLowerCase();
        return no ? t.call(obj) : str;
    }
});
deepMerge(HTMLElement.prototype, {
    $getStyle(attr) {
        if (this.currentStyle) {
            return this.currentStyle[attr];
        } else {
            return getComputedStyle(this, null)[attr];
        }
    },
    $animate(json, time){
        let obj = {};
        for (let i in json) {
            if (i === 'scrollTop' || i === 'scrollLeft') {
                obj[i] = this[i];
            } else if (i === 'opacity') {
                obj[i] = Math.round(parseFloat(this.$getStyle(i))*100);
            } else {
                obj[i] = parseInt(this.$getStyle(i));
            }
        }
        return  new TWEEN.Tween(obj)
            .to(json, time)
            .easing(TWEEN.Easing.Quadratic.Out)
            .onUpdate((obj)=>{
                for (let i in obj) {
                    let to = parseInt(obj[i]);
                    if (i === 'scrollTop' || i === 'scrollLeft') {
                        this[i] = to;
                    } else if (i === 'opacity') {
                        this.style.filter = 'alpha(opacity:' + to + ')';
                        this.style.opacity = to / 100;
                    } else {
                        this.style[i] = to + 'px';
                    }
                }
            });
    },
    $scrollToElement(el, time, position) {
        let x = 0, y = 0;
        switch (position) {
            case 'center':
                x = -this.offsetWidth/2 + el.offsetLeft + el.offsetWidth/2;
                y = -this.offsetHeight/2 + el.offsetTop + el.offsetHeight/2;
                break;
            case 'right':
                x = el.offsetLeft + el.offsetWidth - this.offsetWidth;
                y = 0;
                break;
            case 'bottom':
                x = 0;
                y = el.offsetTop + el.offsetHeight - this.offsetHeight;
                break;
            default:
                x = el.offsetLeft;
                y = el.offsetTop;
        }

        return this.$animate({ scrollLeft: x, scrollTop: y },time);
    },
    $isInView(offset) {
        let coords = this.getBoundingClientRect(),
            arr = offset || [0,0,0,0];
        return (coords.top - arr[0] + coords.height) > 0
            && (coords.bottom + arr[2] - coords.height) < (win.innerHeight || docEl.clientHeight)
            && (coords.left - arr[3] + coords.width) > 0
            && (coords.right + arr[1] - coords.width) < (win.innerWidth || docEl.clientWidth);
    },
    $scrollDirection() {
        if (this.scrollHeight > this.clientHeight && this.scrollWidth > this.clientWidth) return 'xy';
        else if (this.scrollHeight > this.clientHeight) return 'y';
        else if (this.scrollWidth > this.clientWidth) return 'x';
        else return '';
    },
    $isScrollEdge(isDetail) {
        let edge = {
            t: this.scrollTop === 0,
            r: this.scrollLeft + this.offsetWidth === this.scrollWidth,
            b: this.scrollTop + this.offsetHeight === this.scrollHeight,
            l: this.scrollLeft === 0
        };
        switch (this.$scrollDirection()) {
            case 'y': return isDetail ? { t: edge.t, b: edge.b } : edge.t || edge.b;
            case 'x': return isDetail ? { l: edge.l, r: edge.r } : edge.l || edge.r;
            case 'xy': return isDetail ? edge : edge.t || edge.b || edge.l || edge.r;
            default: return true;
        }
    }
});



Vue.directive('focus', {
    inserted(el) {
        if (arguments[1].value) el.focus();
    }
});



doc.addEventListener('touchstart', function (e) {
    if (e.target !== doc.activeElement) doc.activeElement.blur();
});


