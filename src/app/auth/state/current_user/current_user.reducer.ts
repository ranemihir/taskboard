import { createReducer, on } from "@ngrx/store";
import { CurrentUserState } from "src/app/shared/state";
import * as CurrentUserActions from './current_user.actions';

const initialState: CurrentUserState = {
	data: null,
	error: null
};

export const currentUserReducer = createReducer<CurrentUserState>(
	initialState as CurrentUserState,
	on(CurrentUserActions.login_Success, (state, action): CurrentUserState => {
		localStorage.setItem('currentUser', JSON.stringify(action.data));

		return {
			data: action.data,
			error: null
		};
	}),
	on(CurrentUserActions.login_Failure, (state, action): CurrentUserState => {
		return {
			data: null,
			error: action.error
		};
	}),
	on(CurrentUserActions.signUp_Success, (state, action): CurrentUserState => {
		localStorage.setItem('currentUser', JSON.stringify(action.data));

		return {
			data: action.data,
			error: null
		};
	}),
	on(CurrentUserActions.signUp_Failure, (state, action): CurrentUserState => {
		return {
			data: null,
			error: action.error
		};
	})
);