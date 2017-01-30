"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var app_routing_module_1 = require("./app-routing.module");
var windowRef_1 = require("./windowRef");
var router_1 = require("@angular/router");
var SLIDE_ROUTE_PREFIX = "/slide";
var SLIDES = ['Slide 1', 'Slide 2', 'Slide 3'];
var AppComponent = (function () {
    function AppComponent(_windowRef, _router) {
        this._windowRef = _windowRef;
        this._router = _router;
        this.blnRotateNavIcon = false;
        this.currentSlideNum = 1;
        this.totalSlides = app_routing_module_1.NO_OF_SLIDE;
        this.nextSlide = SLIDE_ROUTE_PREFIX + (this.currentSlideNum + 1);
        this.previousSlide = SLIDE_ROUTE_PREFIX + this.currentSlideNum;
        this.sidebarMenuList = [];
        this.blnNavSideMenuOpen = false;
        this.blnFullScreenMode = false;
    }
    AppComponent.prototype.showNextSlide = function () {
        if (this.currentSlideNum !== this.totalSlides) {
            this.currentSlideNum++;
            this.nextSlide = SLIDE_ROUTE_PREFIX + (this.currentSlideNum + 1);
            this.previousSlide = SLIDE_ROUTE_PREFIX + (this.currentSlideNum - 1);
        }
    };
    AppComponent.prototype.showPreviousSlide = function () {
        if (this.currentSlideNum !== 1) {
            this.currentSlideNum--;
            this.previousSlide = SLIDE_ROUTE_PREFIX + (this.currentSlideNum - 1);
            this.nextSlide = SLIDE_ROUTE_PREFIX + (this.currentSlideNum + 1);
        }
    };
    AppComponent.prototype.toggleNav = function () {
        if (!this.blnNavSideMenuOpen)
            this.openNav();
        else
            this.closeNav();
        this.blnNavSideMenuOpen = !this.blnNavSideMenuOpen;
    };
    AppComponent.prototype.openNav = function () {
        document.getElementById("mySidenav").style.width = "250px";
        document.getElementById("main").style.marginLeft = "250px";
        this.blnRotateNavIcon = true;
    };
    AppComponent.prototype.closeNav = function () {
        document.getElementById("mySidenav").style.width = "0";
        document.getElementById("main").style.marginLeft = "0";
        this.blnRotateNavIcon = false;
    };
    AppComponent.prototype.updateBottomNav = function (currentSlide) {
        this.currentSlideNum = currentSlide + 1;
        if (this.currentSlideNum !== this.totalSlides)
            this.nextSlide = SLIDE_ROUTE_PREFIX + (this.currentSlideNum + 1);
        if (this.currentSlideNum !== 1)
            this.previousSlide = SLIDE_ROUTE_PREFIX + (this.currentSlideNum - 1);
    };
    AppComponent.prototype.ngOnInit = function () {
        this.buildSideBarMenu();
    };
    AppComponent.prototype.buildSideBarMenu = function () {
        for (var count = 0; count < this.totalSlides; count++) {
            this.sidebarMenuList.push({
                path: SLIDE_ROUTE_PREFIX + (count + 1),
                displayLink: SLIDES[count]
            });
        }
    };
    AppComponent.prototype.gotoFullScreenMode = function () {
        //definne document object
        var _document = this._windowRef.nativeWindow.document;
        if (_document.documentElement.requestFullscreen) {
            _document.documentElement.requestFullscreen();
        }
        else if (_document.documentElement.mozRequestFullScreen) {
            _document.documentElement.mozRequestFullScreen();
        }
        else if (_document.documentElement.webkitRequestFullScreen) {
            _document.documentElement.webkitRequestFullScreen();
        }
        else if (_document.documentElement.msRequestFullscreen) {
            _document.documentElement.msRequestFullscreen();
        }
        this.blnFullScreenMode = true;
    };
    AppComponent.prototype.exitFullScreenMode = function () {
        //define document
        var _document = this._windowRef.nativeWindow.document;
        if (_document.exitFullscreen) {
            _document.exitFullscreen();
        }
        else if (_document.mozCancelFullScreen) {
            _document.mozCancelFullScreen();
        }
        else if (_document.webkitCancelFullScreen) {
            _document.webkitCancelFullScreen();
        }
        else if (_document.msExitFullscreen) {
            _document.msExitFullscreen();
        }
        this.blnFullScreenMode = false;
    };
    AppComponent.prototype.keyBoardInput = function (event) {
        if (this.blnFullScreenMode) {
            //front navigation on 'rightarrow',''downarrow' and 'spacebar
            if (event.keyCode == 39 || event.keyCode == 40 || event.keyCode == 32) {
                this._router.navigate([this.nextSlide]);
                this.showNextSlide();
            }
            else if (event.keyCode == 37 || event.keyCode == 38) {
                this._router.navigate([this.previousSlide]);
                this.showPreviousSlide();
            }
        }
        //on press of F11 key, toggle blnFullScreenMode
        if (event.keyCode == 122) {
            this.blnFullScreenMode = !this.blnFullScreenMode;
        }
    };
    __decorate([
        core_1.HostListener('window:keyup', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], AppComponent.prototype, "keyBoardInput", null);
    AppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-app',
            templateUrl: 'app.component.html',
            styleUrls: ['app.component.css'],
            providers: [windowRef_1.WindowRef]
        }), 
        __metadata('design:paramtypes', [windowRef_1.WindowRef, router_1.Router])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map