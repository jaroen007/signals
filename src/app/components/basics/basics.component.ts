import { Component, computed, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { PriceLineService } from '../../services/priceline.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { UnitService } from '../../services/unit.service';
import { PriceLine } from '../../types/priceline';
import { UnitStore } from '../../stores/unit.store';

@Component({
    templateUrl: './basics.component.html',
    styleUrl: './basics.component.scss',
    standalone: true,
    imports: [CommonModule, MatProgressSpinnerModule, RouterLink]
})
export class BasicsComponent {
    // counter is a reference to the signal itself while counter() is a reference to the signal's value
    // we never set or update signals using its getter function, we always use the set() and update() methods else change detection will not fire and the view will not update
    // signals should be declared as readonly to prevent accidental reassignment
    readonly counter = signal(0);

    // computed signals are derived from other signals

    setCounter() {
        //correct
        this.counter.set(10);

        //incorrect
        //this.counter() = 10;
    }

    incrementCounter() {
        //correct
        this.counter.update(count => count + 1);

        //incorrect
        //this.counter()++;
    }

    //-----------------------------------------------------------------------------------
    readonly priceLineService = inject(PriceLineService);
    readonly unitService = inject(UnitService);
    readonly unitStore = inject(UnitStore);

    readonly priceLines = rxResource({
        loader: () => this.priceLineService.getPriceLines(),
        defaultValue: []
    });
    readonly units = rxResource({
        loader: () => this.unitService.getUnits(),
        defaultValue: []
    });
    readonly isProcessing = signal(false);
    readonly isLoading = computed(() => this.priceLines.isLoading() || this.isProcessing());
    readonly total = computed(() => this.priceLines.value().reduce((acc, priceline) => acc + priceline.price * priceline.quantity * (1 - priceline.discount / 100), 0));

    // Correct way of matching the unit name with the unit id
    // Here we are using computed signal to derive the pricelines with unit name so this will be the final value that will be used in the view instead of the original pricelines signal.
    // Note that this gets updated whenever the pricelines or units signals changes so this will always be in sync with the original signals
    readonly extendedPricelines = computed(() => {
        console.log(this.unitStore.entities());
        console.log('this only gets logged whenever the pricelines or units signals changes')
        const pricelines = this.priceLines.value();
        const units = this.units.value();

        return pricelines.map(priceline => {
            const unit = units.find(u => u.id == priceline.unitId);
            return {
                ...priceline,
                unitName: unit ? unit.name : ''
            } as PriceLine;
        });
    });

    // Incorrect way of matching the unit name with the unit id
    getUnitName(id?: number) {
        console.log('this gets logged every time the view is updated, which is every single change detection cycle. in the office environment we do backend calls in functions like this which is very bad')
        return this.units.value()!.find(u => u.id == id)?.name ?? '';
    };

    deletePriceLine(id?: number) {
        this.isProcessing.set(true);
        this.priceLineService.deletePriceLine(id!).subscribe(() => {
            this.isProcessing.set(false);
        });
    }
}