function getOpenIssues(){
	$.ajax({ 
		//get "open" state issues from github repository.
		url:"https://api.github.com/repos/Shippable/support/issues?state=open",
		type:"GET",
		success:function(res){
			//convertsto a JSON string.
			var js = JSON.stringify(res);
			//converts JSON array.
			var json = JSON.parse(js);
			$("#ttlIssues").text(json.length);
			var todayCnt = 0;
			var weekCnt = 0;
			var gWeekCnt = 0;
			//each loop 
			$.each(json,function(i){
				var jsTime = new Date(json[i]['created_at']).getTime();
				//getTime() method returns the number of milliseconds
				var time = new Date().getTime();
				//Today issues
				if((time-86400000) < jsTime){
					todayCnt++;
				}
				//Befor one week issues
				else if(jsTime < time-86400000 && jsTime > (time-604800000)){
					weekCnt++;
				}
				else{
					gWeekCnt++;
				}
				//display count in rows
				$("#tdayIssues").text(todayCnt);
				$("#weekIssues").text(weekCnt);
				$("#gWeekIssues").text(gWeekCnt);
			});
		}
	});
}
