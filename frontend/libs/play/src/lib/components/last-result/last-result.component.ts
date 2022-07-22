import { Component } from '@angular/core';
import { PlayResult, PlayResultResult } from '@frontend/core';
import { Observable, tap } from 'rxjs';
import { PlayFacade } from '../../+state/play.facade';

@Component({
    selector: 'frontend-last-result',
    templateUrl: './last-result.component.html',
    styleUrls: ['./last-result.component.scss']
})
export class LastResultComponent {
    alerts: any[] = [];
    lastResult$: Observable<PlayResult | undefined>;

    constructor(private playFacade: PlayFacade) {
        this.lastResult$ = this.playFacade.lastResult$.pipe(
            tap((result) => this.createAlertFromResult(result))
        );
    }

    private createAlertFromResult(result?: PlayResult) {
        this.alerts = [];
        if (result) {
            this.alerts.push({
                type: this.getAlertType(result),
                msg: this.getAlertMessage(result),
                timeout: 5000
            });
        }
    }

    private getAlertType(result: PlayResult) {
        switch (result.result) {
            case PlayResultResult.DRAW:
                return 'warning';
            case PlayResultResult.WIN:
                return 'success';
            case PlayResultResult.LOSE:
            default:
                return 'danger';
        }
    }

    private getAlertMessage(result: PlayResult) {
        switch (result.result) {
            case PlayResultResult.DRAW:
                return `It's a DRAW!   - Computer[<img src="./assets/${result.computerAction}.png" width="50px" height="50px">] playId[${result.id}]`;
            case PlayResultResult.WIN:
                return `You WIN! - Computer[<img src="./assets/${result.computerAction}.png" width="50px" height="50px">] playId[${result.id}]`;
            case PlayResultResult.LOSE:
                return `You LOSE!  - Computer[<img src="./assets/${result.computerAction}.png" width="50px" height="50px">] playId[${result.id}]`;
            default:
                return `Something went wrong. Try Again`;

        }
    }

}
