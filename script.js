window.onload = function () {
    valueSearch = '';
    setDataTable();
};

function setDataTable() {
    result = ``;

    if (localStorage.getItem('expenseData') != null) {
        expenseData = JSON.parse(localStorage.getItem('expenseData'));

        for (let i = 0; i < expenseData.length; i++) {
            type = ``;
            if (expenseData[i].type) {
                type = `<td class="income type">Income</td>`;
            } else {
                type = `<td class="spend type">Spend</td>`;
            }
            result += `
                <tr>
                    <td class="order">${i + 1}</td>
                    <td class="content">${expenseData[i].content}</td>
                    <td class="amount">${expenseData[i].amount} VND</td>
                    ${type}
                    <td class="created">${expenseData[i].createdTime}</td>
                    <td class="action">
                    <button class="btn-delete" order=${i} onClick="deleteRecord(this)">
                        <span>Delete</span>
                    </button>
                    <button class="btn">
                        <span>
                            Edit
                        </span>
                    </button>
                </td>
                </tr>
            `;
        }
        document.getElementById('body-table').innerHTML = result;
        document.getElementById("table-total").style.display = "inline-block";
    }
}

function createTimeNow() {
    let date = new Date();
    let now = date.getHours() + ':' + date.getMinutes() + ' ' + date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    return now;
}

function deleteRecord(index) {
    index = index.getAttribute('order');
    expenseData = JSON.parse(localStorage.getItem('expenseData'));
    expenseData.splice(index, 1);
    localStorage.setItem('expenseData', JSON.stringify(expenseData));
    setDataTable();
}

function searchOnChange() {
    valueText = document.getElementById('search').value.trim();
    if (valueText != valueSearch) {
        valueSearch = valueText;
        searchAndFillDataTable(valueSearch);
    }
}

function searchAndFillDataTable() {

}

function fakeData(number = 1) {
    expenseData = [];
    if (JSON.parse(localStorage.getItem('expenseData')) != null) {
        expenseData = JSON.parse(localStorage.getItem('expenseData'));
    }

    for (let i = 0; i < number; i++) {
        const fakeObject = {
            content: 'DataFake' + Math.floor(Math.random() * 1000),
            amount: Math.floor(Math.random() * 100000),
            type: Math.floor(Math.random() * 1000) % 2 == 0,
            createdTime: createTimeNow(),
        }
        expenseData.push(fakeObject);
    }

    localStorage.setItem('expenseData', JSON.stringify(expenseData));
    setDataTable();
}