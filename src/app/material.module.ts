import { NgModule } from '@angular/core';
import { MatExpansionModule, MatButtonModule, MatMenuModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatToolbarModule} from '@angular/material/toolbar';

const MODULES = [
    MatMenuModule,
    MatCardModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatButtonModule,
    MatToolbarModule
]

@NgModule({
    imports: MODULES,
    exports: MODULES
})

export class MaterialModule{

}