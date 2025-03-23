import { Routes } from '@angular/router';
import { BasicsComponent } from './components/basics/basics.component';
import { RealExampleComponent } from './components/realexample/realexample.component';
import { SignalStoreComponent } from './components/signalstore/signalstore.component';
import { EditBasicsComponent } from './components/basics/edit/edit.component';
import { EditSignalComponent } from './components/signalstore/edit/edit.component';

export const routes: Routes = [
    { path: 'basics', component: BasicsComponent},
    { path: 'basics/add', component: EditBasicsComponent},
    { path: 'basics/:id', component: EditBasicsComponent},
    { path: 'signalstore', component: SignalStoreComponent },
    { path: 'signalstore/add', component: EditSignalComponent},
    { path: 'signalstore/:id', component: EditSignalComponent},
    { path: 'real-example', component: RealExampleComponent },
    { path: '', redirectTo: '/basics', pathMatch: 'full' }, // Default route
];