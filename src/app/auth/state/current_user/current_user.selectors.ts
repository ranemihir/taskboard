import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CurrentUserState } from "src/app/shared/state";

export const getAuthFeatureSelector = createFeatureSelector<CurrentUserState>('currentUser');

export const getCurrentUser = createSelector(
    getAuthFeatureSelector,
    state => state.data
);

export const getCurrentUserId = createSelector(
    getAuthFeatureSelector,
    state => state.data?._id
);

export const getError = createSelector(
    getAuthFeatureSelector,
    state => state.error
);
