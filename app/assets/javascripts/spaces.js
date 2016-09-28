$(function(){

  $.ajax({
    url: "/spaces.json",
    method: 'GET',
    data: {},
    dataType: 'json'
  }).done(function(data){
    var _allData = data
    // globalish variables for all data and empty array for available data
    var _availableData = []
    var city;
    var desks = 1;
    // console.log(_allData)

    $('#city').change(function(event){
      _availableData = []
      city = this.value;
      // console.log(city) // return value is 'Toronto' , 'Hamilton' ..

      //clears the search results
      $('#search-results').html("")

      //loops through all data
      for(var i = 0, l = _allData.length; i < l; i++){

        console.log(desks)
        if (city != 'All'){
          // hides the space info
          $('.space-info').hide();
          // if the chosen city is equal to the city in the list and desks is not changed
          if(_allData[i]['city'] === city && desks === 1 ) {
            $("<div>").html(_allData[i]['name']+ " ").attr('id', _allData[i]['id']).appendTo("#search-results")
            $('<a>').attr('class', 'show-btn').attr('href', '/spaces/' + _allData[i]['id']).html('spaces show page').appendTo("#" + _allData[i]['id'])
          }
          else if( _allData[i]['city'] === city && desks != 1 ){
            if(_allData[i]['available_desks'] >= desks){
              $("<div>").html(_allData[i]['name']+ " ").attr('id', _allData[i]['id']).appendTo("#search-results")
              $('<a>').attr('class', 'show-btn').attr('href', '/spaces/' + _allData[i]['id']).html('spaces show page').appendTo("#" + _allData[i]['id'])
            }
          }
        }
        else{
          console.log('this is the else')
          if(_allData[i]['available_desks'] >= desks){
            console.log('inside the if')
            $("<div>").html(_allData[i]['name']+ " ").attr('id', _allData[i]['id']).appendTo("#search-results")
            $('<a>').attr('class', 'show-btn').attr('href', '/spaces/' + _allData[i]['id']).html('spaces show page').appendTo("#" + _allData[i]['id'])
          }
        }
      }
    });

    $('#number-of-desks').change(function(event){
      desks = this.value;
      // console.log(desks)
      $('#search-results').html("")

      for(var i = 0, l = _allData.length; i < l; i++){
        if (city != 'All'){
          $('.space-info').hide();
          if(_allData[i]['available_desks'] >= desks && _allData[i]['city'] === city ) {
            $("<div>").html(_allData[i]['name']+ " ").attr('id', _allData[i]['id']).appendTo("#search-results")
            $('<a>').attr('class', 'show-btn').attr('href', '/spaces/' + _allData[i]['id']).html('spaces show page').appendTo("#" + _allData[i]['id'])
          }
        }
        else{
          if(_allData[i]['available_desks'] >= desks){
            $("<div>").html(_allData[i]['name']+ " ").attr('id', _allData[i]['id']).appendTo("#search-results")
            $('<a>').attr('class', 'show-btn').attr('href', '/spaces/' + _allData[i]['id']).html('spaces show page').appendTo("#" + _allData[i]['id'])
          }
        }
      }
    });


  }).fail(function(data){
    console.log('this failed')
  });



});
