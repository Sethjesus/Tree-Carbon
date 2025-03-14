// 樹種對應的碳儲存因子 (CF)
const treeData = {
    "天然針葉林": 0.4821,
    "天然針闊葉混淆林": 0.4756,
    "天然闊葉林": 0.4691,
    "人工針葉林": 0.4821,
    "人工針闊葉混淆林": 0.4756,
    "人工闊葉林": 0.4691,
    "木竹混淆林": 0.4756,
    "竹林": 0.4732
};

function calculateCarbon() {
    // 取得輸入值
    let height = parseFloat(document.getElementById("treeHeight").value);
    let diameter = parseFloat(document.getElementById("treeDiameter").value);
    let count = parseInt(document.getElementById("treeCount").value, 10);

    if (isNaN(height) || isNaN(diameter) || isNaN(count)) {
        alert("請輸入正確的數值");
        return;
    }

    // 計算體積 (圓柱體近似)
    let radius = diameter / 200; // 轉換為公尺
    let volume = Math.PI * Math.pow(radius, 2) * height; // 立方公尺

    // 取得選擇的樹種
    let selectedTree = document.getElementById("treeType").value;
    let selectedFactor = treeData[selectedTree] || 0.47;

    // 計算總碳儲存量
    let carbonStorage = volume * selectedFactor * count * 1000; // 轉換為公斤
    document.getElementById("carbonResult").innerText = carbonStorage.toFixed(2);

    // 更新不同樹種換算結果
    updateConversionList(volume, count);
}

function updateConversionList(volume, count) {
    let conversionList = document.getElementById("conversionList");
    conversionList.innerHTML = ""; // 清空列表

    for (let tree in treeData) {
        let factor = treeData[tree];
        let carbonStorage = volume * factor * count * 1000; // 轉換為公斤

        let listItem = document.createElement("li");
        listItem.innerHTML = `${tree}：碳儲存量 = ${volume.toFixed(2)} × ${factor} × ${count} × 1000 = <b>${carbonStorage.toFixed(2)}</b> 公斤`;
        conversionList.appendChild(listItem);
    }
}

// 動態加載樹種選項
function populateTreeTypes() {
    let treeSelect = document.getElementById("treeType");
    for (let tree in treeData) {
        let option = document.createElement("option");
        option.value = tree;
        option.textContent = tree;
        treeSelect.appendChild(option);
    }
}

// 監聽輸入變化，自動更新計算
document.getElementById("treeHeight").addEventListener("input", calculateCarbon);
document.getElementById("treeDiameter").addEventListener("input", calculateCarbon);
document.getElementById("treeCount").addEventListener("input", calculateCarbon);

// 頁面加載時執行
window.onload = function() {
    populateTreeTypes();
    calculateCarbon();
};
