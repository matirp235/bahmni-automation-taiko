class locators {
    constructor(){
        this.Details = {
            Username: 'Enter your username',
            Password: 'Enter your password',
            postpone_message: 'enter reason',
            patient_message: 'Enter Patient ID/ Name',
            surgeon1: 'Sufyan Al Qasab',
            surgeon2: 'Dr Ali Al Ani',
            surgeon3: 'Other Surgeon',
            patient1: '3009C210 3009C215 ( IQ3004 )',
            patient2: '30006574 3000657A ( IQ404 )',
            start_date_time: '2021-05-28, 10:40 AM',
            end_date_time: '2021-05-28, 4:40 PM'
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
        this.ListView = {
            postpone_message: 'enter reason',
            moveDate: 'dd/mm/yyyy',
            cancel_message: 'enter reason'

        }
    }
}
module.exports = new locators();