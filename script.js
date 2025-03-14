document.addEventListener("DOMContentLoaded", function () {
    const treeTypeSelect = document.getElementById("treeType");

    // 樹種資料 (可擴充)
    const treesData = [
        { name: "天然針葉林", D: 0.41, BEF: 1.27, R: 0.22, CF: 0.4821 },
        { name: "天然針闊葉混淆林", D: 0.49, BEF: 1.34, R: 0.23, CF: 0.4756 },
        { name: "天然闊葉林", D: 0.56, BEF: 1.4, R: 0.24, CF: 0.4691 },
        { name: "人工針葉林", D: 0.41, BEF: 1.27, R: 0.22, CF: 0.4821 },
        { name: "人工針闊葉混淆林", D: 0.49, BEF: 1.34, R: 0.23, CF: 0.4756 },
        { name: "人工闊葉林", D: 0.56, BEF: 1.4, R: 0.24, CF: 0.4691 },
        { name: "木竹混淆林", D: 0.49, BEF: 1.34, R: 0.23, CF: 0.4756 },
        { name: "竹林", D: 0.46, BEF: 0, R: 0, CF: 0.4732 } // 竹林 BEF、R = 0，因為竹子計算方式不同
    ];

    // 加載樹種選項
    treesData.forEach((tree, index) => {
        let option = document.createElement("option");
        option.value = index;
        option.textContent = tree.name;
        treeTypeSelect.appendChild(option);
    });
});

function calculateCarbon() {
    const treeTypeIndex = document.getElementById("treeType").value;
    const treeHeight = parseFloat(document.getElementById("treeHeight").value);
    const treeDiameter = parseFloat(document.getElementById("treeDiameter").value);
    const treeCount = parseInt(document.getElementById("treeCount").value);

    if (isNaN(treeHeight) || isNaN(treeDiameter) || isNaN(treeCount) || treeTypeIndex === "") {
        alert("請輸入正確的樹木數據！");
        return;
    }

    const selectedTree = treesData[treeTypeIndex];

    // 計算樹木體積 (π * r² * h)
    const radius = treeDiameter / 2;
    const volume = Math.PI * Math.pow(radius, 2) * treeHeight;

    // 計算碳儲存量
    const carbonStorage = selectedTree.D * selectedTree.BEF * selectedTree.R * selectedTree.CF * volume * treeCount;

    document.getElementById("carbonResult").textContent = carbonStorage.toFixed(2);
}
