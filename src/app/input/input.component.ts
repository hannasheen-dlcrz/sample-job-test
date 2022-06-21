import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.less']
})

export class InputComponent implements OnInit {
  
  personalDetails = {
    dateSubmitted: new Date(),
    fullname: null,
    email: null,
    dateOfBirth: null,
    favoriteColor: null
  };
  showConfirmationMessage = false;
  showResults = false;

  constructor() { 
  }

  ngOnInit(): void {
  }

  saveDetails() {
    let detailsArr = [];
    let storedDetails = window.localStorage.getItem('details');
    if (storedDetails) {
      detailsArr = JSON.parse(storedDetails)
    }

    detailsArr.push(this.personalDetails)

    window.localStorage.setItem('details', JSON.stringify(detailsArr))
    this.showConfirmationMessage = true;
  }

  seeResults() {

  }

}
