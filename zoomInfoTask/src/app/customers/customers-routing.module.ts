import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'form', loadChildren: () => import('src/app/customers/form/form.module').then(m => m.FormModule) },
  { path: 'table', loadChildren: () => import('src/app/customers/table/table.module').then(m => m.TableModule) },

];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class CustomersRoutingModule {
}
