import { getState, patchState, signalStore, withComputed, withMethods, withProps } from '@ngrx/signals';
import { addEntity, removeEntity, setAllEntities, setEntity, withEntities } from '@ngrx/signals/entities';
import { computed, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { PriceLine } from '../types/priceline';
import { UnitStore } from './unit.store';
import { PriceLineService } from '../services/priceline.service';

export const PriceLineStore = signalStore({ providedIn: 'root' },
    withEntities<PriceLine>(),
    withProps((store, priceLineService = inject(PriceLineService)) => ({
        _unitStore: inject(UnitStore),
        _priceLineService: priceLineService,
        _pricelinesResource: rxResource({
            loader: () => priceLineService.getPriceLines().pipe(
                tap(pricelines => patchState(store, setAllEntities(pricelines)))
            ),
            defaultValue: []
        }),
    })),
    withComputed(({ entities, entityMap, _unitStore }) => ({
        pricelinesWithUnitName: computed(() => {
            const pricelines = entities();
            const units = _unitStore.entities();
            console.log(entityMap());
            return pricelines.map(priceline => {
                const unit = units.find(u => u.id == priceline.unitId);
                return {
                    ...priceline,
                    unitName: unit ? unit.name : ''
                } as PriceLine;
            });
        }),
        total: computed(() => {
            const pricelines = entities();
            return pricelines.reduce((acc, priceline) => acc + priceline.price * priceline.quantity * (1 - priceline.discount / 100), 0);
        }),
    })),
    withMethods(({ _priceLineService, ...store }) => ({
        addPriceLine(priceline: PriceLine) {
            return _priceLineService.addPriceLine(priceline).pipe(
                tap(() => patchState(store, addEntity(priceline)))
            );
        },
        updatePriceLine(priceline: PriceLine) {
            return _priceLineService.updatePriceLine(priceline).pipe(
                tap(() => patchState(store, setEntity(priceline)))
            );
        },
        deletePriceLine(id: number) {
            return _priceLineService.deletePriceLine(id).pipe(
                tap(() => patchState(store, removeEntity(id)))
            );
        },
    }))
);