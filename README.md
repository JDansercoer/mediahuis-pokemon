**You can find a working final project at [https://jdansercoer.github.io/mediahuis-pokemon/](https://jdansercoer.github.io/mediahuis-pokemon/)**

- [Introduction](#introduction)
- [General Description](#general-description)
  * [Picking a Pokémon](#picking-a-pok-mon)
  * [Pokemon detail](#pokemon-detail)
  * [Selected squad](#selected-squad)
- [API Detail](#api-detail)
  * [All available pokemon](#all-available-pokemon)
  * [Pokemon detail](#pokemon-detail-1)
    + [Sprites](#sprites)
    + [Stats](#stats)
    + [Types](#types)
    + [Moves](#moves)
- [Colors](#colors)
- [Technical requirements](#technical-requirements)
- [Styling](#styling)
- [Source code](#source-code)

# Introduction

This React assignment is meant to improve our general React knowledge as a team. It will also allow us to establish some common knowledge and enables us to make design decisions as a team.

There is **no correct solution**. One of React's advantages is that there are always multiple solutions for a given problem. This task will serve as a way to bundle everyone's way of solving things. When reviewing someone else's task, you'll stumble upon a completely different way of thinking, which in turn may enable you to approach new challenges in an improved way, thus increasing your own personal efficiency.

With a whole spectrum of possible solutions after everyone has completed the task, we'll be able to look at all the possible options, and decide which particular solution we prefer for that exact problem. Establishing (& documenting) these agreements, will further homogenize our codebase and will allow everyone to instantly dive in each other's work without having to spend time trying to understand the chain of thought.

During the development of this task, you'll be faced with a whole lot of decisions in how to approach something. Be sure to **keep track of why you made a particular decision** as it will enable a discussion with the rest of the team, leading to even more useful insights.

# General Description

To keep things light and because it was one of the publicly available API's, you'll be working with Pokémon :tada:

The general idea of the task will be to develop a single page application that enables you to pick a pokemon, choose a maximum of 4 moves that that pokemon can learn, and add it to your squad. As with all pokemon games, your squad is limited to a maximum of 6 pokemon.

The following paragraphs will give a more detailed overview of the three main functions: picking a pokemon, choosing the moves and adding it to your line-up.

![Final image](https://i.imgur.com/hUmXWnA.png)

## Picking a Pokémon

Using the API, you will be fetching a complete list of all avaible pokemon. This list will be presented to the user.

The user should also have the ability to filter this list through a text input. When entering a value in the input field, only pokemon names starting with the provided input should still be visible.

Clicking a particular pokemon will set this as the current pokemon that is displayed in the detail section.

## Pokemon detail

When a particular pokemon is selected, a new API call will gather detailed information about this pokemon. 

This detail section will extract the pokemon's stats, moves and type and will display these values.

The image will be display above the name. The stats will be presented in a 2x3 grid. The moves will be divided in the possible ways of learning them. Do note that not all pokemon have moves in all 4 ways (level-up, tutor, egg, machine).

You can select these moves and they will be added to the list of selected moves. The amount of selected moves is limited to 4. The amount is not the only limitation, as 3 of the 4 learning methods should only have maximun 1 selected move. I.e. you can only have 1 machine-learned move, 1 egg-learned move and 1 tutor-learned move. The amount of level-up-learned moves is unlimited.

Examples of combinations that are allowed:
* 1 egg-learned move, 1 tutor-learned move, 1 machine-learned move, 1 level-up-learned move
* 1 tutor-learned move, 2 level-up learned moves
* 4 level-up learned moves
* 1 egg-learned move

Examples that are not allowed:
* No moves
* 2 tutor-learned moves
* 2 level-up-learned moves and 2 machine-learned moves

To remove a move from the selected moves, you have to click the move in the move-list again. The move-list thus functions as a toggle as to selecting and unselecting a move.

Clicking "Save pokemon" will add that pokemon to your squad with the moves you selected.

## Selected squad

The bottom of the screen shows your selected pokemon. This is a list of all the pokemon you selected with their picture, their name and their selected moves. Every selected pokemon's background is also based on his primary type.

To remove a pokemon from your squad, you simply click the desired squad rectangle.

# API Detail

To save you from having to dig through the API docs, this section will describe the needed API calls. Also, please **pay attention to the trailing slash** for every API path. Not including the trailing slash could result in failing API calls (something related to their CDN not forwarding calls correctly).

You will be using 2 API paths, one for listing all available pokemon and one for getting more detail about a single pokemon.

## All available pokemon

```
https://pokeapi.co/api/v2/pokemon/
```

Calling this endpoint will return you a list of pokemon in the `results` field. This is an array of pokemon.

```
...
{
    "name": "bulbasaur",
    "url": "https://pokeapi.co/api/v2/pokemon/1/"
},
{
    "name": "ivysaur",
    "url": "https://pokeapi.co/api/v2/pokemon/2/"
},
...
```

## Pokemon detail

```
https://pokeapi.co/api/v2/pokemon/{pokemonName}
```

Calling this endpoint will return you a detailed overview of the requested pokemon.

You are interested in 4 fields.

### Sprites

```
"sprites": {
    "back_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png",
    "back_female": null,
    "back_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/1.png",
    "back_shiny_female": null,
    "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
    "front_female": null,
    "front_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png",
    "front_shiny_female": null
},
```
    
We will only be using the `front_default` picture in our displays.

### Stats

```
"stats": [
    {
        "base_stat": 45,
        "effort": 0,
        "stat": {
            "name": "speed",
            "url": "https://pokeapi.co/api/v2/stat/6/"
        }
    },
    {
        "base_stat": 65,
        "effort": 0,
        "stat": {
            "name": "special-defense",
            "url": "https://pokeapi.co/api/v2/stat/5/"
        }
    },
    {
        "base_stat": 65,
        "effort": 1,
        "stat": {
            "name": "special-attack",
            "url": "https://pokeapi.co/api/v2/stat/4/"
        }
    },
    {
        "base_stat": 49,
        "effort": 0,
        "stat": {
            "name": "defense",
            "url": "https://pokeapi.co/api/v2/stat/3/"
        }
    },
    {
        "base_stat": 49,
        "effort": 0,
        "stat": {
            "name": "attack",
            "url": "https://pokeapi.co/api/v2/stat/2/"
        }
    },
    {
        "base_stat": 45,
        "effort": 0,
        "stat": {
            "name": "hp",
            "url": "https://pokeapi.co/api/v2/stat/1/"
        }
    }
],
```
    
Every stat is an object. We are only interested in the `base_stat` and `stat` object, where we'll only be using the `name` field.

### Types

```
"types": [
    {
        "slot": 2,
        "type": {
            "name": "poison",
            "url": "https://pokeapi.co/api/v2/type/4/"
        }
    },
    {
        "slot": 1,
        "type": {
            "name": "grass",
            "url": "https://pokeapi.co/api/v2/type/12/"
        }
    }
],
```
    
Every type is an object. We are only interested in the type that is in `slot` 1. From this stat, we are only interested in the `type.name` field.

### Moves

```
"moves": [
    ...
    {
        "move": {
            "name": "razor-wind",
            "url": "https://pokeapi.co/api/v2/move/13/"
        },
        "version_group_details": [
            {
                "level_learned_at": 0,
                "move_learn_method": {
                    "name": "egg",
                    "url": "https://pokeapi.co/api/v2/move-learn-method/2/"
                },
                "version_group": {
                    "name": "crystal",
                    "url": "https://pokeapi.co/api/v2/version-group/4/"
                }
            },
            {
                "level_learned_at": 0,
                "move_learn_method": {
                    "name": "egg",
                    "url": "https://pokeapi.co/api/v2/move-learn-method/2/"
                },
                "version_group": {
                    "name": "gold-silver",
                    "url": "https://pokeapi.co/api/v2/version-group/3/"
                }
            }
        ]
    },
    ...
],
```
    
Every move is an object. We are only interested in the `move.name` field and the first element in `version_group_details`. In this task, the first element's `move_learn_method.name` is the one that determinates the move's method.

# Colors

There are a total of 4 colors used for general styling.

Blue: #3A5D9F
Yellow: #FDCC07
White: #FFFFFF
Grey: #C1C8CA

As discussed in a previous point, all selected pokemon will have the background-color corresponding to their type.

The list of colors corresponding to every type:

Normal Type: #A8A77A
Fire Type:  #EE8130
Water Type:  #6390F0
Electric Type:  #F7D02C
Grass Type:  #7AC74C
Ice Type:  #96D9D6
Fighting Type:  #C22E28
Poison Type:  #A33EA1
Ground Type:  #E2BF65
Flying Type:  #A98FF3
Psychic Type:  #F95587
Bug Type:  #A6B91A
Rock Type:  #B6A136
Ghost Type:  #735797
Dragon Type:  #6F35FC
Dark Type:  #705746
Steel Type:  #B7B7CE
Fairy Type:  #D685AD

# Technical requirements

The master branch this project can be used as a starter kit for the project. Cloning it and running `yarn install` and `yarn start` should present you with a ready-to-go React app with hot-module-reloading enabled.

There are already some packages included in the package.json, but you **are allowed to use other third-party packages**.

Regarding to ESLint, some rules are already disabled, but you **can disable/re-enable some rules you don't agree with**. However, please also keep track somewhere of your reasoning behind enabling/disabling specific lines. 

# Styling

When it comes to styling, be free to copy the styles found via `Inspect element`. Do note however, that the styling doesn't need to be 100% correct, as that is not the focus of this task.

However, the correct use of [styled-components](https://www.styled-components.com/) is part of this task, so don't entirely skip the styling part. How you structure you styling components and how you name them should be a focus.

# Source code

When you are finished with your version, please host this somewhere on Github and share your link. However, please refrain from checking someone else's source code before finishing your own, as this will prevent you from making your own code-style decisions. 
