import {EntityState, EntityAdapter, createEntityAdapter} from '@ngrx/entity';
import {createReducer, on, Action} from '@ngrx/store';

import * as PlayActions from './play.actions';

import {PlayResult, PlayResultResult} from "@frontend/core";

export const PLAY_FEATURE_KEY = 'play';

export interface PlayState extends EntityState<PlayResult> {
    loaded: boolean; // has the Play list been loaded
    error?: any | null; // last known error (if any)
    lastResult?: string;
    wins: number;
}

export interface PlayPartialState {
    readonly [PLAY_FEATURE_KEY]: PlayState;
}

export const playAdapter: EntityAdapter<PlayResult> =
    createEntityAdapter<PlayResult>();

export const initialPlayState: PlayState = playAdapter.getInitialState({
    // set initial required properties
    loaded: false,
    wins: 0
});

const reducer = createReducer(
    initialPlayState,
    on(PlayActions.initPlay, (state) => ({
        ...state,
        loaded: false,
        error: null,
        wins: 0
    })),
    on(PlayActions.loadPlaySuccess, (state, {play}) =>
        playAdapter.setAll(play, {...state, loaded: true})
    ),
    on(PlayActions.loadPlayFailure, (state, {error}) => ({...state, error})),
    on(PlayActions.actionPlay, (state) => ({
        ...state,
        loaded: false,
        error: null,
    })),
    on(PlayActions.actionPlaySuccess, (state, {payload}) => {
        const wins = state.wins + (PlayResultResult.WIN === payload.result ? 1 : 0);
        return playAdapter.addOne(payload, {...state, loaded: true, lastResult: payload.id, wins: wins});
    }),
    on(PlayActions.actionPlayFailure, (state, {error}) => ({...state, error, loaded: true}))
);

export function playReducer(state: PlayState | undefined, action: Action) {
    return reducer(state, action);
}
