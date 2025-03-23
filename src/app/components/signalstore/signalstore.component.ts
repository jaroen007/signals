import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { UnitStore } from '../../stores/unit.store';

@Component({
    templateUrl: './signalstore.component.html',
    styleUrl: './signalstore.component.scss',
    standalone: true,
    imports: [CommonModule, MatProgressSpinnerModule, RouterLink]
})
export class SignalStoreComponent {
    unitStore = inject(UnitStore);
}
