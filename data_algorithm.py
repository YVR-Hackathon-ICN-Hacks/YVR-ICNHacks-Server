import pandas as pd

# 데이터 로드
data = pd.read_csv('your_data.csv')

# PMV 계산 함수 정의 (단순화)
def calculate_pmv(temperature):
    # 공기 온도를 기반으로 단순화된 PMV 계산
    # 21°C ~ 24°C 사이를 편안함으로 가정
    if 21 <= temperature <= 24:
        return 0  # 편안함
    elif temperature < 21:
        return -1  # 약간 추움
    else:
        return 1  # 약간 더움

# IAQ Index 계산 함수 정의 (단순화)
def calculate_iaq(co2_concentration):
    # 이산화탄소 농도를 기반으로 단순화된 IAQ 계산
    # 1000 ppm 이하를 편안함으로 가정
    if co2_concentration <= 1000:
        return 0  # 편안함
    else:
        return 1  # 공기질 나쁨

# ACH 계산 함수 정의 (단순화)
def calculate_ach(air_flow):
    # 공기 흐름을 기반으로 단순화된 ACH 계산
    # 특정 임계값 이상을 편안함으로 가정 (예: 90 L/s)
    if air_flow >= 90:
        return 0  # 편안함
    else:
        return 1  # 공기 흐름 부족

# 쾌적함 평가 함수 정의
def evaluate_comfort(pmv, iaq, ach):
    # 쾌적함 평가 로직
    if pmv == 0 and iaq == 0 and ach == 0:
        return 'Comfortable'
    else:
        return 'Uncomfortable'

# 데이터를 반복하여 각 시간대별로 평가
for index, row in data.iterrows():
    temperature = row['ITB_VAV_A42_W3327_02_RT_AV_TL']
    air_flow = row['ITB_VAV_A42_W3327_02_FLW_AV_TL']
    co2_concentration = row['ITB_VAV_A42_W3327_02_CO2_TL']
    
    # PMV, IAQ, ACH 계산
    pmv = calculate_pmv(temperature)
    iaq = calculate_iaq(co2_concentration)
    ach = calculate_ach(air_flow)
    
    # 쾌적함 평가
    comfort = evaluate_comfort(pmv, iaq, ach)
    print(f'Timestamp: {row["Timestamp"]}, Comfort: {comfort}')
