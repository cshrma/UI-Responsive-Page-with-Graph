angular.module("Chaitanya", [])
	.controller("controller", function($scope){
	    $scope.name	=	"Chaitanya"; // Default Value
		$scope.text	=	"How are you ?";
		
		$scope.updateGraph	=	function(){
			
			// For creating the Nodes in the Graph
			const nodes = new vis.DataSet(getDataSet(getCounterArray($scope.text), $scope.name, $scope.text.length));
           
           // create an array with edges
           const edges = new vis.DataSet(getMapping(getCounterArray($scope.text)));

           // create a network
           const container = document.getElementById('mygraph');
           const data = {
             nodes: nodes,
             edges: edges
           };
           const options = {
       			autoResize:true,
       			width:'100%',
       			height:'400px',
       			nodes:{
       				font:{
       					color:'#010'
       				},
       				mass:2,
       				shape: 'dot'
       			}
           	};
           new vis.Network(container, data, options);
			
	}
});

// To get the Characters and their occurance as a Map
function getCounterArray(text){
	let counter = {};
	for(let i=0; i<text.length; i++){
		if(text[i] in counter){
			counter[text[i]]++;
		}
		else{
			counter[text[i]]	=	1;
		}
	}
	return counter;
}
// Map of Character Frequencies
function getDataSet(counter, name, lengthOfString){
	let dataSet	=	[];
	let count=1;
	let row	=	{};
	row["id"]	=	1;
	row["title"]=	name;
	row["color"]=	getRandomColor();
	dataSet.push(row);
	// Iteration to get all the distinct alphabets and their occurance
	$.each(counter, function(key, value){
		let row		=	{};
		row["id"]	=	count+1;
		row["title"]=	"Freq: "+value;
		row["label"]=	key;
		row["color"]=	getRandomColor();
		row["size"]	=	(25+100*value/lengthOfString);
		dataSet.push(row);
		count++;
	});
	
	return dataSet
}
// To get the mapping between the Name Circle and the Alphabets (For the map in the required format)
function getMapping(counter){
	let dataSet	=	[];
	 for(let i=2; i<=Object.keys(counter).length+1; i++){
		 let row	=	{};
		 row["from"]=	1;
		 row["to"]	=	i;	
		 dataSet.push(row);	
	 }
	return dataSet;
}
// Random color code
function getRandomColor() {
    let letters = '0123456789ABCDEF'.split('');
    let color = '#';
    for (let i = 0; i < 3; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

