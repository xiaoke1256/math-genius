//题库

function generateQuestion(grade, level) {
	//中年级 — 100以内加减法；后续：表内乘除、带余除法、三四则混合
	let question = {};
	const dice =  Math.ceil(Math.random()*(3));
	console.log("dice："+dice);
	switch (true){
		case dice<=1:
			question = addAndSubQuestion();
			break;
		case dice<=2:
			question = simpleMul();
			break;
		case dice<=3:
			question = simpleDiv();
			break;
		default:
			//默认用加减法
			question = addAndSubQuestion();
	}
	const { express, pool, crrectAnswer } = question;
	
	console.log("express,pool,crrectAnswer:", express, pool, crrectAnswer);
	
	const shuffledPool = shuffle(pool);
	const crrectIndex = shuffledPool.indexOf(crrectAnswer);
	const crrectItemCode = String.fromCharCode('A'.charCodeAt(0)+crrectIndex);
	const options = shuffledPool.map((item,index)=>String.fromCharCode('A'.charCodeAt(0)+index)+". "+item)
	
	return { express, options, crrectItemCode };
}

/*100以内加减法*/
function addAndSubQuestion() {
	const op = Math.floor(Math.random()*2)==0?'-':'+';
	
	const item1 = Math.floor(Math.random()*101);
	const item2 = Math.floor(Math.random()*101);

	const express = item1+" "+op+" "+item2+ " = ?";
	const crrectAnswer = op=='+'?item1+item2:item1-item2;
	if(crrectAnswer<0 || crrectAnswer>100){
		//超纲
		return addAndSubQuestion();
	}
	
	const pool = [];
	pool.push(crrectAnswer)
	while(pool.length<4){
		const dice =  Math.ceil(Math.random()*(2+1+3+4));
		
		let distractor = -1;
		switch (true){
			case dice<=2:
				//十位减1（忘记进位）（权重2）
				distractor = crrectAnswer-10;
				break;
			case dice<=3:
				//个位加减1（权重1）
				if(Math.floor(Math.random()*2) == 0){
					distractor = crrectAnswer - 1
				}else{
					distractor = crrectAnswer + 1
				}
				break;
			case dice<=6:
				//加法当减法，减法当加法 （权重3）
				if(op==='+'){
					distractor = item1 - item2
				}else{
					distractor = item1 + item2
				}
				break;	
			default:
				//随机生成一个数 （权重4）
				distractor = Math.floor(Math.random()*101);
		}
		
		if(distractor<0){
			//备选项不合法
			continue;
		}
		if(pool.includes(distractor)){
			//备选项重复
			continue;
		}
		pool.push(distractor);
	}
	
	return {
		express,
		pool,
		crrectAnswer
	}
}

/**
 * 表内乘法
 * 
 */
function simpleMul(){
	const item1 = Math.floor(Math.random()*9);
	const item2 = Math.floor(Math.random()*9);
	
	const express = item1+" x "+item2+ " = ?";
	const crrectAnswer = item1*item2
	
	const pool = [];
	pool.push(crrectAnswer)
	while(pool.length<4){
		const dice =  Math.ceil(Math.random()*(2+3+1+4));
		
		let distractor = -1;
		switch (true){
			case dice<=2:
				//当作加法来做（权重2）
				distractor = item1+item2
				break;
			case dice<=5:
				//个位和十位互换（权重3）
				distractor = crrectAnswer%10*10+Math.floor(crrectAnswer/10)
				break;
			case dice<=6:
				//某个数加一再乘（权重1）
				if(Math.floor(Math.random()*2)==0){
					distractor = (item1+1)*item2
				}else{
					distractor = item1*(item2)
				}
				break;
			default:
				//随机（权重4）
				distractor = Math.floor(Math.random()*81);
		}
		
		if(distractor<0){
			//备选项不合法
			continue;
		}
		if(pool.includes(distractor)){
			//备选项重复
			continue;
		}
		pool.push(distractor);
	}
	
	return {
		express,
		pool,
		crrectAnswer
	}
}

/**
 * 表内除法
 */
function simpleDiv(){
	const item1 = Math.ceil(Math.random()*9);
	const item2 = Math.ceil(Math.random()*9);
	
	const dividend = item1 * item2;
	const divisor = item1;
	const quotient = item2;
	const express = dividend + " &divide; " + divisor + " = ?";
	
	console.log("express:",express)
	
	const crrectAnswer = quotient;
	
	const pool = [];
	pool.push(crrectAnswer)
	
	while(pool.length<4){
		const dice =  Math.ceil(Math.random()*(3+2+5));
		let distractor = -1;
		switch (true){
			//当减法来做；（权重3）
			case dice<=3:
				distractor = dividend - divisor;
				break;
			//当加法来做;（权重2）
			case dice<=5:
				distractor = dividend + divisor;
				break;
			//随机（权重5）
			default:
				distractor = Math.floor(Math.random() * dividend);
		}
		
		if(distractor<0){
			//备选项不合法
			continue;
		}
		if(pool.includes(distractor)){
			//备选项重复
			continue;
		}
		pool.push(distractor);
	}
	
	return {
		express,
		pool,
		crrectAnswer
	}
	
}

/**
 * 洗牌 
 */
function shuffle(pool){
	const newPool = [];
	let index = 0;
	while(pool.length>0){
		const index = Math.floor(Math.random()*pool.length);
		newPool.push(pool[index]);
		pool.splice(index, 1);
	}
	return newPool;
}

export { generateQuestion };