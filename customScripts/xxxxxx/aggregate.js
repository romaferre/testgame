var tableName = request.params.tableName;

var cities = [
{
	"trip_id":1,
	"city_id":10,
	"city_name": "Barcelona",
	"reward_coins":100
},
{
	"trip_id":1,
	"city_id":11,
	"city_name": "Girona",
	"reward_coins":100
},
{
	"trip_id":1,
	"city_id":12,
	"city_name": "Tarragona",
	"reward_coins":100
},
{
	"trip_id":2,
	"city_id":20,
	"city_name": "Genoa",
	"reward_coins":100
},
{
	"trip_id":2,
	"city_id":21,
	"city_name": "Roma",
	"reward_coins":100
},
{
	"trip_id":2,
	"city_id":22,
	"city_name": "Napoli",
	"reward_coins":100
},
{
	"trip_id":3,
	"city_id":30,
	"city_name": "Wien",
	"reward_coins":100
},
{
	"trip_id":3,
	"city_id":31,
	"city_name": "Salzburg",
	"reward_coins":100
},
{
	"trip_id":3,
	"city_id":32,
	"city_name": "Linz",
	"reward_coins":100
}
];



	function toEntityData(obj){
		var entity = gamedonia.data.newEntity();
		for(prop in obj){
			entity.put(prop,obj[prop]);
		}
		return entity;
	}
	cities.forEach(function(city){
		gamedonia.data.create(tableName,toEntityData(city),{
			success: function(c){out.println("inserted city: " + c)
			}
		});
	});
	gamedonia.data.aggregate(tableName, 
			[
			 	'{$group:{"_id":"$city_id","total":{$sum:"$reward_coins"}}}',
			 	'{$group:{"_id":"$total","count":{$sum:1}}}',
			 	'{$sort:{"_id":1}}'
			 ]
			, {
				success: function(c){
					out.println("aggregate: " + c);
					response.returnSuccess(c);
					}
		});
