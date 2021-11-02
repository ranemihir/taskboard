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
	}),
	on(CurrentUserActions.acceptProjectRoleInvitation_Success, (state, action) => {
		if (state.data && state.data != null) {
			if (state.data.projectRoles && state.data.projectRoles != null) {
				return {
					data: {
						...state.data,
						projectRoles: state.data.projectRoles.concat(action.projectRole)
					},
					error: null
				};
			}
			return {
				data: {
					...state.data,
					projectRoles: [action.projectRole]
				},
				error: null
			};
		}

		return {
			...state
		};
	}),
	on(CurrentUserActions.acceptProjectRoleInvitation_Failure, (state, action) => {
		return {
			...state,
			error: action.error
		};
	}),
);