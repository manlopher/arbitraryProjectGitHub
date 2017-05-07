$(function(){
  $('#submitUserNameSearch').on('submit', function(e){
    e.preventDefault();
    
    var username = $('#userName').val();
    //var requri   = 'https://api.github.com/search/'+username;
   
    var requri   = 'https://api.github.com/search/repositories?q=user:'+username + '&sort=stars&order=desc';
    
    requestJSON(requri, function(json) {
      if(json.message == "Not Found" || username == '') {
        alert("<h2>No User Info Found</h2>");
      }
      
      else {
    	  
    	  var dataSet = json.items;
    	  
    	  var groupedData = _.groupBy(dataSet, function(d){return d.language});
    	  var groupedData2 = _.sortBy(groupedData, function(d){return d.language});
    	  
    	  var kesGroupedData = Object.keys(groupedData);
    	  var dataGHihg = 0; 
    	  var dataGHStr = "";
	    	 for (var ij in groupedData){
	    		
	    		 if (dataGHihg < 1){
	    			 dataGHihg = groupedData[ij].length;
	    			 dataGHStr = ij.toString();
	    		 }else{
	    			 if (dataGHihg < groupedData[ij].length){
		    			 dataGHihg = groupedData[ij].length;
		    			 dataGHStr = ij.toString();
		    		 }
	    		 }   	
	    	 }
	    	
	    	
    	  
	    			$.ajax({
	    		   		type: "GET",
	    		   		url: requri,
	    		        success: function (msg) {
	    					$('#exersice').dataTable({
	    						paging: false,
	    		    			searching: false,
	    		    			 destroy: true,
	    		   				data: msg.items,
	    		   				columns: [
	    		      				{ data: "full_name" },
	    			   				{ data: "score" },
	    		    				{ data: "language" },
	    		      				{ data: "url" }
	    		   				]
	    					});                 
	    		       	},
	    		       	error: function (data) {
	    		       		alert("Server error");
	    		       	}
	    		    });
  
	    	 
	    	  document.getElementById("exersice").style = "display: inline";
	    	  
	    	  document.getElementById("moreUsed").innerHTML = "More used is " + dataGHStr + " in " + dataGHihg + " times";

      } // end else statement
    }); // end requestJSON Ajax call
  }); // end click event handler
  
  function requestJSON(url, callback) {
    $.ajax({
      url: url,
      complete: function(xhr) {
        callback.call(null, xhr.responseJSON);
      }
    });
  }
});

