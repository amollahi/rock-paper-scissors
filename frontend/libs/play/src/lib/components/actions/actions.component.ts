import { Component } from '@angular/core';
import { PlayCommandAction, PlayControllerService } from '@frontend/core';
import { PlayFacade } from '../../+state/play.facade';

@Component({
    selector: 'frontend-actions',
    templateUrl: './actions.component.html',
    styleUrls: ['./actions.component.scss'],
})
export class ActionsComponent {

    paper = PlayCommandAction.PAPER;
    rock = PlayCommandAction.ROCK;
    scissors = PlayCommandAction.SCISSORS;

    constructor(private playService: PlayControllerService, private playFacade: PlayFacade) {
    }

    play(action: PlayCommandAction) {
        this.playFacade.play(action);
    }

}
