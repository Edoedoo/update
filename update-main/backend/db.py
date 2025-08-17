import mysql.connector
import os
from dotenv import load_dotenv
from openpyxl import load_workbook

load_dotenv()
EXCEL_PATH = os.getenv("EXCEL_PATH")

def getConnection():
    conn = load_workbook(EXCEL_PATH)
    return conn

# def getConnection():
#     conn = mysql.connector.connect(
#         host=os.getenv("DB_HOST"),
#         user=os.getenv("DB_USER"),
#         password=os.getenv("DB_PASS"),
#         database=os.getenv("DB_NAME")
#     )
#     print(f"Connected to DB at {os.getenv('DB_HOST')}")
#     return conn

# def getConnection(sheet_name=None):
#     excel_path = os.getenv("EXCEL_PATH")
#     if not os.path.exists(excel_path):
#         raise FileNotFoundError(f"File Excel tidak ditemukan: {excel_path}")
    
#     if sheet_name:
#         df = pd.read_excel(excel_path, sheet_name=sheet_name)
#         print(f"Connected to Excel file at {excel_path} (sheet: {sheet_name})")
#         return df
#     else:
#         dfs = pd.read_excel(excel_path, sheet_name=None) 
#         print(f"Connected to Excel file at {excel_path} (all sheets)")
#         return dfs
