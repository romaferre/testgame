describe("gamedonia", function() {
	
	 var env=null;
	 beforeEach(function() {
		  env = gamedonia.createTestEnvironment();
	 });
	 
	 afterEach(function(){
		 env.destroy();
		 env=null;
	 })

  it("must be able to create a test environment", function(done){
//	  var loadResult = env.loadTestData("20160620143232452.zip");//, ["coleccionpruebaexport"]);
//	  out.println("LOAD RESULT xxx: " +loadResult.isOk());
	  var theUser = env.createUser({name:'Not Alberto', lastname:'Not Xaubet', age:80});
	  out.println(theUser);
	  var session = theUser.login();

	  var inserted = session.insertData("apmtres",{"test":"aaaa"});
	  expect(inserted.isOk()).toBeTruthy();
	  expect(inserted.getResult()).not.toBeUndefined();
	  out.println("INSERTED "+ inserted.getResult());
	  expect(inserted.getResult()._id).not.toBeUndefined();

	  var loaded = session.loadData("apmtres",[
												{"test":"aaaa1"},
												{"test":"aaaa2"},
												{"test":"aaaa3"},
												{"test":"aaaa4"},
												{"test":"aaaa5"}
												]);
	  expect(loaded.isOk()).toBe(true);
	  expect(loaded.getResult()).not.toBeUndefined();
	  expect(loaded.getResult().length).toEqual(5);
	  
	  var resultCount = session.count("apmtres","");
	  expect(resultCount.isOk()).toBe(true);
	  expect(resultCount.getResult()).not.toBeUndefined();
	  out.println(resultCount.getResult());
	  expect(resultCount.getResult().count).toBe(6);
	  
	  out.println("COUNT :   " + resultCount.getResult());

	  
//	  var scriptResult = session.run("insertstuff", {tableName:"apmtres"});
//	  if(scriptResult.isOk()){
//		  var actualResult = scriptResult.getResult();
//		  expect(actualResult).not.toBeUndefined();
//	  }
//	  else{
//		  var theError = scriptResult.getError();
//		  out.println(theError);
////		  fail();
//	  }
	  var scriptResult = session.run("aggregate", {tableName:"apmtres"});
	  if(scriptResult.isOk()){
		  var actualResult = scriptResult.getResult();
		  expect(actualResult).not.toBeUndefined();
	  }
	  else{
		  var theError = scriptResult.getError();
		  out.println(theError);
//		  fail();
	  }
	  var resultFind = session.search("apmtres","", null, 2,"{city_id:-1}",1);
	  if(resultFind.isOk()){
		  var actualResult = resultFind.getResult();
		  out.println("SEARCH result 1: " +actualResult);
	  }
	  else{
		  fail("search failed 1");
	  }

	  resultFind = session.search("apmtres","{}", "city_name,city_id,trip_id", 2,"{city_id:-1}",1);
	  if(resultFind.isOk()){
		  var actualResult = resultFind.getResult();
		  out.println("SEARCH result 2: " +actualResult);
		  
		  expect(actualResult.length).toBeGreaterThan(0);
		  
		  var first = actualResult[0];
		  var resultGet = session.get("apmtres",first._id,"reward_coins");
		  if(resultFind.isOk()){
			  out.println("RESULT GET: " +resultGet.getResult());
			  expect(resultGet).not.toBeUndefined();
		  }
		  else{
			  fail("could not find entity with id: " + first._id);
		  }
		  
	  }
	  else{
		  fail("search failed 1");
	  }
	  resultFind = session.search("apmtres","{city_id:12.0}", "city_name,city_id");
	  if(resultFind.isOk()){
		  var actualResult = resultFind.getResult();
		  out.println("SEARCH result 3: " +actualResult);
	  }
	  else{
		  fail("search failed 2");
	  }
	  
	  var resultJob=env.runJob("testjob");
	  if(resultJob.isOk()){
		  var actualResult = resultJob.getResult();
		  out.println("JOB result: " +actualResult);
	  }
	  else{
		  fail("JOB failed");
	  }
	  
	  done();
	  
  });
});