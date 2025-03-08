import { Injectable, signal } from '@angular/core';
import { delay, of, tap } from 'rxjs';
import { PriceLine } from '../types/priceline';

@Injectable({
    providedIn: 'root',
})
export class PriceLineService {
    // This is mock data, in a real application this would be fetched from an API
    private readonly priceLines: PriceLine[] = [
        {
            id: 1,
            code: 'PL1',
            name: 'priceline 1',
            unitId: 1,
            price: 10.5,
            quantity: 10,
            discount: 5,
        },
        {
            id: 2,
            code: 'PL2',
            name: 'priceline 2',
            unitId: 2,
            price: 50,
            quantity: 1,
            discount: 0,
        },
        {
            id: 3,
            code: 'PL3',
            name: 'priceline 3',
            unitId: 3,
            price: 24.3,
            quantity: 0,
            discount: 0,
        }
    ];

    getPriceLines() {
        return of(this.priceLines).pipe(delay(2000));
    }

    getPriceLine(id: number) {
        return of(this.priceLines.find(priceLine => priceLine.id == id)).pipe(delay(1500));
    }

    deletePriceLine(id: number) {
        return of(null).pipe(
            delay(1000),
            tap(() => {
                const index = this.priceLines.findIndex(priceLine => priceLine.id == id);
                if (index !== -1) {
                    this.priceLines.splice(index, 1);
                }
            })
        );
    }

    addPriceLine(priceLine: PriceLine) {
        return of(null).pipe(
            delay(2000),
            tap(() => {
                priceLine.id = this.priceLines.length + 1;
                this.priceLines.push(priceLine);
            })
        );
    }

    updatePriceLine(priceLine: PriceLine) {
        return of(null).pipe(
            delay(2000),
            tap(() => {
                const index = this.priceLines.findIndex(pl => pl.id == priceLine.id);
                if (index !== -1) {
                    this.priceLines[index] = priceLine;
                }
            })
        );
    }
}