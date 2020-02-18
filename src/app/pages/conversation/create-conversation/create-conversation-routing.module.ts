import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {CreateConversationPage} from './create-conversation.page';

const routes: Routes = [
  {
    path: '',
    component: CreateConversationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateConversationPageRoutingModule {
}
