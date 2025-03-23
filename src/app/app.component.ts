import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UnitStore } from './stores/unit.store';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    standalone: true,
    imports: [CommonModule, RouterOutlet, RouterLink]
})
export class AppComponent {
    readonly unitStore = inject(UnitStore);
}
