'use strict';

require('jquery');
require('angular');
require('lodash');

var app = require('../module');

app.service('foodService', function() {

  this.customerAddress = "";

  this.selectedRestaurant;

  this.cart = [];

  this.addToCart = function(item) {
    //ensures there's only one object of that menu item in the cart. if there is, increase its quantity
    item.restaurant = this.selectedRestaurant;
    item.restaurantIndex = this.selectedRestaurant.index; //keep track of both just because
    var temp = angular.copy(_.findWhere(this.cart, {"name": item.name, "restaurantIndex": item.restaurantIndex}));
    if(!!temp) {
        _.remove(this.cart, temp);
        item = angular.copy(temp);
        item.quantity += 1;
    } else {
        item.quantity = 1;
    }
    this.cart.push(item);
  }

  this.removeItem = function(item) {
    var temp = angular.copy(_.findWhere(this.cart, {"name": item.name, "restaurantIndex": item.restaurantIndex}));
    if(!!temp) {
        _.remove(this.cart, temp);
        if(temp.quantity > 1) {
            temp.quantity--;
            this.cart.push(temp);
        }
    }
  }

  this.tip = 0;

  this.getSubTotal = function() {
    var t = 0;
    _.each(this.cart, function(item) {
        t += item.price * item.quantity;
    });
    return t;
  }
  this.getTax = function() {
    var t = 0;
    _.each(this.cart, function(item) {
        t += item.price * item.quantity * 0.08;
    });
    return t;
  }

  this.getTotal = function() {
    return this.getTax() + this.getSubTotal() + this.getFees() + Math.abs(this.tip);
  }

  this.getFees = function() {
    var self = this;
    var t = 0;
    var rest = [];
    _.each(this.cart, function(item) {
        if(!_.contains(rest, item.restaurantIndex) && item.restaurant.orderType != "carryout") {
            rest.push(item.restaurantIndex);
        }
    });
    _.each(rest, function(index) {
        t += self.restaurants[index].deliveryFee;
    });
    return t;
  }

  this.getItemCount = function() {
    var t = 0;
    _.each(this.cart, function(item) {
        t += item.quantity;
    });
    return t;
  }


  this.operatingHours = [
    {
      "day": "Sunday",
      "hours": "10am-10pm"
    },
    {
      "day": "Monday",
      "hours": "10am-10pm"
    },
    {
      "day": "Tuesday",
      "hours": "10am-7pm"
    },
    {
      "day": "Wednesday",
      "hours": "10am-10pm"
    },
    {
      "day": "Thursday",
      "hours": "10am-10pm"
    },
    {
      "day": "Friday",
      "hours": "10am-12pm"
    },
    {
      "day": "Saturday",
      "hours": "10am-12pm"
    }
  ];

  this.randomNames = [
    "Bob's",
    "Greg's Great",
    "The Best",
    "Eat",
    "Lovely",
    "Tasty",
    "Korean",
    "Jon's",
    "Michael's",
    "Weird",
    "Yummy",
    "Uneaten",
    "Probably",
    "Fuzzy",
    "Delicious",
    "General Tso's",
    "Only"
  ];

  this.categories = [
    'Pizza',
    'Italian',
    'Pho',
    'Ramen',
    'Thai',
    'Sushi',
    'Chinese',
    'Burgers',
    'Mexican',
    'Japanese'
  ];
  this.menus = {
    "Burgers": [
        {
            "name": "Cheeseburger",
            "price": 6.25,
            "description": "All beef patty with American cheese."
        },
        {
            "name": "Bacon Cheeseburger",
            "price": 6.75,
            "description": "The cheeseburger but with bacon."
        },
        {
            "name": "Truffle Fries",
            "price": 3.25,
            "description": "French fries with truffle oil and parmesan."
        }
    ],
    "Ramen": [
        {
            "name": "Tonkotsu Ramen",
            "price": 8.25,
            "description": "A creamy pork broth served with chashu pork, marinated, soft boiled egg, green onions, and wood ear mushrooms."
        },
        {
            "name": "Shoyu Ramen",
            "price": 8.25,
            "description": "A soy sauce flavored chicken broth blend served with chashu pork, marinated, soft boiled egg, green onions, and wood ear mushrooms."
        },
        {
            "name": "Miso Ramen",
            "price": 8.25,
            "description": "A miso flavored pork broth blend served with chashu pork, marinated, soft boiled egg, green onions, and wood ear mushrooms."
        }
    ],
    "Chinese": [
        {
            "name": "Orange Chicken",
            "price": 7.50,
            "description": "Crispy chicken in a sweet and spicy orange sauce."
        },
        {
            "name": "Fried Rice",
            "price": 7.25,
            "description": "White rice tossed in a wok with veggies and chicken."
        },
        {
            "name": "Chow Mein",
            "price": 7.25,
            "description": "Noodles stir fried with veggies."
        }
    ],
    "Sushi": [
        {
            "name": "California Roll",
            "price": 6.75,
            "description": "Crabmeat, cucumber, and avocado roll."
        },
        {
            "name": "Sushi Omakase",
            "price": 18.75,
            "description": "Chef's handpicked fresh sushi and sashimi."
        },
        {
            "name": "Sushi Burrito",
            "price": 15.25,
            "description": "Tuna, salmon, crabmeat, and avocado in a burrito sized sushi roll."
        }
    ],
    "Mexican": [
        {
            "name": "Barbacoa Tacos",
            "price": 4.75,
            "description": "3 tacos with  slow cooked shredded beef, onions, and cilantro."
        },
        {
            "name": "Al Pastor Tacos",
            "price": 4.75,
            "description": "3 tacos with pineapple marinated pork, onions, and cilantro."
        },
        {
            "name": "Steak Quesadilla",
            "price": 7.25,
            "description": "A huge quesadilla stuffed with cheese, steak, tomatoes, avocado, and bell peppers. Served with queso, guacamole, and sour cream."
        }
    ],
    "Thai": [
        {
            "name": "Pad Thai",
            "price": 8.75,
            "description": "Stir fried rice noodles with chicken, egg, scallion, bean sprouts, and peanuts in tangy tamarind sauce."
        },
        {
            "name": "Pad See Ew",
            "price": 8.75,
            "description": "Stir fried rice noodles with chicken, egg, broccoli, garlic in a sweet soy sauce."
        },
        {
            "name": "Pineapple Fried Rice",
            "price": 7.75,
            "description": "Rice stir fried with chicken, yellow curry, egg, pineapple, tomato, onion, and scallion."
        }
    ],
    "Pizza": [
        {
            "name": "Cheese Pizza",
            "price": 12.75,
            "description": "The pepperoni pizza but without pepperoni."
        },
        {
            "name": "Pepperoni Pizza",
            "price": 14.75,
            "description": "The cheese pizza but with pepperoni."
        },
        {
            "name": "Garlic Breadsticks",
            "price": 6.25,
            "description": "It's like pizza crust with garlic butter."
        }
    ],
    "Japanese": [
        {
            "name": "Tonkatsu Curry",
            "price": 10.75,
            "description": "Fried breaded pork cutlet with curry and rice."
        },
        {
            "name": "Chicken Kaarage",
            "price": 10.75,
            "description": "Japanese fried chicken. Served with rice, miso soup, and salad."
        },
        {
            "name": "Grilled Saba",
            "price": 11.25,
            "description": "Grilled mackerel. Served with rice, miso soup, and salad."
        }
    ],
    "Pho": [
        {
            "name": "Pho Bo Vien",
            "price": 9.25,
            "description": "Beef broth, noodles, meatballs."
        },
        {
            "name": "Pho Ga",
            "price": 9.25,
            "description": "Chicken broth, noodles, chicken."
        },
        {
            "name": "Pho Tai",
            "price": 9.25,
            "description": "Beef broth, noodles, rare cooked beef."
        }
    ],
    "Italian": [
        {
            "name": "Chicken Fettuccine Alfredo",
            "price": 10.75,
            "description": "Fettuccine tossed in parmesan and butter with chicken."
        },
        {
            "name": "Chicken Parmigiana",
            "price": 10.75,
            "description": "Pasta with breaded chicken, red tomato sauce, parmesan cheese."
        },
        {
            "name": "Carbonara",
            "price": 11.25,
            "description": "Spaghetti tossed in parmesan, eggs, pancetta, and black pepper."
        }
    ]
  };

  this._nameGenerate = function(categoryIndex) {
    
    var s = this.randomNames[Math.floor(Math.random() * this.randomNames.length)] + " " + this.categories[categoryIndex];
    
    return s;
  }

  this._orderType = function(index) {
    if(index % 3 == 0) {
      return 'either';
    }
    if (index % 3 == 1 ) {
      return 'carryout';
    }else {
      return 'delivery';
    }

  }

  this._generateRestaurants = function() {
    var restaurants = [];
    for( var i = 0; i < 100; i++ ) {
      var rest = {
        "index": i,
        "name": this._nameGenerate(i % this.categories.length),
        "rating": (i % 5) + 1,
        "distance": ((i * 0.3) % 15 ) + 0.1,
        "cuisine": this.categories[i % this.categories.length],
        "hasDiscounts": (i % 5 == 0),
        "price": 5 * ((i % 5 )+ 1),
        "orderType": this._orderType(i),
        "deliveryFee": 4.00,
        "deliveryMinimum": 15.00,
        "reviews": [{
          "name": "John",
          "text": "This is the absolute best " + this.categories[i % this.categories.length] + " in the area! 10/10" 
        }]
      }
      restaurants.push(rest);
    }
    return restaurants;
  }

  this.restaurants = this._generateRestaurants();

});

module.exports = app;