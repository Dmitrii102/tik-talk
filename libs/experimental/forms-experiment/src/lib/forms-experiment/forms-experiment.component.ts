import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {MockService} from '../experimental/mock.service';

enum ReceiverType {
  PERSON = 'PERSON',
  LEGAl = 'LEGAL'
}

function getAddressForm(){
  return new FormGroup({
    city: new FormControl<string>(''),
    street: new FormControl<string>(''),
    building: new FormControl<number | null>(null),
    apartment: new FormControl<number | null>(null),
  });
}

@Component({
  selector: 'tt-forms-experiment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forms-experiment.component.html',
  styleUrl: './forms-experiment.component.css',
})
export class FormsExperimentComponent {

  // #fb = inject(FormBuilder);

  ReceiverType = ReceiverType

  mockService = inject(MockService)

  form = new FormGroup({
    type: new FormControl<ReceiverType>(ReceiverType.PERSON),
    name: new FormControl<string>('', Validators.required),
    inn: new FormControl<string>(''),
    lastName: new FormControl<string>(''),
    addresses: new FormArray([getAddressForm()])
  });

  // form = this.#fb.group({
  //   type: this.#fb.control<ReceiverType>(ReceiverType.PERSON),
  //     name: this.#fb.control<string>(''),
  //     inn: this.#fb.control<string>(''),
  //     lastName: this.#fb.control<string>(''),
  //     address: this.#fb.group({
  //       city: this.#fb.control<string>(''),
  //       street: this.#fb.control<string>(''),
  //       building: this.#fb.control<number | null>(null),
  //       apartment: this.#fb.control<number | null>(null),
  //     })
  //
  // })



  constructor() {
    // this.mockService.getAddresses()
    //   .pipe(takeUntilDestroyed())
    //   .subscribe(addrs => {
    //     while (this.form.controls.addresses.controls.length > 0) {
    //       this.form.controls.addresses.removeAt(0)
    //     }
    //   })
    this.form.controls.type.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe(val => {
        this.form.controls.inn.clearValidators();

        if (val === ReceiverType.LEGAl) {
          this.form.controls.inn.setValidators(
            [Validators.required, Validators.minLength(10), Validators.maxLength(10)]);
        }
      })
  }



  onSubmit(event: SubmitEvent)  {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    if (this.form.invalid) return;

    console.log(this.form.value);
    console.log(this.form.getRawValue());
  }

  addAddress() {
    this.form.controls.addresses.insert(0,getAddressForm());
  }

  deleteAddress(index: number) {
    this.form.controls.addresses.removeAt(index, {emitEvent: false});
  }
}
