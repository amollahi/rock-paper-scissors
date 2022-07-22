import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PLAY_FEATURE_KEY, PlayState, playAdapter } from './play.reducer';

// Lookup the 'Play' feature state managed by NgRx
export const getPlayState = createFeatureSelector<PlayState>(PLAY_FEATURE_KEY);

const { selectAll, selectEntities } = playAdapter.getSelectors();

export const getPlayLoaded = createSelector(
    getPlayState,
    (state: PlayState) => state.loaded
);

export const getPlayError = createSelector(
    getPlayState,
    (state: PlayState) => state.error
);

export const getAllPlay = createSelector(getPlayState, (state: PlayState) =>
    selectAll(state)
);

export const getPlayEntities = createSelector(
    getPlayState,
    (state: PlayState) => selectEntities(state)
);

export const gestLastResult = createSelector(
    getPlayState,
    (state: PlayState) => {
        if (state.lastResult) {
            return state.entities[state.lastResult];
        } else {
            return undefined;
        }
    }
);

export const getWinCount = createSelector(
    getPlayState,
    (state: PlayState) => state.wins
);
export const getTotalCount = createSelector(
    getPlayState,
    (state: PlayState) => (state.ids?.length) || 0
);
