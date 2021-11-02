import { Action, ActionReducer, INIT, UPDATE } from '@ngrx/store';
import { CurrentUserState } from '../../../shared/state';


export default (reducer: ActionReducer<CurrentUserState>): ActionReducer<CurrentUserState> => {
    return (state: CurrentUserState | undefined, action: Action) => {
        const CURRENT_USER_KEY = 'currentUser';

        if (/* action.type === INIT || */ action.type === UPDATE) {
            const storageVal = localStorage.getItem(CURRENT_USER_KEY);

            if (storageVal && storageVal != null) {
                try {
                    return JSON.parse(storageVal);
                } catch (err) {
                    console.error(err);
                    localStorage.removeItem(CURRENT_USER_KEY);
                }
            }
        }

        const nextState = reducer(state, action);
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(nextState));

        return nextState;
    };
};