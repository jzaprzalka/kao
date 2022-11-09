# Tests plan for KAO

The application in the current development state requires a test plan. The planned tests are listed below. The results will be updated in the table as the tests are created and run. Tests correspond with the predefined use-cases. 

|Use case|Test description|Status|Result|
|:------:|:--------------:|:----:|:----:|
|Choose Country|The "choose country" dropdown loads countries list from OpenFoodFacts including "World" as "Select Nothing";<br/>Selecting a country redirects to the appropriate API and uses appropriate language if it is translated|`FUNCTIONALITY IMPLEMENTED`<br/>`NOT TESTED`|-|
|Scan Barcode|The scanner scans a barcode from an image and results with the appropriate data|`FUNCTIONALITY IMPLEMENTED`<br/>`NOT TESTED`|-|
|Enter Barcode Number|Input can be filled out, and the scanner does not work if the input is focused|`FUNCTIONALITY IMPLEMENTED`<br/>`NOT TESTED`|-|
|Search For Product|Accepting data in the Search input makes a request to the appropriate URL in API (appropriate for this product in API);<br/>The URL returns 200 status;<br/>If the Product does not exist or the input is empty, error displays before viewing the details' page|`FUNCTIONALITY IMPLEMENTED`<br/>`NOT TESTED`|-|
|See Product's details|The appropriate details of a product is represented in the view page; details are translated to Polish if Polish was selected|`FUNCTIONALITY IMPLEMENTED`<br/>`NOT TESTED`|-|