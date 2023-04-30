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
                    <button class="btn-delete" onClick="deleteRecord(${i})">
                        <span>Delete</span>
                    </button>
                    <button class="btn" onClick="editRecord(${i})">
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
    if (confirm("Are you sure want to delete this record ?")) {
        expenseData = JSON.parse(localStorage.getItem('expenseData'));
        expenseData.splice(index, 1);
        localStorage.setItem('expenseData', JSON.stringify(expenseData));
        setDataTable();
    }
}

function searchOnChange() {
    valueText = document.getElementById('search').value.trim();
    if (valueText != valueSearch) {
        valueSearch = valueText;
        if (valueSearch != '') {
            searchAndFillDataTable(valueSearch);
        } else {
            setDataTable();
        }
    }
}

function searchAndFillDataTable(valueSearch) {
    expenseData = [];
    result = [];
    if (JSON.parse(localStorage.getItem('expenseData')) != null) {
        expenseData = JSON.parse(localStorage.getItem('expenseData'));
    }

    for (let i = 0; i < expenseData.length; i++) {
        if (expenseData[i].content.toLowerCase().includes(valueSearch.toLowerCase())) {
            result.push(expenseData[i]);
            continue;
        }

        if ((expenseData[i].amount + ' VND').toLowerCase().includes(valueSearch.toLowerCase())) {
            result.push(expenseData[i]);
            continue;
        }

        if (expenseData[i].createdTime.toLowerCase().includes(valueSearch.toLowerCase())) {
            result.push(expenseData[i]);
            continue;
        }

        if (valueSearch.toLowerCase() == 'spend' && expenseData[i].type == false) {
            result.push(expenseData[i]);
            continue;
        }
    }

    document.getElementById('body-table').innerHTML = '';
    resultHtml = ``;
    for (let i = 0; i < result.length; i++) {
        type = ``;
        if (result[i].type) {
            type = `<td class="income type">Income</td>`;
        } else {
            type = `<td class="spend type">Spend</td>`;
        }
        resultHtml += `
            <tr>
                <td class="order">${i + 1}</td>
                <td class="content">${result[i].content}</td>
                <td class="amount">${result[i].amount} VND</td>
                ${type}
                <td class="created">${result[i].createdTime}</td>
                <td class="action">
                <button class="btn-delete" onClick="deleteRecord(${i})">
                    <span>Delete</span>
                </button>
                <button class="btn" onClick="editRecord(${i})">
                    <span>
                        Edit
                    </span>
                </button>
            </td>
            </tr>
        `;
    }

    document.getElementById('body-table').innerHTML = resultHtml;
}

function cancelAddForm() {
    document.getElementById('add-form').style.display = "none";
    document.getElementById('error').style.display = "none";
}

function displayAddForm() {
    document.getElementById('btnSave').style.display = "none";
    document.getElementById('btnAdd').style.display = "initial";

    document.getElementById('form-title').innerHTML = "Add new record";
    document.getElementById('income').checked = "true";
    document.getElementById('add-form').style.display = "block";
    document.getElementById('input-form-content').value = "";
    document.getElementById('input-amount-content').value = "";
}

function addRecord() {
    document.getElementById('error').style.display = "none";
    if (simpleValidate()) {
        expenseData = [];
        if (JSON.parse(localStorage.getItem('expenseData')) != null) {
            expenseData = JSON.parse(localStorage.getItem('expenseData'));
        }

        object = {
            content: document.getElementById('input-form-content').value,
            amount: document.getElementById('input-amount-content').value,
            type: true,
            createdTime: createTimeNow(),
        }
        expenseData.push(object);
        localStorage.setItem('expenseData', JSON.stringify(expenseData));
        searchAndFillDataTable(document.getElementById('search').value.trim());
        document.getElementById('add-form').style.display = "none";
    }
}

function editRecord(index) {
    document.getElementById('form-title').innerHTML = "Edit record";
    document.getElementById('add-form').style.display = "block";
    document.getElementById('btnSave').style.display = "initial";
    document.getElementById('btnAdd').style.display = "none";

    expenseData = JSON.parse(localStorage.getItem('expenseData'));
    document.getElementById('input-form-content').value = expenseData[index].content;
    document.getElementById('input-amount-content').value = expenseData[index].amount;

    if (expenseData[index].type == true) {
        document.getElementById('income').checked = "true";
    } else {
        document.getElementById('spend').checked = "true";
    }
    document.getElementById("btnSave").setAttribute("index", index);
}

function saveRecord() {
    document.getElementById('error').style.display = "none";
    if (simpleValidate()) {
        index = document.getElementById("btnSave").getAttribute('index');
        expenseData = JSON.parse(localStorage.getItem('expenseData'));

        expenseData[index].content = document.getElementById('input-form-content').value;
        expenseData[index].amount = document.getElementById('input-amount-content').value;
        expenseData[index].type = document.getElementById('income').checked;

        localStorage.setItem('expenseData', JSON.stringify(expenseData));
        searchAndFillDataTable(document.getElementById('search').value.trim());
        document.getElementById('add-form').style.display = "none";
    }
}

function simpleValidate() {
    document.getElementById('error').innerHTML = '';
    content = document.getElementById('input-form-content').value;
    amount = document.getElementById('input-amount-content').value;

    if (content == '') {
        document.getElementById('error').innerHTML = 'Content cannot be null';
        document.getElementById('error').style.display = "block";
        return false;
    }

    if (amount == '') {
        document.getElementById('error').innerHTML = 'Amount cannot be null';
        document.getElementById('error').style.display = "block";
        return false;
    }

    if (content == '' && amount == '') {
        document.getElementById('error').innerHTML = 'Content and Amount cannot be null';
        document.getElementById('error').style.display = "block";
        return false;
    }

    return true;
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