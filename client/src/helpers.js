import moment from 'moment'


export function formattedDate(date, format = 'MM/DD/YY') {
    return moment(date).format(format)
  }


export function inputCheck() {
    // Get the checkbox
    var checkBox = document.getElementById("sleep");
  
    // If the checkbox is checked
    if (checkBox.checked === true){
      //show line of data
      console.log("checked")
    } else {
      //hide line of data
    }
  }


//   deleteHaiku = (event) => {
//     event.preventDefault()
//   //   console.log('clicked')
//   let { id } = this.props.match.params
//   apiClient({
//       method: 'delete',
//       url: `/api/haikus/${id}`
//   })
//   .then(response => {
//       this.props.history.push('/')
//   })
// }
