const DOM_EVENTS = {
    UIEvent: "abort DOMActivate error load resize scroll select unload",
    ProgressEvent: "abort error load loadend loadstart progress progress timeout",
    Event: "abort afterprint beforeprint cached canplay canplaythrough change chargingchange chargingtimechange checking close dischargingtimechange DOMContentLoaded downloading durationchange emptied ended ended error error error error fullscreenchange fullscreenerror input invalid languagechange levelchange loadeddata loadedmetadata noupdate obsolete offline online open open orientationchange pause pointerlockchange pointerlockerror play playing ratechange readystatechange reset seeked seeking stalled submit success suspend timeupdate updateready visibilitychange volumechange waiting",
    AnimationEvent: "animationend animationiteration animationstart",
    AudioProcessingEvent: "audioprocess",
    BeforeUnloadEvent: "beforeunload",
    TimeEvent: "beginEvent endEvent repeatEvent",
    OtherEvent: "blocked complete upgradeneeded versionchange",
    FocusEvent: "blur DOMFocusIn  Unimplemented DOMFocusOut  Unimplemented focus focusin focusout",
    MouseEvent: "click contextmenu dblclick mousedown mouseenter mouseleave mousemove mouseout mouseover mouseup show",
    SensorEvent: "compassneedscalibration Unimplemented userproximity",
    OfflineAudioCompletionEvent: "complete",
    CompositionEvent: "compositionend compositionstart compositionupdate",
    ClipboardEvent: "copy cut paste",
    DeviceLightEvent: "devicelight",
    DeviceMotionEvent: "devicemotion",
    DeviceOrientationEvent: "deviceorientation",
    DeviceProximityEvent: "deviceproximity",
    MutationNameEvent: "DOMAttributeNameChanged DOMElementNameChanged",
    MutationEvent: "DOMAttrModified DOMCharacterDataModified DOMNodeInserted DOMNodeInsertedIntoDocument DOMNodeRemoved DOMNodeRemovedFromDocument DOMSubtreeModified",
    DragEvent: "drag dragend dragenter dragleave dragover dragstart drop",
    GamepadEvent: "gamepadconnected gamepaddisconnected",
    HashChangeEvent: "hashchange",
    KeyboardEvent: "keydown keypress keyup",
    MessageEvent: "message message message message",
    PageTransitionEvent: "pagehide pageshow",
    PopStateEvent: "popstate",
    StorageEvent: "storage",
    SVGEvent: "SVGAbort SVGError SVGLoad SVGResize SVGScroll SVGUnload",
    SVGZoomEvent: "SVGZoom",
    TouchEvent: "touchcancel touchend touchenter touchleave touchmove touchstart",
    TransitionEvent: "transitionend",
    WheelEvent: "wheel"
};

const polyfillEventPath = (appWindow) => {
    // Object.keys(DOM_EVENTS).forEach((eventName) => {
    //     const events: string[] = DOM_EVENTS[eventName].split(' ').filter(Boolean)
    //     events.forEach((event) => {
    //         window.addEventListener(event, (e) => {
    //             if (e.composed) {
    //                 // @ts-ignore
    //                 e.path = e.composedPath()
    //             }
    //         })
    //     })

    // })
    console.error('appWindow==', appWindow)
    function setupPath (e) {
        console.error('setupPath=e==', e)
        if (e?.composed) {
            // @ts-ignore
            e.path = e.composedPath()
            console.error('setupPath=e2==', e.composedPath())
        }
    }

    const rawAddEventListener = appWindow.EventTarget.prototype.addEventListener
    const rawRemoveEventListener = appWindow.EventTarget.prototype.removeEventListener

    function initEventListenerList (ctx, eventName) {
        ctx.__eventListeners = ctx.__eventListeners || {}
        ctx.__eventListeners[eventName] = ctx.__eventListeners[eventName] || []
    }

    appWindow.EventTarget.prototype.addEventListener = function (...args) {
        const eventName = args[0]
        initEventListenerList(this, eventName)
        const eventListeners = this.__eventListeners[eventName]

        if (eventListeners.length === 0) {
            rawAddEventListener.apply(this, [args[0], setupPath, args[2]]) // addEventListener('evtName', fn, false)
        }
        this.__eventListeners[eventName].push(args[1])
        return rawAddEventListener.apply(this, args)
    }

    appWindow.EventTarget.prototype.removeEventListener = function (...args) {
        const eventName = args[0]
        initEventListenerList(this, eventName)
        const eventListeners = this.__eventListeners[eventName]

        const idx = eventListeners.findIndex((fn) => fn === args[1])
        ~idx && eventListeners.splice(idx, 1)

        if (this.__eventListeners[eventName].length === 0) {
            rawRemoveEventListener.apply(this, [args[0], setupPath, args[2]])
        }
        return rawRemoveEventListener.apply(this, args)
    }

    function injectNativeOnPath (target) {
        const descs = appWindow.Object.getOwnPropertyDescriptors(target)

        Object.keys(DOM_EVENTS).forEach((eventName) => {
            const events = DOM_EVENTS[eventName].split(' ').filter(Boolean)
            events.forEach((event) => {
                const eventName = `on${event.toLowerCase()}`
                if (descs[eventName]) {
                    const desc = descs[eventName]
                    appWindow.Object.defineProperty(target, eventName, {
                        ...desc,
                        get () {
                            return this[`_${eventName}`]
                        },
                        set (val) {
                            if (this[`_${eventName}`]) {
                                this.removeEventListener(event, this[`_${eventName}`])
                            }

                            this[`_${eventName}`] = val

                            if (val) {
                                this.addEventListener(event, val)
                            }

                            return void 0
                        },
                    })

                }

            })

        })
    }

    injectNativeOnPath(appWindow.HTMLElement.prototype)
    // injectNativeOnPath(appWindow)

}

const patchEventTarget = (appWindow) => {
    // @ts-ignore
    if (Event.prototype.__WUJIE_POLYFILL_EVENT_TARGET_PATCHED__) return
    // @ts-ignore
    Event.prototype.__WUJIE_POLYFILL_EVENT_TARGET_PATCHED__ = true

    const originEventTargetGetter = Object.getOwnPropertyDescriptor(Event.prototype, 'target')?.get

    Object.defineProperty(Event.prototype, '__WUJIE_POLYFILL_TARGET__', {
        get: originEventTargetGetter,
    })

    if (!Object.getOwnPropertyDescriptor(Event.prototype, 'path')) {
        polyfillEventPath(appWindow)
    }

    const getTargetFromPath = (path, type) => {
        const shadowRoots = path.filter((dom) => dom.shadowRoot && dom.tagName !== 'WUJIE-APP')
        if (shadowRoots.length > 1) return shadowRoots[shadowRoots.length - 1] // 如果有其他shadowRoot 取其他shadowRoot
        return path[0]
    }

    function targetGet () {
        // @ts-ignore
        const that = this
        if (that.composed && that.composedPath() && that.composedPath()[0]) {
            return getTargetFromPath(that.composedPath(), that.type)
        }

        if (that.path && that.path[0]) {
            return getTargetFromPath(that.path, that.type)
        }
        return that.__WUJIE_POLYFILL_TARGET__
    }

    Object.defineProperty(Event.prototype, 'target', {
        get: targetGet,
    })

    Object.defineProperty(Event.prototype, 'srcElement', {
        get: targetGet,
    })

}


export const EventTargetPlugin = () => {
    return simpleJsBeforeLoader((appWindow) => {
        patchEventTarget(appWindow);
    });
};

const simpleJsBeforeLoader = (callback) => {
    return {
        jsBeforeLoaders: [
            {
                callback
            }
        ]
    };
};