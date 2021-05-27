var httpAjax = "https://dev1.waanee.com/api/index.php/api";

var http = axios.create({
    baseURL: httpAjax,
    timeout: 1000,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  });

