var request = require('request');
var util = require('util');
var sql = require('mssql');
var xml2js = require('xml2js');

var parser = new xml2js.Parser({explicitArray: false, trim: true});
const username = 'BuscheAlbionWs2@plex.com',
    password = '6afff48-ba19-',
    url = 'http://' + username + ':' + password + '@https://api.plexonline.com/DataSource/Service.asmx';


var options = { method: 'POST',
  url: 'https://api.plexonline.com/DataSource/Service.asmx',
  headers: 
   { 'cache-control': 'no-cache',
     Connection: 'keep-alive',
     'content-length': '762',
     'accept-encoding': 'gzip, deflate',
     Host: 'api.plexonline.com',
     'Postman-Token': 'f340f13d-d9c5-490f-8498-efa32b887880,2821c346-0660-4f92-88d2-8d7e5c8af1aa',
     'Cache-Control': 'no-cache',
     Accept: '*/*',
     'User-Agent': 'PostmanRuntime/7.11.0',
     Authorization: 'Basic QnVzY2hlQWxiaW9uV3MyQHBsZXguY29tOjZhZmZmNDgtYmExOS0=',
     SOAPAction: 'http://www.plexus-online.com/DataSource/ExecuteDataSource',
     'Content-Type': 'text/xml' },
  body: '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:dat="http://www.plexus-online.com/DataSource">\n   <soapenv:Header/>\n   <soapenv:Body>\n      <dat:ExecuteDataSource>\n         <!--Optional:-->\n         <dat:ExecuteDataSourceRequest>\n            <!--Optional:-->\n            <dat:DataSourceKey>2912</dat:DataSourceKey>\n            <!--Optional:-->\n            <dat:InputParameters>\n               <!--Zero or more repetitions:-->\n             </dat:InputParameters>\n            <!--Optional:-->\n            <dat:DataSourceName>?</dat:DataSourceName>\n            <!--Optional:-->\n            <dat:DataBase>?</dat:DataBase>\n         </dat:ExecuteDataSourceRequest>\n      </dat:ExecuteDataSource>\n   </soapenv:Body>\n</soapenv:Envelope>' };

var test = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:dat="http://www.plexus-online.com/DataSource">\n   <soapenv:Header/>\n   <soapenv:Body>\n      <dat:ExecuteDataSource>\n         <!--Optional:-->\n         <dat:ExecuteDataSourceRequest>\n            <!--Optional:-->\n            <dat:DataSourceKey>2912</dat:DataSourceKey>\n            <!--Optional:-->\n            <dat:InputParameters>\n               <!--Zero or more repetitions:-->\n             </dat:InputParameters>\n            <!--Optional:-->\n            <dat:DataSourceName>?</dat:DataSourceName>\n            <!--Optional:-->\n            <dat:DataBase>?</dat:DataBase>\n         </dat:ExecuteDataSourceRequest>\n      </dat:ExecuteDataSource>\n   </soapenv:Body>\n</soapenv:Envelope>';


	/*
let insert = (workcenterKey) => {
	console.log(`inside insert ${workcenterKey}`);
	
	const table = new sql.Table('btProductionStatusSummary');
	table.create = true;
	table.columns.add('Workcenter_Key',sql.Int,{nullable: true});
	table.columns.add('Workcenter_Code', sql.VarChar(50), {nullable: true});
	table.columns.add('Part_No', sql.VarChar(100), {nullable: true});
	table.rows.add('12345','Workcenter_Code','Part_No');
	
	poolConnect.then((pool) => {
		pool.request() // or: new sql.Request(pool)
		.bulk(table, (err, result) => {
			console.log('Add complete');
		});
	}).catch(err => {
		console.log(`${err}`);
	});
};
*/
let callback = (error, response, body) => {
  if (!error && response.statusCode == 200) {
    parser.parseString(body, (err, result) => {
		var env = result['soap:Envelope'];
		var table = result['soap:Envelope']['soap:Body']['ExecuteDataSourceResponse']['ExecuteDataSourceResult']['ResultSets']['ResultSet']['Rows']['Row'];

		const workcenterKey = console.log(table[1]['Columns']['Column'][0]['Value']);  // record1
		console.log(table[2]['Columns']['Column']);  // record2
//		insert(workcenterKey);
		/*
		arr.forEach(function (item) {
		  console.log(item);
		})
*/
    });
  };
//  console.log('E', response.statusCode, response.statusMessage);  
};
request(options, callback);
//
/*

var config = {
	user:'sa',
	password: 'buschecnc1',
	server: '10.1.2.17',
	database: 'Cribmaster'
};

// promise style:
const pool = new sql.ConnectionPool(config);
const poolConnect = pool.connect();

pool.on('error', err => {
    console.log(err); // ... error handler
});

*/

