import {Injectable} from '@angular/core';
import {select, Store, Action} from '@ngrx/store';

import * as PlayActions from './play.actions';
import * as PlayFeature from './play.reducer';
import * as PlaySelectors from './play.selectors';
import {PlayCommandAction} from "@frontend/core";
import {gestLastResult} from "./play.selectors";

@Injectable()
export class PlayFacade {
    /**
     * Combine pieces of state using createSelector,
     * and expose them as observables through the facade.
     */
    loaded$ = this.store.pipe(select(PlaySelectors.getPlayLoaded));
    allPlay$ = this.store.pipe(select(PlaySelectors.getAllPlay));
    lastResult$ = this.store.pipe(select(PlaySelectors.gestLastResult));
    winCount$ = this.store.pipe(select(PlaySelectors.getWinCount));
    totalCount$ = this.store.pipe(select(PlaySelectors.getTotalCount));
    error$ = this.store.pipe(select(PlaySelectors.getPlayError));

    constructor(private readonly store: Store) {
    }

    /**
     * Use the initialization action to perform one
     * or more tasks in your Effects.
     */
    init() {
        this.store.dispatch(PlayActions.initPlay());
    }

    play(action: PlayCommandAction) {
        this.store.dispatch(PlayActions.actionPlay({payload: action}));
    }

}
