/* ---------------------------------------------------
 *
 * script.js
 *
 * ---------------------------------------------------*/

/* ---------------------------------------------------
 * CONSOLELOG IE BUGFIX
 * ---------------------------------------------------*/
(function () {
	if (typeof window.console === 'undefined') window.console = {};
	if (typeof window.console.log !== 'function') window.console.log = function () {};
})();

/* ---------------------------------------------------
 * INDEXOF IE BUGFIX
 * ---------------------------------------------------*/
if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function (target, index) {
		if (isNaN(index)) index = 0;
		for (var i = index; i < target.length; i++) {
			if (this[i] === target) return i;
		}
		return -1;
	};
}

/* ---------------------------------------------------
 * IE SMOOTH SCROLL INVALIDATION
 * ---------------------------------------------------*/
if (
	navigator.userAgent.match(/MSIE 10/i) ||
	navigator.userAgent.match(/Trident\/7\./) ||
	navigator.userAgent.match(/Edge\/12\./)
) {
	$('body').on('mousewheel', function () {
		event.preventDefault();
		var wd = event.wheelDelta;
		var csp = window.pageYOffset;
		window.scrollTo(0, csp - wd);
	});
}

/* ---------------------------------------------------
 * OS & BROWSER & USERAGENT
 * ------------------------------------------------ */
var uaStr = window.navigator.userAgent.toLowerCase(),
	appVer = window.navigator.appVersion.toLowerCase(),
	isDevice = false,
	isIE = false,
	isIEOld = false,
	isEdge = false,
	ieVer = false,
	isWebkit = false,
	isFirefox = false,
	isTouch = false,
	isOpacity = true,
	isTransform = true,
	isTransition = true;
var ua = (function (u) {
	return {
		Tablet:
			(u.indexOf('windows') != -1 && u.indexOf('touch') != -1) ||
			u.indexOf('ipad') != -1 ||
			(u.indexOf('android') != -1 && u.indexOf('mobile') == -1) ||
			(u.indexOf('firefox') != -1 && u.indexOf('tablet') != -1) ||
			u.indexOf('kindle') != -1 ||
			u.indexOf('silk') != -1 ||
			u.indexOf('playbook') != -1,
		Mobile:
			(u.indexOf('windows') != -1 && u.indexOf('phone') != -1) ||
			u.indexOf('iphone') != -1 ||
			u.indexOf('ipod') != -1 ||
			(u.indexOf('android') != -1 && u.indexOf('mobile') != -1) ||
			(u.indexOf('firefox') != -1 && u.indexOf('mobile') != -1) ||
			u.indexOf('blackberry') != -1,
		IE: u.indexOf('trident') != -1 || u.indexOf('msie') != -1,
		Edge: u.indexOf('edge') != -1,
		Webkit: u.indexOf('chrome') != -1 || u.indexOf('safari') != -1,
		Firefox: u.indexOf('firefox') != -1,
	};
})(uaStr);

/* SMARTPHONE
 * ------------------------------------------------ */
if (ua.Tablet || ua.Mobile) isDevice = true;
if (isDevice) {
	$('html').addClass('device');
} else {
	$('html').addClass('no-device');
}

/* IE
 * ------------------------------------------------ */
if (ua.IE) {
	isIE = true;
	var ieAry = /(msie|rv:?)\s?([\d\.]+)/.exec(uaStr);
	ieVer = ieAry ? ieAry[2] : '';
	ieVer = Math.floor(ieVer);
	$('html').addClass('ie');
	$('html').addClass('ie' + ieVer);
	if (ieVer <= 8) {
		isIEOld = true;
		$('html').addClass('ieOld');
	}
}

/* EDGE
 * ------------------------------------------------ */
if (ua.Edge) {
	isEdge = true;
	$('html').addClass('edge');
}

/* WEBKIT
 * ------------------------------------------------ */
if (ua.Webkit) {
	isWebkit = true;
}

/* ---------------------------------------------------
 * DETECT DEVICE TYPE
 * ------------------------------------------------ */
var detectDeviceTypeVal = 0;
var isMouse = false;
var isTouch = false;
var domFlag = false;
function detectDeviceType(event) {
	detectDeviceTypeVal = event.changedTouches ? 1 : 2;
	document.removeEventListener('touchstart', detectDeviceType);
	document.removeEventListener('mousemove', detectDeviceType);
	if (!domFlag) {
		if (detectDeviceTypeVal === 1) {
			isTouch = true;
			$('html').addClass('is-device_touch');
		}
		if (detectDeviceTypeVal === 2) {
			isMouse = true;
			$('html').addClass('is-device_mouse');
		}
	}
	//console.log('detectDeviceTypeVal:' + detectDeviceTypeVal);
}
document.addEventListener('touchstart', detectDeviceType);
document.addEventListener('mousemove', detectDeviceType);

/* ---------------------------------------------------
 * GET ROOTPATH
 * --------------------------------------------------- */
let rootURL = '';
let rootPath = '';
const GetRoot = {
	files: '_assets/js/common/script.js',
	get: {
		URL: '',
		Path: '',
	},
	init() {
		const reg = new RegExp(`(^|.*/)${this.files}$`);
		const script = document.getElementsByTagName('script');
		let length = script.length;
		while (length--) {
			const src = script[length].src.replace(/\?.*?$/g, '');
			const match = src.match(reg);
			if (match) {
				this.get.URL = match[1];
				break;
			}
		}

		this.get.Path = this.get.URL.slice(this.get.URL.indexOf(location.hostname) + location.hostname.length);
		rootURL = this.get.URL;
		rootPath = this.get.Path;
	},
}.init();
// console.log(`rootPath:${rootPath}`);
// console.log(`rootURL:${rootURL}`);

/* ---------------------------------------------------
 * LOCATION PARAMETER
 * ------------------------------------------------ */
var pagePrm = new Object();
var pagePrmLocation = location.search.substring(1).split('&');
for (var i = 0; pagePrmLocation[i]; i++) {
	var pagePrmVal = pagePrmLocation[i].split('=');
	pagePrm[pagePrmVal[0]] = pagePrmVal[1];
}
//console.log(pagePrm);
// EX: pagePrm.hoge

/* ---------------------------------------------------
 * WEBFONT LOADER
 * ------------------------------------------------ */
WebFont.load({
	custom: {
		families: [
			'Hannari',
			// 'Noto Sans JP',
		],
		urls: [
			'https://fonts.googleapis.com/earlyaccess/hannari.css',
			// 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700;900&display=swap',
		],
	},
	loading: function () {
		// ロードが開始されたとき
	},
	active: function () {
		// Web Fontが使用可能になったとき
	},
	inactive: function () {
		// ブラウザがサポートしていないとき
	},
	fontloading: function (fontFamily, fontDescription) {
		// fontFamilyのロードが開始されたとき
	},
	fontactive: function (fontFamily, fontDescription) {
		// fontFamilyが使用可能になったとき
	},
	fontinactive: function (fontFamily, fontDescription) {
		// fontFamilyをブラウザがサポートしていないとき
	},
});

/* ---------------------------------------------------
 * SMOOTH SCROLL
 * ------------------------------------------------ */
$(function () {
	$('a[href^="#"],area[href^="#"]').on('click', function () {
		//スクロールさせたくないリンクには「data-scroll="none"」をつける
		if ($(this).attr('data-scroll') !== 'none') {
			var href = $(this).attr('href');
			smoothScroll({
				href: href,
				speed: 500,
				//指定要素の高さを分ずらす
				//「data-scroll_fixed="none"」がある場合ずらさない
				//fixed: '.g-header',
				//fixed: ($(this).attr('data-scroll_fixed') === 'none') ? '' : '.g-header',
				easing: 'easeOutExpo',
			});
			return false;
		}
	});

	var hash = location.hash;
	if (hash) {
		$(window).stop().scrollTop(0, 0);
		setTimeout(function () {
			smoothScroll({
				href: hash,
				speed: 500,
			});
		}, 500);
	}
});
function smoothScroll(e) {
	var speed = e.speed ? e.speed : 750,
		easing = e.easing ? e.easing : 'easeOutExpo',
		target = $(e.href === '#' || e.href === '' ? 'html' : e.href),
		position = target.offset().top,
		//position = (target.length > 0) ? target.offset().top : 0,
		posMinus = e.href === '#pagetop' ? -1 : e.fixed ? $(e.fixed).outerHeight() : -1,
		zoom = 1;
	//zoom = ($('html').css('zoom') != 1 && !(isNaN($('html').css('zoom')))) ? Number($('html').css('zoom')) : 1
	$('html, body').animate({ scrollTop: (position - posMinus) * zoom }, speed, easing);

	scrollClassFnc();
}

/* ---------------------------------------------------
 * HEIGHT GROUP
 * ------------------------------------------------ */
function heightGFunc(option) {
	var elm = option.element,
		column = option.column ? option.column : 9999,
		minWidth = option.minWidth ? option.minWidth : 0,
		parent = option.parent,
		timer = false;
	var elmAry = [];
	if (elm.indexOf(',') <= -1) {
		elmAry[0] = elm;
	} else {
		elmAry = elm.split(',');
	}

	$(window).on('load resize', function () {
		//if(timer !== false) clearTimeout(timer);
		//timer = setTimeout(function(){
		func(elm, column, minWidth);
		//}, 10);
	});
	setTimeout(function () {
		func(elm, column, minWidth);
	}, 50);

	function func(elm, column, minWidth) {
		elmW = $(elm).width();
		winW = $(window).width();

		if (winW < minWidth) {
			group = Math.floor(winW / elmW);
		} else {
			if (!column) {
				group = 9999;
			} else {
				group = column;
			}
		}

		for (var i = 0; i < elmAry.length; i++) {
			var list = $(elmAry[i]),
				grH = [],
				grHNew = 0,
				count = 0,
				num = 0,
				parentInd = 0,
				parentIndThis = 0;
			list.each(function (i) {
				$(this).css({ height: 'auto' });
				grHNew = $(this).outerHeight();

				if (count == group) {
					++num;
					count = 0;
					grH[num] = 0;
				}
				if (count === 0) {
					grH[num] = 0;
				}
				if (grH[num] < grHNew) {
					grH[num] = grHNew;
				}
				++count;
			});

			count = 0;
			num = 0;
			parentInd = 0;
			parentIndThis = 0;

			list.each(function () {
				if (count == group) {
					++num;
					count = 0;
				}
				$(this).outerHeight(grH[num]);
				++count;
			});
		}
	}
}

/* RUN
 * ------------------------------------------------ */
/*
$(function(){
	heightGFunc({
		element: '.js-xxxxx',
		column: 3
	});
}); //END jQuery
*/

/* ---------------------------------------------------
 * current
 * ------------------------------------------------ */
$(function () {
	const _path = location.href.replace(rootURL, '/').replace(/^\//g, '').replace(/\/$/g, ''),
		pathArray = _path.split('/'),
		pathLength = pathArray.length,
		classActive = 'is-current_active',
		attr = 'data-current';
	let path = _path + '/';

	forcusFnc('a.js-current');

	function forcusFnc(element) {
		$(element).each(function () {
			let href = $(this).get(0).href,
				hrefPath = href
					.slice(href.indexOf(rootURL) + rootURL.length - 1)
					.replace(/^\//g, '')
					.replace(/\/$/g, ''),
				hrefArray = hrefPath.split('/'),
				hrefLength = hrefArray.length;
			hrefPath = hrefPath + '/';
			//console.log($(this).attr(attr));
			//console.log('path:' + path);
			//console.log('hrefPath:' + hrefPath);
			if ($(this).attr(attr) === 'match') {
				if (path === hrefPath) {
					classFnc($(this));
				}
			} else {
				if (
					path === hrefPath ||
					(hrefPath.indexOf('/') >= 0 &&
						((!hrefArray[0] && !pathArray[0]) || (path.indexOf(hrefPath) >= 0 && hrefArray[0])))
				) {
					var matchCount = 0;
					for (var i = 0; i < hrefArray.length; i++) {
						if (pathArray.indexOf(hrefArray[i]) >= 0) {
							matchCount++;
						}
					}
					if (pathArray[matchCount - 1] == hrefArray[matchCount - 1]) {
						classFnc($(this));
					}
				}
			}
		});
	}

	function classFnc(select) {
		select.addClass(classActive);
		select.parent().addClass(classActive);
	}
}); //END jQuery

/* ---------------------------------------------------
 * FONT SIZE
 * ------------------------------------------------ */
/*
$(function(){
	var
		trigger = '.js-fontsize_trigger',
		body = '.js-fontsize',
		activeClass = 'is-state_active',
		value = $.cookie('fontsize') ? $.cookie('fontsize') : 'middle'
	;
	$('html').attr('data-fontsize', value);

	$(trigger).each(function(index){
		if($(this).attr('data-fontsize') === value){
			$(this).addClass(activeClass);
		}
	});

	$(trigger).on('click', function(){
		value = $(this).attr('data-fontsize');
		$(trigger).removeClass(activeClass);
		$(this).addClass(activeClass);
		$.cookie('fontsize', value, {expires: 9999, path: '/'});
		$(body).attr('data-fontsize', value);
		return false;
	});
}); //END jQuery
*/

/* ---------------------------------------------------
 * RIGHT CLICK PROHIBITION
 * ------------------------------------------------ */
$(function () {
	$('.js-prohibition').on('contextmenu', function (e) {
		return false;
	});
});

/* ---------------------------------------------------
 * CLONE
 * ------------------------------------------------ */
$(function () {
	var select = '.js-clone',
		cloneClass = 'is-type_clone';
	$(select).each(function (ind) {
		var clone = $(this).clone(true).addClass(cloneClass);
		$(this).after(clone);
	});
}); //END jQuery

/* ---------------------------------------------------
 * MENU
 * ------------------------------------------------ */
$(function () {
	var select = 'html',
		//select = '.js-menu',
		trigger = '.js-menu_trigger',
		slide = '.js-menu_slide',
		//frame = '.js-menu_frame',
		cover = '.js-menu_cover',
		close = '.js-menu_close',
		openClass = 'is-menu_open',
		readyClass = 'is-menu_ready',
		speed = 500;
	$(slide).slideUp(0);
	$(select).removeClass(openClass).addClass(readyClass);
	$(trigger).removeClass(openClass).addClass(readyClass);
	$(cover).removeClass(openClass).addClass(readyClass);
	$(slide).removeClass(openClass).addClass(readyClass);

	$(trigger).on('click', function () {
		$(select).toggleClass(openClass);
		$(trigger).toggleClass(openClass);
		$(cover).toggleClass(openClass);
		$(slide).toggleClass(openClass);
		$(slide).slideToggle(speed);
	});

	$(close).on('click', function () {
		setTimeout(() => {
			$(select).removeClass(openClass);
			$(trigger).removeClass(openClass);
			$(cover).removeClass(openClass);
			$(slide).removeClass(openClass);
			$(slide).slideUp(speed);
		}, 100);
	});
}); //END jQuery

/* ---------------------------------------------------
 * PAGETOP FIXED
 * ------------------------------------------------ */
$(function () {
	const select = '.js-pagetop',
		target = '.js-pagetop_target',
		staticClass = 'is-pagetop_static';
	let winH = 0,
		scrT = 0,
		posT = 0,
		timer = false;
	if ($(select).length > 0) {
		$(window).on('scroll', function () {
			if (!timer) {
				requestAnimationFrame(function () {
					scrollFnc();
					timer = false;
				});
				timer = true;
			}
		});
		$(window).on('resize', function () {
			if (!timer) {
				requestAnimationFrame(function () {
					scrollFnc();
					timer = false;
				});
				timer = true;
			}
		});
		setTimeout(function () {
			scrollFnc();
		}, 100);
	}
	function scrollFnc() {
		winH = $(window).height();
		scrT = $(window).scrollTop();
		posT = $(select).offset().top;
		if (scrT > posT - winH) {
			$(select).addClass(staticClass);
		} else {
			$(select).removeClass(staticClass);
		}
	}
}); //END jQuery

/* ---------------------------------------------------
 * ACCORDION
 * ------------------------------------------------ */
$(function () {
	var select = '.js-accordion',
		trigger = '.js-accordion_trigger',
		slide = '.js-accordion_slide',
		readyClass = 'is-accordion_ready',
		openClass = 'is-accordion_open',
		activeClass = 'is-focus_active',
		speed = 500;
	$(select).addClass(readyClass);
	$(select).each(function (index) {
		if (!$(this).hasClass(openClass)) {
			$(this)
				.find(slide)
				.slideUp(0, function () {});
		}
	});
	setTimeout(function () {
		$(select).each(function (index) {
			if ($(this).hasClass(activeClass)) {
				$(this).find(slide).slideToggle(speed);
				$(this).addClass(openClass);
			}
		});
	}, 500);
	$(trigger).on('click', function () {
		$(this).closest(select).find(slide).stop().slideToggle(speed);
		$(this).closest(select).toggleClass(openClass);
		return false;
	});
}); //END jQuery

/* ---------------------------------------------------
 * TAB
 * ------------------------------------------------ */
$(function () {
	var select = '.js-tab',
		triggers = '.js-tab_triggers',
		trigger = '.js-tab_trigger',
		content = '.js-tab_content',
		readyClass = 'is-tab_ready',
		activeClass = 'is-tab_active',
		groupAttr = 'data-tab',
		targetAttr = 'data-tab',
		targetStr = '',
		speed = 650;
	$(select).addClass(readyClass);

	$(select).each(function (index) {
		$(this).find(content).hide().eq(0).show();
		if ($(this).find(triggers).length > 0) {
			$(this)
				.find(triggers)
				.each(function (index) {
					$(this).find(trigger).removeClass(activeClass).eq(0).addClass(activeClass);
				});
		} else {
			$(this).find(trigger).removeClass(activeClass).eq(0).addClass(activeClass);
		}
	});

	$(trigger).on('click', function () {
		if (!$(this).hasClass(activeClass)) {
			var activeIndex = $(this).index();

			$(this).closest(select).find(content).hide().eq(activeIndex).fadeIn(speed);
			if ($(this).closest(triggers).length > 0) {
				$(this)
					.closest(select)
					.find(triggers)
					.each(function (index) {
						$(this).find(trigger).removeClass(activeClass).eq(activeIndex).addClass(activeClass);
					});
			} else {
				$(this).closest(select).find(trigger).removeClass(activeClass).eq(activeIndex).addClass(activeClass);
			}
			/*
			smoothScroll({
				href: '#tab-scroll',
				speed: 500,
				fixed: '',
				fixed: '.g-header',
				easing: 'easeOutExpo'
			});
*/
			return false;
		}
	});
}); //END jQuery

/* ---------------------------------------------------
 * POPUP WINDOW
 * ------------------------------------------------ */
$(function () {
	var select = '.js-popup';

	$(select).on('click', function () {
		var href = $(this).attr('href');
		if (!href) {
			href = $(this).attr('action');
		}
		window.open(href, 'popup', 'scrollbars=yes,resizable=yes,width=1000,height=900');
		return false;
	});
}); //END jQuery

/* ---------------------------------------------------
 * scrollon
 * ------------------------------------------------ */
function scrollClassFnc() {
	$(function () {
		var select = '.js-scrollon',
			onClass = 'is-scrollon_active',
			selectT = [],
			scrollT = 0,
			mgT = 0,
			timer = false;
		setTimeout(function () {
			scrollFnc();
		}, 1000);
		$(window).on('scroll', function () {
			if (!timer) {
				requestAnimationFrame(function () {
					scrollFnc();
					timer = false;
				});
				timer = true;
			}
		});
		function scrollFnc() {
			scrollT = $(window).scrollTop();
			mgT = $(window).height() * (3 / 4);
			$(select).each(function (index) {
				selectT[index] = $(this).offset().top;
				if ($(this).offset().top < scrollT + mgT) {
					$(this).addClass(onClass);
				}
			});
		}
	}); //END jQuery
} //END scrollClassFnc
scrollClassFnc();

/* ---------------------------------------------------
 * DIRECTION
 * ------------------------------------------------ */
$(function () {
	const select = 'html',
		//const select = '.js-direction',
		height = '.js-direction_height',
		classFixed = 'is-direction_fixes',
		classUp = 'is-direction_up',
		classDown = 'is-direction_down';
	let before = $(window).scrollTop(),
		timer = false;
	if ($(select).length > 0) {
		scrollFnc();
		$(window).on('scroll', function () {
			if (!timer) {
				requestAnimationFrame(function () {
					scrollFnc();
					timer = false;
				});
				timer = true;
			}
		});
	}
	function scrollFnc() {
		let after = $(window).scrollTop();
		let heightH = $(height).outerHeight();
		if (!$(select).hasClass('is-menu_open')) {
			if (heightH > after) {
				$(select).addClass(classFixed);
			} else {
				$(select).removeClass(classFixed);
			}
			if (10 >= after) {
				$(select).addClass(classUp);
				$(select).removeClass(classDown);
			} else if (before > after) {
				$(select).addClass(classUp);
				$(select).removeClass(classDown);
			} else if (before < after) {
				$(select).removeClass(classUp);
				$(select).addClass(classDown);
			}
		} else {
			$(select).removeClass(classDown);
		}
		before = after;
	}
});

/* ---------------------------------------------------
 * MOBILE LINK
 * ------------------------------------------------ */
$(function () {
	if (ua.Mobile) {
		$('.js-mobileLink').each(function () {
			$(this).wrap('<a href="' + $(this).attr('data-mobileLink') + '" class="js-loadFade_none"></a>');
		});
	}
}); //END jQuery

/* ---------------------------------------------------
 * selectScroll
 * ------------------------------------------------ */
$(function () {
	$('.js-selectScroll').on('change', function () {
		var href = $(this).val();
		smoothScroll({
			href: href,
			speed: 500,
			fixed: '',
			easing: 'easeOutExpo',
		});
	});
}); //END jQuery

/* ---------------------------------------------------
 * modal
 * ------------------------------------------------ */
$(function () {
	var select = '.js-modal',
		trigger = '.js-modal_trigger',
		target = '.js-modal_target',
		close = '.js-modal_close',
		readyClass = 'is-modal_ready',
		openClass = 'is-modal_open',
		attr = 'data-modal',
		value = '';
	$(select).addClass(readyClass);

	$(select).each(function (index) {
		if (!$(this).hasClass(openClass)) {
			//$(this).children(slide).slideUp(0, function(){});
		}
	});

	$(trigger).on('click', function () {
		value = $(this).attr(attr);
		//console.log(value);
		$(target).removeClass(openClass);
		$(target + '[' + attr + '="' + value + '"]').addClass(openClass);
		return false;
	});

	$(close).on('click', function () {
		$(target).removeClass(openClass);
	});

	if (pagePrm.login == 'false') {
		$(target + '[' + attr + '="' + 'login' + '"]').addClass(openClass);
	}
}); //END jQuery

/* ---------------------------------------------------
 * fvover
 * ------------------------------------------------ */
$(function () {
	var select = 'html',
		activeClass = 'is-fvover_active';
	let winH = 0,
		scrT = 0,
		breakT = 1,
		breakP = 1,
		timer = false;
	resizeFnc();
	scrollFnc();
	$(window).on('resize', function () {
		if (!timer) {
			requestAnimationFrame(function () {
				resizeFnc();
				timer = false;
			});
			timer = true;
		}
	});
	$(window).on('scroll', function () {
		if (!timer) {
			requestAnimationFrame(function () {
				scrollFnc();
				timer = false;
			});
			timer = true;
		}
	});
	function resizeFnc() {
		winH = $(window).height();
		breakT = winH / breakP;
	}
	function scrollFnc() {
		scrT = $(window).scrollTop();
		if (scrT > breakT) {
			$(select).addClass(activeClass);
		} else {
			$(select).removeClass(activeClass);
		}
	}
}); //END jQuery

/* ---------------------------------------------------
 * opening
 * ------------------------------------------------ */
const Opening = {
	name: {
		selector: '.js-opening',
		video: '.js-opening_video',
	},
	class: {
		ready: 'is-opening_ready',
		finish: 'is-opening_finish',
		none: 'is-opening_none',
	},
	option: {
		time: { finish: 7000 },
		preload: {
			img: [
				rootPath + '_assets/img/common/opening_visual.jpg',
				rootPath + '_assets/img/common/opening_visual@media.jpg',
			],
		},
		session: {
			key: 'cinema-retro-kyoto--opening',
			value: 'none',
		},
	},
	helper: {
		loadImages(srcs) {
			const load = async (src) => {
				const img = new Image();
				img.src = src;
				await img.decode();
				return img;
			};
			return Promise.all(srcs.map((src) => load(src)));
		},
	},
	finish($selectors, $html) {
		const $this = this;
		$html.classList.add($this.class.finish);
		$html.classList.remove($this.class.ready);
		$selectors.forEach(($selector) => {
			$selector.classList.add($this.class.finish);
			$selector.classList.remove($this.class.ready);
		});
	},
	async ready() {
		const $this = this;

		const $selectors = document.querySelectorAll($this.name.selector);
		if ($selectors.length === 0) {
			return false;
		}

		const $html = document.querySelector('html');

		const session = window.sessionStorage.getItem([$this.option.session.key]);
		if (session === $this.option.session.value) {
			$html.classList.add($this.class.none);
			$selectors.forEach(($selector) => {
				$selector.classList.add($this.class.none);
			});
			return false;
		}

		const images = await $this.helper.loadImages($this.option.preload.img);

		$html.classList.add($this.class.ready);
		setTimeout(async () => {
			$selectors.forEach(($selector) => {
				$selector.classList.add($this.class.ready);
			});
		}, 100);
		setTimeout(async () => {
			$this.finish($selectors, $html);

			window.sessionStorage.setItem([$this.option.session.key], [$this.option.session.value]);

			const $video = document.querySelector($this.name.video);
			if (!$video) {
				return false;
			}
			$video.currentTime = 0;
		}, $this.option.time.finish);
	},
	init() {
		window.addEventListener('DOMContentLoaded', () => {
			this.ready();
		});
	},
};
Opening.init();

/* ---------------------------------------------------
 * slider - SLICK - jQuery PlugIn
 * ------------------------------------------------ */
$(function () {
	const select = '.js-slider';
	if ($(select).length > 0) {
		$(select).each(function (index) {
			const _this = $(this);
			_this.find('.js-slider_slider').slick({
				autoplay: true,
				autoplaySpeed: 4000,
				dots: true,
				arrows: true,
				fade: true,
				speed: 500,
				infinite: true,
				variableWidth: false,
				centerMode: false,
				slidesToShow: 1,
				slidesToScroll: 1,
				appendDots: _this.find('.js-slider_dots'),
				appendArrows: _this.find('.js-slider_arrows'),
			});
		});
	}
}); //END jQuery

/* ---------------------------------------------------
 * slider - SLICK - jQuery PlugIn
 * ------------------------------------------------ */
$(function () {
	const select = '.js-modalvideo';
	if ($(select).length > 0) {
		$('.js-modalvideo').modalVideo({
			channel: 'youtube',
			youtube: {
				autoplay: 1,
				mute: 0,
				controls: 1,
				rel: 0,
				showinfo: 0,
				loop: 0,
				cc_load_policy: 0,
				iv_load_policy: 3,
			},
			animationSpeed: 500,
		});
	}
}); //END jQuery
