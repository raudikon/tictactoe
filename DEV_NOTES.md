

My Hypothesis:
- My data flows are bad, such that when I create or join new games that do not exist, they aren't properly being added to my set of available games. Not sure the specific issue.
- okay it seems to work on the backend at least.

currently
- the router has 2 routes, game lobby and play/:id. 
- if you go to play/:id with an existing game id, then you'll hit the game component (with certain bugs.)
- if you go to play/:id with a random new name, you get loading page. not able to get game from server. 

what i want (#1): 
- if you go to play/:id with a random new name, it creates a game and lets you play it. 

what this would take: 
- modify logic in Game.tsx 
    * if you successfully fetched game, serve it. 
    * if not, then create a new game object on the server, and serve it. 
        * in getInitialState: 
            - catch(e => )

