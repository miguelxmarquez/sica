/*!
 * jQuery UI 1.8.2
 *
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI
 */
(function(c){
    c.ui=c.ui||{};
    
    if(!c.ui.version){
        c.extend(c.ui,{
            version:"1.8.2",
            plugin:{
                add:function(a,b,d){
                    a=c.ui[a].prototype;
                    for(var e in d){
                        a.plugins[e]=a.plugins[e]||[];
                        a.plugins[e].push([b,d[e]])
                    }
                },
                call:function(a,b,d){
                    if((b=a.plugins[b])&&a.element[0].parentNode)for(var e=0;e<b.length;e++)a.options[b[e][0]]&&b[e][1].apply(a.element,d)
                }
            },
            contains:function(a,b){
                return document.compareDocumentPosition?a.compareDocumentPosition(b)&16:a!==b&&a.contains(b)
            },
            hasScroll:function(a,b){
                if(c(a).css("overflow")==
                    "hidden")return false;
                b=b&&b=="left"?"scrollLeft":"scrollTop";
                var d=false;
                if(a[b]>0)return true;
                a[b]=1;
                d=a[b]>0;
                a[b]=0;
                return d
            },
            isOverAxis:function(a,b,d){
                return a>b&&a<b+d
            },
            isOver:function(a,b,d,e,f,g){
                return c.ui.isOverAxis(a,d,f)&&c.ui.isOverAxis(b,e,g)
            },
            keyCode:{
                ALT:18,
                BACKSPACE:8,
                CAPS_LOCK:20,
                COMMA:188,
                COMMAND:91,
                COMMAND_LEFT:91,
                COMMAND_RIGHT:93,
                CONTROL:17,
                DELETE:46,
                DOWN:40,
                END:35,
                ENTER:13,
                ESCAPE:27,
                HOME:36,
                INSERT:45,
                LEFT:37,
                MENU:93,
                NUMPAD_ADD:107,
                NUMPAD_DECIMAL:110,
                NUMPAD_DIVIDE:111,
                NUMPAD_ENTER:108,
                NUMPAD_MULTIPLY:106,
                NUMPAD_SUBTRACT:109,
                PAGE_DOWN:34,
                PAGE_UP:33,
                PERIOD:190,
                RIGHT:39,
                SHIFT:16,
                SPACE:32,
                TAB:9,
                UP:38,
                WINDOWS:91
            }
        });
        c.fn.extend({
            _focus:c.fn.focus,
            focus:function(a,b){
                return typeof a==="number"?this.each(function(){
                    var d=this;
                    setTimeout(function(){
                        c(d).focus();
                        b&&b.call(d)
                    },a)
                }):this._focus.apply(this,arguments)
            },
            enableSelection:function(){
                return this.attr("unselectable","off").css("MozUserSelect","")
            },
            disableSelection:function(){
                return this.attr("unselectable","on").css("MozUserSelect",
                    "none")
            },
            scrollParent:function(){
                var a;
                a=c.browser.msie&&/(static|relative)/.test(this.css("position"))||/absolute/.test(this.css("position"))?this.parents().filter(function(){
                    return/(relative|absolute|fixed)/.test(c.curCSS(this,"position",1))&&/(auto|scroll)/.test(c.curCSS(this,"overflow",1)+c.curCSS(this,"overflow-y",1)+c.curCSS(this,"overflow-x",1))
                }).eq(0):this.parents().filter(function(){
                    return/(auto|scroll)/.test(c.curCSS(this,"overflow",1)+c.curCSS(this,"overflow-y",1)+c.curCSS(this,"overflow-x",
                        1))
                }).eq(0);
                return/fixed/.test(this.css("position"))||!a.length?c(document):a
            },
            zIndex:function(a){
                if(a!==undefined)return this.css("zIndex",a);
                if(this.length){
                    a=c(this[0]);
                    for(var b;a.length&&a[0]!==document;){
                        b=a.css("position");
                        if(b=="absolute"||b=="relative"||b=="fixed"){
                            b=parseInt(a.css("zIndex"));
                            if(!isNaN(b)&&b!=0)return b
                        }
                        a=a.parent()
                    }
                }
                return 0
            }
        });
        c.extend(c.expr[":"],{
            data:function(a,b,d){
                return!!c.data(a,d[3])
            },
            focusable:function(a){
                var b=a.nodeName.toLowerCase(),d=c.attr(a,"tabindex");
                return(/input|select|textarea|button|object/.test(b)?
                    !a.disabled:"a"==b||"area"==b?a.href||!isNaN(d):!isNaN(d))&&!c(a)["area"==b?"parents":"closest"](":hidden").length
            },
            tabbable:function(a){
                var b=c.attr(a,"tabindex");
                return(isNaN(b)||b>=0)&&c(a).is(":focusable")
            }
        })
    }
})(jQuery);
;/*!
 * jQuery UI Widget 1.8.2
 *
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Widget
 */
(function(b){
    var j=b.fn.remove;
    b.fn.remove=function(a,c){
        return this.each(function(){
            if(!c)if(!a||b.filter(a,[this]).length)b("*",this).add(this).each(function(){
                b(this).triggerHandler("remove")
            });
            return j.call(b(this),a,c)
        })
    };
        
    b.widget=function(a,c,d){
        var e=a.split(".")[0],f;
        a=a.split(".")[1];
        f=e+"-"+a;
        if(!d){
            d=c;
            c=b.Widget
        }
        b.expr[":"][f]=function(h){
            return!!b.data(h,a)
        };
            
        b[e]=b[e]||{};
        
        b[e][a]=function(h,g){
            arguments.length&&this._createWidget(h,g)
        };
            
        c=new c;
        c.options=b.extend({},c.options);
        b[e][a].prototype=
        b.extend(true,c,{
            namespace:e,
            widgetName:a,
            widgetEventPrefix:b[e][a].prototype.widgetEventPrefix||a,
            widgetBaseClass:f
        },d);
        b.widget.bridge(a,b[e][a])
    };
        
    b.widget.bridge=function(a,c){
        b.fn[a]=function(d){
            var e=typeof d==="string",f=Array.prototype.slice.call(arguments,1),h=this;
            d=!e&&f.length?b.extend.apply(null,[true,d].concat(f)):d;
            if(e&&d.substring(0,1)==="_")return h;
            e?this.each(function(){
                var g=b.data(this,a),i=g&&b.isFunction(g[d])?g[d].apply(g,f):g;
                if(i!==g&&i!==undefined){
                    h=i;
                    return false
                }
            }):this.each(function(){
                var g=
                b.data(this,a);
                if(g){
                    d&&g.option(d);
                    g._init()
                }else b.data(this,a,new c(d,this))
            });
            return h
        }
    };

    b.Widget=function(a,c){
        arguments.length&&this._createWidget(a,c)
    };
    
    b.Widget.prototype={
        widgetName:"widget",
        widgetEventPrefix:"",
        options:{
            disabled:false
        },
        _createWidget:function(a,c){
            this.element=b(c).data(this.widgetName,this);
            this.options=b.extend(true,{},this.options,b.metadata&&b.metadata.get(c)[this.widgetName],a);
            var d=this;
            this.element.bind("remove."+this.widgetName,function(){
                d.destroy()
            });
            this._create();
            this._init()
        },
        _create:function(){},
        _init:function(){},
        destroy:function(){
            this.element.unbind("."+this.widgetName).removeData(this.widgetName);
            this.widget().unbind("."+this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass+"-disabled ui-state-disabled")
        },
        widget:function(){
            return this.element
        },
        option:function(a,c){
            var d=a,e=this;
            if(arguments.length===0)return b.extend({},e.options);
            if(typeof a==="string"){
                if(c===undefined)return this.options[a];
                d={};
            
                d[a]=c
            }
            b.each(d,function(f,
                h){
                e._setOption(f,h)
            });
            return e
        },
        _setOption:function(a,c){
            this.options[a]=c;
            if(a==="disabled")this.widget()[c?"addClass":"removeClass"](this.widgetBaseClass+"-disabled ui-state-disabled").attr("aria-disabled",c);
            return this
        },
        enable:function(){
            return this._setOption("disabled",false)
        },
        disable:function(){
            return this._setOption("disabled",true)
        },
        _trigger:function(a,c,d){
            var e=this.options[a];
            c=b.Event(c);
            c.type=(a===this.widgetEventPrefix?a:this.widgetEventPrefix+a).toLowerCase();
            d=d||{};
        
            if(c.originalEvent){
                a=
                b.event.props.length;
                for(var f;a;){
                    f=b.event.props[--a];
                    c[f]=c.originalEvent[f]
                }
            }
            this.element.trigger(c,d);
            return!(b.isFunction(e)&&e.call(this.element[0],c,d)===false||c.isDefaultPrevented())
        }
    }
})(jQuery);
;/*!
 * jQuery UI Mouse 1.8.2
 *
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Mouse
 *
 * Depends:
 *	jquery.ui.widget.js
 */
(function(c){
    c.widget("ui.mouse",{
        options:{
            cancel:":input,option",
            distance:1,
            delay:0
        },
        _mouseInit:function(){
            var a=this;
            this.element.bind("mousedown."+this.widgetName,function(b){
                return a._mouseDown(b)
            }).bind("click."+this.widgetName,function(b){
                if(a._preventClickEvent){
                    a._preventClickEvent=false;
                    b.stopImmediatePropagation();
                    return false
                }
            });
            this.started=false
        },
        _mouseDestroy:function(){
            this.element.unbind("."+this.widgetName)
        },
        _mouseDown:function(a){
            a.originalEvent=a.originalEvent||{};
        
            if(!a.originalEvent.mouseHandled){
                this._mouseStarted&&
                this._mouseUp(a);
                this._mouseDownEvent=a;
                var b=this,e=a.which==1,f=typeof this.options.cancel=="string"?c(a.target).parents().add(a.target).filter(this.options.cancel).length:false;
                if(!e||f||!this._mouseCapture(a))return true;
                this.mouseDelayMet=!this.options.delay;
                if(!this.mouseDelayMet)this._mouseDelayTimer=setTimeout(function(){
                    b.mouseDelayMet=true
                },this.options.delay);
                if(this._mouseDistanceMet(a)&&this._mouseDelayMet(a)){
                    this._mouseStarted=this._mouseStart(a)!==false;
                    if(!this._mouseStarted){
                        a.preventDefault();
                        return true
                    }
                }
                this._mouseMoveDelegate=function(d){
                    return b._mouseMove(d)
                };
            
                this._mouseUpDelegate=function(d){
                    return b._mouseUp(d)
                };
            
                c(document).bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate);
                c.browser.safari||a.preventDefault();
                return a.originalEvent.mouseHandled=true
            }
        },
        _mouseMove:function(a){
            if(c.browser.msie&&!a.button)return this._mouseUp(a);
            if(this._mouseStarted){
                this._mouseDrag(a);
                return a.preventDefault()
            }
            if(this._mouseDistanceMet(a)&&
                this._mouseDelayMet(a))(this._mouseStarted=this._mouseStart(this._mouseDownEvent,a)!==false)?this._mouseDrag(a):this._mouseUp(a);
            return!this._mouseStarted
        },
        _mouseUp:function(a){
            c(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate);
            if(this._mouseStarted){
                this._mouseStarted=false;
                this._preventClickEvent=a.target==this._mouseDownEvent.target;
                this._mouseStop(a)
            }
            return false
        },
        _mouseDistanceMet:function(a){
            return Math.max(Math.abs(this._mouseDownEvent.pageX-
                a.pageX),Math.abs(this._mouseDownEvent.pageY-a.pageY))>=this.options.distance
        },
        _mouseDelayMet:function(){
            return this.mouseDelayMet
        },
        _mouseStart:function(){},
        _mouseDrag:function(){},
        _mouseStop:function(){},
        _mouseCapture:function(){
            return true
        }
    })
})(jQuery);
;/*
 * jQuery UI Position 1.8.2
 *
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Position
 */
(function(c){
    c.ui=c.ui||{};
    
    var m=/left|center|right/,n=/top|center|bottom/,p=c.fn.position,q=c.fn.offset;
    c.fn.position=function(a){
        if(!a||!a.of)return p.apply(this,arguments);
        a=c.extend({},a);
        var b=c(a.of),d=(a.collision||"flip").split(" "),e=a.offset?a.offset.split(" "):[0,0],g,h,i;
        if(a.of.nodeType===9){
            g=b.width();
            h=b.height();
            i={
                top:0,
                left:0
            }
        }else if(a.of.scrollTo&&a.of.document){
            g=b.width();
            h=b.height();
            i={
                top:b.scrollTop(),
                left:b.scrollLeft()
            }
        }else if(a.of.preventDefault){
            a.at="left top";
            g=h=
            0;
            i={
                top:a.of.pageY,
                left:a.of.pageX
            }
        }else{
            g=b.outerWidth();
            h=b.outerHeight();
            i=b.offset()
        }
        c.each(["my","at"],function(){
            var f=(a[this]||"").split(" ");
            if(f.length===1)f=m.test(f[0])?f.concat(["center"]):n.test(f[0])?["center"].concat(f):["center","center"];
            f[0]=m.test(f[0])?f[0]:"center";
            f[1]=n.test(f[1])?f[1]:"center";
            a[this]=f
        });
        if(d.length===1)d[1]=d[0];
        e[0]=parseInt(e[0],10)||0;
        if(e.length===1)e[1]=e[0];
        e[1]=parseInt(e[1],10)||0;
        if(a.at[0]==="right")i.left+=g;
        else if(a.at[0]==="center")i.left+=
            g/2;
        if(a.at[1]==="bottom")i.top+=h;
        else if(a.at[1]==="center")i.top+=h/2;
        i.left+=e[0];
        i.top+=e[1];
        return this.each(function(){
            var f=c(this),k=f.outerWidth(),l=f.outerHeight(),j=c.extend({},i);
            if(a.my[0]==="right")j.left-=k;
            else if(a.my[0]==="center")j.left-=k/2;
            if(a.my[1]==="bottom")j.top-=l;
            else if(a.my[1]==="center")j.top-=l/2;
            j.left=parseInt(j.left);
            j.top=parseInt(j.top);
            c.each(["left","top"],function(o,r){
                c.ui.position[d[o]]&&c.ui.position[d[o]][r](j,{
                    targetWidth:g,
                    targetHeight:h,
                    elemWidth:k,
                    elemHeight:l,
                    offset:e,
                    my:a.my,
                    at:a.at
                })
            });
            c.fn.bgiframe&&f.bgiframe();
            f.offset(c.extend(j,{
                using:a.using
            }))
        })
    };

    c.ui.position={
        fit:{
            left:function(a,b){
                var d=c(window);
                b=a.left+b.elemWidth-d.width()-d.scrollLeft();
                a.left=b>0?a.left-b:Math.max(0,a.left)
            },
            top:function(a,b){
                var d=c(window);
                b=a.top+b.elemHeight-d.height()-d.scrollTop();
                a.top=b>0?a.top-b:Math.max(0,a.top)
            }
        },
        flip:{
            left:function(a,b){
                if(b.at[0]!=="center"){
                    var d=c(window);
                    d=a.left+b.elemWidth-d.width()-d.scrollLeft();
                    var e=b.my[0]==="left"?
                    -b.elemWidth:b.my[0]==="right"?b.elemWidth:0,g=-2*b.offset[0];
                    a.left+=a.left<0?e+b.targetWidth+g:d>0?e-b.targetWidth+g:0
                }
            },
            top:function(a,b){
                if(b.at[1]!=="center"){
                    var d=c(window);
                    d=a.top+b.elemHeight-d.height()-d.scrollTop();
                    var e=b.my[1]==="top"?-b.elemHeight:b.my[1]==="bottom"?b.elemHeight:0,g=b.at[1]==="top"?b.targetHeight:-b.targetHeight,h=-2*b.offset[1];
                    a.top+=a.top<0?e+b.targetHeight+h:d>0?e+g+h:0
                }
            }
        }
    };

    if(!c.offset.setOffset){
        c.offset.setOffset=function(a,b){
            if(/static/.test(c.curCSS(a,"position")))a.style.position=
                "relative";
            var d=c(a),e=d.offset(),g=parseInt(c.curCSS(a,"top",true),10)||0,h=parseInt(c.curCSS(a,"left",true),10)||0;
            e={
                top:b.top-e.top+g,
                left:b.left-e.left+h
            };
            
            "using"in b?b.using.call(a,e):d.css(e)
        };
        
        c.fn.offset=function(a){
            var b=this[0];
            if(!b||!b.ownerDocument)return null;
            if(a)return this.each(function(){
                c.offset.setOffset(this,a)
            });
            return q.call(this)
        }
    }
})(jQuery);
;/*
 * jQuery UI Draggable 1.8.2
 *
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Draggables
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.mouse.js
 *	jquery.ui.widget.js
 */
(function(d){
    d.widget("ui.draggable",d.ui.mouse,{
        widgetEventPrefix:"drag",
        options:{
            addClasses:true,
            appendTo:"parent",
            axis:false,
            connectToSortable:false,
            containment:false,
            cursor:"auto",
            cursorAt:false,
            grid:false,
            handle:false,
            helper:"original",
            iframeFix:false,
            opacity:false,
            refreshPositions:false,
            revert:false,
            revertDuration:500,
            scope:"default",
            scroll:true,
            scrollSensitivity:20,
            scrollSpeed:20,
            snap:false,
            snapMode:"both",
            snapTolerance:20,
            stack:false,
            zIndex:false
        },
        _create:function(){
            if(this.options.helper==
                "original"&&!/^(?:r|a|f)/.test(this.element.css("position")))this.element[0].style.position="relative";
            this.options.addClasses&&this.element.addClass("ui-draggable");
            this.options.disabled&&this.element.addClass("ui-draggable-disabled");
            this._mouseInit()
        },
        destroy:function(){
            if(this.element.data("draggable")){
                this.element.removeData("draggable").unbind(".draggable").removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled");
                this._mouseDestroy();
                return this
            }
        },
        _mouseCapture:function(a){
            var b=
            this.options;
            if(this.helper||b.disabled||d(a.target).is(".ui-resizable-handle"))return false;
            this.handle=this._getHandle(a);
            if(!this.handle)return false;
            return true
        },
        _mouseStart:function(a){
            var b=this.options;
            this.helper=this._createHelper(a);
            this._cacheHelperProportions();
            if(d.ui.ddmanager)d.ui.ddmanager.current=this;
            this._cacheMargins();
            this.cssPosition=this.helper.css("position");
            this.scrollParent=this.helper.scrollParent();
            this.offset=this.positionAbs=this.element.offset();
            this.offset={
                top:this.offset.top-
                this.margins.top,
                left:this.offset.left-this.margins.left
            };
            
            d.extend(this.offset,{
                click:{
                    left:a.pageX-this.offset.left,
                    top:a.pageY-this.offset.top
                },
                parent:this._getParentOffset(),
                relative:this._getRelativeOffset()
            });
            this.originalPosition=this.position=this._generatePosition(a);
            this.originalPageX=a.pageX;
            this.originalPageY=a.pageY;
            b.cursorAt&&this._adjustOffsetFromHelper(b.cursorAt);
            b.containment&&this._setContainment();
            if(this._trigger("start",a)===false){
                this._clear();
                return false
            }
            this._cacheHelperProportions();
            d.ui.ddmanager&&!b.dropBehaviour&&d.ui.ddmanager.prepareOffsets(this,a);
            this.helper.addClass("ui-draggable-dragging");
            this._mouseDrag(a,true);
            return true
        },
        _mouseDrag:function(a,b){
            this.position=this._generatePosition(a);
            this.positionAbs=this._convertPositionTo("absolute");
            if(!b){
                b=this._uiHash();
                if(this._trigger("drag",a,b)===false){
                    this._mouseUp({});
                    return false
                }
                this.position=b.position
            }
            if(!this.options.axis||this.options.axis!="y")this.helper[0].style.left=this.position.left+"px";
            if(!this.options.axis||
                this.options.axis!="x")this.helper[0].style.top=this.position.top+"px";
            d.ui.ddmanager&&d.ui.ddmanager.drag(this,a);
            return false
        },
        _mouseStop:function(a){
            var b=false;
            if(d.ui.ddmanager&&!this.options.dropBehaviour)b=d.ui.ddmanager.drop(this,a);
            if(this.dropped){
                b=this.dropped;
                this.dropped=false
            }
            if(!this.element[0]||!this.element[0].parentNode)return false;
            if(this.options.revert=="invalid"&&!b||this.options.revert=="valid"&&b||this.options.revert===true||d.isFunction(this.options.revert)&&this.options.revert.call(this.element,
                b)){
                var c=this;
                d(this.helper).animate(this.originalPosition,parseInt(this.options.revertDuration,10),function(){
                    c._trigger("stop",a)!==false&&c._clear()
                })
            }else this._trigger("stop",a)!==false&&this._clear();
            return false
        },
        cancel:function(){
            this.helper.is(".ui-draggable-dragging")?this._mouseUp({}):this._clear();
            return this
        },
        _getHandle:function(a){
            var b=!this.options.handle||!d(this.options.handle,this.element).length?true:false;
            d(this.options.handle,this.element).find("*").andSelf().each(function(){
                if(this==
                    a.target)b=true
            });
            return b
        },
        _createHelper:function(a){
            var b=this.options;
            a=d.isFunction(b.helper)?d(b.helper.apply(this.element[0],[a])):b.helper=="clone"?this.element.clone():this.element;
            a.parents("body").length||a.appendTo(b.appendTo=="parent"?this.element[0].parentNode:b.appendTo);
            a[0]!=this.element[0]&&!/(fixed|absolute)/.test(a.css("position"))&&a.css("position","absolute");
            return a
        },
        _adjustOffsetFromHelper:function(a){
            if(typeof a=="string")a=a.split(" ");
            if(d.isArray(a))a={
                left:+a[0],
                top:+a[1]||
                0
            };
            
            if("left"in a)this.offset.click.left=a.left+this.margins.left;
            if("right"in a)this.offset.click.left=this.helperProportions.width-a.right+this.margins.left;
            if("top"in a)this.offset.click.top=a.top+this.margins.top;
            if("bottom"in a)this.offset.click.top=this.helperProportions.height-a.bottom+this.margins.top
        },
        _getParentOffset:function(){
            this.offsetParent=this.helper.offsetParent();
            var a=this.offsetParent.offset();
            if(this.cssPosition=="absolute"&&this.scrollParent[0]!=document&&d.ui.contains(this.scrollParent[0],
                this.offsetParent[0])){
                a.left+=this.scrollParent.scrollLeft();
                a.top+=this.scrollParent.scrollTop()
            }
            if(this.offsetParent[0]==document.body||this.offsetParent[0].tagName&&this.offsetParent[0].tagName.toLowerCase()=="html"&&d.browser.msie)a={
                top:0,
                left:0
            };
        
            return{
                top:a.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),
                left:a.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)
            }
        },
        _getRelativeOffset:function(){
            if(this.cssPosition=="relative"){
                var a=this.element.position();
                return{
                    top:a.top-
                    (parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),
                    left:a.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()
                }
            }else return{
                top:0,
                left:0
            }
        },
        _cacheMargins:function(){
            this.margins={
                left:parseInt(this.element.css("marginLeft"),10)||0,
                top:parseInt(this.element.css("marginTop"),10)||0
            }
        },
        _cacheHelperProportions:function(){
            this.helperProportions={
                width:this.helper.outerWidth(),
                height:this.helper.outerHeight()
            }
        },
        _setContainment:function(){
            var a=this.options;
            if(a.containment==
                "parent")a.containment=this.helper[0].parentNode;
            if(a.containment=="document"||a.containment=="window")this.containment=[0-this.offset.relative.left-this.offset.parent.left,0-this.offset.relative.top-this.offset.parent.top,d(a.containment=="document"?document:window).width()-this.helperProportions.width-this.margins.left,(d(a.containment=="document"?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top];
            if(!/^(document|window|parent)$/.test(a.containment)&&
                a.containment.constructor!=Array){
                var b=d(a.containment)[0];
                if(b){
                    a=d(a.containment).offset();
                    var c=d(b).css("overflow")!="hidden";
                    this.containment=[a.left+(parseInt(d(b).css("borderLeftWidth"),10)||0)+(parseInt(d(b).css("paddingLeft"),10)||0)-this.margins.left,a.top+(parseInt(d(b).css("borderTopWidth"),10)||0)+(parseInt(d(b).css("paddingTop"),10)||0)-this.margins.top,a.left+(c?Math.max(b.scrollWidth,b.offsetWidth):b.offsetWidth)-(parseInt(d(b).css("borderLeftWidth"),10)||0)-(parseInt(d(b).css("paddingRight"),
                        10)||0)-this.helperProportions.width-this.margins.left,a.top+(c?Math.max(b.scrollHeight,b.offsetHeight):b.offsetHeight)-(parseInt(d(b).css("borderTopWidth"),10)||0)-(parseInt(d(b).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top]
                }
            }else if(a.containment.constructor==Array)this.containment=a.containment
        },
        _convertPositionTo:function(a,b){
            if(!b)b=this.position;
            a=a=="absolute"?1:-1;
            var c=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&d.ui.contains(this.scrollParent[0],
                this.offsetParent[0]))?this.offsetParent:this.scrollParent,f=/(html|body)/i.test(c[0].tagName);
            return{
                top:b.top+this.offset.relative.top*a+this.offset.parent.top*a-(d.browser.safari&&d.browser.version<526&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():f?0:c.scrollTop())*a),
                left:b.left+this.offset.relative.left*a+this.offset.parent.left*a-(d.browser.safari&&d.browser.version<526&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():
                    f?0:c.scrollLeft())*a)
            }
        },
        _generatePosition:function(a){
            var b=this.options,c=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&d.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,f=/(html|body)/i.test(c[0].tagName),e=a.pageX,g=a.pageY;
            if(this.originalPosition){
                if(this.containment){
                    if(a.pageX-this.offset.click.left<this.containment[0])e=this.containment[0]+this.offset.click.left;
                    if(a.pageY-this.offset.click.top<this.containment[1])g=this.containment[1]+
                        this.offset.click.top;
                    if(a.pageX-this.offset.click.left>this.containment[2])e=this.containment[2]+this.offset.click.left;
                    if(a.pageY-this.offset.click.top>this.containment[3])g=this.containment[3]+this.offset.click.top
                }
                if(b.grid){
                    g=this.originalPageY+Math.round((g-this.originalPageY)/b.grid[1])*b.grid[1];
                    g=this.containment?!(g-this.offset.click.top<this.containment[1]||g-this.offset.click.top>this.containment[3])?g:!(g-this.offset.click.top<this.containment[1])?g-b.grid[1]:g+b.grid[1]:g;
                    e=this.originalPageX+
                    Math.round((e-this.originalPageX)/b.grid[0])*b.grid[0];
                    e=this.containment?!(e-this.offset.click.left<this.containment[0]||e-this.offset.click.left>this.containment[2])?e:!(e-this.offset.click.left<this.containment[0])?e-b.grid[0]:e+b.grid[0]:e
                }
            }
            return{
                top:g-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+(d.browser.safari&&d.browser.version<526&&this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollTop():f?0:c.scrollTop()),
                left:e-this.offset.click.left-
                this.offset.relative.left-this.offset.parent.left+(d.browser.safari&&d.browser.version<526&&this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():f?0:c.scrollLeft())
            }
        },
        _clear:function(){
            this.helper.removeClass("ui-draggable-dragging");
            this.helper[0]!=this.element[0]&&!this.cancelHelperRemoval&&this.helper.remove();
            this.helper=null;
            this.cancelHelperRemoval=false
        },
        _trigger:function(a,b,c){
            c=c||this._uiHash();
            d.ui.plugin.call(this,a,[b,c]);
            if(a=="drag")this.positionAbs=
                this._convertPositionTo("absolute");
            return d.Widget.prototype._trigger.call(this,a,b,c)
        },
        plugins:{},
        _uiHash:function(){
            return{
                helper:this.helper,
                position:this.position,
                originalPosition:this.originalPosition,
                offset:this.positionAbs
            }
        }
    });
    d.extend(d.ui.draggable,{
        version:"1.8.2"
    });
    d.ui.plugin.add("draggable","connectToSortable",{
        start:function(a,b){
            var c=d(this).data("draggable"),f=c.options,e=d.extend({},b,{
                item:c.element
            });
            c.sortables=[];
            d(f.connectToSortable).each(function(){
                var g=d.data(this,"sortable");
                if(g&&!g.options.disabled){
                    c.sortables.push({
                        instance:g,
                        shouldRevert:g.options.revert
                    });
                    g._refreshItems();
                    g._trigger("activate",a,e)
                }
            })
        },
        stop:function(a,b){
            var c=d(this).data("draggable"),f=d.extend({},b,{
                item:c.element
            });
            d.each(c.sortables,function(){
                if(this.instance.isOver){
                    this.instance.isOver=0;
                    c.cancelHelperRemoval=true;
                    this.instance.cancelHelperRemoval=false;
                    if(this.shouldRevert)this.instance.options.revert=true;
                    this.instance._mouseStop(a);
                    this.instance.options.helper=this.instance.options._helper;
                    c.options.helper=="original"&&this.instance.currentItem.css({
                        top:"auto",
                        left:"auto"
                    })
                }else{
                    this.instance.cancelHelperRemoval=false;
                    this.instance._trigger("deactivate",a,f)
                }
            })
        },
        drag:function(a,b){
            var c=d(this).data("draggable"),f=this;
            d.each(c.sortables,function(){
                this.instance.positionAbs=c.positionAbs;
                this.instance.helperProportions=c.helperProportions;
                this.instance.offset.click=c.offset.click;
                if(this.instance._intersectsWith(this.instance.containerCache)){
                    if(!this.instance.isOver){
                        this.instance.isOver=
                        1;
                        this.instance.currentItem=d(f).clone().appendTo(this.instance.element).data("sortable-item",true);
                        this.instance.options._helper=this.instance.options.helper;
                        this.instance.options.helper=function(){
                            return b.helper[0]
                        };
                    
                        a.target=this.instance.currentItem[0];
                        this.instance._mouseCapture(a,true);
                        this.instance._mouseStart(a,true,true);
                        this.instance.offset.click.top=c.offset.click.top;
                        this.instance.offset.click.left=c.offset.click.left;
                        this.instance.offset.parent.left-=c.offset.parent.left-this.instance.offset.parent.left;
                        this.instance.offset.parent.top-=c.offset.parent.top-this.instance.offset.parent.top;
                        c._trigger("toSortable",a);
                        c.dropped=this.instance.element;
                        c.currentItem=c.element;
                        this.instance.fromOutside=c
                    }
                    this.instance.currentItem&&this.instance._mouseDrag(a)
                }else if(this.instance.isOver){
                    this.instance.isOver=0;
                    this.instance.cancelHelperRemoval=true;
                    this.instance.options.revert=false;
                    this.instance._trigger("out",a,this.instance._uiHash(this.instance));
                    this.instance._mouseStop(a,true);
                    this.instance.options.helper=
                    this.instance.options._helper;
                    this.instance.currentItem.remove();
                    this.instance.placeholder&&this.instance.placeholder.remove();
                    c._trigger("fromSortable",a);
                    c.dropped=false
                }
            })
        }
    });
    d.ui.plugin.add("draggable","cursor",{
        start:function(){
            var a=d("body"),b=d(this).data("draggable").options;
            if(a.css("cursor"))b._cursor=a.css("cursor");
            a.css("cursor",b.cursor)
        },
        stop:function(){
            var a=d(this).data("draggable").options;
            a._cursor&&d("body").css("cursor",a._cursor)
        }
    });
    d.ui.plugin.add("draggable","iframeFix",{
        start:function(){
            var a=
            d(this).data("draggable").options;
            d(a.iframeFix===true?"iframe":a.iframeFix).each(function(){
                d('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({
                    width:this.offsetWidth+"px",
                    height:this.offsetHeight+"px",
                    position:"absolute",
                    opacity:"0.001",
                    zIndex:1E3
                }).css(d(this).offset()).appendTo("body")
            })
        },
        stop:function(){
            d("div.ui-draggable-iframeFix").each(function(){
                this.parentNode.removeChild(this)
            })
        }
    });
    d.ui.plugin.add("draggable","opacity",{
        start:function(a,b){
            a=d(b.helper);
            b=d(this).data("draggable").options;
            if(a.css("opacity"))b._opacity=a.css("opacity");
            a.css("opacity",b.opacity)
        },
        stop:function(a,b){
            a=d(this).data("draggable").options;
            a._opacity&&d(b.helper).css("opacity",a._opacity)
        }
    });
    d.ui.plugin.add("draggable","scroll",{
        start:function(){
            var a=d(this).data("draggable");
            if(a.scrollParent[0]!=document&&a.scrollParent[0].tagName!="HTML")a.overflowOffset=a.scrollParent.offset()
        },
        drag:function(a){
            var b=d(this).data("draggable"),c=b.options,f=false;
            if(b.scrollParent[0]!=document&&b.scrollParent[0].tagName!=
                "HTML"){
                if(!c.axis||c.axis!="x")if(b.overflowOffset.top+b.scrollParent[0].offsetHeight-a.pageY<c.scrollSensitivity)b.scrollParent[0].scrollTop=f=b.scrollParent[0].scrollTop+c.scrollSpeed;
                    else if(a.pageY-b.overflowOffset.top<c.scrollSensitivity)b.scrollParent[0].scrollTop=f=b.scrollParent[0].scrollTop-c.scrollSpeed;
                if(!c.axis||c.axis!="y")if(b.overflowOffset.left+b.scrollParent[0].offsetWidth-a.pageX<c.scrollSensitivity)b.scrollParent[0].scrollLeft=f=b.scrollParent[0].scrollLeft+c.scrollSpeed;
                    else if(a.pageX-
                        b.overflowOffset.left<c.scrollSensitivity)b.scrollParent[0].scrollLeft=f=b.scrollParent[0].scrollLeft-c.scrollSpeed
            }else{
                if(!c.axis||c.axis!="x")if(a.pageY-d(document).scrollTop()<c.scrollSensitivity)f=d(document).scrollTop(d(document).scrollTop()-c.scrollSpeed);
                    else if(d(window).height()-(a.pageY-d(document).scrollTop())<c.scrollSensitivity)f=d(document).scrollTop(d(document).scrollTop()+c.scrollSpeed);
                if(!c.axis||c.axis!="y")if(a.pageX-d(document).scrollLeft()<c.scrollSensitivity)f=d(document).scrollLeft(d(document).scrollLeft()-
                    c.scrollSpeed);
                else if(d(window).width()-(a.pageX-d(document).scrollLeft())<c.scrollSensitivity)f=d(document).scrollLeft(d(document).scrollLeft()+c.scrollSpeed)
            }
            f!==false&&d.ui.ddmanager&&!c.dropBehaviour&&d.ui.ddmanager.prepareOffsets(b,a)
        }
    });
    d.ui.plugin.add("draggable","snap",{
        start:function(){
            var a=d(this).data("draggable"),b=a.options;
            a.snapElements=[];
            d(b.snap.constructor!=String?b.snap.items||":data(draggable)":b.snap).each(function(){
                var c=d(this),f=c.offset();
                this!=a.element[0]&&a.snapElements.push({
                    item:this,
                    width:c.outerWidth(),
                    height:c.outerHeight(),
                    top:f.top,
                    left:f.left
                })
            })
        },
        drag:function(a,b){
            for(var c=d(this).data("draggable"),f=c.options,e=f.snapTolerance,g=b.offset.left,n=g+c.helperProportions.width,m=b.offset.top,o=m+c.helperProportions.height,h=c.snapElements.length-1;h>=0;h--){
                var i=c.snapElements[h].left,k=i+c.snapElements[h].width,j=c.snapElements[h].top,l=j+c.snapElements[h].height;
                if(i-e<g&&g<k+e&&j-e<m&&m<l+e||i-e<g&&g<k+e&&j-e<o&&o<l+e||i-e<n&&n<k+e&&j-e<m&&m<l+e||i-e<n&&n<k+e&&j-e<o&&
                    o<l+e){
                    if(f.snapMode!="inner"){
                        var p=Math.abs(j-o)<=e,q=Math.abs(l-m)<=e,r=Math.abs(i-n)<=e,s=Math.abs(k-g)<=e;
                        if(p)b.position.top=c._convertPositionTo("relative",{
                            top:j-c.helperProportions.height,
                            left:0
                        }).top-c.margins.top;
                        if(q)b.position.top=c._convertPositionTo("relative",{
                            top:l,
                            left:0
                        }).top-c.margins.top;
                        if(r)b.position.left=c._convertPositionTo("relative",{
                            top:0,
                            left:i-c.helperProportions.width
                        }).left-c.margins.left;
                        if(s)b.position.left=c._convertPositionTo("relative",{
                            top:0,
                            left:k
                        }).left-c.margins.left
                    }
                    var t=
                    p||q||r||s;
                    if(f.snapMode!="outer"){
                        p=Math.abs(j-m)<=e;
                        q=Math.abs(l-o)<=e;
                        r=Math.abs(i-g)<=e;
                        s=Math.abs(k-n)<=e;
                        if(p)b.position.top=c._convertPositionTo("relative",{
                            top:j,
                            left:0
                        }).top-c.margins.top;
                        if(q)b.position.top=c._convertPositionTo("relative",{
                            top:l-c.helperProportions.height,
                            left:0
                        }).top-c.margins.top;
                        if(r)b.position.left=c._convertPositionTo("relative",{
                            top:0,
                            left:i
                        }).left-c.margins.left;
                        if(s)b.position.left=c._convertPositionTo("relative",{
                            top:0,
                            left:k-c.helperProportions.width
                        }).left-c.margins.left
                    }
                    if(!c.snapElements[h].snapping&&
                        (p||q||r||s||t))c.options.snap.snap&&c.options.snap.snap.call(c.element,a,d.extend(c._uiHash(),{
                        snapItem:c.snapElements[h].item
                    }));
                    c.snapElements[h].snapping=p||q||r||s||t
                }else{
                    c.snapElements[h].snapping&&c.options.snap.release&&c.options.snap.release.call(c.element,a,d.extend(c._uiHash(),{
                        snapItem:c.snapElements[h].item
                    }));
                    c.snapElements[h].snapping=false
                }
            }
        }
    });
    d.ui.plugin.add("draggable","stack",{
        start:function(){
            var a=d(this).data("draggable").options;
            a=d.makeArray(d(a.stack)).sort(function(c,f){
                return(parseInt(d(c).css("zIndex"),
                    10)||0)-(parseInt(d(f).css("zIndex"),10)||0)
            });
            if(a.length){
                var b=parseInt(a[0].style.zIndex)||0;
                d(a).each(function(c){
                    this.style.zIndex=b+c
                });
                this[0].style.zIndex=b+a.length
            }
        }
    });
    d.ui.plugin.add("draggable","zIndex",{
        start:function(a,b){
            a=d(b.helper);
            b=d(this).data("draggable").options;
            if(a.css("zIndex"))b._zIndex=a.css("zIndex");
            a.css("zIndex",b.zIndex)
        },
        stop:function(a,b){
            a=d(this).data("draggable").options;
            a._zIndex&&d(b.helper).css("zIndex",a._zIndex)
        }
    })
})(jQuery);
;/*
 * jQuery UI Droppable 1.8.2
 *
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Droppables
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *	jquery.ui.mouse.js
 *	jquery.ui.draggable.js
 */
(function(d){
    d.widget("ui.droppable",{
        widgetEventPrefix:"drop",
        options:{
            accept:"*",
            activeClass:false,
            addClasses:true,
            greedy:false,
            hoverClass:false,
            scope:"default",
            tolerance:"intersect"
        },
        _create:function(){
            var a=this.options,b=a.accept;
            this.isover=0;
            this.isout=1;
            this.accept=d.isFunction(b)?b:function(c){
                return c.is(b)
            };
                
            this.proportions={
                width:this.element[0].offsetWidth,
                height:this.element[0].offsetHeight
            };
                
            d.ui.ddmanager.droppables[a.scope]=d.ui.ddmanager.droppables[a.scope]||[];
            d.ui.ddmanager.droppables[a.scope].push(this);
            a.addClasses&&this.element.addClass("ui-droppable")
        },
        destroy:function(){
            for(var a=d.ui.ddmanager.droppables[this.options.scope],b=0;b<a.length;b++)a[b]==this&&a.splice(b,1);
            this.element.removeClass("ui-droppable ui-droppable-disabled").removeData("droppable").unbind(".droppable");
            return this
        },
        _setOption:function(a,b){
            if(a=="accept")this.accept=d.isFunction(b)?b:function(c){
                return c.is(b)
            };
                
            d.Widget.prototype._setOption.apply(this,arguments)
        },
        _activate:function(a){
            var b=d.ui.ddmanager.current;
            this.options.activeClass&&
            this.element.addClass(this.options.activeClass);
            b&&this._trigger("activate",a,this.ui(b))
        },
        _deactivate:function(a){
            var b=d.ui.ddmanager.current;
            this.options.activeClass&&this.element.removeClass(this.options.activeClass);
            b&&this._trigger("deactivate",a,this.ui(b))
        },
        _over:function(a){
            var b=d.ui.ddmanager.current;
            if(!(!b||(b.currentItem||b.element)[0]==this.element[0]))if(this.accept.call(this.element[0],b.currentItem||b.element)){
                this.options.hoverClass&&this.element.addClass(this.options.hoverClass);
                this._trigger("over",a,this.ui(b))
            }
        },
        _out:function(a){
            var b=d.ui.ddmanager.current;
            if(!(!b||(b.currentItem||b.element)[0]==this.element[0]))if(this.accept.call(this.element[0],b.currentItem||b.element)){
                this.options.hoverClass&&this.element.removeClass(this.options.hoverClass);
                this._trigger("out",a,this.ui(b))
            }
        },
        _drop:function(a,b){
            var c=b||d.ui.ddmanager.current;
            if(!c||(c.currentItem||c.element)[0]==this.element[0])return false;
            var e=false;
            this.element.find(":data(droppable)").not(".ui-draggable-dragging").each(function(){
                var g=
                d.data(this,"droppable");
                if(g.options.greedy&&!g.options.disabled&&g.options.scope==c.options.scope&&g.accept.call(g.element[0],c.currentItem||c.element)&&d.ui.intersect(c,d.extend(g,{
                    offset:g.element.offset()
                }),g.options.tolerance)){
                    e=true;
                    return false
                }
            });
            if(e)return false;
            if(this.accept.call(this.element[0],c.currentItem||c.element)){
                this.options.activeClass&&this.element.removeClass(this.options.activeClass);
                this.options.hoverClass&&this.element.removeClass(this.options.hoverClass);
                this._trigger("drop",
                    a,this.ui(c));
                return this.element
            }
            return false
        },
        ui:function(a){
            return{
                draggable:a.currentItem||a.element,
                helper:a.helper,
                position:a.position,
                offset:a.positionAbs
            }
        }
    });
    d.extend(d.ui.droppable,{
        version:"1.8.2"
    });
    d.ui.intersect=function(a,b,c){
        if(!b.offset)return false;
        var e=(a.positionAbs||a.position.absolute).left,g=e+a.helperProportions.width,f=(a.positionAbs||a.position.absolute).top,h=f+a.helperProportions.height,i=b.offset.left,k=i+b.proportions.width,j=b.offset.top,l=j+b.proportions.height;
        switch(c){
            case "fit":
                return i<e&&g<k&&j<f&&h<l;
            case "intersect":
                return i<e+a.helperProportions.width/2&&g-a.helperProportions.width/2<k&&j<f+a.helperProportions.height/2&&h-a.helperProportions.height/2<l;
            case "pointer":
                return d.ui.isOver((a.positionAbs||a.position.absolute).top+(a.clickOffset||a.offset.click).top,(a.positionAbs||a.position.absolute).left+(a.clickOffset||a.offset.click).left,j,i,b.proportions.height,b.proportions.width);
            case "touch":
                return(f>=j&&f<=l||h>=j&&h<=l||f<j&&h>l)&&(e>=i&&
                    e<=k||g>=i&&g<=k||e<i&&g>k);
            default:
                return false
        }
    };

    d.ui.ddmanager={
        current:null,
        droppables:{
            "default":[]
        },
        prepareOffsets:function(a,b){
            var c=d.ui.ddmanager.droppables[a.options.scope]||[],e=b?b.type:null,g=(a.currentItem||a.element).find(":data(droppable)").andSelf(),f=0;
                a:for(;f<c.length;f++)if(!(c[f].options.disabled||a&&!c[f].accept.call(c[f].element[0],a.currentItem||a.element))){
                    for(var h=0;h<g.length;h++)if(g[h]==c[f].element[0]){
                        c[f].proportions.height=0;
                        continue a
                    }
                    c[f].visible=c[f].element.css("display")!=
                    "none";
                    if(c[f].visible){
                        c[f].offset=c[f].element.offset();
                        c[f].proportions={
                            width:c[f].element[0].offsetWidth,
                            height:c[f].element[0].offsetHeight
                        };
                    
                        e=="mousedown"&&c[f]._activate.call(c[f],b)
                    }
                }
        },
        drop:function(a,b){
            var c=false;
            d.each(d.ui.ddmanager.droppables[a.options.scope]||[],function(){
                if(this.options){
                    if(!this.options.disabled&&this.visible&&d.ui.intersect(a,this,this.options.tolerance))c=c||this._drop.call(this,b);
                    if(!this.options.disabled&&this.visible&&this.accept.call(this.element[0],a.currentItem||
                        a.element)){
                        this.isout=1;
                        this.isover=0;
                        this._deactivate.call(this,b)
                    }
                }
            });
            return c
        },
        drag:function(a,b){
            a.options.refreshPositions&&d.ui.ddmanager.prepareOffsets(a,b);
            d.each(d.ui.ddmanager.droppables[a.options.scope]||[],function(){
                if(!(this.options.disabled||this.greedyChild||!this.visible)){
                    var c=d.ui.intersect(a,this,this.options.tolerance);
                    if(c=!c&&this.isover==1?"isout":c&&this.isover==0?"isover":null){
                        var e;
                        if(this.options.greedy){
                            var g=this.element.parents(":data(droppable):eq(0)");
                            if(g.length){
                                e=
                                d.data(g[0],"droppable");
                                e.greedyChild=c=="isover"?1:0
                            }
                        }
                        if(e&&c=="isover"){
                            e.isover=0;
                            e.isout=1;
                            e._out.call(e,b)
                        }
                        this[c]=1;
                        this[c=="isout"?"isover":"isout"]=0;
                        this[c=="isover"?"_over":"_out"].call(this,b);
                        if(e&&c=="isout"){
                            e.isout=0;
                            e.isover=1;
                            e._over.call(e,b)
                        }
                    }
                }
            })
        }
    }
})(jQuery);
;/*
 * jQuery UI Resizable 1.8.2
 *
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Resizables
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.mouse.js
 *	jquery.ui.widget.js
 */
(function(d){
    d.widget("ui.resizable",d.ui.mouse,{
        widgetEventPrefix:"resize",
        options:{
            alsoResize:false,
            animate:false,
            animateDuration:"slow",
            animateEasing:"swing",
            aspectRatio:false,
            autoHide:false,
            containment:false,
            ghost:false,
            grid:false,
            handles:"e,s,se",
            helper:false,
            maxHeight:null,
            maxWidth:null,
            minHeight:10,
            minWidth:10,
            zIndex:1E3
        },
        _create:function(){
            var b=this,a=this.options;
            this.element.addClass("ui-resizable");
            d.extend(this,{
                _aspectRatio:!!a.aspectRatio,
                aspectRatio:a.aspectRatio,
                originalElement:this.element,
                _proportionallyResizeElements:[],
                _helper:a.helper||a.ghost||a.animate?a.helper||"ui-resizable-helper":null
            });
            if(this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i)){
                /relative/.test(this.element.css("position"))&&d.browser.opera&&this.element.css({
                    position:"relative",
                    top:"auto",
                    left:"auto"
                });
                this.element.wrap(d('<div class="ui-wrapper" style="overflow: hidden;"></div>').css({
                    position:this.element.css("position"),
                    width:this.element.outerWidth(),
                    height:this.element.outerHeight(),
                    top:this.element.css("top"),
                    left:this.element.css("left")
                }));
                this.element=this.element.parent().data("resizable",this.element.data("resizable"));
                this.elementIsWrapper=true;
                this.element.css({
                    marginLeft:this.originalElement.css("marginLeft"),
                    marginTop:this.originalElement.css("marginTop"),
                    marginRight:this.originalElement.css("marginRight"),
                    marginBottom:this.originalElement.css("marginBottom")
                });
                this.originalElement.css({
                    marginLeft:0,
                    marginTop:0,
                    marginRight:0,
                    marginBottom:0
                });
                this.originalResizeStyle=
                this.originalElement.css("resize");
                this.originalElement.css("resize","none");
                this._proportionallyResizeElements.push(this.originalElement.css({
                    position:"static",
                    zoom:1,
                    display:"block"
                }));
                this.originalElement.css({
                    margin:this.originalElement.css("margin")
                });
                this._proportionallyResize()
            }
            this.handles=a.handles||(!d(".ui-resizable-handle",this.element).length?"e,s,se":{
                n:".ui-resizable-n",
                e:".ui-resizable-e",
                s:".ui-resizable-s",
                w:".ui-resizable-w",
                se:".ui-resizable-se",
                sw:".ui-resizable-sw",
                ne:".ui-resizable-ne",
                nw:".ui-resizable-nw"
            });
            if(this.handles.constructor==String){
                if(this.handles=="all")this.handles="n,e,s,w,se,sw,ne,nw";
                var c=this.handles.split(",");
                this.handles={};
                
                for(var e=0;e<c.length;e++){
                    var g=d.trim(c[e]),f=d('<div class="ui-resizable-handle '+("ui-resizable-"+g)+'"></div>');
                    /sw|se|ne|nw/.test(g)&&f.css({
                        zIndex:++a.zIndex
                    });
                    "se"==g&&f.addClass("ui-icon ui-icon-gripsmall-diagonal-se");
                    this.handles[g]=".ui-resizable-"+g;
                    this.element.append(f)
                }
            }
            this._renderAxis=function(h){
                h=h||this.element;
                for(var i in this.handles){
                    if(this.handles[i].constructor==
                        String)this.handles[i]=d(this.handles[i],this.element).show();
                    if(this.elementIsWrapper&&this.originalElement[0].nodeName.match(/textarea|input|select|button/i)){
                        var j=d(this.handles[i],this.element),l=0;
                        l=/sw|ne|nw|se|n|s/.test(i)?j.outerHeight():j.outerWidth();
                        j=["padding",/ne|nw|n/.test(i)?"Top":/se|sw|s/.test(i)?"Bottom":/^e$/.test(i)?"Right":"Left"].join("");
                        h.css(j,l);
                        this._proportionallyResize()
                    }
                    d(this.handles[i])
                }
            };
            
            this._renderAxis(this.element);
            this._handles=d(".ui-resizable-handle",this.element).disableSelection();
            this._handles.mouseover(function(){
                if(!b.resizing){
                    if(this.className)var h=this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i);
                    b.axis=h&&h[1]?h[1]:"se"
                }
            });
            if(a.autoHide){
                this._handles.hide();
                d(this.element).addClass("ui-resizable-autohide").hover(function(){
                    d(this).removeClass("ui-resizable-autohide");
                    b._handles.show()
                },function(){
                    if(!b.resizing){
                        d(this).addClass("ui-resizable-autohide");
                        b._handles.hide()
                    }
                })
            }
            this._mouseInit()
        },
        destroy:function(){
            this._mouseDestroy();
            var b=function(c){
                d(c).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").unbind(".resizable").find(".ui-resizable-handle").remove()
            };
            if(this.elementIsWrapper){
                b(this.element);
                var a=this.element;
                a.after(this.originalElement.css({
                    position:a.css("position"),
                    width:a.outerWidth(),
                    height:a.outerHeight(),
                    top:a.css("top"),
                    left:a.css("left")
                })).remove()
            }
            this.originalElement.css("resize",this.originalResizeStyle);
            b(this.originalElement);
            return this
        },
        _mouseCapture:function(b){
            var a=false;
            for(var c in this.handles)if(d(this.handles[c])[0]==b.target)a=true;return!this.options.disabled&&a
        },
        _mouseStart:function(b){
            var a=this.options,c=this.element.position(),
            e=this.element;
            this.resizing=true;
            this.documentScroll={
                top:d(document).scrollTop(),
                left:d(document).scrollLeft()
            };
        
            if(e.is(".ui-draggable")||/absolute/.test(e.css("position")))e.css({
                position:"absolute",
                top:c.top,
                left:c.left
            });
            d.browser.opera&&/relative/.test(e.css("position"))&&e.css({
                position:"relative",
                top:"auto",
                left:"auto"
            });
            this._renderProxy();
            c=m(this.helper.css("left"));
            var g=m(this.helper.css("top"));
            if(a.containment){
                c+=d(a.containment).scrollLeft()||0;
                g+=d(a.containment).scrollTop()||0
            }
            this.offset=
            this.helper.offset();
            this.position={
                left:c,
                top:g
            };
    
            this.size=this._helper?{
                width:e.outerWidth(),
                height:e.outerHeight()
            }:{
                width:e.width(),
                height:e.height()
            };
        
            this.originalSize=this._helper?{
                width:e.outerWidth(),
                height:e.outerHeight()
            }:{
                width:e.width(),
                height:e.height()
            };
        
            this.originalPosition={
                left:c,
                top:g
            };
    
            this.sizeDiff={
                width:e.outerWidth()-e.width(),
                height:e.outerHeight()-e.height()
            };
        
            this.originalMousePosition={
                left:b.pageX,
                top:b.pageY
            };
        
            this.aspectRatio=typeof a.aspectRatio=="number"?a.aspectRatio:
            this.originalSize.width/this.originalSize.height||1;
            a=d(".ui-resizable-"+this.axis).css("cursor");
            d("body").css("cursor",a=="auto"?this.axis+"-resize":a);
            e.addClass("ui-resizable-resizing");
            this._propagate("start",b);
            return true
        },
        _mouseDrag:function(b){
            var a=this.helper,c=this.originalMousePosition,e=this._change[this.axis];
            if(!e)return false;
            c=e.apply(this,[b,b.pageX-c.left||0,b.pageY-c.top||0]);
            if(this._aspectRatio||b.shiftKey)c=this._updateRatio(c,b);
            c=this._respectSize(c,b);
            this._propagate("resize",
                b);
            a.css({
                top:this.position.top+"px",
                left:this.position.left+"px",
                width:this.size.width+"px",
                height:this.size.height+"px"
            });
            !this._helper&&this._proportionallyResizeElements.length&&this._proportionallyResize();
            this._updateCache(c);
            this._trigger("resize",b,this.ui());
            return false
        },
        _mouseStop:function(b){
            this.resizing=false;
            var a=this.options,c=this;
            if(this._helper){
                var e=this._proportionallyResizeElements,g=e.length&&/textarea/i.test(e[0].nodeName);
                e=g&&d.ui.hasScroll(e[0],"left")?0:c.sizeDiff.height;
                g={
                    width:c.size.width-(g?0:c.sizeDiff.width),
                    height:c.size.height-e
                };
            
                e=parseInt(c.element.css("left"),10)+(c.position.left-c.originalPosition.left)||null;
                var f=parseInt(c.element.css("top"),10)+(c.position.top-c.originalPosition.top)||null;
                a.animate||this.element.css(d.extend(g,{
                    top:f,
                    left:e
                }));
                c.helper.height(c.size.height);
                c.helper.width(c.size.width);
                this._helper&&!a.animate&&this._proportionallyResize()
            }
            d("body").css("cursor","auto");
            this.element.removeClass("ui-resizable-resizing");
            this._propagate("stop",
                b);
            this._helper&&this.helper.remove();
            return false
        },
        _updateCache:function(b){
            this.offset=this.helper.offset();
            if(k(b.left))this.position.left=b.left;
            if(k(b.top))this.position.top=b.top;
            if(k(b.height))this.size.height=b.height;
            if(k(b.width))this.size.width=b.width
        },
        _updateRatio:function(b){
            var a=this.position,c=this.size,e=this.axis;
            if(b.height)b.width=c.height*this.aspectRatio;
            else if(b.width)b.height=c.width/this.aspectRatio;
            if(e=="sw"){
                b.left=a.left+(c.width-b.width);
                b.top=null
            }
            if(e=="nw"){
                b.top=
                a.top+(c.height-b.height);
                b.left=a.left+(c.width-b.width)
            }
            return b
        },
        _respectSize:function(b){
            var a=this.options,c=this.axis,e=k(b.width)&&a.maxWidth&&a.maxWidth<b.width,g=k(b.height)&&a.maxHeight&&a.maxHeight<b.height,f=k(b.width)&&a.minWidth&&a.minWidth>b.width,h=k(b.height)&&a.minHeight&&a.minHeight>b.height;
            if(f)b.width=a.minWidth;
            if(h)b.height=a.minHeight;
            if(e)b.width=a.maxWidth;
            if(g)b.height=a.maxHeight;
            var i=this.originalPosition.left+this.originalSize.width,j=this.position.top+this.size.height,
            l=/sw|nw|w/.test(c);
            c=/nw|ne|n/.test(c);
            if(f&&l)b.left=i-a.minWidth;
            if(e&&l)b.left=i-a.maxWidth;
            if(h&&c)b.top=j-a.minHeight;
            if(g&&c)b.top=j-a.maxHeight;
            if((a=!b.width&&!b.height)&&!b.left&&b.top)b.top=null;
            else if(a&&!b.top&&b.left)b.left=null;
            return b
        },
        _proportionallyResize:function(){
            if(this._proportionallyResizeElements.length)for(var b=this.helper||this.element,a=0;a<this._proportionallyResizeElements.length;a++){
                var c=this._proportionallyResizeElements[a];
                if(!this.borderDif){
                    var e=[c.css("borderTopWidth"),
                    c.css("borderRightWidth"),c.css("borderBottomWidth"),c.css("borderLeftWidth")],g=[c.css("paddingTop"),c.css("paddingRight"),c.css("paddingBottom"),c.css("paddingLeft")];
                    this.borderDif=d.map(e,function(f,h){
                        f=parseInt(f,10)||0;
                        h=parseInt(g[h],10)||0;
                        return f+h
                    })
                }
                d.browser.msie&&(d(b).is(":hidden")||d(b).parents(":hidden").length)||c.css({
                    height:b.height()-this.borderDif[0]-this.borderDif[2]||0,
                    width:b.width()-this.borderDif[1]-this.borderDif[3]||0
                })
            }
        },
        _renderProxy:function(){
            var b=this.options;
            this.elementOffset=
            this.element.offset();
            if(this._helper){
                this.helper=this.helper||d('<div style="overflow:hidden;"></div>');
                var a=d.browser.msie&&d.browser.version<7,c=a?1:0;
                a=a?2:-1;
                this.helper.addClass(this._helper).css({
                    width:this.element.outerWidth()+a,
                    height:this.element.outerHeight()+a,
                    position:"absolute",
                    left:this.elementOffset.left-c+"px",
                    top:this.elementOffset.top-c+"px",
                    zIndex:++b.zIndex
                });
                this.helper.appendTo("body").disableSelection()
            }else this.helper=this.element
        },
        _change:{
            e:function(b,a){
                return{
                    width:this.originalSize.width+
                    a
                }
            },
            w:function(b,a){
                return{
                    left:this.originalPosition.left+a,
                    width:this.originalSize.width-a
                }
            },
            n:function(b,a,c){
                return{
                    top:this.originalPosition.top+c,
                    height:this.originalSize.height-c
                }
            },
            s:function(b,a,c){
                return{
                    height:this.originalSize.height+c
                }
            },
            se:function(b,a,c){
                return d.extend(this._change.s.apply(this,arguments),this._change.e.apply(this,[b,a,c]))
            },
            sw:function(b,a,c){
                return d.extend(this._change.s.apply(this,arguments),this._change.w.apply(this,[b,a,c]))
            },
            ne:function(b,a,c){
                return d.extend(this._change.n.apply(this,
                    arguments),this._change.e.apply(this,[b,a,c]))
            },
            nw:function(b,a,c){
                return d.extend(this._change.n.apply(this,arguments),this._change.w.apply(this,[b,a,c]))
            }
        },
        _propagate:function(b,a){
            d.ui.plugin.call(this,b,[a,this.ui()]);
            b!="resize"&&this._trigger(b,a,this.ui())
        },
        plugins:{},
        ui:function(){
            return{
                originalElement:this.originalElement,
                element:this.element,
                helper:this.helper,
                position:this.position,
                size:this.size,
                originalSize:this.originalSize,
                originalPosition:this.originalPosition
            }
        }
    });
    d.extend(d.ui.resizable,

    {
            version:"1.8.2"
        });
    d.ui.plugin.add("resizable","alsoResize",{
        start:function(){
            var b=d(this).data("resizable").options,a=function(c){
                d(c).each(function(){
                    d(this).data("resizable-alsoresize",{
                        width:parseInt(d(this).width(),10),
                        height:parseInt(d(this).height(),10),
                        left:parseInt(d(this).css("left"),10),
                        top:parseInt(d(this).css("top"),10)
                    })
                })
            };
            
            if(typeof b.alsoResize=="object"&&!b.alsoResize.parentNode)if(b.alsoResize.length){
                b.alsoResize=b.alsoResize[0];
                a(b.alsoResize)
            }else d.each(b.alsoResize,function(c){
                a(c)
            });
            else a(b.alsoResize)
        },
        resize:function(){
            var b=d(this).data("resizable"),a=b.options,c=b.originalSize,e=b.originalPosition,g={
                height:b.size.height-c.height||0,
                width:b.size.width-c.width||0,
                top:b.position.top-e.top||0,
                left:b.position.left-e.left||0
            },f=function(h,i){
                d(h).each(function(){
                    var j=d(this),l=d(this).data("resizable-alsoresize"),p={};
                
                    d.each((i&&i.length?i:["width","height","top","left"])||["width","height","top","left"],function(n,o){
                        if((n=(l[o]||0)+(g[o]||0))&&n>=0)p[o]=n||null
                    });
                    if(/relative/.test(j.css("position"))&&
                        d.browser.opera){
                        b._revertToRelativePosition=true;
                        j.css({
                            position:"absolute",
                            top:"auto",
                            left:"auto"
                        })
                    }
                    j.css(p)
                })
            };
            
            typeof a.alsoResize=="object"&&!a.alsoResize.nodeType?d.each(a.alsoResize,function(h,i){
                f(h,i)
            }):f(a.alsoResize)
        },
        stop:function(){
            var b=d(this).data("resizable");
            if(b._revertToRelativePosition&&d.browser.opera){
                b._revertToRelativePosition=false;
                el.css({
                    position:"relative"
                })
            }
            d(this).removeData("resizable-alsoresize-start")
        }
    });
    d.ui.plugin.add("resizable","animate",{
        stop:function(b){
            var a=
            d(this).data("resizable"),c=a.options,e=a._proportionallyResizeElements,g=e.length&&/textarea/i.test(e[0].nodeName),f=g&&d.ui.hasScroll(e[0],"left")?0:a.sizeDiff.height;
            g={
                width:a.size.width-(g?0:a.sizeDiff.width),
                height:a.size.height-f
            };
            
            f=parseInt(a.element.css("left"),10)+(a.position.left-a.originalPosition.left)||null;
            var h=parseInt(a.element.css("top"),10)+(a.position.top-a.originalPosition.top)||null;
            a.element.animate(d.extend(g,h&&f?{
                top:h,
                left:f
            }:{}),{
                duration:c.animateDuration,
                easing:c.animateEasing,
                step:function(){
                    var i={
                        width:parseInt(a.element.css("width"),10),
                        height:parseInt(a.element.css("height"),10),
                        top:parseInt(a.element.css("top"),10),
                        left:parseInt(a.element.css("left"),10)
                    };
                    
                    e&&e.length&&d(e[0]).css({
                        width:i.width,
                        height:i.height
                    });
                    a._updateCache(i);
                    a._propagate("resize",b)
                }
            })
        }
    });
    d.ui.plugin.add("resizable","containment",{
        start:function(){
            var b=d(this).data("resizable"),a=b.element,c=b.options.containment;
            if(a=c instanceof d?c.get(0):/parent/.test(c)?a.parent().get(0):c){
                b.containerElement=
                d(a);
                if(/document/.test(c)||c==document){
                    b.containerOffset={
                        left:0,
                        top:0
                    };
                
                    b.containerPosition={
                        left:0,
                        top:0
                    };
                
                    b.parentData={
                        element:d(document),
                        left:0,
                        top:0,
                        width:d(document).width(),
                        height:d(document).height()||document.body.parentNode.scrollHeight
                    }
                }else{
                    var e=d(a),g=[];
                    d(["Top","Right","Left","Bottom"]).each(function(i,j){
                        g[i]=m(e.css("padding"+j))
                    });
                    b.containerOffset=e.offset();
                    b.containerPosition=e.position();
                    b.containerSize={
                        height:e.innerHeight()-g[3],
                        width:e.innerWidth()-g[1]
                    };
                
                    c=b.containerOffset;
                    var f=b.containerSize.height,h=b.containerSize.width;
                    h=d.ui.hasScroll(a,"left")?a.scrollWidth:h;
                    f=d.ui.hasScroll(a)?a.scrollHeight:f;
                    b.parentData={
                        element:a,
                        left:c.left,
                        top:c.top,
                        width:h,
                        height:f
                    }
                }
            }
        },
        resize:function(b){
            var a=d(this).data("resizable"),c=a.options,e=a.containerOffset,g=a.position;
            b=a._aspectRatio||b.shiftKey;
            var f={
                top:0,
                left:0
            },h=a.containerElement;
            if(h[0]!=document&&/static/.test(h.css("position")))f=e;
            if(g.left<(a._helper?e.left:0)){
                a.size.width+=a._helper?a.position.left-e.left:
                a.position.left-f.left;
                if(b)a.size.height=a.size.width/c.aspectRatio;
                a.position.left=c.helper?e.left:0
            }
            if(g.top<(a._helper?e.top:0)){
                a.size.height+=a._helper?a.position.top-e.top:a.position.top;
                if(b)a.size.width=a.size.height*c.aspectRatio;
                a.position.top=a._helper?e.top:0
            }
            a.offset.left=a.parentData.left+a.position.left;
            a.offset.top=a.parentData.top+a.position.top;
            c=Math.abs((a._helper?a.offset.left-f.left:a.offset.left-f.left)+a.sizeDiff.width);
            e=Math.abs((a._helper?a.offset.top-f.top:a.offset.top-
                e.top)+a.sizeDiff.height);
            g=a.containerElement.get(0)==a.element.parent().get(0);
            f=/relative|absolute/.test(a.containerElement.css("position"));
            if(g&&f)c-=a.parentData.left;
            if(c+a.size.width>=a.parentData.width){
                a.size.width=a.parentData.width-c;
                if(b)a.size.height=a.size.width/a.aspectRatio
            }
            if(e+a.size.height>=a.parentData.height){
                a.size.height=a.parentData.height-e;
                if(b)a.size.width=a.size.height*a.aspectRatio
            }
        },
        stop:function(){
            var b=d(this).data("resizable"),a=b.options,c=b.containerOffset,e=b.containerPosition,
            g=b.containerElement,f=d(b.helper),h=f.offset(),i=f.outerWidth()-b.sizeDiff.width;
            f=f.outerHeight()-b.sizeDiff.height;
            b._helper&&!a.animate&&/relative/.test(g.css("position"))&&d(this).css({
                left:h.left-e.left-c.left,
                width:i,
                height:f
            });
            b._helper&&!a.animate&&/static/.test(g.css("position"))&&d(this).css({
                left:h.left-e.left-c.left,
                width:i,
                height:f
            })
        }
    });
    d.ui.plugin.add("resizable","ghost",{
        start:function(){
            var b=d(this).data("resizable"),a=b.options,c=b.size;
            b.ghost=b.originalElement.clone();
            b.ghost.css({
                opacity:0.25,
                display:"block",
                position:"relative",
                height:c.height,
                width:c.width,
                margin:0,
                left:0,
                top:0
            }).addClass("ui-resizable-ghost").addClass(typeof a.ghost=="string"?a.ghost:"");
            b.ghost.appendTo(b.helper)
        },
        resize:function(){
            var b=d(this).data("resizable");
            b.ghost&&b.ghost.css({
                position:"relative",
                height:b.size.height,
                width:b.size.width
            })
        },
        stop:function(){
            var b=d(this).data("resizable");
            b.ghost&&b.helper&&b.helper.get(0).removeChild(b.ghost.get(0))
        }
    });
    d.ui.plugin.add("resizable","grid",{
        resize:function(){
            var b=
            d(this).data("resizable"),a=b.options,c=b.size,e=b.originalSize,g=b.originalPosition,f=b.axis;
            a.grid=typeof a.grid=="number"?[a.grid,a.grid]:a.grid;
            var h=Math.round((c.width-e.width)/(a.grid[0]||1))*(a.grid[0]||1);
            a=Math.round((c.height-e.height)/(a.grid[1]||1))*(a.grid[1]||1);
            if(/^(se|s|e)$/.test(f)){
                b.size.width=e.width+h;
                b.size.height=e.height+a
            }else if(/^(ne)$/.test(f)){
                b.size.width=e.width+h;
                b.size.height=e.height+a;
                b.position.top=g.top-a
            }else{
                if(/^(sw)$/.test(f)){
                    b.size.width=e.width+h;
                    b.size.height=
                    e.height+a
                }else{
                    b.size.width=e.width+h;
                    b.size.height=e.height+a;
                    b.position.top=g.top-a
                }
                b.position.left=g.left-h
            }
        }
    });
    var m=function(b){
        return parseInt(b,10)||0
    },k=function(b){
        return!isNaN(parseInt(b,10))
    }
})(jQuery);
;
/*
 * jQuery UI Selectable 1.8.2
 *
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Selectables
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.mouse.js
 *	jquery.ui.widget.js
 */
(function($) {

    $.widget("ui.selectable", $.ui.mouse, {
        options: {
            appendTo: 'body',
            autoRefresh: true,
            distance: 0,
            filter: '*',
            tolerance: 'touch'
        },
        _create: function() {
            var self = this;

            this.element.addClass("ui-selectable");

            this.dragged = false;

            // cache selectee children based on filter
            var selectees;
            this.refresh = function() {
                selectees = $(self.options.filter, self.element[0]);
                selectees.each(function() {
                    var $this = $(this);
                    var pos = $this.offset();
                    $.data(this, "selectable-item", {
                        element: this,
                        $element: $this,
                        left: pos.left,
                        top: pos.top,
                        right: pos.left + $this.outerWidth(),
                        bottom: pos.top + $this.outerHeight(),
                        startselected: false,
                        selected: $this.hasClass('ui-selected'),
                        selecting: $this.hasClass('ui-selecting'),
                        unselecting: $this.hasClass('ui-unselecting')
                    });
                });
            };
            this.refresh();

            this.selectees = selectees.addClass("ui-selectee");

            this._mouseInit();

            this.helper = $("<div class='ui-selectable-helper'></div>");
        },

        destroy: function() {
            this.selectees
            .removeClass("ui-selectee")
            .removeData("selectable-item");
            this.element
            .removeClass("ui-selectable ui-selectable-disabled")
            .removeData("selectable")
            .unbind(".selectable");
            this._mouseDestroy();

            return this;
        },

        _mouseStart: function(event) {
            var self = this;

            this.opos = [event.pageX, event.pageY];

            if (this.options.disabled)
                return;

            var options = this.options;

            this.selectees = $(options.filter, this.element[0]);

            this._trigger("start", event);

            $(options.appendTo).append(this.helper);
            // position helper (lasso)
            this.helper.css({
                "z-index": 100,
                "position": "absolute",
                "left": event.clientX,
                "top": event.clientY,
                "width": 0,
                "height": 0
            });

            if (options.autoRefresh) {
                this.refresh();
            }

            this.selectees.filter('.ui-selected').each(function() {
                var selectee = $.data(this, "selectable-item");
                selectee.startselected = true;
                if (!event.metaKey) {
                    selectee.$element.removeClass('ui-selected');
                    selectee.selected = false;
                    selectee.$element.addClass('ui-unselecting');
                    selectee.unselecting = true;
                    // selectable UNSELECTING callback
                    self._trigger("unselecting", event, {
                        unselecting: selectee.element
                    });
                }
            });

            $(event.target).parents().andSelf().each(function() {
                var selectee = $.data(this, "selectable-item");
                if (selectee) {
                    var doSelect = !event.metaKey || !selectee.$element.hasClass('ui-selected');
                    selectee.$element
                    .removeClass(doSelect ? "ui-unselecting" : "ui-selected")
                    .addClass(doSelect ? "ui-selecting" : "ui-unselecting");
                    selectee.unselecting = !doSelect;
                    selectee.selecting = doSelect;
                    selectee.selected = doSelect;
                    // selectable (UN)SELECTING callback
                    if (doSelect) {
                        self._trigger("selecting", event, {
                            selecting: selectee.element
                        });
                    } else {
                        self._trigger("unselecting", event, {
                            unselecting: selectee.element
                        });
                    }
                    return false;
                }
            });

        },

        _mouseDrag: function(event) {
            var self = this;
            this.dragged = true;

            if (this.options.disabled)
                return;

            var options = this.options;

            var x1 = this.opos[0], y1 = this.opos[1], x2 = event.pageX, y2 = event.pageY;
            if (x1 > x2) {
                var tmp = x2;
                x2 = x1;
                x1 = tmp;
            }
            if (y1 > y2) {
                var tmp = y2;
                y2 = y1;
                y1 = tmp;
            }
            this.helper.css({
                left: x1, 
                top: y1, 
                width: x2-x1, 
                height: y2-y1
            });

            this.selectees.each(function() {
                var selectee = $.data(this, "selectable-item");
                //prevent helper from being selected if appendTo: selectable
                if (!selectee || selectee.element == self.element[0])
                    return;
                var hit = false;
                if (options.tolerance == 'touch') {
                    hit = ( !(selectee.left > x2 || selectee.right < x1 || selectee.top > y2 || selectee.bottom < y1) );
                } else if (options.tolerance == 'fit') {
                    hit = (selectee.left > x1 && selectee.right < x2 && selectee.top > y1 && selectee.bottom < y2);
                }

                if (hit) {
                    // SELECT
                    if (selectee.selected) {
                        selectee.$element.removeClass('ui-selected');
                        selectee.selected = false;
                    }
                    if (selectee.unselecting) {
                        selectee.$element.removeClass('ui-unselecting');
                        selectee.unselecting = false;
                    }
                    if (!selectee.selecting) {
                        selectee.$element.addClass('ui-selecting');
                        selectee.selecting = true;
                        // selectable SELECTING callback
                        self._trigger("selecting", event, {
                            selecting: selectee.element
                        });
                    }
                } else {
                    // UNSELECT
                    if (selectee.selecting) {
                        if (event.metaKey && selectee.startselected) {
                            selectee.$element.removeClass('ui-selecting');
                            selectee.selecting = false;
                            selectee.$element.addClass('ui-selected');
                            selectee.selected = true;
                        } else {
                            selectee.$element.removeClass('ui-selecting');
                            selectee.selecting = false;
                            if (selectee.startselected) {
                                selectee.$element.addClass('ui-unselecting');
                                selectee.unselecting = true;
                            }
                            // selectable UNSELECTING callback
                            self._trigger("unselecting", event, {
                                unselecting: selectee.element
                            });
                        }
                    }
                    if (selectee.selected) {
                        if (!event.metaKey && !selectee.startselected) {
                            selectee.$element.removeClass('ui-selected');
                            selectee.selected = false;

                            selectee.$element.addClass('ui-unselecting');
                            selectee.unselecting = true;
                            // selectable UNSELECTING callback
                            self._trigger("unselecting", event, {
                                unselecting: selectee.element
                            });
                        }
                    }
                }
            });

            return false;
        },

        _mouseStop: function(event) {
            var self = this;

            this.dragged = false;

            var options = this.options;

            $('.ui-unselecting', this.element[0]).each(function() {
                var selectee = $.data(this, "selectable-item");
                selectee.$element.removeClass('ui-unselecting');
                selectee.unselecting = false;
                selectee.startselected = false;
                self._trigger("unselected", event, {
                    unselected: selectee.element
                });
            });
            $('.ui-selecting', this.element[0]).each(function() {
                var selectee = $.data(this, "selectable-item");
                selectee.$element.removeClass('ui-selecting').addClass('ui-selected');
                selectee.selecting = false;
                selectee.selected = true;
                selectee.startselected = true;
                self._trigger("selected", event, {
                    selected: selectee.element
                });
            });
            this._trigger("stop", event);

            this.helper.remove();

            return false;
        }

    });

    $.extend($.ui.selectable, {
        version: "1.8.2"
    });

})(jQuery);
(function(e){
    e.widget("ui.selectable",e.ui.mouse,{
        options:{
            appendTo:"body",
            autoRefresh:true,
            distance:0,
            filter:"*",
            tolerance:"touch"
        },
        _create:function(){
            var c=this;
            this.element.addClass("ui-selectable");
            this.dragged=false;
            var f;
            this.refresh=function(){
                f=e(c.options.filter,c.element[0]);
                f.each(function(){
                    var d=e(this),b=d.offset();
                    e.data(this,"selectable-item",{
                        element:this,
                        $element:d,
                        left:b.left,
                        top:b.top,
                        right:b.left+d.outerWidth(),
                        bottom:b.top+d.outerHeight(),
                        startselected:false,
                        selected:d.hasClass("ui-selected"),
                        selecting:d.hasClass("ui-selecting"),
                        unselecting:d.hasClass("ui-unselecting")
                    })
                })
            };
                
            this.refresh();
            this.selectees=f.addClass("ui-selectee");
            this._mouseInit();
            this.helper=e("<div class='ui-selectable-helper'></div>")
        },
        destroy:function(){
            this.selectees.removeClass("ui-selectee").removeData("selectable-item");
            this.element.removeClass("ui-selectable ui-selectable-disabled").removeData("selectable").unbind(".selectable");
            this._mouseDestroy();
            return this
        },
        _mouseStart:function(c){
            var f=this;
            this.opos=[c.pageX,
            c.pageY];
            if(!this.options.disabled){
                var d=this.options;
                this.selectees=e(d.filter,this.element[0]);
                this._trigger("start",c);
                e(d.appendTo).append(this.helper);
                this.helper.css({
                    "z-index":100,
                    position:"absolute",
                    left:c.clientX,
                    top:c.clientY,
                    width:0,
                    height:0
                });
                d.autoRefresh&&this.refresh();
                this.selectees.filter(".ui-selected").each(function(){
                    var b=e.data(this,"selectable-item");
                    b.startselected=true;
                    if(!c.metaKey){
                        b.$element.removeClass("ui-selected");
                        b.selected=false;
                        b.$element.addClass("ui-unselecting");
                        b.unselecting=true;
                        f._trigger("unselecting",c,{
                            unselecting:b.element
                        })
                    }
                });
                e(c.target).parents().andSelf().each(function(){
                    var b=e.data(this,"selectable-item");
                    if(b){
                        var g=!c.metaKey||!b.$element.hasClass("ui-selected");
                        b.$element.removeClass(g?"ui-unselecting":"ui-selected").addClass(g?"ui-selecting":"ui-unselecting");
                        b.unselecting=!g;
                        b.selecting=g;
                        (b.selected=g)?f._trigger("selecting",c,{
                            selecting:b.element
                        }):f._trigger("unselecting",c,{
                            unselecting:b.element
                        });
                        return false
                    }
                })
            }
        },
        _mouseDrag:function(c){
            var f=
            this;
            this.dragged=true;
            if(!this.options.disabled){
                var d=this.options,b=this.opos[0],g=this.opos[1],h=c.pageX,i=c.pageY;
                if(b>h){
                    var j=h;
                    h=b;
                    b=j
                }
                if(g>i){
                    j=i;
                    i=g;
                    g=j
                }
                this.helper.css({
                    left:b,
                    top:g,
                    width:h-b,
                    height:i-g
                });
                this.selectees.each(function(){
                    var a=e.data(this,"selectable-item");
                    if(!(!a||a.element==f.element[0])){
                        var k=false;
                        if(d.tolerance=="touch")k=!(a.left>h||a.right<b||a.top>i||a.bottom<g);
                        else if(d.tolerance=="fit")k=a.left>b&&a.right<h&&a.top>g&&a.bottom<i;
                        if(k){
                            if(a.selected){
                                a.$element.removeClass("ui-selected");
                                a.selected=false
                            }
                            if(a.unselecting){
                                a.$element.removeClass("ui-unselecting");
                                a.unselecting=false
                            }
                            if(!a.selecting){
                                a.$element.addClass("ui-selecting");
                                a.selecting=true;
                                f._trigger("selecting",c,{
                                    selecting:a.element
                                })
                            }
                        }else{
                            if(a.selecting)if(c.metaKey&&a.startselected){
                                a.$element.removeClass("ui-selecting");
                                a.selecting=false;
                                a.$element.addClass("ui-selected");
                                a.selected=true
                            }else{
                                a.$element.removeClass("ui-selecting");
                                a.selecting=false;
                                if(a.startselected){
                                    a.$element.addClass("ui-unselecting");
                                    a.unselecting=
                                    true
                                }
                                f._trigger("unselecting",c,{
                                    unselecting:a.element
                                })
                            }
                            if(a.selected)if(!c.metaKey&&!a.startselected){
                                a.$element.removeClass("ui-selected");
                                a.selected=false;
                                a.$element.addClass("ui-unselecting");
                                a.unselecting=true;
                                f._trigger("unselecting",c,{
                                    unselecting:a.element
                                })
                            }
                        }
                    }
                });
                return false
            }
        },
        _mouseStop:function(c){
            var f=this;
            this.dragged=false;
            e(".ui-unselecting",this.element[0]).each(function(){
                var d=e.data(this,"selectable-item");
                d.$element.removeClass("ui-unselecting");
                d.unselecting=false;
                d.startselected=
                false;
                f._trigger("unselected",c,{
                    unselected:d.element
                })
            });
            e(".ui-selecting",this.element[0]).each(function(){
                var d=e.data(this,"selectable-item");
                d.$element.removeClass("ui-selecting").addClass("ui-selected");
                d.selecting=false;
                d.selected=true;
                d.startselected=true;
                f._trigger("selected",c,{
                    selected:d.element
                })
            });
            this._trigger("stop",c);
            this.helper.remove();
            return false
        }
    });
    e.extend(e.ui.selectable,{
        version:"1.8.2"
    })
})(jQuery);
;/*
 * jQuery UI Sortable 1.8.2
 *
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Sortables
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.mouse.js
 *	jquery.ui.widget.js
 */
(function(d){
    d.widget("ui.sortable",d.ui.mouse,{
        widgetEventPrefix:"sort",
        options:{
            appendTo:"parent",
            axis:false,
            connectWith:false,
            containment:false,
            cursor:"auto",
            cursorAt:false,
            dropOnEmpty:true,
            forcePlaceholderSize:false,
            forceHelperSize:false,
            grid:false,
            handle:false,
            helper:"original",
            items:"> *",
            opacity:false,
            placeholder:false,
            revert:false,
            scroll:true,
            scrollSensitivity:20,
            scrollSpeed:20,
            scope:"default",
            tolerance:"intersect",
            zIndex:1E3
        },
        _create:function(){
            this.containerCache={};
            
            this.element.addClass("ui-sortable");
            this.refresh();
            this.floating=this.items.length?/left|right/.test(this.items[0].item.css("float")):false;
            this.offset=this.element.offset();
            this._mouseInit()
        },
        destroy:function(){
            this.element.removeClass("ui-sortable ui-sortable-disabled").removeData("sortable").unbind(".sortable");
            this._mouseDestroy();
            for(var a=this.items.length-1;a>=0;a--)this.items[a].item.removeData("sortable-item");
            return this
        },
        _setOption:function(a,b){
            if(a==="disabled"){
                this.options[a]=b;
                this.widget()[b?"addClass":"removeClass"]("ui-sortable-disabled")
            }else d.Widget.prototype._setOption.apply(this,
                arguments)
        },
        _mouseCapture:function(a,b){
            if(this.reverting)return false;
            if(this.options.disabled||this.options.type=="static")return false;
            this._refreshItems(a);
            var c=null,e=this;
            d(a.target).parents().each(function(){
                if(d.data(this,"sortable-item")==e){
                    c=d(this);
                    return false
                }
            });
            if(d.data(a.target,"sortable-item")==e)c=d(a.target);
            if(!c)return false;
            if(this.options.handle&&!b){
                var f=false;
                d(this.options.handle,c).find("*").andSelf().each(function(){
                    if(this==a.target)f=true
                });
                if(!f)return false
            }
            this.currentItem=
            c;
            this._removeCurrentsFromItems();
            return true
        },
        _mouseStart:function(a,b,c){
            b=this.options;
            var e=this;
            this.currentContainer=this;
            this.refreshPositions();
            this.helper=this._createHelper(a);
            this._cacheHelperProportions();
            this._cacheMargins();
            this.scrollParent=this.helper.scrollParent();
            this.offset=this.currentItem.offset();
            this.offset={
                top:this.offset.top-this.margins.top,
                left:this.offset.left-this.margins.left
            };
            
            this.helper.css("position","absolute");
            this.cssPosition=this.helper.css("position");
            d.extend(this.offset,

            {
                    click:{
                        left:a.pageX-this.offset.left,
                        top:a.pageY-this.offset.top
                    },
                    parent:this._getParentOffset(),
                    relative:this._getRelativeOffset()
                });
            this.originalPosition=this._generatePosition(a);
            this.originalPageX=a.pageX;
            this.originalPageY=a.pageY;
            b.cursorAt&&this._adjustOffsetFromHelper(b.cursorAt);
            this.domPosition={
                prev:this.currentItem.prev()[0],
                parent:this.currentItem.parent()[0]
            };
            
            this.helper[0]!=this.currentItem[0]&&this.currentItem.hide();
            this._createPlaceholder();
            b.containment&&this._setContainment();
            if(b.cursor){
                if(d("body").css("cursor"))this._storedCursor=d("body").css("cursor");
                d("body").css("cursor",b.cursor)
            }
            if(b.opacity){
                if(this.helper.css("opacity"))this._storedOpacity=this.helper.css("opacity");
                this.helper.css("opacity",b.opacity)
            }
            if(b.zIndex){
                if(this.helper.css("zIndex"))this._storedZIndex=this.helper.css("zIndex");
                this.helper.css("zIndex",b.zIndex)
            }
            if(this.scrollParent[0]!=document&&this.scrollParent[0].tagName!="HTML")this.overflowOffset=this.scrollParent.offset();
            this._trigger("start",
                a,this._uiHash());
            this._preserveHelperProportions||this._cacheHelperProportions();
            if(!c)for(c=this.containers.length-1;c>=0;c--)this.containers[c]._trigger("activate",a,e._uiHash(this));
            if(d.ui.ddmanager)d.ui.ddmanager.current=this;
            d.ui.ddmanager&&!b.dropBehaviour&&d.ui.ddmanager.prepareOffsets(this,a);
            this.dragging=true;
            this.helper.addClass("ui-sortable-helper");
            this._mouseDrag(a);
            return true
        },
        _mouseDrag:function(a){
            this.position=this._generatePosition(a);
            this.positionAbs=this._convertPositionTo("absolute");
            if(!this.lastPositionAbs)this.lastPositionAbs=this.positionAbs;
            if(this.options.scroll){
                var b=this.options,c=false;
                if(this.scrollParent[0]!=document&&this.scrollParent[0].tagName!="HTML"){
                    if(this.overflowOffset.top+this.scrollParent[0].offsetHeight-a.pageY<b.scrollSensitivity)this.scrollParent[0].scrollTop=c=this.scrollParent[0].scrollTop+b.scrollSpeed;
                    else if(a.pageY-this.overflowOffset.top<b.scrollSensitivity)this.scrollParent[0].scrollTop=c=this.scrollParent[0].scrollTop-b.scrollSpeed;
                    if(this.overflowOffset.left+
                        this.scrollParent[0].offsetWidth-a.pageX<b.scrollSensitivity)this.scrollParent[0].scrollLeft=c=this.scrollParent[0].scrollLeft+b.scrollSpeed;
                    else if(a.pageX-this.overflowOffset.left<b.scrollSensitivity)this.scrollParent[0].scrollLeft=c=this.scrollParent[0].scrollLeft-b.scrollSpeed
                }else{
                    if(a.pageY-d(document).scrollTop()<b.scrollSensitivity)c=d(document).scrollTop(d(document).scrollTop()-b.scrollSpeed);
                    else if(d(window).height()-(a.pageY-d(document).scrollTop())<b.scrollSensitivity)c=d(document).scrollTop(d(document).scrollTop()+
                        b.scrollSpeed);
                    if(a.pageX-d(document).scrollLeft()<b.scrollSensitivity)c=d(document).scrollLeft(d(document).scrollLeft()-b.scrollSpeed);
                    else if(d(window).width()-(a.pageX-d(document).scrollLeft())<b.scrollSensitivity)c=d(document).scrollLeft(d(document).scrollLeft()+b.scrollSpeed)
                }
                c!==false&&d.ui.ddmanager&&!b.dropBehaviour&&d.ui.ddmanager.prepareOffsets(this,a)
            }
            this.positionAbs=this._convertPositionTo("absolute");
            if(!this.options.axis||this.options.axis!="y")this.helper[0].style.left=this.position.left+
                "px";
            if(!this.options.axis||this.options.axis!="x")this.helper[0].style.top=this.position.top+"px";
            for(b=this.items.length-1;b>=0;b--){
                c=this.items[b];
                var e=c.item[0],f=this._intersectsWithPointer(c);
                if(f)if(e!=this.currentItem[0]&&this.placeholder[f==1?"next":"prev"]()[0]!=e&&!d.ui.contains(this.placeholder[0],e)&&(this.options.type=="semi-dynamic"?!d.ui.contains(this.element[0],e):true)){
                    this.direction=f==1?"down":"up";
                    if(this.options.tolerance=="pointer"||this._intersectsWithSides(c))this._rearrange(a,
                        c);else break;
                    this._trigger("change",a,this._uiHash());
                    break
                }
            }
            this._contactContainers(a);
            d.ui.ddmanager&&d.ui.ddmanager.drag(this,a);
            this._trigger("sort",a,this._uiHash());
            this.lastPositionAbs=this.positionAbs;
            return false
        },
        _mouseStop:function(a,b){
            if(a){
                d.ui.ddmanager&&!this.options.dropBehaviour&&d.ui.ddmanager.drop(this,a);
                if(this.options.revert){
                    var c=this;
                    b=c.placeholder.offset();
                    c.reverting=true;
                    d(this.helper).animate({
                        left:b.left-this.offset.parent.left-c.margins.left+(this.offsetParent[0]==
                            document.body?0:this.offsetParent[0].scrollLeft),
                        top:b.top-this.offset.parent.top-c.margins.top+(this.offsetParent[0]==document.body?0:this.offsetParent[0].scrollTop)
                    },parseInt(this.options.revert,10)||500,function(){
                        c._clear(a)
                    })
                }else this._clear(a,b);
                return false
            }
        },
        cancel:function(){
            var a=this;
            if(this.dragging){
                this._mouseUp();
                this.options.helper=="original"?this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper"):this.currentItem.show();
                for(var b=this.containers.length-1;b>=0;b--){
                    this.containers[b]._trigger("deactivate",
                        null,a._uiHash(this));
                    if(this.containers[b].containerCache.over){
                        this.containers[b]._trigger("out",null,a._uiHash(this));
                        this.containers[b].containerCache.over=0
                    }
                }
            }
            this.placeholder[0].parentNode&&this.placeholder[0].parentNode.removeChild(this.placeholder[0]);
            this.options.helper!="original"&&this.helper&&this.helper[0].parentNode&&this.helper.remove();
            d.extend(this,{
                helper:null,
                dragging:false,
                reverting:false,
                _noFinalSort:null
            });
            this.domPosition.prev?d(this.domPosition.prev).after(this.currentItem):
            d(this.domPosition.parent).prepend(this.currentItem);
            return this
        },
        serialize:function(a){
            var b=this._getItemsAsjQuery(a&&a.connected),c=[];
            a=a||{};
    
            d(b).each(function(){
                var e=(d(a.item||this).attr(a.attribute||"id")||"").match(a.expression||/(.+)[-=_](.+)/);
                if(e)c.push((a.key||e[1]+"[]")+"="+(a.key&&a.expression?e[1]:e[2]))
            });
            return c.join("&")
        },
        toArray:function(a){
            var b=this._getItemsAsjQuery(a&&a.connected),c=[];
            a=a||{};
    
            b.each(function(){
                c.push(d(a.item||this).attr(a.attribute||"id")||"")
            });
            return c
        },
        _intersectsWith:function(a){
            var b=this.positionAbs.left,c=b+this.helperProportions.width,e=this.positionAbs.top,f=e+this.helperProportions.height,g=a.left,h=g+a.width,i=a.top,k=i+a.height,j=this.offset.click.top,l=this.offset.click.left;
            j=e+j>i&&e+j<k&&b+l>g&&b+l<h;
            return this.options.tolerance=="pointer"||this.options.forcePointerForContainers||this.options.tolerance!="pointer"&&this.helperProportions[this.floating?"width":"height"]>a[this.floating?"width":"height"]?j:g<b+this.helperProportions.width/
            2&&c-this.helperProportions.width/2<h&&i<e+this.helperProportions.height/2&&f-this.helperProportions.height/2<k
        },
        _intersectsWithPointer:function(a){
            var b=d.ui.isOverAxis(this.positionAbs.top+this.offset.click.top,a.top,a.height);
            a=d.ui.isOverAxis(this.positionAbs.left+this.offset.click.left,a.left,a.width);
            b=b&&a;
            a=this._getDragVerticalDirection();
            var c=this._getDragHorizontalDirection();
            if(!b)return false;
            return this.floating?c&&c=="right"||a=="down"?2:1:a&&(a=="down"?2:1)
        },
        _intersectsWithSides:function(a){
            var b=
            d.ui.isOverAxis(this.positionAbs.top+this.offset.click.top,a.top+a.height/2,a.height);
            a=d.ui.isOverAxis(this.positionAbs.left+this.offset.click.left,a.left+a.width/2,a.width);
            var c=this._getDragVerticalDirection(),e=this._getDragHorizontalDirection();
            return this.floating&&e?e=="right"&&a||e=="left"&&!a:c&&(c=="down"&&b||c=="up"&&!b)
        },
        _getDragVerticalDirection:function(){
            var a=this.positionAbs.top-this.lastPositionAbs.top;
            return a!=0&&(a>0?"down":"up")
        },
        _getDragHorizontalDirection:function(){
            var a=
            this.positionAbs.left-this.lastPositionAbs.left;
            return a!=0&&(a>0?"right":"left")
        },
        refresh:function(a){
            this._refreshItems(a);
            this.refreshPositions();
            return this
        },
        _connectWith:function(){
            var a=this.options;
            return a.connectWith.constructor==String?[a.connectWith]:a.connectWith
        },
        _getItemsAsjQuery:function(a){
            var b=[],c=[],e=this._connectWith();
            if(e&&a)for(a=e.length-1;a>=0;a--)for(var f=d(e[a]),g=f.length-1;g>=0;g--){
                var h=d.data(f[g],"sortable");
                if(h&&h!=this&&!h.options.disabled)c.push([d.isFunction(h.options.items)?
                    h.options.items.call(h.element):d(h.options.items,h.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),h])
            }
            c.push([d.isFunction(this.options.items)?this.options.items.call(this.element,null,{
                options:this.options,
                item:this.currentItem
            }):d(this.options.items,this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),this]);
            for(a=c.length-1;a>=0;a--)c[a][0].each(function(){
                b.push(this)
            });
            return d(b)
        },
        _removeCurrentsFromItems:function(){
            for(var a=this.currentItem.find(":data(sortable-item)"),
                b=0;b<this.items.length;b++)for(var c=0;c<a.length;c++)a[c]==this.items[b].item[0]&&this.items.splice(b,1)
        },
        _refreshItems:function(a){
            this.items=[];
            this.containers=[this];
            var b=this.items,c=[[d.isFunction(this.options.items)?this.options.items.call(this.element[0],a,{
                item:this.currentItem
            }):d(this.options.items,this.element),this]],e=this._connectWith();
            if(e)for(var f=e.length-1;f>=0;f--)for(var g=d(e[f]),h=g.length-1;h>=0;h--){
                var i=d.data(g[h],"sortable");
                if(i&&i!=this&&!i.options.disabled){
                    c.push([d.isFunction(i.options.items)?
                        i.options.items.call(i.element[0],a,{
                            item:this.currentItem
                        }):d(i.options.items,i.element),i]);
                    this.containers.push(i)
                }
            }
            for(f=c.length-1;f>=0;f--){
                a=c[f][1];
                e=c[f][0];
                h=0;
                for(g=e.length;h<g;h++){
                    i=d(e[h]);
                    i.data("sortable-item",a);
                    b.push({
                        item:i,
                        instance:a,
                        width:0,
                        height:0,
                        left:0,
                        top:0
                    })
                }
            }
        },
        refreshPositions:function(a){
            if(this.offsetParent&&this.helper)this.offset.parent=this._getParentOffset();
            for(var b=this.items.length-1;b>=0;b--){
                var c=this.items[b],e=this.options.toleranceElement?d(this.options.toleranceElement,
                    c.item):c.item;
                if(!a){
                    c.width=e.outerWidth();
                    c.height=e.outerHeight()
                }
                e=e.offset();
                c.left=e.left;
                c.top=e.top
            }
            if(this.options.custom&&this.options.custom.refreshContainers)this.options.custom.refreshContainers.call(this);else for(b=this.containers.length-1;b>=0;b--){
                e=this.containers[b].element.offset();
                this.containers[b].containerCache.left=e.left;
                this.containers[b].containerCache.top=e.top;
                this.containers[b].containerCache.width=this.containers[b].element.outerWidth();
                this.containers[b].containerCache.height=
                this.containers[b].element.outerHeight()
            }
            return this
        },
        _createPlaceholder:function(a){
            var b=a||this,c=b.options;
            if(!c.placeholder||c.placeholder.constructor==String){
                var e=c.placeholder;
                c.placeholder={
                    element:function(){
                        var f=d(document.createElement(b.currentItem[0].nodeName)).addClass(e||b.currentItem[0].className+" ui-sortable-placeholder").removeClass("ui-sortable-helper")[0];
                        if(!e)f.style.visibility="hidden";
                        return f
                    },
                    update:function(f,g){
                        if(!(e&&!c.forcePlaceholderSize)){
                            g.height()||g.height(b.currentItem.innerHeight()-
                                parseInt(b.currentItem.css("paddingTop")||0,10)-parseInt(b.currentItem.css("paddingBottom")||0,10));
                            g.width()||g.width(b.currentItem.innerWidth()-parseInt(b.currentItem.css("paddingLeft")||0,10)-parseInt(b.currentItem.css("paddingRight")||0,10))
                        }
                    }
                }
            }
            b.placeholder=d(c.placeholder.element.call(b.element,b.currentItem));
            b.currentItem.after(b.placeholder);
            c.placeholder.update(b,b.placeholder)
        },
        _contactContainers:function(a){
            for(var b=null,c=null,e=this.containers.length-1;e>=0;e--)if(!d.ui.contains(this.currentItem[0],
                this.containers[e].element[0]))if(this._intersectsWith(this.containers[e].containerCache)){
                if(!(b&&d.ui.contains(this.containers[e].element[0],b.element[0]))){
                    b=this.containers[e];
                    c=e
                }
            }else if(this.containers[e].containerCache.over){
                this.containers[e]._trigger("out",a,this._uiHash(this));
                this.containers[e].containerCache.over=0
            }
            if(b)if(this.containers.length===1){
                this.containers[c]._trigger("over",a,this._uiHash(this));
                this.containers[c].containerCache.over=1
            }else if(this.currentContainer!=this.containers[c]){
                b=
                1E4;
                e=null;
                for(var f=this.positionAbs[this.containers[c].floating?"left":"top"],g=this.items.length-1;g>=0;g--)if(d.ui.contains(this.containers[c].element[0],this.items[g].item[0])){
                    var h=this.items[g][this.containers[c].floating?"left":"top"];
                    if(Math.abs(h-f)<b){
                        b=Math.abs(h-f);
                        e=this.items[g]
                    }
                }
                if(e||this.options.dropOnEmpty){
                    this.currentContainer=this.containers[c];
                    e?this._rearrange(a,e,null,true):this._rearrange(a,null,this.containers[c].element,true);
                    this._trigger("change",a,this._uiHash());
                    this.containers[c]._trigger("change",
                        a,this._uiHash(this));
                    this.options.placeholder.update(this.currentContainer,this.placeholder);
                    this.containers[c]._trigger("over",a,this._uiHash(this));
                    this.containers[c].containerCache.over=1
                }
            }
        },
        _createHelper:function(a){
            var b=this.options;
            a=d.isFunction(b.helper)?d(b.helper.apply(this.element[0],[a,this.currentItem])):b.helper=="clone"?this.currentItem.clone():this.currentItem;
            a.parents("body").length||d(b.appendTo!="parent"?b.appendTo:this.currentItem[0].parentNode)[0].appendChild(a[0]);
            if(a[0]==
                this.currentItem[0])this._storedCSS={
                width:this.currentItem[0].style.width,
                height:this.currentItem[0].style.height,
                position:this.currentItem.css("position"),
                top:this.currentItem.css("top"),
                left:this.currentItem.css("left")
            };
        
            if(a[0].style.width==""||b.forceHelperSize)a.width(this.currentItem.width());
            if(a[0].style.height==""||b.forceHelperSize)a.height(this.currentItem.height());
            return a
        },
        _adjustOffsetFromHelper:function(a){
            if(typeof a=="string")a=a.split(" ");
            if(d.isArray(a))a={
                left:+a[0],
                top:+a[1]||
                0
            };
        
            if("left"in a)this.offset.click.left=a.left+this.margins.left;
            if("right"in a)this.offset.click.left=this.helperProportions.width-a.right+this.margins.left;
            if("top"in a)this.offset.click.top=a.top+this.margins.top;
            if("bottom"in a)this.offset.click.top=this.helperProportions.height-a.bottom+this.margins.top
        },
        _getParentOffset:function(){
            this.offsetParent=this.helper.offsetParent();
            var a=this.offsetParent.offset();
            if(this.cssPosition=="absolute"&&this.scrollParent[0]!=document&&d.ui.contains(this.scrollParent[0],
                this.offsetParent[0])){
                a.left+=this.scrollParent.scrollLeft();
                a.top+=this.scrollParent.scrollTop()
            }
            if(this.offsetParent[0]==document.body||this.offsetParent[0].tagName&&this.offsetParent[0].tagName.toLowerCase()=="html"&&d.browser.msie)a={
                top:0,
                left:0
            };
    
            return{
                top:a.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),
                left:a.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)
            }
        },
        _getRelativeOffset:function(){
            if(this.cssPosition=="relative"){
                var a=this.currentItem.position();
                return{
                    top:a.top-
                    (parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),
                    left:a.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()
                }
            }else return{
                top:0,
                left:0
            }
        },
        _cacheMargins:function(){
            this.margins={
                left:parseInt(this.currentItem.css("marginLeft"),10)||0,
                top:parseInt(this.currentItem.css("marginTop"),10)||0
            }
        },
        _cacheHelperProportions:function(){
            this.helperProportions={
                width:this.helper.outerWidth(),
                height:this.helper.outerHeight()
            }
        },
        _setContainment:function(){
            var a=this.options;
            if(a.containment=="parent")a.containment=this.helper[0].parentNode;
            if(a.containment=="document"||a.containment=="window")this.containment=[0-this.offset.relative.left-this.offset.parent.left,0-this.offset.relative.top-this.offset.parent.top,d(a.containment=="document"?document:window).width()-this.helperProportions.width-this.margins.left,(d(a.containment=="document"?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top];
            if(!/^(document|window|parent)$/.test(a.containment)){
                var b=
                d(a.containment)[0];
                a=d(a.containment).offset();
                var c=d(b).css("overflow")!="hidden";
                this.containment=[a.left+(parseInt(d(b).css("borderLeftWidth"),10)||0)+(parseInt(d(b).css("paddingLeft"),10)||0)-this.margins.left,a.top+(parseInt(d(b).css("borderTopWidth"),10)||0)+(parseInt(d(b).css("paddingTop"),10)||0)-this.margins.top,a.left+(c?Math.max(b.scrollWidth,b.offsetWidth):b.offsetWidth)-(parseInt(d(b).css("borderLeftWidth"),10)||0)-(parseInt(d(b).css("paddingRight"),10)||0)-this.helperProportions.width-
                this.margins.left,a.top+(c?Math.max(b.scrollHeight,b.offsetHeight):b.offsetHeight)-(parseInt(d(b).css("borderTopWidth"),10)||0)-(parseInt(d(b).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top]
            }
        },
        _convertPositionTo:function(a,b){
            if(!b)b=this.position;
            a=a=="absolute"?1:-1;
            var c=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&d.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,e=/(html|body)/i.test(c[0].tagName);
            return{
                top:b.top+
                this.offset.relative.top*a+this.offset.parent.top*a-(d.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():e?0:c.scrollTop())*a),
                left:b.left+this.offset.relative.left*a+this.offset.parent.left*a-(d.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():e?0:c.scrollLeft())*a)
            }
        },
        _generatePosition:function(a){
            var b=this.options,c=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&d.ui.contains(this.scrollParent[0],
                this.offsetParent[0]))?this.offsetParent:this.scrollParent,e=/(html|body)/i.test(c[0].tagName);
            if(this.cssPosition=="relative"&&!(this.scrollParent[0]!=document&&this.scrollParent[0]!=this.offsetParent[0]))this.offset.relative=this._getRelativeOffset();
            var f=a.pageX,g=a.pageY;
            if(this.originalPosition){
                if(this.containment){
                    if(a.pageX-this.offset.click.left<this.containment[0])f=this.containment[0]+this.offset.click.left;
                    if(a.pageY-this.offset.click.top<this.containment[1])g=this.containment[1]+this.offset.click.top;
                    if(a.pageX-this.offset.click.left>this.containment[2])f=this.containment[2]+this.offset.click.left;
                    if(a.pageY-this.offset.click.top>this.containment[3])g=this.containment[3]+this.offset.click.top
                }
                if(b.grid){
                    g=this.originalPageY+Math.round((g-this.originalPageY)/b.grid[1])*b.grid[1];
                    g=this.containment?!(g-this.offset.click.top<this.containment[1]||g-this.offset.click.top>this.containment[3])?g:!(g-this.offset.click.top<this.containment[1])?g-b.grid[1]:g+b.grid[1]:g;
                    f=this.originalPageX+Math.round((f-
                        this.originalPageX)/b.grid[0])*b.grid[0];
                    f=this.containment?!(f-this.offset.click.left<this.containment[0]||f-this.offset.click.left>this.containment[2])?f:!(f-this.offset.click.left<this.containment[0])?f-b.grid[0]:f+b.grid[0]:f
                }
            }
            return{
                top:g-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+(d.browser.safari&&this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollTop():e?0:c.scrollTop()),
                left:f-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+
                (d.browser.safari&&this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():e?0:c.scrollLeft())
            }
        },
        _rearrange:function(a,b,c,e){
            c?c[0].appendChild(this.placeholder[0]):b.item[0].parentNode.insertBefore(this.placeholder[0],this.direction=="down"?b.item[0]:b.item[0].nextSibling);
            this.counter=this.counter?++this.counter:1;
            var f=this,g=this.counter;
            window.setTimeout(function(){
                g==f.counter&&f.refreshPositions(!e)
            },0)
        },
        _clear:function(a,b){
            this.reverting=false;
            var c=[];
            !this._noFinalSort&&
            this.currentItem[0].parentNode&&this.placeholder.before(this.currentItem);
            this._noFinalSort=null;
            if(this.helper[0]==this.currentItem[0]){
                for(var e in this._storedCSS)if(this._storedCSS[e]=="auto"||this._storedCSS[e]=="static")this._storedCSS[e]="";this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
            }else this.currentItem.show();
            this.fromOutside&&!b&&c.push(function(f){
                this._trigger("receive",f,this._uiHash(this.fromOutside))
            });
            if((this.fromOutside||this.domPosition.prev!=this.currentItem.prev().not(".ui-sortable-helper")[0]||
                this.domPosition.parent!=this.currentItem.parent()[0])&&!b)c.push(function(f){
                this._trigger("update",f,this._uiHash())
            });
            if(!d.ui.contains(this.element[0],this.currentItem[0])){
                b||c.push(function(f){
                    this._trigger("remove",f,this._uiHash())
                });
                for(e=this.containers.length-1;e>=0;e--)if(d.ui.contains(this.containers[e].element[0],this.currentItem[0])&&!b){
                    c.push(function(f){
                        return function(g){
                            f._trigger("receive",g,this._uiHash(this))
                        }
                    }.call(this,this.containers[e]));
                    c.push(function(f){
                        return function(g){
                            f._trigger("update",
                                g,this._uiHash(this))
                        }
                    }.call(this,this.containers[e]))
                }
            }
            for(e=this.containers.length-1;e>=0;e--){
                b||c.push(function(f){
                    return function(g){
                        f._trigger("deactivate",g,this._uiHash(this))
                    }
                }.call(this,this.containers[e]));
                if(this.containers[e].containerCache.over){
                    c.push(function(f){
                        return function(g){
                            f._trigger("out",g,this._uiHash(this))
                        }
                    }.call(this,this.containers[e]));
                    this.containers[e].containerCache.over=0
                }
            }
            this._storedCursor&&d("body").css("cursor",this._storedCursor);
            this._storedOpacity&&this.helper.css("opacity",
                this._storedOpacity);
            if(this._storedZIndex)this.helper.css("zIndex",this._storedZIndex=="auto"?"":this._storedZIndex);
            this.dragging=false;
            if(this.cancelHelperRemoval){
                if(!b){
                    this._trigger("beforeStop",a,this._uiHash());
                    for(e=0;e<c.length;e++)c[e].call(this,a);
                    this._trigger("stop",a,this._uiHash())
                }
                return false
            }
            b||this._trigger("beforeStop",a,this._uiHash());
            this.placeholder[0].parentNode.removeChild(this.placeholder[0]);
            this.helper[0]!=this.currentItem[0]&&this.helper.remove();
            this.helper=null;
            if(!b){
                for(e=
                    0;e<c.length;e++)c[e].call(this,a);
                this._trigger("stop",a,this._uiHash())
            }
            this.fromOutside=false;
            return true
        },
        _trigger:function(){
            d.Widget.prototype._trigger.apply(this,arguments)===false&&this.cancel()
        },
        _uiHash:function(a){
            var b=a||this;
            return{
                helper:b.helper,
                placeholder:b.placeholder||d([]),
                position:b.position,
                originalPosition:b.originalPosition,
                offset:b.positionAbs,
                item:b.currentItem,
                sender:a?a.element:null
            }
        }
    });
    d.extend(d.ui.sortable,{
        version:"1.8.2"
    })
})(jQuery);
;/*
 * jQuery UI Datepicker 1.8.2
 *
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Datepicker
 *
 * Depends:
 *	jquery.ui.core.js
 */
(function(d){
    function J(){
        this.debug=false;
        this._curInst=null;
        this._keyEvent=false;
        this._disabledInputs=[];
        this._inDialog=this._datepickerShowing=false;
        this._mainDivId="ui-datepicker-div";
        this._inlineClass="ui-datepicker-inline";
        this._appendClass="ui-datepicker-append";
        this._triggerClass="ui-datepicker-trigger";
        this._dialogClass="ui-datepicker-dialog";
        this._disableClass="ui-datepicker-disabled";
        this._unselectableClass="ui-datepicker-unselectable";
        this._currentClass="ui-datepicker-current-day";
        this._dayOverClass=
        "ui-datepicker-days-cell-over";
        this.regional=[];
        this.regional[""]={
            closeText:"Hecho",
            prevText:"Anterior",
            nextText:"Siguiente",
            currentText:"Hoy",
            monthNames:["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],
            monthNamesShort:["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"],
            dayNames:["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"],
            dayNamesShort:["Dom","Lun","Mar","Mie","Jue","Vie","Sab"],
            dayNamesMin:["Do","Lu","Ma","Mi","Ju","Vi","Sa"],
            weekHeader:"Semana",
            dateFormat:"yy-mm-dd",
            firstDay:0,
            isRTL:false,
            showMonthAfterYear:false,
            yearSuffix:""
        };
        
        this._defaults={
            showOn:"focus",
            showAnim:"fadeIn",
            showOptions:{},
            defaultDate:null,
            appendText:"",
            buttonText:"...",
            buttonImage:"",
            buttonImageOnly:false,
            hideIfNoPrevNext:false,
            navigationAsDateFormat:false,
            gotoCurrent:false,
            changeMonth:false,
            changeYear:false,
            yearRange:"c-10:c+10",
            showOtherMonths:false,
            selectOtherMonths:false,
            showWeek:false,
            calculateWeek:this.iso8601Week,
            shortYearCutoff:"+10",
            minDate:null,
            maxDate:null,
            duration:"fast",
            beforeShowDay:null,
            beforeShow:null,
            onSelect:null,
            onChangeMonthYear:null,
            onClose:null,
            numberOfMonths:1,
            showCurrentAtPos:0,
            stepMonths:1,
            stepBigMonths:12,
            altField:"",
            altFormat:"",
            constrainInput:true,
            showButtonPanel:false,
            autoSize:false
        };
        
        d.extend(this._defaults,this.regional[""]);
        this.dpDiv=d('<div id="'+this._mainDivId+'" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all ui-helper-hidden-accessible"></div>')
    }
    function E(a,b){
        d.extend(a,
            b);
        for(var c in b)if(b[c]==null||b[c]==undefined)a[c]=b[c];return a
    }
    d.extend(d.ui,{
        datepicker:{
            version:"1.8.2"
        }
    });
    var y=(new Date).getTime();
    d.extend(J.prototype,{
        markerClassName:"hasDatepicker",
        log:function(){
            this.debug&&console.log.apply("",arguments)
        },
        _widgetDatepicker:function(){
            return this.dpDiv
        },
        setDefaults:function(a){
            E(this._defaults,a||{});
            return this
        },
        _attachDatepicker:function(a,b){
            var c=null;
            for(var e in this._defaults){
                var f=a.getAttribute("date:"+e);
                if(f){
                    c=c||{};
                
                    try{
                        c[e]=eval(f)
                    }catch(h){
                        c[e]=
                        f
                    }
                }
            }
            e=a.nodeName.toLowerCase();
            f=e=="div"||e=="span";
            if(!a.id){
                this.uuid+=1;
                a.id="dp"+this.uuid
            }
            var i=this._newInst(d(a),f);
            i.settings=d.extend({},b||{},c||{});
            if(e=="input")this._connectDatepicker(a,i);else f&&this._inlineDatepicker(a,i)
        },
        _newInst:function(a,b){
            return{
                id:a[0].id.replace(/([^A-Za-z0-9_])/g,"\\\\$1"),
                input:a,
                selectedDay:0,
                selectedMonth:0,
                selectedYear:0,
                drawMonth:0,
                drawYear:0,
                inline:b,
                dpDiv:!b?this.dpDiv:d('<div class="'+this._inlineClass+' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>')
            }
        },
        _connectDatepicker:function(a,b){
            var c=d(a);
            b.append=d([]);
            b.trigger=d([]);
            if(!c.hasClass(this.markerClassName)){
                this._attachments(c,b);
                c.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp).bind("setData.datepicker",function(e,f,h){
                    b.settings[f]=h
                }).bind("getData.datepicker",function(e,f){
                    return this._get(b,f)
                });
                this._autoSize(b);
                d.data(a,"datepicker",b)
            }
        },
        _attachments:function(a,b){
            var c=this._get(b,"appendText"),e=this._get(b,"isRTL");
            b.append&&
            b.append.remove();
            if(c){
                b.append=d('<span class="'+this._appendClass+'">'+c+"</span>");
                a[e?"before":"after"](b.append)
            }
            a.unbind("focus",this._showDatepicker);
            b.trigger&&b.trigger.remove();
            c=this._get(b,"showOn");
            if(c=="focus"||c=="both")a.focus(this._showDatepicker);
            if(c=="button"||c=="both"){
                c=this._get(b,"buttonText");
                var f=this._get(b,"buttonImage");
                b.trigger=d(this._get(b,"buttonImageOnly")?d("<img/>").addClass(this._triggerClass).attr({
                    src:f,
                    alt:c,
                    title:c
                }):d('<button type="button"></button>').addClass(this._triggerClass).html(f==
                    ""?c:d("<img/>").attr({
                        src:f,
                        alt:c,
                        title:c
                    })));
                a[e?"before":"after"](b.trigger);
                b.trigger.click(function(){
                    d.datepicker._datepickerShowing&&d.datepicker._lastInput==a[0]?d.datepicker._hideDatepicker():d.datepicker._showDatepicker(a[0]);
                    return false
                })
            }
        },
        _autoSize:function(a){
            if(this._get(a,"autoSize")&&!a.inline){
                var b=new Date(2009,11,20),c=this._get(a,"dateFormat");
                if(c.match(/[DM]/)){
                    var e=function(f){
                        for(var h=0,i=0,g=0;g<f.length;g++)if(f[g].length>h){
                            h=f[g].length;
                            i=g
                        }
                        return i
                    };
                
                    b.setMonth(e(this._get(a,
                        c.match(/MM/)?"monthNames":"monthNamesShort")));
                    b.setDate(e(this._get(a,c.match(/DD/)?"dayNames":"dayNamesShort"))+20-b.getDay())
                }
                a.input.attr("size",this._formatDate(a,b).length)
            }
        },
        _inlineDatepicker:function(a,b){
            var c=d(a);
            if(!c.hasClass(this.markerClassName)){
                c.addClass(this.markerClassName).append(b.dpDiv).bind("setData.datepicker",function(e,f,h){
                    b.settings[f]=h
                }).bind("getData.datepicker",function(e,f){
                    return this._get(b,f)
                });
                d.data(a,"datepicker",b);
                this._setDate(b,this._getDefaultDate(b),
                    true);
                this._updateDatepicker(b);
                this._updateAlternate(b)
            }
        },
        _dialogDatepicker:function(a,b,c,e,f){
            a=this._dialogInst;
            if(!a){
                this.uuid+=1;
                this._dialogInput=d('<input type="text" id="'+("dp"+this.uuid)+'" style="position: absolute; top: -100px; width: 0px; z-index: -10;"/>');
                this._dialogInput.keydown(this._doKeyDown);
                d("body").append(this._dialogInput);
                a=this._dialogInst=this._newInst(this._dialogInput,false);
                a.settings={};
        
                d.data(this._dialogInput[0],"datepicker",a)
            }
            E(a.settings,e||{});
            b=b&&b.constructor==
            Date?this._formatDate(a,b):b;
            this._dialogInput.val(b);
            this._pos=f?f.length?f:[f.pageX,f.pageY]:null;
            if(!this._pos)this._pos=[document.documentElement.clientWidth/2-100+(document.documentElement.scrollLeft||document.body.scrollLeft),document.documentElement.clientHeight/2-150+(document.documentElement.scrollTop||document.body.scrollTop)];
            this._dialogInput.css("left",this._pos[0]+20+"px").css("top",this._pos[1]+"px");
            a.settings.onSelect=c;
            this._inDialog=true;
            this.dpDiv.addClass(this._dialogClass);
            this._showDatepicker(this._dialogInput[0]);
            d.blockUI&&d.blockUI(this.dpDiv);
            d.data(this._dialogInput[0],"datepicker",a);
            return this
        },
        _destroyDatepicker:function(a){
            var b=d(a),c=d.data(a,"datepicker");
            if(b.hasClass(this.markerClassName)){
                var e=a.nodeName.toLowerCase();
                d.removeData(a,"datepicker");
                if(e=="input"){
                    c.append.remove();
                    c.trigger.remove();
                    b.removeClass(this.markerClassName).unbind("focus",this._showDatepicker).unbind("keydown",this._doKeyDown).unbind("keypress",this._doKeyPress).unbind("keyup",this._doKeyUp)
                }else if(e=="div"||e=="span")b.removeClass(this.markerClassName).empty()
            }
        },
        _enableDatepicker:function(a){
            var b=d(a),c=d.data(a,"datepicker");
            if(b.hasClass(this.markerClassName)){
                var e=a.nodeName.toLowerCase();
                if(e=="input"){
                    a.disabled=false;
                    c.trigger.filter("button").each(function(){
                        this.disabled=false
                    }).end().filter("img").css({
                        opacity:"1.0",
                        cursor:""
                    })
                }else if(e=="div"||e=="span")b.children("."+this._inlineClass).children().removeClass("ui-state-disabled");
                this._disabledInputs=d.map(this._disabledInputs,function(f){
                    return f==a?null:f
                })
            }
        },
        _disableDatepicker:function(a){
            var b=
            d(a),c=d.data(a,"datepicker");
            if(b.hasClass(this.markerClassName)){
                var e=a.nodeName.toLowerCase();
                if(e=="input"){
                    a.disabled=true;
                    c.trigger.filter("button").each(function(){
                        this.disabled=true
                    }).end().filter("img").css({
                        opacity:"0.5",
                        cursor:"default"
                    })
                }else if(e=="div"||e=="span")b.children("."+this._inlineClass).children().addClass("ui-state-disabled");
                this._disabledInputs=d.map(this._disabledInputs,function(f){
                    return f==a?null:f
                });
                this._disabledInputs[this._disabledInputs.length]=a
            }
        },
        _isDisabledDatepicker:function(a){
            if(!a)return false;
            for(var b=0;b<this._disabledInputs.length;b++)if(this._disabledInputs[b]==a)return true;return false
        },
        _getInst:function(a){
            try{
                return d.data(a,"datepicker")
            }catch(b){
                throw"Missing instance data for this datepicker";
            }
        },
        _optionDatepicker:function(a,b,c){
            var e=this._getInst(a);
            if(arguments.length==2&&typeof b=="string")return b=="defaults"?d.extend({},d.datepicker._defaults):e?b=="all"?d.extend({},e.settings):this._get(e,b):null;
            var f=b||{};
    
            if(typeof b=="string"){
                f={};
        
                f[b]=c
            }
            if(e){
                this._curInst==e&&
                this._hideDatepicker();
                var h=this._getDateDatepicker(a,true);
                E(e.settings,f);
                this._attachments(d(a),e);
                this._autoSize(e);
                this._setDateDatepicker(a,h);
                this._updateDatepicker(e)
            }
        },
        _changeDatepicker:function(a,b,c){
            this._optionDatepicker(a,b,c)
        },
        _refreshDatepicker:function(a){
            (a=this._getInst(a))&&this._updateDatepicker(a)
        },
        _setDateDatepicker:function(a,b){
            if(a=this._getInst(a)){
                this._setDate(a,b);
                this._updateDatepicker(a);
                this._updateAlternate(a)
            }
        },
        _getDateDatepicker:function(a,b){
            (a=this._getInst(a))&&
            !a.inline&&this._setDateFromField(a,b);
            return a?this._getDate(a):null
        },
        _doKeyDown:function(a){
            var b=d.datepicker._getInst(a.target),c=true,e=b.dpDiv.is(".ui-datepicker-rtl");
            b._keyEvent=true;
            if(d.datepicker._datepickerShowing)switch(a.keyCode){
                case 9:
                    d.datepicker._hideDatepicker();
                    c=false;
                    break;
                case 13:
                    c=d("td."+d.datepicker._dayOverClass,b.dpDiv).add(d("td."+d.datepicker._currentClass,b.dpDiv));
                    c[0]?d.datepicker._selectDay(a.target,b.selectedMonth,b.selectedYear,c[0]):d.datepicker._hideDatepicker();
                    return false;
                case 27:
                    d.datepicker._hideDatepicker();
                    break;
                case 33:
                    d.datepicker._adjustDate(a.target,a.ctrlKey?-d.datepicker._get(b,"stepBigMonths"):-d.datepicker._get(b,"stepMonths"),"M");
                    break;
                case 34:
                    d.datepicker._adjustDate(a.target,a.ctrlKey?+d.datepicker._get(b,"stepBigMonths"):+d.datepicker._get(b,"stepMonths"),"M");
                    break;
                case 35:
                    if(a.ctrlKey||a.metaKey)d.datepicker._clearDate(a.target);
                    c=a.ctrlKey||a.metaKey;
                    break;
                case 36:
                    if(a.ctrlKey||a.metaKey)d.datepicker._gotoToday(a.target);
                    c=a.ctrlKey||
                    a.metaKey;
                    break;
                case 37:
                    if(a.ctrlKey||a.metaKey)d.datepicker._adjustDate(a.target,e?+1:-1,"D");
                    c=a.ctrlKey||a.metaKey;
                    if(a.originalEvent.altKey)d.datepicker._adjustDate(a.target,a.ctrlKey?-d.datepicker._get(b,"stepBigMonths"):-d.datepicker._get(b,"stepMonths"),"M");
                    break;
                case 38:
                    if(a.ctrlKey||a.metaKey)d.datepicker._adjustDate(a.target,-7,"D");
                    c=a.ctrlKey||a.metaKey;
                    break;
                case 39:
                    if(a.ctrlKey||a.metaKey)d.datepicker._adjustDate(a.target,e?-1:+1,"D");
                    c=a.ctrlKey||a.metaKey;
                    if(a.originalEvent.altKey)d.datepicker._adjustDate(a.target,
                        a.ctrlKey?+d.datepicker._get(b,"stepBigMonths"):+d.datepicker._get(b,"stepMonths"),"M");
                    break;
                case 40:
                    if(a.ctrlKey||a.metaKey)d.datepicker._adjustDate(a.target,+7,"D");
                    c=a.ctrlKey||a.metaKey;
                    break;
                default:
                    c=false
            }else if(a.keyCode==36&&a.ctrlKey)d.datepicker._showDatepicker(this);else c=false;
            if(c){
                a.preventDefault();
                a.stopPropagation()
            }
        },
        _doKeyPress:function(a){
            var b=d.datepicker._getInst(a.target);
            if(d.datepicker._get(b,"constrainInput")){
                b=d.datepicker._possibleChars(d.datepicker._get(b,"dateFormat"));
                var c=String.fromCharCode(a.charCode==undefined?a.keyCode:a.charCode);
                return a.ctrlKey||c<" "||!b||b.indexOf(c)>-1
            }
        },
        _doKeyUp:function(a){
            a=d.datepicker._getInst(a.target);
            if(a.input.val()!=a.lastVal)try{
                if(d.datepicker.parseDate(d.datepicker._get(a,"dateFormat"),a.input?a.input.val():null,d.datepicker._getFormatConfig(a))){
                    d.datepicker._setDateFromField(a);
                    d.datepicker._updateAlternate(a);
                    d.datepicker._updateDatepicker(a)
                }
            }catch(b){
                d.datepicker.log(b)
            }
            return true
        },
        _showDatepicker:function(a){
            a=a.target||
            a;
            if(a.nodeName.toLowerCase()!="input")a=d("input",a.parentNode)[0];
            if(!(d.datepicker._isDisabledDatepicker(a)||d.datepicker._lastInput==a)){
                var b=d.datepicker._getInst(a);
                d.datepicker._curInst&&d.datepicker._curInst!=b&&d.datepicker._curInst.dpDiv.stop(true,true);
                var c=d.datepicker._get(b,"beforeShow");
                E(b.settings,c?c.apply(a,[a,b]):{});
                b.lastVal=null;
                d.datepicker._lastInput=a;
                d.datepicker._setDateFromField(b);
                if(d.datepicker._inDialog)a.value="";
                if(!d.datepicker._pos){
                    d.datepicker._pos=d.datepicker._findPos(a);
                    d.datepicker._pos[1]+=a.offsetHeight
                }
                var e=false;
                d(a).parents().each(function(){
                    e|=d(this).css("position")=="fixed";
                    return!e
                });
                if(e&&d.browser.opera){
                    d.datepicker._pos[0]-=document.documentElement.scrollLeft;
                    d.datepicker._pos[1]-=document.documentElement.scrollTop
                }
                c={
                    left:d.datepicker._pos[0],
                    top:d.datepicker._pos[1]
                };
            
                d.datepicker._pos=null;
                b.dpDiv.css({
                    position:"absolute",
                    display:"block",
                    top:"-1000px"
                });
                d.datepicker._updateDatepicker(b);
                c=d.datepicker._checkOffset(b,c,e);
                b.dpDiv.css({
                    position:d.datepicker._inDialog&&
                    d.blockUI?"static":e?"fixed":"absolute",
                    display:"none",
                    left:c.left+"px",
                    top:c.top+"px"
                });
                if(!b.inline){
                    c=d.datepicker._get(b,"showAnim");
                    var f=d.datepicker._get(b,"duration"),h=function(){
                        d.datepicker._datepickerShowing=true;
                        var i=d.datepicker._getBorders(b.dpDiv);
                        b.dpDiv.find("iframe.ui-datepicker-cover").css({
                            left:-i[0],
                            top:-i[1],
                            width:b.dpDiv.outerWidth(),
                            height:b.dpDiv.outerHeight()
                        })
                    };
                
                    b.dpDiv.zIndex(d(a).zIndex()+1);
                    d.effects&&d.effects[c]?b.dpDiv.show(c,d.datepicker._get(b,"showOptions"),f,
                        h):b.dpDiv[c||"show"](c?f:null,h);
                    if(!c||!f)h();
                    b.input.is(":visible")&&!b.input.is(":disabled")&&b.input.focus();
                    d.datepicker._curInst=b
                }
            }
        },
        _updateDatepicker:function(a){
            var b=this,c=d.datepicker._getBorders(a.dpDiv);
            a.dpDiv.empty().append(this._generateHTML(a)).find("iframe.ui-datepicker-cover").css({
                left:-c[0],
                top:-c[1],
                width:a.dpDiv.outerWidth(),
                height:a.dpDiv.outerHeight()
            }).end().find("button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a").bind("mouseout",function(){
                d(this).removeClass("ui-state-hover");
                this.className.indexOf("ui-datepicker-prev")!=-1&&d(this).removeClass("ui-datepicker-prev-hover");
                this.className.indexOf("ui-datepicker-next")!=-1&&d(this).removeClass("ui-datepicker-next-hover")
            }).bind("mouseover",function(){
                if(!b._isDisabledDatepicker(a.inline?a.dpDiv.parent()[0]:a.input[0])){
                    d(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover");
                    d(this).addClass("ui-state-hover");
                    this.className.indexOf("ui-datepicker-prev")!=-1&&d(this).addClass("ui-datepicker-prev-hover");
                    this.className.indexOf("ui-datepicker-next")!=-1&&d(this).addClass("ui-datepicker-next-hover")
                }
            }).end().find("."+this._dayOverClass+" a").trigger("mouseover").end();
            c=this._getNumberOfMonths(a);
            var e=c[1];
            e>1?a.dpDiv.addClass("ui-datepicker-multi-"+e).css("width",17*e+"em"):a.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width("");
            a.dpDiv[(c[0]!=1||c[1]!=1?"add":"remove")+"Class"]("ui-datepicker-multi");
            a.dpDiv[(this._get(a,"isRTL")?"add":"remove")+"Class"]("ui-datepicker-rtl");
            a==d.datepicker._curInst&&d.datepicker._datepickerShowing&&a.input&&a.input.is(":visible")&&!a.input.is(":disabled")&&a.input.focus()
        },
        _getBorders:function(a){
            var b=function(c){
                return{
                    thin:1,
                    medium:2,
                    thick:3
                }
                [c]||c
            };
        
            return[parseFloat(b(a.css("border-left-width"))),parseFloat(b(a.css("border-top-width")))]
        },
        _checkOffset:function(a,b,c){
            var e=a.dpDiv.outerWidth(),f=a.dpDiv.outerHeight(),h=a.input?a.input.outerWidth():0,i=a.input?a.input.outerHeight():0,g=document.documentElement.clientWidth+d(document).scrollLeft(),
            k=document.documentElement.clientHeight+d(document).scrollTop();
            b.left-=this._get(a,"isRTL")?e-h:0;
            b.left-=c&&b.left==a.input.offset().left?d(document).scrollLeft():0;
            b.top-=c&&b.top==a.input.offset().top+i?d(document).scrollTop():0;
            b.left-=Math.min(b.left,b.left+e>g&&g>e?Math.abs(b.left+e-g):0);
            b.top-=Math.min(b.top,b.top+f>k&&k>f?Math.abs(f+i):0);
            return b
        },
        _findPos:function(a){
            for(var b=this._get(this._getInst(a),"isRTL");a&&(a.type=="hidden"||a.nodeType!=1);)a=a[b?"previousSibling":"nextSibling"];
            a=d(a).offset();
            return[a.left,a.top]
        },
        _hideDatepicker:function(a){
            var b=this._curInst;
            if(!(!b||a&&b!=d.data(a,"datepicker")))if(this._datepickerShowing){
                a=this._get(b,"showAnim");
                var c=this._get(b,"duration"),e=function(){
                    d.datepicker._tidyDialog(b);
                    this._curInst=null
                };
            
                d.effects&&d.effects[a]?b.dpDiv.hide(a,d.datepicker._get(b,"showOptions"),c,e):b.dpDiv[a=="slideDown"?"slideUp":a=="fadeIn"?"fadeOut":"hide"](a?c:null,e);
                a||e();
                if(a=this._get(b,"onClose"))a.apply(b.input?b.input[0]:null,[b.input?b.input.val():
                    "",b]);
                this._datepickerShowing=false;
                this._lastInput=null;
                if(this._inDialog){
                    this._dialogInput.css({
                        position:"absolute",
                        left:"0",
                        top:"-100px"
                    });
                    if(d.blockUI){
                        d.unblockUI();
                        d("body").append(this.dpDiv)
                    }
                }
                this._inDialog=false
            }
        },
        _tidyDialog:function(a){
            a.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")
        },
        _checkExternalClick:function(a){
            if(d.datepicker._curInst){
                a=d(a.target);
                a[0].id!=d.datepicker._mainDivId&&a.parents("#"+d.datepicker._mainDivId).length==0&&!a.hasClass(d.datepicker.markerClassName)&&
                !a.hasClass(d.datepicker._triggerClass)&&d.datepicker._datepickerShowing&&!(d.datepicker._inDialog&&d.blockUI)&&d.datepicker._hideDatepicker()
            }
        },
        _adjustDate:function(a,b,c){
            a=d(a);
            var e=this._getInst(a[0]);
            if(!this._isDisabledDatepicker(a[0])){
                this._adjustInstDate(e,b+(c=="M"?this._get(e,"showCurrentAtPos"):0),c);
                this._updateDatepicker(e)
            }
        },
        _gotoToday:function(a){
            a=d(a);
            var b=this._getInst(a[0]);
            if(this._get(b,"gotoCurrent")&&b.currentDay){
                b.selectedDay=b.currentDay;
                b.drawMonth=b.selectedMonth=b.currentMonth;
                b.drawYear=b.selectedYear=b.currentYear
            }else{
                var c=new Date;
                b.selectedDay=c.getDate();
                b.drawMonth=b.selectedMonth=c.getMonth();
                b.drawYear=b.selectedYear=c.getFullYear()
            }
            this._notifyChange(b);
            this._adjustDate(a)
        },
        _selectMonthYear:function(a,b,c){
            a=d(a);
            var e=this._getInst(a[0]);
            e._selectingMonthYear=false;
            e["selected"+(c=="M"?"Month":"Year")]=e["draw"+(c=="M"?"Month":"Year")]=parseInt(b.options[b.selectedIndex].value,10);
            this._notifyChange(e);
            this._adjustDate(a)
        },
        _clickMonthYear:function(a){
            a=this._getInst(d(a)[0]);
            a.input&&a._selectingMonthYear&&!d.browser.msie&&a.input.focus();
            a._selectingMonthYear=!a._selectingMonthYear
        },
        _selectDay:function(a,b,c,e){
            var f=d(a);
            if(!(d(e).hasClass(this._unselectableClass)||this._isDisabledDatepicker(f[0]))){
                f=this._getInst(f[0]);
                f.selectedDay=f.currentDay=d("a",e).html();
                f.selectedMonth=f.currentMonth=b;
                f.selectedYear=f.currentYear=c;
                this._selectDate(a,this._formatDate(f,f.currentDay,f.currentMonth,f.currentYear))
            }
        },
        _clearDate:function(a){
            a=d(a);
            this._getInst(a[0]);
            this._selectDate(a,
                "")
        },
        _selectDate:function(a,b){
            a=this._getInst(d(a)[0]);
            b=b!=null?b:this._formatDate(a);
            a.input&&a.input.val(b);
            this._updateAlternate(a);
            var c=this._get(a,"onSelect");
            if(c)c.apply(a.input?a.input[0]:null,[b,a]);else a.input&&a.input.trigger("change");
            if(a.inline)this._updateDatepicker(a);
            else{
                this._hideDatepicker();
                this._lastInput=a.input[0];
                typeof a.input[0]!="object"&&a.input.focus();
                this._lastInput=null
            }
        },
        _updateAlternate:function(a){
            var b=this._get(a,"altField");
            if(b){
                var c=this._get(a,"altFormat")||
                this._get(a,"dateFormat"),e=this._getDate(a),f=this.formatDate(c,e,this._getFormatConfig(a));
                d(b).each(function(){
                    d(this).val(f)
                })
            }
        },
        noWeekends:function(a){
            a=a.getDay();
            return[a>0&&a<6,""]
        },
        iso8601Week:function(a){
            a=new Date(a.getTime());
            a.setDate(a.getDate()+4-(a.getDay()||7));
            var b=a.getTime();
            a.setMonth(0);
            a.setDate(1);
            return Math.floor(Math.round((b-a)/864E5)/7)+1
        },
        parseDate:function(a,b,c){
            if(a==null||b==null)throw"Invalid arguments";
            b=typeof b=="object"?b.toString():b+"";
            if(b=="")return null;
            for(var e=(c?c.shortYearCutoff:null)||this._defaults.shortYearCutoff,f=(c?c.dayNamesShort:null)||this._defaults.dayNamesShort,h=(c?c.dayNames:null)||this._defaults.dayNames,i=(c?c.monthNamesShort:null)||this._defaults.monthNamesShort,g=(c?c.monthNames:null)||this._defaults.monthNames,k=c=-1,l=-1,u=-1,j=false,o=function(p){
                (p=z+1<a.length&&a.charAt(z+1)==p)&&z++;
                return p
            },m=function(p){
                o(p);
                p=new RegExp("^\\d{1,"+(p=="@"?14:p=="!"?20:p=="y"?4:p=="o"?3:2)+"}");
                p=b.substring(s).match(p);
                if(!p)throw"Missing number at position "+
                    s;
                s+=p[0].length;
                return parseInt(p[0],10)
            },n=function(p,w,G){
                p=o(p)?G:w;
                for(w=0;w<p.length;w++)if(b.substr(s,p[w].length)==p[w]){
                    s+=p[w].length;
                    return w+1
                }
                throw"Unknown name at position "+s;
            },r=function(){
                if(b.charAt(s)!=a.charAt(z))throw"Unexpected literal at position "+s;
                s++
            },s=0,z=0;z<a.length;z++)if(j)if(a.charAt(z)=="'"&&!o("'"))j=false;else r();else switch(a.charAt(z)){
                case "d":
                    l=m("d");
                    break;
                case "D":
                    n("D",f,h);
                    break;
                case "o":
                    u=m("o");
                    break;
                case "m":
                    k=m("m");
                    break;
                case "M":
                    k=n("M",i,g);
                    break;
                case "y":
                    c=m("y");
                    break;
                case "@":
                    var v=new Date(m("@"));
                    c=v.getFullYear();
                    k=v.getMonth()+1;
                    l=v.getDate();
                    break;
                case "!":
                    v=new Date((m("!")-this._ticksTo1970)/1E4);
                    c=v.getFullYear();
                    k=v.getMonth()+1;
                    l=v.getDate();
                    break;
                case "'":
                    if(o("'"))r();else j=true;
                    break;
                default:
                    r()
            }
            if(c==-1)c=(new Date).getFullYear();
            else if(c<100)c+=(new Date).getFullYear()-(new Date).getFullYear()%100+(c<=e?0:-100);
            if(u>-1){
                k=1;
                l=u;
                do{
                    e=this._getDaysInMonth(c,k-1);
                    if(l<=e)break;
                    k++;
                    l-=e
                }while(1)
            }
            v=this._daylightSavingAdjust(new Date(c,
                k-1,l));
            if(v.getFullYear()!=c||v.getMonth()+1!=k||v.getDate()!=l)throw"Invalid date";
            return v
        },
        ATOM:"yy-mm-dd",
        COOKIE:"D, dd M yy",
        ISO_8601:"yy-mm-dd",
        RFC_822:"D, d M y",
        RFC_850:"DD, dd-M-y",
        RFC_1036:"D, d M y",
        RFC_1123:"D, d M yy",
        RFC_2822:"D, d M yy",
        RSS:"D, d M y",
        TICKS:"!",
        TIMESTAMP:"@",
        W3C:"yy-mm-dd",
        _ticksTo1970:(718685+Math.floor(492.5)-Math.floor(19.7)+Math.floor(4.925))*24*60*60*1E7,
        formatDate:function(a,b,c){
            if(!b)return"";
            var e=(c?c.dayNamesShort:null)||this._defaults.dayNamesShort,f=(c?
                c.dayNames:null)||this._defaults.dayNames,h=(c?c.monthNamesShort:null)||this._defaults.monthNamesShort;
            c=(c?c.monthNames:null)||this._defaults.monthNames;
            var i=function(o){
                (o=j+1<a.length&&a.charAt(j+1)==o)&&j++;
                return o
            },g=function(o,m,n){
                m=""+m;
                if(i(o))for(;m.length<n;)m="0"+m;
                return m
            },k=function(o,m,n,r){
                return i(o)?r[m]:n[m]
            },l="",u=false;
            if(b)for(var j=0;j<a.length;j++)if(u)if(a.charAt(j)=="'"&&!i("'"))u=false;else l+=a.charAt(j);else switch(a.charAt(j)){
                case "d":
                    l+=g("d",b.getDate(),2);
                    break;
                case "D":
                    l+=k("D",b.getDay(),e,f);
                    break;
                case "o":
                    l+=g("o",(b.getTime()-(new Date(b.getFullYear(),0,0)).getTime())/864E5,3);
                    break;
                case "m":
                    l+=g("m",b.getMonth()+1,2);
                    break;
                case "M":
                    l+=k("M",b.getMonth(),h,c);
                    break;
                case "y":
                    l+=i("y")?b.getFullYear():(b.getYear()%100<10?"0":"")+b.getYear()%100;
                    break;
                case "@":
                    l+=b.getTime();
                    break;
                case "!":
                    l+=b.getTime()*1E4+this._ticksTo1970;
                    break;
                case "'":
                    if(i("'"))l+="'";else u=true;
                    break;
                default:
                    l+=a.charAt(j)
            }
            return l
        },
        _possibleChars:function(a){
            for(var b="",c=false,
                e=function(h){
                    (h=f+1<a.length&&a.charAt(f+1)==h)&&f++;
                    return h
                },f=0;f<a.length;f++)if(c)if(a.charAt(f)=="'"&&!e("'"))c=false;else b+=a.charAt(f);else switch(a.charAt(f)){
                case "d":case "m":case "y":case "@":
                    b+="0123456789";
                    break;
                case "D":case "M":
                    return null;
                case "'":
                    if(e("'"))b+="'";else c=true;
                    break;
                default:
                    b+=a.charAt(f)
            }
            return b
        },
        _get:function(a,b){
            return a.settings[b]!==undefined?a.settings[b]:this._defaults[b]
        },
        _setDateFromField:function(a,b){
            if(a.input.val()!=a.lastVal){
                var c=this._get(a,"dateFormat"),
                e=a.lastVal=a.input?a.input.val():null,f,h;
                f=h=this._getDefaultDate(a);
                var i=this._getFormatConfig(a);
                try{
                    f=this.parseDate(c,e,i)||h
                }catch(g){
                    this.log(g);
                    e=b?"":e
                }
                a.selectedDay=f.getDate();
                a.drawMonth=a.selectedMonth=f.getMonth();
                a.drawYear=a.selectedYear=f.getFullYear();
                a.currentDay=e?f.getDate():0;
                a.currentMonth=e?f.getMonth():0;
                a.currentYear=e?f.getFullYear():0;
                this._adjustInstDate(a)
            }
        },
        _getDefaultDate:function(a){
            return this._restrictMinMax(a,this._determineDate(a,this._get(a,"defaultDate"),new Date))
        },
        _determineDate:function(a,b,c){
            var e=function(h){
                var i=new Date;
                i.setDate(i.getDate()+h);
                return i
            },f=function(h){
                try{
                    return d.datepicker.parseDate(d.datepicker._get(a,"dateFormat"),h,d.datepicker._getFormatConfig(a))
                }catch(i){}
                var g=(h.toLowerCase().match(/^c/)?d.datepicker._getDate(a):null)||new Date,k=g.getFullYear(),l=g.getMonth();
                g=g.getDate();
                for(var u=/([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g,j=u.exec(h);j;){
                    switch(j[2]||"d"){
                        case "d":case "D":
                            g+=parseInt(j[1],10);
                            break;
                        case "w":case "W":
                            g+=parseInt(j[1],
                                10)*7;
                            break;
                        case "m":case "M":
                            l+=parseInt(j[1],10);
                            g=Math.min(g,d.datepicker._getDaysInMonth(k,l));
                            break;
                        case "y":case "Y":
                            k+=parseInt(j[1],10);
                            g=Math.min(g,d.datepicker._getDaysInMonth(k,l));
                            break
                    }
                    j=u.exec(h)
                }
                return new Date(k,l,g)
            };
        
            if(b=(b=b==null?c:typeof b=="string"?f(b):typeof b=="number"?isNaN(b)?c:e(b):b)&&b.toString()=="Invalid Date"?c:b){
                b.setHours(0);
                b.setMinutes(0);
                b.setSeconds(0);
                b.setMilliseconds(0)
            }
            return this._daylightSavingAdjust(b)
        },
        _daylightSavingAdjust:function(a){
            if(!a)return null;
            a.setHours(a.getHours()>12?a.getHours()+2:0);
            return a
        },
        _setDate:function(a,b,c){
            var e=!b,f=a.selectedMonth,h=a.selectedYear;
            b=this._restrictMinMax(a,this._determineDate(a,b,new Date));
            a.selectedDay=a.currentDay=b.getDate();
            a.drawMonth=a.selectedMonth=a.currentMonth=b.getMonth();
            a.drawYear=a.selectedYear=a.currentYear=b.getFullYear();
            if((f!=a.selectedMonth||h!=a.selectedYear)&&!c)this._notifyChange(a);
            this._adjustInstDate(a);
            if(a.input)a.input.val(e?"":this._formatDate(a))
        },
        _getDate:function(a){
            return!a.currentYear||
            a.input&&a.input.val()==""?null:this._daylightSavingAdjust(new Date(a.currentYear,a.currentMonth,a.currentDay))
        },
        _generateHTML:function(a){
            var b=new Date;
            b=this._daylightSavingAdjust(new Date(b.getFullYear(),b.getMonth(),b.getDate()));
            var c=this._get(a,"isRTL"),e=this._get(a,"showButtonPanel"),f=this._get(a,"hideIfNoPrevNext"),h=this._get(a,"navigationAsDateFormat"),i=this._getNumberOfMonths(a),g=this._get(a,"showCurrentAtPos"),k=this._get(a,"stepMonths"),l=i[0]!=1||i[1]!=1,u=this._daylightSavingAdjust(!a.currentDay?
                new Date(9999,9,9):new Date(a.currentYear,a.currentMonth,a.currentDay)),j=this._getMinMaxDate(a,"min"),o=this._getMinMaxDate(a,"max");
            g=a.drawMonth-g;
            var m=a.drawYear;
            if(g<0){
                g+=12;
                m--
            }
            if(o){
                var n=this._daylightSavingAdjust(new Date(o.getFullYear(),o.getMonth()-i[0]*i[1]+1,o.getDate()));
                for(n=j&&n<j?j:n;this._daylightSavingAdjust(new Date(m,g,1))>n;){
                    g--;
                    if(g<0){
                        g=11;
                        m--
                    }
                }
            }
            a.drawMonth=g;
            a.drawYear=m;
            n=this._get(a,"prevText");
            n=!h?n:this.formatDate(n,this._daylightSavingAdjust(new Date(m,g-k,1)),this._getFormatConfig(a));
            n=this._canAdjustMonth(a,-1,m,g)?'<a class="ui-datepicker-prev ui-corner-all" onclick="DP_jQuery_'+y+".datepicker._adjustDate('#"+a.id+"', -"+k+", 'M');\" title=\""+n+'"><span class="ui-icon ui-icon-circle-triangle-'+(c?"e":"w")+'">'+n+"</span></a>":f?"":'<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="'+n+'"><span class="ui-icon ui-icon-circle-triangle-'+(c?"e":"w")+'">'+n+"</span></a>";
            var r=this._get(a,"nextText");
            r=!h?r:this.formatDate(r,this._daylightSavingAdjust(new Date(m,
                g+k,1)),this._getFormatConfig(a));
            f=this._canAdjustMonth(a,+1,m,g)?'<a class="ui-datepicker-next ui-corner-all" onclick="DP_jQuery_'+y+".datepicker._adjustDate('#"+a.id+"', +"+k+", 'M');\" title=\""+r+'"><span class="ui-icon ui-icon-circle-triangle-'+(c?"w":"e")+'">'+r+"</span></a>":f?"":'<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="'+r+'"><span class="ui-icon ui-icon-circle-triangle-'+(c?"w":"e")+'">'+r+"</span></a>";
            k=this._get(a,"currentText");
            r=this._get(a,"gotoCurrent")&&
            a.currentDay?u:b;
            k=!h?k:this.formatDate(k,r,this._getFormatConfig(a));
            h=!a.inline?'<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" onclick="DP_jQuery_'+y+'.datepicker._hideDatepicker();">'+this._get(a,"closeText")+"</button>":"";
            e=e?'<div class="ui-datepicker-buttonpane ui-widget-content">'+(c?h:"")+(this._isInRange(a,r)?'<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" onclick="DP_jQuery_'+
                y+".datepicker._gotoToday('#"+a.id+"');\">"+k+"</button>":"")+(c?"":h)+"</div>":"";
            h=parseInt(this._get(a,"firstDay"),10);
            h=isNaN(h)?0:h;
            k=this._get(a,"showWeek");
            r=this._get(a,"dayNames");
            this._get(a,"dayNamesShort");
            var s=this._get(a,"dayNamesMin"),z=this._get(a,"monthNames"),v=this._get(a,"monthNamesShort"),p=this._get(a,"beforeShowDay"),w=this._get(a,"showOtherMonths"),G=this._get(a,"selectOtherMonths");
            this._get(a,"calculateWeek");
            for(var K=this._getDefaultDate(a),H="",C=0;C<i[0];C++){
                for(var L=
                    "",D=0;D<i[1];D++){
                    var M=this._daylightSavingAdjust(new Date(m,g,a.selectedDay)),t=" ui-corner-all",x="";
                    if(l){
                        x+='<div class="ui-datepicker-group';
                        if(i[1]>1)switch(D){
                            case 0:
                                x+=" ui-datepicker-group-first";
                                t=" ui-corner-"+(c?"right":"left");
                                break;
                            case i[1]-1:
                                x+=" ui-datepicker-group-last";
                                t=" ui-corner-"+(c?"left":"right");
                                break;
                            default:
                                x+=" ui-datepicker-group-middle";
                                t="";
                                break
                        }
                        x+='">'
                    }
                    x+='<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix'+t+'">'+(/all|left/.test(t)&&C==0?c?
                        f:n:"")+(/all|right/.test(t)&&C==0?c?n:f:"")+this._generateMonthYearHeader(a,g,m,j,o,C>0||D>0,z,v)+'</div><table class="ui-datepicker-calendar"><thead><tr>';
                    var A=k?'<th class="ui-datepicker-week-col">'+this._get(a,"weekHeader")+"</th>":"";
                    for(t=0;t<7;t++){
                        var q=(t+h)%7;
                        A+="<th"+((t+h+6)%7>=5?' class="ui-datepicker-week-end"':"")+'><span title="'+r[q]+'">'+s[q]+"</span></th>"
                    }
                    x+=A+"</tr></thead><tbody>";
                    A=this._getDaysInMonth(m,g);
                    if(m==a.selectedYear&&g==a.selectedMonth)a.selectedDay=Math.min(a.selectedDay,
                        A);
                    t=(this._getFirstDayOfMonth(m,g)-h+7)%7;
                    A=l?6:Math.ceil((t+A)/7);
                    q=this._daylightSavingAdjust(new Date(m,g,1-t));
                    for(var N=0;N<A;N++){
                        x+="<tr>";
                        var O=!k?"":'<td class="ui-datepicker-week-col">'+this._get(a,"calculateWeek")(q)+"</td>";
                        for(t=0;t<7;t++){
                            var F=p?p.apply(a.input?a.input[0]:null,[q]):[true,""],B=q.getMonth()!=g,I=B&&!G||!F[0]||j&&q<j||o&&q>o;
                            O+='<td class="'+((t+h+6)%7>=5?" ui-datepicker-week-end":"")+(B?" ui-datepicker-other-month":"")+(q.getTime()==M.getTime()&&g==a.selectedMonth&&
                                a._keyEvent||K.getTime()==q.getTime()&&K.getTime()==M.getTime()?" "+this._dayOverClass:"")+(I?" "+this._unselectableClass+" ui-state-disabled":"")+(B&&!w?"":" "+F[1]+(q.getTime()==u.getTime()?" "+this._currentClass:"")+(q.getTime()==b.getTime()?" ui-datepicker-today":""))+'"'+((!B||w)&&F[2]?' title="'+F[2]+'"':"")+(I?"":' onclick="DP_jQuery_'+y+".datepicker._selectDay('#"+a.id+"',"+q.getMonth()+","+q.getFullYear()+', this);return false;"')+">"+(B&&!w?"&#xa0;":I?'<span class="ui-state-default">'+q.getDate()+
                                "</span>":'<a class="ui-state-default'+(q.getTime()==b.getTime()?" ui-state-highlight":"")+(q.getTime()==u.getTime()?" ui-state-active":"")+(B?" ui-priority-secondary":"")+'" href="#">'+q.getDate()+"</a>")+"</td>";
                            q.setDate(q.getDate()+1);
                            q=this._daylightSavingAdjust(q)
                        }
                        x+=O+"</tr>"
                    }
                    g++;
                    if(g>11){
                        g=0;
                        m++
                    }
                    x+="</tbody></table>"+(l?"</div>"+(i[0]>0&&D==i[1]-1?'<div class="ui-datepicker-row-break"></div>':""):"");
                    L+=x
                }
                H+=L
            }
            H+=e+(d.browser.msie&&parseInt(d.browser.version,10)<7&&!a.inline?'<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>':
                "");
            a._keyEvent=false;
            return H
        },
        _generateMonthYearHeader:function(a,b,c,e,f,h,i,g){
            var k=this._get(a,"changeMonth"),l=this._get(a,"changeYear"),u=this._get(a,"showMonthAfterYear"),j='<div class="ui-datepicker-title">',o="";
            if(h||!k)o+='<span class="ui-datepicker-month">'+i[b]+"</span>";
            else{
                i=e&&e.getFullYear()==c;
                var m=f&&f.getFullYear()==c;
                o+='<select class="ui-datepicker-month" onchange="DP_jQuery_'+y+".datepicker._selectMonthYear('#"+a.id+"', this, 'M');\" onclick=\"DP_jQuery_"+y+".datepicker._clickMonthYear('#"+
                a.id+"');\">";
                for(var n=0;n<12;n++)if((!i||n>=e.getMonth())&&(!m||n<=f.getMonth()))o+='<option value="'+n+'"'+(n==b?' selected="selected"':"")+">"+g[n]+"</option>";o+="</select>"
            }
            u||(j+=o+(h||!(k&&l)?"&#xa0;":""));
            if(h||!l)j+='<span class="ui-datepicker-year">'+c+"</span>";
            else{
                g=this._get(a,"yearRange").split(":");
                var r=(new Date).getFullYear();
                i=function(s){
                    s=s.match(/c[+-].*/)?c+parseInt(s.substring(1),10):s.match(/[+-].*/)?r+parseInt(s,10):parseInt(s,10);
                    return isNaN(s)?r:s
                };
            
                b=i(g[0]);
                g=Math.max(b,
                    i(g[1]||""));
                b=e?Math.max(b,e.getFullYear()):b;
                g=f?Math.min(g,f.getFullYear()):g;
                for(j+='<select class="ui-datepicker-year" onchange="DP_jQuery_'+y+".datepicker._selectMonthYear('#"+a.id+"', this, 'Y');\" onclick=\"DP_jQuery_"+y+".datepicker._clickMonthYear('#"+a.id+"');\">";b<=g;b++)j+='<option value="'+b+'"'+(b==c?' selected="selected"':"")+">"+b+"</option>";
                j+="</select>"
            }
            j+=this._get(a,"yearSuffix");
            if(u)j+=(h||!(k&&l)?"&#xa0;":"")+o;
            j+="</div>";
            return j
        },
        _adjustInstDate:function(a,b,c){
            var e=
            a.drawYear+(c=="Y"?b:0),f=a.drawMonth+(c=="M"?b:0);
            b=Math.min(a.selectedDay,this._getDaysInMonth(e,f))+(c=="D"?b:0);
            e=this._restrictMinMax(a,this._daylightSavingAdjust(new Date(e,f,b)));
            a.selectedDay=e.getDate();
            a.drawMonth=a.selectedMonth=e.getMonth();
            a.drawYear=a.selectedYear=e.getFullYear();
            if(c=="M"||c=="Y")this._notifyChange(a)
        },
        _restrictMinMax:function(a,b){
            var c=this._getMinMaxDate(a,"min");
            a=this._getMinMaxDate(a,"max");
            b=c&&b<c?c:b;
            return b=a&&b>a?a:b
        },
        _notifyChange:function(a){
            var b=this._get(a,
                "onChangeMonthYear");
            if(b)b.apply(a.input?a.input[0]:null,[a.selectedYear,a.selectedMonth+1,a])
        },
        _getNumberOfMonths:function(a){
            a=this._get(a,"numberOfMonths");
            return a==null?[1,1]:typeof a=="number"?[1,a]:a
        },
        _getMinMaxDate:function(a,b){
            return this._determineDate(a,this._get(a,b+"Date"),null)
        },
        _getDaysInMonth:function(a,b){
            return 32-(new Date(a,b,32)).getDate()
        },
        _getFirstDayOfMonth:function(a,b){
            return(new Date(a,b,1)).getDay()
        },
        _canAdjustMonth:function(a,b,c,e){
            var f=this._getNumberOfMonths(a);
            c=this._daylightSavingAdjust(new Date(c,e+(b<0?b:f[0]*f[1]),1));
            b<0&&c.setDate(this._getDaysInMonth(c.getFullYear(),c.getMonth()));
            return this._isInRange(a,c)
        },
        _isInRange:function(a,b){
            var c=this._getMinMaxDate(a,"min");
            a=this._getMinMaxDate(a,"max");
            return(!c||b.getTime()>=c.getTime())&&(!a||b.getTime()<=a.getTime())
        },
        _getFormatConfig:function(a){
            var b=this._get(a,"shortYearCutoff");
            b=typeof b!="string"?b:(new Date).getFullYear()%100+parseInt(b,10);
            return{
                shortYearCutoff:b,
                dayNamesShort:this._get(a,
                    "dayNamesShort"),
                dayNames:this._get(a,"dayNames"),
                monthNamesShort:this._get(a,"monthNamesShort"),
                monthNames:this._get(a,"monthNames")
            }
        },
        _formatDate:function(a,b,c,e){
            if(!b){
                a.currentDay=a.selectedDay;
                a.currentMonth=a.selectedMonth;
                a.currentYear=a.selectedYear
            }
            b=b?typeof b=="object"?b:this._daylightSavingAdjust(new Date(e,c,b)):this._daylightSavingAdjust(new Date(a.currentYear,a.currentMonth,a.currentDay));
            return this.formatDate(this._get(a,"dateFormat"),b,this._getFormatConfig(a))
        }
    });
    d.fn.datepicker=
    function(a){
        if(!d.datepicker.initialized){
            d(document).mousedown(d.datepicker._checkExternalClick).find("body").append(d.datepicker.dpDiv);
            d.datepicker.initialized=true
        }
        var b=Array.prototype.slice.call(arguments,1);
        if(typeof a=="string"&&(a=="isDisabled"||a=="getDate"||a=="widget"))return d.datepicker["_"+a+"Datepicker"].apply(d.datepicker,[this[0]].concat(b));
        if(a=="option"&&arguments.length==2&&typeof arguments[1]=="string")return d.datepicker["_"+a+"Datepicker"].apply(d.datepicker,[this[0]].concat(b));
        return this.each(function(){
            typeof a=="string"?d.datepicker["_"+a+"Datepicker"].apply(d.datepicker,[this].concat(b)):d.datepicker._attachDatepicker(this,a)
        })
    };
    
    d.datepicker=new J;
    d.datepicker.initialized=false;
    d.datepicker.uuid=(new Date).getTime();
    d.datepicker.version="1.8.2";
    window["DP_jQuery_"+y]=d
})(jQuery);
;