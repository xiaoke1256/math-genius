//题库

function generateQuestion(grade, level) {
	let question = {};
	
	if(grade==='1-2'){
		//低年级
		const dice =  Math.ceil(Math.random()*7);
		console.log("dice："+dice);
		switch (true){
			case dice<=3:
				question = simapleAddAndSubQuestion();
				break;
			case dice<=6:
				question = simpleMul();
				break;
			case dice<=7:
				question = pureAddSubMixedQuestion();
				break;
			default:
				question = simapleAddAndSubQuestion();
		}
	}else if(grade==='3-4'){
		//中年级 — 100以内加减法、表内乘除、带余除法、整十数乘除、四则混合
		const dice =  Math.ceil(Math.random()*6);
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
			case dice<=6:
				question = tryMixedNoBracket();
				break;
			default:
				question = addAndSubQuestion();
		}
	}
	const { express, pool, crrectAnswer } = question;
	
	console.log("express,pool,crrectAnswer:", express, pool, crrectAnswer);
	
	const shuffledPool = shuffle(pool);
	const crrectIndex = shuffledPool.indexOf(crrectAnswer);
	const crrectItemCode = String.fromCharCode('A'.charCodeAt(0)+crrectIndex);
	const options = shuffledPool.map((item,index)=>String.fromCharCode('A'.charCodeAt(0)+index)+". "+item)
	
	return { express, options, crrectItemCode };
}

/* 20以内的加减法 */
function simapleAddAndSubQuestion() {
	const op = Math.floor(Math.random()*2)==0?'-':'+';
	let item1 = 0;
	let item2 = 0;
	let express = "";
	let crrectAnswer = 0;
	if(op==='+'){
		item1 = Math.floor(Math.random()*11);
		item2 = Math.floor(Math.random()*11);
		express = item1+" "+op+" "+item2+ " = ?";
		crrectAnswer = item1+item2;
	}else if(op==='-'){
		item1 = Math.floor(Math.random()*21);
		item2 = Math.floor(Math.random()*11);
		express = item1+" "+op+" "+item2+ " = ?";
		crrectAnswer = item1-item2;
		if(crrectAnswer<0 || crrectAnswer>20){
			//超纲
			return simapleAddAndSubQuestion();
		}
	}
	
	const pool = [];
	pool.push(crrectAnswer)
	while(pool.length<4){
		const dice =  Math.ceil(Math.random()*(1+3+4));
		
		let distractor = -1;
		switch (true){
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
			// 整十 ÷ 一位数，如 60÷30=20、80÷4=20
			item2 = Math.floor(Math.random()*8)+2;
			if(Math.floor(Math.random()*2)===0){
				crrectAnswer = Math.floor(Math.random()*8)+2;
				item1 = item2 * crrectAnswer;
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

function applyOp(a, op, b){
	if(op === '+') return a + b;
	if(op === '-') return a - b;
	if(op === '⨯') return a * b;
	return Math.floor(a / b);
}

/** 按括号先算括号内，再算括号外 */
function calcBracketed(n1, op1, n2, op2, n3, bracket){
	if(bracket === 'left'){
		return applyOp(applyOp(n1, op1, n2), op2, n3);
	}
	return applyOp(n1, op1, applyOp(n2, op2, n3));
}

/** 无括号：先乘除后加减，同级从左到右（忽略括号的典型错法） */
function calcMixed(n1, op1, n2, op2, n3){
	let vals = [n1, n2, n3];
	let ops = [op1, op2];
	for(let pass = 0; pass < 2; pass++){
		const hi = pass === 0 ? ['⨯', '÷'] : ['+', '-'];
		let i = 0;
		while(i < ops.length){
			if(hi.includes(ops[i])){
				vals.splice(i, 2, applyOp(vals[i], ops[i], vals[i + 1]));
				ops.splice(i, 1);
			}else{
				i++;
			}
		}
	}
	return vals[0];
}

/** 从左到右依次计算 */
function calcLeftToRight(n1, op1, n2, op2, n3){
	return applyOp(applyOp(n1, op1, n2), op2, n3);
}

function formatBracketExpress(n1, op1, n2, op2, n3, bracket){
	if(bracket === 'left'){
		return "(" + n1 + " " + op1 + " " + n2 + ") " + op2 + " " + n3 + " = ?";
	}
	return n1 + " " + op1 + " (" + n2 + " " + op2 + " " + n3 + ") = ?";
}

function formatPlainExpress(n1, op1, n2, op2, n3){
	return n1 + " " + op1 + " " + n2 + " " + op2 + " " + n3 + " = ?";
}

const isExactDiv = (a, b) => b !== 0 && a % b === 0;

function validateBracketParams(p){
	const { n1, op1, n2, op2, n3, bracket } = p;
	if(bracket === 'left'){
		if(op1 === '÷' && !isExactDiv(n1, n2)) return false;
		const inner = applyOp(n1, op1, n2);
		if(inner <= 0) return false;
		if(op2 === '÷' && !isExactDiv(inner, n3)) return false;
	}else{
		if(op2 === '÷' && !isExactDiv(n2, n3)) return false;
		const inner = applyOp(n2, op2, n3);
		if(inner <= 0) return false;
		if(op1 === '÷' && !isExactDiv(n1, inner)) return false;
	}
	return true;
}

function buildMixedPool(crrectAnswer, getDistractor){
	const pool = [crrectAnswer];
	let times = 0;
	while(pool.length < 4){
		const distractor = getDistractor();
		if(distractor <= 0 || distractor > 100 || pool.includes(distractor)){
			times++;
			if(times > 20) return null;
			continue;
		}
		pool.push(distractor);
	}
	return pool;
}

/** 纯加减：a ± b ± c */
function genPureAddSubParams(){
	const op1 = Math.floor(Math.random() * 2) === 0 ? '+' : '-';
	const op2 = Math.floor(Math.random() * 2) === 0 ? '+' : '-';
	let n1, n2, n3;
	if(op1 === '+' && op2 === '+'){
		n1 = Math.floor(Math.random() * 30) + 1;
		n2 = Math.floor(Math.random() * 30) + 1;
		n3 = Math.floor(Math.random() * Math.max(1, 100 - n1 - n2)) + 1;
	}else if(op1 === '+' && op2 === '-'){
		n1 = Math.floor(Math.random() * 30) + 1;
		n2 = Math.floor(Math.random() * 30) + 1;
		const sum = n1 + n2;
		n3 = Math.floor(Math.random() * Math.min(sum - 1, 50)) + 1;
	}else if(op1 === '-' && op2 === '+'){
		n2 = Math.floor(Math.random() * 30) + 1;
		n3 = Math.floor(Math.random() * 30) + 1;
		n1 = n2 + Math.floor(Math.random() * Math.min(50, 100 - n3)) + 1;
	}else{
		n2 = Math.floor(Math.random() * 20) + 1;
		n3 = Math.floor(Math.random() * 20) + 1;
		n1 = n2 + n3 + Math.floor(Math.random() * Math.min(50, 100 - n2 - n3)) + 1;
	}
	return { n1, op1, n2, op2, n3 };
}

/** 无括号纯加减混合：a ± b ± c */
function pureAddSubMixedQuestion(){
	for(let t = 0; t < 30; t++){
		const { n1, op1, n2, op2, n3 } = genPureAddSubParams();
		const ans = calcMixed(n1, op1, n2, op2, n3);
		if(ans <= 0 || ans > 100 || !Number.isInteger(ans)) continue;

		const pool = buildMixedPool(ans, () => {
			const dice = Math.ceil(Math.random() * (3 + 2 + 2 + 3));
			switch (true){
				case dice <= 3:
					return Math.floor(Math.random() * 2) === 0
						? applyOp(n1, op1, n2)
						: applyOp(n2, op2, n3);
				case dice <= 5:
					const wrongOp = Math.floor(Math.random() * 2) === 0 ? op1 : op2;
					const flipOp = wrongOp === '+' ? '-' : '+';
					if(wrongOp === op1){
						return calcMixed(n1, flipOp, n2, op2, n3);
					}
					return calcMixed(n1, op1, n2, flipOp, n3);
				case dice <= 7:
					return ans + (Math.floor(Math.random() * 2) === 0
						? (Math.floor(Math.random() * 2) === 0 ? -1 : 1)
						: (Math.floor(Math.random() * 2) === 0 ? -10 : 10));
				default:
					return Math.floor(Math.random() * 101);
			}
		});
		if(!pool) continue;
		return {
			express: formatPlainExpress(n1, op1, n2, op2, n3),
			pool,
			crrectAnswer: ans
		};
	}
	return pureAddSubMixedQuestion();
}

/** 无括号混合运算 */
function tryMixedNoBracket(){
	const templates = [
		genPureAddSubParams,
		() => {
			const n2 = Math.floor(Math.random() * 8) + 2;
			const n3 = Math.floor(Math.random() * 8) + 2;
			const prod = n2 * n3;
			const op1 = Math.floor(Math.random() * 2) === 0 ? '+' : '-';
			let n1;
			if(op1 === '+'){
				n1 = Math.floor(Math.random() * Math.max(1, 100 - prod));
			}else{
				n1 = prod + Math.floor(Math.random() * Math.min(50, 100 - prod)) + 1;
			}
			return { n1, op1, n2, op2: '⨯', n3 };
		},
		() => {
			const n1 = Math.floor(Math.random() * 8) + 2;
			const n2 = Math.floor(Math.random() * 8) + 2;
			const prod = n1 * n2;
			const op2 = Math.floor(Math.random() * 2) === 0 ? '+' : '-';
			let n3;
			if(op2 === '+'){
				n3 = Math.floor(Math.random() * Math.max(1, 100 - prod));
			}else{
				n3 = prod + Math.floor(Math.random() * Math.min(40, prod)) + 1;
			}
			return { n1, op1: '⨯', n2, op2, n3 };
		},
		() => {
			const divisor = Math.floor(Math.random() * 8) + 2;
			const quotient = Math.floor(Math.random() * 8) + 2;
			const dividend = divisor * quotient;
			const op1 = Math.floor(Math.random() * 2) === 0 ? '+' : '-';
			let n1;
			if(op1 === '+'){
				n1 = Math.floor(Math.random() * Math.max(1, 100 - quotient));
			}else{
				n1 = quotient + Math.floor(Math.random() * Math.min(50, 100 - quotient)) + 1;
			}
			return { n1, op1, n2: dividend, op2: '÷', n3: divisor };
		},
		() => {
			const divisor = Math.floor(Math.random() * 8) + 2;
			const quotient = Math.floor(Math.random() * 8) + 2;
			const dividend = divisor * quotient;
			const op2 = Math.floor(Math.random() * 2) === 0 ? '+' : '-';
			let n3;
			if(op2 === '+'){
				n3 = Math.floor(Math.random() * Math.max(1, 100 - quotient));
			}else{
				n3 = quotient + Math.floor(Math.random() * Math.min(40, quotient)) + 1;
			}
			return { n1: dividend, op1: '÷', n2: divisor, op2, n3 };
		},
		() => {
			const divisor = Math.floor(Math.random() * 8) + 2;
			const q1 = Math.floor(Math.random() * 8) + 2;
			const dividend = divisor * q1;
			const multiplier = Math.floor(Math.random() * 8) + 2;
			return { n1: dividend, op1: '÷', n2: divisor, op2: '⨯', n3: multiplier };
		},
		() => {
			const n1 = Math.floor(Math.random() * 8) + 2;
			const n2 = Math.floor(Math.random() * 8) + 2;
			const prod = n1 * n2;
			const divisors = [2, 3, 4, 6, 8, 9].filter(d => prod % d === 0 && prod / d >= 2 && prod / d <= 9);
			if(divisors.length === 0) return null;
			const divisor = divisors[Math.floor(Math.random() * divisors.length)];
			return { n1, op1: '⨯', n2, op2: '÷', n3: divisor };
		}
	];

	for(let t = 0; t < 30; t++){
		const params = templates[Math.floor(Math.random() * templates.length)]();
		if(!params) continue;
		const { n1, op1, n2, op2, n3 } = params;
		const ans = calcMixed(n1, op1, n2, op2, n3);
		if(ans <= 0 || ans > 100 || !Number.isInteger(ans)) continue;

		const isPureAddSub = ['+', '-'].includes(op1) && ['+', '-'].includes(op2);
		const pool = buildMixedPool(ans, () => {
			const dice = Math.ceil(Math.random() * (3 + 2 + 2 + 3));
			switch (true){
				case dice <= 3:
					if(isPureAddSub){
						// 只做前两数或后两数
						return Math.floor(Math.random() * 2) === 0
							? applyOp(n1, op1, n2)
							: applyOp(n2, op2, n3);
					}
					return calcLeftToRight(n1, op1, n2, op2, n3);
				case dice <= 5:
					if(isPureAddSub){
						// 加减符号弄反
						const wrongOp = Math.floor(Math.random() * 2) === 0 ? op1 : op2;
						const flipOp = wrongOp === '+' ? '-' : '+';
						if(wrongOp === op1){
							return calcMixed(n1, flipOp, n2, op2, n3);
						}
						return calcMixed(n1, op1, n2, flipOp, n3);
					}
					if(Math.floor(Math.random() * 2) === 0){
						const step1 = applyOp(n1, op1, n2);
						return applyOp(step1, op2, n3);
					}
					const step2 = applyOp(n2, op2, n3);
					return applyOp(n1, op1, step2);
				case dice <= 7:
					return ans + (Math.floor(Math.random() * 2) === 0
						? (Math.floor(Math.random() * 2) === 0 ? -1 : 1)
						: (Math.floor(Math.random() * 2) === 0 ? -10 : 10));
				default:
					return Math.floor(Math.random() * 101);
			}
		});
		if(!pool) continue;
		return {
			express: formatPlainExpress(n1, op1, n2, op2, n3),
			pool,
			crrectAnswer: ans
		};
	}
	return null;
}

/** 有括号混合运算 */
function tryMixedWithBracket(){
	const templates = [
		// (a ± b) × c
		() => {
			const op1 = Math.floor(Math.random() * 2) === 0 ? '+' : '-';
			const n3 = Math.floor(Math.random() * 8) + 2;
			let n1, n2;
			if(op1 === '+'){
				n1 = Math.floor(Math.random() * 15) + 1;
				n2 = Math.floor(Math.random() * 15) + 1;
			}else{
				n2 = Math.floor(Math.random() * 14) + 2;
				n1 = n2 + Math.floor(Math.random() * 14) + 1;
			}
			return { n1, op1, n2, op2: '⨯', n3, bracket: 'left' };
		},
		// (a ± b) ÷ c，整除
		() => {
			const n3 = Math.floor(Math.random() * 8) + 2;
			const quotient = Math.floor(Math.random() * 8) + 2;
			const inner = n3 * quotient;
			const op1 = Math.floor(Math.random() * 2) === 0 ? '+' : '-';
			let n1, n2;
			if(op1 === '+'){
				n1 = Math.floor(Math.random() * Math.max(1, inner - 2)) + 1;
				n2 = inner - n1;
			}else{
				n2 = Math.floor(Math.random() * Math.max(1, inner - 2)) + 1;
				n1 = inner + n2;
			}
			return { n1, op1, n2, op2: '÷', n3, bracket: 'left' };
		},
		// a × (b ± c)
		() => {
			const n1 = Math.floor(Math.random() * 8) + 2;
			const op2 = Math.floor(Math.random() * 2) === 0 ? '+' : '-';
			let n2, n3;
			if(op2 === '+'){
				n2 = Math.floor(Math.random() * 8) + 2;
				n3 = Math.floor(Math.random() * 8) + 2;
			}else{
				n3 = Math.floor(Math.random() * 7) + 2;
				n2 = n3 + Math.floor(Math.random() * 7) + 2;
			}
			return { n1, op1: '⨯', n2, op2, n3, bracket: 'right' };
		},
		// a ÷ (b + c)，整除
		() => {
			const n2 = Math.floor(Math.random() * 7) + 2;
			const n3 = Math.floor(Math.random() * 7) + 2;
			const sum = n2 + n3;
			const quotient = Math.floor(Math.random() * 8) + 2;
			const n1 = sum * quotient;
			return { n1, op1: '÷', n2, op2: '+', n3, bracket: 'right' };
		},
		// a - (b ÷ c)
		() => {
			const n3 = Math.floor(Math.random() * 8) + 2;
			const quotient = Math.floor(Math.random() * 8) + 2;
			const n2 = n3 * quotient;
			const n1 = quotient + Math.floor(Math.random() * 40) + 1;
			return { n1, op1: '-', n2, op2: '÷', n3, bracket: 'right' };
		},
		// (a × b) ± c
		() => {
			const n1 = Math.floor(Math.random() * 8) + 2;
			const n2 = Math.floor(Math.random() * 8) + 2;
			const op2 = Math.floor(Math.random() * 2) === 0 ? '+' : '-';
			const inner = n1 * n2;
			let n3;
			if(op2 === '+'){
				n3 = Math.floor(Math.random() * Math.max(1, 100 - inner));
			}else{
				n3 = inner + Math.floor(Math.random() * Math.min(30, inner)) + 1;
			}
			return { n1, op1: '⨯', n2, op2, n3, bracket: 'left' };
		}
	];

	for(let t = 0; t < 40; t++){
		const params = templates[Math.floor(Math.random() * templates.length)]();
		if(!params || !validateBracketParams(params)) continue;

		const { n1, op1, n2, op2, n3, bracket } = params;
		const ans = calcBracketed(n1, op1, n2, op2, n3, bracket);
		const noBracket = calcMixed(n1, op1, n2, op2, n3);
		if(ans <= 0 || ans > 100 || !Number.isInteger(ans)) continue;
		const bracketMatters = ans !== noBracket
			|| (bracket === 'left' && ['+', '-'].includes(op1) && ['⨯', '÷'].includes(op2))
			|| (bracket === 'right' && ['+', '-'].includes(op2) && ['⨯', '÷'].includes(op1))
			|| (bracket === 'right' && op1 === '÷');
		if(!bracketMatters) continue;

		const pool = buildMixedPool(ans, () => {
			const dice = Math.ceil(Math.random() * (3 + 2 + 2 + 3));
			switch (true){
				case dice <= 3:
					return noBracket;
				case dice <= 5:
					if(Math.floor(Math.random() * 2) === 0){
						return calcLeftToRight(n1, op1, n2, op2, n3);
					}
					return bracket === 'left'
						? calcBracketed(n1, op1, n2, op2, n3, 'right')
						: calcBracketed(n1, op1, n2, op2, n3, 'left');
				case dice <= 7:
					return ans + (Math.floor(Math.random() * 2) === 0
						? (Math.floor(Math.random() * 2) === 0 ? -1 : 1)
						: (Math.floor(Math.random() * 2) === 0 ? -10 : 10));
				default:
					return Math.floor(Math.random() * 101);
			}
		});
		if(!pool) continue;
		return {
			express: formatBracketExpress(n1, op1, n2, op2, n3, bracket),
			pool,
			crrectAnswer: ans
		};
	}
	return null;
}

/**
 * 四则混合运算（随机有括号 / 无括号）
 */
function mixedOperations(){
	const result = Math.floor(Math.random() * 2) === 0
		? tryMixedNoBracket()
		: tryMixedWithBracket();
	if(result){
		return result;
	}
	return mixedOperations();
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