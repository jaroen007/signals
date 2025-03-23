import { Component, computed, inject, input, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UnitStore } from '../../../stores/unit.store';
import { map, tap } from 'rxjs';
import { Unit } from '../../../types/unit';
import { unitForm } from './unit.form';

@Component({
    templateUrl: './edit.component.html',
    styleUrl: './edit.component.scss',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatProgressSpinnerModule, MatSelectModule]
})
export class EditSignalComponent implements OnInit {
    readonly unitStore = inject(UnitStore);
    readonly router = inject(Router);
    readonly id = input.required<number>();
    readonly unitForm = unitForm;
    readonly unit = toSignal<Unit>(
        this.unitForm.valueChanges.pipe(map(k => k as Unit), tap(console.log))
    );

    ngOnInit(): void {
        if (this.id()) {
            this.unitStore.getUnit(this.id()).subscribe(unit => {
                this.unitForm.patchValue({ ...unit });
            });
        } else {
            this.unitForm.reset();
        }
    }

    onSubmit() {
        if (!this.unitForm.valid) {
            return;
        }

        if (!this.id()) {
            this.unitStore.addUnit(this.unit()!).subscribe(() => {
                this.router.navigate(['/signalstore']);
            });
        } else {
            this.unitStore.updateUnit(this.unit()!).subscribe(() => {
                this.router.navigate(['/signalstore']);
            });
        }
    }
}
