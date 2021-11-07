var CommandActionName = "CommandAction";
var CommandNullActionName = CommandActionName + ":null";
var CommandPromiseActionName = CommandActionName + ":promise";
export var commandMiddleware = function (api) { return function (dispatch) { return function (action) {
    if (action instanceof Command) {
        var extra_1 = null;
        if (action.json != null) {
            try {
                extra_1 = action.json();
            }
            catch (e) {
                extra_1 = e.toString();
            }
        }
        var result = action.process(api.getState(), function (a) {
            a.parent = {
                command: action.name(),
                extra: extra_1,
            };
            return api.dispatch(a);
        });
        if (result == null) {
            dispatch({
                type: CommandNullActionName + ":" + action.name(),
                parent: action.parent,
                extra: extra_1,
            });
            return action;
        }
        if (Promise.resolve(result) === result) {
            // if return is a promise
            dispatch({
                type: CommandPromiseActionName + ":" + action.name(),
                parent: action.parent,
                extra: extra_1,
            });
            return result;
        }
        else {
            dispatch({
                type: CommandActionName + ":" + action.name(),
                state: result,
                parent: action.parent,
                extra: extra_1,
            });
            return action;
        }
    }
    return dispatch(action);
}; }; };
var Command = /** @class */ (function () {
    function Command() {
        this.parent = null;
        this.type = "CommandsAction";
    }
    /**
     * S: return a updated status
     *
     * Promise<void>: not update status immediately, bug dispatch use param: dispatch
     *              when promise resolves, indicates the job has done.
     * @param state current status
     * @param dispatch top level dispatcher
     */
    Command.prototype.process = function (state, dispatch) {
        return state;
    };
    return Command;
}());
export { Command };
export function enhanceCommandReducer(reducer) {
    return function (state, action) {
        if (action.type.startsWith(CommandActionName)) {
            if (action.type.startsWith(CommandPromiseActionName)) {
                return state;
            }
            else if (action.type.startsWith(CommandNullActionName)) {
                return state;
            }
            else {
                var a = action;
                return a.state;
            }
        }
        else {
            return reducer(state, action);
        }
    };
}
