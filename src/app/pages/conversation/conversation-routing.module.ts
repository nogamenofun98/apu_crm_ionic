import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ConversationPage} from './conversation.page';

const routes: Routes = [
  {
    path: '',
    component: ConversationPage
  },
  {
    path: 'create-conversation',
    loadChildren: () => import('./create-conversation/create-conversation.module').then(m => m.CreateConversationPageModule)
  },
  {
    path: 'single-conversation',
    loadChildren: () => import('./single-conversation/single-conversation.module').then(m => m.SingleConversationPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConversationPageRoutingModule {
}
