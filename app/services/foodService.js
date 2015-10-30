'use strict';

require('jquery');
require('angular');

var app = require('../module');

app.service('foodService', function() {

  this.customerAddress = "";

  this.selectedRestaurant;

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
    'Sandwiches',
    'Thai',
    'Sushi',
    'Wings',
    'Chinese',
    'Dessert',
    'Seafood',
    'Fast food',
    'Burgers',
    'Mexican',
    'Japanese',
    'Steakhouse'
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
            "description": "3 tacos with  slow cooked shredded beef, onions, and cilantro."
        },
        {
            "name": "Pad See Ew",
            "price": 8.75,
            "description": "3 tacos with pineapple marinated pork, onions, and cilantro."
        },
        {
            "name": "Pineapple Fried Rice",
            "price": 7.75,
            "description": "A huge quesadilla stuffed with cheese, steak, tomatoes, avocado, and bell peppers. Served with queso, guacamole, and sour cream."
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