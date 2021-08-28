interface GameState {
    players: Player[];
    dayIndex: number;
}

interface Player {
    name: string;
    role: ClassType[];
}

class Game {
    private state: GameState;

    public acceptAction(action: Action): void {}

    private executeAction(
        state: GameState,
        action: KillAction | PassAction
    ): GameState {
        switch (action.type) {
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

class VoteAction extends Action {}

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

