import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodosListComponent } from './components/todos-list/todos-list.component';

const routes: Routes = [
  { path: 'todos', component: TodosListComponent },
  { path: '', redirectTo: 'todos', pathMatch: 'full' },
  { path: '**', redirectTo: 'todos' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
