import os
from dotenv import load_dotenv

load_dotenv()

from langchain.chat_models import init_chat_model
from langchain_core.prompts import ChatPromptTemplate
from system_prompts import analyze_target_audience_prompt, analyze_product_principles_prompt, analyze_problem_size_prompt, success_metrics_evaluator_prompt, summarizer_prompt, existing_products_prompt
from existing_products import existing_products
import json

model = init_chat_model("gpt-4o", model_provider="openai")
low_temperature_model = init_chat_model("gpt-4o", model_provider="openai", temperature=0.1)

def analyze_problem_statement(problem_statement):
    return prompt_model(analyze_product_principles_prompt, problem_statement)

def analyze_target_audience(target_audience):
    return prompt_model(analyze_target_audience_prompt, target_audience)

def analyze_problem_size(problem_statement):
    return prompt_model(analyze_problem_size_prompt, problem_statement)

def summarize_problem_statement(problem_statement, metrics_input):
    prompt = ChatPromptTemplate.from_messages(
        [
            ("system", summarizer_prompt),
            ("user", "{input}")
        ]
    )
    chain = prompt | model
    summary_response = chain.invoke({"input": problem_statement})

    print(summary_response.content)

    prompt = ChatPromptTemplate.from_messages(
        [
            ("system", success_metrics_evaluator_prompt),
            ("user", """
# Problem
{summary}
             
# Success Metrics
{input}
""")
        ]
    )
    chain = prompt | model
    response = chain.invoke({"input": metrics_input, "summary": summary_response.content})
    print(response.content)
    # Clean up response content by stripping everything before first { and after last }
    content = response.content
    start_idx = content.find('{')
    end_idx = content.rfind('}')
    
    if start_idx != -1 and end_idx != -1:
        content = content[start_idx:end_idx + 1]
    
    return content
    
def analyze_existing_products(problem_statement):
    prompt = ChatPromptTemplate.from_messages(
        [
            ("system", existing_products_prompt),
            ("user", """
# Existing Products
{existing_products}

# Problem Statement
{problem_statement}
""")
        ]
    )

    existing_products_string = ""
    for product in existing_products:
        existing_products_string += f"## Problem ID: {product['id']}\n{product['summary']}\n\n"

    chain = prompt | low_temperature_model
    response = chain.invoke({"problem_statement": problem_statement, "existing_products": existing_products_string})
    # print(response.content)
    
    # Clean up response content by stripping everything before first { and after last }
    content = response.content
    # print(content)
    start_idx = content.find('[')
    end_idx = content.rfind(']')
    
    if start_idx != -1 and end_idx != -1:
        content = content[start_idx:end_idx + 1]

    data = json.loads(content)
    formatted_data = []
    for problem_id in data:
        product = existing_products[problem_id - 1]
        formatted_data.append({
            "id": product["id"],
            "title": product["title"],
            "summary": product["summary"],
            "contact_point": product["contact_point"]
        })
    
    
    return formatted_data
    

def prompt_model(prompt, input):
    prompt = ChatPromptTemplate.from_messages(
        [
            ("system", prompt),
            ("user", "{input}")
        ]
    )
    chain = prompt | model
    response = chain.invoke({"input": input})
    print(response.content)
    
    # Clean up response content by stripping everything before first { and after last }
    content = response.content
    start_idx = content.find('{')
    end_idx = content.rfind('}')
    
    if start_idx != -1 and end_idx != -1:
        content = content[start_idx:end_idx + 1]
    
    return content