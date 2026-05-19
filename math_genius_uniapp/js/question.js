//题库

function generateQuestion(grade, level) {
	//中年级 — 100以内加减法、表内乘除、带余除法、整十数乘除
	let question = {};
	const dice =  Math.ceil(Math.random()*5);
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
		case dice<=4:
			question = divWithRemainder();
			break;
		case dice<=5:
			question = tensMulDiv();
			break;
		default:
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
	
	const express = item1+" ⨯ "+item2+ " = ?";
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
	const express = dividend + " ÷ " + divisor + " = ?";
	
	console.log("express:",express)
	
	const crrectAnswer = quotient;
	
	const pool = [];
	pool.push(crrectAnswer)
	
	let times = 0;
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
			console.log("备选项不合法:",distractor);
			continue;
		}
		if(pool.includes(distractor)){
			//备选项重复
			times++
			console.log("备选项重复:",distractor);
			if(times>20){
				//超过20次都不能跳出循环
				console.log("超过20次都不能跳出循环.");
				return simpleDiv();
			}
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
 * 带余数除法（答案含商和余数，如 6……4）
 */
function formatDivAnswer(quotient, remainder){
    if(remainder==0){
        return quotient+'';
    }
	return quotient + "……" + remainder;
}

function divWithRemainder(){
	const divisor = Math.floor(Math.random()*8)+2; // 2-9
	const quotient = Math.floor(Math.random()*8)+1; // 1-9
	const remainder = Math.floor(Math.random()*(divisor-1))+1; // 1 ~ divisor-1
	const dividend = divisor * quotient + remainder;

	const express = dividend + " ÷ " + divisor + " = ?";
	const crrectAnswer = formatDivAnswer(quotient, remainder);

	const pool = [];
	pool.push(crrectAnswer);
	let times = 0;
	while(pool.length<4){
		const dice = Math.ceil(Math.random()*(3+2+2+3));
		let distractor = '';
		switch (true){
			case dice<=3:
				// 商和余数位置颠倒（权重3）
				distractor = formatDivAnswer(remainder, quotient);
				break;
			case dice<=5:
				// 商正确、余数错误（权重2）
				{
					const delta = Math.floor(Math.random()*2)===0 ? -1 : 1;
					if(remainder + delta==0){
						continue;
					}
					distractor = formatDivAnswer(quotient, remainder + delta);
				}
				break;
			case dice<=7:
				// 余数正确、商错误（权重2）
				{
					const delta = Math.floor(Math.random()*2)===0 ? -1 : 1;
					distractor = formatDivAnswer(quotient + delta, remainder);
				}
				break;
			default:
				// 当作能整除或随机一对商余（权重3）
				if(Math.floor(Math.random()*2)===0){
					distractor = formatDivAnswer(Math.floor(dividend/divisor), 0);
				}else{
					const rq = Math.floor(Math.random()*8)+1;
					const rr = Math.floor(Math.random()*(divisor-1))+1;
					distractor = formatDivAnswer(rq, rr);
				}
		}


		const parts = distractor.split('……');
		const dq = parseInt(parts[0], 10);
		const dr = parseInt(parts[1], 10);
		if(dq < 1 || dr < 0 || dr >= divisor){
			continue;
		}
		if(pool.includes(distractor)){
			times++;
			if(times>20){
				return divWithRemainder();
			}
			continue;
		}
		pool.push(distractor);
	}

	return { express, pool, crrectAnswer };
}

/**
 * 整十数的乘除法
 */
function tensMulDiv(){
	const isMul = Math.floor(Math.random()*2)===0;
	let express, crrectAnswer, item1, item2;

	if(isMul){
		if(Math.floor(Math.random()*2)===0){
			// 整十 × 整十
			item1 = (Math.floor(Math.random()*9)+1)*10;
			item2 = (Math.floor(Math.random()*9)+1)*10;
		}else{
			// 整十 × 一位数（或一位数 × 整十）
			item1 = (Math.floor(Math.random()*9)+1)*10;
			item2 = Math.floor(Math.random()*8)+2;
			if(Math.floor(Math.random()*2)===0){
				const tmp = item1;
				item1 = item2;
				item2 = tmp;
			}
		}
		express = item1 + " ⨯ " + item2 + " = ?";
		crrectAnswer = item1 * item2;
	}else{
		if(Math.floor(Math.random()*2)===0){
			// 整十 ÷ 整十
			item2 = (Math.floor(Math.random()*9)+1)*10;
			crrectAnswer = Math.floor(Math.random()*8)+2;
			item1 = item2 * crrectAnswer;
		}else{
			// 整十 ÷ 一位数，如 60÷3=2、80÷4=20
			item2 = Math.floor(Math.random()*8)+2;
			if(Math.floor(Math.random()*2)===0){
				crrectAnswer = Math.floor(Math.random()*8)+2;
				item1 = item2 * crrectAnswer * 10;
			}else{
				crrectAnswer = (Math.floor(Math.random()*8)+2)*10;
				item1 = item2 * crrectAnswer;
			}
		}
		express = item1 + " ÷ " + item2 + " = ?";
	}

	const pool = [];
	pool.push(crrectAnswer);
	let times = 0;
	while(pool.length<4){
		const dice = Math.ceil(Math.random()*(3+2+2+3));
		let distractor = -1;
		switch (true){
			case dice<=3:
				// 漏写或多写一个0（权重3）
				if(crrectAnswer >= 10){
					distractor = Math.floor(Math.random()*2)===0
						? Math.floor(crrectAnswer/10)
						: crrectAnswer*10;
				}else{
					distractor = crrectAnswer*10;
				}
				break;
			case dice<=5:
				// 当作加法或减法（权重2）
				if(isMul){
					distractor = item1 + item2;
				}else{
					distractor = Math.abs(item1 - item2);
				}
				break;
			case dice<=7:
				// 正确答案 ±10 或 ±1（权重2）
				if(crrectAnswer >= 10){
					distractor = crrectAnswer + (Math.floor(Math.random()*2)===0 ? -10 : 10);
				}else{
					distractor = crrectAnswer + (Math.floor(Math.random()*2)===0 ? -1 : 1);
				}
				break;
			default:
				distractor = Math.floor(Math.random()*900)+10;
		}

		if(distractor<=0){
			continue;
		}
		if(pool.includes(distractor)){
			//备选项重复
            times++
            console.log("备选项重复:",distractor);
            if(times>20){
                //超过20次都不能跳出循环
                console.log("超过20次都不能跳出循环.");
                return tensMulDiv();
            }
			continue;
		}
		pool.push(distractor);
	}

	return { express, pool, crrectAnswer };
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