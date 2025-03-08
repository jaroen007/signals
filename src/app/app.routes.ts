import { Routes } from '@angular/router';
import { BasicsComponent } from './components/basics/basics.component';
import { RealExampleComponent } from './components/realexample/realexample.component';
import { ResourceComponent } from './components/resource/resource.component';
import { SignalStoreComponent } from './components/signalstore/signalstore.component';
import { EditComponent } from './components/basics/edit/edit.component';

export const routes: Routes = [
    { path: 'basics', component: BasicsComponent},
    { path: 'basics/add', component: EditComponent},
    { path: 'basics/:id', component: EditComponent},
    { path: 'resource', component: ResourceComponent },
    { path: 'signalstore', component: SignalStoreComponent },
    { path: 'real-example', component: RealExampleComponent },
    { path: '', redirectTo: '/basics', pathMatch: 'full' }, // Default route
];