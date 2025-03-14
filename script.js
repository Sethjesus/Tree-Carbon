// 碳轉換數據
const treeData = [
    { type: "天然針葉林", D: 0.41, BEF: 1.27, BCEF: 0.51, R: 0.22, CF: 0.4821 },
    { type: "天然針闊葉混淆林", D: 0.49, BEF: 1.34, BCEF: 0.72, R: 0.23, CF: 0.4756 },
    { type: "天然闊葉林", D: 0.56, BEF: 1.4, BCEF: 0.92, R: 0.24, CF: 0.4691 },
    { type: "人工針葉林", D: 0.41, BEF: 1.27, BCEF: 0.51, R: 0.22, CF: 0.4821 },
    { type: "人工針闊葉混淆林", D: 0.49, BEF: 1.34, BCEF: 0.72, R: 0.23, CF: 0.4756 },
    { type: "人工闊葉林", D: 0.56, BEF: 1.4, BCEF: 0.92, R: 0.24, CF: 0.4691 },
    { type: "木竹混淆林", D: 0.49, BEF: 1.34, BCEF: 0.72, R: 0.23, CF: 0.4756 },
    { type: "竹林", D: 0.46, BEF: 1.3, BCEF: 0.60, R: 0.46, CF: 0.4732 }
];

function calculateCarbon() {
    let height = parseFloat(document.getElementById("treeHeight").value);
    let diameter = parseFloat(document.getElementById("treeDiameter").value);
    let count = parseInt(document.getElementById("treeCount").value, 10);

    if (isNaN(height) || isNaN(diameter) || isNaN(count)) {
        alert("請輸入正確的數值");
        return;
    }

    let radius = diameter / 200; // 轉換為公尺
    let volume = Math.PI * Math.pow(radius, 2) * height; // 立方公尺

    let carbonTable = document.getElementById("carbonTable");
    carbonTable.innerHTML = ""; // 清空表格

    treeData.forEach(tree => {
        let biomass = volume * tree.BCEF * count; // 生物量
        let carbonStorage = biomass * tree.CF * 1000; // 轉換為公斤

        console.log(`樹種: ${tree.type}, 計算碳儲存量: ${carbonStorage.toFixed(2)} 公斤`);

        let row = `<tr>
            <td>${tree.type}</td>
            <td>${tree.D}</td>
            <td>${tree.BEF}</td>
            <td>${tree.BCEF}</td>
            <td>${tree.R}</td>
            <td>${tree.CF}</td>
            <td>${carbonStorage.toFixed(2)}</td>
        </tr>`;
        carbonTable.innerHTML += row;
    });
}

// 確保所有輸入框變動時都會重新計算
document.getElementById("treeHeight").addEventListener("input", calculateCarbon);
document.getElementById("treeDiameter").addEventListener("input", calculateCarbon);
document.getElementById("treeCount").addEventListener("input", calculateCarbon);

// 頁面加載時確保函數執行
window.onload = () => {
    console.log("Window loaded. Running calculateCarbon()");
    calculateCarbon();
};
