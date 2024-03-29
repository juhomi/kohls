var oldSizeId = new Array();
var oldSizeName = new Array();
var oldColorId = new Array();
var hoverColorId = "";
var oldColorName = new Array();
var productColorsToSizes = new Object();
var productSizesToColors = new Object();
var productAllColorIds = new Object();
var productAllColorNames = new Array();
var productSwatchToImage = new Array();
var productCurrentImage = new Array();
var productCurrentImageLink = new Array();
var productOriginalImage = new Array();
var productOriginalImageLink = new Array();
var productAllSizeIds = new Object();
var productAllSizeNames = new Array();
var disabledColors = new Array();
var disabledSizes = new Array();
var productSortVals = new Array();
var $alts,$default,$imgH,zOptions,to,zoomEnabled = false;
function changeSize(curProduct, sizeId, sizeName, formNum) {
    if (disabledSizes[sizeId] == 1) {
        return
    }
    var newSelectionHtml = "";
    if (oldColorName[curProduct] != null && oldColorName[curProduct] != "") {
        newSelectionHtml = oldColorName[curProduct]
    }
    if (oldSizeId[curProduct] == sizeId) {
        if (document.getElementById(curProduct + "selection") != null) {
            if (newSelectionHtml != "") {
                document.getElementById(curProduct + "selection").innerHTML = newSelectionHtml
            } else {
                document.getElementById(curProduct + "selection").innerHTML = "&nbsp;"
            }
        }
        document.getElementById(sizeId).className = "size_off";
        document.getElementById(curProduct + "selectedsize").innerHTML = "Select Size: ";
        oldSizeId[curProduct] = "";
        oldSizeName[curProduct] = "";
        document.getElementById("ATR_Kohls_Size_Sort_Value" + formNum).value = ""
    } else {
        if (document.getElementById(curProduct + "selection") != null) {
            if (newSelectionHtml != null && newSelectionHtml != "") {
                newSelectionHtml = newSelectionHtml + ", " + sizeName
            } else {
                newSelectionHtml = sizeName
            }
            document.getElementById(curProduct + "selection").innerHTML = newSelectionHtml
        }
        document.getElementById(sizeId).className = "size_on";
        if (oldSizeId[curProduct] != null && oldSizeId[curProduct] != "") {
            document.getElementById(oldSizeId[curProduct]).className = "size_off"
        }
        document.getElementById(curProduct + "selectedsize").innerHTML = "Select Size: " + sizeName;
        document.getElementById("ATR_Kohls_Size_Sort_Value" + formNum).value = productSortVals[sizeId];
        oldSizeId[curProduct] = sizeId;
        oldSizeName[curProduct] = sizeName
    }
}
function colorMouseOver(productId, colorLoc) {
    if (disabledColors[productId + "swatch" + colorLoc] == 1) {
        return
    }
    if (hoverColorId != "" && hoverColorId != oldColorId[productId]) {
        document.getElementById(oldColorId[productId]).src = "/media/images/StaticContent/products/swatch_off.gif"
    }
    if (productId + "swatch" + colorLoc != oldColorId[productId]) {
        document.getElementById(productId + "swatch" + colorLoc).src = "/media/images/StaticContent/products/swatch_hover.gif";
        hoverColorId = productId + "swatch" + colorLoc
    }
    document.getElementById("productImage" + productId).src = productSwatchToImage[productId + "swatch" + colorLoc]
}
function colorMouseOut(productId, colorLoc) {
    if (disabledColors[productId + "swatch" + colorLoc] == 1) {
        return
    }
    if (productId + "swatch" + colorLoc != oldColorId[productId]) {
        document.getElementById(productId + "swatch" + colorLoc).src = "/media/images/StaticContent/products/swatch_off.gif";
        hoverColorId = "";
        var useImage = productCurrentImage;
        if (useImage == null || useImage == "") {
            useImage = productOriginalImage[productId]
        }
        document.getElementById("productImage" + productId).src = useImage
    }
}
function changeColor(curProduct, colorId, colorName, formNum) {
    if (disabledColors[colorId] == 1) {
        return
    }
    var newSelectionHtml = "";
    if (oldColorId[curProduct] == colorId) {
        if (document.getElementById(curProduct + "selection") != null) {
            if (oldSizeName[curProduct] != null && oldSizeName[curProduct] != "") {
                document.getElementById(curProduct + "selection").innerHTML = oldSizeName[curProduct]
            } else {
                document.getElementById(curProduct + "selection").innerHTML = "&nbsp;"
            }
        }
        if (colorId == hoverColorId) {
            document.getElementById(colorId).src = "/media/images/StaticContent/products/swatch_hover.gif"
        } else {
            document.getElementById(colorId).src = "/media/images/StaticContent/products/swatch_off.gif"
        }
        document.getElementById(curProduct + "selectedtext").innerHTML = "Select Color: ";
        document.getElementById("ATR_Display_Color" + formNum).value = "";
        oldColorId[curProduct] = "";
        oldColorName[curProduct] = "";
        productCurrentImage = productOriginalImage[curProduct];
        document.getElementById("productImage" + curProduct).src = productOriginalImage[curProduct];
        if (!!$alts) {
            var aUrl = $alts.find("img.active").data("data").feature;
            if (aUrl.slice(aUrl.lastIndexOf("/")) != productCurrentImage.slice(productCurrentImage.lastIndexOf("/"))) {
                $alts.find("img").each(function() {
                    if ($(this).data("data").feature.slice($(this).data("data").feature.lastIndexOf("/")) == productOriginalImage[curProduct].slice(productOriginalImage[curProduct].lastIndexOf("/"))) {
                        $(this).trigger("click", [false]);
                        return false
                    }
                })
            }
        }
        $("#" + colorId).parent().removeClass("active")
    } else {
        if (document.getElementById(curProduct + "selection") != null) {
            if (oldSizeName[curProduct] != null && oldSizeName[curProduct] != "") {
                document.getElementById(curProduct + "selection").innerHTML = colorName + ", " + oldSizeName[curProduct]
            } else {
                document.getElementById(curProduct + "selection").innerHTML = colorName
            }
        }
        if (oldColorId[curProduct] != null && oldColorId[curProduct] != "") {
            if (oldColorId[curProduct] != hoverColorId) {
                document.getElementById(oldColorId[curProduct]).src = "/media/images/StaticContent/products/swatch_off.gif"
            } else {
                document.getElementById(oldColorId[curProduct]).src = "/media/images/StaticContent/products/swatch_hover.gif"
            }
        }
        document.getElementById(colorId).src = "/media/images/StaticContent/products/swatch_on.gif";
        document.getElementById(curProduct + "selectedtext").innerHTML = "Select Color: " + colorName;
        document.getElementById("ATR_Display_Color" + formNum).value = colorName;
        oldColorId[curProduct] = colorId;
        oldColorName[curProduct] = colorName;
        productCurrentImage = productSwatchToImage[colorId];
        if (!!$alts) {
            var aUrl = $alts.find("img.active").data("data").feature;
            if (aUrl.slice(aUrl.lastIndexOf("/")) != productCurrentImage.slice(productCurrentImage.lastIndexOf("/"))) {
                $alts.find("img").each(function() {
                    if ($(this).data("data").feature.slice($(this).data("data").feature.lastIndexOf("/")) == productCurrentImage.slice(productCurrentImage.lastIndexOf("/"))) {
                        $(this).trigger("click", [true]);
                        return false
                    }
                })
            }
        }
        $("#" + colorId).parent().siblings("div.active").removeClass("active");
        $("#" + colorId).parent().addClass("active")
    }
}
function addMixedMapValue(mixedMap, key, value) {
    var mapKey;
    mapKey = mixedMap[key];
    if (mapKey == null) {
        mapKey = new Array();
        mixedMap[key] = mapKey
    }
    mapKey.push(value)
}
function getMixedMapArray(mixedMap, keyId) {
    return mixedMap[keyId]
}
function showAvailColors(productId, sizeId) {
    var allColors = getMixedMapArray(productAllColorIds, productId);
    var allowedColors = getMixedMapArray(productSizesToColors, sizeId);
    var availColorLoc;
    var allColorLoc;
    if (disabledSizes[sizeId] == 1) {
        return
    }
    for (allColorLoc in allColors) {
        if (allColors[allColorLoc] != oldColorId[productId]) {
            if (sizeId != oldSizeId[productId]) {
                document.getElementById(allColors[allColorLoc]).src = "/media/images/StaticContent/products/swatch_unavail.gif";
                $("#" + allColors[allColorLoc]).parent().addClass("unavailable");
                disabledColors[allColors[allColorLoc]] = 1
            } else {
                document.getElementById(allColors[allColorLoc]).src = "/media/images/StaticContent/products/swatch_off.gif";
                $("#" + allColors[allColorLoc]).parent().removeClass("unavailable");
                disabledColors[allColors[allColorLoc]] = 0
            }
        }
    }
    if (sizeId != oldSizeId[productId]) {
        for (availColorLoc in allowedColors) {
            if (allowedColors[availColorLoc] != oldColorId[productId]) {
                document.getElementById(allowedColors[availColorLoc]).src = "/media/images/StaticContent/products/swatch_off.gif";
                $("#" + allowedColors[availColorLoc]).parent().removeClass("unavailable");
                disabledColors[allowedColors[availColorLoc]] = 0
            }
        }
    }
}
function showAvailSizes(productId, colorId) {
    var allSizes = getMixedMapArray(productAllSizeIds, productId);
    var allowedSizes = getMixedMapArray(productColorsToSizes, colorId);
    var availSizeLoc;
    var allSizeLoc;
    if (disabledColors[colorId] == 1) {
        return
    }
    for (allSizeLoc in allSizes) {
        if (allSizes[allSizeLoc] != oldSizeId[productId]) {
            if (colorId != oldColorId[productId]) {
                document.getElementById(allSizes[allSizeLoc]).className = "size_unavail";
                disabledSizes[allSizes[allSizeLoc]] = 1
            } else {
                document.getElementById(allSizes[allSizeLoc]).className = "size_off";
                disabledSizes[allSizes[allSizeLoc]] = 0
            }
        }
    }
    if (colorId != oldColorId[productId]) {
        for (availSizeLoc in allowedSizes) {
            if (allowedSizes[availSizeLoc] != oldSizeId[productId]) {
                document.getElementById(allowedSizes[availSizeLoc]).className = "size_off";
                disabledSizes[allowedSizes[availSizeLoc]] = 0
            }
        }
    }
}
jQuery().ready(function() {
    /*
    Disable the zoom feature on gift card and build product pages
     08.31.2011 CM
    */
    if (!/giftcard|kohls_build_product_page/gi.test(window.location.pathname)) {
        var $img = $("img.feature"),
            imgSize = 400,
            $cBlock = $("div.colorblock"),
            $swatches = $cBlock.find("div.swatch"),
            activeColor = "",
            zoomSize = 1000,
            baseURL = $img.attr("src").slice(0, $img.attr("src").lastIndexOf("/") + 1),
            altSize = 50,
            productColors = [];
        $imgH = $img.parent();
        $imgH.attr("href", $img.attr("src").replace(/=400/gi, "=1000"));
        if ($swatches.length > 0) {
            zoomEnabled = true;
            $alts = $("<ul></ul>").attr("id", "alt-image-list").insertAfter("div.zoom");
            $img.data("oSrc", $img.attr("src"));
            var src = $img.attr("src");
            activeColor = src.slice(src.indexOf("_") + 1, src.indexOf("?"));
            $swatches.each(function() {
                var $d = $(this),
                    start = $d.css("background-image"),
                    color = start.slice(start.lastIndexOf("/") + 1, start.indexOf("?") - 3);

                productColors.push(color);

                var featureI = baseURL + color + "?wid=" + imgSize + "&hei=" + imgSize + "&op_sharpen=1";
                $d
                    .removeAttr("onmouseout")
                    .removeAttr("onmouseover")
                    .data("feature", featureI)
                    .hover(function(e) {
                        var $$ = $(this);
                        $$.data("preHover", $img.attr("src"));
                        $img.attr("src", $$.data("feature"));
                        $$.addClass("hover");
                        if (!$$.hasClass("active") && !$$.hasClass("unavailable")) {
                            $$.find("img").attr("src", "/media/images/StaticContent/products/swatch_hover.gif")
                        }
                    }, function(e) {
                        var $$ = $(this);
                        if ($alts.find("img.active").data("data").feature == $$.data("preHover")) {
                            $img.attr("src", $$.data("preHover"))
                        }
                        $$.removeClass("hover");
                        if (!$$.hasClass("active") && !$$.hasClass("unavailable")) {
                            $$.find("img").attr("src", "/media/images/StaticContent/products/swatch_off.gif")
                        }
                    });
            });
            if (!activeColor.length) {
                productColors = new Array().concat([src.slice(src.lastIndexOf("/") + 1, src.indexOf("?"))], productColors)
            }
            for (color in productColors) {
                var $aImg = $("<li><img /></li>").appendTo($alts).find("img");
                var fixedColor = productColors[color].replace(/_/g, " ");
                $aImg
                    .attr({
                        src:baseURL + productColors[color] + "?wid=" + altSize + "&op_sharpen=1",
                        alt:"color " + fixedColor
                    })
                    .data("data", {
                        feature:baseURL + productColors[color] + "?wid=" + imgSize + "&hei=" + imgSize + "&op_sharpen=1",
                        zoom:baseURL + productColors[color] + "?wid=" + zoomSize + "&hei=" + zoomSize + "&op_sharpen=1",
                        color:fixedColor.slice(fixedColor.indexOf(" "))
                    })
                    .click(function(e, pass) {
                        var $$ = $(this);
                        if (!$$.hasClass("active")) {
                            $img.attr("src", $$.data("data").feature);
                            $alts.find("img.active").removeClass("active");
                            $$.addClass("active");
                            if (!pass) {
                                var $s = $cBlock.find("img[alt=" + $$.data("data").color + "]").parent();
                                if (!$s.hasClass("active")) {
                                    $s.click()
                                }
                            }
                            $imgH.attr("href", $$.data("data").zoom);
                            $("<img />").attr("src", $$.data("data").zoom)
                        }
                    });
                if ($img.attr("src").slice($img.attr("src").lastIndexOf("/")) == $aImg.data("data").feature.slice($aImg.data("data").feature.lastIndexOf("/"))) {
                    $aImg.click();
                    $default = $aImg
                }
            }
        }
        zOptions = {
            zoomWidth:400,
            zoomHeight:400,
            xOffset:0,
            yOffset:0,
            position:"right",
            title:false,
            showPreload:false,
            preloadImages:false
        };
        $imgH.jqzoom(zOptions)
    } else {
        $("a.image_container").click(function(e) {
            e.preventDefault()
        })
    }
	
	/**
	 * Ratings and reviews functionality to make the browser automatically move to 
	 * the location of said container.
	 *
	 * An interval check is established to look for the `BVRRWidgetID` container up 
	 * to a maximum of 5 seconds.  If the container successfully loads, the browser 
	 * window is brought to that container, but if the allotted time has elapsed, 
	 * the check is cancelled.  This check is also cancelled upon the user 
	 * scrolling beyond a 500 pixel bounds from the top of the webpage.
	 */
	
	/**
	 * Checks if the user has scrolled beyond a 500 pixel bounds from the top of 
	 * the webpage.  This large region was chosen to accommodate for different 
	 * screen resolutions.
	 */
	function _reviewWindowScroll()
		{
			// Check if the user has scrolled the browser window more than 500 pixels from 
			// the top of the current page.
			if ( $( this ).scrollTop() > 500 )
			{
				_unbindReviewWindowScroll();
			}
		}
	
	/**
	 * Cancells the interval check and unbinds the window scroll check.
	 */
	function _unbindReviewWindowScroll()
		{
			// Clear the interval check to prevent infinite looping.
			clearInterval( intervalCheck );
			
			// Unbind the function checking how far the window has scrolled.  No longer 
			// needed if greater than allowed or the number of allowed checks has passed.
			$( window ).unbind( 'scroll', _reviewWindowScroll );
		}
	
	/**
	 * Used by the interval timeout to check if the Bazaarvoice content has loaded.
	 */
	function _checkForReviewContainer()
		{
			var bazaarWidget = $( '#BVRRWidgetID' );
			
			if ( bazaarWidget.length !== 0 )
			{
				//// /// // /
				// Bring the review container into view when the Bazaarvoice review widget has 
				// successfully loaded into the page.
				//// /// // /
				
				bazaarWidget.get( 0 ).scrollIntoView();
				
				_unbindReviewWindowScroll();
			}
			else
			{
				//// /// // /
				// Increment the current interval check if the Bazaarvoice review widget 
				// hasn't been loaded yet, up to the maximum number of allowed checks.
				//// /// // /
				
				currInterval += 1;
				
				if ( currInterval >= maxIntervalCheck )
				{
					_unbindReviewWindowScroll();
				}
			}
		
		}
	
	if ( window.location.hash === '#reviews' )
	{
		var intervalCheck,
			
			currInterval     = 0,
			maxIntervalCheck = 50;  // << 5 seconds at 1 check per 100ms.
		
		intervalCheck = setInterval( _checkForReviewContainer, 100 );
		
		$( window ).bind( 'scroll', _reviewWindowScroll );
	}
	
	/* ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ */
});
(function($) {
    $.fn.jqzoom = function(options) {
        var settings = {zoomType:"standard",zoomWidth:200,zoomHeight:200,xOffset:10,yOffset:0,position:"right",lens:true,lensReset:false,imageOpacity:0.2,title:true,alwaysOn:false,showEffect:"show",hideEffect:"hide",fadeinSpeed:"fast",fadeoutSpeed:"slow",preloadImages:true,showPreload:true,preloadText:"Loading zoom",preloadPosition:"center"};
        options = options || {};
        $.extend(settings, options);
        return this.each(function() {
            var a = $(this);
            var aTitle = a.attr("title");
            a.removeAttr("title").css("outline-style", "none");
            var img = $("img", this);
            var imageTitle = img.attr("title");
            img.removeAttr("title");
            var smallimage = new Smallimage(img);
            var smallimagedata = new Object();
            var btop = 0;
            var bleft = 0;
            var loader = null;
            loader = new Loader();
            var ZoomTitle = (trim(aTitle).length > 0) ? aTitle : (trim(imageTitle).length > 0) ? imageTitle : null;
            var ZoomTitleObj = new zoomTitle();
            var largeimage = new Largeimage(a[0].href);
            var lens = new Lens(),lensdata = {},largeimageloaded = false,scale = {},stage = null,running = false,mousepos = {},firstime = 0,preloadshow = false,isMouseDown = false,dragstatus = false;
            smallimage.loadimage();
            $(this).click(function() {
                return false
            });
            $(this).hover(function(e) {
                mousepos.x = e.pageX;
                mousepos.y = e.pageY;
                activate(this)
            }, function() {
                deactivate()
            });
            if (settings.alwaysOn) {
                setTimeout(function() {
                    activate(this)
                }, 150)
            }
            function activate(obj) {
                if (!running) {
                    smallimage.findborder();
                    smallimagedata.w = $(obj).width();
                    smallimagedata.h = $(obj).height();
                    smallimagedata.h = $(obj).height();
                    smallimagedata.pos = $(obj).offset();
                    smallimagedata.pos.l = $(obj).offset().left;
                    smallimagedata.pos.t = $(obj).offset().top;
                    smallimagedata.pos.r = smallimagedata.w + smallimagedata.pos.l;
                    smallimagedata.pos.b = smallimagedata.h + smallimagedata.pos.t;
                    running = true;
                    imageTitle = img.attr("title");
                    img.removeAttr("title");
                    aTitle = a.attr("title");
                    $(a).removeAttr("title");
                    if (!largeimage || $.browser.safari || largeimage.url != smallimage.url) {
                        largeimage = new Largeimage(a[0].href)
                    }
                    if (!largeimageloaded || $.browser.safari) {
                        largeimage.loadimage()
                    } else {
                        if (settings.zoomType != "innerzoom") {
                            stage = new Stage();
                            stage.activate()
                        }
                        lens = new Lens;
                        lens.activate()
                    }
                    a[0].blur();
                    return false
                }
            }

            function deactivate() {
                if (settings.zoomType == "reverse" && !settings.alwaysOn) {
                    img.css({opacity:1})
                }
                if (!settings.alwaysOn) {
                    running = false;
                    largeimageloaded = false;
                    $(lens.node).unbind("mousemove");
                    lens.remove();
                    if ($("div.jqZoomWindow").length > 0) {
                        stage.remove()
                    }
                    if ($("div.jqZoomTitle").length > 0) {
                        ZoomTitleObj.remove()
                    }
                    img.attr("title", imageTitle);
                    a.attr("title", aTitle);
                    $().unbind();
                    a.unbind("mousemove");
                    firstime = 0;
                    if (jQuery(".zoom_ieframe").length > 0) {
                        jQuery(".zoom_ieframe").remove()
                    }
                } else {
                    if (settings.lensReset) {
                        switch (settings.zoomType) {
                            case"innerzoom":
                                largeimage.setcenter();
                                break;
                            default:
                                lens.center();
                                break
                        }
                    }
                }
                if (settings.alwaysOn) {
                    activate(this)
                }
            }

            function Smallimage(image) {
                this.node = image[0];
                this.url = image[0].src;
                this.loadimage = function() {
                    this.node.src = image[0].src
                };
                this.findborder = function() {
                    var bordertop = "";
                    bordertop = $(img).css("border-top-width");
                    btop = "";
                    var borderleft = "";
                    borderleft = $(img).css("border-left-width");
                    bleft = "";
                    if (bordertop) {
                        for (i = 0; i < 3; i++) {
                            var x = [];
                            x = bordertop.substr(i, 1);
                            if (isNaN(x) == false) {
                                btop = btop + "" + bordertop.substr(i, 1)
                            } else {
                                break
                            }
                        }
                    }
                    if (borderleft) {
                        for (i = 0; i < 3; i++) {
                            if (!isNaN(borderleft.substr(i, 1))) {
                                bleft = bleft + borderleft.substr(i, 1)
                            } else {
                                break
                            }
                        }
                    }
                    btop = (btop.length > 0) ? eval(btop) : 0;
                    bleft = (bleft.length > 0) ? eval(bleft) : 0
                };
                this.node.onload = function() {
                    a.css({cursor:"crosshair",display:"block"});
                    if (a.css("position") != "absolute" && a.parent().css("position")) {
                        a.css({cursor:"crosshair",position:"relative",display:"block"})
                    }
                    if (a.parent().css("position") != "absolute") {
                        a.parent().css("position", "relative")
                    } else {
                    }
                    if ($.browser.safari || $.browser.opera) {
                        $(img).css({position:"absolute",top:"0px",left:"0px"})
                    }
                    smallimagedata.w = $(this).width();
                    smallimagedata.h = $(this).height();
                    smallimagedata.h = $(this).height();
                    smallimagedata.pos = $(this).offset();
                    smallimagedata.pos.l = $(this).offset().left;
                    smallimagedata.pos.t = $(this).offset().top;
                    smallimagedata.pos.r = smallimagedata.w + smallimagedata.pos.l;
                    smallimagedata.pos.b = smallimagedata.h + smallimagedata.pos.t;
                    a.height(smallimagedata.h);
                    a.width(smallimagedata.w);
                    if (settings.preloadImages) {
                        largeimage.loadimage()
                    }
                };
                return this
            }

            function Lens() {
                this.node = document.createElement("div");
                $(this.node).addClass("jqZoomPup");
                this.node.onerror = function() {
                    $(lens.node).remove();
                    lens = new Lens();
                    lens.activate()
                };
                this.loadlens = function() {
                    switch (settings.zoomType) {
                        case"reverse":
                            this.image = new Image();
                            this.image.src = smallimage.node.src;
                            this.node.appendChild(this.image);
                            $(this.node).css({opacity:1});
                            break;
                        case"innerzoom":
                            this.image = new Image();
                            this.image.src = largeimage.node.src;
                            this.node.appendChild(this.image);
                            $(this.node).css({opacity:1});
                            break;
                        default:
                            break
                    }
                    switch (settings.zoomType) {
                        case"innerzoom":
                            lensdata.w = smallimagedata.w;
                            lensdata.h = smallimagedata.h;
                            break;
                        default:
                            lensdata.w = (settings.zoomWidth) / scale.x;
                            lensdata.h = (settings.zoomHeight) / scale.y;
                            break
                    }
                    $(this.node).css({width:lensdata.w + "px",height:lensdata.h + "px",position:"absolute",display:"none",borderWidth:1 + "px"});
                    a.append(this.node)
                };
                return this
            }

            Lens.prototype.activate = function() {
                this.loadlens();
                switch (settings.zoomType) {
                    case"reverse":
                        img.css({opacity:settings.imageOpacity});
                        (settings.alwaysOn) ? lens.center() : lens.setposition(null);
                        a.bind("mousemove", function(e) {
                            mousepos.x = e.pageX;
                            mousepos.y = e.pageY;
                            lens.setposition(e)
                        });
                        break;
                    case"innerzoom":
                        $(this.node).css({top:0,left:0});
                        if (settings.title) {
                            ZoomTitleObj.loadtitle()
                        }
                        largeimage.setcenter();
                        a.bind("mousemove", function(e) {
                            mousepos.x = e.pageX;
                            mousepos.y = e.pageY;
                            largeimage.setinner(e)
                        });
                        break;
                    default:
                        (settings.alwaysOn) ? lens.center() : lens.setposition(null);
                        $(a).bind("mousemove", function(e) {
                            mousepos.x = e.pageX;
                            mousepos.y = e.pageY;
                            lens.setposition(e)
                        });
                        break
                }
                return this
            };
            Lens.prototype.setposition = function(e) {
                if (e) {
                    mousepos.x = e.pageX;
                    mousepos.y = e.pageY
                }
                if (firstime == 0) {
                    var lensleft = (smallimagedata.w) / 2 - (lensdata.w) / 2;
                    var lenstop = (smallimagedata.h) / 2 - (lensdata.h) / 2;
                    $("div.jqZoomPup").show();
                    if (settings.lens) {
                        this.node.style.visibility = "visible"
                    } else {
                        this.node.style.visibility = "hidden";
                        $("div.jqZoomPup").hide()
                    }
                    firstime = 1
                } else {
                    var lensleft = mousepos.x - smallimagedata.pos.l - (lensdata.w) / 2;
                    var lenstop = mousepos.y - smallimagedata.pos.t - (lensdata.h) / 2
                }
                if (overleft()) {
                    lensleft = 0 + bleft
                } else {
                    if (overright()) {
                        if ($.browser.msie) {
                            lensleft = smallimagedata.w - lensdata.w + bleft + 1
                        } else {
                            lensleft = smallimagedata.w - lensdata.w + bleft - 1
                        }
                    }
                }
                if (overtop()) {
                    lenstop = 0 + btop
                } else {
                    if (overbottom()) {
                        if ($.browser.msie) {
                            lenstop = smallimagedata.h - lensdata.h + btop + 1
                        } else {
                            lenstop = smallimagedata.h - lensdata.h - 1 + btop
                        }
                    }
                }
                lensleft = parseInt(lensleft);
                lenstop = parseInt(lenstop);
                $("div.jqZoomPup", a).css({top:lenstop,left:lensleft});
                if (settings.zoomType == "reverse") {
                    $("div.jqZoomPup img", a).css({position:"absolute",top:-(lenstop - btop + 1),left:-(lensleft - bleft + 1)})
                }
                this.node.style.left = lensleft + "px";
                this.node.style.top = lenstop + "px";
                largeimage.setposition();
                function overleft() {
                    return mousepos.x - (lensdata.w + 2 * 1) / 2 - bleft < smallimagedata.pos.l
                }

                function overright() {
                    return mousepos.x + (lensdata.w + 2 * 1) / 2 > smallimagedata.pos.r + bleft
                }

                function overtop() {
                    return mousepos.y - (lensdata.h + 2 * 1) / 2 - btop < smallimagedata.pos.t
                }

                function overbottom() {
                    return mousepos.y + (lensdata.h + 2 * 1) / 2 > smallimagedata.pos.b + btop
                }

                return this
            };
            Lens.prototype.center = function() {
                $("div.jqZoomPup", a).css("display", "none");
                var lensleft = (smallimagedata.w) / 2 - (lensdata.w) / 2;
                var lenstop = (smallimagedata.h) / 2 - (lensdata.h) / 2;
                this.node.style.left = lensleft + "px";
                this.node.style.top = lenstop + "px";
                $("div.jqZoomPup", a).css({top:lenstop,left:lensleft});
                if (settings.zoomType == "reverse") {
                    $("div.jqZoomPup img", a).css({position:"absolute",top:-(lenstop - btop + 1),left:-(lensleft - bleft + 1)})
                }
                largeimage.setposition();
                if ($.browser.msie) {
                    $("div.jqZoomPup", a).show()
                } else {
                    setTimeout(function() {
                        $("div.jqZoomPup").fadeIn("fast")
                    }, 10)
                }
            };
            Lens.prototype.getoffset = function() {
                var o = {};
                o.left = parseInt(this.node.style.left);
                o.top = parseInt(this.node.style.top);
                return o
            };
            Lens.prototype.remove = function() {
                if (settings.zoomType == "innerzoom") {
                    $("div.jqZoomPup", a).fadeOut("fast", function() {
                        $(this).remove()
                    })
                } else {
                    $("div.jqZoomPup", a).remove()
                }
            };
            Lens.prototype.findborder = function() {
                var bordertop = "";
                bordertop = $("div.jqZoomPup").css("borderTop");
                lensbtop = "";
                var borderleft = "";
                borderleft = $("div.jqZoomPup").css("borderLeft");
                lensbleft = "";
                if ($.browser.msie) {
                    var temp = bordertop.split(" ");
                    bordertop = temp[1];
                    var temp = borderleft.split(" ");
                    borderleft = temp[1]
                }
                if (bordertop) {
                    for (i = 0; i < 3; i++) {
                        var x = [];
                        x = bordertop.substr(i, 1);
                        if (isNaN(x) == false) {
                            lensbtop = lensbtop + "" + bordertop.substr(i, 1)
                        } else {
                            break
                        }
                    }
                }
                if (borderleft) {
                    for (i = 0; i < 3; i++) {
                        if (!isNaN(borderleft.substr(i, 1))) {
                            lensbleft = lensbleft + borderleft.substr(i, 1)
                        } else {
                            break
                        }
                    }
                }
                lensbtop = (lensbtop.length > 0) ? eval(lensbtop) : 0;
                lensbleft = (lensbleft.length > 0) ? eval(lensbleft) : 0
            };
            function Largeimage(url) {
                this.url = url;
                this.node = new Image();
                this.loadimage = function() {
                    if (!this.node) {
                        this.node = new Image()
                    }
                    this.node.style.position = "absolute";
                    this.node.style.display = "none";
                    this.node.style.left = "-5000px";
                    this.node.style.top = "10px";
                    loader = new Loader();
                    if (settings.showPreload && !preloadshow) {
                        loader.show();
                        preloadshow = true
                    }
                    document.body.appendChild(this.node);
                    this.node.src = this.url
                };
                this.node.onload = function() {
                    this.style.display = "block";
                    var w = Math.round($(this).width());
                    var h = Math.round($(this).height());
                    this.style.display = "none";
                    scale.x = (w / smallimagedata.w);
                    scale.y = (h / smallimagedata.h);
                    if ($("div.preload").length > 0) {
                        $("div.preload").remove()
                    }
                    largeimageloaded = true;
                    if (settings.zoomType != "innerzoom" && running) {
                        stage = new Stage();
                        stage.activate()
                    }
                    if (running) {
                        lens = new Lens();
                        lens.activate()
                    }
                    if ($("div.preload").length > 0) {
                        $("div.preload").remove()
                    }
                };
                return this
            }

            Largeimage.prototype.setposition = function() {
                this.node.style.left = Math.ceil(-scale.x * parseInt(lens.getoffset().left) + bleft) + "px";
                this.node.style.top = Math.ceil(-scale.y * parseInt(lens.getoffset().top) + btop) + "px"
            };
            Largeimage.prototype.setinner = function(e) {
                this.node.style.left = Math.ceil(-scale.x * Math.abs(e.pageX - smallimagedata.pos.l)) + "px";
                this.node.style.top = Math.ceil(-scale.y * Math.abs(e.pageY - smallimagedata.pos.t)) + "px";
                $("div.jqZoomPup img", a).css({position:"absolute",top:this.node.style.top,left:this.node.style.left})
            };
            Largeimage.prototype.setcenter = function() {
                this.node.style.left = Math.ceil(-scale.x * Math.abs((smallimagedata.w) / 2)) + "px";
                this.node.style.top = Math.ceil(-scale.y * Math.abs((smallimagedata.h) / 2)) + "px";
                $("div.jqZoomPup img", a).css({position:"absolute",top:this.node.style.top,left:this.node.style.left})
            };
            function Stage() {
                var leftpos = smallimagedata.pos.l;
                var toppos = smallimagedata.pos.t;
                this.node = document.createElement("div");
                $(this.node).addClass("jqZoomWindow");
                $(this.node).css({position:"absolute",width:Math.round(settings.zoomWidth) + "px",height:Math.round(settings.zoomHeight) + "px",display:"none",zIndex:10000,overflow:"hidden"});
                switch (settings.position) {
                    case"right":
                        leftpos = (smallimagedata.pos.r + Math.abs(settings.xOffset) + settings.zoomWidth < screen.width) ? (smallimagedata.pos.l + smallimagedata.w + Math.abs(settings.xOffset)) : (smallimagedata.pos.l - settings.zoomWidth - Math.abs(settings.xOffset));
                        topwindow = smallimagedata.pos.t + settings.yOffset + settings.zoomHeight;
                        toppos = (topwindow < screen.height && topwindow > 0) ? smallimagedata.pos.t + settings.yOffset : smallimagedata.pos.t;
                        break;
                    case"left":
                        leftpos = (smallimagedata.pos.l - Math.abs(settings.xOffset) - settings.zoomWidth > 0) ? (smallimagedata.pos.l - Math.abs(settings.xOffset) - settings.zoomWidth) : (smallimagedata.pos.l + smallimagedata.w + Math.abs(settings.xOffset));
                        topwindow = smallimagedata.pos.t + settings.yOffset + settings.zoomHeight;
                        toppos = (topwindow < screen.height && topwindow > 0) ? smallimagedata.pos.t + settings.yOffset : smallimagedata.pos.t;
                        break;
                    case"top":
                        toppos = (smallimagedata.pos.t - Math.abs(settings.yOffset) - settings.zoomHeight > 0) ? (smallimagedata.pos.t - Math.abs(settings.yOffset) - settings.zoomHeight) : (smallimagedata.pos.t + smallimagedata.h + Math.abs(settings.yOffset));
                        leftwindow = smallimagedata.pos.l + settings.xOffset + settings.zoomWidth;
                        leftpos = (leftwindow < screen.width && leftwindow > 0) ? smallimagedata.pos.l + settings.xOffset : smallimagedata.pos.l;
                        break;
                    case"bottom":
                        toppos = (smallimagedata.pos.b + Math.abs(settings.yOffset) + settings.zoomHeight < $("body").height()) ? (smallimagedata.pos.b + Math.abs(settings.yOffset)) : (smallimagedata.pos.t - settings.zoomHeight - Math.abs(settings.yOffset));
                        leftwindow = smallimagedata.pos.l + settings.xOffset + settings.zoomWidth;
                        leftpos = (leftwindow < screen.width && leftwindow > 0) ? smallimagedata.pos.l + settings.xOffset : smallimagedata.pos.l;
                        break;
                    default:
                        leftpos = (smallimagedata.pos.l + smallimagedata.w + settings.xOffset + settings.zoomWidth < screen.width) ? (smallimagedata.pos.l + smallimagedata.w + Math.abs(settings.xOffset)) : (smallimagedata.pos.l - settings.zoomWidth - Math.abs(settings.xOffset));
                        toppos = (smallimagedata.pos.b + Math.abs(settings.yOffset) + settings.zoomHeight < screen.height) ? (smallimagedata.pos.b + Math.abs(settings.yOffset)) : (smallimagedata.pos.t - settings.zoomHeight - Math.abs(settings.yOffset));
                        break
                }
                this.node.style.left = leftpos + "px";
                this.node.style.top = toppos + "px";
                return this
            }

            Stage.prototype.activate = function() {
                if (!this.node.firstChild) {
                    this.node.appendChild(largeimage.node)
                }
                if (settings.title) {
                    ZoomTitleObj.loadtitle()
                }
                document.body.appendChild(this.node);
                switch (settings.showEffect) {
                    case"show":
                        $(this.node).show();
                        break;
                    case"fadein":
                        $(this.node).fadeIn(settings.fadeinSpeed);
                        break;
                    default:
                        $(this.node).show();
                        break
                }
                $(this.node).show();
                if ($.browser.msie && $.browser.version < 7) {
                    this.ieframe = $('<iframe class="zoom_ieframe" frameborder="0" src="#"></iframe>').css({position:"absolute",left:this.node.style.left,top:this.node.style.top,zIndex:99,width:settings.zoomWidth,height:settings.zoomHeight}).insertBefore(this.node)
                }
                largeimage.node.style.display = "block"
            };
            Stage.prototype.remove = function() {
                switch (settings.hideEffect) {
                    case"hide":
                        $(".jqZoomWindow").remove();
                        break;
                    case"fadeout":
                        $(".jqZoomWindow").fadeOut(settings.fadeoutSpeed);
                        break;
                    default:
                        $(".jqZoomWindow").remove();
                        break
                }
            };
            function zoomTitle() {
                this.node = jQuery("<div />").addClass("jqZoomTitle").html("" + ZoomTitle + "");
                this.loadtitle = function() {
                    if (settings.zoomType == "innerzoom") {
                        $(this.node).css({position:"absolute",top:smallimagedata.pos.b + 3,left:(smallimagedata.pos.l + 1),width:smallimagedata.w}).appendTo("body")
                    } else {
                        $(this.node).appendTo(stage.node)
                    }
                }
            }

            zoomTitle.prototype.remove = function() {
                $(".jqZoomTitle").remove()
            };
            function Loader() {
                this.node = document.createElement("div");
                $(this.node).addClass("preload");
                $(this.node).html(settings.preloadText);
                $(this.node).appendTo("body").css("visibility", "hidden");
                this.show = function() {
                    switch (settings.preloadPosition) {
                        case"center":
                            loadertop = smallimagedata.pos.t + (smallimagedata.h - $(this.node).height()) / 2;
                            loaderleft = smallimagedata.pos.l + (smallimagedata.w - $(this.node).width()) / 2;
                            break;
                        default:
                            var loaderoffset = this.getoffset();
                            loadertop = !isNaN(loaderoffset.top) ? smallimagedata.pos.t + loaderoffset.top : smallimagedata.pos.t + 0;
                            loaderleft = !isNaN(loaderoffset.left) ? smallimagedata.pos.l + loaderoffset.left : smallimagedata.pos.l + 0;
                            break
                    }
                    $(this.node).css({top:loadertop,left:loaderleft,position:"absolute",visibility:"visible"})
                };
                return this
            }

            Loader.prototype.getoffset = function() {
                var o = null;
                o = $("div.preload").offset();
                return o
            }
        })
    }
})(jQuery);
function trim(stringa) {
    while (stringa.substring(0, 1) == " ") {
        stringa = stringa.substring(1, stringa.length)
    }
    while (stringa.substring(stringa.length - 1, stringa.length) == " ") {
        stringa = stringa.substring(0, stringa.length - 1)
    }
    return stringa
}
;