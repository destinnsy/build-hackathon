from fastapi import FastAPI
from pydantic import BaseModel
import json
from llm import analyze_problem_statement, analyze_problem_size, analyze_target_audience, summarize_problem_statement, analyze_existing_products
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import os

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "*.airbase.sg", "*.up.railway.app"],  # Your frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

@app.get("/")
def read_root():
  return {"hello": "world"}

class UserQuery(BaseModel):
  text: str

@app.post("/query/target-audience")
def query_target_audience(query: UserQuery):
  return json.loads(analyze_target_audience(query.text))

@app.post("/query/product-principles")
def query_product_principles(query: UserQuery):
  return json.loads(analyze_problem_statement(query.text))

@app.post("/query/problem-size")
def query_problem_size(query: UserQuery):
  return json.loads(analyze_problem_size(query.text))


class UserQueryMetrics(BaseModel):
  metricsText: str
  problemText: str

@app.post("/query/success-metrics")
def query_success_metrics(query: UserQueryMetrics):
  return json.loads(summarize_problem_statement(query.problemText, query.metricsText))

@app.post("/query/existing-products")
def query_existing_products(query: UserQuery):
  return analyze_existing_products(query.text)
