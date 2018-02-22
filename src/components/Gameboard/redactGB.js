
//This makes the pressed button inactive & invisible
addLeftButton(id_clicked) {
  
	let id = 0;
	let find = false;
	
	do {
    	id = Math.floor(Math.random()*this.state.button[0].length + 1)                
    	
    	if(this.state.button[0][id] === false)
        find = true;
	} while (!find);
  
  	this.setState({
  		button[1][id_clicked] : false,
  		button[0][id] : true
  	})
} 