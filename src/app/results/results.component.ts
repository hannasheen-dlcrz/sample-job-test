import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.less']
})
export class ResultsComponent implements OnInit {
  personDetails = [];

  constructor() { }
  ngOnInit(): void {

    this.getProfile()
  

    console.log("getlocalStorage")
  }

  getProfile() {
    let details = JSON.parse(window.localStorage.getItem('details') || '[]');

    details.forEach((val:any, key:number) => {
      if (!val.dateOfBirth) return
      const bdate = new Date(val.dateOfBirth)
      const dateNow = new Date()
      let ageYear = 0
      let ageMonth = 0

      const bdateInObj = {
        month: bdate.getMonth() + 1,
        day: bdate.getDate(),
        year: bdate.getFullYear()
      }

      const nowInObj = {
        month: dateNow.getMonth() + 1,
        day: dateNow.getDate(),
        year: dateNow.getFullYear()
      }

      let yearDiff = nowInObj.year - bdateInObj.year
      let monthDiff = nowInObj.month - bdateInObj.month
      let dateDiff = nowInObj.day - bdateInObj.day
      if (dateDiff < 0) {
        ageYear = yearDiff - 1
        ageMonth = 12 - (bdateInObj.month - nowInObj.month)
        ageMonth = ageMonth - 1
      } else if (monthDiff < 0) {
        ageYear = yearDiff - 1
        ageMonth = 12 - (bdateInObj.month - nowInObj.month)
      } else {
        ageYear = yearDiff + 1
        ageMonth = monthDiff
      }

      if (ageMonth >= 12) {
        ageYear = ageYear + 1
        ageMonth = ageMonth - 12
      }

      val.age = this.getStringLabel(ageYear, ageMonth)
    })
    this.personDetails = details;
  }

  getStringLabel(ageYear: number, ageMonth: number) {
    return `${ageYear}${ageYear > 1 ? ' years' : ' year'} ${ageMonth > 1 ? ` and ${ageMonth} months` : ageMonth === 0 ? ' old' :`and ${ageMonth} month`}`
  }

}
