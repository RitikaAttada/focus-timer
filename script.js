const income = document.getElementById('income');
const expense = document.getElementById('expense');
const btns = document.getElementById('btns');
const tracker = document.getElementById('tracker');
const rem = document.getElementById('rem');
let total = 0;
let totalincome = 0;
let totalexpense = 0;
const gains = [];
const losses = [];
let displaystring=[];
let i =0;
let j=0;
let k=0;
let transactions = [];
tracker.style.display="none";
let hasDisplayedPrevious = false;


income.addEventListener('click', ()=>{
    income.style.display="none";
    expense.style.display="none";
    let back = document.createElement('button');
    back.setAttribute('class', 'back');
    back.innerHTML = `go back`;
    btns.appendChild(back);
    let input = document.createElement('input');
    input.setAttribute('type','number');
    input.setAttribute('class', 'input');
    btns.appendChild(input);
    input.focus();
    back.addEventListener('click', ()=>{
        back.style.display="none";
        input.style.display="none";
        income.style.display="inline-block";
        expense.style.display="inline-block";
    });
    input.addEventListener('keydown', function(e) {
        if (e.key === "Enter") {
            addnumber(Number(input.value));
            input.value = '';
            tracker.style.display="inline-block";
        }
    });
});
expense.addEventListener('click', ()=>{
    income.style.display="none";
    expense.style.display="none";
    let back = document.createElement('button');
    back.innerHTML = `go back`;
    back.setAttribute('class', 'back');
    btns.appendChild(back);
    let input = document.createElement('input');
    input.setAttribute('type','number');
    btns.appendChild(input);
    input.setAttribute('class', 'input');
    input.focus();
    back.addEventListener('click', ()=>{
        back.style.display="none";
        input.style.display="none";
        income.style.display="inline-block";
        expense.style.display="inline-block";
    });
    input.addEventListener('keydown', function(e) {
        if (e.key === "Enter") {
            removenumber(Number(input.value));
            input.value = '';
            tracker.style.display="inline-block";
        }
    });
});

function addnumber(num) {
    total +=num;
    totalincome+=num;
    gains[i]=num;
    display(gains[i], "+");
    i++;
    localStorage.setItem('tot', JSON.stringify(total));
    localStorage.setItem('toti', JSON.stringify(totalincome));
}

function removenumber(num) {
    total -=num;
    totalexpense+=num;
    losses[j]=num;
    display(losses[j], "-");
    j++;
    localStorage.setItem('tot', JSON.stringify(total));
    localStorage.setItem('tote', JSON.stringify(totalexpense));
}


function display(num, operator){
        if (!hasDisplayedPrevious) {
        transactions = JSON.parse(localStorage.getItem('transactions')) || [];
        for (let t of transactions) {
            let trans = document.createElement('div');
            trans.setAttribute('class', 'trans');
            trans.innerHTML = t.text;
            trans.style.backgroundColor = t.operator === "+" ? "#008585" : "#c7522a";
            tracker.appendChild(trans);
        }

        hasDisplayedPrevious = true;
    } else {
        transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    }
    displaystring[k]=`${operator} $${num}`;
    let trans = document.createElement('div');
    trans.setAttribute('class', 'trans');
    if (operator == "+") {
        trans.style.backgroundColor="#008585";
    }
    else {
        trans.style.backgroundColor="#c7522a";
    }
    trans.innerHTML = displaystring[k];
    tracker.appendChild(trans);
    transactions.push({ text: `${operator} $${num}`, operator });
    localStorage.setItem('transactions', JSON.stringify(transactions))
    rem.innerHTML = `<p class="amount_rem">amount remaining:$ ${total}</p><p class="amount_gained">total income:$ ${totalincome}</p><p class="amount_lost">total expense:$ ${totalexpense}</p>`;
    k++;
}

rem.innerHTML = `<p class="amount_rem">amount remaining:$ ${total}</p><p class="amount_gained">total income:$ ${totalincome}</p><p class="amount_lost">total expense:$ ${totalexpense}</p>`;
window.onload = function() {
    total = JSON.parse(localStorage.getItem('tot'));
    totalincome = JSON.parse(localStorage.getItem('toti'));
    totalexpense = JSON.parse(localStorage.getItem('tote'));
    rem.innerHTML = `<p class="amount_rem">amount remaining:$ ${total}</p><p class="amount_gained">total income:$ ${totalincome}</p><p class="amount_lost">total expense:$ ${totalexpense}</p>`;
}
