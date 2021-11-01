import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState, CurrentUserState } from "src/app/shared/state";
import { CurrentUser } from "src/app/shared/types";

const featureSelector = createFeatureSelector<AppState, CurrentUserState>('currentUser');

export const get = createSelector(
    featureSelector,
    (state: CurrentUserState): CurrentUser | null => state.data
);

export const getId = createSelector(
    get,
    (currentUser: CurrentUser | null) => {
        if (currentUser && currentUser != null) {
            return currentUser._id;
        }

        return null;
    }
);

export const getToken = createSelector(
    get,
    (currentUser: CurrentUser | null) => {
        if (currentUser && currentUser != null) {
            return currentUser.token;
        }

        return null;
    }
);

export const getError = createSelector(
    featureSelector,
    (state: CurrentUserState) => state.error
);
