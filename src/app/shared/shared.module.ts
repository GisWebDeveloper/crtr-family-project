import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePropPipe } from '../pipes/translate-prop.pipe';

@NgModule({
    declarations: [
        TranslatePropPipe
    ],
    imports: [
        CommonModule
    ],
    exports: [
        TranslatePropPipe
    ]
})
export class SharedModule { }
