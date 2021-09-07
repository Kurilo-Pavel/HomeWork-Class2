'use strict'

function TAJAXStorage() {
  var self = this,
    pHash = {};
  var Updatepassword;
  $.ajax("http://fe.it-academy.by/AjaxStringStorage2.php",
    {
      type: "POST",
      dataType: "json",
      cache: false,
      data: {f: "READ", n: 'drinks_names'},
      success: ReadReady,
      error: ErrorHandler
    });


  function ReadReady(data, name) {
    if (data.error != undefined) {
      alert(data.error);
    } else {
      if (data.result != "")
        pHash = JSON.parse(data.result);
      if (name in pHash) {
        console.log('Сохраненное на сервере')
        console.log(pHash[name])
      } else {
        $.ajax("http://fe.it-academy.by/AjaxStringStorage2.php",
          {
            type: "POST",
            dataType: "json",
            cache: false,
            data: {f: 'INSERT', n: 'pavel_drinks_names', v: JSON.stringify(pHash)},
            success: InsertReady,
            error: ErrorHandler
          });

        function InsertReady(data) {
          console.log('InsertReady = ' + data.result)
        }
      }
    }
  }
  self.addValue = function (key, value) {
    pHash[key] = value;
    pushValue(pHash);
  };

  self.getValue = function (key) {
    return pHash[key];
  };

  self.deleteValue = function (key) {
    return delete pHash[key];
    pushValue(pHash);
  };

  self.getKeys = function () {
    return (Object.keys(pHash));
  };


  function pushValue(Hash) {
    Updatepassword = Math.random();
    $.ajax("http://fe.it-academy.by/AjaxStringStorage2.php",
      {
        type: "POST",
        dataType: "json",
        cache: false,
        data: {f: 'LOCKGET', n: 'pavel_drinks_names', p: Updatepassword},
        success: LockgetReady,
        error: ErrorHandler
      });


    function LockgetReady(data) {
      if (data.error !== undefined)
        alert(data.error);
      else {
        pHash = [];
        if (data.result != "") {
          pHash = JSON.parse(data.result);
          if (!pHash.length)
            pHash = []
        }
        $.ajax("http://fe.it-academy.by/AjaxStringStorage2.php",
          {
            type: "POST",
            dataType: "json",
            cache: false,
            data: {f: 'UPDATE', n: 'pavel_drinks_names', p: Updatepassword, v: JSON.stringify(Hash)},
            success: UpdateReady,
            error: ErrorHandler
          });
      }

      function UpdateReady(data) {
        if (data.error != undefined)
          alert(data.error)

      }
    }
  }

  function ErrorHandler(jqXHR, StatusSTr, ErrorStr) {
    alert(StatusSTr + '' + ErrorStr);
  }



}

