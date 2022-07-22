import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {fetch} from '@nrwl/angular';

import * as PlayActions from './play.actions';
import {PlayControllerService, PlayResult} from "@frontend/core";
import {map} from "rxjs";
import * as uuid from 'uuid';

@Injectable()
export class PlayEffects {
    init$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PlayActions.initPlay),
            fetch({
                run: (action) => {
                    // Your custom service 'load' logic goes here. For now just return a success action...
                    return PlayActions.loadPlaySuccess({play: []});
                },
                onError: (action, error) => {
                    console.error('Error', error);
                    return PlayActions.loadPlayFailure({error});
                },
            })
        )
    );

    play$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PlayActions.actionPlay),
            fetch({
                id: (play) => {
                    return uuid.v4();

                },
                run: (play) => {
                    return this.playControllerService.playGameAction({action: play.payload}).pipe(
                        map((result) => PlayActions.actionPlaySuccess({payload: result}))
                    )
                },
                onError: (action, error) => {
                    console.error('Error', error);
                    return PlayActions.actionPlayFailure({error});
                },
            })
        )
    );

    constructor(private readonly actions$: Actions, private readonly playControllerService: PlayControllerService) {
    }
}
