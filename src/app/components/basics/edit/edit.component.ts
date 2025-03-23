import { Component, computed, inject, input, linkedSignal, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { PriceLine } from '../../../types/priceline';
import { PriceLineService } from '../../../services/priceline.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { rxResource } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { UnitService } from '../../../services/unit.service';
import { FormsModule } from '@angular/forms';

@Component({
    templateUrl: './edit.component.html',
    styleUrl: './edit.component.scss',
    standalone: true,
    imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatProgressSpinnerModule, MatSelectModule]
})
export class EditBasicsComponent {
    readonly priceLineService = inject(PriceLineService);
    readonly unitService = inject(UnitService);
    readonly router = inject(Router);
    
    readonly id = input.required<number>();
    readonly priceLine = rxResource({
        request: this.id,
        loader: ({ request: id }) => this.priceLineService.getPriceLine(id)
    });
    readonly units = rxResource({
        loader: () => this.unitService.getUnits()
    });

    readonly code = linkedSignal(() => this.priceLine.value()?.code ?? '');
    readonly name = linkedSignal(() => this.priceLine.value()?.name ?? '');
    readonly unitId = linkedSignal(() => this.priceLine.value()?.unitId);
    readonly price = linkedSignal(() => this.priceLine.value()?.price ?? 0);
    readonly quantity = linkedSignal(() => this.priceLine.value()?.quantity ?? 0);
    readonly discount = linkedSignal(() => this.priceLine.value()?.discount ?? 0);
    readonly isProcessing = signal(false);
    readonly isLoading = computed(() => this.priceLine.isLoading() || this.isProcessing() || this.units.isLoading());

    onSubmit() {
        this.isProcessing.set(true);
        if (this.id()) {
            const priceLine: PriceLine = {
                id: this.id(),
                code: this.code(),
                name: this.name(),
                unitId: this.unitId(),
                price: this.price(),
                quantity: this.quantity(),
                discount: this.discount(),
            };
            this.priceLineService.updatePriceLine(priceLine).subscribe(() => {
                this.isProcessing.set(false);
                this.router.navigate(['/basics']);
            });
            return;
        }

        const newPriceLine: PriceLine = {
            id: this.id(),
            code: this.code(),
            name: this.name(),
            unitId: this.unitId(),
            price: this.price(),
            quantity: this.quantity(),
            discount: this.discount(),
        };
        this.priceLineService.addPriceLine(newPriceLine).subscribe(() => {
            this.isProcessing.set(false);
            this.router.navigate(['/basics']);
        });
    }
}
