import { Action, ActionReducer, INIT, UPDATE } from '@ngrx/store';


export const hydrationMetaReducer = (key: string) => (reducer: ActionReducer<any>) => {
    return (state: any, action: Action) => {
        if (action.type === INIT || action.type === UPDATE) {
            const storageVal = localStorage.getItem(key);

            if (storageVal && storageVal != null) {
                try {
                    return JSON.parse(storageVal);
                } catch (err) {
                    console.error(err);
                    localStorage.removeItem(key);
                }
            }
        }

        const nextState = reducer(state, action);
        localStorage.setItem(key, JSON.stringify(nextState));

        return nextState;
    };
};