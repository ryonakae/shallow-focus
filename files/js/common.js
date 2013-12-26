jQuery(function(){
  // --------
  // index
  // --------
  // collagePlus
  var entryWrapper_index = jQuery("body.index #entry-wrapper");
  
  // entryWrapper_index.css({ "opacity": 0 });
  
  jQuery(window).on("load", function(){
    entryWrapper_index.removeWhitespace().collagePlus().transit({ "opacity": 1 }, 800);
  });
  jQuery(window).on("resize", function(){
    entryWrapper_index.removeWhitespace().collagePlus();
  });
  
  // entry hover
  function index_hoverAction() {
    jQuery("body.index #entry-wrapper").find(".entry-index").each(function(){
      jQuery(this).on({
        mouseenter:function(){
          jQuery(this).find(".info_wrapper").addClass("hover");
          jQuery(this).find("img").addClass("hover");
        },
        mouseleave:function(){
          jQuery(this).find(".info_wrapper").removeClass("hover");
          jQuery(this).find("img").removeClass("hover");
        }
      });
    });
  }
  jQuery(window).on("load", function(){
    index_hoverAction();
  });
  
  // auto pager
  jQuery.autopager({
    // 読み込むコンテンツの枠
    content: ".autopagerize_page_element",
    // 次ページへのリンク
    link: "#next a",
    // スクロールで自動読込を停止
    autoLoad: true,
    // 読み込み完了後に発生するイベント
    load: function(){
      jQuery("body.index #entry-wrapper").imagesLoaded(function(){
        jQuery("body.index #entry-wrapper").removeWhitespace().collagePlus().transit({ "opacity": 1 }, 800);
        index_hoverAction();
      });
    }
  });
  
  // --------
  // single  
  // --------
  // common variables
  var _window = jQuery(window);
  var windowHeight;
  var windowWidth;
  var header = jQuery("body.single #header");
  var headerHeight;
  var imageWrapper = jQuery("body.single #img");
  var imageWrapperHeight;
  var imageWrapperWidth;
  var infoWrapper = jQuery("body.single #info_wrapper");
  var footer = jQuery("body.single #footer");
  var footerHeight;
  var flag = "close";
  
  // set variables
  function setVariables() {
    imageWrapperHeight = imageWrapper.height();
    imageWrapperWidth = imageWrapper.width();
    headerHeight = header.outerHeight(true);
    footerHeight = footer.outerHeight(true);
    windowHeight = _window.height();
    windowWidth = _window.width();
  }
  jQuery(window).on("load resize", function(){
    setVariables();
  });
  
  // fadeIn
  var entryWrapper_single = jQuery("body.single #entry-wrapper");
  // entryWrapper_single.css({ "opacity": 0 });
  jQuery(window).on("load", function(){
    entryWrapper_single.transit({ "opacity": 1 }, 800);
    setTimeout(function(){
      imageWrapper.addClass("animation");
    }, 800);
  });
  
  // image resize
  // set default height for scale down
  var headerHeight_default = header.outerHeight(true);
  // set function
  function resizeImage(action) {
    var image = jQuery("body.single #img").find("img");
    var imageHeight = image.height();
    var imageWidth = image.width();
    
    // header height
    var headerHeight;
    if (action === "resize") {
      headerHeight = header.outerHeight(true);
    }
    else if (action === "scaleUp") {
      headerHeight = 0;
    }
    else if (action === "scaleDown") {
      if (flag === "close") {
        headerHeight = header.outerHeight(true);
      }
      else if (flag === "open") {
        headerHeight = headerHeight_default;
      }
    }
    
    var scaleW = windowWidth / imageWidth; // 画像の幅をウインドウいっぱいに拡大する倍率
    var scaleH = (windowHeight - headerHeight - footerHeight) / imageHeight;　// 画像の高さをウインドウいっぱいに拡大する倍率
    var fixScale = Math.max(scaleW, scaleH); // 画像の拡大倍率（幅と高さで大きい方を採る）
    var setW = Math.floor(imageWidth * fixScale); // 画像の幅を倍率分拡大
    var setH = Math.floor(imageHeight * fixScale); // 画像の高さを倍率分拡大
    // var _imgTop = Math.floor((_setH - _winH) / -2); // 画像を上下中央表示
    var marginLeft = Math.floor((windowWidth - setW) / 2); // 画像を左右中央表示
    
    // 画像のリサイズ
    image.css({
      "height": setH,
      "width": setW,
      "margin-left": marginLeft
    });
  }
  
  jQuery(window).on("load resize", function(){
    resizeImage("resize");
  });
  
  // info click action
  jQuery("body.single #toggle").on("click",function(){
    // info toggle
    if (flag === "close") {
      header.addClass("hidden");
      imageWrapper.addClass("absolute");
      setTimeout(function(){
        imageWrapper.addClass("fixed");
      }, 800);
      infoWrapper.addClass("zIndex").addClass("open");
      
      infoWrapper.css({ "min-height": windowHeight - footerHeight });
      
      resizeImage("scaleUp");
      
      flag = "open";
    }
    else if (flag === "open") {
      header.removeClass("hidden");
      imageWrapper.removeClass("absolute").removeClass("fixed");
      infoWrapper.removeClass("open");
      setTimeout(function(){
        infoWrapper.removeClass("zIndex");
      }, 800);
      
      resizeImage("scaleDown");
      
      flag = "close";
    }
    
    // backtop
    jQuery("html, body").stop().animate({ scrollTop : 0 }, 0);
  });
  
  jQuery(window).on("resize", function(){
    infoWrapper.css({ "min-height": windowHeight - footerHeight });
  });
  
  /*
  // debug
  jQuery(window).on("load", function(){
      header.addClass("hidden");
      imageWrapper.addClass("absolute");
      setTimeout(function(){
        imageWrapper.addClass("fixed");
      }, 800);
      infoWrapper.addClass("open");
      
      infoWrapper.css({ "min-height": windowHeight - footerHeight });
      
      resizeImage("scaleUp");
      
      flag = "open";
  });
  */
});