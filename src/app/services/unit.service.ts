import { Injectable } from '@angular/core';
import { delay, of, tap } from 'rxjs';
import { Unit } from '../types/unit';

@Injectable({
    providedIn: 'root',
})
export class UnitService {
    // This is mock data, in a real application this would be fetched from an API
    private readonly units: Unit[] = [
        {
            id: 1,
            code: 'U1',
            name: 'unit 1',
        },
        {
            id: 2,
            code: 'U2',
            name: 'unit 2',
        },
        {
            id: 3,
            code: 'U3',
            name: 'unit 3',
        }
    ];

    getUnits() {
        return of(this.units).pipe(delay(2000));
    }

    getUnit(id: number) {
        return of(this.units.find(u => u.id == id)).pipe(delay(1500));
    }

    deleteUnit(id: number) {
        return of(null).pipe(
            delay(1000),
            tap(() => {
                const index = this.units.findIndex(u => u.id == id);
                if (index !== -1) {
                    this.units.splice(index, 1);
                }
            })
        );
    }

    addUnit(unit: Unit) {
        return of(null).pipe(
            delay(2000),
            tap(() => {
                unit.id = this.units.length + 1;
                this.units.push(unit);
            })
        );
    }

    updateUnit(unit: Unit) {
        return of(null).pipe(
            delay(2000),
            tap(() => {
                const index = this.units.findIndex(u => u.id == unit.id);
                if (index !== -1) {
                    this.units[index] = unit;
                }
            })
        );
    }
}