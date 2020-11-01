$(document).ready(function() {
  // Get ID of current device from URL, which are the numbers after the last '/'
  var loc = location.href.substr(location.href.lastIndexOf('/') + 1);

  // Start POE status section
  $.ajax({
    url: '/devicepoestatus/' + loc,
    success: function(data) {
      // Get current table Length
      var tableLength = table.page.len();
      // Briefly redraw table with all pages, as the below function can only detect selected rows on visible pages
      table.page.len(-1).draw();
      var result = JSON.parse(data); // Parse jsonify'd data from python
      for (var key in result) {
        var value = result[key];
        // if (value == "on") { // If PoE is operationally on, apply corresponding class
        //   var iconClass1 = 'glyphicon-ok';
        //   var iconClass2 = 'icon-poe-on';
        // }
        // else { // If PoE is operationally off, apply corresponding class
        //   var iconClass1 = 'glyphicon-remove';
        //   var iconClass2 = 'icon-poe-off';
        // }
        $("*[id='"+key+"-poe-loading']").addClass('hidden'); // Show status icon
        $("*[id='"+key+"-poe-status']").removeClass('hidden'); // Show status icon
        $("*[id='"+key+"-poe-status']").text(value); // Show status icon
        // $("*[id='"+key+"-poe-icon']").addClass(iconClass1); // Apply class icon to <i> tag
        // $("*[id='"+key+"-poe-icon']").addClass(iconClass2); // Apply class icon to <i> tag
      }
      // Redraw table with original item count table length
      table.page.len(tableLength).draw();
      // Hide loading spinner for PoE status column
      $("#poe-loading").addClass('hidden'); // Hide loading animation icon for PoE column
    }
  });
  // End POE status section

  // Start Uptime section
  $.ajax({
    url: '/deviceuptime/' + loc,
    success: function(data) {
      var result = JSON.stringify(data); // Convert jsonify'd data from python
      result = result.replace(/\"/g, "") // Remove double quotes from string
      var divuptime = document.getElementById('deviceUptime'); // Get DIV element from HTML page
      divuptime.innerHTML = result; // Pass string to DIV on HTML page
      $("#loadUptimeIcon").addClass('hidden');
    }
  });
  // End Uptime section

  var events = $('#events');
  var table = $('#tblViewSpecificDevice').DataTable({
    "pageLength": 10,
    "order": [],
    "lengthMenu": [
      [10, 25, 50, 100, -1],
      [10, 25, 50, 100, "All"]
    ],
    columnDefs: [
    { title: '',
      orderable: false,
      className: 'select-checkbox',
      targets: 0
    },
    { title: 'Interface',
      targets: 1
    },
    { title: 'Address',
      targets: 2
    },
    { title: 'Description',
      targets: 3
    },
    { title: 'Status',
      targets: 4
    },
    { title: 'Protocol',
      targets: 5
    },
    { title: 'PoE',
      targets: 6,
      orderable: false
    },
    { title: 'Options',
      targets: 7,
      orderable: false
    }],
    select: {
      style: 'multi',
      selector: 'td:first-child'
    }
  });
  tableSettings = table.settings(); //store its settings in oSettings

  $('#tblViewSpecificDevice tbody').on('click', 'td:first-child', function() {
    $(this).toggleClass('selected');
  });

  $('#btnEnableInterfaces').click(function(e) {
    // Get current table Length
    var tableLength = table.page.len();
    // Briefly redraw table with all pages, as the below function can only detect selected rows on visible pages
    table.page.len(-1).draw();

    var selectedInterfaces = [];
    var rows = $('tr.selected');
    var rowData = table.rows(rows).data();

    $.each($(rowData), function(key, value) {
      var tableData = table.row({
        selected: true
      }).data()[1];
      var div = document.createElement("div");
      div.innerHTML = this[1];
      selectedInterfaces.push(div.textContent || div.innerText || "");
    });
    table.page.len(tableLength).draw();

    // Gets device ID from current URL, aka everything after the last '/'
    var url = '/confirm/confirmmultipleintenable/' + loc + '/' // + selectedInterfaces

    for (var i in selectedInterfaces) {
      url = url + '&' + selectedInterfaces[i].replace(/\//g, '_');
    }

    // Loads next page on button click
    // Pass URL with an '&' in front of each interface, in this format:
    // /confirm/confirmmultipleintenable/[device.id]/&int1&int2&int3...etc
    window.location.href = url;
  });


  $('#btnDisableInterfaces').click(function(e) {
    // Get current table Length
    var tableLength = table.page.len();
    // Briefly redraw table with all pages, as the below function can only detect selected rows on visible pages
    table.page.len(-1).draw();

    var selectedInterfaces = [];
    var rows = $('tr.selected');
    var rowData = table.rows(rows).data();
    $.each($(rowData), function(key, value) {
      var tableData = table.row({
        selected: true
      }).data()[1];
      var div = document.createElement("div");
      div.innerHTML = this[1];
      selectedInterfaces.push(div.textContent || div.innerText || "");
    });

    // Gets device ID from current URL, aka everything after the last '/'
    var url = '/confirm/confirmmultipleintdisable/' + loc + '/' // + selectedInterfaces

    for (var i in selectedInterfaces) {
      url = url + '&' + selectedInterfaces[i].replace(/\//g, '_');
    }
    // Loads next page on button click
    // Pass URL with an '&' in front of each interface, in this format:
    // /confirm/confirmmultipleintenable/[device.id]/&int1&int2&int3...etc
    window.location.href = url;
  });

  $('#btnEditInterfaces').click(function(e) {
    // Get current table Length
    var tableLength = table.page.len();
    // Briefly redraw table with all pages, as the below function can only detect selected rows on visible pages
    table.page.len(-1).draw();

    var selectedInterfaces = [];
    var rows = $('tr.selected');
    var rowData = table.rows(rows).data();
    $.each($(rowData), function(key, value) {
      var tableData = table.row({
        selected: true
      }).data()[1];
      var div = document.createElement("div");
      div.innerHTML = this[1];
      selectedInterfaces.push(div.textContent || div.innerText || "");
    });

    // Gets device ID from current URL, aka everything after the last '/'
    var url = '/confirm/confirmmultipleintedit/' + loc + '/' // + selectedInterfaces

    for (var i in selectedInterfaces) {
      url = url + '&' + selectedInterfaces[i].replace(/\//g, '_');
    }
    // Loads next page on button click
    // Pass URL with an '&' in front of each interface, in this format:
    // /confirm/confirmmultipleintenable/[device.id]/&int1&int2&int3...etc
    window.location.href = url;
  });

});

$('#modalConfigInterface').on('shown.bs.modal', function(event) {
  var button = $(event.relatedTarget) // Button that triggered the modal
  // Interface comes in with slashes
  var interface = button.data('interface') // Extract info from data-* attributes
  var deviceid = button.data('deviceid')

  var modal = $(this)

  // Replace all '/' with '_'
  interfaceDash = interface.replace(/\//g, '_')
  // Replace all '.' with '='
  interfaceDash = interfaceDash.replace(/\./g, '=')

  // Replace all '_' with '/'
  interfaceTitle = interface.replace(/_/g, '/')
  // Replace all '=' with '.'
  interfaceTitle = interfaceTitle.replace(/=/g, '.')

  modal.find('.modal-title').text('Interface ' + interfaceTitle)
  modal.find('.modal-result').load('/modalinterface/' + deviceid + '/' + interfaceDash, function() {
    $("#loading").hide();
    $("#loadingWheel").hide();
    $("#loadingContentHide").show();
  });
})

$('#modalConfigInterface').on('hidden.bs.modal', function() {
  var modal = $(this)
  modal.find('.modal-title').text('')
  modal.find('.modal-result').text('')
})

$('#modalEditInterface').on('show.bs.modal', function(event) {
  var button = $(event.relatedTarget) // Button that triggered the modal
  // Interface comes in with dashes
  var interface = button.data('interface') // Extract info from data-* attributes
  var deviceid = button.data('deviceid')

  var modal = $(this)

  // interfaceSlash = interface.replace(/_/g, '/')

  modal.find('.modal-title').text('Edit Interface ' + interface)
  modal.find('.modal-interface').text(interface)
  modal.find('.modal-result').load('/modaleditinterface/' + deviceid + '?int=' + interface)
})

$('#modalEditInterface').on('hidden.bs.modal', function() {
  var modal = $(this)
  modal.find('.modal-title').text('')
  modal.find('.modal-interface').text('')
  modal.find('.modal-result').text('')
})

$('#modalCmdShowRunConfig').on('show.bs.modal', function(event) {
  var button = $(event.relatedTarget) // Button that triggered the modal

  var hostname = button.data('hostname') // Extract info from data-* attributes
  var deviceid = button.data('deviceid') // Extract info from data-* attributes

  var modal = $(this)

  modal.find('.modal-title').text('Running config for ' + hostname)
  modal.find('.modal-result').load('/modalcmdshowrunconfig/' + deviceid)
})

$('#modalCmdShowRunConfig').on('hidden.bs.modal', function() {
  var modal = $(this)
  modal.find('.modal-title').text('')
  modal.find('.modal-result').text('')
})

$('#modalCmdShowStartConfig').on('show.bs.modal', function(event) {
  var button = $(event.relatedTarget) // Button that triggered the modal

  var hostname = button.data('hostname') // Extract info from data-* attributes
  var deviceid = button.data('deviceid') // Extract info from data-* attributes

  var modal = $(this)

  modal.find('.modal-title').text('Startup config for ' + hostname)
  modal.find('.modal-result').load('/modalcmdshowstartconfig/' + deviceid)
})

$('#modalCmdShowStartConfig').on('hidden.bs.modal', function() {
  var modal = $(this)
  modal.find('.modal-title').text('')
  modal.find('.modal-result').text('')
})

$('#modalCmdShowCDPNeigh').on('show.bs.modal', function(event) {
  var button = $(event.relatedTarget) // Button that triggered the modal

  var hostname = button.data('hostname') // Extract info from data-* attributes
  var deviceid = button.data('deviceid') // Extract info from data-* attributes

  var modal = $(this)

  modal.find('.modal-title').text('CDP Neighbors for ' + hostname)
  modal.find('.modal-result').load('/modalcmdshowcdpneigh/' + deviceid)
})

$('#modalCmdShowCDPNeigh').on('hidden.bs.modal', function() {
  var modal = $(this)
  modal.find('.modal-title').text('')
  modal.find('.modal-result').text('')
})

$('#modalCmdShowVersion').on('show.bs.modal', function(event) {
  var button = $(event.relatedTarget) // Button that triggered the modal

  var hostname = button.data('hostname') // Extract info from data-* attributes
  var deviceid = button.data('deviceid') // Extract info from data-* attributes

  var modal = $(this)

  modal.find('.modal-title').text('Version info for ' + hostname)
  modal.find('.modal-result').load('/modalcmdshowversion/' + deviceid)
})

$('#modalCmdShowVersion').on('hidden.bs.modal', function() {
  var modal = $(this)
  modal.find('.modal-title').text('')
  modal.find('.modal-result').text('')
})

$('#modalCmdShowInventory').on('show.bs.modal', function(event) {
  var button = $(event.relatedTarget) // Button that triggered the modal

  var hostname = button.data('hostname') // Extract info from data-* attributes
  var deviceid = button.data('deviceid') // Extract info from data-* attributes

  var modal = $(this)

  modal.find('.modal-title').text('Inventory info for ' + hostname)
  modal.find('.modal-result').load('/modalcmdshowinventory/' + deviceid)
})

$('#modalCmdShowInventory').on('hidden.bs.modal', function() {
  var modal = $(this)
  modal.find('.modal-title').text('')
  modal.find('.modal-result').text('')
})

$('#modalCmdCustom').on('show.bs.modal', function(event) {
  var button = $(event.relatedTarget) // Button that triggered the modal

  var hostname = button.data('hostname') // Extract info from data-* attributes
  var deviceid = button.data('deviceid') // Extract info from data-* attributes

  var modal = $(this)

  modal.find('.modal-title').text('Run custom commands on ' + hostname)
  modal.find('.modal-result').load('/modalcmdcustom/' + deviceid)
})

$('#modalCmdCustom').on('hidden.bs.modal', function() {
  var modal = $(this)
  modal.find('.modal-title').text('')
  modal.find('.modal-result').text('')
})
$('#modalCfgCmdCustom').on('show.bs.modal', function(event) {
  var button = $(event.relatedTarget) // Button that triggered the modal

  var hostname = button.data('hostname') // Extract info from data-* attributes
  var deviceid = button.data('deviceid') // Extract info from data-* attributes

  var modal = $(this)

  modal.find('.modal-title').text('Run custom config commands on ' + hostname)
  modal.find('.modal-result').load('/modalcfgcmdcustom/' + deviceid)
})

$('#modalCfgCmdCustom').on('hidden.bs.modal', function() {
  var modal = $(this)
  modal.find('.modal-title').text('')
  modal.find('.modal-result').text('')
})

$('#modalSaveConfig').on('shown.bs.modal', function(event) {
  var button = $(event.relatedTarget) // Button that triggered the modal

  var hostname = button.data('hostname') // Extract info from data-* attributes
  var deviceid = button.data('deviceid') // Extract info from data-* attributes

  var modal = $(this)

  modal.find('.modal-title').text('Saving running configuration on ' + hostname)
  modal.find('.modal-result').load('/modalcmdsaveconfig/' + deviceid, function() {
    $("#loading").hide();
    $("#loadingWheel").hide();
    $("#loadingContentHide").show();
  });
})

$('#modalSaveConfig').on('hidden.bs.modal', function() {
  var modal = $(this)
  modal.find('.modal-title').text('')
  modal.find('.modal-result').text('')
})