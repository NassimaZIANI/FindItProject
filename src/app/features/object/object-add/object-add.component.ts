import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ObjectService } from 'src/app/shared/services/object/object.service';

@Component({
  selector: 'app-object-add',
  templateUrl: './object-add.component.html',
  styleUrls: ['./object-add.component.scss'],
})
export class ObjectAddComponent implements OnInit {
  public objForm: FormGroup;

  constructor(private fb: FormBuilder, private objService: ObjectService) {}

  ngOnInit(): void {
    this.createObjForm();
  }

  private createObjForm() {
    this.objForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
    });
  }

  public submit() {}
}
