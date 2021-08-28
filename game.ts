export interface GameState {
    players: Player[];
    dayIndex: number;
    //phase: boolean;
    proposedAction: SomeAction | null;
}

export interface Player {
    name: string;
    role: ClassType;
}

export type SomeAction = VoteAction | KillAction | PassAction;

export class Game {
    private state: GameState;

    constructor() {
        this.state = Game.setup();
    }

    public getStateSnapshot(): GameState {
        return Game.cloneState(this.state);
    }

    public acceptAction(action: SomeAction): GameState {
        this.state = this.executeAction(this.state, action);

        return this.state;
    }

    public getAvailableActions() {
        return Game.getAvailableActions(this.state);
    }

    private static getAvailableActions(state: GameState): SomeAction[] {
        const currentPlayer = state.players[state.dayIndex];
        const otherPlayers = state.players.filter(p => p !== currentPlayer);

        let availableActions = [];

        for (const player of state.players) {
            availableActions = availableActions.concat(
                Game.getActionsForPlayer(
                    player,
                    otherPlayers,
                    player === currentPlayer,
                    state.proposedAction
                )
            );
        }

        return availableActions;
    }

    private static getActionsForPlayer(
        player: Player,
        otherPlayers: Player[],
        isTheirTurn: boolean,
        proposedAction: SomeAction
    ): SomeAction[] {
        let result: SomeAction[] = [];

        if (isTheirTurn) {
            let roleActions: SomeAction[] = [];

            roleActions = roleActions.concat(
                Game.getActionsForType(player.role, player, proposedAction, otherPlayers)
            );    

            result = result.concat(roleActions);
            result = result.concat(
                [
                    //new VoteAction(player, target),
                    new PassAction(player)
                ]
            );

        } else {
        }

        return [...result];
    }

    private static getActionsForType(
        type: ClassType,
        origin: Player,
        proposedAction: SomeAction,
        otherPlayers: Player[],
    ): SomeAction[] {
        let playerActions = [];

        switch () {

        }

        return playerActions;
    }

    private static cloneState(state: GameState): GameState {
        return JSON.parse(JSON.stringify(state));
    }
    private executeAction(
        state: GameState,
        action: SomeAction
    ): GameState {
        switch (action.type) {
            case ActionType.Vote:
                return Game.executeVote(action, state);
            case ActionType.Kill:
                return Game.executeKill(action, state);
            case ActionType.Pass:
                return Game.executePass(action, state);
            default:
                console.warn("executing unknown action");
                return state;
        }
    }

    private static executeKill(
        action: KillAction,
        state: GameState
    ): GameState {
        return state;
    }

    private static executePass(
        action: PassAction,
        state: GameState
    ): GameState {
        return state;
    }

    private static setup(): GameState {
        return {
            dayIndex: 0,
            proposedAction: null,
            players: []
        };
    }

}



class Action {
    origin: Player;

    constructor(origin: Player) {
        this.origin = origin;
    }
}

class VoteAction extends Action {
    // conditional: at least 2 votes to execute action
}

class KillAction extends Action {
    type: ActionType.Kill = ActionType.Kill;
    target: Player;

    constructor(origin: Player, target: Player) {
        super(origin);
        this.target = target;
    }    
}

class PassAction extends Action {
    type: ActionType.Pass = ActionType.Pass;
    constructor(origin: Player) {
        super(origin);
    }

    public update() {
        //this.origin.togglePass();
    }
}

enum ClassType {
    Detective,
    Doctor,
    Villager,
    Mafia
}

const AllClassTypes = Object.freeze([
    ClassType.Detective,
    ClassType.Doctor,
    ClassType.Villager,
    ClassType.Mafia
]);

enum ActionType {
    Kill,
    Vote,
    Protect,
    Inspect,
    Pass
}

