class locators {
    constructor(){
        this.Details = {
            Username: 'Enter your username',
            Password: 'Enter your password'
            

        };
        this.ScheduleCalenderDetails = {
            ListViewButtonID : 'list-view-button',
            CalenderButtonID : 'calendar-button',
            time : '10:00 am',
            surgeon1: 'Ashraf Bustanji',
            surgeonNamePlaceHolder :'Enter Surgeon Name',
            patient1ID:'IQ300',
            Patient1NameID:'2FFFF788 2FFFF78E (IQ300)',
            Patient1Name : '2FFFF788 2FFFF78E',
            PatientNamePlaceHolder:'Enter Patient ID/ Name',
            Patient2NameID:'0037642 30037647 ( IQ1202 )',
            patient2ID : 'IQ1202',
            PostponeButtonID: 'postpone-button',

        }
    }
}
module.exports = new locators();