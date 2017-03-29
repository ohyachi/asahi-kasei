var cmn = {
  init : function(){
    for (var key in this) {
      var member = this[key];
      if (typeof member != 'object') {
        continue;
      }
      member.root = this;
    }
    var self = this;
    var userAgent = window.navigator.userAgent.toLowerCase();
    if( userAgent.match(/(msie|MSIE)/) || userAgent.match(/(T|t)rident/) ) {
        var isIE = true;
        var ieVersion = userAgent.match(/((msie|MSIE)\s|rv:)([\d\.]+)/)[3];
        ieVersion = parseInt(ieVersion);
    } else {
        var isIE = false;
    }
    if(isIE){
      if(document.charset !== "utf-8" && !/\/customer\/contact\//.test(location.href) ){
        document.charset = "utf-8";
        location.reload();
      }
    }

    self.ua.init();
    $(function(){
      self.include.init();
    });
  },

  include: {
    init : function(){
      var self = this;
      var $include = $('.include');
      var jqXHRList = [];
      var request = [];
      //ヘッダー、フッター以外のインクルードが存在すれば生成
      $include.each(function(){
        var dataPath = $(this).data('path');
        if(dataPath){
          var obj = {};
          obj.url = dataPath;
          obj.container = $(this);
          request.push(obj);
        }
      });

      $.each(request,function(i){
        jqXHRList.push(
          $.ajax({
            url: request[i].url,
            dataType: 'html'
          })
        );
      });

      $.when.apply($,jqXHRList).done(function(){
        TweenMax.set('body',{padding:0});
        if(request.length >= 2){
          for(var i = 0; i < request.length; i++ ){
            request[i].container.append(arguments[i][0]);
          }
        }
        self.done();
      }).fail(function(){
        setTimeout(function(){
          self.init();
        },1000);
      });
    },
    done : function(){
      var self = this;
      if( typeof(local) != "undefined" ){
        if( typeof(local.includeReady) == "function"){
          local.includeReady();
        }
      }
      self.root.menu.init();
      self.root.spSlider.init();
      if($('#slideBanner').length){
        self.root.slideBanner.init();
      }
      self.root.win.init();
      self.root.smoothscroll.init();


      $( '.modal' ).swipebox({
        autoplayVideos: true
      });

    }
  },

  mediaChange : function(){
    var self = this;

    //グローバルナビカレント表示
    self.fullpath = location.pathname;
    self.path = self.fullpath.split('/');
    self.category = self.path[2];
    self.categories = ['','products','preservation','recipe','customer'];
    self.categoryIndex = self.categories.indexOf(self.category);
    if(self.categoryIndex != -1){
      $('#menu>ul>li').eq(self.categoryIndex).addClass('cur');
    }
    //サイドナビのカレント表示
    var $sideMneu = $('#sideMenu');
    if($sideMneu.length){
      $sideMneu.find('li').each(function(i){
        if( $(this).find('a').attr('href') == self.fullpath ){
          $(this).addClass('cur');
          var parents = $(this).parents('dl');
          // if(parents.length){
          //   parents.find('dt').trigger('click');
          // }

          return false;
        }
      });
    }

    self.menu.mediaChange();
    self.spSlider.mediaChange();
    if( typeof(local) != "undefined" ){
      if( local && typeof(local.mediaChange) == "function"){
        local.mediaChange();
      }
    }
  },

  ua : {
    init : function(){
      var self = this;
      var ua = navigator.userAgent.toLowerCase();
      self.isWindows = /windows/.test(ua); // Windows
      self.isMac = /macintosh/.test(ua); // Mac
      self.isPC  = /windows/.test(ua) || /macintosh/.test(ua) || /ipad/.test(ua); // PC
      self.isIE = /msie (\d+)/.test(ua); // IE
      self.isIE6 = /msie (\d+)/.test(ua) && RegExp.$1 == 6;// IE6
      self.isIE7 = /msie (\d+)/.test(ua) && RegExp.$1 == 7;// IE7
      self.isLtIE9 = /msie (\d+)/.test(ua) && RegExp.$1 < 9;// IE9未満
      self.isLtIE10 = /msie (\d+)/.test(ua) && RegExp.$1 < 10;// IE10未満
      self.isFirefox = /firefox/.test(ua); // Firefox
      self.isSafari = /safari/.test(ua) && !/chrome/.test(ua) ; // safari
      self.isWebKit = /applewebkit/.test(ua); // WebKit
      self.isTouchDevice = 'ontouchstart' in window; // タッチデバイス
      self.isIOS = /i(phone|pod|pad)/.test(ua); // iOS
      self.isIPhone = /i(phone|pod)/.test(ua); // iPhone、iPod touch
      self.isIPad = /ipad/.test(ua); // iPad
      self.isAndroid = /android/.test(ua); // Android
      self.isAndroid2 = /android 2.[123]/.test(ua);
      self.isAndroidMobile = /android(.+)?mobile/.test(ua);// モバイル版Android

      function AndroidSversion() {
        //var ua = navigator.userAgent;
        if( ua.indexOf("android") > 0 ){
         var androidversion = parseFloat(ua.slice(ua.indexOf("android")+8));
         return androidversion;
        }
      }
      if(self.isFirefox){
        $('html').addClass('firefox');
      }
      if(self.isAndroid){
        $('html').addClass('android');
        self.version = AndroidSversion();
        if(self.isAndroidMobile){
          if(self.version > 4)
          $('#metaViewport').attr('content','target-densitydpi=device-dpi,width=640,user-scalable=no');
        } else {
          $('#metaViewport').attr('content','width=1000');
        }
      }
      if(self.isIOS){
        $('html').addClass('iOS');
        if(self.isIPad){
          $('#metaViewport').attr('content','width=1000');
        } else {
          $('#metaViewport').attr('content','width=640,user-scalable=no');
        }
      }
    }
  },

  win : {
    init : function(){
      var self = this;
      var xDevice;
      //リサイズ
      $(window).resize(function(){
        self.h = $(window).height();
        self.w = $(window).width();
        self.device = matchMedia('only screen and (max-width: 760px)').matches ? 'sp' : 'pc';
        if(xDevice != self.device){
          xDevice = self.device;
          self.root.mediaChange();
        }
      }).resize();

    }
  },

  /////////////////////////////////////////////////////////////////////////////////////////////////////
  menu : {
    menu : function(){},
    init: function(){
      var self = this;
      self.$triggers = $('#triggers li');
      self.$close = $('#menu .close');
      self.$triggers.on({
        click: function(){
          if($(this).hasClass('close')){
            self.close();
          } else {
            self.$triggers.removeClass('close');
            $(this).addClass('close');
            if($(this).hasClass('search')) {
              self.searchOpen();
            } else if($(this).hasClass('menu')) {
              $(this).addClass('close')
              self.menuOpen();
            }
          }
        }
      });
      self.$close.on({
        click: function(){
          self.close();
        }
      });
    },
    mediaChange : function(){
      var self = this;
      if(self.root.win.device == 'sp'){
        TweenMax.set('#nav,#menu,#search', {autoAlpha:0, display: 'block'});
        TweenMax.set('#nav',{ background: 'rgba(0,0,0,0)'});
        self.$triggers.removeClass('close');
      } else {
        TweenMax.set('#nav,#menu,#search', {autoAlpha:1});
        TweenMax.set('#nav',{ background: '#005bab'});
        TweenMax.set('#search',{y: 0});
      }

    },
    close : function(){
      var self = this;
      self.$triggers.removeClass('close');
      TweenMax.to('#nav',0.3,{ autoAlpha: 0,background: 'rgba(0,0,0,0)'});
    },
    searchOpen : function(){
      var self = this;
      TweenMax.set('#menu',{ autoAlpha: 0});
      TweenMax.to('#nav',0.3,{ background: 'rgba(0,0,0,0.6)'});
      TweenMax.fromTo('#search',0.3,{ autoAlpha: 0, y: -20},{ autoAlpha: 1, y:0, ease: Power3.easeInOut });
      TweenMax.set('#nav',{ autoAlpha: 1});
    },
    menuOpen : function(){
      var self = this;
      TweenMax.set('#search',{ autoAlpha: 0});
      TweenMax.to('#nav',0.3,{ background: 'rgba(0,0,0,0.6)'});
      TweenMax.fromTo('#menu',0.3,{ autoAlpha: 0, y: -20},{ autoAlpha: 1, y:0, ease: Power3.easeInOut });
      TweenMax.set('#nav',{ autoAlpha: 1});
    },
  },


  slideBanner : {
    slideBanner : function(){},
    init : function(){
      $('#slideBanner #bannersInner ul').slick({
        infinite: true,
        autoplay : true,
        autoplaySpeed: 5000,
        speed: 300,
        cssEase : 'ease-in-out',
        slidesToShow: 3,
        slidesToScroll: 1,
        prevArrow : $('#slideBanner .prev'),
        nextArrow : $('#slideBanner .next'),
        responsive: [{
            breakpoint: 760,
            settings: {
              speed: 100,
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: true,
              dots: true
            }
        }]
      });
    }
  },

//////////////////////////////////////////////////////////////////////////////////////////////////
//トップスライダー
  spSlider : {
    spSlider : function(){},
    init : function(){
      var self = this;
      self.$spSlider = $('.spSlider');
      self.sliders = [];
      self.$spSlider.each(function(i){
        self.sliders[i] = {};
        var sliders = self.sliders[i];
        sliders.slide = $(this).find('.slide li');
        sliders.pagers = $('<ul class="pager sp" />');
        for (var j = 0; j<sliders.slide.length; j++){
          sliders.pagers.append('<li></li>');
        }
        $(this).append(sliders.pagers);
        sliders.prev = $('<div class="prev"></div>');
        sliders.next = $('<div class="next"></div>');
        var $arrows = $('<div class="arrow sp"></div>');
        $arrows.append(sliders.prev);
        $arrows.append(sliders.next);
        $(this).append($arrows);

        sliders.n = 0;
        sliders.xn = 0;
        sliders.max = sliders.slide.length;
        sliders.prev.on({
          click: function(){
            --sliders.n;
            self.slide(i);
          }
        });
        sliders.next.on({
          click: function(){
            ++sliders.n;
            self.slide(i);
          }
        });
        $(this).find('.slide').on({
          touchstart: function(e){
            self.x = e.originalEvent.touches[0].pageX;
            self.y = e.originalEvent.touches[0].pageY;
            self.startX = self.x;
            self.startY = self.y;
          },
          touchmove: function(e){
            //e.preventDefault();
            if(cmn.ua.isAndroid){ e.preventDefault(); }
              self.x = e.originalEvent.touches[0].pageX;
              self.y = e.originalEvent.touches[0].pageY;
            if(cmn.ua.isAndroid){
              window.scrollTo(0, window.pageYOffset + self.startY - self.y);
            }
          },
          touchend: function(e){
            self.x = e.originalEvent.changedTouches[0].pageX;
            if( Math.abs(self.startX-self.x) > 60 ){
              if(self.startX > self.x){
                //left
                ++sliders.n;
              } else {
                //right
                --sliders.n;
              }
              self.slide(i);
            }
          }
        });

      });
    },
    mediaChange : function(){
      var self = this;
        $.each(self.sliders,function(i){
          this.pagers.find('li').removeClass('cur');
          this.pagers.find('li').eq(0).addClass('cur');
          this.slide.show();
          this.n = 0;
          this.xn = 0;
          if(self.root.win.device == 'sp'){
            TweenMax.set(this.slide,{x:'100%'});
            TweenMax.set(this.slide.eq(0),{x:'0%'});
          } else {
            TweenMax.set(this.slide,{x:'0%'});
          }
        });
    },
    slide : function(i){
      var self = this;
      var slider = self.sliders[i];
      var dTo = slider.xn < slider.n ? '-100%' : '100%';
      var dfrom = slider.xn < slider.n ? '100%' : '-100%';
      slider.n = slider.n < 0 ? slider.max-1 : slider.n;
      slider.n = slider.n >= slider.max ? 0 : slider.n;
      TweenMax.to(slider.slide[slider.xn],0.5,{ x: dTo, ease:Power3.easeInOut });
      TweenMax.fromTo(slider.slide[slider.n],0.5,{x: dfrom},{ x: '0%', ease:Power3.easeInOut });
      slider.xn = slider.n;
      slider.pagers.find('li').removeClass('cur');
      slider.pagers.find('li').eq(slider.n).addClass('cur');
    }
  },

//////////////////////////////////////////////////////////////////////////////////////////////////
//スムーススクロール
  smoothscroll : {
    init : function(){
      var self = this;
      self.$htmlbody = $('html, body');

      $('a[href^=#]').on({
        click : function() {
          if(this.hash){
            var newHash=this.hash;
            var target=$(this.hash).offset().top;
            //if(oldLocation+newHash==newLocation){
              TweenMax.to(self.$htmlbody,0.5,{ scrollTop: target, ease: Power3.easeInOut });
            //}
          }
          return false;
        }
      });
      //マウスホイールでキャンセル
      //self.$htmlbody.on({ mousewheel: function() { $(this).stop(); } });
    }
  },

  //配列のシャッフル
  shuffle: function(array) {
    var n = array.length, t, i;
    while (n) {
      i = Math.floor(Math.random() * n--);
      t = array[n];
      array[n] = array[i];
      array[i] = t;
    }
    return array;
  }

};
cmn.init();