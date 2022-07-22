import {Component} from '@angular/core';
import {Observable, tap} from "rxjs";
import {PlayFacade} from "../../+state/play.facade";

@Component({
    selector: 'frontend-play-error',
    templateUrl: './play-error.component.html',
    styleUrls: ['./play-error.component.scss'],
})
export class PlayErrorComponent  {
    alerts: any[] = [];
    error$: Observable<any>;

    constructor(private playFacade: PlayFacade) {
        this.error$= this.playFacade.error$.pipe(
            tap((error) => {
                this.alerts = [];
                if (error)
                    this.alerts.push({
                        type: 'danger',
                        msg: error.message,
                        timeout: 5000
                    });
            })
        );
    }
}
