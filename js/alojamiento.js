jQuery(function($){

/*
	$("#rooms-number").focusout(function(){
		calculateCost();
	}); */

	//funcion para recalcular el precion cuando el cliente hace click en el elemento cantidad de personas
	$("#rooms-number").change(function(){

		//calculateCost();
		calculateSubTotal();
		
	});


	//Funcion para selecionar el tipo de habiracion cuando el cliente hace click en el boton reservar
	$(".btn-book").on("click",function(e){
		
		var index = $(this).attr("index");
		$("#select-room").val(index);

	});

	//funcion cuando selecionan otra habitación
	$("#select-room").change(function(){
		//calculateCost();
		calculateSubTotal();

	});


  $(".banner-text-up").removeClass('invisible').addClass("fadeInUp animated").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",function(){
    $(".banner-title").removeClass('invisible').addClass("fadeInUp animated").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",function(){
      $(".banner-title p").removeClass('invisible').addClass("fadeInUp animated").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",function(){

      })
    })
  });

  $(".call-info").addClass("fadeInRight animated");

	function getPrecio(index){

		switch(index){
			case 0: return 72.54;
			case 1: return 87.75;
			case 2: return 105.30;
			case 3: return 117;
		}

	}

	//calcular el precio despues que el modal a sido mostrado
	$('#book').on('show.bs.modal', function (e) {
		totalDays();
  		//calculateCost();
  		calculateSubTotal();
	});

	$('#book').on('hidden.bs.modal', function (e) {
		//alert("cerrando");
	});



	function calculateCost(){
		var qp = parseInt($("#rooms-number").val());
		var tdays = parseInt($("#number-days").attr("value"));
		var selectedIndex = parseInt($("#select-room").val());
		//alert(selectedIndex);

		if (qp < 0){
			$("#total").attr("value","U$ 0");
		}else{
			var total = tdays * qp * getPrecio(selectedIndex);
			var stotal = total.toFixed(2);


		$("#total").attr("value","U$ "+stotal);
		}

	}

	//calcular el sub total de habitaciones por su precio
	function calculateSubTotal(){
		var nRooms = parseInt($("#rooms-number").val());
		var tdays = totalDays();

      	//alert(nRooms);

      	var selectedIndex = parseInt($("#select-room").val());
      	var roomType = getRoom(selectedIndex);

      	var subTotal = parseFloat(nRooms * getPrecio(selectedIndex) * tdays);

      	var ssubTotal = subTotal.toFixed(2);

      	$("#sub-total").attr("value","U$ "+ssubTotal);
	}

	function setupCalendars() {
        // Embedded Calendar
        var c1 = Calendar.setup(
          {
            dateField: 'embeddedDateField',
            parentElement: 'embeddedCalendar',
            selectHandler: function(e){

            	var selectedDate = e.date.print(e.dateFormat);

            	var dateOut = $("#embeddedDateField2").val();

            	$("#embeddedDateField").val(selectedDate);

            	if (getDaysInDate(selectedDate,dateOut) <= 0){
            		c2.setDate(new Date(e.date.getFullYear(),e.date.getMonth(),e.date.getDate() + 1));
            		$("#embeddedDateField2").val(c2.date.print(c2.dateFormat));

            	}

            	totalDays();
            	//calculateCost();
            	calculateSubTotal();

            	/*if ($("#t-rooms tbody tr").length > 0){

            	}*/

            }
          }
        );

        // Embedded Calendar
        var c2 = Calendar.setup(
          {
            dateField: 'embeddedDateField2',
            parentElement: 'embeddedCalendar2',
            selectHandler: function(e){

            	//e.update(new Date());
            	var selectedDate = e.date.print(e.dateFormat);

            	

            	var dateIn = $("#embeddedDateField").val();
            	$("#embeddedDateField2").val(selectedDate);

            	if (getDaysInDate(dateIn,selectedDate) <= 0){
            		c1.setDate(new Date(e.date.getFullYear(),e.date.getMonth(),e.date.getDate() - 1));
            		$("#embeddedDateField").val(c1.date.print(c1.dateFormat));
            	}
            	
            	totalDays();
            	//calculateCost();
            	calculateSubTotal();

            }
          }
        );
    }

	function totalDays(){

		var dateIn = $("#embeddedDateField").val();
		var dateOut = $("#embeddedDateField2").val();


		var ndateIn = moment(dateIn,"DD-MM-YYYY");
		var ndateOut = moment(dateOut,"DD-MM-YYYY");

		var daysQuantity = ndateOut.diff(ndateIn,"days");



		$("#number-days").val(daysQuantity);

		//calculateCost();
		return daysQuantity;
	}

      //obterner las dias entre dos fechas
      function getDaysInDate(date1, date2){

      	var f1 = moment(date1,"DD-MM-YYYY");
      	var f2 = moment(date2,"DD-MM-YYYY");

      	return ndays = f2.diff(f1,"days");
      }

      Event.observe(window, 'load', function() { setupCalendars() });

      //variable que garda el costo total
      var costoTotal = 0;

      //funcion del boton para agregar una habitacion a la tabla
      $("#btn-add-room").on("click",function(){

      	var nRooms = parseInt($("#rooms-number").val());
      	var tdays = totalDays();

      	//alert(nRooms);

      	var selectedIndex = parseInt($("#select-room").val());
      	var roomType = getRoom(selectedIndex);

      	var subTotal = parseFloat(nRooms * getPrecio(selectedIndex) * tdays);

      	costoTotal = (costoTotal + subTotal);

      	var ssubTotal = subTotal.toFixed(2);
      	var scostoTotal = costoTotal.toFixed(2);

      	$("#t-rooms tbody").append(
      		"<tr><td>"+nRooms+"</td><td>"+tdays+"</td><td>"+roomType+"</td><td><span>$</span><span class='subt'>"+ssubTotal+
      		"</span></td><td><button type='button' class='btn btn-secondary btn-sm btn-delete' data-toggle='tooltip' data-placement='top' title='Eliminar'><i class='fa fa-minus-circle' aria-hidden='true'></i></button></td></tr>"
      	);

      	var tbIndex = $("#t-rooms tbody tr").length;
      	$("#input-hidden").append('<input type="hidden" name="troom'+tbIndex+'" value="'+nRooms+'">');
      	$("#input-hidden").append('<input type="hidden" name="tna'+tbIndex+'" value="'+tdays+'">');//noches alojadas
      	$("#input-hidden").append('<input type="hidden" name="tth'+tbIndex+'" value="'+roomType+'">');//tipo de habitacion
      	$("#input-hidden").append('<input type="hidden" name="tst'+tbIndex+'" value="'+ssubTotal+'">');//sub total
      	$("#t-index").val(tbIndex);
      	$("#t-total").val(scostoTotal);

      	$("#total-cost").html("U$ "+scostoTotal);

      	$("#total").attr("value","U$ "+scostoTotal);


      });

      $("#t-rooms").on("click","button.btn-delete",function(){
      		
      		var nRooms = 0;
      		var roomType = "";

      		var subTotal = 0;

      		$(this).closest("tr").children("td").each(function(index){
      			if (index == 3){
      				subTotal = parseFloat($(this).children(".subt").text());
      			}
      		});

      		costoTotal -= subTotal;

      		var scostoTotal = costoTotal.toFixed(2);

      		$(this).closest("tr").remove();

      		$("#total-cost").html("U$ "+scostoTotal);

      		$("#total").attr("value","U$ "+scostoTotal);
      });


      
	$(function () {
	  $('[data-toggle="tooltip"]').tooltip()
	})

      //retorna el tipo de habitación seleccionada
	function getRoom(index){

		switch(index){
			case 0: return "Habitación Sencilla";
			case 1: return "Habitación Doble";
			case 2: return "Habitación Tríple";
			case 3: return "Habitación Cuádruple";
			default : return "";
		}
	}

	function getIndexRoom(name){
		switch(name){
			case "Habitación Sencilla": return 0;
			case "Habitación Doble": return 1;
			case "Habitación Tríple": return 2;
			case "Habitación Cuádruple": return 3;
			default : return -1;
		}
	}
	
});