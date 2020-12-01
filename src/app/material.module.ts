import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
    imports: [
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatDividerModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCardModule,
        MatCheckboxModule,
        MatSidenavModule
    ],
    exports: [
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatDividerModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCardModule,
        MatCheckboxModule,
        MatSidenavModule
    ]
})
export class MaterialModule {}
