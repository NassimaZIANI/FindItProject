import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IObject } from 'src/app/shared/interfaces/IObject';
import { ObjectService } from 'src/app/shared/services/object/object.service';

@Component({
  selector: 'app-object-add',
  templateUrl: './object-add.component.html',
  styleUrls: ['./object-add.component.scss'],
})
export class ObjectAddComponent implements OnInit {
  public objForm: FormGroup;
  public error: boolean = false;

  constructor(
    private fb: FormBuilder,
    private objService: ObjectService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createObjForm();
  }

  private createObjForm() {
    this.objForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      description: [''],
    });
  }

  public submit() {
    let value = this.objForm.value as IObject;
    this.objService.addObject(value).then((x) => {
      if (x) {
        this.objForm.reset(value);
        this.router.navigate(['objects']);
      } else {
        this.error = true;
      }
    });
  }
}
