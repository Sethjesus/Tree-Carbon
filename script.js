// 樹種對應的碳儲存因子 (以立方米計算)
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
    // 獲取用戶輸入
    let treeType = document.getElementById("treeType").value;
    let height = parseFloat(document.getElementById("treeHeight").value);
    let diameter = parseFloat(document.getElementById("treeDiameter").value);
    let count = parseInt(document.getElementById("treeCount").value, 10);

    if (!treeType || isNaN(height) || isNaN(diameter) || isNaN(count)) {
        alert("請輸入正確的數值");
        return;
    }

    // 計算單棵樹的體積 (圓柱體近似計算)
    let radius = diameter / 200; // 轉換為公尺
    let volume = Math.PI * Math.pow(radius, 2) * height; // 立方公尺

    // 取得碳儲存比例 (CF)
    let carbonFactor = treeData[treeType] || 0.47;

    // 計算總碳儲存量
    let carbonStorage = volume * carbonFactor * count * 1000; // 轉換為公斤

    // 更新結果顯示
    document.getElementById("carbonResult").innerText = carbonStorage.toFixed(2);
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

// 頁面加載時執行
window.onload = populateTreeTypes;
