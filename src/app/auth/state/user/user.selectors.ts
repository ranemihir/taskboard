import { createFeatureSelector, createSelector } from "@ngrx/store";
import AppState from "src/app/shared/types/app.state";

export const getAuthFeatureSelector = createFeatureSelector<AppState>('auth');

export const getCurrentUser = createSelector(
    getAuthFeatureSelector,
    state => state.currentUser
);

export const getError = createSelector(
    getAuthFeatureSelector,
    state => state.error
);
