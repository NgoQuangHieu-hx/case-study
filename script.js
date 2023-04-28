window.onload = function () {
    setDataTable();
};

function setDataTable() {
    result = ``;

    if (localStorage.getItem('expenseData') != null) {
        expenseData = JSON.parse(localStorage.getItem('expenseData'));
        console.log(expenseData);

        for (let i = 0; i < expenseData.length; i++) {
            type = ``;
            if (expenseData[i].type) {
                type = `<td class="income">Income</td>`;
            } else {
                type = `<td class="spend">Spend</td>`;
            }
            result += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${expenseData[i].content}</td>
                    <td>${expenseData[i].amount} VND</td>
                    ${type}
                    <td>${expenseData[i].createdTime}</td>
                    <td>
                    <button class="btn-delete">
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
    }
    document.getElementById('body-table').innerHTML = result;
}

function createTimeNow() {
    let date = new Date();
    let now = date.getHours() + ':' + date.getMinutes() + ' ' + date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    return now;
}

function fakeData(number = 1) {
    expenseData = [];
    if (JSON.parse(localStorage.getItem('expenseData')) != null) {
        expenseData = JSON.parse(localStorage.getItem('expenseData'));
    }
    maxIndex = expenseData.length;

    const fakeObject = {
        id: (maxIndex + 1),
        content: 'HieuNQ14',
        amount: 123456789,
        type: true,
        createdTime: createTimeNow(),
        deleteFlg: false
    }
    expenseData.push(fakeObject);
    localStorage.setItem('expenseData', JSON.stringify(expenseData));
    setDataTable();
}