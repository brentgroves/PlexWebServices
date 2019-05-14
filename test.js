var request = require('request');
var util = require('util');
var sql = require('mssql');
var xml2js = require('xml2js');

var parser = new xml2js.Parser({explicitArray: false, trim: true});

let xml =
`<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:dat="http://www.plexus-online.com/DataSource">
   <soapenv:Header/>
   <soapenv:Body>
      <dat:ExecuteDataSource>
         <!--Optional:-->
         <dat:ExecuteDataSourceRequest>
            <!--Optional:-->
            <dat:DataSourceKey>37686</dat:DataSourceKey>
            <!--Optional:-->
            <dat:InputParameters>
               <!--Zero or more repetitions:-->
               <dat:InputParameter>
                  <!--Optional:-->
                  <dat:Value>1</dat:Value>
                  <!--Optional:-->
                  <dat:Name>Include_Non_Scheduled</dat:Name>
                  <dat:Required>false</dat:Required>
                  <dat:Output>false</dat:Output>
                  <!--Optional:-->
                  <dat:DefaultValue>?</dat:DefaultValue>
                  <!--Optional:-->
                  <dat:Message>?</dat:Message>
               </dat:InputParameter>
            </dat:InputParameters>
            <!--Optional:-->
            <dat:DataSourceName>?</dat:DataSourceName>
            <!--Optional:-->
            <dat:DataBase>?</dat:DataBase>
         </dat:ExecuteDataSourceRequest>
      </dat:ExecuteDataSource>
   </soapenv:Body>
</soapenv:Envelope>`

const username = 'BuscheAlbionWs2@plex.com',
    password = '6afff48-ba19-',
    url = 'http://' + username + ':' + password + '@https://api.plexonline.com/DataSource/Service.asmx';
console.log(url);



var options = { method: 'POST',
  url: 'https://api.plexonline.com/DataSource/Service.asmx',
  headers: 
   { 'cache-control': 'no-cache',
     'Postman-Token': 'd7b8434c-958c-4217-aad2-3906d2fd3693,6299288b-868d-4318-bace-c9a881fb3a61',
     'Cache-Control': 'no-cache',
     Accept: '*/*',
     'User-Agent': 'PostmanRuntime/7.11.0',
     Authorization: 'Basic QnVzY2hlQWxiaW9uV3MyQHBsZXguY29tOjZhZmZmNDgtYmExOS0=',
     SOAPAction: 'http://www.plexus-online.com/DataSource/ExecuteDataSource',
     'Content-Type': 'text/xml' },
  body: '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:dat="http://www.plexus-online.com/DataSource">\n   <soapenv:Header/>\n   <soapenv:Body>\n      <dat:ExecuteDataSource>\n         <!--Optional:-->\n         <dat:ExecuteDataSourceRequest>\n            <!--Optional:-->\n            <dat:DataSourceKey>37686</dat:DataSourceKey>\n            <!--Optional:-->\n            <dat:InputParameters>\n               <!--Zero or more repetitions:-->\n               <dat:InputParameter>\n                  <!--Optional:-->\n                  <dat:Value>1</dat:Value>\n                  <!--Optional:-->\n                  <dat:Name>Include_Non_Scheduled</dat:Name>\n                  <dat:Required>false</dat:Required>\n                  <dat:Output>false</dat:Output>\n                  <!--Optional:-->\n                  <dat:DefaultValue>?</dat:DefaultValue>\n                  <!--Optional:-->\n                  <dat:Message>?</dat:Message>\n               </dat:InputParameter>\n            </dat:InputParameters>\n            <!--Optional:-->\n            <dat:DataSourceName>?</dat:DataSourceName>\n            <!--Optional:-->\n            <dat:DataBase>?</dat:DataBase>\n         </dat:ExecuteDataSourceRequest>\n      </dat:ExecuteDataSource>\n   </soapenv:Body>\n</soapenv:Envelope>' };


let callback = (error, response, body) => {
  if (!error && response.statusCode == 200) {
    parser.parseString(body, (err, result) => {
		var env = result['soap:Envelope'];
		var table = result['soap:Envelope']['soap:Body']['ExecuteDataSourceResponse']['ExecuteDataSourceResult']['ResultSets']['ResultSet']['Rows']['Row'];

		console.log(table[1]['Columns']['Column'][0]['Value']);  // record1
		console.log(table[2]['Columns']['Column']);  // record2
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

const table = new sql.Table('btProductionStatusSummary');
table.create = true;
table.columns.add('Workcenter_Key',sql.Int,{nullable: true});
table.columns.add('Workcenter_Code', sql.VarChar(50), {nullable: true});
table.columns.add('Part_No', sql.VarChar(100), {nullable: true});
table.rows.add(100,'Workcenter_Code','Part_No');

poolConnect.then((pool) => {
	pool.request() // or: new sql.Request(pool)
	.bulk(table, (err, result) => {
		console.log('Add complete');
		console.dir(err);
	});
	/*
	.query('select top 10 itemnumber,description1 from inventry',(err,result)=>{
		console.dir(result);
	});
	*/
}).catch(err => {
	console.log(`${err}`);
});

