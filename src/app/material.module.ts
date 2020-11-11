import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
    imports: [
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatDividerModule
    ],
    exports: [
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatDividerModule
    ]
})
export class MaterialModule {}