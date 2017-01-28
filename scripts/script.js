  var module = {};
  
  (function(exports) {
	  
	  var paginationObj={
		  "itemsPerPage":5,
		  "maxButtons":10,
		  "totalItems":100
	  }
	  
	  var gridObj={
		  "maxArticles":5
	  }
	  
	  
	  var bestArticles = [];
      var reqObj = new XMLHttpRequest();

      reqObj.open("GET", "http://starlord.hackerearth.com/cleartrip/hackernews");

      reqObj.send();

      reqObj.addEventListener("load", listener);

      function listener() {
          //response, responsetext, status, responseText
          bestArticles = JSON.parse(reqObj.response);//data prepared for indexedDB 
		  var len=bestArticles.length;
		  populateArticles(len);
      }

	  function populateArticles(len){
		  createPagination(len);
		  createArticles(0);
	  }
	
	  function createPagination(len){
			/*Dynamic Pagination will be created */
			var maximumButtons = paginationObj.maxButtons;
			paginationObj.totalItems = len;
			var totalArticles = len;
			var element=document.getElementById("pagination");
			for(var i=0;i<maximumButtons;i++){
				var newElement=document.createElement("BUTTON");
				var clickFunction="module.moveToPageX("+i+")";
				var val = document.createTextNode(i+1);
				newElement.appendChild(val);
				newElement.setAttribute("onclick",clickFunction);
				newElement.setAttribute("class","pagination-button");
				element.appendChild(newElement);
			}
	  }
	  
	  function createArticles(startIndex){
		  /* Dynamic Articles will be added and length check */
		  var maxArticles = gridObj.maxArticles;
		  var count=0;
		  var totalArticles = paginationObj.totalItems;
		  var element = document.getElementById("list-items");
		  
		  while (element.firstChild) {
			element.removeChild(element.firstChild);
		  }
		  
		  for(var i=startIndex; i < totalArticles ; i++){
			  var check = checkValidData(i);
			  if(!check ){
				  continue;
			  }
			  
			  count++;
			  var li = document.createElement("LI");
			  var article = document.createElement("ARTICLE");
			  
			  var details = document.createElement("DETAILS");
			  details.setAttribute("open","open");
			  
			  var summary = document.createElement("SUMMARY");
			  summary.setAttribute("class","article-style article-header");
			  
			  var anchor=document.createElement("A");
			  var link = bestArticles[i].url;
			  anchor.setAttribute("href",link);
			  var title =bestArticles[i].title;
			  var anchorText=document.createTextNode(title);
			  anchor.setAttribute("target","_blank");
			  anchor.appendChild(anchorText);
			  summary.appendChild(anchor);
			  
			  details.appendChild(summary);
			  
			  var para = document.createElement("P");
			  para.setAttribute("class","article-style");
			  var author=bestArticles[i].author;
			  var points=0;
			  points = bestArticles[i].num_points
			  var comments=0;
			  comments = bestArticles[i].num_comments;
			  var lastUpdatedTime = bestArticles[i].created_at;
			  var text="By:"+author+" | Comments("+comments+") | Points("+points+") | Last updated time:" + lastUpdatedTime;
			  var paraText = document.createTextNode(text);
			  para.appendChild(paraText);
			  details.appendChild(para);
			  
			  article.appendChild(details);
			  
			  li.appendChild(article);
			  element.appendChild(li);
			  
			  if(count==maxArticles){
				  break;
			  }
		  }
		  
	
	  }
	  
	  function checkValidData(index){
		  var data = bestArticles[index];
		  /* id,title, url, num_points, num_comments, author, created_at */
  if(data.id ===undefined || data.title===undefined || data.url===undefined || data.num_comments===undefined || data.author===undefined || data.created_at===undefined ){
			  return false;
		  }
		  if( data.title==="" || data.url==="" || data.author===""|| data.created_at==="" ){
			  return false;
		  }
		  
		  return true;
	  }
	  
	  exports.createDynamicPagination = function(){
		
	  }
	  exports.sortDescendingOrder = function(){
		  bestArticles.sort(sortArr);
		  function sortArr(a,b){
			  if(a.num_points === undefined || b.num_points === undefined){
				  return -1;
			  }
			  return a.num_points - b.num_points;
		  }
		  createArticles(0);
	  }
	  
	  exports.sortascendingOrder = function(){
		  bestArticles.sort(sortArr);
		  function sortArr(a,b){
			  if(a.num_points === undefined || b.num_points === undefined){
				  return -1;
			  }
			  return b.num_points - a.num_points;
		  }
		  createArticles(0);
	  }
	  
	  exports.moveToPageX = function(PageNumber){
		  createArticles(PageNumber);
	  }
	  
	  exports.alertThis = function(){
		  alert("Hey");
	  }
	  
  })(module);