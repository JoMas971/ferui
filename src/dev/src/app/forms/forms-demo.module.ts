import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default/default.component';
import { ROUTING } from './forms-demo.routing';
import { InputsComponent } from './inputs/inputs.component';
import { FeruiModule } from '@ferui/components';
import { FormsLandingComponent } from './forms-landing.component';
import { FormsModule } from '@angular/forms';
import { HighlightModule } from 'ngx-highlightjs';
import { TextareaComponent } from './textarea/textarea.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { SelectsComponent } from './select/selects.component';
import { RadiosComponent } from './radios/radios.component';
import { PasswordComponent } from './password/password.component';
import { DefaultTemplateWrapper } from './default-template-wrapper';
import { DefaultTemplateContent } from './default-template-content';
import { DatetimeComponent } from './datetime/datetime.component';

@NgModule({
  imports: [CommonModule, FormsModule, FeruiModule, ROUTING, HighlightModule],
  declarations: [
    DefaultTemplateWrapper,
    DefaultTemplateContent,
    DefaultComponent,
    InputsComponent,
    DatetimeComponent,
    TextareaComponent,
    CheckboxComponent,
    RadiosComponent,
    SelectsComponent,
    PasswordComponent,
    FormsLandingComponent,
  ],
  exports: [
    DefaultTemplateWrapper,
    DefaultTemplateContent,
    DefaultComponent,
    InputsComponent,
    DatetimeComponent,
    TextareaComponent,
    CheckboxComponent,
    RadiosComponent,
    SelectsComponent,
    PasswordComponent,
  ],
})
export class FormsDemoModule {}
