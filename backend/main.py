from fastapi import FastAPI
from pydantic import BaseModel
import json
from llm import analyze_problem_statement, analyze_problem_size, analyze_target_audience

app = FastAPI()

@app.get("/")
def read_root():
  return {"hello": "world"}

class UserQuery(BaseModel):
  query: str

@app.post("/query/target-audience")
def query_target_audience(query: UserQuery):
  return json.loads(analyze_target_audience(query.query))

@app.post("/query/product-principles")
def query_product_principles(query: UserQuery):
  return json.loads(analyze_problem_statement(query.query))

@app.post("/query/problem-size")
def query_problem_size(query: UserQuery):
  return json.loads(analyze_problem_size(query.query))
