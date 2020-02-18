import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SingleConversationPage} from './single-conversation.page';

const routes: Routes = [
  {
    path: '',
    component: SingleConversationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingleConversationPageRoutingModule {
}
