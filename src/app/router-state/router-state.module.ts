import { NgModule } from "@angular/core";
import { routerReducer } from "@ngrx/router-store";
import { StoreModule } from "@ngrx/store";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    imports: [
        SharedModule,
        StoreModule.forFeature('router', routerReducer)
    ]
})
export class RouterStateModule { }