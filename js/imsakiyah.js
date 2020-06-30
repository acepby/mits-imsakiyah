(function($){
$(document).ready(function(){
	
	var currentDate = new Date();
	var timeFormat = 1;
	switchFormat(1);
	pilihkota();
	function pilihkota(){
		$('pilih-kota').add('<select id="kota" ></select>');
		}
	// display monthly timetable
	function displayMonth(offset) {
		var lat = '-7.7445845';//$('latitude').value;
		var lng = '110.36663960';//$('longitude').value;
		var timeZone = '+7'; //$('timezone').value;
		var dst = 'auto'; //$('dst').value;
		var method = 'Makkah'; //$('method').value;
		var bulan =['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
		prayTimes.setMethod(method);
		currentDate.setMonth(currentDate.getMonth()+ 1* offset);
		var month = currentDate.getMonth();
		var year = currentDate.getFullYear();
		var title = bulan[month]+ ' '+ year;//monthFullName(month)+ ' '+ year;
		$('table-title').innerHTML = title;
		makeTable(year, month, lat, lng, timeZone, dst);
	}

	// make monthly timetable
	function makeTable(year, month, lat, lng, timeZone, dst) {
		var items = {day: 'Tgl', fajr: 'Subuh', sunrise: 'Terbit',
					dhuhr: 'Zuhur', asr: 'Ashar', // sunset: 'Sunset',
					maghrib: 'Magrib', isha: 'Isya'};

		var tbody = document.createElement('tbody');
		tbody.appendChild(makeTableRow(items, items, 'head-row'));

		var date = new Date(year, month, 1);
		var endDate = new Date(year, month+ 1, 1);
		var format = timeFormat ? '12hNS' : '24h';

		while (date < endDate) {
			var times = prayTimes.getTimes(date, [lat, lng], timeZone, dst, format);
			times.day = date.getDate();
			var today = new Date();
			var isToday = (date.getMonth() == today.getMonth()) && (date.getDate() == today.getDate());
			var klass = isToday ? 'today-row' : '';
			tbody.appendChild(makeTableRow(times, items, klass));
			date.setDate(date.getDate()+ 1);  // next day
		}
		removeAllChild($('timetable'));
		$('timetable').appendChild(tbody);
	}

	// make a table row
	function makeTableRow(data, items, klass) {
		var row = document.createElement('tr');
		for (var i in items) {
			var cell = document.createElement('td');
			cell.innerHTML = data[i];
			cell.style.width = i=='day' ? '2.5em' : '3.7em';
			row.appendChild(cell);
		}
		row.className = klass;
		return row;
	}

	// remove all children of a node
	function removeAllChild(node) {
		if (node == undefined || node == null)
			return;

		while (node.firstChild)
			node.removeChild(node.firstChild);
	}

	// switch time format
	function switchFormat(offset) {
		var formats = ['24-hour', '12-hour'];
		timeFormat = (timeFormat+ offset)% 2;
		$('time-format').innerHTML = formats[timeFormat];
		update();
	}

	// update table
	function update() {
		displayMonth(0);
	}


	// return month full name
	function monthFullName(month) {
		var monthName = new Array('January', 'February', 'March', 'April', 'May', 'June',
						'July', 'August', 'September', 'October', 'November', 'December');
		return monthName[month];
	}

	function $(id) {
		return document.getElementById(id);
	}

});
})(jQuery);