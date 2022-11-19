//Kevin Orsula, kevin_orsula@student.uml.edu
$(document).ready(function () {

    jQuery.validator.addMethod("onlyInteger", function (value, element) { //Adds a validation method to check for floats
      if (value % 1 != 0) return false;
      else return true;
    }, "Please only enter Integers!");
  
    $("#forms").validate({ //Validation checker for input values, don't need to check for which values are larger between the two matching values becuase
      rules: {                 //generatetable handles the values
        colMin: {
          required: true,
          max: 50,
          min: -50,
          onlyInteger: true,
        },
        colMax: {
          required: true,
          max: 50,
          min: -50,
          onlyInteger: true,
        },
        rowMin: {
          required: true,
          max: 50,
          min: -50,
          onlyInteger: true,
        },
        rowMax: {
          required: true,
          max: 50,
          min: -50,
          onlyInteger: true,
        }
      },
    })
  
    //These are the functions that update the input number and the table whenever the slider is moved
    $(function() {
      $("#slider-colMin").slider({
        range: false,
        min: -50,
        max: 50,
        value: 0,
        change: function (event, ui) { //when slider changes
          $("#colMin").val(ui.value); //update the forms value
          generateTable(); //makes sure to update the table whenever the slider changes
        },
      }),
      $("#slider-colMax").slider({
        range: false,
        min: -50,
        max: 50,
        change: function (event, ui) {
          $("#colMax").val(ui.value);
          generateTable();
        },
      }),
      $("#slider-rowMin").slider({
        range: false,
        min: -50,
        max: 50,
        change: function (event, ui) {
          $("#rowMin").val(ui.value);
          generateTable();
        },
      }),
      $("#slider-rowMax").slider({
        range: false,
        min: -50,
        max: 50,
        change: function (event, ui) {
          $("#rowMax").val(ui.value);
          generateTable();
        },
      });
    })
  
    $("#colMin").change(function () { //These are the functions that update the slider position and the table whenever an input is entered
      $("#slider-colMin").slider('value', $(this).val());
      generateTable(); //Makes sure to update the table whenever the inputs change
    });
    $("#colMax").change(function () { //when forms changes
      $("#slider-colMax").slider('value', $(this).val()); //update slider value
      generateTable();
    });
    $("#rowMin").change(function () {
      $("#slider-rowMin").slider('value', $(this).val());
      generateTable();
    });
    $("#rowMax").change(function () {
      $("#slider-rowMax").slider('value', $(this).val());
      generateTable();
    });
  
    function generateTable() { //Function used to generate the table after checking to make sure the inputs are valid
      if ($('#forms').valid()) {
        var colMin = parseInt($('#colMin').val());
        var colMax = parseInt($('#colMax').val());
        var rowMin = parseInt($('#rowMin').val());
        var rowMax = parseInt($('#rowMax').val());
        var colLow, colHigh, rowLow, rowHigh;
  
        if (colMin <= colMax) { //Used to switch the col values and place the lower on the left
          colLow = colMin;
          colHigh = colMax;
        } else {
          colLow = colMax;
          colHigh = colMin;
        }
  
        if (rowMin <= rowMax) { //Used to switch the row values and place the lower on the right
          rowLow = rowMin;
          rowHigh = rowMax;
        } else {
          rowLow = rowMax;
          rowHigh = rowMin;
        }
  
        var newHTML = '<tr><td>' + ' ' + '</td>'; //Creates the new table 
        for (var i = colLow; i <= colHigh; i++) newHTML += ('<td>' + i + '</td>');
        newHTML += '</tr>';
  
        for (var j = rowLow; j <= rowHigh; j++) {
          newHTML += '<tr><td>' + j + '</td>';
          for (var k = colLow; k <= colHigh; k++) newHTML += '<td>' + (j * k) + '</td>';
          newHTML += '</tr>'
        }
        $('#multTable').html(newHTML);
      }
    }
  
    //I could not get there feature working by myself, I found the code and example at https://jqueryui.com/tabs/#manipulation
    var tCount = 1;
    var tCountBkg = 1;
    var tabTemplate = "<li><a href='#{href}'>#{label}</a> <span class='ui-icon ui-icon-close ui-closable-tab'></span></li>";
    var tabs = $("#tabs").tabs();
  
    $("#addButton").button().on("click", function () { //Button that adds the current table to the tabs
      if ($('#multTable').html() != '') {
  
        var colMin = parseInt($('#colMin').val()); //Added these in to get the tabe to show what the table contents were
        var colMax = parseInt($('#colMax').val());
        var rowMin = parseInt($('#rowMin').val());
        var rowMax = parseInt($('#rowMax').val());
        var label = "C:(" + colMin + " , " + colMax + ") R:(" + rowMin + " , " + rowMax + ")";
  
        var id = "tabs-" + tCount;
        var li = $(tabTemplate.replace(/#\{href\}/g, "#" + id).replace(/#\{label\}/g, label));
        var tabContent = $('#multTable').html();
  
        tabs.find(".ui-tabs-nav").append(li);
        tabs.append("<div class = 'tableContainer' id='" + id + "'><table table-stripped>" + tabContent + "</table></div>"); //appends the current table onto the tabs list 
        tabs.tabs("refresh");
        tabs.tabs({ active: tCountBkg });
        tabs.tabs("option", "active", tCountBkg - 1);
        tCount++;
        tCountBkg++
      }
    });
    $("#allDelete").button().on("click", function () { //Button that deletes all of the tabs
      $('div#tabs ul li').remove();
      $('div#tabs div').remove();
      $("div#tabs").tabs("refresh");
      tCount = 1;
      tCountBkg = 1;
    });
    tabs.on("click", "span.ui-icon-close", function () {
      var panelId = $(this).closest("li").remove().attr("aria-controls");
      $("#" + panelId).remove();
      tabs.tabs("refresh");
      tCountBkg--;
    });
  
  })
  
  
  
  
  