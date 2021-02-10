let data = [];
let ajax = new XMLHttpRequest();
let hotPlace = document.querySelector('.hotPlace');
let selectArea = document.querySelector('.selectArea');
let placeTitle = document.querySelector('.placeTitle');
let list = document.querySelector('.list');

ajax.open('get','https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json',true);
ajax.send(null);
ajax.onload = function(){
    data = JSON.parse(ajax.responseText);
    data = data.result.records;
    updatePlaceSelect();
    placeList();
}

function updatePlaceSelect(e){
    let str  = '';
    let set = new Set();
    //https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Set
    let result = data.filter(item => !set.has(item.Zone) ? set.add(item.Zone):false);
    let len = result.length;

    for(let i=0; i<len; i++){
        str+=`<option value="${result[i].Zone}">${result[i].Zone}</option>`;
        selectArea.innerHTML = `<option value="請選擇行政區">--請選擇行政區--</option>${str}`;
    }
}

function placeList(){
    let str = '';
    let len = data.length;

    for(let i=0; i<len; i++){
        str+=`
        <li>
            <div class="img" style="background: url(${data[i].Picture1}) center;">
                <h3>${data[i].Picdescribe1}</h3>
                <p>${data[i].Zone}</p>
            </div>
            <div class="text">
                <div class="clock middle">
                    <p><img src="img/icons_clock.png" alt=""/>${data[i].Opentime}</p>
                </div>
                <div class="local middle">
                    <p><img src="img/icons_pin.png"  alt=""/>${data[i].Add}</p>
                </div>
                <div class="tel middle">
                    <p><img src="img/icons_phone.png" alt="">${data[i].Tel}</p>
                    <p><img src="img/icons_tag.png">${data[i].Ticketinfo}</p>
                </div>
            </div>
        </li>
        `;
    }
    list.innerHTML = str;
}

function placeUpdate(e){
    let str = '';
    let len = data.length;
    
    for(var i=0; i<len; i++){
        if(e.target.value == data[i].Zone){
            str+=`
            <li>
                <div class="img" style="background: url(${data[i].Picture1})">
                    <h3>${data[i].Picdescribe1}</h3>
                    <p>${data[i].Zone}</p>
                </div>
                <div class="text">
                    <div class="middle">
                        <p><img src="img/icons_clock.png" alt=""/>${data[i].Opentime}</p>
                    </div>
                    <div class="middle">
                        <p><img src="img/icons_pin.png" alt=""/>${data[i].Add}</p>
                    </div>
                        <div class="tel middle">
                            <p><img src="img/icons_phone.png" alt="">${data[i].Tel}</p>
                            <p><img src="img/icons_tag.png">${data[i].Ticketinfo}</p>
                        </div>
                    </div>
            </li>
            `;
        }
    }
    list.innerHTML = str;
    placeTitle.innerHTML = e.target.value;
}

selectArea.addEventListener('change',placeUpdate);
hotPlace.addEventListener('click',placeUpdate);

$('.gotop').click(function (e) { 
    $('html, body').animate({ 
      scrollTop: 0
    }, 800);
  });
  
  $(window).scroll(function() {
    if ( $(this).scrollTop() > 200){
        $('.gotop').fadeIn();
    } else {
        $('.gotop').fadeOut();
    }
  });