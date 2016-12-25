var app = new Vue({

    el: '#app',
  data: {
    basesalary: '0',
    bonus: '0',
    vacationdays: "0",
    sickdays: '0',
    insurance: '0',
    retirementemployee: '0',
    retirementemployer: '0',
    other: '0',
    businessdays: '252',
    workingdays: '0',
    socialSecurityTaxRate: '0.062',
    medicareTaxRate: '0.0145',
    dailyrate: '---'
  },

  methods: {

      calcDailyRate: function () {
          
          this.workingdays = parseFloat(parseFloat(this.businessdays)-(parseFloat(this.vacationdays) + parseFloat(this.sickdays)))

          var extraPayrollCost = this.calcExtraPayrollCost();
          var totalIncome = parseFloat(this.basesalary) + parseFloat(this.bonus) + parseFloat(this.retirementemployee) + parseFloat(this.retirementemployer)
          +parseFloat(this.insurance)
          + parseFloat(this.other)
          + extraPayrollCost

          console.log('woot '+ this.workingdays + ' '+ totalIncome);

          var dailyRate = parseFloat(totalIncome/this.workingdays)

          console.log(dailyRate);

          this.dailyrate = parseInt(dailyRate);
      },

      calcExtraPayrollCost: function () {
          var taxableIncome = (parseFloat(this.basesalary) + parseFloat(this.bonus)) - (parseFloat(this.retirementemployee))

          var socialSecurityTaxRate = parseFloat(this.socialSecurityTaxRate); //6.2 %
          var medicareTaxRate = parseFloat(this.medicareTaxRate); //1.45%

          var socialSecurityContribution = 0; //initialize
          var medicareContribution = taxableIncome * medicareTaxRate;

          if(taxableIncome > 118000) {
              socialSecurityContribution = 118500 * socialSecurityTaxRate;
          } else {
              socialSecurityContribution = taxableIncome * socialSecurityTaxRate;
          }
          var extraPayrollCost = socialSecurityContribution + medicareContribution;

          return extraPayrollCost;

      }
  }

  
})
