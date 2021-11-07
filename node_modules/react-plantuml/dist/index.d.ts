import { Action, Dispatch, Middleware, Reducer } from "redux";
export declare const commandMiddleware: Middleware;
export declare abstract class Command<S, C = string> implements Action<any> {
    abstract name(): C;
    parent: any;
    /**
     * S: return a updated status
     *
     * Promise<void>: not update status immediately, bug dispatch use param: dispatch
     *              when promise resolves, indicates the job has done.
     * @param state current status
     * @param dispatch top level dispatcher
     */
    process(state: S, dispatch: Dispatch<any>): S | Promise<void> | null;
    json?(): object;
    type: string;
}
export interface CommandAction<S> extends Action<string> {
    type: string;
    state: S;
    command: Command<S>;
}
export declare function enhanceCommandReducer<S, A extends Action<string>>(reducer: Reducer<S, A>): (state: S | undefined, action: A) => S;
