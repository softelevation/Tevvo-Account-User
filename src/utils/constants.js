const PlanningData = [
  {
    startDate: '11/27/2021',
    startTime: '0800',
    EndDate: '11/27/2021',
    EndTime: '1700',
    vehicleCode: 'GMT017',
    changed: true,
    changeStartDate: '11/28/2021',
    changeStartTime: '0900',
    changeEndDate: '11/28/2021',
    changeEndTime: '1900',
  },
  {
    startDate: '11/27/2021',
    startTime: '0800',
    EndDate: '11/27/2021',
    EndTime: '1700',
    vehicleCode: 'GMT017',
    changed: false,
  },
  {
    startDate: '11/27/2021',
    startTime: '0800',
    EndDate: '11/27/2021',
    EndTime: '1700',
    vehicleCode: 'GMT017',
    changed: false,
  },
  {
    startDate: '11/27/2021',
    startTime: '0800',
    EndDate: '11/27/2021',
    EndTime: '1700',
    vehicleCode: 'GMT017',
    changed: false,
  },
  {
    startDate: '11/27/2021',
    startTime: '0800',
    EndDate: '11/27/2021',
    EndTime: '1700',
    vehicleCode: 'GMT017',
    changed: false,
  },
];

const planningDetails = {
  startDate: '11/27/2021',
  startTime: '0800',
  EndDate: '11/27/2021',
  EndTime: '1700',
  vehicleCode: 'GMT017',
  changed: true,
  changeStartDate: '11/28/2021',
  changeStartTime: '0900',
  changeEndDate: '11/28/2021',
  changeEndTime: '1900',
  rejectUnit: false,
};
export const transportStatus = (name) => {
  switch (name) {
    case 'dispatch_requested':
      return 'Dispatch Requested';
    case 'noshow':
      return 'Completed - No Show';
    case 'en_route':
      return 'En Route';
    case 'arrived_at_pick_up':
      return 'Arrived at PU';
    case 'confirm_dob':
      return 'Confirmed DOB';
    case 'patient_loaded':
      return 'Patient loaded';
    case 'arrived_at_drop_off':
      return 'Arrived at DO';
    case 'rejected':
      return 'Rejected';
    case 'completed':
      return 'Completed';
    case 'planned':
      return 'Planned';
    case 'accepted':
      return 'Accepted';
    case 'cancelled':
      return 'Cancelled';
    case 'aborted':
      return 'Aborted';
    case 'requested':
      return 'Requested';
    case 'unassigned':
      return 'Unassigned';
    case 'expired':
      return 'Expired';
    case 'allocated':
      return 'Allocated';
    case 'dispatched':
      return 'Dispatched';
    default:
      return name;
  }
};
export {PlanningData, planningDetails};

// {
//   "corporate_account_id": 2,
//   "first_name": "aman",
//   "last_name": "tyagi",
//   "email_id": "mailto:parasharamantyagi@gmail.com",
//   "phone": "+1(916) 239-4638",
//   "dob": "2022-02-02T06:43:22.077Z",
//   "weight": "220",
//   "room_no": "15",
//   "description": "ok",
//   "trip_pickup_location": "Noida, Uttar Pradesh, India",
//   "trip_dropoff_location": "Delhi, India",
//   "pick_up_date_time": "2022-02-02T07:30:47.000Z",
//   "withValidation": false,
//   "corporate_contact": [
//     {
//       "first_name": "",
//       "last_name": 2,
//       "email_id": 2,
//       "phone_number": "+1(454) 545-4545",
//       "enabled": 1,
//       "corporate_contact_id": 2,
//       "phoneNumberArray": []
//     }
//   ],
//   "capability_id": [
//     1
//   ],
//   "question_id": [
//     1
//   ],
//   "pickup_lat": 28.5355161,
//   "pickup_lng": 77.3910265,
//   "dropoff_lat": 28.7040592,
//   "dropoff_lng": 77.10249019999999
// }
