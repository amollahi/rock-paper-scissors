import {createAction, props} from '@ngrx/store';
import {PlayCommandAction, PlayResult} from "@frontend/core";

export const initPlay = createAction('[Play Page] Init');

export const loadPlaySuccess = createAction(
    '[Play/API] Load Play Success',
    props<{ play: PlayResult[] }>()
);

export const loadPlayFailure = createAction(
    '[Play/API] Load Play Failure',
    props<{ error: any }>()
);

export const actionPlay = createAction(
    '[Play/API] Action Play',
    props<{ payload: PlayCommandAction }>()
);
export const actionPlaySuccess = createAction(
    '[Play/API] Action Play Success',
    props<{ payload: PlayResult }>()
);

export const actionPlayFailure = createAction(
    '[Play/API] Action Play Failure',
    props<{ error: any }>()
);
