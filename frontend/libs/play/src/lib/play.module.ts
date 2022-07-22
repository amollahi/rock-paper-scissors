import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ActionsComponent } from './components/actions/actions.component';
import { AlertModule } from 'ngx-bootstrap/alert';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromPlay from './+state/play.reducer';
import { PlayEffects } from './+state/play.effects';
import { PlayFacade } from './+state/play.facade';
import { LastResultComponent } from './components/last-result/last-result.component';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { ResultStatisticsComponent } from './components/result-statistics/result-statistics.component';
import { PlayErrorComponent } from './components/play-error/play-error.component';

@NgModule({
    imports: [
        CommonModule,
        AlertModule,
        TooltipModule,
        ProgressbarModule,
        StoreModule.forFeature(fromPlay.PLAY_FEATURE_KEY, fromPlay.playReducer),
        EffectsModule.forFeature([PlayEffects]),
    ],
    declarations: [
        ActionsComponent,
        LastResultComponent,
        ResultStatisticsComponent,
        PlayErrorComponent,
    ],
    exports: [ActionsComponent, LastResultComponent, ResultStatisticsComponent, PlayErrorComponent],
    providers: [PlayFacade],
})
export class PlayModule {
}
