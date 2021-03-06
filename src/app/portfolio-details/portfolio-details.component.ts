import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-portfolio-details',
  templateUrl: './portfolio-details.component.html',
  styleUrls: ['./portfolio-details.component.css']
})
export class PortfolioDetailsComponent implements OnInit {


  isOrgAdmin = false;
  username = "";
  portfolioDetailsForm: FormGroup;
  sampleData1 = {
    "bu": "",
    "vertical": "",
    "account": "",
    "bo": "",
    "appName": "",
    "al": "",
    "entity": "",
    "asIs": "",
    "toBe": ""

  };

  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toast: ToastrService,
    private authenticationService: AuthenticationService) {

    this.username = localStorage.getItem('username');

  }

  ngOnInit() {
    this.authenticationService.sampleData1=null;
    let role = localStorage.getItem('role').toUpperCase();
    this.portfolioDetailsForm = this.formBuilder.group({
      bu: [role == 'ORG_ADMIN' ? "BFSI" : role],
      vertical: ['App Moderanization', Validators.required],
      account: ['DTCC', Validators.required],
      bo: ['Dinesh', Validators.required],
      appName: ['App-1', Validators.required],
      al: ['test@wipro.com', Validators.required]
    });
    if (role == "ORG_ADMIN") {
      this.isOrgAdmin = true;
    }
    else {
      this.portfolioDetailsForm.get('bu').disable();
    }
  }
  get f() { return this.portfolioDetailsForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.portfolioDetailsForm.invalid) {
        return;
    }

    this.sampleData1.bu = this.f.bu.value;
    this.sampleData1.vertical = this.f.vertical.value;
    this.sampleData1.account = this.f.account.value;
    this.sampleData1.bo = this.f.bo.value;
    this.sampleData1.appName = this.f.appName.value;
    this.sampleData1.al = this.f.al.value;

    this.sampleData1.entity = "Portfolio";

    this.authenticationService.save1(this.sampleData1);
    this.router.navigate(['application-estate']);
  }

}
