webpackJsonp([1],[function(module,exports,__webpack_require__){"use strict";var app=__webpack_require__(1);__webpack_require__(10),__webpack_require__(13),__webpack_require__(12),__webpack_require__(11),__webpack_require__(7),__webpack_require__(8),__webpack_require__(9);__webpack_require__(4),app.addModules(["ui.router"]),app.TEMPLATES={HOME:__webpack_require__(34),RESTAURANTS:__webpack_require__(36),MENU:__webpack_require__(35),CHECKOUT:__webpack_require__(32),CART:__webpack_require__(31),FEEDBACK:__webpack_require__(33)},app.config(function($stateProvider,$urlRouterProvider){$stateProvider.state("home",{url:"/",template:app.TEMPLATES.HOME,controller:"HomeController"}).state("restaurants",{url:"/restaurants",template:app.TEMPLATES.RESTAURANTS,controller:"RestaurantsController"}).state("menu",{url:"/menu",template:app.TEMPLATES.MENU,controller:"MenuController"}).state("cart",{url:"/cart",template:app.TEMPLATES.CART,controller:"CartController"}).state("checkout",{url:"/checkout",template:app.TEMPLATES.CHECKOUT,controller:"CheckoutController"}).state("feedback",{url:"/feedback",template:app.TEMPLATES.FEEDBACK,controller:"FeedbackController"}),$urlRouterProvider.otherwise("/")}),app.controller("NavigationController",function($scope,foodService){$scope.now=moment(),$scope.foodService=foodService}),module.exports=app},function(module,exports,__webpack_require__){"use strict";var angular=__webpack_require__(5),_=__webpack_require__(2),app=angular.module("app",["ng","ngSanitize","angular.filter","ngAnimate"]);app.addModules=function(modules){_.isArray(modules)||(modules=[modules]),_.forEach(modules,function(module){var contains=_.contains(app.requires,module);contains||app.requires.push(module)})},module.exports=app},,,function(module,exports,__webpack_require__){"use strict";__webpack_require__(3),__webpack_require__(5);var app=__webpack_require__(1);app.service("foodService",function(){this.customerAddress="",this.randomNames=["Bob's","Greg's Great","The Best","Eat","Lovely","Tasty","Korean","Jon's","Michael's","Weird","Yummy","Uneaten","Probably","Fuzzy","Delicious","General Tso's","Only"],this.categories=["Pizza","Italian","Pho","Ramen","Sandwiches","Thai","Sushi","Wings","Chinese","Dessert","Seafood","Fast food","Burgers","Mexican","Japanese","Steakhouse"],this._nameGenerate=function(categoryIndex){var s=this.randomNames[Math.floor(Math.random()*this.randomNames.length)]+" "+this.categories[categoryIndex];return s},this._orderType=function(index){return index%3==0?"either":index%3==1?"carryout":"delivery"},this._generateRestaurants=function(){for(var restaurants=[],i=0;100>i;i++){var rest={name:this._nameGenerate(i%this.categories.length),rating:i%5+1,distance:.3*i%15+.1,cuisine:this.categories[i%this.categories.length],hasDiscounts:i%5==0,price:5*(i%5+1),orderType:this._orderType(i)};restaurants.push(rest)}return restaurants},this.restaurants=this._generateRestaurants()}),module.exports=app},,,function(module,exports,__webpack_require__){"use strict";var app=__webpack_require__(1);app.controller("CartController",function($scope){}),module.exports=app},function(module,exports,__webpack_require__){"use strict";var app=__webpack_require__(1);app.controller("CheckoutController",function($scope){}),module.exports=app},function(module,exports,__webpack_require__){"use strict";var app=__webpack_require__(1);app.controller("FeedbackController",function($scope){}),module.exports=app},function(module,exports,__webpack_require__){"use strict";var app=__webpack_require__(1);__webpack_require__(4),app.controller("HomeController",function($scope,foodService){$scope.foodService=foodService}),module.exports=app},function(module,exports,__webpack_require__){"use strict";var app=__webpack_require__(1);app.controller("MenuController",function($scope){}),module.exports=app},function(module,exports,__webpack_require__){(function(_){"use strict";var app=__webpack_require__(1);__webpack_require__(4),app.controller("RestaurantsController",function($scope,foodService){$scope.filterPrice="1000",$scope.filterRating="0",$scope.filterDistance="1000",$scope.filterCuisine="",$scope.filterOrderType="either",$scope.filterDiscounts=!1,$scope.sortMode="+name",$scope.masterFilter=function(option){var filtered=!0;return filtered&=option.price<=parseInt($scope.filterPrice),filtered&=option.rating>=parseInt($scope.filterRating),filtered&=option.distance<=parseInt($scope.filterDistance),filtered&=option.orderType==$scope.filterOrderType||"either"==$scope.filterOrderType||"either"==option.orderType,filtered&=option.cuisine==$scope.filterCuisine||""==$scope.filterCuisine,filtered&=1==$scope.filterDiscounts&&1==option.hasDiscounts||0==$scope.filterDiscounts},$scope.range=function(i){return _.range(i)},$scope.categories=foodService.categories,$scope.restaurants=foodService.restaurants}),module.exports=app}).call(exports,__webpack_require__(2))},function(module,exports,__webpack_require__){"use strict";var app=__webpack_require__(1);app.controller("TestController",function($scope){}),module.exports=app},,,,,,,,,,,,,,,,,,function(module,exports){module.exports='<div class=container-fluid><div class=row><div class="col-md-offset-2 col-md-8"><div class=row><div class="col-md-6 col-md-offset-3"><h1>Shopping cart</h1><a href=#/menu class="btn btn-default">Menu</a> <a href=#/checkout class="btn btn-primary">Checkout</a></div></div></div></div></div>'},function(module,exports){module.exports='<div class=container-fluid><div class=row><div class="col-md-offset-2 col-md-8"><div class=row><div class="col-md-6 col-md-offset-3"><h1>Checkout</h1><a href=#/cart class="btn btn-default">Cart</a> <a href=#/feedback class="btn btn-primary">Feedback</a></div></div></div></div></div>'},function(module,exports){module.exports='<div class=container-fluid><div class=row><div class="col-md-offset-2 col-md-8"><div class=row><div class="col-md-6 col-md-offset-3"><h1>Feedback</h1><a href="#/" class="btn btn-primary">Home</a></div></div></div></div></div>'},function(module,exports){module.exports='<div class=container-fluid><div class="row home-menu"><div class="col-md-offset-2 col-md-8"><div class=row><div class="col-md-6 col-md-offset-3"><div class=input-group><input class=form-control ng-model=foodService.customerAddress placeholder="Enter Your Address"> <span class=input-group-btn><a href=#/restaurants class="btn btn-primary" type=button>Submit</a></span></div></div></div></div></div></div>'},function(module,exports){module.exports='<div class=container-fluid><div class=row><div class="col-md-offset-2 col-md-8"><div class=row><div class="col-md-6 col-md-offset-3"><h1>Menu items</h1><a href=#/restaurants class="btn btn-default">Restaurants</a> <a href=#/cart class="btn btn-primary"><i class="glyphicon glyphicon-shopping-cart"></i> Cart</a></div></div></div></div></div>'},function(module,exports){module.exports='<div class=container-fluid><div class=row><div class="col-md-offset-3 col-md-6"><h2>Restaurants</h2></div></div><div class=row><div class=col-md-3><div class=form-group><label>Cuisine</label><select ng-model=filterCuisine><option value="">Any<option ng-repeat="option in categories" value={{option}}>{{option}}</select></div><div class=form-group><label>Order Type</label><div><label><input type=radio ng-model=filterOrderType value=either name=orderType id=option3 autocomplete=off> Either</label></div><div><label><input type=radio ng-model=filterOrderType value=delivery name=orderType id=option1 autocomplete=off default> Delivery</label></div><div><label><input type=radio ng-model=filterOrderType value=carryout name=orderType id=option2 autocomplete=off> Carry-out</label></div></div><div class=form-group><label>Sort By</label><div><label><input type=radio ng-model=sortMode value=+name name=sortMode id=option1 autocomplete=off default> Name</label></div><div><label><input type=radio ng-model=sortMode value=-rating name=sortMode id=option2 autocomplete=off> Rating</label></div><div><label><input type=radio ng-model=sortMode value=+distance name=sortMode id=option3 autocomplete=off> Distance</label></div><div><label><input type=radio ng-model=sortMode value=+price name=sortMode id=option3 autocomplete=off> Price</label></div></div><div class=form-group><label>Rating</label><select ng-model=filterRating><option value=0>Any<option value=2>2 Star<option value=3>3 Star<option value=4>4 Star<option value=5>5 Star</select></div><div class=form-group><label>Price</label><select ng-model=filterPrice><option value=1000>Any<option value=5>$<option value=10>$$<option value=15>$$$<option value=20>$$$$<option value=25>$$$$$</select></div><div class=form-group><label>Distance</label><select ng-model=filterDistance><option value=1000>Any<option value=1>Walking distance (1 mile)<option value=3>3 miles<option value=5>5 miles<option value=10>Driving distance (10 miles)<option value=15>Road trip (15 miles)</select></div><div class=form-group><label>Has Discounts <input type=checkbox ng-model=filterDiscounts></label></div></div><div class=col-md-6><div class=row><div class=col-md-12 ng-show="(restaurants | filter:masterFilter).length == 0"><h3>Sorry, no restaurants fit your criteria</h3></div></div><div class="row restaurant-row" ng-repeat="restaurant in restaurants | filter:masterFilter | limitTo:30 | orderBy:sortMode"><div class=col-md-4><div>{{restaurant.name}}</div><div ng-if="filterCuisine == \'\'" class=restaurantCuisine><small>{{restaurant.cuisine}}</small></div><div class=restaurant-stars><span ng-repeat="i in range(5)"><i class=glyphicon ng-class="{\'glyphicon-star\': $index < restaurant.rating, \'glyphicon-star-empty\': $index >= restaurant.rating}"></i></span></div></div><div class=col-md-2>{{restaurant.distance | number:1}} mi<div class=restaurant-price><span ng-repeat="i in range((restaurant.price-1)/5)">$</span></div></div><div class="col-md-4 restaurant-notices"><div ng-if=restaurant.hasDiscounts><i class="glyphicon glyphicon-tag"></i> Discounts available</div><div ng-if="filterOrderType == \'either\' && restaurant.orderType != \'either\'"><em>{{restaurant.orderType}} only</em></div></div><div class=col-md-1><a href=#/menu class="btn btn-primary">Select</a></div></div></div></div></div>'}]);
//# sourceMappingURL=index-48386539255db4a0d34a.js.map