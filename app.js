// Log class: representing a single response
class Log {
    constructor(channelName, day, month, year, customer_id, statusCode, log, date){
        this.channelName = channelName;
        this.day = day; 
        this.month = month;
        this.year = year;
        this.customer_id = customer_id;
        this.statusCode = statusCode;
        this.log = log;
        this.date = date;
    }
    
}

// Event: Extract Log

document.querySelector('#log-form').addEventListener('submit', (e) => {

    // prevent actual submit

    e.preventDefault();
    // Get form values
    const channel_name = document.querySelector('#channel_name').value;
    const day = document.querySelector('#day').value;
    const month = document.querySelector('#month').value;
    const year = document.querySelector('#year').value;
    const customerid = document.querySelector('#customerid').value;

    let output ='';
    document.getElementById('log-data').innerHTML = output;

    // validate 
    if (channel_name == '' || day == '' || month == '' || year == '' || customerid == '') {
        UI.showAlert('please fill in all fields', 'danger');
    }
    else 
    {

        // log Viewer POST URL
        fetch('http://localhost:8080/TA/Logger/api/Logger/LogViewer.php', {
            method:'POST',
            headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type':'application/json'
            },
            body:JSON.stringify({ChannelName:channel_name, Day:day, Month:month, year:year, CustomerID:customerid})
        })
        .then((res) => res.json())
        .then((data) => {
            output = '<h2 class="mb-4">Log Extract</h2>';
            data.forEach(function(logs){
            output += `
                <div class="card card-body mb-3">
                <h3>${logs.ChannelName}/${logs.CustomerID}/${logs.Date}</h3>
                <p>${logs.Log}</p>
                </div>
            `;
            });
            document.getElementById('log-data').innerHTML = output;
        });
    }


    
});
