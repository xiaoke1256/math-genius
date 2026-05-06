//题库

function generateQuestion(grade, level) {
	//中年级 — 100以内加减法；后续：表内乘除、带余除法、三四则混合
	const { express, options, crrectItemCode } = addAndSubQuestion();
	console.log("express,options,crrectItemCode:", express, options, crrectItemCode);
	return { express, options, crrectItemCode };
}

/*100以内加减法*/
function addAndSubQuestion() {
	const op = Math.ceil(Math.random()*2)==0?'-':'+';
	
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
		const dice =  Math.ceil(Math.random()*(2+1+3+2));
		
		let distractor = -1;
		switch (true){
			case dice<2:
				//十位减1（忘记进位）（权重2）
				distractor = crrectAnswer-10;
				break;
			case dice<3:
				//个位加减1（权重1）
				if(Math.floor(Math.random()*2) == 0){
					distractor = crrectAnswer - 1
				}else{
					distractor = crrectAnswer + 1
				}
				
			case dice<6:
				//加法当减法，减法当加法 （权重3）
				distractor = item1 - item2
			default:
				//随机生成一个数 （权重2）
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
	
	const shuffledPool = shuffle(pool);
	const crrectIndex = shuffledPool.indexOf(crrectAnswer);
	const crrectItemCode = String.fromCharCode('A'.charCodeAt(0)+crrectIndex);
	const options = shuffledPool.map((item,index)=>String.fromCharCode('A'.charCodeAt(0)+index)+". "+item)
	
	return {
		express,
		options,
		crrectItemCode
	}
}
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