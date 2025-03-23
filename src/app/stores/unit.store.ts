import { patchState, signalStore, withMethods, withProps, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { addEntity, removeEntity, setAllEntities, setEntity, withEntities } from '@ngrx/signals/entities';
import { Unit } from '../types/unit';
import { inject } from '@angular/core';
import { UnitService } from '../services/unit.service';
import { pipe, switchMap, tap } from 'rxjs';

type UnitState = {
    isLoading: boolean;
};

const initialState: UnitState = {
    isLoading: false,
};

export const UnitStore = signalStore({ providedIn: 'root' },
    withEntities<Unit>(),
    withState(initialState),
    withProps((store, unitService = inject(UnitService)) => ({
        _unitService: unitService
    })),
    withMethods((store) => ({
        _getUnits: rxMethod<void>(() => {
            patchState(store, { isLoading: true });
            return store._unitService.getUnits().pipe(
                tapResponse({
                    next: (units) => patchState(store, setAllEntities(units), { isLoading: false }),
                    error: (error) => console.error("something went wrong: ", error)
                })
            )
        }),
        getUnit(id: number) {
            patchState(store, { isLoading: true });
            return store._unitService.getUnit(id).pipe(
                tapResponse({
                    next: () => patchState(store, { isLoading: false }),
                    error: (error) => console.error("something went wrong: ", error)
                })
            )
        },
        addUnit(unit: Unit) {
            return store._unitService.addUnit(unit).pipe(
                tap(() => patchState(store, addEntity(unit)))
            );
        },
        updateUnit(unit: Unit) {
            return store._unitService.updateUnit(unit).pipe(
                tap(() => patchState(store, setEntity(unit)))
            );
        },
        deleteUnit: rxMethod<number>(
            pipe(
                switchMap((id: number) => {
                    patchState(store, { isLoading: true });
                    return store._unitService.deleteUnit(id).pipe(
                        tapResponse({
                            next: () => patchState(store, removeEntity(id), { isLoading: false }),
                            error: (error) => console.error("something went wrong: ", error)
                        })
                    );
                })
            )
        )
    }))
);