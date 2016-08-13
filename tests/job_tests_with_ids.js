var json_data = JSON.stringify({
  company: {
    id: 1
  },
  job_role: {
    id: 2
  },
  job_type: {
    id: 3
  },
  title: "Some Kind of Awesome Job",
  location: "Los Angeles, CA",
  pay_rate_min: "11.25",
  pay_rate_max: "15.50",
  min_gpa: "3.00",
  description: "This is an awesome job, let me tell you!",
  external_url: "http://www.espn.com",
  takedown_at: "2016-09-15 17:00:00"
});

var xhr = new XMLHttpRequest();
xhr.onerror = function() { console.log(this.arguments); };
xhr.open('POST', 'http://localhost:3020/prod/1/job', true);
xhr.setRequestHeader('Accept', 'application/json');
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.send(json_data);