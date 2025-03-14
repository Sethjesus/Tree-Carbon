from fastapi import FastAPI
import math

app = FastAPI()

# 碳匯數據 (可從 API 或 CSV 讀取)
carbon_factors = {
    "天然針葉林": {"D": 0.41, "BEF": 1.27, "R": 0.22, "CF": 0.4821},
    "天然針闊葉混淆林": {"D": 0.49, "BEF": 1.34, "R": 0.23, "CF": 0.4756},
    "天然闊葉林": {"D": 0.56, "BEF": 1.4, "R": 0.24, "CF": 0.4691},
    "人工針葉林": {"D": 0.41, "BEF": 1.27, "R": 0.22, "CF": 0.4821},
    "人工針闊葉混淆林": {"D": 0.49, "BEF": 1.34, "R": 0.23, "CF": 0.4756},
    "人工闊葉林": {"D": 0.56, "BEF": 1.4, "R": 0.24, "CF": 0.4691},
    "木竹混淆林": {"D": 0.49, "BEF": 1.34, "R": 0.23, "CF": 0.4756},
    "竹林": {"D": 0.62, "BEF": 1.4, "R": 0.46, "CF": 0.4732},
}

# 計算碳匯
def calculate_carbon_stock(tree_type: str, dbh: float, height: float):
    if tree_type not in carbon_factors:
        return {"error": "未知的樹種"}

    factors = carbon_factors[tree_type]
    V = ((dbh / 2) ** 2) * math.pi * height
    CO2e = V * factors["D"] * factors["BEF"] * (1 + factors["R"]) * factors["CF"] * (44 / 12)

    return {"tree_type": tree_type, "CO2e": round(CO2e, 2)}

# API 路由
@app.get("/")
def read_root():
    return {"message": "Tree-Carbon 校園碳匯 API 啟動"}

@app.get("/calculate/")
def calculate(tree_type: str, dbh: float, height: float):
    return calculate_carbon_stock(tree_type, dbh, height)

