import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NotFoundComponent } from "./not-found/not-found.component";

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgbModule
    ],
    declarations: [
        NotFoundComponent
    ],
    exports: [
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgbModule,
        NotFoundComponent
    ]
})
export class SharedModule { }