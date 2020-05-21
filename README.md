# Look Up Recipes App

## Overview
This app is an app that helps to create and share recipes. It also allows to create your own shopping list and mark your vaforite recipes to make them later.

## Tools

This is a full stack app that uses:
* __HTML__
* __CSS__
* __Express__
* __Mysql__
* __Node.js__
* __firebase-auth__
* __http request__
* __API.__

## Deployment

This si deployed on __Heroku__:

* [Home Page](https://look-u.herokuapp.com/)

### Pages

```text
Look up:
    ├── Home
    ├── Grocery List
    ├── Planning
    ├── Favorite
    ├── Profile
    ├── Sign in
    └── Register

```

#### `Home`

Our `Home` page has public access so all visitors can see shared recipies.

#### `Grocery List`

Our `Grocery List` content is visible only to registred users. It shows all ingredients that were clicked by that user. This list is visible to its own user only.

#### `Planning`

**Note**: This page still under working. 

The idea of `Planning` page is that user can add recipies to the calendar to plan ahead of time to prepare a recipe.

#### `Favorite`

Our `Favorite` page is to allow user to store the recipes that they like. The content of this page is visible to its own user only. 

#### `Profile`

`Profile` page is for users to be able to update their information in case they want to.

#### `Sign in`

`Sign in` is a pop up modale to collect information from user to check is they are registred or not yet.

#### `Register`

`Register`is a pop up modale that collect information from new user and store it on Firebase and MySql database.
