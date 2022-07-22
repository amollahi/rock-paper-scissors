import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { GameRestConfiguration } from './configuration';
import { HttpClient } from '@angular/common/http';

import { PlayControllerService } from './api/play-controller.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: []
})
export class GameRestApiModule {
    public static forRoot(configurationFactory: () => GameRestConfiguration): ModuleWithProviders<GameRestApiModule> {
        return {
            ngModule: GameRestApiModule,
            providers: [ { provide: GameRestConfiguration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: GameRestApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('GameRestApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
