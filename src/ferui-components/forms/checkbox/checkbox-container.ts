import { Component, ContentChild, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgControl } from '@angular/forms';

import { IfErrorService } from '../common/if-error/if-error.service';
import { FuiLabel } from '../common/label';
import { ControlClassService } from '../common/providers/control-class.service';
import { NgControlService } from '../common/providers/ng-control.service';
import { FormControlClass } from '../../utils/form-control-class/form-control-class';
import { CheckboxReference } from './checkbox-reference';
import { AfterContentInit } from '@angular/core';

@Component({
  selector: 'fui-checkbox-container',
  template: `
    <ng-content select="label"></ng-content>
    <label *ngIf="!label"></label>
    <div class="fui-control-container" [ngClass]="controlClass()">
      <ng-content select="fui-checkbox-wrapper"></ng-content>
      <div class="fui-checkbox-subtext-wrapper">
        <clr-icon *ngIf="invalid" class="fui-error-icon is-red" shape="fui-error" aria-hidden="true"></clr-icon>
        <fui-default-control-error [on]="invalid">
          <ng-content select="fui-control-error" *ngIf="invalid"></ng-content>
        </fui-default-control-error>
      </div>
    </div>
  `,
  host: {
    '[class.fui-form-control]': 'true',
    '[class.fui-form-control-disabled]': 'control?.disabled',
  },
  providers: [NgControlService, ControlClassService, IfErrorService],
})
export class FuiCheckboxContainer implements OnDestroy, AfterContentInit {
  private subscriptions: Subscription[] = [];
  invalid = false;
  control: NgControl;

  @ContentChild(FuiLabel) label: FuiLabel;
  @ContentChild(CheckboxReference) injectedControl: CheckboxReference;

  constructor(
    private ifErrorService: IfErrorService,
    private controlClassService: ControlClassService,
    private ngControlService: NgControlService
  ) {
    this.subscriptions.push(
      this.ngControlService.controlChanges.subscribe(control => {
        this.control = control;
      })
    );
  }

  ngOnInit() {
    this.subscriptions.push(
      this.ifErrorService.statusChanges.subscribe(invalid => {
        this.invalid = invalid;
      })
    );
  }

  controlClass() {
    return this.controlClassService.controlClass(
      this.invalid,
      FormControlClass.extractControlClass(this.control, this.label, this.injectedControl)
    );
  }

  ngAfterContentInit() {
    if (this.label && this.injectedControl) {
      this.label.setLabelRequired(this.injectedControl.required !== undefined);
    }
  }

  ngOnDestroy() {
    this.subscriptions.map(sub => sub.unsubscribe());
  }
}