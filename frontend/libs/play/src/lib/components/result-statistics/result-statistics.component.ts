import {Component} from '@angular/core';
import {combineLatest, Observable, tap} from "rxjs";
import {PlayFacade} from "../../+state/play.facade";

@Component({
    selector: 'frontend-result-statistics',
    templateUrl: './result-statistics.component.html',
    styleUrls: ['./result-statistics.component.scss']
})
export class ResultStatisticsComponent {
    winCount = 0;
    totalCount = 0;
    subs$: Observable<any>;

    constructor(private playFacade: PlayFacade) {
        this.subs$ = combineLatest([this.playFacade.winCount$, this.playFacade.totalCount$]).pipe(
            tap(counts => {
                this.winCount = counts[0];
                this.totalCount = counts[1];
            })
        );
    }


}
